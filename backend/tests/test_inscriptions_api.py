import pytest


# ---------------------------------------------------------
# 1. Tests for Individual Filters
# ---------------------------------------------------------

def test_filter_by_script_class(client):
    """Test filtering by scriptClass enum."""
    response = client.get("/api/v1/inscriptions?scriptClass=kadamba")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    for ins in data:
        assert ins["scriptClass"] == "kadamba"


def test_filter_by_source_language(client):
    """Test filtering by sourceLanguage enum."""
    response = client.get("/api/v1/inscriptions?sourceLanguage=purvada_halegannada")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["id"] == "ins-halmidi-001"


def test_filter_by_substrate(client):
    """Test filtering by substrate enum."""
    response = client.get("/api/v1/inscriptions?substrate=chlorite_schist")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["id"] == "ins-belur-005"


def test_filter_by_review_status(client):
    """Test filtering by reviewStatus enum."""
    response = client.get("/api/v1/inscriptions?reviewStatus=verified")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 6
    for ins in data:
        assert ins["reviewStatus"] == "verified"


def test_filter_by_historical_period(client):
    """Test filtering by historicalPeriod substring."""
    response = client.get("/api/v1/inscriptions?historicalPeriod=16th")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["id"] == "ins-hampi-006"


# ---------------------------------------------------------
# 2. Tests for searchQuery Across Diverse Fields
# ---------------------------------------------------------

def test_search_query_by_title(client):
    """Search matches English title."""
    response = client.get("/api/v1/inscriptions?searchQuery=halmidi")
    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["id"] == "ins-halmidi-001"


def test_search_query_by_kannada_title(client):
    """Search matches Kannada title."""
    response = client.get("/api/v1/inscriptions?searchQuery=ತಾಳಗುಂದ")
    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["id"] == "ins-talagunda-002"


def test_search_query_by_dynasty(client):
    """Search matches historical dynasty."""
    response = client.get("/api/v1/inscriptions?searchQuery=Hoysala")
    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["id"] == "ins-belur-005"


def test_search_query_by_ruler(client):
    """Search matches historical ruler or hero."""
    response = client.get("/api/v1/inscriptions?searchQuery=Arabhatta")
    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["id"] == "ins-badami-003"


def test_search_query_by_village(client):
    """Search matches discovery findSpot village."""
    response = client.get("/api/v1/inscriptions?searchQuery=Shravanabelagola")
    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["id"] == "ins-shravanabelagola-004"


def test_search_query_by_recognized_text(client):
    """Search matches text inside transcription.recognizedText."""
    response = client.get("/api/v1/inscriptions?searchQuery=ಸಾಧುಗೆ ಸಾಧು")
    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["id"] == "ins-badami-003"


def test_search_query_by_glossary_term(client):
    """Search matches archaic glossary term or english definition."""
    # Matches Kannada term
    resp1 = client.get("/api/v1/inscriptions?searchQuery=ಬಾಗಳ್ಚು")
    assert resp1.status_code == 200
    assert len(resp1.json()) >= 1
    assert resp1.json()[0]["id"] == "ins-halmidi-001"

    # Matches IAST term
    resp2 = client.get("/api/v1/inscriptions?searchQuery=drōhagharattaṁ")
    assert resp2.status_code == 200
    assert len(resp2.json()) == 1
    assert resp2.json()[0]["id"] == "ins-belur-005"

    # Matches English glossary definition
    resp3 = client.get("/api/v1/inscriptions?searchQuery=sword-washing")
    assert resp3.status_code == 200
    assert len(resp3.json()) == 1
    assert resp3.json()[0]["id"] == "ins-halmidi-001"


# ---------------------------------------------------------
# 3. Tests for Combined Filters
# ---------------------------------------------------------

