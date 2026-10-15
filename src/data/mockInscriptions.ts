import { InscriptionRecord, ScriptClassMetadata, SourceLanguageMetadata } from '../types';

export const SCRIPT_CLASSES_METADATA: ScriptClassMetadata[] = [
  {
    id: 'ashoka',
    name: 'Ashokan Brahmi',
    kannadaName: 'ಅಶೋಕನ ಬ್ರಾಹ್ಮೀ',
    approximatePeriod: '3rd Century BCE (c. 273 – 232 BCE)',
    diagnosticFeatures: [
      'Strictly rectilinear and geometric strokes',
      'Total absence of top headmark (Talakattu)',
      'Basic geometric circle, cross, and vertical bar foundations',
      'Uniform stroke width without calligraphic modulation'
    ],
    characteristicSubstrate: ['granite', 'sandstone'],
    historicalDynasty: 'Mauryan Empire',
    significance: 'First attested written records in Karnataka, marking the foundational root of Indian epigraphy.'
  },
  {
    id: 'satavahana',
    name: 'Satavahana Brahmi',
    kannadaName: 'ಶಾತವಾಹನ ಬ್ರಾಹ್ಮೀ',
    approximatePeriod: '1st Century BCE – 3rd Century CE',
    diagnosticFeatures: [
      'Emergence of base curvatures on vertical stems',
      'Incipient triangular thickening or serif at stem tops',
      'Curved horizontal vowel diacritics (Matras)',
      'Modulated chisel pressure visible on limestone'
    ],
    characteristicSubstrate: ['limestone', 'granite'],
    historicalDynasty: 'Satavahana Dynasty / Chutus of Banavasi',
    significance: 'Bridge between North Indian Mauryan Brahmi and the regional Dravidian epigraphical traditions.'
  },
  {
    id: 'kadamba',
    name: 'Kadamba (Proto-Kannada)',
    kannadaName: 'ಕದಂಬ ಲಿಪಿ',
    approximatePeriod: '4th – 6th Century CE (c. 345 – 525 CE)',
    diagnosticFeatures: [
      'Diagnostic box-headed top bar (Petika-shirsha)',
      'Curving loops at base of consonants like ka, ra, and ma',
      'Early formal separation of Kannada-Telugu branch',
      'Emergence of archaic phonemes: Sakata Repha (ಱ) and Kula Repha (ೞ)'
    ],
    characteristicSubstrate: ['sandstone', 'copper_plate', 'chlorite_schist'],
    historicalDynasty: 'Kadambas of Banavasi',
    significance: 'Birth of formal Kannada epigraphy, marked by the iconic Halmidi inscription (c. 450 CE).'
  },
  {
    id: 'badami_chalukya',
    name: 'Badami Chalukya',
    kannadaName: 'ಬಾದಾಮಿ ಚಾಲುಕ್ಯ ಲಿಪಿ',
    approximatePeriod: '6th – 8th Century CE (c. 543 – 753 CE)',
    diagnosticFeatures: [
      'Morphing of box-head into a hooked horizontal bar',
      'Pronounced inner loops in ba, bha, ya, and ma',
      'Upward sweeping arched vowel canopies',
      'Bilateral symmetry with elegant vertical tails'
    ],
    characteristicSubstrate: ['sandstone', 'granite', 'copper_plate'],
    historicalDynasty: 'Early Western Chalukyas of Vatapi',
    significance: 'Golden age of monumental cliff epigraphs (Aihole, Badami, Mahakuta).'
  },
  {
    id: 'rashtrakuta',
    name: 'Rashtrakuta',
    kannadaName: 'ರಾಷ್ಟ್ರಕೂಟ ಲಿಪಿ',
    approximatePeriod: '8th – 10th Century CE (c. 753 – 982 CE)',
    diagnosticFeatures: [
      'Horizontally broadened and vertically compressed glyph proportion',
      'Stabilization of curved top hook into a mature proto-talakattu',
      'Clear vertical stacking of subjoined consonants (Vattakshara)',
      'Standardized copper-plate charter script form'
    ],
    characteristicSubstrate: ['granite', 'copper_plate'],
    historicalDynasty: 'Imperial Rashtrakutas of Manyakheta',
    significance: 'Era of Kavirajamarga (c. 850 CE); definitive flourishing of Classical Old Kannada (Halegannada).'
  },
  {
    id: 'kalyana_chalukya',
    name: 'Kalyana Chalukya',
    kannadaName: 'ಕಲ್ಯಾಣ ಚಾಲುಕ್ಯ ಲಿಪಿ',
    approximatePeriod: '10th – 12th Century CE (c. 973 – 1198 CE)',
    diagnosticFeatures: [
      'Exquisite circular calligraphic contours enabled by chloritic schist',
      'Flared terminal strokes and intricate circular vowel loops',
      'Arched notch headmarks',
      'Refined geometric balance across 50 characters'
    ],
    characteristicSubstrate: ['chlorite_schist', 'copper_plate'],
    historicalDynasty: 'Western Chalukyas of Kalyana',
    significance: 'Introduction of fine-grained soapstone carving created the most circular phase of Kannada script.'
  },
  {
    id: 'hoysala',
    name: 'Hoysala',
    kannadaName: 'ಹೊಯ್ಸಳ ಲಿಪಿ',
    approximatePeriod: '11th – 14th Century CE (c. 1026 – 1343 CE)',
    diagnosticFeatures: [
      'Maximum artistic floridity with double-loops and cursive finials',
      'Standardized check-mark / V-shaped downward Talakattu',
      'Multi-tier stacked consonant ligatures with decorative curls',
      'Dense inscriptional layout with micro-sculpted relief'
    ],
    characteristicSubstrate: ['chlorite_schist'],
    historicalDynasty: 'Hoysala Empire (Belur, Halebidu)',
    significance: 'Considered the peak artistic achievement of South Indian stone calligraphy.'
  },
  {
    id: 'vijayanagara',
    name: 'Vijayanagara',
    kannadaName: 'ವಿಜಯನಗರ ಲಿಪಿ',
    approximatePeriod: '14th – 16th Century CE (c. 1336 – 1646 CE)',
    diagnosticFeatures: [
      'Functional simplification adapted to hard granite substrates',
      'Definitive morphological divergence between Kannada and Telugu scripts',
      'Standardized uniform kerning with isolated glyph bodies',
      'Clear, bold stroke architecture with pronounced T-bar'
    ],
    characteristicSubstrate: ['granite', 'copper_plate'],
    historicalDynasty: 'Vijayanagara Empire (Hampi)',
    significance: 'Pre-modern administrative script spanning monumental temple steles across South India.'
  },
  {
    id: 'mysuru',
    name: 'Mysuru Wodeyar',
    kannadaName: 'ಮೈಸೂರು ಒಡೆಯರ್ ಲಿಪಿ',
    approximatePeriod: '16th – 19th Century CE',
    diagnosticFeatures: [
      'Fluid cursive arcs influenced by iron-stylus palm leaf writing',
      'Modern open-circle body shapes for ka, ra, la, da',
      'Systematic detached lower subscript conjuncts',
      'Direct prototype for 19th-century metal type typography'
    ],
    characteristicSubstrate: ['palm_leaf', 'paper', 'copper_plate'],
    historicalDynasty: 'Kingdom of Mysore (Wodeyars)',
    significance: 'Crucial transitional bridge from manuscript traditions to modern print culture.'
  },
  {
    id: 'present_kannada',
    name: 'Present Kannada',
    kannadaName: 'ಪ್ರಸ್ತುತ ಕನ್ನಡ ಲಿಪಿ',
    approximatePeriod: '19th Century – Present Day',
    diagnosticFeatures: [
      'Standardized 49-53 character Varnamale',
      'Consistent open check-mark Talakattu (✓)',
      'Standard typographic grid with normalized kerning and baselines',
      'Unicode standard encoding (U+0C80 to U+0CFF)'
    ],
    characteristicSubstrate: ['paper'],
    historicalDynasty: 'Modern Democratic Era / Karnataka',
    significance: 'Standardized modern literary and administrative script of Karnataka.'
  }
];

