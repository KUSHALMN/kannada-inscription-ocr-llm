import io
import os
import pytest
from PIL import Image
from backend.app.schemas import ScriptClassId, SourceLanguageId
from backend.app.services.analysis_service import AnalysisService
from backend.app.ml_adapters.mock_adapters import (
    MockPreprocessor,
    MockSegmenter,
    MockScriptClassifier,
    MockRecognizer,
    MockTransliterator,
    MockTranslator,
)
from backend.app.api.deps import get_analysis_service
from backend.app.main import app


def create_test_image(img_format: str = "JPEG", size=(50, 50), color=(180, 150, 120)) -> bytes:
    """Helper to generate valid in-memory image bytes."""
    buf = io.BytesIO()
    img = Image.new("RGB", size, color=color)
    img.save(buf, format=img_format)
    return buf.getvalue()


class FailingTranslator(MockTranslator):
    def translate(self, text: str, script_class: ScriptClassId, source_language: SourceLanguageId):
        raise RuntimeError("Neural Translation Transformer failed to converge.")


class FailingSegmenter(MockSegmenter):
    def segment(self, image):
        raise RuntimeError("Line segmentation model memory allocation failed.")


# =====================================================================
# 1. Upload Validation Tests
# =====================================================================

def test_analyze_empty_file_rejected(client):
    """Uploading an empty 0-byte file returns 400 Bad Request."""
    files = {"file": ("empty.jpg", b"", "image/jpeg")}
    response = client.post("/api/v1/analyze", files=files)
    assert response.status_code == 400
    data = response.json()
    assert "error" in data
    assert "empty" in data["error"]["message"].lower()


