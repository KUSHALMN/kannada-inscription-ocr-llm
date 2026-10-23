from typing import List, Dict
import numpy as np
from PIL import Image
from backend.app.schemas import (
    ScriptClassId,
    SourceLanguageId,
    BoundingBox,
    TranslationResult,
    ArchaicGlossaryItem,
)
from backend.app.ml_adapters.interfaces import (
    Preprocessor,
    Segmenter,
    ScriptClassifier,
    Recognizer,
    Transliterator,
    Translator,
    GlyphBox,
    LineBox,
    ScriptPrediction,
    CharacterRecognition,
)


class MockPreprocessor:
    """Mock image preprocessor simulating CLAHE relief enhancement and grain normalization."""
    def process(self, image: Image.Image) -> np.ndarray:
        # Convert PIL to standard normalized RGB numpy array
        rgb_img = image.convert("RGB")
        arr = np.array(rgb_img, dtype=np.float32) / 255.0
        return arr


class MockSegmenter:
    """Mock line & glyph segmenter generating deterministic percentage coordinates."""
    def segment(self, image: np.ndarray) -> List[LineBox]:
        return [
            LineBox(
                line_number=1,
                bounding_box=BoundingBox(
                    id="line-box-1",
                    x=10.0,
                    y=18.0,
                    width=80.0,
                    height=14.0,
                    label="Line 1: Invocatory Verse",
                    confidence=0.99,
                    line_index=0,
                ),
                glyphs=[
                    GlyphBox(id="g-1-1", x=12.0, y=19.0, width=8.0, height=12.0, confidence=0.99, char="ನ", line_index=0),
                    GlyphBox(id="g-1-2", x=22.0, y=19.0, width=8.0, height=12.0, confidence=0.98, char="ಮ", line_index=0),
                    GlyphBox(id="g-1-3", x=32.0, y=19.0, width=6.0, height=12.0, confidence=0.99, char="ಃ", line_index=0),
                    GlyphBox(id="g-1-4", x=40.0, y=19.0, width=10.0, height=12.0, confidence=0.97, char="ಶ್ರೀ", line_index=0),
                    GlyphBox(id="g-1-5", x=52.0, y=19.0, width=8.0, height=12.0, confidence=0.98, char="ಮ", line_index=0),
                    GlyphBox(id="g-1-6", x=62.0, y=19.0, width=8.0, height=12.0, confidence=0.99, char="ತ್", line_index=0),
                ]
            ),
            LineBox(
                line_number=2,
                bounding_box=BoundingBox(
                    id="line-box-2",
                    x=10.0,
                    y=38.0,
                    width=80.0,
                    height=14.0,
                    label="Line 2: Regnal Period & Chieftain",
                    confidence=0.98,
                    line_index=1,
                ),
                glyphs=[
                    GlyphBox(id="g-2-1", x=12.0, y=39.0, width=8.0, height=12.0, confidence=0.98, char="ಮ", line_index=1),
                    GlyphBox(id="g-2-2", x=22.0, y=39.0, width=8.0, height=12.0, confidence=0.99, char="ಹಾ", line_index=1),
                    GlyphBox(id="g-2-3", x=32.0, y=39.0, width=8.0, height=12.0, confidence=0.97, char="ಕ", line_index=1),
                    GlyphBox(id="g-2-4", x=42.0, y=39.0, width=8.0, height=12.0, confidence=0.98, char="ದಂ", line_index=1),
                    GlyphBox(id="g-2-5", x=52.0, y=39.0, width=8.0, height=12.0, confidence=0.98, char="ಬ", line_index=1),
                    GlyphBox(id="g-2-6", x=62.0, y=39.0, width=8.0, height=12.0, confidence=0.97, char="ನ", line_index=1),
                ]
            ),
            LineBox(
                line_number=3,
                bounding_box=BoundingBox(
                    id="line-box-3",
                    x=10.0,
                    y=58.0,
                    width=80.0,
                    height=14.0,
                    label="Line 3: Hero Dedication",
                    confidence=0.97,
                    line_index=2,
                ),
                glyphs=[
                    GlyphBox(id="g-3-1", x=12.0, y=59.0, width=8.0, height=12.0, confidence=0.97, char="ಪ", line_index=2),
                    GlyphBox(id="g-3-2", x=22.0, y=59.0, width=8.0, height=12.0, confidence=0.98, char="ಶು", line_index=2),
                    GlyphBox(id="g-3-3", x=32.0, y=59.0, width=8.0, height=12.0, confidence=0.96, char="ಪ", line_index=2),
                    GlyphBox(id="g-3-4", x=42.0, y=59.0, width=8.0, height=12.0, confidence=0.99, char="ತಿ", line_index=2),
                ]
            ),
        ]


class MockScriptClassifier:
    """Mock 10-era script classifier returning posterior distribution."""
    def predict(self, glyph_crops: List[np.ndarray]) -> ScriptPrediction:
        probs = {
            "ashoka": 0.002,
            "satavahana": 0.005,
            "kadamba": 0.9875,
            "badami_chalukya": 0.003,
            "rashtrakuta": 0.001,
            "kalyana_chalukya": 0.0005,
            "hoysala": 0.0003,
            "vijayanagara": 0.0003,
            "mysuru": 0.0002,
            "present_kannada": 0.0002,
        }
        return ScriptPrediction(
            script_class=ScriptClassId.KADAMBA,
            confidence=0.9875,
            per_class_probs=probs,
        )


