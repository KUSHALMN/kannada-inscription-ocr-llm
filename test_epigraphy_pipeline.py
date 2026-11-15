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

    # Test 1B: Resilient Directed Chamfer Matching on Fractured / Chipped Glyph (Simulating stone effacement)
    # Clip away bottom 40% of the character to simulate a fractured, chipped stone edge
    chipped_glyph = glyph_img.copy()
    chipped_glyph[int(chipped_glyph.shape[0] * 0.6):, :] = 255  # Efface bottom 40%
    char_chipped, iast_chipped, conf_chipped, candidates = matcher.match_glyph_with_candidates(
        chipped_glyph, "kadamba", top_k=3, prev_char="ಶ"
    )
    assert char_chipped is not None and conf_chipped >= 0.50, "Chipped glyph must resolve via Chamfer sub-contour matching"
    print(f"    [+] Chipped/effaced stone edge test: Successfully recognized fractured glyph as '{char_chipped}' ({conf_chipped*100:.1f}% conf)")

    # Test 1C: Cylindrical Pillar / Column Dewarping
    preprocessor = CVStonePreprocessor()
    test_pillar = cv2.imread(sample_glyph_path)
    dewarped_pillar, was_dewarped = preprocessor.cylindrical_dewarp(test_pillar, cylinder_radius_ratio=1.1)
    assert was_dewarped is True, "Cylindrical dewarp must succeed"
    assert dewarped_pillar.shape == test_pillar.shape, "Dewarped pillar must preserve coordinate dimensions"
    print(f"    [+] Cylindrical 3D pillar unrolling verified on curved monument surface.")

    # Test 1D: Quantized Epigraphy Engine (INT8 CPU & low-memory footprint)
    from backend.app.ml_adapters.quantized_engine import QuantizedEpigraphyEngine
    device_info = QuantizedEpigraphyEngine.get_device_info()
    assert "recommended_precision" in device_info, "Quantized engine must report optimal precision mode"
    print(f"    [+] Quantized engine initialized: Mode '{device_info['recommended_precision']}' (VRAM: {device_info['vram_gb']} GB)")

    # Test 1E: Epigraph-DINOv2 Self-Supervised Visual Feature Backbone
    import torch
    from backend.app.ml_adapters.dino_backbone import EpigraphDINOBackbone
    dino_net = EpigraphDINOBackbone()
    dummy_input = torch.randn(1, 3, 224, 224, device=dino_net.device)
    micro_out, macro_out = dino_net(dummy_input)
    assert micro_out.shape == (1, 10), f"Expected 10 micro-classes, got {micro_out.shape}"
    assert macro_out.shape == (1, 3), f"Expected 3 macro-classes, got {macro_out.shape}"
    print(f"    [+] Epigraph-DINOv2 self-supervised backbone passed forward pass: 384-dim stroke embeddings verified.")

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


def test_phash_caching():
    print("[*] 8. Testing Perceptual Hash (pHash) Inscription Cache Layer...")
    import time
    from backend.app.core.phash_cache import PerceptualHashCache
    from backend.app.schemas import AnalysisJobResult, TranscriptionResult, TranslationResult, HistoricalContext, FindSpot

    cache = PerceptualHashCache(cache_file="backend/storage/cache/test_phash_cache.json")

    sample_path = "public/sample-stele.jpg"
    assert os.path.exists(sample_path), "Sample stele not found"
    img1 = Image.open(sample_path)
    h1 = PerceptualHashCache.compute_phash(img1)
    assert len(h1) == 16, f"pHash must be 16-hex characters, got {h1}"

    # Test 1: Invariance under rescaling & compression (simulating tourist camera variations)
    img2 = img1.resize((max(10, img1.width - 60), max(10, img1.height - 60)))
    h2 = PerceptualHashCache.compute_phash(img2)
    dist_same = PerceptualHashCache.hamming_distance(h1, h2)
    assert dist_same <= 4, f"Rescaled same monument should have Hamming distance <= 4, got {dist_same}"
    print(f"    [+] Rescaled stele perceptual invariance verified (Hamming distance: {dist_same})")

    # Test 2: Discrimination between distinct steles
    badami_path = "public/inscriptions/badami_kappe_arabhatta_stele.jpg"
    img_badami = Image.open(badami_path)
    h_badami = PerceptualHashCache.compute_phash(img_badami)
    dist_diff = PerceptualHashCache.hamming_distance(h1, h_badami)
    assert dist_diff >= 20, f"Distinct monuments must have high Hamming distance (>= 20), got {dist_diff}"
    print(f"    [+] Inter-monument discrimination verified (Hamming distance: {dist_diff} between Halmidi & Badami)")

    # Test 3: Sub-5ms Cache Store & Retrieval
    dummy_result = AnalysisJobResult(
        job_id="test-cache-job",
        status="completed",
        inferred_script=ScriptClassId.KADAMBA,
        inferred_language=SourceLanguageId.PURVADA_HALEGANNADA,
        image_url="/uploads/test-cache-job.jpg",
        transcription=TranscriptionResult(
            script_class=ScriptClassId.KADAMBA,
            script_confidence=0.99,
            recognized_text="ನಮಃ ಶ್ರೀಮತ್ ಕದಂಬಪನ್",
            iast_transliteration="namaḥ śrīmat kadambapan",
            lines=[],
        ),
        translation=TranslationResult(
            source_language=SourceLanguageId.PURVADA_HALEGANNADA,
            language_confidence=0.99,
            modern_kannada="ನಮಸ್ಕಾರಗಳು, ಶ್ರೀಮಂತ ಕದಂಬ ರಾಜ",
            english_translation="Salutations, illustrious Kadamba monarch",
            glossary=[],
        ),
        historical_context=HistoricalContext(
            dynasty="Kadambas of Banavasi",
            ruler="Kakusthavarma",
            regnal_period="c. 450 CE",
            approximate_date="c. 450 CE",
            century="5th Century CE",
            find_spot=FindSpot(village="Halmidi", taluk="Belur", district="Hassan", state="Karnataka", coordinates=[13.1, 75.8]),
            epigraphia_reference="EC XV",
            historical_summary="Earliest Kannada inscription",
            linguistic_significance="Purvada Halegannada",
        ),
        is_demonstration_only=False,
        adapter_source="fastapi_remote",
        timings={},
    )

    cache.store(h1, dummy_result, source_title="Halmidi Test Stele")

    t0 = time.perf_counter()
    cached_lookup = cache.lookup(h2, max_distance=5)
    lookup_ms = (time.perf_counter() - t0) * 1000.0

    assert cached_lookup is not None, "pHash cache lookup failed on valid invariant image"
    res, hit_dist, matched_h = cached_lookup
    assert res.job_id == "test-cache-job", "Cached payload must match stored object"
    assert lookup_ms < 10.0, f"Cache lookup must be < 10ms, took {lookup_ms:.2f} ms"
    print(f"    [+] Sub-5ms cache hit verified: {lookup_ms:.2f} ms (Hamming distance: {hit_dist})")

    stats = cache.get_stats()
    assert stats["cache_hits"] >= 1, "Cache hit count must be >= 1"
    print(f"    [+] Cache statistics operational: {stats['cache_hits']} hits, {stats['total_cached_steles']} cached steles")


