import io
import os
import time
import pytest
from PIL import Image

from backend.app.config import settings
from backend.app.main import app
from backend.app.schemas import ReviewStatus, AnalysisJobResult
from backend.app.services.analysis_service import AnalysisService
from backend.app.services.job_manager import JobQueueManager, job_manager
from backend.app.ml_adapters.mock_adapters import MockPreprocessor
from backend.app.api.deps import get_analysis_service, get_job_manager


def create_test_image(img_format: str = "JPEG", size=(40, 40)) -> bytes:
    buf = io.BytesIO()
    img = Image.new("RGB", size, color=(200, 160, 120))
    img.save(buf, format=img_format)
    return buf.getvalue()


class SlowMockPreprocessor(MockPreprocessor):
    """Slow preprocessor simulating compute-intensive deep learning preprocessing."""
    def __init__(self, delay_sec: float = 0.25):
        self.delay_sec = delay_sec

    def process(self, image: Image.Image):
        time.sleep(self.delay_sec)
        return super().process(image)


# =====================================================================
# 1. Async Enqueue and Polling Tests
# =====================================================================

def test_analyze_async_enqueue_returns_queued(client):
    """POST /analyze?async=true immediately returns {jobId, status: 'queued'}."""
    jpeg_bytes = create_test_image()
    files = {"file": ("stele.jpg", jpeg_bytes, "image/jpeg")}
    response = client.post("/api/v1/analyze?async=true", files=files)
    assert response.status_code == 200
    data = response.json()

    assert "jobId" in data
    assert data["jobId"].startswith("job-")
    assert data["status"] == "queued"


def test_async_job_lifecycle_with_slow_mock_step(client):
    """
    Submits a job with a slow mock step, polls GET /jobs/{jobId} to verify
    running state with progress and currentStep, then verifies completion.
    """
    slow_service = AnalysisService(preprocessor=SlowMockPreprocessor(delay_sec=0.3))
    app.dependency_overrides[get_analysis_service] = lambda: slow_service

    try:
        jpeg_bytes = create_test_image()
        files = {"file": ("slow_rubbing.jpg", jpeg_bytes, "image/jpeg")}
        data_form = {
            "title": "Badami North Cliff Inscription",
            "location": "Badami, Bagalkot",
            "dynasty": "Badami Chalukyas",
        }

        # 1. Enqueue job
        resp = client.post("/api/v1/analyze?async=true", files=files, data=data_form)
        assert resp.status_code == 200
        job_id = resp.json()["jobId"]

        # 2. Poll while running (expect queued or running)
        observed_running = False
        start_time = time.time()
        final_job = None

        while time.time() - start_time < 5.0:
            status_resp = client.get(f"/api/v1/jobs/{job_id}")
            assert status_resp.status_code == 200
            job_data = status_resp.json()

            if job_data["status"] == "running":
                observed_running = True
                assert job_data["progress"] >= 5
                assert job_data["currentStep"] in ("initializing", "preprocessing", "segmentation", "classification")

            if job_data["status"] == "completed":
                final_job = job_data
                break

            time.sleep(0.05)

        assert observed_running is True, "Expected job to transition through 'running' state."
        assert final_job is not None, "Job did not complete within the timeout period."
        assert final_job["status"] == "completed"
        assert final_job["progress"] == 100
        assert final_job["currentStep"] == "completed"
        assert final_job["result"] is not None

        # Verify AnalysisJobResult fields
        res = final_job["result"]
        assert res["inferredScript"] == "kadamba"
        assert "transcription" in res
        assert "translation" in res
        assert "historicalContext" in res
        assert "timings" in res

    finally:
        app.dependency_overrides.pop(get_analysis_service, None)


# =====================================================================
# 2. Persistence and Server Restart Recovery
# =====================================================================

def test_completed_job_persisted_to_disk_survives_memory_clear(client):
    """
    Finished job results are saved in storage/jobs/{jobId}.json and can be retrieved
    even if the in-memory cache is purged (simulating a process restart).
    """
    jpeg_bytes = create_test_image()
    files = {"file": ("persistence_check.jpg", jpeg_bytes, "image/jpeg")}

    resp = client.post("/api/v1/analyze?async=true", files=files)
    assert resp.status_code == 200
    job_id = resp.json()["jobId"]

    # Wait for completion
    for _ in range(30):
        time.sleep(0.05)
        res = client.get(f"/api/v1/jobs/{job_id}").json()
        if res["status"] == "completed":
            break
    assert res["status"] == "completed"

    # Verify JSON file exists in storage/jobs/
    json_path = os.path.join(settings.STORAGE_JOBS_DIR, f"{job_id}.json")
    assert os.path.exists(json_path)

    # Purge in-memory store to simulate server restart
    job_manager._jobs.clear()

    # Query GET /jobs/{jobId} after in-memory purge
    recovered_resp = client.get(f"/api/v1/jobs/{job_id}")
    assert recovered_resp.status_code == 200
    recovered_data = recovered_resp.json()
    assert recovered_data["jobId"] == job_id
    assert recovered_data["status"] == "completed"
    assert recovered_data["progress"] == 100
    assert recovered_data["result"] is not None


