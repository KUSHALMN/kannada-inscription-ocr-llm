import io
from PIL import Image


def test_health_check(client):
    """Test GET /api/v1/health returns healthy telemetry."""
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "version" in data
    assert "appName" in data


def test_list_scripts(client):
    """Test GET /api/v1/scripts returns 10 script classes."""
    response = client.get("/api/v1/scripts")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 10
    ids = [s["id"] for s in data]
    assert "ashoka" in ids
    assert "kadamba" in ids
    assert "present_kannada" in ids


def test_get_script_by_id(client):
    """Test GET /api/v1/scripts/{id} for valid and invalid IDs."""
    response = client.get("/api/v1/scripts/kadamba")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == "kadamba"
    assert "diagnosticFeatures" in data

    # Invalid ID returns 422 because of Enum type validation
    invalid_resp = client.get("/api/v1/scripts/nonexistent_script")
    assert invalid_resp.status_code == 422
    assert "error" in invalid_resp.json()
    assert invalid_resp.json()["error"]["code"] == "VALIDATION_ERROR"


def test_list_languages(client):
    """Test GET /api/v1/languages returns 6 languages."""
    response = client.get("/api/v1/languages")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 6
    ids = [l["id"] for l in data]
    assert "purvada_halegannada" in ids
    assert "hosagannada" in ids


def test_get_inscriptions_and_filters(client):
    """Test GET /api/v1/inscriptions with query parameters."""
    response = client.get("/api/v1/inscriptions")
    assert response.status_code == 200
    all_inscriptions = response.json()
    assert len(all_inscriptions) == 6
    seeded_ids = [ins["id"] for ins in all_inscriptions]
    assert "ins-halmidi-001" in seeded_ids
    assert "ins-talagunda-002" in seeded_ids
    assert "ins-badami-003" in seeded_ids
    assert "ins-shravanabelagola-004" in seeded_ids
    assert "ins-belur-005" in seeded_ids
    assert "ins-hampi-006" in seeded_ids

    # Filter by scriptClass
    kadamba_resp = client.get("/api/v1/inscriptions?scriptClass=kadamba")
    assert kadamba_resp.status_code == 200
    for ins in kadamba_resp.json():
        assert ins["scriptClass"] == "kadamba"

    # Search query
    search_resp = client.get("/api/v1/inscriptions?searchQuery=halmidi")
    assert search_resp.status_code == 200
    assert len(search_resp.json()) >= 1
    assert "Halmidi" in search_resp.json()[0]["title"]


def test_get_inscription_by_id(client):
    """Test GET /api/v1/inscriptions/{id} and 404 response."""
    response = client.get("/api/v1/inscriptions/ins-halmidi-001")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == "ins-halmidi-001"
    assert data["scriptClass"] == "kadamba"
    assert "transcription" in data
    assert "translation" in data

    not_found = client.get("/api/v1/inscriptions/non-existent-999")
    assert not_found.status_code == 404
    assert not_found.json()["error"]["code"] == "RESOURCE_NOT_FOUND"


def test_activity_and_lexicon(client):
    """Test GET /api/v1/activity and GET /api/v1/lexicon."""
    act_resp = client.get("/api/v1/activity?limit=5")
    assert act_resp.status_code == 200
    assert len(act_resp.json()) > 0

    lex_resp = client.get("/api/v1/lexicon")
    assert lex_resp.status_code == 200
    assert len(lex_resp.json()) > 0


def test_analyze_endpoint(client):
    """Test POST /api/v1/analyze with a multipart image file upload."""
    # Create small valid test image in memory
    img = Image.new("RGB", (300, 400), color=(180, 160, 140))
    buffer = io.BytesIO()
    img.save(buffer, format="JPEG")
    buffer.seek(0)

    files = {
        "file": ("test_rubbing.jpg", buffer, "image/jpeg")
    }
    data = {
        "title": "Field Test Stele",
        "location": "Belur, Hassan",
        "knownScript": "kadamba",
        "knownLanguage": "purvada_halegannada",
    }

    response = client.post("/api/v1/analyze", files=files, data=data)
    assert response.status_code == 200
    res = response.json()
    assert res["status"] == "completed"
    assert res["inferredScript"] == "kadamba"
    assert res["inferredLanguage"] == "purvada_halegannada"
    assert "transcription" in res
    assert "translation" in res
    assert "historicalContext" in res
    assert len(res["transcription"]["lines"]) > 0
    assert "boundingBox" in res["transcription"]["lines"][0]


def test_analyze_unsupported_file_type(client):
    """Test POST /api/v1/analyze with non-image file returns 415."""
    buffer = io.BytesIO(b"%PDF-1.4...")
    files = {
        "file": ("doc.pdf", buffer, "application/pdf")
    }
    response = client.post("/api/v1/analyze", files=files)
    assert response.status_code == 415
    assert response.json()["error"]["code"] == "HTTP_415"


def test_root_level_endpoints(client):
    """Test that /scripts, /languages, /activity?limit=10 work directly as well as /api/v1/."""
    scripts_resp = client.get("/scripts")
    assert scripts_resp.status_code == 200
    assert len(scripts_resp.json()) == 10

    langs_resp = client.get("/languages")
    assert langs_resp.status_code == 200
    assert len(langs_resp.json()) == 6

    act_resp = client.get("/activity?limit=10")
    assert act_resp.status_code == 200
    assert len(act_resp.json()) <= 10