class MockRecognizer:
    """Mock OCR recognizer outputting deciphered characters."""
    def recognize(self, glyph_crops: List[np.ndarray]) -> List[CharacterRecognition]:
        chars = ["ನ", "ಮ", "ಃ", "ಶ್ರೀ", "ಮ", "ತ್", "ಕ", "ದಂ", "ಬ"]
        return [CharacterRecognition(char=c, confidence=0.98) for c in chars]


class MockTransliterator:
    """Transliterator mapping Kannada script to scholarly IAST."""
    # Deterministic mapping dictionary
    MAPPINGS: Dict[str, str] = {
        "ನಮಃ ಶ್ರೀಮತ್ ಕದಂಬ ಪಣ್": "namaḥ śrīmat kadamba paṇ",
        "ಮಹಾ ಕದಂಬನ ಪಲಕಾಲಮನ್": "mahā kadambana palakālaman",
        "ಪಶುಪತಿ ನಾಮಧೇಯ ಕೀರ್ತನ್": "paśupati nāmadhēya kīrtan",
    }

    def to_iast(self, kannada_text: str) -> str:
        if kannada_text in self.MAPPINGS:
            return self.MAPPINGS[kannada_text]
        # Basic phonetic transliteration heuristic
        table = str.maketrans({
            "ಅ": "a", "ಆ": "ā", "ಇ": "i", "ಈ": "ī", "ಉ": "u", "ಊ": "ū",
            "ಋ": "r̥", "ಎ": "e", "ಏ": "ē", "ಐ": "ai", "ಒ": "o", "ಓ": "ō", "ಔ": "au",
            "ಕ": "ka", "ಖ": "kha", "ಗ": "ga", "ಘ": "gha", "ಙ": "ṅa",
            "ಚ": "ca", "ಛ": "cha", "ಜ": "ja", "ಝ": "jha", "ಞ": "ña",
            "ಟ": "ṭa", "ಠ": "ṭha", "ಡ": "ḍa", "ಢ": "ḍha", "ಣ": "ṇa",
            "ತ": "ta", "ಥ": "tha", "ದ": "da", "ಧ": "dha", "ನ": "na",
            "ಪ": "pa", "ಫ": "pha", "ಬ": "ba", "ಭ": "bha", "ಮ": "ma",
            "ಯ": "ya", "ರ": "ra", "ಱ": "ṟa", "ಲ": "la", "ವ": "va",
            "ಶ": "śa", "ಷ": "ṣa", "ಸ": "sa", "ಹ": "ha", "ಳ": "ḷa", "ೞ": "ḻa",
            "ಂ": "ṁ", "ಃ": "ḥ", "್": "", "ಾ": "ā", "ಿ": "i", "ೀ": "ī",
            "ು": "u", "ೂ": "ū", "ೃ": "r̥", "ೆ": "e", "ೇ": "ē", "ೈ": "ai",
            "ೊ": "o", "ೋ": "ō", "ೌ": "au"
        })
        return kannada_text.translate(table)


class MockTranslator:
    """Mock translator generating Hosagannada, English, and glossary items."""
    def translate(self, text: str, script: ScriptClassId, language: SourceLanguageId) -> TranslationResult:
        glossary = [
            ArchaicGlossaryItem(
                term="ಬಾಗಳ್ಚು (ಬಾಳ್ಗಚ್ಚು)",
                iast="bāgaḷchu / bāḷgaccu",
                modern_kannada_equivalent="ವೀರ ಉಂಬಳಿ (ಯುದ್ಧದಲ್ಲಿ ಮಡಿದ ಯೋಧನ ಕುಟುಂಬಕ್ಕೆ ನೀಡುವ ತೆರಿಗೆ ಮುಕ್ತ ಭೂಮಿ)",
                english_definition="A tax-free land grant awarded to the family of a hero who fell in battle (lit. sword-washing honor).",
                grammatical_category="Old Kannada Compound Noun",
            ),
            ArchaicGlossaryItem(
                term="ಅಳಿದ",
                iast="aḷida",
                modern_kannada_equivalent="ಮಡಿದ / ಮರಣಹೊಂದಿದ",
                english_definition="Perished or sacrificed one's life in honorable combat.",
                grammatical_category="Dravidian Past Participle",
            ),
            ArchaicGlossaryItem(
                term="ಪೆಗ್ಗಡೆ",
                iast="peggaḍe",
                modern_kannada_equivalent="ಹೆಗ್ಗಡೆ / ಪ್ರಧಾನ ಅಧಿಕಾರಿ",
                english_definition="Senior royal administrative official or regional chieftain.",
                grammatical_category="Old Kannada Title",
            )
        ]

        return TranslationResult(
            source_language=language,
            language_confidence=0.962,
            modern_kannada="ಶ್ರೀಮತ್ ಕದಂಬ ರಾಜವಂಶದ ಆಳ್ವಿಕೆಯಲ್ಲಿ ಶತ್ರುಗಳನ್ನು ಸೋಲಿಸಿದ ಕದಂಬ ವೀರ ಯೋಧರಿಗೆ ಪ್ರದಾನ ಮಾಡಲಾದ ಶಾಶ್ವತ ಭೂದಾನ ಹಾಗೂ ಕಂದಾಯ ವಿನಾಯಿತಿ ಘೋಷಣೆ.",
            english_translation="Salutations to the auspicious Kadamba royal lineage; recording an enduring land grant and battle tax exemption bestowed upon valiant soldiers.",
            glossary=glossary,
            stylistic_notes="Exhibits archaic Halegannada phonological markers including primitive box-headed ductus and pre-consonantal liquid retainers.",
            is_mock_data=True,
        )