export const SOURCE_LANGUAGES_METADATA: SourceLanguageMetadata[] = [
  {
    id: 'prakrit',
    name: 'Prakrit (Southern Epigraphical)',
    kannadaName: 'ಪ್ರಾಕೃತ',
    centuryRange: '3rd Century BCE – 3rd Century CE',
    linguisticFeatures: 'Middle Indo-Aryan dialect used in Ashokan and Satavahana administrative records prior to the formal emergence of literary Kannada.'
  },
  {
    id: 'sanskrit',
    name: 'Epigraphical Sanskrit',
    kannadaName: 'ಸಂಸ್ಕೃತ',
    centuryRange: '4th Century CE – 18th Century CE',
    linguisticFeatures: 'Used extensively for royal genealogy (Prashasti), invocations to deities, and formal land-grant sanctions in Karnataka inscriptions.'
  },
  {
    id: 'purvada_halegannada',
    name: 'Purvada Halegannada (Early Proto-Old Kannada)',
    kannadaName: 'ಪೂರ್ವದ ಹಳೆಗನ್ನಡ',
    centuryRange: '4th – 8th Century CE',
    linguisticFeatures: 'Archaic Dravidian grammatical markers, prominent preservation of Sakata Repha (ಱ) and Kula Repha (ೞ), heavy consonant clusters, and early nominal case inflections.'
  },
  {
    id: 'halegannada',
    name: 'Classical Halegannada (Old Kannada)',
    kannadaName: 'ಹಳೆಗನ್ನಡ',
    centuryRange: '8th – 12th Century CE',
    linguisticFeatures: 'Classical literary Kannada defined by Kavirajamarga, Ranna, and Pampa. Strict adherence to Champu metre, grammatical Sandhi rules, and rich lexical vocabulary.'
  },
  {
    id: 'nadugannada',
    name: 'Nadugannada (Middle Kannada)',
    kannadaName: 'ನಡುಗನ್ನಡ',
    centuryRange: '12th – 18th Century CE',
    linguisticFeatures: 'Simplification of consonant clusters, weakening and eventual loss of the ೞ (zha) phoneme, introduction of Vachana and Shatpadi meters, and everyday colloquial morphology.'
  },
  {
    id: 'hosagannada',
    name: 'Hosagannada (Modern Kannada)',
    kannadaName: 'ಹೊಸಗನ್ನಡ',
    centuryRange: '19th Century – Present',
    linguisticFeatures: 'Standard modern syntax, phonetic spelling, loanword assimilation, and standardized contemporary case suffixes.'
  }
];

