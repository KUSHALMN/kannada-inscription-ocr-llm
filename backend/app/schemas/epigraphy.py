from typing import Optional, List, Tuple, Literal
from pydantic import Field
from backend.app.schemas.base import CamelModel
from backend.app.schemas.enums import (
    ScriptClassId,
    SourceLanguageId,
    SubstrateMaterial,
    ReviewStatus,
    ConditionRating,
    ActivityType,
)


class Dimensions(CamelModel):
    """Physical dimensions of the inscription stele or substrate."""
    height_cm: float = Field(..., description="Height in centimeters")
    width_cm: float = Field(..., description="Width in centimeters")
    depth_cm: Optional[float] = Field(None, description="Optional depth/thickness in centimeters")


class BoundingBox(CamelModel):
    """Coordinates and confidence for glyph or line bounding boxes."""
    id: str = Field(..., description="Unique bounding box identifier")
    x: float = Field(..., description="Top-left x coordinate (percentage 0-100 or pixels)")
    y: float = Field(..., description="Top-left y coordinate (percentage 0-100 or pixels)")
    width: float = Field(..., description="Width (percentage 0-100 or pixels)")
    height: float = Field(..., description="Height (percentage 0-100 or pixels)")
    label: str = Field(..., description="Label or line identifier")
    confidence: float = Field(..., ge=0.0, le=1.0, description="Detection confidence score")
    line_index: Optional[int] = Field(None, description="Zero-based or one-based line index")


class SegmentedLine(CamelModel):
    """Line-by-line transcription and translation segmentation."""
    line_number: int = Field(..., description="1-based line sequence number")
    original_text: str = Field(..., description="Deciphered original inscriptional text in Kannada characters")
    iast_text: str = Field(..., description="IAST transliteration for the line")
    modern_kannada_line: Optional[str] = Field(None, description="Aligned Modern Kannada (Hosagannada) sentence")
    bounding_box: Optional[BoundingBox] = Field(None, description="Bounding region for the line on the rubbing")


class ArchaicGlossaryItem(CamelModel):
    """Lexical item explaining archaic Old Kannada vocabulary."""
    term: str = Field(..., description="Ancient root word or compound phrase")
    iast: str = Field(..., description="IAST phonological transliteration")
    modern_kannada_equivalent: str = Field(..., description="Equivalent modern Kannada gloss")
    english_definition: str = Field(..., description="Scholarly English morphological & semantic definition")
    grammatical_category: str = Field(..., description="Grammatical classification (e.g. Dravidian verbal noun)")


class TranscriptionResult(CamelModel):
    """Epigraphical Pillar 3: Decipherment, line segmentation, and transliteration."""
    script_class: ScriptClassId = Field(..., description="Inferred or catalogued script epoch")
    script_confidence: float = Field(..., ge=0.0, le=1.0, description="Script classifier confidence score")
    recognized_text: str = Field(..., description="Full deciphered original text in Kannada characters")
    iast_transliteration: str = Field(..., description="Complete IAST academic Romanization")
    lines: List[SegmentedLine] = Field(default_factory=list, description="Segmented inscriptional lines")
    detected_glyphs_count: int = Field(0, description="Total count of recognized character glyphs")
    is_mock_data: bool = Field(False, description="Flag indicating mock vs live neural model output")


class TranslationResult(CamelModel):
    """Epigraphical Pillar 4: Modern Kannada & English translation with glossary."""
    source_language: SourceLanguageId = Field(..., description="Identified linguistic dialect")
    language_confidence: float = Field(..., ge=0.0, le=1.0, description="Language identification confidence")
    modern_kannada: str = Field(..., description="Flowing Modern Standard Kannada (Hosagannada) prose translation")
    english_translation: str = Field(..., description="Comprehensive academic English translation")
    glossary: List[ArchaicGlossaryItem] = Field(default_factory=list, description="Archaic vocabulary glossary items")
    stylistic_notes: str = Field("", description="Linguistic, metric, and orthographical notes")
    is_mock_data: bool = Field(False, description="Flag indicating mock vs live translation output")


class FindSpot(CamelModel):
    """Geographical provenance where the inscription was discovered."""
    village: str = Field(..., description="Village or settlement name")
    taluk: str = Field(..., description="Taluk administrative division")
    district: str = Field(..., description="District in Karnataka")
    state: str = Field("Karnataka", description="State or province")
    coordinates: Optional[Tuple[float, float]] = Field(None, description="[latitude, longitude] decimal coordinates")


class HistoricalContext(CamelModel):
    """Historiographical metadata, ruling dynasty, and epigraphia references."""
    dynasty: str = Field(..., description="Ruling dynasty (e.g. Kadambas of Banavasi)")
    ruler: str = Field(..., description="Reigning monarch or patron chieftain")
    regnal_period: str = Field(..., description="Regnal dates or estimated period")
    approximate_date: str = Field(..., description="Estimated historical date (e.g. c. 450 CE)")
    century: str = Field(..., description="Historical century (e.g. 5th Century CE)")
    find_spot: FindSpot = Field(..., description="Geographical find spot")
    epigraphia_reference: Optional[str] = Field(None, description="Citation (e.g. Epigraphia Carnatica Vol. XV, BL 58)")
    historical_summary: str = Field(..., description="Historical context and purpose summary")
    linguistic_significance: str = Field(..., description="Linguistic and paleographic value")


