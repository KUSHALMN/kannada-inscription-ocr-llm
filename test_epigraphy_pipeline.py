"""
End-to-End Epigraphical AI Pipeline Integration & Validation Test Suite
Tests:
1. Preprocessing & CLAHE Relief Generation
2. Computer Vision Morphological Line & Glyph Segmentation
3. Neural 10-Era Script Classification (Hierarchical CNN + Vision Transformer)
4. Historical Epigraphical Transliteration & Modern Kannada / English Translation
5. Full AnalysisService asynchronous orchestration
"""

import os
import sys
import asyncio
from PIL import Image
import numpy as np

# Ensure UTF-8 output on Windows
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace", write_through=True)
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace", write_through=True)

from backend.app.schemas import ScriptClassId, SourceLanguageId
from backend.app.ml_adapters.cv_segmenter import CVStonePreprocessor, CVStoneSegmenter
from backend.app.ml_adapters.neural_adapters import NeuralScriptClassifier, NeuralTranslator
from backend.app.services.analysis_service import AnalysisService


def test_cv_segmentation():
    print("[*] 1. Testing CV Preprocessing & Line Segmentation...")
    sample_path = "public/sample-stele.jpg"
    if not os.path.exists(sample_path):
        sample_path = "public/analysis-halmidi-stele.jpg"

    assert os.path.exists(sample_path), f"Sample image {sample_path} not found"
    img = Image.open(sample_path).convert("RGB")

    preprocessor = CVStonePreprocessor()
    arr = preprocessor.process(img)
    assert isinstance(arr, np.ndarray), "Preprocessor must return numpy array"
    assert arr.shape[0] > 0 and arr.shape[1] > 0, "Array must have positive dimensions"

    segmenter = CVStoneSegmenter()
    lines = segmenter.segment(arr)
    assert len(lines) > 0, "Segmenter must detect at least 1 line"
    print(f"    [+] Preprocessing & segmentation succeeded! Found {len(lines)} line bands.")


def test_neural_classification():
    print("[*] 2. Testing Neural Script Classification...")
    classifier = NeuralScriptClassifier()
    assert classifier.model is not None, "Neural script classifier model should be loaded"
    assert len(classifier.class_names) == 10, "Classifier must support all 10 script eras"

    # Test Badami hint
    pred_badami = classifier.predict(hint="badami kappe arabhatta cliff")
    assert pred_badami.script_class == ScriptClassId.BADAMI_CHALUKYA, f"Expected BADAMI_CHALUKYA, got {pred_badami.script_class}"

    # Test Kadamba hint
    pred_kadamba = classifier.predict(hint="halmidi kadamba kakustha")
    assert pred_kadamba.script_class == ScriptClassId.KADAMBA, f"Expected KADAMBA, got {pred_kadamba.script_class}"

    # Test Hoysala hint
    pred_hoysala = classifier.predict(hint="belur hoysala bittideva chennakeshava")
    assert pred_hoysala.script_class == ScriptClassId.HOYSALA, f"Expected HOYSALA, got {pred_hoysala.script_class}"

    print(f"    [+] Classification verified across multiple historical script epochs.")


def test_neural_translation():
    print("[*] 3. Testing Epigraphical Neural Translation Engine...")
    translator = NeuralTranslator()

    # 1. Halmidi
    res_halmidi = translator.translate(
        text="ನಮಃ ಶ್ರೀಮತ್ ಕದಂಬಪನ್ ಕಾಗುಸ್ಥಭಟ್ಟೋರನ್ ಆಳೆ",
        script=ScriptClassId.KADAMBA,
        language=SourceLanguageId.PURVADA_HALEGANNADA,
    )
    assert "ಕದಂಬ" in res_halmidi.modern_kannada or "ಕಾಕುಸ್ಥ" in res_halmidi.modern_kannada
    assert len(res_halmidi.english_translation) > 0
    assert len(res_halmidi.glossary) > 0

    # 2. Badami Tripadi
    res_badami = translator.translate(
        text="ಸಾಧುಗೆ ಸಾಧು ಮಾಧುರ್ಯಂಗೆ ಮಾಧುರ್ಯಂ",
        script=ScriptClassId.BADAMI_CHALUKYA,
        language=SourceLanguageId.HALEGANNADA,
    )
    assert "ಒಳ್ಳೆಯವರಿಗೆ" in res_badami.modern_kannada
    assert "virtuous" in res_badami.english_translation.lower() or "gentle" in res_badami.english_translation.lower()

    # 3. Rashtrakuta Kavirajamarga
    res_rashtrakuta = translator.translate(
        text="ಕಾವೇರಿಯಿಂದಂ ಗೋದಾವರಿವರಮಿರ್ಪ ನಾಡದಾ ಕನ್ನಡದೊಳ್",
        script=ScriptClassId.RASHTRAKUTA,
        language=SourceLanguageId.HALEGANNADA,
    )
    assert "ಕಾವೇರಿ" in res_rashtrakuta.modern_kannada
    assert "cauvery" in res_rashtrakuta.english_translation.lower()

    print("    [+] Neural translation & archaic glossary verified with high confidence.")


async def test_full_analysis_pipeline():
    print("[*] 4. Testing End-to-End AnalysisService Pipeline...")
    service = AnalysisService()
    sample_path = "public/sample-stele.jpg"
    if not os.path.exists(sample_path):
        sample_path = "public/analysis-halmidi-stele.jpg"

    img = Image.open(sample_path).convert("RGB")
    result = await service.execute_pipeline(
        image=img,
        job_id="test-validation-job",
        title="Badami Cliff Rubbing",
        location="Badami, Bagalkot",
        dynasty="Badami Chalukyas",
        known_script="badami_chalukya",
    )

    assert result.status == "completed", f"Pipeline must complete, got {result.status}"
    assert result.inferred_script == ScriptClassId.BADAMI_CHALUKYA
    assert len(result.transcription.lines) > 0
    assert len(result.translation.modern_kannada) > 0
    assert len(result.translation.english_translation) > 0
    assert len(result.historical_context.dynasty) > 0

    print("    [+] End-to-end async pipeline test passed successfully!")


def main():
    print("=" * 80)
    print("  ANCIENT KANNADA EPIGRAPHY AI VALIDATION SUITE")
    print("=" * 80)
    test_cv_segmentation()
    test_neural_classification()
    test_neural_translation()
    asyncio.run(test_full_analysis_pipeline())
    print("=" * 80)
    print("  ALL EPIGRAPHY OCR & TRANSLATION TESTS PASSED (100% SUCCESS)!")
    print("=" * 80)


if __name__ == "__main__":
    main()
