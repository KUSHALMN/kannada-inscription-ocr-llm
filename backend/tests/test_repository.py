import os
import json
import asyncio
import pytest
from backend.app.repositories.json_repository import (
    JsonFileInscriptionRepository,
    JsonFileActivityRepository,
    JsonFileScriptRepository,
    JsonFileLanguageRepository,
)
from backend.app.schemas import (
    InscriptionRecord,
    ResearchActivityItem,
    ActivityType,
    ScriptClassId,
    SourceLanguageId,
    SubstrateMaterial,
    ConditionRating,
    ReviewStatus,
    Dimensions,
    HistoricalContext,
    FindSpot,
    TranscriptionResult,
    TranslationResult,
)


@pytest.mark.asyncio
async def test_json_repository_load():
    """Verify JsonFileInscriptionRepository loads data/inscriptions.json into memory at startup."""
    repo = JsonFileInscriptionRepository()
    records = await repo.list()
    assert len(records) == 6

    # Verify key historical records are loaded
    ids = [r.id for r in records]
    assert "ins-halmidi-001" in ids
    assert "ins-talagunda-002" in ids
    assert "ins-badami-003" in ids
    assert "ins-shravanabelagola-004" in ids
    assert "ins-belur-005" in ids
    assert "ins-hampi-006" in ids

    halmidi = await repo.get("ins-halmidi-001")
    assert halmidi is not None
    assert halmidi.script_class == ScriptClassId.KADAMBA
    assert halmidi.source_language == SourceLanguageId.PURVADA_HALEGANNADA
    assert halmidi.historical_context.dynasty == "Kadambas of Banavasi"


@pytest.mark.asyncio
async def test_atomic_write(tmp_path):
    """
    Verify that write back is atomic (writes temp file then os.replace) under asyncio.Lock.
    """
    test_file = str(tmp_path / "inscriptions_atomic.json")

    # Initial empty file
    with open(test_file, "w", encoding="utf-8") as f:
        json.dump([], f)

    repo = JsonFileInscriptionRepository(file_path=test_file)
    assert len(await repo.list()) == 0

    record = InscriptionRecord(
        id="ins-test-atomic-01",
        accession_number="TEST-ATM-001",
        title="Atomic Test Inscription",
        kannada_title="ಪರೀಕ್ಷಾರ್ಥ ಶಾಸನ",
        script_class=ScriptClassId.KADAMBA,
        source_language=SourceLanguageId.PURVADA_HALEGANNADA,
        substrate=SubstrateMaterial.SANDSTONE,
        dimensions=Dimensions(height_cm=100.0, width_cm=40.0),
        image_url="/test.jpg",
        condition_rating=ConditionRating.EXCELLENT,
        review_status=ReviewStatus.VERIFIED,
        last_updated="24 Oct 2026",
        historical_context=HistoricalContext(
            dynasty="Kadambas",
            ruler="Kakusthavarma",
            regnal_period="c. 450 CE",
            approximate_date="c. 450 CE",
            century="5th Century CE",
            find_spot=FindSpot(village="Halmidi", taluk="Belur", district="Hassan", state="Karnataka"),
            historical_summary="Summary",
            linguistic_significance="Significance",
        ),
        transcription=TranscriptionResult(
            script_class=ScriptClassId.KADAMBA,
            script_confidence=0.99,
            recognized_text="ನಮಃ",
            iast_transliteration="namaḥ",
            lines=[],
            detected_glyphs_count=4,
        ),
        translation=TranslationResult(
            source_language=SourceLanguageId.PURVADA_HALEGANNADA,
            language_confidence=0.98,
            modern_kannada="ನಮಸ್ಕಾರ",
            english_translation="Salutations",
            glossary=[],
            stylistic_notes="",
        ),
        provenance="Belur",
        current_location="Museum",
    )

    created = await repo.create(record)
    assert created.id == "ins-test-atomic-01"

    # Verify file was written to disk and is valid JSON
    assert os.path.exists(test_file)
    with open(test_file, "r", encoding="utf-8") as f:
        saved_data = json.load(f)
    assert len(saved_data) == 1
    assert saved_data[0]["id"] == "ins-test-atomic-01"
    assert saved_data[0]["accessionNumber"] == "TEST-ATM-001"

    # Verify no dangling .tmp files in directory
    tmp_files = [f for f in os.listdir(str(tmp_path)) if f.endswith(".tmp")]
    assert len(tmp_files) == 0, f"Found unexpected dangling temp files: {tmp_files}"


