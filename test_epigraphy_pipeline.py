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


async def test_unhinted_image_classification_and_translation():
    print("[*] 5. Testing Generic Unhinted Inscription Uploads (Zero-Metadata)...")
    service = AnalysisService()

    # 1. Test Badami Sandstone Stele with generic filename and no researcher hints
    badami_path = "public/inscriptions/badami_kappe_arabhatta_stele.jpg"
    assert os.path.exists(badami_path), "Badami stele not found"
    img_badami = Image.open(badami_path).convert("RGB")
    res_badami = await service.execute_pipeline(
        image=img_badami,
        job_id="test-unhinted-badami",
        filename="IMG_20261114_001.jpg",
        title=None,
        location=None,
        dynasty=None,
        known_script="uncertain",
        known_language="uncertain",
    )
    assert res_badami.status == "completed"
    assert res_badami.inferred_script == ScriptClassId.BADAMI_CHALUKYA, f"Expected BADAMI_CHALUKYA, got {res_badami.inferred_script}"
    assert ("Chalukya" in res_badami.historical_context.dynasty or "ಚಾಲುಕ್ಯ" in res_badami.historical_context.dynasty)
    assert "ಮಾಧುರ್ಯ" in res_badami.transcription.recognized_text or "ಸಾಧುಗೆ" in res_badami.transcription.recognized_text
    assert ("ಒಳ್ಳೆಯವರಿಗೆ" in res_badami.translation.modern_kannada or "ಸಜ್ಜನರಿಗೆ" in res_badami.translation.modern_kannada)
    print("    [+] Unhinted Badami upload recognized and translated correctly into Hosagannada & English!")

    # 2. Test Halmidi Granite Stele with generic filename
    sample_path = "public/sample-stele.jpg"
    assert os.path.exists(sample_path), "Sample stele not found"
    img_kadamba = Image.open(sample_path).convert("RGB")
    res_kadamba = await service.execute_pipeline(
        image=img_kadamba,
        job_id="test-unhinted-halmidi",
        filename="photo_camera.png",
        title=None,
        location=None,
        dynasty=None,
        known_script="uncertain",
        known_language="uncertain",
    )
    assert res_kadamba.status == "completed"
    assert res_kadamba.inferred_script == ScriptClassId.KADAMBA, f"Expected KADAMBA, got {res_kadamba.inferred_script}"
    assert "Kadamba" in res_kadamba.historical_context.dynasty
    assert ("ಕದಂಬ" in res_kadamba.translation.modern_kannada or "ಕಾಕುಸ್ಥ" in res_kadamba.translation.modern_kannada)
    print("    [+] Unhinted Halmidi Kadamba upload recognized and translated correctly!")

    # 3. Test Belur Hoysala Stele with generic filename
    belur_path = "public/inscriptions/belur_chennakeshava_stele.jpg"
    assert os.path.exists(belur_path), "Belur stele not found"
    img_hoysala = Image.open(belur_path).convert("RGB")
    res_hoysala = await service.execute_pipeline(
        image=img_hoysala,
        job_id="test-unhinted-belur",
        filename="upload_dark_stone.jpg",
        title=None,
        location=None,
        dynasty=None,
        known_script="uncertain",
        known_language="uncertain",
    )
    assert res_hoysala.status == "completed"
    assert res_hoysala.inferred_script == ScriptClassId.HOYSALA, f"Expected HOYSALA, got {res_hoysala.inferred_script}"
    assert "Hoysala" in res_hoysala.historical_context.dynasty
    assert "ಹೊಯ್ಸಳ" in res_hoysala.transcription.recognized_text
    assert ("ಭೂದಾನ" in res_hoysala.translation.modern_kannada or "ದಾನ" in res_hoysala.translation.modern_kannada or "ಧರ್ಮ" in res_hoysala.translation.modern_kannada)
    assert ("endowment" in res_hoysala.translation.english_translation.lower() or "grant" in res_hoysala.translation.english_translation.lower())
    print("    [+] Unhinted Belur Hoysala upload recognized and translated correctly!")


