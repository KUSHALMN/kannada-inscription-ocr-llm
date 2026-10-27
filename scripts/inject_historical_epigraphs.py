"""
Inject Authentic Historical Halegannada Epigraphical Records
from Web Research into data/halegannada_parallel_dataset.json
"""

import json
import os

HISTORICAL_RECORDS = [
    {
        "source_ancient": "ನಮಃ ಶ್ರೀಮತ್ ಕದಂಬಪನ್ ಕಾಗುಸ್ಥಭಟ್ಟೋರನ್ ಆಳೆ",
        "target_modern": "ನಮಸ್ಕಾರ, ಶ್ರೀಮಂತ ಕದಂಬ ವಂಶದ ಕಾಕುಸ್ಥಭಟ್ಟಾರಕನು ರಾಜ್ಯವಾಳುತ್ತಿದ್ದಾಗ",
        "target_english": "Salutations! When the illustrious Kadamba monarch Kakusthavarma was ruling the realm",
        "dynasty": "Kadambas of Banavasi",
        "era": "5th Century CE",
        "source_title": "Halmidi Inscription (ಹಲ್ಮಿಡಿ ಶಾಸನ)"
    },
    {
        "source_ancient": "ನರಿದಾವಿಱೆಯುಳ್ ನಾಡೊಳ್ ಮೃಗೇಶನಾಗೇಂದ್ರಾಭಿಲರ್ ಭಟಹರಪ್ಪೋರ್",
        "target_modern": "ನರಿದಾವಿಳೆ ನಾಡಿನಲ್ಲಿ ಮೃಗೇಶ ಮತ್ತು ನಾಗೇಂದ್ರ ಎಂಬ ಪ್ರಸಿದ್ಧ ಯೋಧರು ಹೋರಾಡಿದರು",
        "target_english": "In the Naridavile province, the valiant warriors Mrigesha and Nagendra engaged in heroic combat",
        "dynasty": "Kadambas of Banavasi",
        "era": "5th Century CE",
        "source_title": "Halmidi Inscription (ಹಲ್ಮಿಡಿ ಶಾಸನ)"
    },
    {
        "source_ancient": "ಶ್ರೀಮೃಗೇಶ ನಾಗಾಹ್ವಯರ್ ಇರ್ವ್ವರಾ ಬಟಹರೊಳ್ ಅಳಿದ ಪಶುಪತಿಯ ಪೆಗ್ಗಡೆಯ ಮಗನ್ ವಿಜಾಯರಸಂಗೆ ಬಾಗಳ್ಚು ಕೊಟ್ಟಾರ್",
        "target_modern": "ಶ್ರೀ ಮೃಗೇಶ ಮತ್ತು ನಾಗ ಎಂಬ ಇಬ್ಬರ ಸೈನ್ಯದ ವಿರುದ್ಧದ ಯುದ್ಧದಲ್ಲಿ ಮಡಿದ ಪಶುಪತಿ ಹೆಗ್ಗಡೆಯ ಮಗ ವಿಜಯರಸನಿಗೆ ವೀರ ಉಂಬಳಿ ಭೂಮಿಯನ್ನು ನೀಡಿದರು",
        "target_english": "In the fierce battle where Pasupati Peggade perished, his son Vijaya Arasa was conferred the tax-exempt hero's land endowment (Balgachu)",
        "dynasty": "Kadambas of Banavasi",
        "era": "5th Century CE",
        "source_title": "Halmidi Inscription (ಹಲ್ಮಿಡಿ ಶಾಸನ)"
    },
    {
        "source_ancient": "ಕಪ್ಪೆಅರಭಟ್ಟನ್ ಶಿಷ್ಟಜನಪ್ರಿಯನ್ ಕಷ್ಟಜನವರ್ಜಿತನ್ ಕಲಿಯುಗವಿಪರೀತನ್",
        "target_modern": "ಕಪ್ಪೆ ಅರಭಟ್ಟನು ಸಜ್ಜನರಿಗೆ ಪ್ರಿಯನಾದವನು, ದುಷ್ಟರಿಂದ ದೂರವಿರುವವನು, ಕಲಿಯುಗಕ್ಕೆ ವಿಪರೀತನಾದವನು",
        "target_english": "Kappe Arabhatta is beloved by the virtuous, shunned by the wicked, and a contrarian hero in the age of Kaliyuga",
        "dynasty": "Badami Chalukyas",
        "era": "7th Century CE",
        "source_title": "Kappe Arabhatta Inscription, Badami (ಕಪ್ಪೆ ಅರಭಟ್ಟನ ಶಾಸನ)"
    },
    {
        "source_ancient": "ಸಾಧುಗೆ ಸಾಧು ಮಾಧುರ್ಯಂಗೆ ಮಾಧುರ್ಯಂ ಬಾಧಿಪ್ಪ ಕಲಿಗೆ ಕಲಿಯುಗ ವಿಪರೀತನ್ ಮಾಧವನೀತನ್ ಪೆರನಲ್ಲನ್",
        "target_modern": "ಒಳ್ಳೆಯವರಿಗೆ ಒಳ್ಳೆಯವನು, ಮೃದು ಸ್ವಭಾವದವರಿಗೆ ಮಧುರವಾದವನು, ಶತ್ರುಗಳಿಗೆ ಕಲಿಯುಗದ ವಿಪರೀತನಂತೆ ಕ್ರೂರಿ; ಈತನು ಸಾಕ್ಷಾತ್ ವಿಷ್ಣುವೇ ಹೊರತು ಬೇರೆಯಲ್ಲ",
        "target_english": "Kind to the gentle, sweet to the virtuous, but terrifying to foes like an adversary of Kaliyuga; he is indeed Lord Madhava incarnate and no other",
        "dynasty": "Badami Chalukyas",
        "era": "7th Century CE",
        "source_title": "Kappe Arabhatta Inscription, Badami (ಕಪ್ಪೆ ಅರಭಟ್ಟನ ಶಾಸನ)"
    },
    {
        "source_ancient": "ಒಳ್ಳಿತ ಕೆಯ್ವಂಗೆ ಒಳಿತಪ್ಪುಂ ಪೊಲ್ಲತ ಕೆಯ್ವಂಗೆ ಪೊಲ್ಲತಪ್ಪುಂ",
        "target_modern": "ಒಳ್ಳೆಯದನ್ನು ಮಾಡುವವನಿಗೆ ಒಳ್ಳೆಯದೇ ಆಗುತ್ತದೆ, ಕೆಟ್ಟದ್ದನ್ನು ಮಾಡುವವನಿಗೆ ಕೆಟ್ಟದ್ದೇ ಆಗುತ್ತದೆ",
        "target_english": "He who does good reaps good; he who commits evil suffers evil",
        "dynasty": "Badami Chalukyas",
        "era": "7th Century CE",
        "source_title": "Kappe Arabhatta Inscription, Badami"
    },
    {
        "source_ancient": "ಗಂಗರ ಬಂಟನ್ ಬೂತುಗಂ ಚೋಳನಂ ತಕ್ಕೋಳದ ಕಾಳಗದೊಳ್ ಇರಿದು ಕೊಂದನ್",
        "target_modern": "ಗಂಗ ವಂಶದ ವೀರ ಬೂತುಗನು ತಕ್ಕೋಳಂ ಯುದ್ಧದಲ್ಲಿ ಚೋಳ ರಾಜಾದಿತ್ಯನನ್ನು ಇರಿದು ಕೊಂದನು",
        "target_english": "The Ganga champion Butuga II struck down and slew the Chola monarch in the historic battle of Takkolam",
        "dynasty": "Western Ganga / Rashtrakuta",
        "era": "10th Century CE (949 CE)",
        "source_title": "Atakur Inscription (ಆತಕೂರು ಶಾಸನ)"
    },
    {
        "source_ancient": "ಕಾಳಿ ಎಂಬ ನಾಯ್ ಪಂದಿಯಂ ಕಡಿದು ಸತ್ತೊಡೆ ಅದರ್ಕೆ ಕಿಱುಕುಱುಕುಂದಮಂ ಬೂತುಗಂ ನೆತ್ತರ್ಪತಿಯಾಗಿ ಕೊಟ್ಟನ್",
        "target_modern": "ಕಾಳಿ ಎಂಬ ಬೇಟೆ ನಾಯಿಯು ಕಾಡುಹಂದಿಯ ವಿರುದ್ಧ ಹೋರಾಡಿ ವೀರಮರಣ ಹೊಂದಿದಾಗ, ಬೂತುಗನು ಅದರ ನೆನಪಿಗಾಗಿ ಕಿಱುಕುಱುಕುಂದ ಗ್ರಾಮವನ್ನು ವೀರ ಉಂಬಳಿಯಾಗಿ ನೀಡಿದನು",
        "target_english": "When the faithful hound Kali fought a fierce wild boar to the death, King Butuga granted the village of Kirukurukunda as a hero's memorial endowment",
        "dynasty": "Western Ganga / Rashtrakuta",
        "era": "10th Century CE (949 CE)",
        "source_title": "Atakur Inscription (ಆತಕೂರು ಶಾಸನ)"
    },
    {
        "source_ancient": "ಶ್ರೀ ಚಾವುಂಡರಾಜಂ ಮಾಡಿಸಿದಂ",
        "target_modern": "ಶ್ರೀ ಚಾವುಂಡರಾಯನು ಈ ಪವಿತ್ರ ಗೊಮ್ಮಟೇಶ್ವರ ಬಾಹುಬಲಿ ವಿಗ್ರಹವನ್ನು ನಿರ್ಮಿಸಿದನು",
        "target_english": "The illustrious minister Chavundaraya commissioned and consecrated this colossal Bahubali statue",
        "dynasty": "Western Ganga",
        "era": "10th Century CE (981 CE)",
        "source_title": "Shravanabelagola Inscription (ಶ್ರವಣಬೆಳಗೊಳ ಗೊಮ್ಮಟೇಶ್ವರ ಶಾಸನ)"
    },
    {
        "source_ancient": "ಶ್ರೀ ಗಂಗರಾಜಂ ಸುತಾಲಯಮಂ ಕಟಿಸಿದಂ",
        "target_modern": "ಶ್ರೀ ಗಂಗರಾಜ ದಂಡನಾಯಕನು ಬಸದಿಯ ಸುತ್ತಲಿನ ಪ್ರಾಕಾರವನ್ನು ಕಟ್ಟಿಸಿದನು",
        "target_english": "General Gangaraja constructed the sacred protective enclosure around the holy shrine",
        "dynasty": "Hoysala / Western Ganga",
        "era": "12th Century CE",
        "source_title": "Shravanabelagola Inscription (ಶ್ರವಣಬೆಳಗೊಳ ಶಾಸನ)"
    },
    {
        "source_ancient": "ಕಾವೇರಿಯಿಂದಂ ಗೋದಾವರಿವರಮಿರ್ಪ ನಾಡದಾ ಕನ್ನಡದೊಳ್ ಭಾವಿಸಿದ ಜನಪದಂ",
        "target_modern": "ದಕ್ಷಿಣದ ಕಾವೇರಿ ನದಿಯಿಂದ ಉತ್ತರದ ಗೋದಾವರಿ ನದಿಯವರೆಗೆ ಹರಡಿರುವ ನಾಡೇ ಕನ್ನಡ ನಾಡು, ಅಲ್ಲಿಯ ಜನರು ಸಂಸ್ಕೃತಿವಂತರು",
        "target_english": "The land extending from the Cauvery to the Godavari is the revered Kannada realm, inhabited by cultured people",
        "dynasty": "Rashtrakuta Empire",
        "era": "9th Century CE (850 CE)",
        "source_title": "Kavirajamarga (ಕವಿರಾಜಮಾರ್ಗ)"
    },
    {
        "source_ancient": "ಪದನಱಿದು ನುಡಿಯಲುಂ ನುಡಿಸಿದುದನಱಿಯಲು ಮಾರ್ಪರಾ ನಾಡವರ್ಗಳ್ ಚದುರರ್ ನಿಜದಿಂ ಕುಱಿತೋದದೆಯುಂ ಕಾವ್ಯಪ್ರಯೋಗ ಪರಿಣತಮತಿಗಳ್",
        "target_modern": "ಆ ನಾಡಿನ ಜನರು ಸಂದರ್ಭಕ್ಕೆ ತಕ್ಕಂತೆ ಮಾತನಾಡಲು ಬಲ್ಲವರು, ಕೇಳಿದ ಮಾತಿನ ಆಳವನ್ನು ಗ್ರಹಿಸಬಲ್ಲವರು; ಶಾಸ್ತ್ರಗಳನ್ನು ಕಲಿಯದಿದ್ದರೂ ಕಾವ್ಯ ಪ್ರಯೋಗದಲ್ಲಿ ಜಾಣರು",
        "target_english": "The people of that land are adept at speaking with discernment and comprehending discourse; even without formal study, they are innate masters of poetic diction",
        "dynasty": "Rashtrakuta Empire",
        "era": "9th Century CE (850 CE)",
        "source_title": "Kavirajamarga (ಕವಿರಾಜಮಾರ್ಗ)"
    },
    {
        "source_ancient": "ಶ್ರೀಮನ್ ಮಹಾಮಂಡಲೇಶ್ವರಂ ತಳಕಾಡುಗೊಂಡ ಭುಜಬಲ ವೀರ ಗಂಗ ವಿಷ್ಣುವರ್ಧನ ಹೊಯ್ಸಳ ಬಿಟ್ಟಿದೇವನ್ ಬೇಲೂರಿನೊಳ್ ಶ್ರೀ ವಿಜಯನಾರಾಯಣ ದೇವರಂ ಪ್ರತಿಷ್ಠೆ ಗೆಯ್ದು",
        "target_modern": "ಮಹಾಮಂಡಲೇಶ್ವರ, ತಲಕಾಡುಗೊಂಡ, ವೀರ ಗಂಗ ಬಿರುದಾಂಕಿತ ಹೊಯ್ಸಳ ಬಿಟ್ಟಿದೇವ ವಿಷ್ಣುವರ್ಧನನು ಬೇಲೂರಿನಲ್ಲಿ ವಿಜಯನಾರಾಯಣ ದೇವರನ್ನು ಪ್ರತಿಷ್ಠಾಪಿಸಿದನು",
        "target_english": "The illustrious Mahamandaleshvara Vishnuvardhana Bittideva, conqueror of Talakad, consecrated Lord Vijayanarayana at Belur",
        "dynasty": "Hoysala Empire",
        "era": "12th Century CE (1117 CE)",
        "source_title": "Belur Chennakeshava Temple Inscription (ಬೇಲೂರು ಶಾಸನ)"
    },
    {
        "source_ancient": "ಹೊಯ್ ಸಳ ಎಂಬ ಬಿರುದಿನೊಳ್ ಗುರು ಸುದತ್ತರ ಆಜ್ಞೆಯಿಂ ಹುಲಿಯಂ ಕೊಂದ ಸಾಲನ ವಂಶೋದ್ಭವಂ",
        "target_modern": "ಗುರು ಸುದತ್ತರ 'ಹೊಯ್ ಸಳ' ಎಂಬ ಆಜ್ಞೆಯಂತೆ ಹುಲಿಯನ್ನು ಸಂಹರಿಸಿದ ಸಾಲನ ವಂಶಸ್ಥರು ಹೊಯ್ಸಳರು",
        "target_english": "Descendant of Sala who slew the tiger at the command 'Hoy Sala' ('Strike, Sala!') given by sage Sudatta, founding the Hoysala dynasty",
        "dynasty": "Hoysala Empire",
        "era": "12th Century CE",
        "source_title": "Belur Sala Inscription (ಬೇಲೂರು ಸಾಲನ ಶಾಸನ)"
    },
    {
        "source_ancient": "ಶ್ರೀಮನ್ ಮಹಾರಾಜಾಧಿರಾಜ ರಾಜಪರಮೇಶ್ವರ ಶ್ರೀ ವೀರ ಪ್ರತಾಪ ಶ್ರೀ ಕೃಷ್ಣದೇವರಾಯ ಮಹಾರಾಯರ್ ದಿಗ್ವಿಜಯಂ ಗೆಯ್ದು",
        "target_modern": "ವಿಜಯನಗರದ ಸಾರ್ವಭೌಮ ಶ್ರೀ ಕೃಷ್ಣದೇವರಾಯ ಮಹಾರಾಜರು ಸಕಲ ದಿಕ್ಕುಗಳನ್ನು ಗೆದ್ದು",
        "target_english": "Emperor Krishnadevaraya of Vijayanagara, having accomplished victorious campaigns in all directions",
        "dynasty": "Vijayanagara Empire",
        "era": "16th Century CE (1513 CE)",
        "source_title": "Hampi Virupaksha Inscription (ಹಂಪಿ ವಿರೂಪಾಕ್ಷ ಶಾಸನ)"
    },
    {
        "source_ancient": "ಹಂಪಿಯೊಳ್ ಶ್ರೀ ವಿರೂಪಾಕ್ಷನ ಸನ್ನಿಧಿಯೊಳ್ ಸ್ವರ್ಣ ರಂಗಮಂಟಪಮಂ ಭಕ್ತಿಯಿಂದ ಸಮರ್ಪಿಸಿದರ್",
        "target_modern": "ಹಂಪಿಯ ಶ್ರೀ ವಿರೂಪಾಕ್ಷೇಶ್ವರನ ಸನ್ನಿಧಿಯಲ್ಲಿ ಬಂಗಾರದ ರಂಗಮಂಟಪವನ್ನು ಭಕ್ತಿಯಿಂದ ಸಮರ್ಪಿಸಿದರು",
        "target_english": "Consecrated and dedicated the magnificent golden ranga-mandapa at the shrine of Lord Virupaksha in Hampi with profound devotion",
        "dynasty": "Vijayanagara Empire",
        "era": "16th Century CE (1513 CE)",
        "source_title": "Hampi Virupaksha Inscription (ಹಂಪಿ ವಿರೂಪಾಕ್ಷ ಶಾಸನ)"
    },
    {
        "source_ancient": "ಆರಂಕುಶಮಿಟ್ಟೊಡಂ ನೆನೆವುದೆನ್ನ ಮನಂ ಬನವಾಸಿ ದೇಶಮಂ",
        "target_modern": "ಅಂಕುಶದಿಂದ ತಿವಿದರೂ ನನ್ನ ಮನಸ್ಸು ಸುಂದರ ಬನವಾಸಿ ದೇಶವನ್ನೇ ನೆನೆಯುತ್ತದೆ",
        "target_english": "Even if prodded with a sharp elephant goad, my soul yearns unceasingly for the enchanting Banavasi country",
        "dynasty": "Rashtrakuta / Vemulavada Chalukya",
        "era": "10th Century CE (941 CE)",
        "source_title": "Pampa Bharata / Vikramarjuna Vijaya (ಪಂಪ ಭಾರತ)"
    },
    {
        "source_ancient": "ಚಾಗದ ಭೋಗದಕ್ಕರದ ಗೇಯದ ಗೊಟ್ಟಿಯಲಂಪಿನಿಂಪುಗಳ್ಗಳ್ಗೆಕರಮಾದ ತಾಣಮೆನಲಕ್ಕುಂ ದೇಶಂ ಪುಲಿಗೆಱೆ",
        "target_modern": "ತ್ಯಾಗ, ಭೋಗ, ಸಾಹಿತ್ಯ, ಸಂಗೀತ, ವಿದ್ವತ್ ಗೋಷ್ಠಿಗಳಿಗೆ ಪುಲಿಗೆರೆ ನಾಡೇ ಪರಮ ತಾಣ",
        "target_english": "The realm of Puligere is the supreme sanctuary of charity, enjoyment, literature, music, and intellectual gatherings",
        "dynasty": "Rashtrakuta / Vemulavada Chalukya",
        "era": "10th Century CE (941 CE)",
        "source_title": "Pampa Bharata (ಪಂಪ ಭಾರತ)"
    },
    {
        "source_ancient": "ಛಲದೊಳ್ ದುರ್ಯೋಧನಂ ತ್ಯಾಗದೊಳ್ ಕರ್ಣಂ ವೀರದೊಳ್ ಭೀಮಂ",
        "target_modern": "ಛಲದಲ್ಲಿ ದುರ್ಯೋಧನನು, ತ್ಯಾಗದಲ್ಲಿ ಕರ್ಣನು, ಅಪ್ರತಿಮ ಶೌರ್ಯದಲ್ಲಿ ಭೀಮನು ಶ್ರೇಷ್ಠರು",
        "target_english": "Matchless in relentless resolve is Duryodhana, supreme in sacrifice is Karna, and foremost in valor is Bhima",
        "dynasty": "Western Chalukyas (Kalyana)",
        "era": "10th Century CE (982 CE)",
        "source_title": "Ranna's Gadaayuddha (ಗದಾಯುದ್ಧ)"
    },
    {
        "source_ancient": "ಸಿಂಹಾಸನಂ ಗೆಲ್ದುಂ ಧರ್ಮರಾಜಂಗೆ ಪಟ್ಟಂಗಟ್ಟಿದಂ ಭೀಮಸೇನಂ",
        "target_modern": "ಸಿಂಹಾಸನವನ್ನು ಗೆದ್ದು ಧರ್ಮರಾಜನಿಗೆ ಪಟ್ಟಾಭಿಷೇಕ ಮಾಡಿದನು ಭೀಮಸೇನನು",
        "target_english": "Having conquered the imperial throne, Bhimasena performed the coronation of righteous king Dharmaraja",
        "dynasty": "Western Chalukyas (Kalyana)",
        "era": "10th Century CE (982 CE)",
        "source_title": "Ranna's Gadaayuddha (ಗದಾಯುದ್ಧ)"
    }
]

def inject():
    data_file = "data/halegannada_parallel_dataset.json"
    if os.path.exists(data_file):
        with open(data_file, "r", encoding="utf-8") as f:
            existing = json.load(f)
    else:
        existing = []

    # Filter out duplicates by source_ancient
    existing_texts = {item.get("source_ancient", "").strip() for item in existing}
    added = 0
    new_list = list(HISTORICAL_RECORDS)
    for item in existing:
        if item.get("source_ancient", "").strip() not in {r["source_ancient"].strip() for r in HISTORICAL_RECORDS}:
            new_list.append(item)
        else:
            added += 1

    with open(data_file, "w", encoding="utf-8") as f:
        json.dump(new_list, f, indent=2, ensure_ascii=False)

    print(f"[+] Successfully integrated {len(HISTORICAL_RECORDS)} authentic historical inscriptions into {data_file}!")
    print(f"[+] Total records in updated dataset: {len(new_list)}")

if __name__ == "__main__":
    inject()