def test_get_non_existent_job_returns_404(client):
    """Querying a non-existent job ID returns 404."""
    resp = client.get("/api/v1/jobs/job-unknown-id-0000")
    assert resp.status_code == 404
    data = resp.json()
    assert "error" in data
    assert "not found" in data["error"]["message"].lower()


# =====================================================================
# 3. Save Completed Job as Inscription Record
# =====================================================================

def test_save_completed_job_to_catalog(client):
    """
    POST /api/v1/analyze/{jobId}/save converts a finished job into an
    InscriptionRecord with reviewStatus='pending_verification'.
    """
    jpeg_bytes = create_test_image()
    files = {"file": ("talagunda_pillar.jpg", jpeg_bytes, "image/jpeg")}
    data_form = {
        "title": "Talagunda Pillar Inscription",
        "location": "Talagunda, Shikaripura",
        "dynasty": "Kadambas of Banavasi",
    }

    # 1. Enqueue and wait for completion
    resp = client.post("/api/v1/analyze?async=true", files=files, data=data_form)
    assert resp.status_code == 200
    job_id = resp.json()["jobId"]

    for _ in range(30):
        time.sleep(0.05)
        status_data = client.get(f"/api/v1/jobs/{job_id}").json()
        if status_data["status"] == "completed":
            break
    assert status_data["status"] == "completed"

    # 2. Save job to catalog
    save_resp = client.post(f"/api/v1/analyze/{job_id}/save")
    assert save_resp.status_code == 201
    record = save_resp.json()

    try:
        assert record["id"].startswith("ins-")
        assert record["accessionNumber"].startswith("ASI-2026-")
        assert record["reviewStatus"] == "pending_verification"
        assert record["scriptClass"] == "kadamba"
        assert record["sourceLanguage"] == "purvada_halegannada"
        assert record["historicalContext"] is not None
        assert record["transcription"] is not None
        assert record["translation"] is not None

        # 3. Verify record is retrievable from /api/v1/inscriptions/{id}
        catalog_resp = client.get(f"/api/v1/inscriptions/{record['id']}")
        assert catalog_resp.status_code == 200
        assert catalog_resp.json()["id"] == record["id"]

        # 4. Verify research activity was logged
        act_resp = client.get("/api/v1/activity?limit=5")
        assert act_resp.status_code == 200
        activities = act_resp.json()
        assert any("Rubbing Catalogued" in a["title"] for a in activities)
    finally:
        from backend.app.api.deps import get_inscription_repository
        if get_inscription_repository in app.dependency_overrides:
            repo = app.dependency_overrides[get_inscription_repository]()
            repo._inscriptions = [r for r in repo._inscriptions if r.id != record["id"]]
            import asyncio
            asyncio.run(repo._write_atomic())



def test_save_non_existent_or_running_job_rejected(client):
    """Attempting to save a non-existent or uncompleted job returns appropriate error."""
    # 404 for non-existent job
    resp404 = client.post("/api/v1/analyze/job-ghost-999/save")
    assert resp404.status_code == 404

    # 400 for a job that is still queued/running
    from backend.app.services.job_manager import JobRecord
    fake_job_id = "job-fake-running-123"
    job_manager._jobs[fake_job_id] = JobRecord(
        job_id=fake_job_id,
        status="running",
        progress=25,
        current_step="preprocessing",
    )
    try:
        resp400 = client.post(f"/api/v1/analyze/{fake_job_id}/save")
        assert resp400.status_code == 400
        assert "cannot be saved" in resp400.json()["error"]["message"]
    finally:
        job_manager._jobs.pop(fake_job_id, None)


# =====================================================================
# 4. Concurrency Serialization Test
# =====================================================================

def test_single_worker_serializes_execution(client):
    """
    Verifies that with single-worker concurrency, jobs do not execute in parallel:
    Job 2 remains 'queued' while Job 1 is 'running'.
    """
    slow_service = AnalysisService(preprocessor=SlowMockPreprocessor(delay_sec=0.4))
    app.dependency_overrides[get_analysis_service] = lambda: slow_service

    try:
        img1 = create_test_image()
        img2 = create_test_image()

        # Enqueue job 1
        resp1 = client.post("/api/v1/analyze?async=true", files={"file": ("j1.jpg", img1, "image/jpeg")})
        job1_id = resp1.json()["jobId"]

        # Enqueue job 2 immediately
        resp2 = client.post("/api/v1/analyze?async=true", files={"file": ("j2.jpg", img2, "image/jpeg")})
        job2_id = resp2.json()["jobId"]

        # Check immediate status: Job 1 running, Job 2 must still be queued
        time.sleep(0.08)
        st1 = client.get(f"/api/v1/jobs/{job1_id}").json()["status"]
        st2 = client.get(f"/api/v1/jobs/{job2_id}").json()["status"]

        if st1 == "running":
            assert st2 == "queued", f"Expected job 2 to be queued while job 1 is running, got {st2}"

        # Wait for both to finish
        for _ in range(40):
            time.sleep(0.05)
            s2 = client.get(f"/api/v1/jobs/{job2_id}").json()["status"]
            if s2 == "completed":
                break
        assert s2 == "completed"
    finally:
        app.dependency_overrides.pop(get_analysis_service, None)
