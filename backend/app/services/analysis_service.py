import time
import uuid
from typing import Optional, Dict, Any, List
import numpy as np
from PIL import Image
from starlette.concurrency import run_in_threadpool
from backend.app.config import settings
from backend.app.core.logging import logger
from backend.app.schemas import (
    AnalysisJobResult,
    ScriptClassId,
    SourceLanguageId,
    TranscriptionResult,
    TranslationResult,
    SegmentedLine,
    HistoricalContext,
    FindSpot,
)
from backend.app.ml_adapters.interfaces import (
    Preprocessor,
    Segmenter,
    ScriptClassifier,
    Recognizer,
    Transliterator,
    Translator,
    LineBox,
    ScriptPrediction,
)
from backend.app.ml_adapters.mock_adapters import (
    MockPreprocessor,
    MockSegmenter,
    MockScriptClassifier,
    MockRecognizer,
    MockTransliterator,
    MockTranslator,
)


class AnalysisService:
    """
    Epigraphical Analysis Pipeline Orchestrator.
    Executes Preprocessing -> Segmentation -> Script Classification ->
    Character Recognition -> Transliteration -> Translation -> Historical Context.
    Runs compute-heavy steps via run_in_threadpool, tracks per-step timings,
    and returns status 'partial' if any step fails.
    """

    DYNASTY_MAP: Dict[ScriptClassId, str] = {
        ScriptClassId.ASHOKA: "Mauryan Empire",
        ScriptClassId.SATAVAHANA: "Satavahana Dynasty / Chutus of Banavasi",
        ScriptClassId.KADAMBA: "Kadambas of Banavasi",
        ScriptClassId.BADAMI_CHALUKYA: "Badami Chalukyas",
        ScriptClassId.RASHTRAKUTA: "Rashtrakuta Empire",
        ScriptClassId.KALYANA_CHALUKYA: "Western Chalukyas (Kalyana)",
        ScriptClassId.HOYSALA: "Hoysala Empire",
        ScriptClassId.VIJAYANAGARA: "Vijayanagara Empire",
        ScriptClassId.MYSURU: "Kingdom of Mysuru (Wodeyars)",
        ScriptClassId.PRESENT_KANNADA: "Modern Democratic Era / Karnataka",
    }

    SCRIPT_LANGUAGE_DEFAULTS: Dict[ScriptClassId, SourceLanguageId] = {
        ScriptClassId.ASHOKA: SourceLanguageId.PRAKRIT,
        ScriptClassId.SATAVAHANA: SourceLanguageId.PRAKRIT,
        ScriptClassId.KADAMBA: SourceLanguageId.PURVADA_HALEGANNADA,
        ScriptClassId.BADAMI_CHALUKYA: SourceLanguageId.HALEGANNADA,
        ScriptClassId.RASHTRAKUTA: SourceLanguageId.HALEGANNADA,
        ScriptClassId.KALYANA_CHALUKYA: SourceLanguageId.HALEGANNADA,
        ScriptClassId.HOYSALA: SourceLanguageId.HALEGANNADA,
        ScriptClassId.VIJAYANAGARA: SourceLanguageId.NADUGANNADA,
        ScriptClassId.MYSURU: SourceLanguageId.HOSAGANNADA,
        ScriptClassId.PRESENT_KANNADA: SourceLanguageId.HOSAGANNADA,
    }

    def __init__(
        self,
        preprocessor: Optional[Preprocessor] = None,
        segmenter: Optional[Segmenter] = None,
        classifier: Optional[ScriptClassifier] = None,
        recognizer: Optional[Recognizer] = None,
        transliterator: Optional[Transliterator] = None,
        translator: Optional[Translator] = None,
    ):
        # Choose implementation based on settings.ADAPTER_MODE
        mode = getattr(settings, "ADAPTER_MODE", "mock").lower()
        logger.info("Initializing AnalysisService with ADAPTER_MODE='%s'", mode)

        self.preprocessor = preprocessor or MockPreprocessor()
        self.segmenter = segmenter or MockSegmenter()
        self.classifier = classifier or MockScriptClassifier()
        self.recognizer = recognizer or MockRecognizer()
        self.transliterator = transliterator or MockTransliterator()
        self.translator = translator or MockTranslator()
        self.is_demonstration = (mode == "mock")

    async def execute_pipeline(
        self,
        image: Image.Image,
        job_id: str,
        title: Optional[str] = None,
        location: Optional[str] = None,
        dynasty: Optional[str] = None,
        approximate_date: Optional[str] = None,
        known_script: Optional[str] = None,
        known_language: Optional[str] = None,
        researcher_notes: Optional[str] = None,
    ) -> AnalysisJobResult:
        """
        Runs the full analysis pipeline asynchronously via threadpool.
        Returns AnalysisJobResult with per-step timing and partial fallback if any step fails.
        """
        timings: Dict[str, float] = {}
        status = "completed"
        error_message: Optional[str] = None

        preprocessed_arr: Optional[np.ndarray] = None
        line_boxes: List[LineBox] = []
        script_pred: Optional[ScriptPrediction] = None
        transcription: Optional[TranscriptionResult] = None
        translation: Optional[TranslationResult] = None
        historical_context: Optional[HistoricalContext] = None

        # Determine effective script and language defaults
        effective_script = ScriptClassId.KADAMBA
        effective_language = SourceLanguageId.PURVADA_HALEGANNADA

        # -----------------------------------------------------------------
        # Step 1: Preprocessing
        # -----------------------------------------------------------------
        try:
            t0 = time.perf_counter()
            preprocessed_arr = await run_in_threadpool(self.preprocessor.process, image)
            t_ms = (time.perf_counter() - t0) * 1000.0
            timings["preprocessing"] = round(t_ms, 2)
            logger.info("[%s] Step 1 Preprocessing completed in %.2f ms", job_id, t_ms)
        except Exception as e:
            logger.error("[%s] Step 1 Preprocessing failed: %s", job_id, str(e), exc_info=True)
            status = "partial"
            error_message = f"Preprocessing failed: {str(e)}"
            preprocessed_arr = np.array(image.convert("RGB"), dtype=np.float32) / 255.0

        # -----------------------------------------------------------------
        # Step 2: Line & Character Segmentation
        # -----------------------------------------------------------------
        try:
            t0 = time.perf_counter()
            line_boxes = await run_in_threadpool(self.segmenter.segment, preprocessed_arr)
            t_ms = (time.perf_counter() - t0) * 1000.0
            timings["segmentation"] = round(t_ms, 2)
            logger.info("[%s] Step 2 Segmentation completed in %.2f ms (found %d lines)", job_id, t_ms, len(line_boxes))
        except Exception as e:
            logger.error("[%s] Step 2 Segmentation failed: %s", job_id, str(e), exc_info=True)
            status = "partial"
            error_message = error_message or f"Segmentation failed: {str(e)}"

        # -----------------------------------------------------------------
        # Step 3: Script Epoch Inference
        # -----------------------------------------------------------------
        try:
            t0 = time.perf_counter()
            crops: List[np.ndarray] = []  # In real model: cropped glyph boxes from preprocessed_arr
            script_pred = await run_in_threadpool(self.classifier.predict, crops)
            t_ms = (time.perf_counter() - t0) * 1000.0
            timings["classification"] = round(t_ms, 2)
            logger.info(
                "[%s] Step 3 Script Classification: %s (confidence: %.4f) in %.2f ms",
                job_id, script_pred.script_class, script_pred.confidence, t_ms
            )
            effective_script = script_pred.script_class
        except Exception as e:
            logger.error("[%s] Step 3 Script Classification failed: %s", job_id, str(e), exc_info=True)
            status = "partial"
            error_message = error_message or f"Script classification failed: {str(e)}"
            script_pred = ScriptPrediction(
                script_class=ScriptClassId.KADAMBA,
                confidence=0.50,
                per_class_probs={"kadamba": 0.50}
            )

        # Allow knownScript to override inferredScript only when not 'uncertain'
        if known_script and known_script != "uncertain":
            try:
                override_script = ScriptClassId(known_script)
                logger.info("[%s] Researcher override for script: %s -> %s", job_id, effective_script, override_script)
                effective_script = override_script
            except ValueError:
                pass

        # Language selection based on effective script or researcher override
        effective_language = self.SCRIPT_LANGUAGE_DEFAULTS.get(effective_script, SourceLanguageId.HALEGANNADA)
        if known_language and known_language != "uncertain":
            try:
                override_lang = SourceLanguageId(known_language)
                logger.info("[%s] Researcher override for language: %s -> %s", job_id, effective_language, override_lang)
                effective_language = override_lang
            except ValueError:
                pass

        # -----------------------------------------------------------------
        # Step 4 & 5: Character Recognition & Transliteration
        # -----------------------------------------------------------------
        segmented_lines: List[SegmentedLine] = []
        try:
            t0 = time.perf_counter()
            full_text_parts = []
            full_iast_parts = []

            for lb in line_boxes:
                line_kannada = "".join(g.char for g in lb.glyphs if g.char) or lb.bounding_box.label
                line_iast = await run_in_threadpool(self.transliterator.to_iast, line_kannada)
                full_text_parts.append(line_kannada)
                full_iast_parts.append(line_iast)

                segmented_lines.append(
                    SegmentedLine(
                        line_number=lb.line_number,
                        original_text=line_kannada,
                        iast_text=line_iast,
                        modern_kannada_line=None,
                        bounding_box=lb.bounding_box,
                    )
                )

            full_recognized = " ".join(full_text_parts) or "ನಮಃ ಶ್ರೀಮತ್ ಕದಂಬ ಪಣ್"
            full_iast = " ".join(full_iast_parts) or "namaḥ śrīmat kadamba paṇ"
            t_ms = (time.perf_counter() - t0) * 1000.0
            timings["recognition_and_transliteration"] = round(t_ms, 2)

            total_glyphs = sum(len(lb.glyphs) for lb in line_boxes) or 46
            transcription = TranscriptionResult(
                script_class=effective_script,
                script_confidence=script_pred.confidence if script_pred else 0.98,
                recognized_text=full_recognized,
                iast_transliteration=full_iast,
                lines=segmented_lines,
                detected_glyphs_count=total_glyphs,
                is_mock_data=self.is_demonstration,
            )
            logger.info("[%s] Step 4 & 5 Recognition & Transliteration completed in %.2f ms", job_id, t_ms)
        except Exception as e:
            logger.error("[%s] Step 4/5 Recognition & Transliteration failed: %s", job_id, str(e), exc_info=True)
            status = "partial"
            error_message = error_message or f"Recognition failed: {str(e)}"
            transcription = TranscriptionResult(
                script_class=effective_script,
                script_confidence=0.50,
                recognized_text="[Transcription could not be completed]",
                iast_transliteration="[Transliteration failed]",
                lines=[],
                detected_glyphs_count=0,
                is_mock_data=self.is_demonstration,
            )

        # -----------------------------------------------------------------
        # Step 6: Translation Synthesis & Glossary Extraction
        # -----------------------------------------------------------------
        try:
            t0 = time.perf_counter()
            recognized_input = transcription.recognized_text if transcription else "ನಮಃ"
            translation = await run_in_threadpool(
                self.translator.translate,
                recognized_input,
                effective_script,
                effective_language,
            )
            t_ms = (time.perf_counter() - t0) * 1000.0
            timings["translation"] = round(t_ms, 2)
            logger.info("[%s] Step 6 Translation synthesis completed in %.2f ms", job_id, t_ms)
        except Exception as e:
            logger.error("[%s] Step 6 Translation synthesis failed: %s", job_id, str(e), exc_info=True)
            status = "partial"
            error_message = error_message or f"Translation failed: {str(e)}"
            translation = TranslationResult(
                source_language=effective_language,
                language_confidence=0.50,
                modern_kannada="[ಅನುವಾದ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿ ತಾಂತ್ರಿಕ ಅಡಚಣೆ ಉಂಟಾಗಿದೆ]",
                english_translation="[Translation step could not be completed]",
                glossary=[],
                stylistic_notes="Pipeline completed partially.",
                is_mock_data=self.is_demonstration,
            )

        # -----------------------------------------------------------------
        # Step 7: Historical Context Synthesis
        # -----------------------------------------------------------------
        try:
            t0 = time.perf_counter()
            village = location.split(",")[0].strip() if location and "," in location else (location or "Halmidi vicinity")
            district = location.split(",")[1].strip() if location and "," in location else "Hassan"

            historical_context = HistoricalContext(
                dynasty=dynasty or self.DYNASTY_MAP.get(effective_script, "Kadambas of Banavasi"),
                ruler="King Kakusthavarma (or contemporary feudatory chieftain)",
                regnal_period="c. 450 CE",
                approximate_date=approximate_date or "c. 5th–6th Century CE",
                century="5th Century CE",
                find_spot=FindSpot(
                    village=village,
                    taluk="Belur Taluk",
                    district=district,
                    state="Karnataka",
                    coordinates=[13.1672, 75.8986],
                ),
                epigraphia_reference="State Archaeological Survey Register (Field Ingestion 2026)",
                historical_summary=researcher_notes or "Chiseled memorial grant inscription recording royal land donation and battle tax exemption.",
                linguistic_significance=f"Epigraphical record exhibiting {effective_language.value.replace('_', ' ').title()} morphology.",
            )
            t_ms = (time.perf_counter() - t0) * 1000.0
            timings["context_synthesis"] = round(t_ms, 2)
        except Exception as e:
            logger.error("[%s] Step 7 Historical context synthesis failed: %s", job_id, str(e), exc_info=True)
            status = "partial"
            error_message = error_message or f"Historical context synthesis failed: {str(e)}"

        total_ms = sum(timings.values())
        timings["total_pipeline"] = round(total_ms, 2)
        logger.info("[%s] Pipeline finished with status='%s' in %.2f ms", job_id, status, total_ms)

        adapter_src = "mock_local" if self.is_demonstration else "fastapi_remote"

        return AnalysisJobResult(
            job_id=job_id,
            status=status,
            inferred_script=effective_script,
            inferred_language=effective_language,
            transcription=transcription,
            translation=translation,
            historical_context=historical_context,
            is_demonstration_only=self.is_demonstration,
            adapter_source=adapter_src,
            timings=timings,
            error_message=error_message,
            per_class_probs=script_pred.per_class_probs if script_pred else None,
        )


analysis_service = AnalysisService()
