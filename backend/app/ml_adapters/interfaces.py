from typing import Protocol, List, Dict, Any, Optional
import numpy as np
from PIL import Image
from pydantic import BaseModel
from backend.app.schemas import (
    BoundingBox,
    ScriptClassId,
    SourceLanguageId,
    TranslationResult,
)


class GlyphBox(BaseModel):
    """Segmented character bounding box with percentage coordinates (0-100)."""
    id: str
    x: float
    y: float
    width: float
    height: float
    confidence: float
    char: Optional[str] = None
    line_index: Optional[int] = None


class LineBox(BaseModel):
    """Line segment containing line-level bounding box and contained glyph boxes."""
    line_number: int
    bounding_box: BoundingBox
    glyphs: List[GlyphBox] = []


class ScriptPrediction(BaseModel):
    """Result of 10-era script epoch classification."""
    script_class: ScriptClassId
    confidence: float
    per_class_probs: Dict[str, float]


class CharacterRecognition(BaseModel):
    """Individual character decipherment reading with confidence score."""
    char: str
    confidence: float


# Protocols for ML Pipeline Steps
class Preprocessor(Protocol):
    """Surface relief enhancement and background normalization."""
    def process(self, image: Image.Image) -> np.ndarray:
        ...


class Segmenter(Protocol):
    """Character bounding-box localization & glyph segmentation (YOLOv11)."""
    def segment(self, image: np.ndarray) -> List[LineBox]:
        ...


class ScriptClassifier(Protocol):
    """Historical script epoch inference across 10 chronological stages (CNN+ViT)."""
    def predict(self, glyph_crops: List[np.ndarray]) -> ScriptPrediction:
        ...


class Recognizer(Protocol):
    """Halegannada OCR character recognition."""
    def recognize(self, glyph_crops: List[np.ndarray]) -> List[CharacterRecognition]:
        ...


class Transliterator(Protocol):
    """Phonological transliteration from Kannada script to IAST."""
    def to_iast(self, kannada_text: str) -> str:
        ...


class Translator(Protocol):
    """Translation into Modern Standard Kannada (Hosagannada) and English with glossary."""
    def translate(self, text: str, script: ScriptClassId, language: SourceLanguageId) -> TranslationResult:
        ...