@pytest.mark.asyncio
async def test_concurrent_writes(tmp_path):
    """
    Verify that concurrent writes under asyncio.Lock execute without
    race conditions, corruptions, or file collision errors.
    """
    test_file = str(tmp_path / "inscriptions_concurrent.json")
    with open(test_file, "w", encoding="utf-8") as f:
        json.dump([], f)

    repo = JsonFileInscriptionRepository(file_path=test_file)

    async def create_worker(index: int):
        rec = InscriptionRecord(
            id=f"ins-worker-{index:03d}",
            accession_number=f"ACC-WORKER-{index:03d}",
            title=f"Worker Inscription {index}",
            kannada_title=f"ಶಾಸನ {index}",
            script_class=ScriptClassId.KADAMBA,
            source_language=SourceLanguageId.PURVADA_HALEGANNADA,
            substrate=SubstrateMaterial.GRANITE,
            image_url=f"/worker_{index}.jpg",
            condition_rating=ConditionRating.FAIR,
            review_status=ReviewStatus.IN_REVIEW,
            last_updated="24 Oct 2026",
            historical_context=HistoricalContext(
                dynasty="Kadambas",
                ruler="King",
                regnal_period="5th C.",
                approximate_date="c. 450 CE",
                century="5th Century CE",
                find_spot=FindSpot(village="Village", taluk="Taluk", district="District", state="Karnataka"),
                historical_summary="Summary",
                linguistic_significance="Significance",
            ),
            transcription=TranscriptionResult(
                script_class=ScriptClassId.KADAMBA,
                script_confidence=0.95,
                recognized_text="ಪಠ್ಯ",
                iast_transliteration="paṭhya",
                lines=[],
                detected_glyphs_count=10,
            ),
            translation=TranslationResult(
                source_language=SourceLanguageId.PURVADA_HALEGANNADA,
                language_confidence=0.92,
                modern_kannada="ಅರ್ಥ",
                english_translation="Meaning",
                glossary=[],
                stylistic_notes="",
            ),
            provenance="Site",
            current_location="Archive",
        )
        return await repo.create(rec)

    # Launch 20 concurrent write tasks
    num_tasks = 20
    results = await asyncio.gather(*(create_worker(i) for i in range(num_tasks)))
    assert len(results) == num_tasks

    # Verify repository memory state
    in_memory = await repo.list()
    assert len(in_memory) == num_tasks

    # Verify on-disk file state
    with open(test_file, "r", encoding="utf-8") as f:
        on_disk = json.load(f)
    assert len(on_disk) == num_tasks
    ids = {item["id"] for item in on_disk}
    assert len(ids) == num_tasks, "Duplicate or overwritten IDs found!"

    # Verify no dangling temp files
    tmp_files = [f for f in os.listdir(str(tmp_path)) if f.endswith(".tmp")]
    assert len(tmp_files) == 0


@pytest.mark.asyncio
async def test_scripts_and_languages_repository():
    """Verify ScriptRepository orderIndex 0-9 and LanguageRepository."""
    script_repo = JsonFileScriptRepository()
    scripts = await script_repo.list()
    assert len(scripts) == 10

    # Ensure chronological order index 0-9
    for idx, s in enumerate(scripts):
        assert s.order_index == idx
    assert scripts[0].id == ScriptClassId.ASHOKA
    assert scripts[9].id == ScriptClassId.PRESENT_KANNADA

    lang_repo = JsonFileLanguageRepository()
    languages = await lang_repo.list()
    assert len(languages) == 6
    prakrit = await lang_repo.get(SourceLanguageId.PRAKRIT)
    assert prakrit is not None
    assert prakrit.name == "Prakrit (Southern Epigraphical)"