class InscriptionRecord(CamelModel):
    """Complete catalogued inscription record conforming to frontend InscriptionRecord."""
    id: str = Field(..., description="Unique record identifier (e.g. ins-halmidi-001)")
    accession_number: str = Field(..., description="Institutional catalog accession number")
    title: str = Field(..., description="English scholarly title")
    kannada_title: str = Field(..., description="Kannada title")
    script_class: ScriptClassId = Field(..., description="Script epoch identifier")
    source_language: SourceLanguageId = Field(..., description="Source language identifier")
    substrate: SubstrateMaterial = Field(..., description="Physical substrate material")
    dimensions: Optional[Dimensions] = Field(None, description="Stele dimensions")
    image_url: str = Field(..., description="High-resolution rubbing or stele image URL")
    thumbnail_url: Optional[str] = Field(None, description="Thumbnail preview image URL")
    condition_rating: ConditionRating = Field(..., description="Preservation rating")
    review_status: ReviewStatus = Field(..., description="Editorial review status")
    last_updated: str = Field(..., description="Last modification timestamp or date string")
    historical_context: HistoricalContext = Field(..., description="Historiographical context")
    transcription: TranscriptionResult = Field(..., description="Pillar 3 Transcription")
    translation: TranslationResult = Field(..., description="Pillar 4 Translation")
    provenance: str = Field(..., description="Discovery source and archival history")
    current_location: str = Field(..., description="Current physical repository or monument site")


class ResearchActivityItem(CamelModel):
    """Activity feed event log item."""
    id: str = Field(..., description="Activity log identifier")
    timestamp: str = Field(..., description="ISO datetime or human formatted string")
    type: ActivityType = Field(..., description="Type of research activity")
    title: str = Field(..., description="Event title")
    description: str = Field(..., description="Event description")
    scholar: str = Field(..., description="Contributing scholar or epigraphist")
    inscription_id: str = Field(..., description="Associated inscription identifier")
    inscription_title: str = Field(..., description="Associated inscription title")


class ScriptRelationship(CamelModel):
    """Genealogical and phylogenetic relationships of a script."""
    ancestor_scripts: List[str] = Field(default_factory=list, description="Precursor scripts")
    descendant_scripts: List[str] = Field(default_factory=list, description="Descendant scripts")
    parallel_scripts: List[str] = Field(default_factory=list, description="Contemporary parallel scripts")
    branch_name: str = Field(..., description="Paleographical branch classification")


class SampleGlyphItem(CamelModel):
    """Individual character sample glyph in the 10-script evolution matrix."""
    id: str = Field(..., description="Sample glyph identifier")
    label: str = Field(..., description="Phonetic descriptor (e.g. Foundation Vowel)")
    kannada_char: str = Field(..., description="Modern Kannada character equivalent")
    iast: str = Field(..., description="IAST phonological character")
    image_path: str = Field(..., description="Relative path to authentic rubbing image")
    morphological_note: str = Field(..., description="Chisel ductus and morphological anatomy notes")


class ScriptClassMetadata(CamelModel):
    """Comprehensive paleographical metadata for one of the 10 script eras."""
    id: ScriptClassId = Field(..., description="Script identifier")
    name: str = Field(..., description="English script name")
    kannada_name: str = Field(..., description="Kannada script name")
    approximate_period: str = Field(..., description="Historical chronological span")
    diagnostic_features: List[str] = Field(default_factory=list, description="Diagnostic visual features")
    characteristic_substrate: List[SubstrateMaterial] = Field(default_factory=list, description="Common media")
    historical_dynasty: str = Field(..., description="Associated historical dynasty")
    significance: str = Field(..., description="Significance in Karnataka paleography")
    relationships: Optional[ScriptRelationship] = Field(None, description="Evolutionary relationships")
    sample_glyphs: Optional[List[SampleGlyphItem]] = Field(None, description="Sample glyphs")


class SourceLanguageMetadata(CamelModel):
    """Metadata for one of the 6 historical linguistic systems."""
    id: SourceLanguageId = Field(..., description="Language identifier")
    name: str = Field(..., description="English name")
    kannada_name: str = Field(..., description="Kannada name")
    century_range: str = Field(..., description="Chronological span of attestation")
    linguistic_features: str = Field(..., description="Key morphological and phonological hallmarks")


class AnalysisJobResult(CamelModel):
    """Response payload for automated epigraphical analysis job."""
    job_id: str = Field(..., description="Unique analysis job UUID")
    status: Literal['completed', 'processing', 'failed'] = Field(..., description="Job status")
    inferred_script: ScriptClassId = Field(..., description="Inferred script epoch")
    inferred_language: SourceLanguageId = Field(..., description="Inferred source language")
    transcription: TranscriptionResult = Field(..., description="Deciphered transcription")
    translation: TranslationResult = Field(..., description="Synthesized translation")
    historical_context: HistoricalContext = Field(..., description="Deduced historical context")
    is_demonstration_only: bool = Field(False, description="Flag for demonstration vs live inference")
    adapter_source: Literal['mock_local', 'fastapi_remote'] = Field('fastapi_remote', description="Source adapter")


# Request / Filter Schemas
class InscriptionFilter(CamelModel):
    """Search and filter parameters for inscriptions query."""
    script_class: Optional[str] = None
    source_language: Optional[str] = None
    substrate: Optional[str] = None
    review_status: Optional[str] = None
    historical_period: Optional[str] = None
    search_query: Optional[str] = None
    century: Optional[str] = None
    sort_by: Optional[str] = None


class TranscriptionUpdateRequest(CamelModel):
    """Payload for updating transcription after scholar review."""
    recognized_text: str
    iast_transliteration: str
    lines: List[SegmentedLine] = Field(default_factory=list)


class TranslationUpdateRequest(CamelModel):
    """Payload for updating translation after scholar review."""
    modern_kannada: str
    english_translation: str
    glossary: List[ArchaicGlossaryItem] = Field(default_factory=list)
    stylistic_notes: Optional[str] = None


class ReviewStatusUpdateRequest(CamelModel):
    """Payload for advancing peer review status."""
    review_status: ReviewStatus
    reviewer_notes: Optional[str] = None
