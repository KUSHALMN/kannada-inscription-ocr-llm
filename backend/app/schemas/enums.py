from enum import Enum


class ScriptClassId(str, Enum):
    """
    10 Chronological Script Eras of Kannada Epigraphy (3rd C. BCE - Present Day).
    Directly aligns with Ancient Kannada evolution dataset classes.
    """
    ASHOKA = "ashoka"
    SATAVAHANA = "satavahana"
    KADAMBA = "kadamba"
    BADAMI_CHALUKYA = "badami_chalukya"
    RASHTRAKUTA = "rashtrakuta"
    KALYANA_CHALUKYA = "kalyana_chalukya"
    HOYSALA = "hoysala"
    VIJAYANAGARA = "vijayanagara"
    MYSURU = "mysuru"
    PRESENT_KANNADA = "present_kannada"


class SourceLanguageId(str, Enum):
    """
    6 Primary Epigraphical Inscription Languages in Karnataka.
    """
    PRAKRIT = "prakrit"
    SANSKRIT = "sanskrit"
    PURVADA_HALEGANNADA = "purvada_halegannada"  # Proto-Old Kannada (e.g. Halmidi)
    HALEGANNADA = "halegannada"                  # Classical Old Kannada
    NADUGANNADA = "nadugannada"                  # Middle Kannada
    HOSAGANNADA = "hosagannada"                  # Modern Kannada


class SubstrateMaterial(str, Enum):
    """
    Physical medium/substrate upon which inscriptions are engraved.
    """
    GRANITE = "granite"
    SANDSTONE = "sandstone"
    CHLORITE_SCHIST = "chlorite_schist"          # Soapstone
    LIMESTONE = "limestone"
    COPPER_PLATE = "copper_plate"
    PALM_LEAF = "palm_leaf"
    PAPER = "paper"


class ReviewStatus(str, Enum):
    """
    Editorial peer review and verification status.
    """
    VERIFIED = "verified"
    IN_REVIEW = "in_review"
    PENDING_VERIFICATION = "pending_verification"
    ARCHIVED = "archived"


class ConditionRating(str, Enum):
    """
    Physical preservation condition of the inscriptional stone/stele.
    """
    EXCELLENT = "excellent"
    FAIR = "fair"
    WEATHERED = "weathered"
    PARTIALLY_EFFACED = "partially_effaced"


class ActivityType(str, Enum):
    """
    Epigraphical research activity stream event type.
    """
    TRANSCRIPTION_VERIFIED = "transcription_verified"
    TRANSLATION_UPDATED = "translation_updated"
    RUBBING_CATALOGUED = "rubbing_catalogued"
    LEXICON_ADDED = "lexicon_added"


class SortBy(str, Enum):
    """
    Sorting criteria for inscription queries.
    """
    DATE_ASC = "date_asc"
    DATE_DESC = "date_desc"
    TITLE = "title"
    CONFIDENCE = "confidence"
    RECENTLY_UPDATED = "recently_updated"
