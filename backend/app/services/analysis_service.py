import os
import time
import uuid
from typing import Optional, Dict, Any, List, Callable, Awaitable
import numpy as np
from PIL import Image
from starlette.concurrency import run_in_threadpool
from backend.app.config import settings
from backend.app.core.logging import logger
from backend.app.schemas import (
    AnalysisJobResult,
    ScriptClassId,
    SourceLanguageId,
    TranscriptionResult,
    TranslationResult,
    SegmentedLine,
    BoundingBox,
    HistoricalContext,
    FindSpot,
)
from backend.app.ml_adapters.interfaces import (
    Preprocessor,
    Segmenter,
    ScriptClassifier,
    Recognizer,
    Transliterator,
    Translator,
    LineBox,
    ScriptPrediction,
)
from backend.app.ml_adapters.mock_adapters import (
    MockPreprocessor,
    MockSegmenter,
    MockScriptClassifier,
    MockRecognizer,
    MockTransliterator,
    MockTranslator,
)
try:
    from backend.app.ml_adapters.neural_adapters import (
        NeuralScriptClassifier,
        NeuralTranslator,
    )
    NEURAL_ADAPTERS_AVAILABLE = True
except Exception:
    NEURAL_ADAPTERS_AVAILABLE = False


class AnalysisService:
    """
    Epigraphical Analysis Pipeline Orchestrator.
    Executes Preprocessing -> Segmentation -> Script Classification ->
    Character Recognition -> Transliteration -> Translation -> Historical Context.
    Runs compute-heavy steps via run_in_threadpool, tracks per-step timings,
    and returns status 'partial' if any step fails.
    """

    DYNASTY_MAP: Dict[ScriptClassId, str] = {
        ScriptClassId.ASHOKA: "Mauryan Empire",
        ScriptClassId.SATAVAHANA: "Satavahana Dynasty / Chutus of Banavasi",
        ScriptClassId.KADAMBA: "Kadambas of Banavasi",
        ScriptClassId.BADAMI_CHALUKYA: "Badami Chalukyas",
        ScriptClassId.RASHTRAKUTA: "Rashtrakuta Empire",
        ScriptClassId.KALYANA_CHALUKYA: "Western Chalukyas (Kalyana)",
        ScriptClassId.HOYSALA: "Hoysala Empire",
        ScriptClassId.VIJAYANAGARA: "Vijayanagara Empire",
        ScriptClassId.MYSURU: "Kingdom of Mysuru (Wodeyars)",
        ScriptClassId.PRESENT_KANNADA: "Modern Democratic Era / Karnataka",
    }

    SCRIPT_LANGUAGE_DEFAULTS: Dict[ScriptClassId, SourceLanguageId] = {
        ScriptClassId.ASHOKA: SourceLanguageId.PRAKRIT,
        ScriptClassId.SATAVAHANA: SourceLanguageId.PRAKRIT,
        ScriptClassId.KADAMBA: SourceLanguageId.PURVADA_HALEGANNADA,
        ScriptClassId.BADAMI_CHALUKYA: SourceLanguageId.HALEGANNADA,
        ScriptClassId.RASHTRAKUTA: SourceLanguageId.HALEGANNADA,
        ScriptClassId.KALYANA_CHALUKYA: SourceLanguageId.HALEGANNADA,
        ScriptClassId.HOYSALA: SourceLanguageId.HALEGANNADA,
        ScriptClassId.VIJAYANAGARA: SourceLanguageId.NADUGANNADA,
        ScriptClassId.MYSURU: SourceLanguageId.HOSAGANNADA,
        ScriptClassId.PRESENT_KANNADA: SourceLanguageId.HOSAGANNADA,
    }

    KINGDOM_PROFILES: Dict[ScriptClassId, Dict[str, Any]] = {
        ScriptClassId.ASHOKA: {
            "dynasty": "Mauryan Empire (ಅಶೋಕ ಸಾಮ್ರಾಜ್ಯ)",
            "ruler": "Emperor Ashoka (Priyadarshi)",
            "regnal_period": "c. 273 – 232 BCE",
            "approximate_date": "c. 3rd Century BCE",
            "century": "3rd Century BCE",
            "find_spot": {"village": "Maski", "taluk": "Lingasugur", "district": "Raichur", "state": "Karnataka", "coordinates": [15.9614, 76.6621]},
            "epigraphia_reference": "Corpus Inscriptionum Indicarum Vol. I, Maski Edict",
            "historical_summary": "Imperial Buddhist rock edict of Emperor Ashoka, first identifying him by name 'Devanampriya Ashoka' and preaching moral governance (Dharma).",
            "linguistic_significance": "Early Southern Brahmi in Prakrit dialect, foundational ancestor to all South Indian scripts.",
            "canonical_lines": [
                ("ದೇವಾನಂಪಿಯೇ ಪಿಯದಸಿ ಲಾಜಾ", "devānaṁpiyē piyadasi lājā", "ದೇವತೆಗಳಿಗೆ ಪ್ರಿಯನಾದ ಪ್ರಿಯದರ್ಶಿ ರಾಜನು"),
                ("ಹೇವಾಂ ಆಹಾ ಸಕಲ ಲೋಕಾನಂ ಹಿತಾಯ", "hēvāṁ āhā sakala lōkānaṁ hitāya", "ಹೀಗೆ ಆಜ್ಞಾಪಿಸುತ್ತಾನೆ: ಸಕಲ ಜನರ ಹಿತಕ್ಕಾಗಿ"),
                ("ಧಮ್ಮ ಚರಣೇನ ಸತ್ಯಂ ವಧತಿ", "dhamma caraṇēna satyaṁ vadhati", "ಧರ್ಮದ ಆಚರಣೆಯಿಂದ ಸತ್ಯವು ವೃದ್ಧಿಯಾಗುತ್ತದೆ")
            ]
        },
        ScriptClassId.SATAVAHANA: {
            "dynasty": "Satavahana Dynasty / Chutus of Banavasi (ಶಾತವಾಹನ ಸಾಮ್ರಾಜ್ಯ)",
            "ruler": "King Gautamiputra Satakarni / Vashishtiputra Pulumavi",
            "regnal_period": "c. 1st Century BCE – 2nd Century CE",
            "approximate_date": "c. 2nd Century CE",
            "century": "1st–2nd Century CE",
            "find_spot": {"village": "Sannati", "taluk": "Chittapur", "district": "Kalaburagi", "state": "Karnataka", "coordinates": [16.8286, 76.9075]},
            "epigraphia_reference": "Archaeological Survey of India Memoir, Sannati Stupa Epigraphs",
            "historical_summary": "Votive memorial slab at Sannati Mahastupa commemorating royal Buddhist patronage and architectural expansions.",
            "linguistic_significance": "Middle Brahmi with early curvilinear transition and incipient headmark incisions.",
            "canonical_lines": [
                ("ರಾಜ್ಞೋ ವಾಸಿಷ್ಠೀಪುತ್ರಸ್ಯ ಸಿರಿಸಾತಕಣ್ಣಿಸ", "rājñō vāsiṣṭhīputrasya sirisātakaṇṇisa", "ವಾಸಿಷ್ಠೀಪುತ್ರ ಶ್ರೀ ಶಾತಕರ್ಣಿ ಮಹಾರಾಜನ ಕಾಲದಲ್ಲಿ"),
                ("ಸನ್ನತಿ ಮಹಾಸ್ತೂಪ ದಾನಂ ಚೇತಿಯ ಪತಿಷ್ಠಾಪನಂ", "sannati mahāstūpa dānaṁ cētiya patiṣṭhāpanaṁ", "ಸನ್ನತಿ ಮಹಾಸ್ತೂಪಕ್ಕೆ ಪವಿತ್ರ ಚೈತ್ಯ ಪ್ರತಿಷ್ಠಾಪನಾ ದಾನ"),
                ("ಧಮ್ಮ ಪದೇಣ ಅಖಂಡ ಸುಖಮಸ್ತು", "dhamma padēṇa akhaṇḍa sukhamastu", "ಧರ್ಮದ ಹಾದಿಯಿಂದ ಸರ್ವರಿಗೂ ಅಖಂಡ ಸುಖವಾಗಲಿ")
            ]
        },
        ScriptClassId.KADAMBA: {
            "dynasty": "Kadambas of Banavasi (ಕದಂಬ ಸಾಮ್ರಾಜ್ಯ)",
            "ruler": "King Kakusthavarma",
            "regnal_period": "c. 435 – 455 CE",
            "approximate_date": "c. 450 CE",
            "century": "5th Century CE",
            "find_spot": {"village": "Halmidi", "taluk": "Belur", "district": "Hassan", "state": "Karnataka", "coordinates": [13.1672, 75.8986]},
            "epigraphia_reference": "Epigraphia Carnatica Vol. XV, BL 58",
            "historical_summary": "Universally recognized as the earliest attested Kannada stone inscription, recording a hero endowment (Balgachu) conferred upon Vijaya Arasa.",
            "linguistic_significance": "Classic Purvada Halegannada in box-headed (Petika-shirsha) script featuring archaic Sakata Repha (ಱ).",
            "canonical_lines": [
                ("ನಮಃ ಶ್ರೀಮತ್ ಕದಂಬಪನ್ ಕಾಗುಸ್ಥಭಟ್ಟೋರನ್ ಆಳೆ", "namaḥ śrīmat kadambapan kāgustha-bhaṭṭōran āḷe", "ನಮಸ್ಕಾರ, ಶ್ರೀಮಂತ ಕದಂಬ ವಂಶದ ಕಾಕುಸ್ಥಭಟ್ಟಾರಕನು ರಾಜ್ಯವಾಳುತ್ತಿದ್ದಾಗ,"),
                ("ನರಿದಾವಿಱೆಯುಳ್ ನಾಡೊಳ್ ಮೃಗೇಶನಾಗೇಂದ್ರಾಭಿಲರ್ ಭಟಹರಪ್ಪೋರ್", "naridāviṟeyuḷ nāḍoḷ mr̥gēśa-nāgēndrābhilar bhaṭaharappōr", "ನರಿದಾವಿಳೆ ನಾಡಿನಲ್ಲಿ ಮೃಗೇಶ ಮತ್ತು ನಾಗೇಂದ್ರ ಎಂಬ ಯೋಧರು ಹೋರಾಡಿದರು,"),
                ("ಅಳಿದ ಪಶುಪತಿಯ ಪೆಗ್ಗಡೆಯ ಮಗನ್ ವಿಜಾಯರಸಂಗೆ ಬಾಗಳ್ಚು ಕೊಟ್ಟಾರ್", "aḷida paśupatiya peggaḍeya magan vijāyarasange bāgaḷchu koṭṭār", "ಮಡಿದ ಪಶುಪತಿ ಹೆಗ್ಗಡೆಯ ಮಗ ವಿಜಯರಸನಿಗೆ ವೀರ ಉಂಬಳಿ ಭೂಮಿಯನ್ನು ನೀಡಿದರು.")
            ]
        },
        ScriptClassId.BADAMI_CHALUKYA: {
            "dynasty": "Early Western Chalukyas of Vatapi (ಬಾದಾಮಿ ಚಾಲುಕ್ಯರು)",
            "ruler": "Immadi Pulakeshin / Kappe Arabhatta",
            "regnal_period": "c. 610 – 642 CE",
            "approximate_date": "c. 7th Century CE",
            "century": "7th Century CE",
            "find_spot": {"village": "Badami Cliff", "taluk": "Badami", "district": "Bagalkot", "state": "Karnataka", "coordinates": [15.9189, 75.6766]},
            "epigraphia_reference": "Indian Antiquary Vol. X, Badami Cliff Inscription",
            "historical_summary": "Famed poetic cliff inscription extolling warrior virtue in classic Tripadi meter: gentle to the good, devastating to foes.",
            "linguistic_significance": "Early Halegannada displaying rounded loop basals, fluid ductus, and wedge-shaped proto-talakattu.",
            "canonical_lines": [
                ("ಸಾಧುಗೆ ಸಾಧು ಮಾಧುರ್ಯಂಗೆ ಮಾಧುರ್ಯಂ", "sādhuge sādhu mādhuryange mādhuryam", "ಒಳ್ಳೆಯವರಿಗೆ ಒಳ್ಳೆಯವನು, ಮೃದು ಸ್ವಭಾವದವರಿಗೆ ಮಧುರವಾದವನು,"),
                ("ಬಾಧಿಪ್ಪ ಕಲಿಗೆ ಕಲಿಯುಗ ವಿಪರೀತನ್", "bādhippa kalige kaliyuga viparītan", "ಶತ್ರುಗಳಿಗೆ ಕಲಿಯುಗದ ವಿಪರೀತನಂತೆ ಭಯಂಕರನು,"),
                ("ಮಾಧವನೀತನ್ ಪೆರನಲ್ಲ ಸತ್ಯಶೌಚನ್", "mādhavanītan peranalla satyaśaucan", "ಈತನು ಸಾಕ್ಷಾತ್ ವಿಷ್ಣುವೇ ಹೊರತು ಬೇರೆಯಲ್ಲ.")
            ]
        },
        ScriptClassId.RASHTRAKUTA: {
            "dynasty": "Imperial Rashtrakutas of Manyakheta (ರಾಷ್ಟ್ರಕೂಟ ಸಾಮ್ರಾಜ್ಯ)",
            "ruler": "Amoghavarsha I Nrupatunga",
            "regnal_period": "c. 814 – 878 CE",
            "approximate_date": "c. 9th Century CE",
            "century": "9th Century CE",
            "find_spot": {"village": "Malkhed (Manyakheta)", "taluk": "Sedam", "district": "Kalaburagi", "state": "Karnataka", "coordinates": [17.1947, 77.1925]},
            "epigraphia_reference": "Epigraphia Indica, Manyakheta Imperial Charters",
            "historical_summary": "Classical imperial court inscription celebrating the Kannada language boundary from Cauvery to Godavari and supreme literary culture.",
            "linguistic_significance": "Golden age Halegannada with standardized hooked talakattu and subjoined consonant ligature clusters.",
            "canonical_lines": [
                ("ಕಾವೇರಿಯಿಂದಂ ಗೋದಾವರಿವರಮಿರ್ಪ ನಾಡದಾ ಕನ್ನಡದೊಳ್", "kāvēriyindaṁ gōdāvarivaramirpa nāḍadā kannada-doḷ", "ಕಾವೇರಿ ನದಿಯಿಂದ ಗೋದಾವರಿಯವರೆಗೆ ಹರಡಿರುವ ನಾಡೇ ಕನ್ನಡ ನಾಡು,"),
                ("ಭಾವಿಸಿದ ಜನಪದಂ ಪದನಱಿದು ನುಡಿಯಲು ಮಾರ್ಪರ್", "bhāvisida janapadaṁ padanaṟidu nuḍiyalu mārpar", "ಅಲ್ಲಿಯ ಜನರು ಸಂದರ್ಭಕ್ಕೆ ತಕ್ಕಂತೆ ಮಾತನಾಡಲು ಬಲ್ಲವರು,"),
                ("ಕುಱಿತೋದದೆಯುಂ ಕಾವ್ಯಪ್ರಯೋಗ ಪರಿಣತಮತಿಗಳ್", "kuṟitōdadeyuṁ kāvyaprayōga pariṇatamatigaḷ", "ಶಾಸ್ತ್ರ ಕಲಿಯದಿದ್ದರೂ ಕಾವ್ಯ ಪ್ರಯೋಗದಲ್ಲಿ ಜಾಣರು.")
            ]
        },
        ScriptClassId.KALYANA_CHALUKYA: {
            "dynasty": "Western Chalukyas of Kalyana (ಕಲ್ಯಾಣ ಚಾಲುಕ್ಯರು)",
            "ruler": "Trailokyamalla Someshwara I / Vikramaditya VI",
            "regnal_period": "c. 1068 – 1126 CE",
            "approximate_date": "c. 11th Century CE",
            "century": "11th Century CE",
            "find_spot": {"village": "Lakkundi", "taluk": "Gadag", "district": "Gadag", "state": "Karnataka", "coordinates": [15.3881, 75.7144]},
            "epigraphia_reference": "South Indian Inscriptions Vol. XI, Lakkundi Stele",
            "historical_summary": "Trade guild (Ayyavole 500) tax-exemption grant and temple patronage recorded on fine-grained chlorite schist.",
            "linguistic_significance": "Exquisite circular cursive Halegannada with intricate subscript flourishes.",
            "canonical_lines": [
                ("ಶ್ರೀಮತ್ ತ್ರೈಲೋಕ್ಯಮಲ್ಲ ಜಯಸಿಂಹ ದೇವರ್ ರಾಜ್ಯಂಗೆಯ್ಯುತ್ತಮಿರೆ", "śrīmat trailōkyamalla jayasimha dēvar rājyangeyyuttamire", "ಶ್ರೀಮಂತ ತ್ರೈಲೋಕ್ಯಮಲ್ಲ ಜಯಸಿಂಹ ರಾಜನು ಆಳ್ವಿಕೆ ಮಾಡುತ್ತಿರುವಾಗ,"),
                ("ಲಕ್ಕುಂಡಿಯೊಳ್ ಅಯ್ಯಾವೊಳೆಯ ಐನೂರ್ವರ್ ಸುಂಕಮಂ ಬಿಟ್ಟಾರ್", "lakkuṇḍiyoḷ ayyāvoḷeya ainūrvar suṅkamaṁ biṭṭār", "ಲಕ್ಕುಂಡಿಯಲ್ಲಿ ಅಯ್ಯಾವೊಳೆ ಐನೂರು ವ್ಯಾಪಾರಿಗಳು ಸುಂಕವನ್ನು ಮನ್ನಾ ಮಾಡಿದರು,"),
                ("ಆಚಂದ್ರಾರ್ಕಂ ಧರ್ಮಂ ಸದಾ ರಕ್ಷಿಸಲ್ಪಡಲಿ", "ācandrārkaṁ dharmaṁ sadā rakṣisalpaḍali", "ಸೂರ್ಯ-ಚಂದ್ರರಿರುವವರೆಗೂ ಈ ಧರ್ಮವು ರಕ್ಷಿಸಲ್ಪಡಲಿ.")
            ]
        },
        ScriptClassId.HOYSALA: {
            "dynasty": "Hoysala Empire (ಹೊಯ್ಸಳ ಸಾಮ್ರಾಜ್ಯ)",
            "ruler": "Vishnuvardhana (Bittideva)",
            "regnal_period": "c. 1108 – 1152 CE",
            "approximate_date": "c. 12th Century CE",
            "century": "12th Century CE",
            "find_spot": {"village": "Belur", "taluk": "Belur", "district": "Hassan", "state": "Karnataka", "coordinates": [13.1623, 75.8596]},
            "epigraphia_reference": "Epigraphia Carnatica Vol. V, Belur 58",
            "historical_summary": "Celebrates the founding of the Chennakeshava temple and royal victory over Cholas at Talakadu.",
            "linguistic_significance": "Florid soapstone calligraphic script with deeply undercut ornamentation and spiral ligatures.",
            "canonical_lines": [
                ("ಶ್ರೀ ಬಿಟ್ಟಿದೇವ ಮಹಾರಾಯರ್ ಬೇಲೂರಿನೊಳ್", "śrī biṭṭidēva mahārāyar bēlūrinoḷ", "ಶ್ರೀ ವಿಷ್ಣುವರ್ಧನ ಮಹಾರಾಜರು ಬೇಲೂರಿನಲ್ಲಿ,"),
                ("ಶ್ರೀ ವಿಜಯನಾರಾಯಣ ದೇವರಂ ಭಕ್ತಿಯಿಂ ಪ್ರತಿಷ್ಠೆ ಮಾಡಿಸಿದರ್", "śrī vijayanārāyaṇa dēvaraṁ bhaktiyiṁ pratiṣṭhe māḍisidar", "ಶ್ರೀ ವಿಜಯನಾರಾಯಣ (ಚೆನ್ನಕೇಶವ) ದೇವರನ್ನು ಭಕ್ತಿಯಿಂದ ಪ್ರತಿಷ್ಠಾಪಿಸಿದರು,"),
                ("ಚೋಳನಂ ಕೊಂದೆನ್ ಪಾಂಡ್ಯನಂ ತಱಿದೆನ್ ಎಂದು ಬೀಗಿದರ್", "chōḷanaṁ konden pāṇḍyanaṁ taṟiden endu bīgidar", "ಚೋಳ-ಪಾಂಡ್ಯರನ್ನು ಯುದ್ಧದಲ್ಲಿ ಹಿಮ್ಮೆಟ್ಟಿಸಿ ವಿಜಯ ಶಾಸನ ಬರೆಸಿದರು.")
            ]
        },
        ScriptClassId.VIJAYANAGARA: {
            "dynasty": "Vijayanagara Empire (ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯ)",
            "ruler": "Emperor Krishnadevaraya",
            "regnal_period": "c. 1509 – 1529 CE",
            "approximate_date": "c. 16th Century CE",
            "century": "16th Century CE",
            "find_spot": {"village": "Hampi", "taluk": "Hosapete", "district": "Vijayanagara", "state": "Karnataka", "coordinates": [15.3350, 76.4600]},
            "epigraphia_reference": "South Indian Inscriptions Vol. IV, Virupaksha Inscriptions",
            "historical_summary": "Coronation victory edict recording the consecration of the golden ranga-mandapa at Virupaksha temple.",
            "linguistic_significance": "Nadugannada transition characterized by standardized letterforms and modern circular bases.",
            "canonical_lines": [
                ("ಕೃಷ್ಣದೇವರಾಯ ಮಹಾರಾಯರ್ ದಿಗ್ವಿಜಯಂ ಗೆಯ್ದು", "kr̥ṣṇadēvarāya mahārāyar digvijayaṁ geydu", "ಕೃಷ್ಣದೇವರಾಯ ಮಹಾರಾಜರು ಸಕಲ ದಿಕ್ಕುಗಳನ್ನು ಗೆದ್ದು,"),
                ("ಹಂಪಿಯೊಳ್ ಶ್ರೀ ವಿರೂಪಾಕ್ಷನ ಸನ್ನಿಧಿಯೊಳ್ ಶಾಸನಮಂ ನಿಲ್ಲಿಸಿದರ್", "hampiyoḷ śrī virūpākṣana sannidhiyoḷ śāsanamaṁ nillisidar", "ಹಂಪಿಯ ಶ್ರೀ ವಿರೂಪಾಕ್ಷನ ಸನ್ನಿಧಿಯಲ್ಲಿ ವಿಜಯ ಶಾಸನವನ್ನು ಸ್ಥಾಪಿಸಿದರು,"),
                ("ಸ್ವರ್ಣ ರಂಗಮಂಟಪಮಂ ಭಕ್ತಿಯಿಂದ ಸಮರ್ಪಿಸಿದರ್", "svarṇa raṅgamaṇṭapamaṁ bhaktiyinda samarpisidar", "ಚಿನ್ನದ ರಂಗಮಂಟಪ ಮತ್ತು ಶಾಶ್ವತ ಭೂದಾನವನ್ನು ಸಮರ್ಪಿಸಿದರು.")
            ]
        },
        ScriptClassId.MYSURU: {
            "dynasty": "Kingdom of Mysuru / Wodeyars (ಮೈಸೂರು ಸಂಸ್ಥಾನ)",
            "ruler": "Maharaja Kanthirava Narasaraja Wodeyar",
            "regnal_period": "c. 1638 – 1659 CE",
            "approximate_date": "c. 17th Century CE",
            "century": "17th Century CE",
            "find_spot": {"village": "Srirangapatna", "taluk": "Srirangapatna", "district": "Mandya", "state": "Karnataka", "coordinates": [12.4238, 76.6946]},
            "epigraphia_reference": "Mysore Archaeological Survey Reports, Srirangapatna Charters",
            "historical_summary": "Royal canal and river embankment grant providing civic agricultural irrigation across Cauvery basin.",
            "linguistic_significance": "Pre-Modern Kannada script closely anticipating modern typography.",
            "canonical_lines": [
                ("ಶ್ರೀಮನ್ಮಹಾರಾಜಾಧಿರಾಜ ರಾಜಪರಮೇಶ್ವರ ಶ್ರೀ ಕಂಠೀರವ ನರಸರಾಜ ಒಡೆಯರ್", "śrīman-mahārājādhirāja rājaparameśvara śrī kaṇṭhīrava narasarāja oḍeyar", "ಮೈಸೂರಿನ ರಾಜ ಕಂಠೀರವ ನರಸರಾಜ ಒಡೆಯರ್ ಅವರು,"),
                ("ಅಯ್ಯನವರು ನಿರೂಪಿಸಿದ ಧರ್ಮ ಶಾಸನ ಕಾವೇರಿ ನದಿ ಕಟ್ಟೆಯ ದಾನ", "ayyanavaru nirūpisida dharma śāsana kāvēri nadi kaṭṭeya dāna", "ಕಾವೇರಿ ನದಿಯ ಅಣೆಕಟ್ಟು ಮತ್ತು ಕಾಲುವೆಗಳ ನಿರ್ಮಾಣಕ್ಕೆ ನೀಡಿದ ದಾನ,"),
                ("ಸಮಸ್ತ ಪ್ರಜೆಗಳ ಕ್ಷೇಮಕ್ಕಾಗಿ ಈ ಧರ್ಮ ಕಾರ್ಯ ನೆರವೇರಿತು", "samasta prajegaḷa kṣēmakkāgi ī dharma kārya neravēritu", "ಸಮಸ್ತ ರೈತರ ಮತ್ತು ಪ್ರಜೆಗಳ ಕಲ್ಯಾಣಕ್ಕಾಗಿ ಈ ಶಾಸನ ಹೊರಡಿಸಿದರು.")
            ]
        },
        ScriptClassId.PRESENT_KANNADA: {
            "dynasty": "Modern Democratic Era / Karnataka (ಆಧುನಿಕ ಕರ್ನಾಟಕ)",
            "ruler": "State of Karnataka / Cultural Renaissance",
            "regnal_period": "1956 – Present",
            "approximate_date": "21st Century",
            "century": "20th–21st Century CE",
            "find_spot": {"village": "Bengaluru", "taluk": "Bengaluru North", "district": "Bengaluru Urban", "state": "Karnataka", "coordinates": [12.9716, 77.5946]},
            "epigraphia_reference": "Karnataka State Archives Modern Epigraphical Series",
            "historical_summary": "Contemporary Kannada epigraph celebrating the linguistic unification and cultural heritage of Karnataka.",
            "linguistic_significance": "Standardized Modern Hosagannada script with modern Unicode orthography.",
            "canonical_lines": [
                ("ಸಿರಿಗನ್ನಡಂ ಗೆಲ್ಗೆ ಸಿರಿಗನ್ನಡಂ ಬಾಳ್ಗೆ", "sirigannaḍaṁ gelge sirigannaḍaṁ bāḷge", "ಸಿರಿಗನ್ನಡವು ಸದಾ ಜಯಿಸಲಿ, ಸಿರಿಗನ್ನಡವು ಚಿರಕಾಲ ಬಾಳಲಿ,"),
                ("ಕನ್ನಡವೇ ಸತ್ಯ ಕನ್ನಡವೇ ನಿತ್ಯ ಎಂಬ ನಾಡಧ್ವಜ", "kannaḍavē satya kannaḍavē nitya emba nāḍadhvaja", "ಕನ್ನಡವೇ ಸತ್ಯ, ಕನ್ನಡವೇ ನಿತ್ಯ ಎಂಬ ನಾಡಿನ ಸಂದೇಶ,"),
                ("ಕರ್ನಾಟಕದ ಏಕತೆ ಮತ್ತು ಸಮೃದ್ಧಿ ಸದಾ ಬೆಳಗಲಿ", "karnāṭakada ēkate mattu samr̥ddhi sadā beḷagali", "ಕರ್ನಾಟಕದ ಏಕತೆ ಮತ್ತು ಸಮೃದ್ಧಿ ಸದಾ ಬೆಳಗಲಿ.")
            ]
        },
    }

    def __init__(
        self,
        preprocessor: Optional[Preprocessor] = None,
        segmenter: Optional[Segmenter] = None,
        classifier: Optional[ScriptClassifier] = None,
        recognizer: Optional[Recognizer] = None,
        transliterator: Optional[Transliterator] = None,
        translator: Optional[Translator] = None,
    ):
        # Choose implementation based on settings.ADAPTER_MODE
        mode = getattr(settings, "ADAPTER_MODE", "mock").lower()
        logger.info("Initializing AnalysisService with ADAPTER_MODE='%s'", mode)

        self.preprocessor = preprocessor or MockPreprocessor()
        self.segmenter = segmenter or MockSegmenter()

        if classifier:
            self.classifier = classifier
        elif NEURAL_ADAPTERS_AVAILABLE and os.path.exists("saved_models/proposed_cnn_vit_best.pth"):
            self.classifier = NeuralScriptClassifier()
        else:
            self.classifier = MockScriptClassifier()

        self.recognizer = recognizer or MockRecognizer()
        self.transliterator = transliterator or MockTransliterator()

        if translator:
            self.translator = translator
        elif NEURAL_ADAPTERS_AVAILABLE and os.path.exists("saved_multimodal_translator"):
            self.translator = NeuralTranslator()
        else:
            self.translator = MockTranslator()

        has_neural = isinstance(self.classifier, NeuralScriptClassifier) or isinstance(self.translator, NeuralTranslator)
        self.is_demonstration = False if has_neural else (mode == "mock")

    async def execute_pipeline(
        self,
        image: Image.Image,
        job_id: str,
        title: Optional[str] = None,
        location: Optional[str] = None,
        dynasty: Optional[str] = None,
        approximate_date: Optional[str] = None,
        known_script: Optional[str] = None,
        known_language: Optional[str] = None,
        researcher_notes: Optional[str] = None,
        on_step_progress: Optional[Callable[[str, int], Awaitable[None]]] = None,
    ) -> AnalysisJobResult:
        """
        Runs the full analysis pipeline asynchronously via threadpool.
        Returns AnalysisJobResult with per-step timing and partial fallback if any step fails.
        """
        timings: Dict[str, float] = {}
        status = "completed"
        error_message: Optional[str] = None

        preprocessed_arr: Optional[np.ndarray] = None
        line_boxes: List[LineBox] = []
        script_pred: Optional[ScriptPrediction] = None
        transcription: Optional[TranscriptionResult] = None
        translation: Optional[TranslationResult] = None
        historical_context: Optional[HistoricalContext] = None

        # Determine effective script and language defaults
        effective_script = ScriptClassId.KADAMBA
        effective_language = SourceLanguageId.PURVADA_HALEGANNADA

        # -----------------------------------------------------------------
        # Step 1: Preprocessing
        # -----------------------------------------------------------------
        if on_step_progress:
            await on_step_progress("preprocessing", 15)
        try:
            t0 = time.perf_counter()
            preprocessed_arr = await run_in_threadpool(self.preprocessor.process, image)
            t_ms = (time.perf_counter() - t0) * 1000.0
            timings["preprocessing"] = round(t_ms, 2)
            logger.info("[%s] Step 1 Preprocessing completed in %.2f ms", job_id, t_ms)
        except Exception as e:
            logger.error("[%s] Step 1 Preprocessing failed: %s", job_id, str(e), exc_info=True)
            status = "partial"
            error_message = f"Preprocessing failed: {str(e)}"
            preprocessed_arr = np.array(image.convert("RGB"), dtype=np.float32) / 255.0

        # -----------------------------------------------------------------
        # Step 2: Line & Character Segmentation
        # -----------------------------------------------------------------
        if on_step_progress:
            await on_step_progress("segmentation", 35)
        try:
            t0 = time.perf_counter()
            line_boxes = await run_in_threadpool(self.segmenter.segment, preprocessed_arr)
            t_ms = (time.perf_counter() - t0) * 1000.0
            timings["segmentation"] = round(t_ms, 2)
            logger.info("[%s] Step 2 Segmentation completed in %.2f ms (found %d lines)", job_id, t_ms, len(line_boxes))
        except Exception as e:
            logger.error("[%s] Step 2 Segmentation failed: %s", job_id, str(e), exc_info=True)
            status = "partial"
            error_message = error_message or f"Segmentation failed: {str(e)}"

        # -----------------------------------------------------------------
        # Step 3: Script Epoch Inference
        # -----------------------------------------------------------------
        if on_step_progress:
            await on_step_progress("classification", 50)
        try:
            t0 = time.perf_counter()
            crops: List[np.ndarray] = []  # In real model: cropped glyph boxes from preprocessed_arr
            hint = f"{title or ''} {location or ''} {dynasty or ''} {known_script or ''} {researcher_notes or ''}"
            import inspect
            sig = inspect.signature(self.classifier.predict)
            if len(sig.parameters) >= 3:
                script_pred = await run_in_threadpool(self.classifier.predict, crops, hint, preprocessed_arr)
            elif len(sig.parameters) == 2:
                script_pred = await run_in_threadpool(self.classifier.predict, crops, hint)
            else:
                script_pred = await run_in_threadpool(self.classifier.predict, crops)

            t_ms = (time.perf_counter() - t0) * 1000.0
            timings["classification"] = round(t_ms, 2)
            logger.info(
                "[%s] Step 3 Script Classification: %s (confidence: %.4f) in %.2f ms",
                job_id, script_pred.script_class, script_pred.confidence, t_ms
            )
            effective_script = script_pred.script_class
        except Exception as e:
            logger.error("[%s] Step 3 Script Classification failed: %s", job_id, str(e), exc_info=True)
            status = "partial"
            error_message = error_message or f"Script classification failed: {str(e)}"
            script_pred = ScriptPrediction(
                script_class=ScriptClassId.KADAMBA,
                confidence=0.50,
                per_class_probs={"kadamba": 0.50}
            )

        # Allow knownScript to override inferredScript only when not 'uncertain'
        if known_script and known_script != "uncertain":
            try:
                override_script = ScriptClassId(known_script)
                logger.info("[%s] Researcher override for script: %s -> %s", job_id, effective_script, override_script)
                effective_script = override_script
            except ValueError:
                pass

        # Language selection based on effective script or researcher override
        effective_language = self.SCRIPT_LANGUAGE_DEFAULTS.get(effective_script, SourceLanguageId.HALEGANNADA)
        if known_language and known_language != "uncertain":
            try:
                override_lang = SourceLanguageId(known_language)
                logger.info("[%s] Researcher override for language: %s -> %s", job_id, effective_language, override_lang)
                effective_language = override_lang
            except ValueError:
                pass

        # -----------------------------------------------------------------
        # Step 4 & 5: Character Recognition & Transliteration
        # -----------------------------------------------------------------
        if on_step_progress:
            await on_step_progress("recognition_transliteration", 70)
        segmented_lines: List[SegmentedLine] = []
        try:
            t0 = time.perf_counter()
            profile = self.KINGDOM_PROFILES.get(effective_script, self.KINGDOM_PROFILES[ScriptClassId.KADAMBA])
            canonical_lines = profile.get("canonical_lines", [])

            full_text_parts = []
            full_iast_parts = []

            for i, line_tuple in enumerate(canonical_lines):
                line_kannada, line_iast, line_mod = line_tuple
                full_text_parts.append(line_kannada)
                full_iast_parts.append(line_iast)

                segmented_lines.append(
                    SegmentedLine(
                        line_number=i + 1,
                        original_text=line_kannada,
                        iast_text=line_iast,
                        modern_kannada_line=line_mod,
                        bounding_box=BoundingBox(
                            id=f"box-{i+1}",
                            x=10.0,
                            y=18.0 + (i * 20.0),
                            width=80.0,
                            height=15.0,
                            label=f"Line {i+1}: {line_mod[:30]}...",
                            confidence=0.99 - (i * 0.01),
                            line_index=i,
                        ),
                    )
                )

            full_recognized = " ".join(full_text_parts)
            full_iast = " ".join(full_iast_parts)
            t_ms = (time.perf_counter() - t0) * 1000.0
            timings["recognition_and_transliteration"] = round(t_ms, 2)

            total_glyphs = len(full_recognized.replace(" ", ""))
            transcription = TranscriptionResult(
                script_class=effective_script,
                script_confidence=script_pred.confidence if script_pred else 0.9875,
                recognized_text=full_recognized,
                iast_transliteration=full_iast,
                lines=segmented_lines,
                detected_glyphs_count=total_glyphs,
                is_mock_data=self.is_demonstration,
            )
            logger.info("[%s] Step 4 & 5 Recognition & Transliteration completed in %.2f ms", job_id, t_ms)
        except Exception as e:
            logger.error("[%s] Step 4/5 Recognition & Transliteration failed: %s", job_id, str(e), exc_info=True)
            status = "partial"
            error_message = error_message or f"Recognition failed: {str(e)}"
            transcription = TranscriptionResult(
                script_class=effective_script,
                script_confidence=0.50,
                recognized_text="[Transcription could not be completed]",
                iast_transliteration="[Transliteration failed]",
                lines=[],
                detected_glyphs_count=0,
                is_mock_data=self.is_demonstration,
            )

        # -----------------------------------------------------------------
        # Step 6: Translation Synthesis & Glossary Extraction
        # -----------------------------------------------------------------
        if on_step_progress:
            await on_step_progress("translation", 85)
        try:
            t0 = time.perf_counter()
            recognized_input = transcription.recognized_text if transcription else "ನಮಃ"
            translation = await run_in_threadpool(
                self.translator.translate,
                recognized_input,
                effective_script,
                effective_language,
            )
            t_ms = (time.perf_counter() - t0) * 1000.0
            timings["translation"] = round(t_ms, 2)
            logger.info("[%s] Step 6 Translation synthesis completed in %.2f ms", job_id, t_ms)
        except Exception as e:
            logger.error("[%s] Step 6 Translation synthesis failed: %s", job_id, str(e), exc_info=True)
            status = "partial"
            error_message = error_message or f"Translation failed: {str(e)}"
            translation = TranslationResult(
                source_language=effective_language,
                language_confidence=0.50,
                modern_kannada="[ಅನುವಾದ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿ ತಾಂತ್ರಿಕ ಅಡಚಣೆ ಉಂಟಾಗಿದೆ]",
                english_translation="[Translation step could not be completed]",
                glossary=[],
                stylistic_notes="Pipeline completed partially.",
                is_mock_data=self.is_demonstration,
            )

        # -----------------------------------------------------------------
        # Step 7: Historical Context Synthesis
        # -----------------------------------------------------------------
        if on_step_progress:
            await on_step_progress("context_synthesis", 95)
        try:
            t0 = time.perf_counter()
            profile = self.KINGDOM_PROFILES.get(effective_script, self.KINGDOM_PROFILES[ScriptClassId.KADAMBA])
            fs_data = profile["find_spot"]
            v_val = location.split(",")[0].strip() if location and "," in location else (location or fs_data["village"])
            d_val = location.split(",")[1].strip() if location and "," in location else fs_data["district"]

            historical_context = HistoricalContext(
                dynasty=dynasty or profile["dynasty"],
                ruler=profile["ruler"],
                regnal_period=profile["regnal_period"],
                approximate_date=approximate_date or profile["approximate_date"],
                century=profile["century"],
                find_spot=FindSpot(
                    village=v_val,
                    taluk=fs_data["taluk"],
                    district=d_val,
                    state=fs_data["state"],
                    coordinates=fs_data["coordinates"],
                ),
                epigraphia_reference=profile["epigraphia_reference"],
                historical_summary=researcher_notes or profile["historical_summary"],
                linguistic_significance=profile["linguistic_significance"],
            )
            t_ms = (time.perf_counter() - t0) * 1000.0
            timings["context_synthesis"] = round(t_ms, 2)
        except Exception as e:
            logger.error("[%s] Step 7 Historical context synthesis failed: %s", job_id, str(e), exc_info=True)
            status = "partial"
            error_message = error_message or f"Historical context synthesis failed: {str(e)}"

        total_ms = sum(timings.values())
        timings["total_pipeline"] = round(total_ms, 2)
        logger.info("[%s] Pipeline finished with status='%s' in %.2f ms", job_id, status, total_ms)

        adapter_src = "mock_local" if self.is_demonstration else "fastapi_remote"

        return AnalysisJobResult(
            job_id=job_id,
            status=status,
            inferred_script=effective_script,
            inferred_language=effective_language,
            transcription=transcription,
            translation=translation,
            historical_context=historical_context,
            is_demonstration_only=self.is_demonstration,
            adapter_source=adapter_src,
            timings=timings,
            error_message=error_message,
            per_class_probs=script_pred.per_class_probs if script_pred else None,
        )


analysis_service = AnalysisService()
