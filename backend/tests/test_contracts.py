import io
import os
import time
import jsonschema
import pytest
from PIL import Image

from backend.app.schemas import (
    HealthResponse,
    ScriptClassMetadata,
    SourceLanguageMetadata,
    InscriptionRecord,
    ResearchActivityItem,
    AnalysisJobResult,
    AsyncJobAccepted,
    JobStatusResponse,
)
from backend.app.core.rate_limit import analyze_rate_limiter
from backend.app.services.cleanup_service import StorageCleanupService


def create_test_image(img_format: str = "JPEG", size=(30, 30)) -> bytes:
    buf = io.BytesIO()
    img = Image.new("RGB", size, color=(160, 140, 100))
    img.save(buf, format=img_format)
    return buf.getvalue()


# =====================================================================
# 1. JSON Schema Contract Tests
# =====================================================================

def test_contract_health_response(client):
    """GET /api/v1/health response strictly conforms to HealthResponse JSON Schema."""
    schema = HealthResponse.model_json_schema()
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    jsonschema.validate(instance=data, schema=schema)
    assert "x-request-id" in response.headers


def test_contract_script_classes(client):
    """GET /api/v1/scripts items conform to ScriptClassMetadata JSON Schema."""
    schema = ScriptClassMetadata.model_json_schema()
    response = client.get("/api/v1/scripts")
    assert response.status_code == 200
    for script in response.json():
        jsonschema.validate(instance=script, schema=schema)

    single_resp = client.get("/api/v1/scripts/kadamba")
    assert single_resp.status_code == 200
    jsonschema.validate(instance=single_resp.json(), schema=schema)


def test_contract_source_languages(client):
    """GET /api/v1/languages items conform to SourceLanguageMetadata JSON Schema."""
    schema = SourceLanguageMetadata.model_json_schema()
    response = client.get("/api/v1/languages")
    assert response.status_code == 200
    for lang in response.json():
        jsonschema.validate(instance=lang, schema=schema)

    single_resp = client.get("/api/v1/languages/purvada_halegannada")
    assert single_resp.status_code == 200
    jsonschema.validate(instance=single_resp.json(), schema=schema)


def test_contract_inscriptions(client):
    """GET /api/v1/inscriptions items conform to InscriptionRecord JSON Schema."""
    schema = InscriptionRecord.model_json_schema()
    response = client.get("/api/v1/inscriptions")
    assert response.status_code == 200
    for record in response.json():
        jsonschema.validate(instance=record, schema=schema)

    single_resp = client.get("/api/v1/inscriptions/ins-halmidi-001")
    assert single_resp.status_code == 200
    jsonschema.validate(instance=single_resp.json(), schema=schema)


def test_contract_research_activity(client):
    """GET /api/v1/activity items conform to ResearchActivityItem JSON Schema."""
    schema = ResearchActivityItem.model_json_schema()
    response = client.get("/api/v1/activity?limit=5")
    assert response.status_code == 200
    for act in response.json():
        jsonschema.validate(instance=act, schema=schema)


def test_contract_sync_analyze(client):
    """POST /api/v1/analyze response conforms to AnalysisJobResult JSON Schema."""
    schema = AnalysisJobResult.model_json_schema()
    files = {"file": ("contract_test.jpg", create_test_image(), "image/jpeg")}
    response = client.post("/api/v1/analyze", files=files)
    assert response.status_code == 200
    data = response.json()
    jsonschema.validate(instance=data, schema=schema)


def test_contract_async_analyze_and_job_status(client):
    """POST /api/v1/analyze?async=true and GET /jobs/{jobId} conform to respective schemas."""
    async_schema = AsyncJobAccepted.model_json_schema()
    job_schema = JobStatusResponse.model_json_schema()

    files = {"file": ("contract_async.jpg", create_test_image(), "image/jpeg")}
    resp = client.post("/api/v1/analyze?async=true", files=files)
    assert resp.status_code == 200
    async_data = resp.json()
    jsonschema.validate(instance=async_data, schema=async_schema)

    job_id = async_data["jobId"]
    status_resp = client.get(f"/api/v1/jobs/{job_id}")
    assert status_resp.status_code == 200
    jsonschema.validate(instance=status_resp.json(), schema=job_schema)


# =====================================================================
# 2. Request-ID Middleware Tests
# =====================================================================

def test_request_id_middleware_generates_and_propagates(client):
    """Server generates X-Request-ID if missing, and echoes client provided ID."""
    # Auto-generated
    resp1 = client.get("/api/v1/health")
    assert "x-request-id" in resp1.headers
    assert resp1.headers["x-request-id"].startswith("req-")

    # Custom echoed
    custom_id = "req-custom-client-trace-12345"
    resp2 = client.get("/api/v1/health", headers={"X-Request-ID": custom_id})
    assert resp2.headers["x-request-id"] == custom_id


# =====================================================================
# 3. Rate Limiter Tests
# =====================================================================

def test_analyze_rate_limit_enforced(client, monkeypatch):
    """Rate limit of N requests/minute triggers 429 Too Many Requests."""
    import backend.app.config as cfg
    monkeypatch.setattr(cfg.settings, "RATE_LIMIT_ANALYZE_PER_MINUTE", 2)
    analyze_rate_limiter.reset()

    files1 = {"file": ("t1.jpg", create_test_image(), "image/jpeg")}
    files2 = {"file": ("t2.jpg", create_test_image(), "image/jpeg")}
    files3 = {"file": ("t3.jpg", create_test_image(), "image/jpeg")}

    resp1 = client.post("/api/v1/analyze", files=files1)
    assert resp1.status_code == 200

    resp2 = client.post("/api/v1/analyze", files=files2)
    assert resp2.status_code == 200

    # 3rd request should exceed the limit of 2/minute
    resp3 = client.post("/api/v1/analyze", files=files3)
    assert resp3.status_code == 429
    assert "retry-after" in resp3.headers
    assert "rate limit exceeded" in resp3.json()["error"]["message"].lower()

    analyze_rate_limiter.reset()


# =====================================================================
# 4. Storage Cleanup Tests
# =====================================================================

def test_storage_cleanup_service(tmp_path):
    """StorageCleanupService unlinks files older than retention days and keeps recent ones."""
    uploads_dir = tmp_path / "uploads"
    uploads_dir.mkdir()

    # 1. Recent file (now)
    recent_file = uploads_dir / "recent.jpg"
    recent_file.write_bytes(b"recent_image_data")

    # 2. Expired file (mtime 10 days ago)
    old_file = uploads_dir / "old_job.jpg"
    old_file.write_bytes(b"old_image_data_to_purge")
    ten_days_ago = time.time() - (10 * 86400)
    os.utime(str(old_file), (ten_days_ago, ten_days_ago))

    # 3. .gitkeep (must never be deleted)
    gitkeep = uploads_dir / ".gitkeep"
    gitkeep.write_text("# keep")
    os.utime(str(gitkeep), (ten_days_ago, ten_days_ago))

    cleaner = StorageCleanupService(retention_days=7, target_directories=[str(uploads_dir)])
    metrics = cleaner.purge_expired_files()

    assert metrics["deleted_files"] == 1
    assert metrics["freed_bytes"] > 0
    assert not old_file.exists(), "Expired file should be unlinked"
    assert recent_file.exists(), "Recent file should remain untouched"
    assert gitkeep.exists(), ".gitkeep must be preserved"
