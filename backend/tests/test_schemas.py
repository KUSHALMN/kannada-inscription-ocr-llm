import pytest
from pydantic import ValidationError

# Explicitly import EVERY domain schema and Enum as requested
from backend.app.schemas import (
    CamelModel,
    ScriptClassId,
    SourceLanguageId,
    SubstrateMaterial,
    ReviewStatus,
    ConditionRating,
    ActivityType,
    Dimensions,
    BoundingBox,
    SegmentedLine,
    ArchaicGlossaryItem,
    TranscriptionResult,
    TranslationResult,
    FindSpot,
    HistoricalContext,
    InscriptionRecord,
    ResearchActivityItem,
    ScriptRelationship,
    SampleGlyphItem,
    ScriptClassMetadata,
    SourceLanguageMetadata,
    AnalysisJobResult,
    InscriptionFilter,
    TranscriptionUpdateRequest,
    TranslationUpdateRequest,
    ReviewStatusUpdateRequest,
)


def test_import_every_schema():
    """Verify that all schemas and enums can be imported and initialized without errors."""
    assert ScriptClassId.ASHOKA == "ashoka"
    assert ScriptClassId.PRESENT_KANNADA == "present_kannada"
    assert len(list(ScriptClassId)) == 10

    assert SourceLanguageId.PURVADA_HALEGANNADA == "purvada_halegannada"
    assert len(list(SourceLanguageId)) == 6

    assert SubstrateMaterial.CHLORITE_SCHIST == "chlorite_schist"
    assert ReviewStatus.VERIFIED == "verified"
    assert ConditionRating.WEATHERED == "weathered"
    assert ActivityType.TRANSCRIPTION_VERIFIED == "transcription_verified"


def test_camel_case_serialization():
    """Verify that Pydantic models serialize to exact camelCase matching TypeScript types."""
    box = BoundingBox(
        id="box-1",
        x=10.5,
        y=20.5,
        width=70.0,
        height=15.0,
        label="Line 1",
        confidence=0.99,
        line_index=0
    )
    dumped_box = box.model_dump(by_alias=True)
    assert "lineIndex" in dumped_box
    assert dumped_box["lineIndex"] == 0

    dim = Dimensions(height_cm=120.0, width_cm=45.0, depth_cm=15.0)
    dumped_dim = dim.model_dump(by_alias=True)
    assert "heightCm" in dumped_dim
    assert "widthCm" in dumped_dim
    assert "depthCm" in dumped_dim

    glossary = ArchaicGlossaryItem(
        term="ಬಾಗಳ್ಚು",
        iast="bāgaḷchu",
        modern_kannada_equivalent="ವೀರ ಉಂಬಳಿ",
        english_definition="Tax-free land grant for fallen hero.",
        grammatical_category="Old Kannada Compound Noun"
    )
    dumped_glossary = glossary.model_dump(by_alias=True)
    assert "modernKannadaEquivalent" in dumped_glossary
    assert "englishDefinition" in dumped_glossary
    assert "grammaticalCategory" in dumped_glossary


def test_invalid_enum_raises_validation_error():
    """Verify that invalid enum IDs raise 422 ValidationError."""
    with pytest.raises(ValidationError):
        ScriptClassMetadata(
            id="invalid_script_era",  # Not in 10 classes
            name="Unknown",
            kannada_name="ಅಜ್ಞಾತ",
            approximate_period="Now",
            diagnostic_features=[],
            characteristic_substrate=[SubstrateMaterial.GRANITE],
            historical_dynasty="None",
            significance="None"
        )

    with pytest.raises(ValidationError):
        SourceLanguageMetadata(
            id="french",  # Not in 6 source languages
            name="French",
            kannada_name="ಫ್ರೆಂಚ್",
            century_range="Modern",
            linguistic_features="Indo-European"
        )


def test_full_inscription_record_camel_case():
    """Verify that an entire InscriptionRecord serializes to exact TypeScript structure."""
    record = InscriptionRecord(
        id="test-ins-001",
        accession_number="TEST-001",
        title="Test Inscription",
        kannada_title="ಪರೀಕ್ಷಾರ್ಥ ಶಾಸನ",
        script_class=ScriptClassId.KADAMBA,
        source_language=SourceLanguageId.PURVADA_HALEGANNADA,
        substrate=SubstrateMaterial.SANDSTONE,
        dimensions=Dimensions(height_cm=100.0, width_cm=30.0),
        image_url="/test.jpg",
        condition_rating=ConditionRating.FAIR,
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
            lines=[SegmentedLine(line_number=1, original_text="ನಮಃ", iast_text="namaḥ")],
            detected_glyphs_count=4
        ),
        translation=TranslationResult(
            source_language=SourceLanguageId.PURVADA_HALEGANNADA,
            language_confidence=0.98,
            modern_kannada="ನಮಸ್ಕಾರ",
            english_translation="Salutations",
            glossary=[],
            stylistic_notes="Notes"
        ),
        provenance="Belur",
        current_location="Museum"
    )

    dumped = record.model_dump(by_alias=True)
    assert dumped["accessionNumber"] == "TEST-001"
    assert dumped["kannadaTitle"] == "ಪರೀಕ್ಷಾರ್ಥ ಶಾಸನ"
    assert dumped["scriptClass"] == "kadamba"
    assert dumped["sourceLanguage"] == "purvada_halegannada"
    assert dumped["conditionRating"] == "fair"
    assert dumped["reviewStatus"] == "verified"
    assert dumped["historicalContext"]["regnalPeriod"] == "c. 450 CE"
    assert dumped["historicalContext"]["findSpot"]["village"] == "Halmidi"
    assert dumped["transcription"]["iastTransliteration"] == "namaḥ"
    assert dumped["translation"]["modernKannada"] == "ನಮಸ್ಕಾರ"