export const MOCK_INSCRIPTIONS: InscriptionRecord[] = [
  {
    id: 'ins-halmidi-001',
    accessionNumber: 'KHA-EP-0450-HLM',
    title: 'Halmidi Inscription (The Earliest Kannada Epigraph)',
    kannadaTitle: 'ಹಲ್ಮಿಡಿ ಶಾಸನ (ಕನ್ನಡದ ಮೊಟ್ಟಮೊದಲ ಶಿಲಾಶಾಸನ)',
    scriptClass: 'kadamba',
    sourceLanguage: 'purvada_halegannada',
    substrate: 'sandstone',
    dimensions: {
      heightCm: 122,
      widthCm: 30,
      depthCm: 18
    },
    imageUrl: 'https://images.unsplash.com/photo-1599732497206-8b9d031cce16?auto=format&fit=crop&q=80&w=1200',
    conditionRating: 'fair',
    reviewStatus: 'verified',
    lastUpdated: '14 Oct 2026',
    historicalContext: {
      dynasty: 'Kadambas of Banavasi',
      ruler: 'King Kakusthavarma',
      regnalPeriod: 'c. 435 – 455 CE',
      approximateDate: 'c. 450 CE',
      century: '5th Century CE',
      findSpot: {
        village: 'Halmidi',
        taluk: 'Belur',
        district: 'Hassan',
        state: 'Karnataka'
      },
      epigraphiaReference: 'Epigraphia Carnatica Vol. XV, BL 58',
      historicalSummary: 'Records the military valor of Vijaya Arasa, a feudatory chieftain of the Kadambas, who bravely fought against the Pallavas and the Sendrakas. In recognition of his bravery, the sovereign granted the tax-exempt status (Balgachu / hero endowment) of Palmadi and Mulivalli villages.',
      linguisticSignificance: 'Universally recognized as the oldest recorded stone inscription in the Kannada language. Features 16 lines demonstrating the transitional Purvada Halegannada syntax, combining Sanskrit invocations with native Dravidian verbal morphology and archaic letters like Sakata Repha (ಱ).'
    },
    transcription: {
      scriptClass: 'kadamba',
      scriptConfidence: 0.985,
      recognizedText: 'ನಮಃ ಶ್ರೀಮತ್ ಕದಂಬಪನ್ ಕಾಗುಸ್ಥಭಟ್ಟೋರನ್ ಆಳೆ ನರಿದಾವಿಱೆಯುಳ್ ನಾಡೊಳ್ ಮೃಗೇಶನಾಗೇಂದ್ರಾಭಿಲರ್ ಭಟಹರಪ್ಪೋರ್ ಶ್ರೀಮೃಗೇಶ ನಾಗಾಹ್ವಯರ್ ಇರ್ವ್ವರಾ ಬಟಹರೊಳ್ ಅಳಿದ ಪಶುಪತಿಯ ಪೆಗ್ಗಡೆಯ ಮಗನ್ ವಿಜಾಯರಸಂಗೆ ಬಾಗಳ್ಚು ಕೊಟ್ಟಾರ್...',
      iastTransliteration: 'namaḥ śrīmat kadambapan kāgustha-bhaṭṭōran āḷe naridāviṟeyuḷ nāḍoḷ mr̥gēśa-nāgēndrābhilar bhaṭaharappōr śrī-mr̥gēśa nāgāhvayar irvvarā baṭaharoḷ aḷida paśupatiya peggaḍeya magan vijāyarasange bāgaḷchu koṭṭār...',
      lines: [
        {
          lineNumber: 1,
          originalText: 'ನಮಃ ಶ್ರೀಮತ್ ಕದಂಬಪನ್ ಕಾಗುಸ್ಥಭಟ್ಟೋರನ್ ಆಳೆ',
          iastText: 'namaḥ śrīmat kadambapan kāgustha-bhaṭṭōran āḷe',
          modernKannadaLine: 'ನಮಸ್ಕಾರ, ಶ್ರೀಮಂತ ಕದಂಬ ವಂಶದ ಕಾಕುಸ್ಥಭಟ್ಟಾರಕನು ರಾಜ್ಯವಾಳುತ್ತಿದ್ದಾಗ,'
        },
        {
          lineNumber: 2,
          originalText: 'ನರಿದಾವಿಱೆಯುಳ್ ನಾಡೊಳ್ ಮೃಗೇಶನಾಗೇಂದ್ರಾಭಿಲರ್',
          iastText: 'naridāviṟeyuḷ nāḍoḷ mr̥gēśa-nāgēndrābhilar',
          modernKannadaLine: 'ನರಿದಾವಿಳೆ ನಾಡಿನಲ್ಲಿ ಮೃಗೇಶ ಮತ್ತು ನಾಗೇಂದ್ರ ಎಂಬ ಉಗ್ರ ಯೋಧರು,'
        },
        {
          lineNumber: 3,
          originalText: 'ವಿಜಾಯರಸಂಗೆ ಬಾಗಳ್ಚು ಕೊಟ್ಟಾರ್ ಪಾೞ್ಮಡಿಯುಂ ಮುಳಿವಳ್ಳಿಯುಂ',
          iastText: 'vijāyarasange bāgaḷchu koṭṭār pāḻmaḍiyuṁ muḷivaḷḷiyuṁ',
          modernKannadaLine: 'ವಿಜಯರಸನಿಗೆ ಬಾಳ್ಗಚ್ಚು (ವೀರ ಉಂಬಳಿ) ಆಗಿ ಪಾಲ್ಮಡಿ ಮತ್ತು ಮುಳಿವಳ್ಳಿ ಗ್ರಾಮಗಳನ್ನು ನೀಡಿದರು.'
        }
      ],
      detectedGlyphsCount: 46,
      isMockData: true
    },
    translation: {
      sourceLanguage: 'purvada_halegannada',
      languageConfidence: 0.978,
      modernKannada: 'ಶ್ರೀಮತ್ ಕದಂಬ ವಂಶದ ರಾಜ ಕಾಕುಸ್ಥಭಟ್ಟಾರಕನು ರಾಜ್ಯಭಾರ ಮಾಡುತ್ತಿದ್ದಾಗ, ನರಿದಾವಿಳೆ ನಾಡಿನ ಮೃಗೇಶ ಮತ್ತು ನಾಗೇಂದ್ರ ಎಂಬ ಸೇನಾಪತಿಗಳು ಪಲ್ಲವರ ಮೇಲೆ ಆಕ್ರಮಣ ಮಾಡಿದರು. ಆ ಘೋರ ಯುದ್ಧದಲ್ಲಿ ಹೋರಾಡಿ ವೀರಮರಣವನ್ನಪ್ಪಿದ ಪಶುಪತಿ ಹೆಗ್ಗಡೆಯ ಮಗನಾದ ವಿಜಯರಸನ ತ್ಯಾಗವನ್ನು ಸ್ಮರಿಸಿ, ಆತನಿಗೆ ವೀರಗೌರವವಾಗಿ ಪಾಲ್ಮಡಿ (ಹಲ್ಮಿಡಿ) ಮತ್ತು ಮುಳಿವಳ್ಳಿ ಗ್ರಾಮಗಳನ್ನು ತೆರಿಗೆ ಮುಕ್ತ ಬಾಳ್ಗಚ್ಚು (ವೀರ ಉಂಬಳಿ) ಭೂಮಿಯಾಗಿ ಶಾಶ್ವತವಾಗಿ ದಾನವಾಗಿ ನೀಡಲಾಯಿತು.',
      englishTranslation: 'Salutations. While the illustrious King Kakusthabhattara of the Kadamba dynasty was ruling, during the battle against the Sendrakas and Pallavas in Naridavile country, the commanders Mrigesha and Nagendra engaged the enemy forces. Commemorating Vijaya Arasa, the valiant son of Pashupati Heggade who laid down his life in that ferocious battle, the sovereign bestowed the villages of Palmadi (Halmidi) and Mulivalli as a tax-free heroic endowment (Balgachu).',
      glossary: [
        {
          term: 'ಬಾಗಳ್ಚು (ಬಾಳ್ಗಚ್ಚು)',
          iast: 'bāgaḷchu / bāḷgaccu',
          modernKannadaEquivalent: 'ವೀರ ಉಂಬಳಿ (ಯುದ್ಧದಲ್ಲಿ ಮಡಿದ ಯೋಧನ ಕುಟುಂಬಕ್ಕೆ ನೀಡುವ ತೆರಿಗೆ ಮುಕ್ತ ಭೂಮಿ)',
          englishDefinition: 'A tax-free land grant awarded to the family of a hero who fell in battle (lit. sword-washing honor).',
          grammaticalCategory: 'Old Kannada Compound Noun'
        },
        {
          term: 'ಅಳಿದ',
          iast: 'aḷida',
          modernKannadaEquivalent: 'ಮಡಿದ / ಮರಣಹೊಂದಿದ',
          englishDefinition: 'Perished or sacrificed one\'s life in service.',
          grammaticalCategory: 'Past Relative Participle'
        },
        {
          term: 'ಪೆಗ್ಗಡೆ',
          iast: 'peggaḍe',
          modernKannadaEquivalent: 'ಹೆಗ್ಗಡೆ / ಪ್ರಧಾನ ಅಧಿಕಾರಿ',
          englishDefinition: 'Senior administrative superintendent or prime chieftain (precursor to Heggade).',
          grammaticalCategory: 'Administrative Title'
        }
      ],
      stylisticNotes: 'Exhibits the classic 5th-century Sanskrit invocation followed immediately by Old Kannada prose syntax with early case markers (-oḷ, -aŋge).',
      isMockData: true
    },
    provenance: 'Discovered embedded in the village temple wall at Halmidi, Belur Taluk, Hassan District in 1936 by Dr. M. H. Krishna.',
    currentLocation: 'Directorate of Archaeology and Museums, Government Museum, Bengaluru'
  },
  {
    id: 'ins-maski-002',
    accessionNumber: 'KHA-EP-0250-MSK',
    title: 'Maski Minor Rock Edict of Ashoka',
    kannadaTitle: 'ಮಸ್ಕಿಯ ಅಶೋಕನ ಶಿಲಾಶಾಸನ',
    scriptClass: 'ashoka',
    sourceLanguage: 'prakrit',
    substrate: 'granite',
    dimensions: {
      heightCm: 180,
      widthCm: 95,
      depthCm: 45
    },
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200',
    conditionRating: 'weathered',
    reviewStatus: 'verified',
    lastUpdated: '08 Oct 2026',
    historicalContext: {
      dynasty: 'Mauryan Empire',
      ruler: 'Emperor Ashoka Maurya',
      regnalPeriod: 'c. 268 – 232 BCE',
      approximateDate: 'c. 250 BCE',
      century: '3rd Century BCE',
      findSpot: {
        village: 'Maski',
        taluk: 'Maski',
        district: 'Raichur',
        state: 'Karnataka'
      },
      epigraphiaReference: 'Corpus Inscriptionum Indicarum Vol. I',
      historicalSummary: 'One of the most consequential discoveries in world epigraphy. Until C. Beadon discovered this rock edict in 1915, all known Ashokan edicts referred to the monarch merely by his honorific title "Devanampriya Priyadarsi". Maski explicitly proclaimed "Devanampriyasa Asokasa", conclusively proving to global historians that the legendary Buddhist emperor was Ashoka Maurya.',
      linguisticSignificance: 'Written in early Southern Brahmi script and Prakrit language, representing the earliest deciphered writing system found on Karnataka soil.'
    },
    transcription: {
      scriptClass: 'ashoka',
      scriptConfidence: 0.982,
      recognizedText: 'ದೇವಾನಂಪಿಯಸ ಅಸೋಕಸ... ಅಧಿಕಾನಿ ಅಢಾತೀಯಾನಿ ವಸಾನಿ ಯಂ ಅಮ್ ಸುಮಿ ಬುಧಸಕೆ...',
      iastTransliteration: 'devānaṁpiyasa asōkasa... adhikāni aḍhātīyāni vasāni yaṁ am sumi budhasake...',
      lines: [
        {
          lineNumber: 1,
          originalText: 'ದೇವಾನಂಪಿಯಸ ಅಸೋಕಸ',
          iastText: 'devānaṁpiyasa asōkasa',
          modernKannadaLine: 'ದೇವತೆಗಳಿಗೆ ಪ್ರಿಯನಾದ ಅಶೋಕನ ಆಜ್ಞೆ'
        },
        {
          lineNumber: 2,
          originalText: 'ಅಧಿಕಾನಿ ಅಢಾತೀಯಾನಿ ವಸಾನಿ ಯಂ ಅಮ್ ಸುಮಿ ಬುಧಸಕೆ',
          iastText: 'adhikāni aḍhātīyāni vasāni yaṁ am sumi budhasake',
          modernKannadaLine: 'ನಾನು ಬುದ್ಧ ಶಾಕ್ಯನಾಗಿ (ಉಪಾಸಕನಾಗಿ) ಎರಡೂವರೆ ವರ್ಷಗಳಿಗೂ ಹೆಚ್ಚು ಕಾಲವಾಯಿತು.'
        }
      ],
      detectedGlyphsCount: 41,
      isMockData: true
    },
    translation: {
      sourceLanguage: 'prakrit',
      languageConfidence: 0.988,
      modernKannada: 'ದೇವತೆಗಳಿಗೆ ಪ್ರಿಯನಾದ ಅಶೋಕನ (ದೇವಾನಾಂಪ್ರಿಯ ಅಶೋಕ) ಸಂದೇಶ: ನಾನು ಬುದ್ಧನ ಧರ್ಮದ ಉಪಾಸಕನಾಗಿ (ಶ್ರಾವಕನಾಗಿ) ಎರಡೂವರೆ ವರ್ಷಗಳಿಗಿಂತಲೂ ಅಧಿಕ ಸಮಯ ಕಳೆಯಿತು. ಮೊದಲ ಒಂದು ವರ್ಷ ನಾನು ಹೆಚ್ಚು ಶ್ರದ್ಧೆ ತೋರಿಸಿರಲಿಲ್ಲ. ಆದರೆ ಸಂಘವನ್ನು ಭೇಟಿ ಮಾಡಿ ನಿಕಟ ಸಂಪರ್ಕ ಹೊಂದಿದ ನಂತರ ಅತ್ಯಂತ ದೃಢತೆಯಿಂದ ಧರ್ಮ ಪ್ರಚಾರ ಹಾಗೂ ಜನಕಲ್ಯಾಣ ಕಾರ್ಯಗಳಲ್ಲಿ ತೊಡಗಿಕೊಂಡಿದ್ದೇನೆ.',
      englishTranslation: 'A proclamation of Devanampriya Asoka: For more than two and a half years I have been an ardent lay follower of the Buddha. For more than a year I did not exert myself vigorously; but since I have visited the Sangha and drawn close to the community of monks, I have exerted myself with supreme devotion for the welfare of all beings.',
      glossary: [
        {
          term: 'ದೇವಾನಂಪಿಯಸ (ದೇವಾನಾಂಪ್ರಿಯಸ್ಯ)',
          iast: 'devānaṁpiyasa',
          modernKannadaEquivalent: 'ದೇವತೆಗಳಿಗೆ ಪ್ರಿಯನಾದವನು (ಅಶೋಕನ ಬಿರುದು)',
          englishDefinition: 'Beloved of the Gods (royal epithet of Emperor Ashoka).',
          grammaticalCategory: 'Prakrit Genitive Noun'
        },
        {
          term: 'ಬುಧಸಕೆ (ಬುದ್ಧಶಾಕ್ಯ)',
          iast: 'budhasake',
          modernKannadaEquivalent: 'ಬುದ್ಧನ ಅನುಯಾಯಿ / ಬೌದ್ಧ ಉಪಾಸಕ',
          englishDefinition: 'A follower of the Shakya sage (Buddha), a Buddhist lay disciple.',
          grammaticalCategory: 'Religious Title'
        }
      ],
      stylisticNotes: 'Pure Mauryan Prakrit written in Southern Brahmi; simple subject-object-verb arrangement with absence of retroflex conjuncts.',
      isMockData: true
    },
    provenance: 'Discovered in a natural rock cavern at Maski town in Raichur district by mining engineer C. Beadon in 1915.',
    currentLocation: 'In situ protected monument, Archaeological Survey of India (ASI), Maski, Raichur'
  },
  {
    id: 'ins-badami-003',
    accessionNumber: 'KHA-EP-0700-BDM',
    title: 'Kappe Arabhatta Inscription of Badami (Tripadi Metre)',
    kannadaTitle: 'ಕಪ್ಪೆ ಅರಭಟ್ಟನ ಬಾದಾಮಿ ಶಿಲಾಶಾಸನ (ತ್ರಿಪದಿ ಛಂದಸ್ಸು)',
    scriptClass: 'badami_chalukya',
    sourceLanguage: 'halegannada',
    substrate: 'sandstone',
    dimensions: {
      heightCm: 110,
      widthCm: 85,
      depthCm: 25
    },
    imageUrl: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&q=80&w=1200',
    conditionRating: 'excellent',
    reviewStatus: 'in_review',
    lastUpdated: '12 Oct 2026',
    historicalContext: {
      dynasty: 'Badami Chalukyas',
      ruler: 'Chalukya Chieftain Kappe Arabhatta',
      regnalPeriod: 'c. 700 CE',
      approximateDate: 'c. 700 CE',
      century: '7th–8th Century CE',
      findSpot: {
        village: 'Badami (Vatapi)',
        taluk: 'Badami',
        district: 'Bagalkote',
        state: 'Karnataka'
      },
      epigraphiaReference: 'Indian Antiquary Vol. X, p. 61',
      historicalSummary: 'Engraved on a sandstone cliff overlooking the serene Agastya lake in Badami. Eulogizes the chivalric character of the warrior Kappe Arabhatta, describing his fearless benevolence towards the gentle and fierce destruction towards adversaries.',
      linguisticSignificance: 'Celebrated in Kannada literary history as containing the earliest extant poetic verse composed in the native Kannada "Tripadi" (three-line) metre.'
    },
    transcription: {
      scriptClass: 'badami_chalukya',
      scriptConfidence: 0.984,
      recognizedText: 'ಸಾಧುಗೆ ಸಾಧು ಮಾಧುರ್ಯಂಗೆ ಮಾಧುರ್ಯಂ ಬಾದಿಪ್ಪ ಕಲಿಗೆ ಕಲಿಯುಗ ವಿಪರೀತನ್ ಮಾಧವನ್ ಇತ್ತನ್ ಪೆರನಲ್ಲನ್...',
      iastTransliteration: 'sādhuge sādhu mādhuryange mādhuryam bādippa kalige kaliyuga viparītan mādhavan ittan peranallan...',
      lines: [
        {
          lineNumber: 1,
          originalText: 'ಸಾಧುಗೆ ಸಾಧು ಮಾಧುರ್ಯಂಗೆ ಮಾಧುರ್ಯಂ',
          iastText: 'sādhuge sādhu mādhuryange mādhuryam',
          modernKannadaLine: 'ಒಳ್ಳೆಯವರಿಗೆ ಒಳ್ಳೆಯವನು, ಮೃದು ಸ್ವಭಾವದವರಿಗೆ ಪರಮ ಮಧುರನು,'
        },
        {
          lineNumber: 2,
          originalText: 'ಬಾದಿಪ್ಪ ಕಲಿಗೆ ಕಲಿಯುಗ ವಿಪರೀತನ್',
          iastText: 'bādippa kalige kaliyuga viparītan',
          modernKannadaLine: 'ಹಿಂಸಿಸುವ ಶತ್ರು ಯೋಧರಿಗೆ ಕಲಿಯುಗದ ಯಮನಂತೆ ವಿಪರೀತನಾದವನು,'
        },
        {
          lineNumber: 3,
          originalText: 'ಮಾಧವನ್ ಇತ್ತನ್ ಪೆರನಲ್ಲನ್',
          iastText: 'mādhavan ittan peranallan',
          modernKannadaLine: 'ಇವನು ಸಾಕ್ಷಾತ್ ಮಾಧವನೇ (ವಿಷ್ಣುವೇ) ಹೊರತು ಬೇರೆ ಯಾರೂ ಅಲ್ಲ.'
        }
      ],
      detectedGlyphsCount: 46,
      isMockData: true
    },
    translation: {
      sourceLanguage: 'halegannada',
      languageConfidence: 0.982,
      modernKannada: 'ಕಪ್ಪೆ ಅರಭಟ್ಟನು ಸಾಧು ಜನರಿಗೆ ಸಾಧುವಾಗಿಯೂ, ಪ್ರೀತಿಯಿಂದ ನಡೆದುಕೊಳ್ಳುವವರಿಗೆ ಅತಿ ಮಧುರವಾಗಿಯೂ ಇರುವವನು. ಆದರೆ ತನ್ನನ್ನು ಬಾಧಿಸುವ ದುಷ್ಟರಿಗೆ ಮತ್ತು ಯುದ್ಧ ಮಾಡುವ ಶತ್ರುಗಳಿಗೆ ಕಲಿಯುಗದ ವಿಪರೀತ ಯಮನಂತಿರುವವನು. ಈ ವೀರನು ಕರುಣೆಯಲ್ಲಿಯೂ ಶೌರ್ಯದಲ್ಲಿಯೂ ಸಾಕ್ಷಾತ್ ನಾರಾಯಣನಾದ ಮಾಧವನಂತಿರುವವನೇ ಹೊರತು ಸಾಮಾನ್ಯ ವ್ಯಕ್ತಿಯಲ್ಲ.',
      englishTranslation: 'To the virtuous and gentle, he is gentleness incarnate; to the sweet, he is sweetness itself. But to the hostile warrior who dares torment him, he is an unrelenting nemesis—a living catastrophe of the Kali age. He is truly Madhava (Lord Vishnu) himself walked among men, none other.',
      glossary: [
        {
          term: 'ಸಾಧುಗೆ',
          iast: 'sādhuge',
          modernKannadaEquivalent: 'ಸಜ್ಜನರಿಗೆ / ಒಳ್ಳೆಯವರಿಗೆ',
          englishDefinition: 'To the righteous, noble, or gentle person.',
          grammaticalCategory: 'Dative Case Noun'
        },
        {
          term: 'ಬಾದಿಪ್ಪ',
          iast: 'bādippa',
          modernKannadaEquivalent: 'ಹಿಂಸಿಸುವ / ಪೀಡಿಸುವ',
          englishDefinition: 'One who torments, troubles, or challenges.',
          grammaticalCategory: 'Present Participle'
        },
        {
          term: 'ಕಲಿ',
          iast: 'kali',
          modernKannadaEquivalent: 'ಶೂರ / ಯೋಧ',
          englishDefinition: 'A fearless champion or hero in combat.',
          grammaticalCategory: 'Old Kannada Noun'
        }
      ],
      stylisticNotes: 'Earliest archeological inscription written in lyrical Tripadi metre, proving advanced poetic development in 7th-century Karnataka.',
      isMockData: true
    },
    provenance: 'Carved on the northern cliff face behind the Bhutanatha Temple, overlooking the sacred Agastya Lake at Badami.',
    currentLocation: 'In situ cliff monument, Badami, Bagalkote District'
  },
  {
    id: 'ins-belur-004',
    accessionNumber: 'KHA-EP-1117-BLR',
    title: 'Belur Chennakeshava Temple Consecration Epigraph',
    kannadaTitle: 'ಬೇಲೂರು ಚೆನ್ನಕೇಶವ ದೇವಾಲಯ ಪ್ರತಿಷ್ಠಾಪನಾ ಶಾಸನ',
    scriptClass: 'hoysala',
    sourceLanguage: 'halegannada',
    substrate: 'chlorite_schist',
    dimensions: {
      heightCm: 210,
      widthCm: 110,
      depthCm: 32
    },
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=1200',
    conditionRating: 'excellent',
    reviewStatus: 'pending_verification',
    lastUpdated: '15 Oct 2026',
    historicalContext: {
      dynasty: 'Hoysala Empire',
      ruler: 'Mahamandaleshvara King Vishnuvardhana (Bittideva)',
      regnalPeriod: 'c. 1108 – 1152 CE',
      approximateDate: 'c. 1117 CE',
      century: '12th Century CE',
      findSpot: {
        village: 'Belur',
        taluk: 'Belur',
        district: 'Hassan',
        state: 'Karnataka'
      },
      epigraphiaReference: 'Epigraphia Carnatica Vol. V, Bl 58 & 71',
      historicalSummary: 'Commemorates King Vishnuvardhana\'s triumphant military conquest of Talakadu over the Imperial Cholas (earning the imperial title "Talakadugonda") and the glorious consecration of the Vijayanarayana (Chennakeshava) temple at Belur.',
      linguisticSignificance: 'Written in magnificent High Medieval Halegannada prose and verse carved onto soft chloritic schist, exhibiting the pinnacle of decorative Hoysala epigraphical art.'
    },
    transcription: {
      scriptClass: 'hoysala',
      scriptConfidence: 0.992,
      recognizedText: 'ಶ್ರೀಮನ್ ಮಹಾಮಂಡಲೇಶ್ವರನ್ ತಳಕಾಡುಗೊಂಡ ಭುಜಬಲ ವೀರ ಗಂಗ ವಿಷ್ಣುವರ್ಧನ ದೇವರ್ ವಿಜಯನಾರಾಯಣ ದೇವರಂ ಪ್ರತಿಷ್ಠೆ ಮಾಡಿ...',
      iastTransliteration: 'śrīman mahāmaṇḍalēśvaran taḷakāḍugoṇḍa bhujabala vīra gaṅga viṣṇuvardhana dēvar vijayanārāyaṇa dēvaraṁ pratiṣṭhe māḍi...',
      lines: [
        {
          lineNumber: 1,
          originalText: 'ಶ್ರೀಮನ್ ಮಹಾಮಂಡಲೇಶ್ವರನ್ ತಳಕಾಡುಗೊಂಡ',
          iastText: 'śrīman mahāmaṇḍalēśvaran taḷakāḍugoṇḍa',
          modernKannadaLine: 'ಶ್ರೀಮಂತ ಮಹಾಮಂಡಲೇಶ್ವರನೂ, ತಲಕಾಡನ್ನು ಜಯಿಸಿದವನೂ,'
        },
        {
          lineNumber: 2,
          originalText: 'ಭುಜಬಲ ವೀರ ಗಂಗ ವಿಷ್ಣುವರ್ಧನ ದೇವರ್',
          iastText: 'bhujabala vīra gaṅga viṣṇuvardhana dēvar',
          modernKannadaLine: 'ತನ್ನ ಬಾಹುಬಲದಿಂದ ವೀರಗಂಗನೆನಿಸಿದ ವಿಷ್ಣುವರ್ಧನ ದೇವನು'
        },
        {
          lineNumber: 3,
          originalText: 'ವಿಜಯನಾರಾಯಣ ದೇವರಂ ಪ್ರತಿಷ್ಠೆ ಮಾಡಿ',
          iastText: 'vijayanārāyaṇa dēvaraṁ pratiṣṭhe māḍi',
          modernKannadaLine: 'ವಿಜಯನಾರಾಯಣ (ಚೆನ್ನಕೇಶವ) ದೇವರನ್ನು ಭಕ್ತಿಯಿಂದ ಪ್ರತಿಷ್ಠಾಪಿಸಿ'
        }
      ],
      detectedGlyphsCount: 49,
      isMockData: true
    },
    translation: {
      sourceLanguage: 'halegannada',
      languageConfidence: 0.985,
      modernKannada: 'ಶ್ರೀಮಂತ ಮಹಾಮಂಡಲೇಶ್ವರನೂ, ಚೋಳರಿಂದ ತಲಕಾಡನ್ನು ವಿಜಯಶಾಲಿಯಾಗಿ ಗೆದ್ದು "ತಳಕಾಡುಗೊಂಡ" ಎಂಬ ಬಿರುದಾಂಕಿತನಾದವನೂ, ಅದ್ಭುತ ಬಾಹುಬಲದಿಂದ ಶೋಭಿಸುವ ವೀರಗಂಗ ವಿಷ್ಣುವರ್ಧನ ದೇವನು ತನ್ನ ಪ್ರಸಿದ್ಧ ವಿಜಯಗಳ ನೆನಪಿಗಾಗಿ ಶ್ರೀ ವಿಜಯನಾರಾಯಣ (ಚೆನ್ನಕೇಶವ) ದೇವರ ಭವ್ಯ ದೇಗುಲವನ್ನು ನಿರ್ಮಿಸಿ ಮೂರ್ತಿಯನ್ನು ಶಾಸ್ತ್ರೋಕ್ತವಾಗಿ ಪ್ರತಿಷ್ಠಾಪಿಸಿದನು. ಈ ಮಹಾಕಾರ್ಯಕ್ಕಾಗಿ ಹಲವು ಫಲವತ್ತಾದ ಅಗ್ರಹಾರಗಳನ್ನು ಹಾಗೂ ತೆರಿಗೆ ಆದಾಯಗಳನ್ನು ದೇವತಾ ಕೈಂಕರ್ಯಕ್ಕೆ ಶಾಶ್ವತವಾಗಿ ಸಮರ್ಪಿಸಿದನು.',
      englishTranslation: 'The illustrious Mahamandaleshvara, conqueror of Talakadu (Talakadugonda), possessed of valorous arm-strength, Veera Ganga Vishnuvardhana Deva, having vanquished the adversary forces and liberated the realm, consecrated the sanctum of Lord Vijayanarayana (Chennakeshava). For the perpetual conduct of temple rituals and educational endowments, the monarch granted vast tracts of fertile land in perpetuity.',
      glossary: [
        {
          term: 'ತಳಕಾಡುಗೊಂಡ',
          iast: 'taḷakāḍugoṇḍa',
          modernKannadaEquivalent: 'ತಲಕಾಡನ್ನು ಗೆದ್ದವನು (ವಿಷ್ಣುವರ್ಧನನ ಬಿರುದು)',
          englishDefinition: 'Conqueror of Talakadu (celebrating the historic expulsion of Chola forces from Gangavadi in 1116 CE).',
          grammaticalCategory: 'Historical Epithet'
        },
        {
          term: 'ಪ್ರತಿಷ್ಠೆ ಮಾಡಿ',
          iast: 'pratiṣṭhe māḍi',
          modernKannadaEquivalent: 'ಶಾಸ್ತ್ರೋಕ್ತವಾಗಿ ಸ್ಥಾಪಿಸಿ',
          englishDefinition: 'Consecrated ritualistically in accordance with Agama traditions.',
          grammaticalCategory: 'Verbal Phrase'
        }
      ],
      stylisticNotes: 'Carved on chloritic schist with florid spirals, decorative floral flourishes, and deep undercuts demonstrating the acme of Hoysala stone craft.',
      isMockData: true
    },
    provenance: 'Installed inside the inner courtyard corridor of the Chennakeshava Temple Complex at Belur, Hassan District.',
    currentLocation: 'In situ stele, Chennakeshava Temple, Belur'
  }
];

