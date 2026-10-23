import os
import uuid
from typing import List, Optional
from datetime import datetime
from backend.app.config import settings
from backend.app.core.logging import logger
from backend.app.repositories import EpigraphyRepository, epigraphy_repository
from backend.app.ml_adapters import EpigraphyInferenceEngine, inference_engine
from backend.app.schemas import (
    ScriptClassMetadata,
    SourceLanguageMetadata,
    InscriptionRecord,
    ResearchActivityItem,
    ArchaicGlossaryItem,
    InscriptionFilter,
    AnalysisJobResult,
    ScriptClassId,
    SourceLanguageId,
    TranscriptionUpdateRequest,
    TranslationUpdateRequest,
    ReviewStatusUpdateRequest,
    ActivityType,
)


class EpigraphyService:
    """
    Epigraphy Service Layer orchestrating persistence, filtering,
    machine learning inference, and scholarly activity auditing.
    """
    def __init__(
        self,
        repo: Optional[EpigraphyRepository] = None,
        engine: Optional[EpigraphyInferenceEngine] = None
    ):
        self.repo = repo or epigraphy_repository
        self.engine = engine or inference_engine

    def list_scripts(self) -> List[ScriptClassMetadata]:
        return self.repo.get_scripts()

    def get_script(self, script_id: ScriptClassId) -> ScriptClassMetadata:
        return self.repo.get_script_by_id(script_id)

    def list_languages(self) -> List[SourceLanguageMetadata]:
        return self.repo.get_languages()

    def get_language(self, language_id: SourceLanguageId) -> SourceLanguageMetadata:
        return self.repo.get_language_by_id(language_id)

    def list_inscriptions(self, filter_params: Optional[InscriptionFilter] = None) -> List[InscriptionRecord]:
        return self.repo.get_inscriptions(filter_params)

    def get_inscription(self, inscription_id: str) -> InscriptionRecord:
        return self.repo.get_inscription_by_id(inscription_id)

    def list_activity(self, limit: int = 10) -> List[ResearchActivityItem]:
        return self.repo.get_recent_activity(limit)

    def list_lexicon(self, query: Optional[str] = None) -> List[ArchaicGlossaryItem]:
        return self.repo.get_lexicon(query)

    def update_transcription(
        self,
        inscription_id: str,
        payload: TranscriptionUpdateRequest,
        scholar_name: str = "Epigraphical Researcher"
    ) -> InscriptionRecord:
        ins = self.repo.get_inscription_by_id(inscription_id)
        ins.transcription.recognized_text = payload.recognized_text
        ins.transcription.iast_transliteration = payload.iast_transliteration
        if payload.lines:
            ins.transcription.lines = payload.lines
        ins.last_updated = datetime.now().strftime("%d %b %Y")

        updated = self.repo.update_inscription(inscription_id, ins)

        # Log scholarly activity
        activity = ResearchActivityItem(
            id=f"act-{uuid.uuid4().hex[:8]}",
            timestamp=datetime.now().strftime("%d %b %Y, %H:%M"),
            type=ActivityType.TRANSCRIPTION_VERIFIED,
            title="Transcription Revised & Verified",
            description=f"Original epigraphical line readings verified by {scholar_name}.",
            scholar=scholar_name,
            inscription_id=inscription_id,
            inscription_title=ins.title,
        )
        self.repo.add_activity(activity)
        return updated

    def update_translation(
        self,
        inscription_id: str,
        payload: TranslationUpdateRequest,
        scholar_name: str = "Epigraphical Researcher"
    ) -> InscriptionRecord:
        ins = self.repo.get_inscription_by_id(inscription_id)
        ins.translation.modern_kannada = payload.modern_kannada
        ins.translation.english_translation = payload.english_translation
        if payload.glossary:
            ins.translation.glossary = payload.glossary
        if payload.stylistic_notes is not None:
            ins.translation.stylistic_notes = payload.stylistic_notes
        ins.last_updated = datetime.now().strftime("%d %b %Y")

        updated = self.repo.update_inscription(inscription_id, ins)

        activity = ResearchActivityItem(
            id=f"act-{uuid.uuid4().hex[:8]}",
            timestamp=datetime.now().strftime("%d %b %Y, %H:%M"),
            type=ActivityType.TRANSLATION_UPDATED,
            title="Translation & Lexicon Updated",
            description=f"Modern Kannada translation and archaic vocabulary glosses enhanced by {scholar_name}.",
            scholar=scholar_name,
            inscription_id=inscription_id,
            inscription_title=ins.title,
        )
        self.repo.add_activity(activity)
        return updated

    def update_review_status(
        self,
        inscription_id: str,
        payload: ReviewStatusUpdateRequest,
        scholar_name: str = "Epigraphical Lead"
    ) -> InscriptionRecord:
        ins = self.repo.get_inscription_by_id(inscription_id)
        ins.review_status = payload.review_status
        ins.last_updated = datetime.now().strftime("%d %b %Y")

        updated = self.repo.update_inscription(inscription_id, ins)

        activity = ResearchActivityItem(
            id=f"act-{uuid.uuid4().hex[:8]}",
            timestamp=datetime.now().strftime("%d %b %Y, %H:%M"),
            type=ActivityType.TRANSCRIPTION_VERIFIED,
            title=f"Archival Status Set to {payload.review_status.value.replace('_', ' ').title()}",
            description=f"Peer review status verified by {scholar_name}. {payload.reviewer_notes or ''}".strip(),
            scholar=scholar_name,
            inscription_id=inscription_id,
            inscription_title=ins.title,
        )
        self.repo.add_activity(activity)
        return updated

    def analyze_rubbing(
        self,
        image_bytes: bytes,
        filename: str,
        title: Optional[str] = None,
        location: Optional[str] = None,
        dynasty: Optional[str] = None,
        approximate_date: Optional[str] = None,
        known_script: Optional[str] = None,
        known_language: Optional[str] = None,
        researcher_notes: Optional[str] = None,
    ) -> AnalysisJobResult:
        # Save image file to upload directory
        os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
        unique_name = f"{uuid.uuid4().hex[:8]}_{filename}"
        upload_path = os.path.join(settings.UPLOAD_DIR, unique_name)
        with open(upload_path, "wb") as f:
            f.write(image_bytes)

        logger.info("Saved analysis upload: %s (%d bytes)", upload_path, len(image_bytes))

        # Run inference through ML adapter
        result = self.engine.analyze(
            image_bytes=image_bytes,
            title=title,
            location=location,
            dynasty_hint=dynasty,
            approximate_date=approximate_date,
            known_script=known_script,
            known_language=known_language,
            researcher_notes=researcher_notes,
        )

        # Log new rubbing activity
        activity = ResearchActivityItem(
            id=f"act-{uuid.uuid4().hex[:8]}",
            timestamp=datetime.now().strftime("%d %b %Y, %H:%M"),
            type=ActivityType.RUBBING_CATALOGUED,
            title="New Rubbing Ingested & Analyzed",
            description=f"Automated 5-stage inference completed for {title or filename}.",
            scholar="Automated Computational Paleography Pipeline",
            inscription_id=result.job_id,
            inscription_title=title or "Newly Ingested Epigraphical Record",
        )
        self.repo.add_activity(activity)

        return result


epigraphy_service = EpigraphyService()