def test_combined_filters(client):
    """Test combining scriptClass, sourceLanguage, and substrate."""
    # Kadamba script + Sanskrit language -> Talagunda
    resp1 = client.get("/api/v1/inscriptions?scriptClass=kadamba&sourceLanguage=sanskrit")
    assert resp1.status_code == 200
    assert len(resp1.json()) == 1
    assert resp1.json()[0]["id"] == "ins-talagunda-002"

    # Granite substrate + searchQuery 'Vijayanagara' -> Hampi
    resp2 = client.get("/api/v1/inscriptions?substrate=granite&searchQuery=Vijayanagara")
    assert resp2.status_code == 200
    assert len(resp2.json()) == 1
    assert resp2.json()[0]["id"] == "ins-hampi-006"

    # Hoysala script + historicalPeriod '12th' -> Belur
    resp3 = client.get("/api/v1/inscriptions?scriptClass=hoysala&historicalPeriod=12th")
    assert resp3.status_code == 200
    assert len(resp3.json()) == 1
    assert resp3.json()[0]["id"] == "ins-belur-005"


# ---------------------------------------------------------
# 4. Tests for Enum Validation (Unknown values return 422)
# ---------------------------------------------------------

def test_invalid_enums_return_422(client):
    """Test that invalid enum query values return 422 with validation error envelope."""
    resp1 = client.get("/api/v1/inscriptions?scriptClass=unrecognized_script")
    assert resp1.status_code == 422
    assert resp1.json()["error"]["code"] == "VALIDATION_ERROR"

    resp2 = client.get("/api/v1/inscriptions?sourceLanguage=latin")
    assert resp2.status_code == 422
    assert resp2.json()["error"]["code"] == "VALIDATION_ERROR"

    resp3 = client.get("/api/v1/inscriptions?substrate=plastic")
    assert resp3.status_code == 422
    assert resp3.json()["error"]["code"] == "VALIDATION_ERROR"

    resp4 = client.get("/api/v1/inscriptions?reviewStatus=disputed")
    assert resp4.status_code == 422
    assert resp4.json()["error"]["code"] == "VALIDATION_ERROR"

    resp5 = client.get("/api/v1/inscriptions?sortBy=random_order")
    assert resp5.status_code == 422
    assert resp5.json()["error"]["code"] == "VALIDATION_ERROR"


# ---------------------------------------------------------
# 5. Tests for Sorting Criteria
# ---------------------------------------------------------

def test_sort_by_date_asc(client):
    """Test sortBy=date_asc orders steles chronologically from oldest to newest."""
    response = client.get("/api/v1/inscriptions?sortBy=date_asc")
    assert response.status_code == 200
    data = response.json()
    ids = [x["id"] for x in data]
    # Halmidi/Talagunda (c. 450 CE) should be before Hampi (1513 CE)
    assert ids.index("ins-halmidi-001") < ids.index("ins-hampi-006")
    assert ids.index("ins-badami-003") < ids.index("ins-hampi-006")


def test_sort_by_date_desc(client):
    """Test sortBy=date_desc orders steles from newest to oldest."""
    response = client.get("/api/v1/inscriptions?sortBy=date_desc")
    assert response.status_code == 200
    data = response.json()
    ids = [x["id"] for x in data]
    # Hampi (1513 CE) should be before Halmidi (c. 450 CE)
    assert ids.index("ins-hampi-006") < ids.index("ins-halmidi-001")


def test_sort_by_title(client):
    """Test sortBy=title orders alphabetically."""
    response = client.get("/api/v1/inscriptions?sortBy=title")
    assert response.status_code == 200
    data = response.json()
    titles = [x["title"] for x in data]
    assert titles == sorted(titles, key=lambda t: t.lower())


def test_sort_by_confidence(client):
    """Test sortBy=confidence orders by highest scriptConfidence first."""
    response = client.get("/api/v1/inscriptions?sortBy=confidence")
    assert response.status_code == 200
    data = response.json()
    confidences = [x["transcription"]["scriptConfidence"] for x in data]
    assert confidences == sorted(confidences, reverse=True)


def test_sort_by_recently_updated(client):
    """Test sortBy=recently_updated executes without error."""
    response = client.get("/api/v1/inscriptions?sortBy=recently_updated")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 6