export const MOCK_RESEARCH_ACTIVITY: import('../types').ResearchActivityItem[] = [
  {
    id: 'act-01',
    timestamp: '2 hours ago',
    type: 'transcription_verified',
    title: 'Epigraphical Reading Confirmed',
    description: 'Line 3 of the Halmidi Stele was verified against high-resolution rubbing photographs.',
    scholar: 'Dr. M. R. Seshadri (Epigraphist)',
    inscriptionId: 'ins-halmidi-001',
    inscriptionTitle: 'Halmidi Inscription (c. 450 CE)'
  },
  {
    id: 'act-02',
    timestamp: 'Yesterday at 16:45',
    type: 'lexicon_added',
    title: 'Archaic Vocabulary Cross-Referenced',
    description: 'Added morphological note on "Bāgaḷchu" (hero endowment) to the Purvada Halegannada lexicon.',
    scholar: 'Prof. K. N. Gowda (Linguistics)',
    inscriptionId: 'ins-halmidi-001',
    inscriptionTitle: 'Halmidi Inscription (c. 450 CE)'
  },
  {
    id: 'act-03',
    timestamp: '12 Oct 2026',
    type: 'translation_updated',
    title: 'Tripadi Metrical Structure Analyzed',
    description: 'Updated modern Kannada translation of Badami cliff inscription to preserve 3-line lyrical cadence.',
    scholar: 'Epigraphical Review Board',
    inscriptionId: 'ins-badami-003',
    inscriptionTitle: 'Kappe Arabhatta Inscription of Badami'
  },
  {
    id: 'act-04',
    timestamp: '08 Oct 2026',
    type: 'rubbing_catalogued',
    title: 'New Archival Rubbing Ingested',
    description: 'Registered high-contrast paper squeeze of the Maski Minor Rock Edict from the ASI Mysore register.',
    scholar: 'Archival Cataloging Team',
    inscriptionId: 'ins-maski-002',
    inscriptionTitle: 'Maski Minor Rock Edict of Ashoka'
  }
];