def test_analyze_corrupted_image_rejected(client):
    """Uploading a file with truncated/corrupted image payload returns 400 Bad Request."""
    valid_jpeg = create_test_image(img_format="JPEG", size=(100, 100))
    corrupted_jpeg = valid_jpeg[:len(valid_jpeg) // 2]
    files = {"file": ("rubbing.jpg", corrupted_jpeg, "image/jpeg")}
    response = client.post("/api/v1/analyze", files=files)
    assert response.status_code == 400
    data = response.json()
    assert "error" in data
    assert "corrupted" in data["error"]["message"].lower() or "invalid" in data["error"]["message"].lower()


def test_analyze_unsupported_format_rejected(client):
    """Uploading an unsupported image format (e.g. BMP) returns 415 Unsupported Media Type."""
    bmp_bytes = create_test_image(img_format="BMP")
    files = {"file": ("rubbing.bmp", bmp_bytes, "image/bmp")}
    response = client.post("/api/v1/analyze", files=files)
    assert response.status_code == 415
    data = response.json()
    assert "error" in data
    assert "unsupported" in data["error"]["message"].lower() or "bmp" in data["error"]["message"].lower()


def test_analyze_file_size_exceeded_rejected(client, monkeypatch):
    """Uploading a file exceeding MAX_FILE_SIZE returns 413 Request Entity Too Large."""
    # Temporarily set max file size to 100 bytes for fast test execution
    import backend.app.api.v1.analysis as analysis_mod
    monkeypatch.setattr(analysis_mod, "MAX_FILE_SIZE", 100)

    jpeg_bytes = create_test_image(img_format="JPEG")
    assert len(jpeg_bytes) > 100

    files = {"file": ("oversized.jpg", jpeg_bytes, "image/jpeg")}
    response = client.post("/api/v1/analyze", files=files)
    assert response.status_code == 413
    data = response.json()
    assert "error" in data
    assert "exceeds" in data["error"]["message"].lower()


# =====================================================================
# 2. Mock End-to-End Analysis Tests
# =====================================================================

def test_analyze_mock_end_to_end_success(client):
    """Valid upload executes complete mock pipeline and returns camelCase AnalysisJobResult."""
    jpeg_bytes = create_test_image(img_format="JPEG", size=(80, 80))
    files = {"file": ("halmidi_stele.jpg", jpeg_bytes, "image/jpeg")}
    data_form = {
        "title": "Halmidi Epigraph Rubbing",
        "location": "Halmidi, Hassan",
        "dynasty": "Kadambas of Banavasi",
        "approximateDate": "c. 450 CE",
        "knownScript": "uncertain",
        "knownLanguage": "uncertain",
        "researcherNotes": "Pristine basalt slab rubbing taken in field expedition.",
    }

    response = client.post("/api/v1/analyze", files=files, data=data_form)
    assert response.status_code == 200
    res = response.json()

    # Core identification fields
    assert res["jobId"].startswith("job-")
    assert res["status"] == "completed"
    assert res["isDemonstrationOnly"] is True
    assert res["adapterSource"] == "mock_local"

    # Inferred script & language (uncertain leaves inference intact)
    assert res["inferredScript"] == "kadamba"
    assert res["inferredLanguage"] == "purvada_halegannada"

    # Per-class probabilities
    assert "perClassProbs" in res
    assert res["perClassProbs"]["kadamba"] >= 0.90

    # Per-step timings dictionary
    assert "timings" in res
    timings = res["timings"]
    assert "preprocessing" in timings
    assert "segmentation" in timings
    assert "classification" in timings
    assert "recognition_and_transliteration" in timings
    assert "translation" in timings
    assert "context_synthesis" in timings
    assert "total_pipeline" in timings
    assert timings["total_pipeline"] >= 0

    # Transcription details
    transcription = res["transcription"]
    assert transcription["scriptClass"] == "kadamba"
    assert transcription["scriptConfidence"] >= 0.90
    assert len(transcription["recognizedText"]) > 0
    assert len(transcription["iastTransliteration"]) > 0
    assert len(transcription["lines"]) > 0
    assert transcription["detectedGlyphsCount"] > 0
    assert transcription["isMockData"] is True

    # Translation details
    translation = res["translation"]
    assert translation["sourceLanguage"] == "purvada_halegannada"
    assert len(translation["modernKannada"]) > 0
    assert len(translation["englishTranslation"]) > 0
    assert len(translation["glossary"]) > 0
    assert translation["isMockData"] is True

    # Historical context details
    ctx = res["historicalContext"]
    assert ctx["dynasty"] == "Kadambas of Banavasi"
    assert ctx["findSpot"]["village"] == "Halmidi"
    assert ctx["findSpot"]["district"] == "Hassan"
    assert len(ctx["findSpot"]["coordinates"]) == 2

    # Verify upload was stored in storage/uploads/
    from backend.app.config import settings
    expected_storage_path = os.path.join(settings.STORAGE_UPLOADS_DIR, f"{res['jobId']}.jpg")
    assert os.path.exists(expected_storage_path)
    # Clean up test artifact from disk
    if os.path.exists(expected_storage_path):
        os.remove(expected_storage_path)


def test_analyze_known_script_and_language_override(client):
    """
    knownScript / knownLanguage override inferred values when specified,
    while still reporting model confidence and perClassProbs.
    """
    png_bytes = create_test_image(img_format="PNG")
    files = {"file": ("badami_cliff.png", png_bytes, "image/png")}
    data_form = {
        "title": "Badami Cliff Inscription",
        "knownScript": "badami_chalukya",
        "knownLanguage": "halegannada",
    }

    response = client.post("/api/v1/analyze", files=files, data=data_form)
    assert response.status_code == 200
    res = response.json()

    # The override takes effect
    assert res["inferredScript"] == "badami_chalukya"
    assert res["inferredLanguage"] == "halegannada"

    # But script classification confidence and probabilities are still returned
    assert res["transcription"]["scriptConfidence"] >= 0.90
    assert "kadamba" in res["perClassProbs"]

    # Clean up test upload
    from backend.app.config import settings
    path = os.path.join(settings.STORAGE_UPLOADS_DIR, f"{res['jobId']}.png")
    if os.path.exists(path):
        os.remove(path)


# =====================================================================
# 3. Partial Failure Pipeline Tests
# =====================================================================

def test_analyze_partial_failure_on_translation_step(client):
    """
    If the translation step encounters an unexpected error, the pipeline
    returns HTTP 200 with status='partial', completed earlier steps intact,
    and a descriptive errorMessage without a 500 crash.
    """
    # Create AnalysisService with a failing translator
    partial_service = AnalysisService(translator=FailingTranslator())
    app.dependency_overrides[get_analysis_service] = lambda: partial_service

    try:
        jpeg_bytes = create_test_image(img_format="JPEG")
        files = {"file": ("fragment.jpg", jpeg_bytes, "image/jpeg")}

        response = client.post("/api/v1/analyze", files=files)
        assert response.status_code == 200
        res = response.json()

        assert res["status"] == "partial"
        assert res["errorMessage"] is not None
        assert "translation" in res["errorMessage"].lower()

        # Earlier steps must remain successfully populated
        assert res["inferredScript"] == "kadamba"
        assert res["transcription"] is not None
        assert len(res["transcription"]["recognizedText"]) > 0

        # Translation contains placeholder/partial indicator
        assert "ತಾಂತ್ರಿಕ ಅಡಚಣೆ" in res["translation"]["modernKannada"] or "partial" in res["translation"]["stylisticNotes"].lower()

        # Clean up upload file
        from backend.app.config import settings
        path = os.path.join(settings.STORAGE_UPLOADS_DIR, f"{res['jobId']}.jpg")
        if os.path.exists(path):
            os.remove(path)
    finally:
        app.dependency_overrides.pop(get_analysis_service, None)


def test_analyze_partial_failure_on_segmentation_step(client):
    """
    If segmentation fails, the pipeline still recovers gracefully, returns HTTP 200
    with status='partial', and reports errorMessage.
    """
    partial_service = AnalysisService(segmenter=FailingSegmenter())
    app.dependency_overrides[get_analysis_service] = lambda: partial_service

    try:
        jpeg_bytes = create_test_image(img_format="JPEG")
        files = {"file": ("damaged.jpg", jpeg_bytes, "image/jpeg")}

        response = client.post("/api/v1/analyze", files=files)
        assert response.status_code == 200
        res = response.json()

        assert res["status"] == "partial"
        assert "segmentation" in res["errorMessage"].lower()

        # Clean up upload file
        from backend.app.config import settings
        path = os.path.join(settings.STORAGE_UPLOADS_DIR, f"{res['jobId']}.jpg")
        if os.path.exists(path):
            os.remove(path)
    finally:
        app.dependency_overrides.pop(get_analysis_service, None)


def test_analyze_image_url_and_auto_save_catalog(client):
    """
    Verifies that /analyze returns accessible imageUrl and when autoSave=true,
    persists an InscriptionRecord retrievable via /inscriptions/{id}.
    """
    jpeg_bytes = create_test_image(img_format="JPEG", size=(64, 64))
    files = {"file": ("temple_stele.jpg", jpeg_bytes, "image/jpeg")}
    data_form = {"title": "Aihole Inscription Stele", "autoSave": "true"}

    response = client.post("/api/v1/analyze?autoSave=true", files=files, data=data_form)
    assert response.status_code == 200
    res = response.json()

    assert "imageUrl" in res
    assert res["imageUrl"].startswith("/uploads/")
    assert "recordId" in res
    assert res["recordId"] is not None

    record_id = res["recordId"]
    try:
        # Verify inscription is persisted in catalog
        get_resp = client.get(f"/api/v1/inscriptions/{record_id}")
        assert get_resp.status_code == 200
        saved_record = get_resp.json()
        assert saved_record["id"] == record_id
        assert saved_record["imageUrl"] == res["imageUrl"]
        assert saved_record["reviewStatus"] == "pending_verification"
    finally:
        # Clean up record to preserve test isolation
        from backend.app.api.deps import get_inscription_repository
        if get_inscription_repository in app.dependency_overrides:
            repo = app.dependency_overrides[get_inscription_repository]()
            repo._inscriptions = [r for r in repo._inscriptions if r.id != record_id]
            import asyncio
            asyncio.run(repo._write_atomic())