# ---------------------------------------------------------
# 6. Tests for GET /inscriptions/{id} and 404 Envelope
# ---------------------------------------------------------

def test_get_inscription_valid_and_invalid(client):
    """Test GET /inscriptions/{id} returns 200 or 404 with error envelope."""
    # Valid
    valid_resp = client.get("/api/v1/inscriptions/ins-belur-005")
    assert valid_resp.status_code == 200
    assert valid_resp.json()["id"] == "ins-belur-005"
    assert valid_resp.json()["scriptClass"] == "hoysala"

    # Invalid
    invalid_resp = client.get("/api/v1/inscriptions/non-existent-stele-999")
    assert invalid_resp.status_code == 404
    error_payload = invalid_resp.json()
    assert "error" in error_payload
    assert error_payload["error"]["code"] == "RESOURCE_NOT_FOUND"
    assert "not found" in error_payload["error"]["message"].lower()


# ---------------------------------------------------------
# 7. Tests for PUT /inscriptions/{id} and Persistence
# ---------------------------------------------------------

def test_put_inscription_partial_update(client):
    """
    Test PUT /inscriptions/{id} updates reviewStatus and translations,
    updates lastUpdated, appends an activity log, and persists.
    """
    initial = client.get("/api/v1/inscriptions/ins-badami-003").json()
    original_last_updated = initial["lastUpdated"]

    update_payload = {
        "reviewStatus": "in_review",
        "provenance": "Updated Archaeological Survey 2026 Documentation",
    }

    put_resp = client.put("/api/v1/inscriptions/ins-badami-003", json=update_payload)
    assert put_resp.status_code == 200
    updated = put_resp.json()

    assert updated["id"] == "ins-badami-003"
    assert updated["reviewStatus"] == "in_review"
    assert updated["provenance"] == "Updated Archaeological Survey 2026 Documentation"
    # Immutable fields preserved
    assert updated["accessionNumber"] == initial["accessionNumber"]

    # Verify persistence via subsequent GET
    get_resp = client.get("/api/v1/inscriptions/ins-badami-003")
    assert get_resp.status_code == 200
    assert get_resp.json()["reviewStatus"] == "in_review"

    # Verify activity was appended to activity stream
    activity_resp = client.get("/api/v1/activity?limit=5")
    assert activity_resp.status_code == 200
    activities = activity_resp.json()
    assert any(a["inscriptionId"] == "ins-badami-003" for a in activities)


def test_put_inscription_rejects_immutable_id(client):
    """Test PUT /inscriptions/{id} rejects attempts to modify 'id' with 400 Bad Request."""
    payload = {
        "id": "new-modified-id-hack",
        "reviewStatus": "verified"
    }
    response = client.put("/api/v1/inscriptions/ins-halmidi-001", json=payload)
    assert response.status_code == 400
    data = response.json()
    assert data["error"]["code"] == "IMMUTABLE_FIELD"
    assert "id" in data["error"]["message"]


def test_put_inscription_rejects_immutable_accession_number(client):
    """Test PUT /inscriptions/{id} rejects attempts to modify 'accessionNumber' with 400."""
    payload = {
        "accessionNumber": "TAMPERED-ACCESSION-NUM",
        "reviewStatus": "verified"
    }
    response = client.put("/api/v1/inscriptions/ins-halmidi-001", json=payload)
    assert response.status_code == 400
    data = response.json()
    assert data["error"]["code"] == "IMMUTABLE_FIELD"
    assert "accessionNumber" in data["error"]["message"]


def test_put_inscription_not_found(client):
    """Test PUT on a non-existent ID returns 404 with error envelope."""
    payload = {"reviewStatus": "verified"}
    response = client.put("/api/v1/inscriptions/ins-does-not-exist", json=payload)
    assert response.status_code == 404
    assert response.json()["error"]["code"] == "RESOURCE_NOT_FOUND"