def test_glyph_matching_and_wall_stitching():
    print("[*] 6. Testing Weathered Stone Glyph Matching & Panoramic Wall Stitching...")
    import cv2
    from backend.app.ml_adapters.glyph_matcher import HistoricalGlyphPrototypeMatcher
    from backend.app.ml_adapters.cv_segmenter import PanoramicWallStitcher

    # Test 1: Historical Glyph Prototype Matcher
    matcher = HistoricalGlyphPrototypeMatcher()
    sample_glyph_path = "public/glyphs/kadamba/2.png"
    assert os.path.exists(sample_glyph_path), "Sample glyph not found"
    glyph_img = cv2.imread(sample_glyph_path)
    char, iast, conf = matcher.match_glyph(glyph_img, "kadamba")
    assert char in ["ಅ", "ಕ", "ಗ"], f"Expected Kannada glyph, got {char}"
    assert conf >= 0.70, f"Confidence too low: {conf}"
    print(f"    [+] Glyph prototype match succeeded: '{char}' ({iast}) with confidence {conf*100:.1f}%")

    # Test 2: Multi-Panel Temple Wall Stitching
    stele_path = "public/sample-stele.jpg"
    assert os.path.exists(stele_path), "Sample stele not found"
    full_img = cv2.imread(stele_path)
    h, w = full_img.shape[:2]
    mid = w // 2
    overlap = int(w * 0.15)
    left_panel = full_img[:, :mid + overlap]
    right_panel = full_img[:, mid - overlap:]

    ok, pano, msg = PanoramicWallStitcher.stitch_panels([left_panel, right_panel])
    assert ok is True, f"Wall stitching failed: {msg}"
    assert pano is not None and pano.shape[1] >= mid, "Stitched panorama must be wide"
    print(f"    [+] Multi-panel temple wall stitching succeeded: {pano.shape[1]}x{pano.shape[0]} px ({msg})")


async def test_irrelevant_image_fallback():
    print("[*] 7. Testing Irrelevant & Out-of-Domain Image Fallback...")
    service = AnalysisService()

    # 1. Blank textureless image
    blank_img = Image.fromarray(np.ones((400, 400, 3), dtype=np.uint8) * 160)
    res_blank = await service.execute_pipeline(
        image=blank_img,
        job_id="test-irrelevant-blank",
        filename="random_wall.jpg",
        title=None,
        location=None,
        dynasty=None,
        known_script="uncertain",
        known_language="uncertain",
    )
    assert res_blank.status == "completed"
    assert len(res_blank.transcription.lines) == 0, "Non-epigraph image must have 0 line boxes"
    assert ("ಯಾವುದೇ ಪ್ರಾಚೀನ" in res_blank.translation.modern_kannada or "ಅಸಂಬದ್ಧ" in res_blank.translation.modern_kannada)
    assert "does not appear to contain" in res_blank.translation.english_translation
    print("    [+] Blank/textureless image correctly triggered epigraphical fallback message!")

    # 2. Non-epigraph vivid landscape
    scenery = np.zeros((400, 400, 3), dtype=np.uint8)
    scenery[:200, :] = [135, 206, 235]  # Sky blue
    scenery[200:, :] = [34, 139, 34]    # Forest green
    res_scenery = await service.execute_pipeline(
        image=Image.fromarray(scenery),
        job_id="test-irrelevant-scenery",
        filename="sunset_view.jpg",
        title=None,
        location=None,
        dynasty=None,
        known_script="uncertain",
        known_language="uncertain",
    )
    assert res_scenery.status == "completed"
    assert len(res_scenery.transcription.lines) == 0
    assert "ಯಾವುದೇ ಪ್ರಾಚೀನ" in res_scenery.translation.modern_kannada
    assert "does not appear to contain" in res_scenery.translation.english_translation
    print("    [+] Vivid landscape photo correctly triggered epigraphical fallback message!")


def main():
    print("=" * 80)
    print("  ANCIENT KANNADA EPIGRAPHY AI VALIDATION SUITE")
    print("=" * 80)
    test_cv_segmentation()
    test_neural_classification()
    test_neural_translation()
    test_glyph_matching_and_wall_stitching()
    asyncio.run(test_full_analysis_pipeline())
    asyncio.run(test_unhinted_image_classification_and_translation())
    asyncio.run(test_irrelevant_image_fallback())
    print("=" * 80)
    print("  ALL EPIGRAPHY OCR & TRANSLATION TESTS PASSED (100% SUCCESS)!")
    print("=" * 80)


if __name__ == "__main__":
    main()
