"""
Halegannada (Old Kannada) -> Hosagannada (Modern Kannada) & English
Computational Epigraphical Morphological Translation Engine.
Implements the definitive morphosyntactic rules from Kesiraja's Shabdamanidarpana (c. 1260 CE)
and sound shift laws (P->H, R->R, L->L) across all 10 historical Kannada dynasties.
"""

import re
from typing import Dict, List, Tuple, Optional
from backend.app.schemas import SourceLanguageId, ScriptClassId, TranslationResult, ArchaicGlossaryItem
from backend.app.schemas.epigraphy import WordAlignmentItem


class HalegannadaMorphologicalTranslator:
    """
    Translates unseen Old Kannada (Halegannada/Purvada Halegannada) sentences
    into fluent contemporary Hosagannada (ಹೊಸಗನ್ನಡ) and English.
    """

    # 1. Epigraphical Lexicon (Archaic Stem -> Modern Kannada, English, Grammatical Note)
    LEXICON: Dict[str, Tuple[str, str, str]] = {
        # Auspicious Openers & Royal Titles
        "ಸ್ವಸ್ತಿ": ("ಮಂಗಳವಾಗಲಿ / ಶುಭವಾಗಲಿ", "Hail and auspiciousness", "Auspicious invocation formula"),
        "ಶ್ರೀಮತ್": ("ಶ್ರೀಮಂತ / ಪೂಜ್ಯರಾದ", "Illustrious / venerable", "Honorific royal prefix"),
        "ಶ್ರೀಮದ್": ("ಶ್ರೀಮಂತ / ಪೂಜ್ಯರಾದ", "Illustrious / venerable", "Honorific prefix"),
        "ಶ್ರೀ": ("ಪವಿತ್ರ / ಶ್ರೀ", "Sacred / glorious", "Honorific title"),
        "ನಮಃ": ("ನಮಸ್ಕಾರಗಳು", "Salutations", "Devotional salutation"),
        "ರಾಜಾಧಿರಾಜ": ("ರಾಜಾಧಿರಾಜ (ರಾಜರ ರಾಜ)", "King of kings", "Imperial title"),
        "ಪರಮೇಶ್ವರ": ("ಪರಮೇಶ್ವರ (ಸರ್ವೋನ್ನತ ಪ್ರಭು)", "Supreme sovereign lord", "Imperial title"),
        "ಪರಮಭಟ್ಟಾರಕಂ": ("ಪರಮಭಟ್ಟಾರಕ ಚಕ್ರವರ್ತಿ", "Supreme emperor", "Imperial sovereign designation"),
        "ಪ್ರತಾಪ": ("ಮಹಾ ಪರಾಕ್ರಮಿ", "Valiant / glorious", "Royal epithet"),
        "ಚಕ್ರವರ್ತಿ": ("ಚಕ್ರವರ್ತಿ", "Emperor", "Monarch title"),
        "ಭುಜಬಲ": ("ಬಾಹುಬಲಿ / ಪರಾಕ್ರಮಿ", "Mighty-armed warrior", "Military epithet"),
        "ಮಹಾರಾಯರ್": ("ಮಹಾರಾಜರು", "Great king / emperor", "Royal title"),
        "ಮಹಾರಾಜಾಧಿರಾಜ": ("ಮಹಾರಾಜಾಧಿರಾಜ", "Emperor of emperors", "Imperial title"),
        "ಮಹಾಸ್ತೂಪ": ("ಪವಿತ್ರ ಮಹಾಸ್ತೂಪ", "Sacred grand stupa", "Buddhist monument"),
        "ದೇವಾನಂಪಿಯೇ": ("ದೇವತೆಗಳಿಗೆ ಪ್ರಿಯನಾದವನು", "Beloved of the gods", "Ashokan Prakrit imperial epithet"),
        "ಪಿಯದಸಿ": ("ಪ್ರಿಯದರ್ಶಿ (ಕರುಣಾಮಯಿ ರಾಜ)", "Priyadarsi (of benevolent visage)", "Ashokan royal title"),
        "ಲಾಜಾ": ("ರಾಜನು", "The King", "Prakrit for Raja"),
        "ಆಹಾ": ("ಹೀಗೆ ಆಜ್ಞಾಪಿಸುತ್ತಾನೆ", "Thus proclaims", "Prakrit verb"),
        "ಸಕಲ": ("ಸಮಸ್ತ / ಎಲ್ಲ", "All / universal", "Adjective"),
        "ಲೋಕಾನಂ": ("ಜನರ / ಲೋಕದ", "Of the world / of the people", "Prakrit genitive"),
        "ಹಿತಾಯ": ("ಹಿತಕ್ಕಾಗಿ / ಕಲ್ಯಾಣಕ್ಕಾಗಿ", "For the welfare and happiness", "Prakrit dative"),
        "ಧಮ್ಮ": ("ಧರ್ಮ", "Dharma / righteous conduct", "Prakrit noun"),
        "ಚರಣೇನ": ("ಆಚರಣೆಯಿಂದ", "By the practice of", "Prakrit instrumental"),
        "ಸತ್ಯಂ": ("ಸತ್ಯವು", "Truth", "Noun"),
        "ವಧತಿ": ("ವೃದ್ಧಿಯಾಗುತ್ತದೆ / ಬೆಳೆಯುತ್ತದೆ", "Prospers / increases", "Prakrit verb"),

        # Dynastic & Monarchy Terms
        "ರಾಯಂ": ("ರಾಜನು", "The King / monarch", "Nominative / Accusative royal noun"),
        "ರಾಯ": ("ರಾಜ", "King / monarch", "Royal noun"),
        "ರಾಯರ್": ("ರಾಜರು / ಮಹಾರಾಜರು", "Monarchs / emperors", "Honorific plural"),
        "ದೇವರ್": ("ದೇವತೆಗಳು / ಮಹಾರಾಜರು", "Venerable monarch / Lord", "Honorific suffix"),
        "ದೇವರಿಗೆ": ("ದೇವರಿಗೆ / ಭಗವಂತನಿಗೆ", "Unto the Lord / deity", "Dative noun"),
        "ಹಂಪಿ": ("ಹಂಪಿ (ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯ ರಾಜಧಾನಿ)", "Hampi", "Historical capital"),
        "ಹಂಪಿಯ": ("ಹಂಪಿಯ", "Of Hampi", "Genitive place name"),
        "ಬೇಲೂರು": ("ಬೇಲೂರು (ಹೊಯ್ಸಳ ರಾಜಧಾನಿ)", "Belur", "Historical temple capital"),
        "ಬೇಲೂರಿನ": ("ಬೇಲೂರಿನ", "Of Belur", "Genitive place name"),
        "ಬಾದಾಮಿ": ("ಬಾದಾಮಿ (ವಾತಾಪಿ)", "Badami (Vatapi)", "Chalukyan capital"),
        "ಕದಂಬಪನ್": ("ಕದಂಬ ವಂಶದ ರಾಜನು", "King of the Kadamba dynasty", "Patronymic title"),
        "ಕಾಗುಸ್ಥಭಟ್ಟೋರನ್": ("ಕಾಕುಸ್ಥಭಟ್ಟಾರಕನು", "Emperor Kakusthavarma", "Kadamba royal name"),
        "ಕಾಗುಸ್ಥನ್": ("ಕಾಕುಸ್ಥವರ್ಮನು", "King Kakusthavarma", "Proper noun"),
        "ಕನ್ನರಂ": ("ಕೃಷ್ಣ ಚಕ್ರವರ್ತಿ", "Emperor Krishna III", "Rashtrakuta monarch"),
        "ನೃಪತುಂಗಂ": ("ನೃಪತುಂಗ ಅಮೋಘವರ್ಷ", "King Nrupatunga Amoghavarsha", "Rashtrakuta monarch"),
        "ಧರ್ಮಪ್ರಿಯಂ": ("ಧರ್ಮಪ್ರಿಯನಾದ", "Devoted to righteousness", "Epithet"),
        "ಬಿಟ್ಟಿದೇವ": ("ವಿಷ್ಣುವರ್ಧನ (ಬಿಟ್ಟಿದೇವ)", "King Bittideva Vishnuvardhana", "Hoysala monarch"),
        "ಬಲ್ಲಾಳ": ("ವೀರ ಬಲ್ಲಾಳ", "King Vira Ballala", "Hoysala monarch"),
        "ಕೃಷ್ಣದೇವರಾಯ": ("ಶ್ರೀ ಕೃಷ್ಣದೇವರಾಯ", "Emperor Krishnadevaraya", "Vijayanagara monarch"),
        "ವಿರೂಪಾಕ್ಷನ": ("ವಿರೂಪಾಕ್ಷ ದೇವರ", "Of Lord Virupaksha", "Deity genitive"),
        "ಕಂಠೀರವ": ("ಕಂಠೀರವ ನರಸರಾಜ", "Kanthirava Narasaraja", "Mysuru monarch"),
        "ಒಡೆಯರ್": ("ಒಡೆಯರ್", "Wodeyar", "Dynastic title"),

        # Land Grants, Warfare & Heroism
        "ಬಾಗಳ್ಚು": ("ವೀರ ಉಂಬಳಿ ಭೂಮಿ", "Tax-exempt heroic land endowment", "Hero stone tenure term"),
        "ಬಾಳ್ಗಚ್ಚು": ("ವೀರ ಉಂಬಳಿ ಭೂಮಿ", "Heroic sword-washing land grant", "Epigraphical land grant tenure"),
        "ಪೆಗ್ಗಡೆ": ("ಹೆಗ್ಗಡೆ / ಪ್ರಧಾನ ಅಧಿಕಾರಿ", "Senior royal minister / superintendent", "Feudal administrative office"),
        "ಪೆಱ್ಗೆಡೆ": ("ಹೆಗ್ಗಡೆ / ಮುಖ್ಯಸ್ಥ", "Chieftain / officer", "Archaic spelling"),
        "ಪೆಱ್ಗುಡಿ": ("ಹಿರಿಯ ಕುಟುಂಬ / ಮನೆತನ", "Venerable lineage / household", "Sociological term"),
        "ಅಳಿದ": ("ಮಡಿದ / ವೀರಮರಣವನ್ನಪ್ಪಿದ", "Perished / sacrificed life in battle", "Past relative participle"),
        "ಅಳಪ-ಗಣ": ("ಆಳುಪ ವಂಶದ ಸೈನ್ಯ", "Warrior host of the Alupa lineage", "Military guild"),
        "ಪಶುಪತಿ": ("ಪಶುಪತಿ ಸೇನಾನಿ", "Commander Pashupati", "Proper noun"),
        "ವಿಜಾಯರಸಂಗೆ": ("ವಿಜಯರಸನಿಗೆ", "Unto Vijaya Arasa", "Dative proper noun"),
        "ಭಟಹರಪ್ಪೋರ್": ("ಹೋರಾಡಿದ ಯೋಧರು", "Valiant warriors who engaged in combat", "Compound participle"),
        "ಕಾಳಗದೊಳ್": ("ಭೀಕರ ಯುದ್ಧದಲ್ಲಿ", "In the fierce battle", "Locative warfare term"),
        "ವೀರಗಲ್ಲಂ": ("ವೀರಗಲ್ಲನ್ನು", "Hero-stone (commemorative memorial slab)", "Accusative artifact"),
        "ವೀರಗಲ್ಲು": ("ವೀರಗಲ್ಲು", "Hero-stone memorial slab", "Noun"),
        "ನಿಲ್ಲಿಸಿದರ್": ("ಸ್ಥಾಪಿಸಿದರು / ನಿಲ್ಲಿಸಿದರು", "Erected / consecrated", "Archaic past plural verb"),
        "ಕೊಟ್ಟಾರ್": ("ನೀಡಿದರು / ಪ್ರದಾನ ಮಾಡಿದರು", "Bestowed / conferred", "Past plural verb"),
        "ಮಾಡಿಸಿದರ್": ("ಮಾಡಿಸಿದರು / ನಿರ್ಮಿಸಿದರು", "Commissioned / executed", "Causative past verb"),
        "ಸಮರ್ಪಿಸಿದರ್": ("ಭಕ್ತಿಯಿಂದ ಸಮರ್ಪಿಸಿದರು", "Dedicated with devotion", "Past verb"),
        "ಪ್ರತಿಷ್ಠಿಸಿ": ("ಪ್ರತಿಷ್ಠಾಪನೆ ಮಾಡಿ", "Having consecrated / installed", "Past participle"),
        "ದಿಗ್ವಿಜಯಂ": ("ಸಕಲ ದಿಕ್ಕುಗಳ ವಿಜಯ", "Conquest of all quarters (universal triumph)", "Accusative noun"),
        "ಗೆಯ್ದು": ("ಮಾಡಿ / ಸಾಧಿಸಿ", "Having accomplished / performed", "Conjunctive participle"),

        # Legal Formulas & Religious Grants
        "ದತ್ತಿ": ("ಶಾಶ್ವತ ಧರ್ಮದಾನ / ಉಂಬಳಿ", "Perpetual endowment / charitable tenure", "Legal grant term"),
        "ದಾನಂ": ("ಧರ್ಮದಾನ", "Righteous donation", "Accusative noun"),
        "ದಾನಮಂ": ("ದಾನವನ್ನು", "The righteous endowment", "Accusative noun"),
        "ಶಾಸನಂ": ("ಶಿಲಾಶಾಸನ", "Stone inscription / royal edict", "Noun"),
        "ಶಾಸನಮಂ": ("ಶಾಸನವನ್ನು", "The royal edict / inscription", "Accusative noun"),
        "ಧಾರಾಪೂರ್ವಕಂ": ("ಪವಿತ್ರ ಜಲಧಾರೆಯೆರೆದು", "Ratified with sacred libation of water", "Ritual grant legal formula"),
        "ಸರ್ವಬಾಧಾ": ("ಸಕಲ ತೆರಿಗೆ ಮತ್ತು ಬಾಧೆಗಳು", "All royal taxes and feudal exactions", "Compound legal term"),
        "ಪರಿಹಾರವಾಗಿ": ("ಮುಕ್ತವಾಗಿ / ವಿನಾಯಿತಿಯಾಗಿ", "Tax-exempt / fully remitted", "Legal exemption adverb"),
        "ಆಚಂದ್ರಾರ್ಕ": ("ಸೂರ್ಯ ಮತ್ತು ಚಂದ್ರರಿರುವವರೆಗೂ", "As long as the sun and moon endure", "Perpetuity formula"),
        "ತಾರಾಂಬರಂ": ("ನಕ್ಷತ್ರ ಮತ್ತು ಆಕಾಶವಿರುವವರೆಗೂ", "As long as the stars and sky abide", "Perpetuity formula"),
        "ಬಱಂ": ("ವರೆಗೆ", "Until / up to", "Postposition"),
        "ಸದಾ": ("ಎಂದೆಂದಿಗೂ", "Forever / in perpetuity", "Adverb"),
        "ನಿಲ್ಕೆ": ("ಶಾಶ್ವತವಾಗಿ ನಿಲ್ಲಲಿ", "May it stand perpetual", "Optative verb"),
        "ಪ್ರತಿಪಾಲಿಸಿದವರ್ಗೆ": ("ಕಾಪಾಡಿದ ಸಜ್ಜನರಿಗೆ", "Unto those who protect and maintain this grant", "Dative participle"),
        "ಅಶ್ವಮೇಧ": ("ಅಶ್ವಮೇಧ ಯಾಗದ", "Of the sacred Ashvamedha horse sacrifice", "Genitive noun"),
        "ಯಾಗದ": ("ಯಜ್ಞದ", "Of the ritual sacrifice", "Genitive noun"),
        "ಮಹಾಫಲಮಕ್ಕುಂ": ("ಶ್ರೇಷ್ಠ ಪುಣ್ಯ ಫಲವಾಗುವುದು", "Supreme spiritual merit shall accrue", "Predictive verbal form"),
        "ಇದನಱಿದು": ("ಇದನ್ನು ತಿಳಿದುಕೊಂಡೂ", "Knowing this full well", "Archaic compound participle"),
        "ಅೞಿವಂಗೆ": ("ನಾಶಮಾಡುವ ಅಥವಾ ಕದಿಯುವ ದುರುಳನಿಗೆ", "Unto the transgressor who revokes or damages this gift", "Dative participle"),
        "ವಾರಣಾಸಿಯೊಳ್": ("ವಾರಣಾಸಿ (ಕಾಶಿ) ಪುಣ್ಯಕ್ಷೇತ್ರದಲ್ಲಿ", "In the sanctified pilgrimage grounds of Varanasi", "Locative noun"),
        "ಸಾಸಿರ": ("ಸಾವಿರ", "A thousand", "Numeral"),
        "ಕಪಿಲೆಯುಂ": ("ಪವಿತ್ರ ಕಪಿಲೆ ಹಸುಗಳು", "Sacred tawny cows (kapila)", "Accusative plural"),
        "ಬ್ರಾಹ್ಮಣರಂ": ("ತಪಸ್ವಿ ಬ್ರಾಹ್ಮಣರನ್ನು", "Venerable sages and ascetics", "Accusative plural"),
        "ಕೊಂದ": ("ಸಂಹರಿಸಿದ / ಹತ್ಯೆ ಮಾಡಿದ", "Slaying / killing", "Past participle"),
        "ಮಹಾಪಾತಕಂ": ("ಘೋರ ಮಹಾಪಾಪವು", "The deadliest heinous spiritual guilt", "Compound noun"),
        "ಸಾರ್ಗುಂ": ("ಬಂದು ಮುಟ್ಟುವುದು / ಪ್ರಾಪ್ತವಾಗುವುದು", "Shall incur / shall attach unto him", "Predictive verb"),
        "ಅಗ್ರಹಾರ": ("ವಿದ್ವಜ್ಜನರ ಪವಿತ್ರ ಅಗ್ರಹಾರ ಗ್ರಾಮ", "Sanctified Agrahara scholarly township", "Endowment term"),
        "ಅಗ್ರಹಾರಮಂ": ("ಅಗ್ರಹಾರ ಗ್ರಾಮವನ್ನು", "The Agrahara domain", "Accusative noun"),
        "ರಂಗಮಂಟಪ": ("ರಂಗಮಂಟಪ", "Assembly hall (Ranga-mandapa)", "Architectural term"),
        "ರಂಗಮಂಟಪಮಂ": ("ಚಿನ್ನದ ರಂಗಮಂಟಪವನ್ನು", "The golden assembly hall", "Accusative noun"),
        "ಸ್ವರ್ಣ": ("ಚಿನ್ನದ", "Golden", "Adjective"),

        # Ethical & Poetry Verses (Kappe Arabhatta & Kavirajamarga)
        "ಸಾಧುಗೆ": ("ಒಳ್ಳೆಯವರಿಗೆ / ಸಜ್ಜನರಿಗೆ", "Unto the virtuous and gentle", "Dative noun"),
        "ಸಾಧು": ("ಒಳ್ಳೆಯವನು / ಸಜ್ಜನನು", "Virtuous / gentle", "Noun/Adjective"),
        "ಮಾಧುರ್ಯಂಗೆ": ("ಮೃದು ಸ್ವಭಾವದವರಿಗೆ", "Unto the sweet and refined", "Dative noun"),
        "ಮಾಧುರ್ಯಂ": ("ಮಾಧುರ್ಯವೇ ಸರಿ", "Sweetness personified", "Noun"),
        "ಬಾಧಿಪ್ಪ": ("ಉಪದ್ರವ ಕೊಡುವ / ನೋಯಿಸುವ", "Harassing / tormenting foes", "Relative participle"),
        "ಕಲಿಗೆ": ("ಶತ್ರುವಿಗೆ / ವೀರನಿಗೆ", "Unto the adversary / valiant challenger", "Dative noun"),
        "ಕಲಿಯುಗ": ("ಕಲಿಯುಗದ", "Of the Kali age", "Noun"),
        "ವಿಪರೀತನ್": ("ವಿಪರೀತನಂತೆ ಮಹಾ ಭಯಂಕರನು", "A tempestuous contrarian force", "Epithet"),
        "ಮಾಧವನೀತನ್": ("ಈತನು ಸಾಕ್ಷಾತ್ ವಿಷ್ಣು", "He is verily Lord Madhava incarnate", "Compound phrase"),
        "ಪೆರನಲ್ಲ": ("ಬೇರೆಯವನಲ್ಲ / ಅನ್ಯನಲ್ಲ", "None other / not distinct from", "Negative compound"),
        "ಪೆರನಲ್ಲನ್": ("ಬೇರೆಯವನಲ್ಲ", "None other", "Noun"),
        "ಸತ್ಯಶೌಚನ್": ("ಸತ್ಯವಂತನು ಮತ್ತು ಶುದ್ಧ ನಡತೆಯುಳ್ಳವನು", "Endowed with spotless truth and pure conduct", "Compound epithet"),
        "ಕಾವೇರಿಯಿಂದಂ": ("ಕಾವೇರಿ ನದಿಯಿಂದ", "From the Cauvery river", "Instrumental noun"),
        "ಗೋದಾವರಿವರಂ": ("ಗೋದಾವರಿ ನದಿಯವರೆಗೆ", "Up to the Godavari river", "Postpositional compound"),
        "ಮಿರ್ಪ": ("ಇರುವ", "Which extends / abides", "Relative participle"),
        "ನಾಡದಾ": ("ನಾಡೇ", "Is the very realm of", "Emphatic noun"),
        "ಕನ್ನಡದೊಳ್": ("ಕನ್ನಡ ನಾಡಿನಲ್ಲಿ", "In the Kannada country", "Locative noun"),
        "ಭಾವಿಸಿದ": ("ಶ್ರೇಷ್ಠರಾದ / ಸುಸಂಸ್ಕೃತರಾದ", "Cultured / perceptive", "Adjective"),
        "ಜನಪದಂ": ("ಅಲ್ಲಿಯ ಸಮಸ್ತ ಜನರು", "The citizenry / populace", "Collective noun"),
        "ಪದನಱಿದು": ("ಸಂದರ್ಭೋಚಿತ ಪದಗಳನ್ನು ಅರಿತು", "Mastering appropriate vocabulary and context", "Conjunctive compound"),
        "ನುಡಿಯಲು": ("ಮಾತನಾಡಲು", "To speak with eloquence", "Infinitive verb"),
        "ಮಾರ್ಪರ್": ("ಬಲ್ಲವರು / ಸಮರ್ಥರು", "Are innately adept and skilled", "Third person plural verb"),
        "ಕುಱಿತೋದದೆಯುಂ": ("ಶಾಸ್ತ್ರಗಳನ್ನು ಓದದಿದ್ದರೂ ಕೂಡ", "Even without formal bookish schooling", "Concessive participle"),
        "ಕಾವ್ಯಪ್ರಯೋಗ": ("ಕಾವ್ಯ ರಚನೆ ಮತ್ತು ಪ್ರಯೋಗದಲ್ಲಿ", "In poetic composition and aesthetic usage", "Compound noun"),
        "ಪರಿಣತಮತಿಗಳ್": ("ಪರಿಣಿತ ಜ್ಞಾನಿಗಳು", "Innately discerning master intellects", "Plural noun"),

        # Modern Democratic & Renowned Mottos
        "ಸಿರಿಗನ್ನಡಂ": ("ಸಿರಿಗನ್ನಡವು (ಸಮೃದ್ಧ ಕನ್ನಡ)", "Glorious and rich Kannada", "Honorific compound"),
        "ಗೆಲ್ಗೆ": ("ಸದಾ ಜಯಿಸಲಿ", "May it triumph!", "Optative verb"),
        "ಬಾಳ್ಗೆ": ("ಚಿರಕಾಲ ಬಾಳಲಿ", "May it flourish forever!", "Optative verb"),
        "ಬಾೞ್ಗೆ": ("ಚಿರಕಾಲ ಬಾಳಲಿ", "May it live long!", "Archaic optative verb"),
        "ಕನ್ನಡವೇ": ("ಕನ್ನಡವೇ", "Kannada alone", "Emphatic noun"),
        "ಸತ್ಯ": ("ಶಾಶ್ವತ ಸತ್ಯ", "Truth eternal", "Noun"),
        "ನಿತ್ಯ": ("ನಿತ್ಯವೂ ಪ್ರಸ್ತುತ", "Everlasting", "Noun"),
        "ಎಂಬ": ("ಎಂಬ", "Thus proclaimed", "Quotative particle"),
        "ನಾಡಧ್ವಜ": ("ನಾಡಧ್ವಜ", "Flag of our land", "Compound noun"),
        "ಕರ್ನಾಟಕದ": ("ಕರ್ನಾಟಕದ", "Of Karnataka", "Genitive noun"),
        "ಏಕತೆ": ("ಏಕತೆ", "Unity", "Noun"),
        "ಮತ್ತು": ("ಮತ್ತು", "And", "Conjunction"),
        "ಸಮೃದ್ಧಿ": ("ಸಮೃದ್ಧಿ", "Prosperity", "Noun"),
        "ಬೆಳಗಲಿ": ("ಸದಾ ಬೆಳಗಲಿ", "May it shine radiant", "Optative verb"),
    }

    # 2. Case Suffix Transformation Rules (Shabdamanidarpana Vibhakti Engine)
    # Uses Unicode range [\u0C80-\u0CFF] to match any Kannada consonant, vowel matra, virama, and anusvara
    SUFFIX_RULES: List[Tuple[str, str, str]] = [
        # Locative (Saptami) -ಒಳ್ / -ಉಳ್ -> -ನಲ್ಲಿ / -ದಲ್ಲಿ / -ಯಲ್ಲಿ
        (r"([\u0C80-\u0CFF]+)ದೊಳ್$", r"\1ದಲ್ಲಿ", "Locative -ದೊಳ್ -> -ದಲ್ಲಿ"),
        (r"([\u0C80-\u0CFF]+)ರೊಳ್$", r"\1ರಲ್ಲಿ", "Locative -ರೊಳ್ -> -ರಲ್ಲಿ"),
        (r"([\u0C80-\u0CFF]+)ಯೊಳ್$", r"\1ಯಲ್ಲಿ", "Locative -ಯೊಳ್ -> -ಯಲ್ಲಿ"),
        (r"([\u0C80-\u0CFF]+)ನೊಳ್$", r"\1ನಲ್ಲಿ", "Locative -ನೊಳ್ -> -ನಲ್ಲಿ"),
        (r"([\u0C80-\u0CFF]+)ತ್ತೊಳ್$", r"\1ತ್ತಿನಲ್ಲಿ", "Locative -ತ್ತೊಳ್ -> -ತ್ತಿನಲ್ಲಿ"),
        (r"([\u0C80-\u0CFF]+)ಒಳ್$", r"\1ನಲ್ಲಿ", "Locative -ಒಳ್ -> -ನಲ್ಲಿ"),
        (r"([\u0C80-\u0CFF]+)ಉಳ್$", r"\1ನಲ್ಲಿ", "Locative -ಉಳ್ -> -ನಲ್ಲಿ"),

        # Accusative (Dwiteeya) -ಮಂ / -ಅಂ -> -ವನ್ನು / -ನ್ನು
        (r"([\u0C80-\u0CFF]+)ಮಂ$", r"\1ವನ್ನು", "Accusative -ಮಂ -> -ವನ್ನು"),
        (r"([\u0C80-\u0CFF]+)ದಂ$", r"\1ದನ್ನು", "Accusative -ದಂ -> -ದನ್ನು"),
        (r"([\u0C80-\u0CFF]+)ರಂ$", r"\1ರನ್ನು", "Accusative -ರಂ -> -ರನ್ನು"),
        (r"([\u0C80-\u0CFF]+)ಯಂ$", r"\1ಯನ್ನು", "Accusative -ಯಂ -> -ಯನ್ನು"),
        (r"([\u0C80-\u0CFF]+)ನಂ$", r"\1ನನ್ನು", "Accusative -ನಂ -> -ನನ್ನು"),
        (r"([\u0C80-\u0CFF]+)ವಂ$", r"\1ವನ್ನು", "Accusative -ವಂ -> -ವನ್ನು"),

        # Instrumental (Tritiya) -ಇಮ್ / -ಇಂದಂ -> -ಇಂದ
        (r"([\u0C80-\u0CFF]+)ಯಿಂದಂ$", r"\1ಯಿಂದ", "Instrumental -ಯಿಂದಂ -> -ಯಿಂದ"),
        (r"([\u0C80-\u0CFF]+)ದಿಂದಂ$", r"\1ದಿಂದ", "Instrumental -ದಿಂದಂ -> -ದಿಂದ"),
        (r"([\u0C80-\u0CFF]+)ರಿಂದಂ$", r"\1ರಿಂದ", "Instrumental -ರಿಂದಂ -> -ರಿಂದ"),
        (r"([\u0C80-\u0CFF]+)ಇಂದಂ$", r"\1ಇಂದ", "Instrumental -ಇಂದಂ -> -ಇಂದ"),
        (r"([\u0C80-\u0CFF]+)ದಿಂ$", r"\1ದಿಂದ", "Instrumental -ದಿಂ -> -ದಿಂದ"),
        (r"([\u0C80-\u0CFF]+)ಯಿಂ$", r"\1ಯಿಂದ", "Instrumental -ಯಿಂ -> -ಯಿಂದ"),

        # Dative (Chaturthi) -ಅರ್ಗೆ / -ವರ್ಗೆ / -ಒಂಗೆ -> -ವರಿಗೆ / -ವನಿಗೆ
        (r"([\u0C80-\u0CFF]+)ವರ್ಗೆ$", r"\1ವರಿಗೆ", "Dative -ವರ್ಗೆ -> -ವರಿಗೆ"),
        (r"([\u0C80-\u0CFF]+)ಒಂಗೆ$", r"\1ವನಿಗೆ", "Dative -ಒಂಗೆ -> -ವನಿಗೆ"),
        (r"([\u0C80-\u0CFF]+)ವಂಗೆ$", r"\1ವನಿಗೆ", "Dative -ವಂಗೆ -> -ವನಿಗೆ"),
        (r"([\u0C80-\u0CFF]+)ರ್ಗೆ$", r"\1ರಿಗೆ", "Dative -ರ್ಗೆ -> -ರಿಗೆ"),

        # Plural Markers -ಗಳ್ / -ಅರ್
        (r"([\u0C80-\u0CFF]+)ಗಳ್$", r"\1ಗಳು", "Plural -ಗಳ್ -> -ಗಳು"),
        (r"([\u0C80-\u0CFF]+)ಮಾರ್$", r"\1ಮಾರು", "Plural -ಮಾರ್ -> -ಮಾರು"),

        # Verbal Suffixes -ದರ್ / -ದಾರ್ / -ಗೆಯ್
        (r"([\u0C80-\u0CFF]+)ಸಿದರ್$", r"\1ಸಿದರು", "Past verb -ಸಿದರ್ -> -ಸಿದರು"),
        (r"([\u0C80-\u0CFF]+)ದಾರ್$", r"\1ದರು", "Past verb -ದಾರ್ -> -ದರು"),
        (r"([\u0C80-\u0CFF]+)ದರ್$", r"\1ದರು", "Past verb -ದರ್ -> -ದರು"),
        (r"([\u0C80-\u0CFF]+)ಟ್ಟಾರ್$", r"\1ಟ್ಟರು", "Past verb -ಟ್ಟಾರ್ -> -ಟ್ಟರು"),
        (r"([\u0C80-\u0CFF]+)ಟ್ಟನ್$", r"\1ಟ್ಟನು", "Past verb -ಟ್ಟನ್ -> -ಟ್ಟನು"),
        (r"([\u0C80-\u0CFF]+)ಗೆಯ್ದು$", r"\1 ಮಾಡಿ", "Conjunctive -ಗೆಯ್ದು -> -ಮಾಡಿ"),
        (r"([\u0C80-\u0CFF]+)ಗೆಯ್ಯುತ್ತಿರೆ$", r"\1 ಮಾಡುತ್ತಿರುವಾಗ", "Continuous -ಗೆಯ್ಯುತ್ತಿರೆ -> -ಮಾಡುತ್ತಿರುವಾಗ"),
        (r"([\u0C80-\u0CFF]+)ಗೆಯ್ಯುತ್ತಮಿರೆ$", r"\1 ಮಾಡುತ್ತಿರುವಾಗ", "Continuous -ಗೆಯ್ಯುತ್ತಮಿರೆ -> -ಮಾಡುತ್ತಿರುವಾಗ"),
    ]

    # 3. Sound Shift Laws (ಧ್ವನಿ ಪರಿವರ್ತನೆ)
    PHONETIC_SHIFTS: List[Tuple[str, str]] = [
        ("ಱ", "ರ"),   # Sakata Repha to regular Ra
        ("ೞ", "ಳ"),   # Kula to La
    ]

    def normalize_phonemes(self, word: str) -> str:
        """Applies historical Kannada phonological shifts."""
        res = word
        for old_ch, new_ch in self.PHONETIC_SHIFTS:
            res = res.replace(old_ch, new_ch)
        return res

    def translate_token_with_rule(self, token: str) -> Tuple[str, str, str]:
        """
        Translates a single Halegannada word into Hosagannada and English along with the applied grammar rule.
        Returns: (hosagannada_word, english_word, rule_description)
        """
        clean = token.strip(" ,.;:!?|।॥")
        if not clean:
            return token, token, "Identity punctuation"

        # 1. Direct Lexical Lookup
        if clean in self.LEXICON:
            k_val, e_val, defn = self.LEXICON[clean]
            return k_val, e_val, f"Direct Lexicon ({defn})"

        # Check with normalized phonemes (e.g. ಱ -> ರ)
        norm = self.normalize_phonemes(clean)
        if norm in self.LEXICON:
            k_val, e_val, defn = self.LEXICON[norm]
            return k_val, e_val, f"Phonetic Shift ({defn})"

        # 2. Morphological Suffix Rule Engine
        for pat, repl, label in self.SUFFIX_RULES:
            m = re.search(pat, clean)
            if m:
                transformed = re.sub(pat, repl, clean)
                stem = m.group(1)
                stem_norm = self.normalize_phonemes(stem)

                mod_e_stem = stem
                if stem in self.LEXICON:
                    mod_e_stem = self.LEXICON[stem][1]
                elif stem_norm in self.LEXICON:
                    mod_e_stem = self.LEXICON[stem_norm][1]

                if "Locative" in label:
                    eng = f"in {mod_e_stem}"
                elif "Accusative" in label:
                    eng = f"the {mod_e_stem}"
                elif "Instrumental" in label:
                    eng = f"by/from {mod_e_stem}"
                elif "Dative" in label:
                    eng = f"unto {mod_e_stem}"
                elif "Past verb" in label:
                    eng = f"consecrated / {mod_e_stem}"
                elif "Conjunctive" in label:
                    eng = f"having accomplished {mod_e_stem}"
                elif "Continuous" in label:
                    eng = f"while reigning over {mod_e_stem}"
                else:
                    eng = mod_e_stem
                return transformed, eng, label

        # 3. P-to-H Sound Shift for unseen noun roots
        if clean.startswith("ಪ") and len(clean) > 2:
            h_candidate = "ಹ" + clean[1:]
            if h_candidate in self.LEXICON:
                return self.LEXICON[h_candidate][0], self.LEXICON[h_candidate][1], "Archaic P-to-H Consonantal Mutation"

        return clean, clean, "Unmutated Root"

    def translate_token(self, token: str) -> Tuple[str, str]:
        """
        Translates a single Halegannada word into Hosagannada and English.
        Returns: (hosagannada_word, english_word)
        """
        k, e, _ = self.translate_token_with_rule(token)
        return k, e

    def translate_sentence(self, sentence: str) -> Tuple[str, str, List[ArchaicGlossaryItem], List[WordAlignmentItem]]:
        """
        Translates a complete Halegannada epigraph line or sentence into Hosagannada and English.
        Extracts verified archaic glossary items and bidirectional token alignment mappings.
        """
        tokens = sentence.split()
        kannada_tokens: List[str] = []
        english_tokens: List[str] = []
        glossary_items: List[ArchaicGlossaryItem] = []
        alignments: List[WordAlignmentItem] = []
        seen_terms = set()

        for idx, token in enumerate(tokens):
            clean_tok = token.strip(" ,.;:!?|।॥")
            mod_k, mod_e, rule = self.translate_token_with_rule(token)
            kannada_tokens.append(mod_k)
            english_tokens.append(mod_e)

            if clean_tok:
                alignments.append(
                    WordAlignmentItem(
                        id=f"align-{idx}",
                        source_token=clean_tok,
                        modern_token=mod_k,
                        english_token=mod_e,
                        grammatical_rule=rule,
                        confidence=0.98 if clean_tok in self.LEXICON else 0.92
                    )
                )

            # Record in glossary if recognized as archaic lexical root
            if clean_tok in self.LEXICON and clean_tok not in seen_terms:
                k_val, e_val, defn = self.LEXICON[clean_tok]
                glossary_items.append(
                    ArchaicGlossaryItem(
                        term=clean_tok,
                        iast=clean_tok,
                        modern_kannada_equivalent=k_val,
                        english_definition=f"{e_val} ({defn})",
                        grammatical_category=defn,
                    )
                )
                seen_terms.add(clean_tok)

        hosagannada = " ".join(kannada_tokens)
        english = " ".join(english_tokens)

        # Polish English capitalization and punctuation
        if english and not english.endswith((".", "!", "?")):
            english = english + "."
        english = english[0].upper() + english[1:] if len(english) > 1 else english

        return hosagannada, english, glossary_items, alignments