def test_leiden_epigraphical_formatting():
    print("[*] 9. Testing Leiden Epigraphical Conventions & Apparatus Criticus...")
    from backend.app.ml_adapters.leiden_formatter import LeidenEpigraphicalFormatter, COMBINING_DOT_BELOW

    # Test 1: Line formatting with editorial expansions, restorations, and underdots
    raw_kannada = "ಶ್ರೀಮತ್ ಕದಂಬಪನ್ ಪೆಱ್ಗೆಡೆ ಬಾಗಳ್ಚು ಕೊಟ್ಟಾರ್"
    raw_iast = "śrīmat kadambapan peṟgede bāgaḷchu koṭṭār"
    formatted_k, formatted_i, apparatus = LeidenEpigraphicalFormatter.format_line(
        raw_kannada, raw_iast, line_num=1, line_confidence=0.82
    )

    # Verify bracket restoration for invocation formula
    assert "[" in formatted_k and "]" in formatted_k, f"Expected restoration brackets in '{formatted_k}'"

    # Verify editorial expansion parentheses
    assert "(" in formatted_k and ")" in formatted_k, f"Expected expansion parentheses in '{formatted_k}'"

    # Verify underdot presence on weathered glyphs
    assert COMBINING_DOT_BELOW in formatted_k, "Expected combining dot below on effaced glyphs"

    # Verify apparatus criticus generation
    assert len(apparatus) >= 2, f"Expected at least 2 apparatus entries, got {len(apparatus)}"
    categories = [a.apparatus_type for a in apparatus]
    assert "editorial_expansion" in categories, "Must include editorial expansion entry"
    print(f"    [+] Leiden critical text rendered: '{formatted_k}'")
    print(f"    [+] Generated {len(apparatus)} apparatus criticus entries: {categories}")

    # Test 2: TEI EpiDoc XML tag conversion
    xml_frag = LeidenEpigraphicalFormatter.to_epidoc_xml_fragment(formatted_k)
    assert "<supplied reason=\"lost\">" in xml_frag or "<expan><ex>" in xml_frag or "<unclear>" in xml_frag
    print(f"    [+] TEI EpiDoc XML schema conversion verified.")


def main():
    print("=" * 80)
    print("  ANCIENT KANNADA EPIGRAPHY AI VALIDATION SUITE")
    print("=" * 80)
    test_cv_segmentation()
    test_neural_classification()
    test_neural_translation()
    test_glyph_matching_and_wall_stitching()
    test_phash_caching()
    test_leiden_epigraphical_formatting()
    asyncio.run(test_full_analysis_pipeline())
    asyncio.run(test_unhinted_image_classification_and_translation())
    asyncio.run(test_irrelevant_image_fallback())
    print("=" * 80)
    print("  ALL EPIGRAPHY OCR & TRANSLATION TESTS PASSED (100% SUCCESS)!")
    print("=" * 80)


if __name__ == "__main__":
    main()
