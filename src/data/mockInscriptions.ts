import { InscriptionRecord, ScriptClassMetadata, SourceLanguageMetadata, HistoricalRuleItem } from '../types';

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
    significance: 'First attested written records in Karnataka, marking the foundational root of Indian epigraphy.',
    relationships: {
      ancestorScripts: ['Early Indigenous Indian Brahmi tradition'],
      descendantScripts: ['Satavahana Brahmi', 'Bhattiprolu Script', 'Northern Brahmi (Gupta)'],
      parallelScripts: ['Ashokan Kharosthi (Northwest)', 'Tamil-Brahmi (Southern Dravidian)'],
      branchName: 'Pan-Indian Mauryan Imperial Epigraphy'
    },
    sampleGlyphs: [
      {
        id: 'ash-01',
        label: 'Foundation Vowel',
        kannadaChar: 'ಅ',
        iast: 'a',
        imagePath: '/glyphs/ashoka/1.png',
        morphologicalNote: 'Rectilinear glyph formed by a vertical spine and two leftward angled arms.'
      },
      {
        id: 'ash-02',
        label: 'Unaspirated Velar Plosive',
        kannadaChar: 'ಕ',
        iast: 'ka',
        imagePath: '/glyphs/ashoka/2.png',
        morphologicalNote: 'Symmetrical orthogonal cross (+) chiseled deeply into coarse granite.'
      },
      {
        id: 'ash-03',
        label: 'Voiced Velar Plosive',
        kannadaChar: 'ಗ',
        iast: 'ga',
        imagePath: '/glyphs/ashoka/3.png',
        morphologicalNote: 'Inverted chevron (^) representing voiced stop without horizontal base closure.'
      }
    ]
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
    significance: 'Bridge between North Indian Mauryan Brahmi and regional Dravidian epigraphical traditions.',
    relationships: {
      ancestorScripts: ['Ashokan Brahmi'],
      descendantScripts: ['Kadamba (Proto-Kannada)', 'Ikshvaku Script', 'Salankayana Script'],
      parallelScripts: ['Kushana Brahmi (North)', 'Early Pallava Grantha (Southeast)'],
      branchName: 'Deccan Regional Brahmi'
    },
    sampleGlyphs: [
      {
        id: 'sat-01',
        label: 'Initial Vowel',
        kannadaChar: 'ಅ',
        iast: 'a',
        imagePath: '/glyphs/satavahana/1.png',
        morphologicalNote: 'Beginnings of curvature on lower left hook with upper serif thickening.'
      },
      {
        id: 'sat-02',
        label: 'Velar Consonant',
        kannadaChar: 'ಕ',
        iast: 'ka',
        imagePath: '/glyphs/satavahana/2.png',
        morphologicalNote: 'Crossbar exhibits slight curve with terminal chisel indentation.'
      },
      {
        id: 'sat-03',
        label: 'Voiced Velar',
        kannadaChar: 'ಗ',
        iast: 'ga',
        imagePath: '/glyphs/satavahana/3.png',
        morphologicalNote: 'Rounded arch replacing the sharp angle of Mauryan Brahmi.'
      }
    ]
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
    significance: 'Birth of formal Kannada epigraphy, marked by the iconic Halmidi inscription (c. 450 CE).',
    relationships: {
      ancestorScripts: ['Satavahana Brahmi'],
      descendantScripts: ['Badami Chalukya Script', 'Eastern Chalukya (Vengi) Script'],
      parallelScripts: ['Pallava Grantha', 'Vakataka Box-Headed Script'],
      branchName: 'Proto-Kannada-Telugu Lineage'
    },
    sampleGlyphs: [
      {
        id: 'kad-01',
        label: 'Box-Headed Vowel',
        kannadaChar: 'ಅ',
        iast: 'a',
        imagePath: '/glyphs/kadamba/1.png',
        morphologicalNote: 'Distinct square hollow box (Petika-shirsha) crowning the central stem.'
      },
      {
        id: 'kad-02',
        label: 'Proto-Kannada Consonant',
        kannadaChar: 'ಕ',
        iast: 'ka',
        imagePath: '/glyphs/kadamba/2.png',
        morphologicalNote: 'Looping base curve with square box-head incision at top.'
      },
      {
        id: 'kad-03',
        label: 'Curved Base Plosive',
        kannadaChar: 'ಗ',
        iast: 'ga',
        imagePath: '/glyphs/kadamba/3.png',
        morphologicalNote: 'U-shaped rounded horseshoe arch with square terminal caps.'
      }
    ]
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
    significance: 'Golden age of monumental cliff epigraphs (Aihole, Badami, Mahakuta).',
    relationships: {
      ancestorScripts: ['Kadamba (Proto-Kannada)'],
      descendantScripts: ['Rashtrakuta Script', 'Old Telugu Script'],
      parallelScripts: ['Nalanda / Harsha Brahmi (North)', 'Early Chola Grantha (South)'],
      branchName: 'Early Western Chalukya Epigraphical Standard'
    },
    sampleGlyphs: [
      {
        id: 'bad-01',
        label: 'Early Old Kannada Vowel',
        kannadaChar: 'ಅ',
        iast: 'a',
        imagePath: '/glyphs/badami_chalukya/1.png',
        morphologicalNote: 'Hooked horizontal bar replacing the box-head with sweeping side arcs.'
      },
      {
        id: 'bad-02',
        label: 'Looped Consonant',
        kannadaChar: 'ಕ',
        iast: 'ka',
        imagePath: '/glyphs/badami_chalukya/2.png',
        morphologicalNote: 'Full loop formation at the bottom with open hooked crown.'
      },
      {
        id: 'bad-03',
        label: 'Curved Velar',
        kannadaChar: 'ಗ',
        iast: 'ga',
        imagePath: '/glyphs/badami_chalukya/3.png',
        morphologicalNote: 'Balanced bilateral arch with subtle terminal flourish.'
      }
    ]
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
    significance: 'Era of Kavirajamarga (c. 850 CE); definitive flourishing of Classical Old Kannada (Halegannada).',
    relationships: {
      ancestorScripts: ['Badami Chalukya'],
      descendantScripts: ['Kalyana Chalukya Script', 'Ganga Script (Southern Karnataka)'],
      parallelScripts: ['Gurjara-Pratihara Kutila (North)', 'Imperial Chola Tamil (South)'],
      branchName: 'Imperial Manyakheta Classical Horizon'
    },
    sampleGlyphs: [
      {
        id: 'ras-01',
        label: 'Classical Old Kannada Vowel',
        kannadaChar: 'ಅ',
        iast: 'a',
        imagePath: '/glyphs/rashtrakuta/1.png',
        morphologicalNote: 'Horizontally compressed proportions with pronounced proto-talakattu.'
      },
      {
        id: 'ras-02',
        label: 'Broadened Consonant',
        kannadaChar: 'ಕ',
        iast: 'ka',
        imagePath: '/glyphs/rashtrakuta/2.png',
        morphologicalNote: 'Flared side arms and structured lower loop.'
      },
      {
        id: 'ras-03',
        label: 'Standardized Arch',
        kannadaChar: 'ಗ',
        iast: 'ga',
        imagePath: '/glyphs/rashtrakuta/3.png',
        morphologicalNote: 'Arched glyph with stabilized top incision and flat base balance.'
      }
    ]
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
    significance: 'Introduction of fine-grained soapstone carving created the most circular phase of Kannada script.',
    relationships: {
      ancestorScripts: ['Rashtrakuta'],
      descendantScripts: ['Hoysala Script', 'Seuna / Yadava Script'],
      parallelScripts: ['Nagari (Sanskrit texts)', 'Chalukya-Chola Grantha'],
      branchName: 'Middle Classical Western Chalukya'
    },
    sampleGlyphs: [
      {
        id: 'kal-01',
        label: 'Soapstone Circular Vowel',
        kannadaChar: 'ಅ',
        iast: 'a',
        imagePath: '/glyphs/kalyana_chalukya/1.png',
        morphologicalNote: 'High circularity with delicate curved vowel loops chiseled in schist.'
      },
      {
        id: 'kal-02',
        label: 'Swirling Consonant',
        kannadaChar: 'ಕ',
        iast: 'ka',
        imagePath: '/glyphs/kalyana_chalukya/2.png',
        morphologicalNote: 'Spiral inner contours and distinct notched headmark.'
      },
      {
        id: 'kal-03',
        label: 'Curved Plosive',
        kannadaChar: 'ಗ',
        iast: 'ga',
        imagePath: '/glyphs/kalyana_chalukya/3.png',
        morphologicalNote: 'Circular arc with refined terminal serif.'
      }
    ]
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
    significance: 'Considered the peak artistic achievement of South Indian stone calligraphy.',
    relationships: {
      ancestorScripts: ['Kalyana Chalukya'],
      descendantScripts: ['Vijayanagara Script'],
      parallelScripts: ['Kakatiya Telugu', 'Later Pandya Tamil-Grantha'],
      branchName: 'Dwarasamudra High Ornamental Calligraphy'
    },
    sampleGlyphs: [
      {
        id: 'hoy-01',
        label: 'Ornate Florid Vowel',
        kannadaChar: 'ಅ',
        iast: 'a',
        imagePath: '/glyphs/hoysala/1.png',
        morphologicalNote: 'Double curls and decorative tail terminating in calligraphic flourish.'
      },
      {
        id: 'hoy-02',
        label: 'Sculpted Consonant',
        kannadaChar: 'ಕ',
        iast: 'ka',
        imagePath: '/glyphs/hoysala/2.png',
        morphologicalNote: 'Intricate loop-in-loop structure with pronounced V-shaped Talakattu.'
      },
      {
        id: 'hoy-03',
        label: 'Flowing Arch',
        kannadaChar: 'ಗ',
        iast: 'ga',
        imagePath: '/glyphs/hoysala/3.png',
        morphologicalNote: 'Curving arch adorned with upper notch and downward ligature cusp.'
      }
    ]
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
    significance: 'Pre-modern administrative script spanning monumental temple steles across South India.',
    relationships: {
      ancestorScripts: ['Hoysala Script'],
      descendantScripts: ['Mysuru Wodeyar Script', 'Nayaka Script', 'Keladi Script'],
      parallelScripts: ['Nandi-Nagari (Sanskrit grants)', 'Vijayanagara Telugu'],
      branchName: 'Hampi Imperial Epigraphical Horizon'
    },
    sampleGlyphs: [
      {
        id: 'vij-01',
        label: 'Granite-Carved Vowel',
        kannadaChar: 'ಅ',
        iast: 'a',
        imagePath: '/glyphs/vijayanagara/1.png',
        morphologicalNote: 'Bold, robust circular loop designed to endure hard granite chiseling.'
      },
      {
        id: 'vij-02',
        label: 'Standardized Consonant',
        kannadaChar: 'ಕ',
        iast: 'ka',
        imagePath: '/glyphs/vijayanagara/2.png',
        morphologicalNote: 'Isolated glyph body with clear horizontal T-bar and rounded base.'
      },
      {
        id: 'vij-03',
        label: 'Open Horseshoe Arch',
        kannadaChar: 'ಗ',
        iast: 'ga',
        imagePath: '/glyphs/vijayanagara/3.png',
        morphologicalNote: 'Even-thickness arch resembling modern Kannada letter architecture.'
      }
    ]
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
    significance: 'Crucial transitional bridge from manuscript traditions to modern print culture.',
    relationships: {
      ancestorScripts: ['Vijayanagara Script'],
      descendantScripts: ['Present Kannada (Modern Varnamale)'],
      parallelScripts: ['Modi Script (Administrative Marathi)', 'Tigalari Script (Coastal Karnataka)'],
      branchName: 'Mysore Manuscript & Royal Chancellery'
    },
    sampleGlyphs: [
      {
        id: 'mys-01',
        label: 'Manuscript Cursive Vowel',
        kannadaChar: 'ಅ',
        iast: 'a',
        imagePath: '/glyphs/mysuru/1.png',
        morphologicalNote: 'Smooth circular sweep designed not to tear dried palm leaves.'
      },
      {
        id: 'mys-02',
        label: 'Pre-Print Consonant',
        kannadaChar: 'ಕ',
        iast: 'ka',
        imagePath: '/glyphs/mysuru/2.png',
        morphologicalNote: 'Direct precursor to 19th-century Basel Mission metal type.'
      },
      {
        id: 'mys-03',
        label: 'Modern-Contour Arch',
        kannadaChar: 'ಗ',
        iast: 'ga',
        imagePath: '/glyphs/mysuru/3.png',
        morphologicalNote: 'Near-identical geometry to contemporary Kannada letter forms.'
      }
    ]
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
    significance: 'Standardized modern literary and administrative script of Karnataka.',
    relationships: {
      ancestorScripts: ['Mysuru Wodeyar Script'],
      descendantScripts: ['Contemporary Digital Typography & OpenType Fonts'],
      parallelScripts: ['Modern Telugu Script', 'Devanagari'],
      branchName: 'Standard Literary & Administrative Varnamale'
    },
    sampleGlyphs: [
      {
        id: 'pre-01',
        label: 'Standardized Unicode Vowel',
        kannadaChar: 'ಅ',
        iast: 'a',
        imagePath: '/glyphs/present_kannada/1.png',
        morphologicalNote: 'Normalized baseline, uniform stroke modulation, standard open loop.'
      },
      {
        id: 'pre-02',
        label: 'Standard Typographic Consonant',
        kannadaChar: 'ಕ',
        iast: 'ka',
        imagePath: '/glyphs/present_kannada/2.png',
        morphologicalNote: 'Standard check-mark talakattu (✓) with calibrated inner kerning.'
      },
      {
        id: 'pre-03',
        label: 'Standard Typographic Arch',
        kannadaChar: 'ಗ',
        iast: 'ga',
        imagePath: '/glyphs/present_kannada/3.png',
        morphologicalNote: 'Balanced arch with standard open top talakattu mark.'
      }
    ]
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Halmidi_inscription.jpg/800px-Halmidi_inscription.jpg',
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Brahmagiri_ashoka_edict.jpg/800px-Brahmagiri_ashoka_edict.jpg',
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
    imageUrl: 'https://images.unsplash.com/photo-1628082697850-d4fb7976e1a4?auto=format&fit=crop&q=80&w=1200',
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
    imageUrl: 'https://images.unsplash.com/photo-1600100397608-f010f443b745?auto=format&fit=crop&q=80&w=1200',
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
  },
  {
    id: 'ins-aihole-005',
    accessionNumber: 'KHA-EP-0634-AHL',
    title: 'Aihole Prashasti of Ravikirti (Pulakeshin II Victory Stele)',
    kannadaTitle: 'ರವಿಕೀರ್ತಿಯ ಐಹೊಳೆ ಪ್ರಶಸ್ತಿ ಶಾಸನ (ಇಮ್ಮಡಿ ಪುಲಕೇಶಿಯ ವಿಜಯ ಪ್ರಶಸ್ತಿ)',
    scriptClass: 'badami_chalukya',
    sourceLanguage: 'sanskrit',
    substrate: 'sandstone',
    dimensions: {
      heightCm: 145,
      widthCm: 80,
      depthCm: 22
    },
    imageUrl: 'https://images.unsplash.com/photo-1627916607164-7b20241db935?auto=format&fit=crop&q=80&w=1200',
    conditionRating: 'excellent',
    reviewStatus: 'verified',
    lastUpdated: '11 Oct 2026',
    historicalContext: {
      dynasty: 'Badami Chalukyas',
      ruler: 'Emperor Pulakeshin II',
      regnalPeriod: 'c. 610 – 642 CE',
      approximateDate: '634 CE (Saka 556)',
      century: '7th Century CE',
      findSpot: {
        village: 'Aihole (Aryapura)',
        taluk: 'Hungund',
        district: 'Bagalkote',
        state: 'Karnataka'
      },
      epigraphiaReference: 'Epigraphia Indica Vol. VI, pp. 1-12',
      historicalSummary: 'Composed by the court poet and Jain scholar Ravikirti. Celebrates Pulakeshin II’s historic victory on the banks of the Narmada River against Harshavardhana of Kannauj, cementing the Chalukyan hegemony over peninsular India. Ravikirti famously compares his poetic genius to Kalidasa and Bharavi.',
      linguisticSignificance: 'Masterpiece of classical Sanskrit Kavya engraved in the Badami Chalukyan script with archaic hook headmarks, rhythmic meter, and elegant vertical flourishes.'
    },
    transcription: {
      scriptClass: 'badami_chalukya',
      scriptConfidence: 0.991,
      recognizedText: 'ಜಯತಿ ಭಗವಾನ್ ಜಿನೇಂದ್ರೋ ಜನ್ಮ-ಜರಾ-ವಿಪ್ರಮುಕ್ತ-ಪರಮ-ಪದಃ | ಯಸ್ಯ ಜ್ಞಾನಾರ್ಣವ-ಸಂಭೃತ-ಭುವನತ್ರಯ-ರೂಪ-ಸಂಪನ್ನಃ || ಸ ಜಯತಿ ಪುಲಕೇಶೀ ವಲ್ಲಭಃ ಸತ್ಯಾಶ್ರಯಃ...',
      iastTransliteration: 'jayati bhagavān jinēndrō janma-jarā-vipramukta-parama-padaḥ | yasya jñānārṇava-sambhṛta-bhuvanatraya-rūpa-sampannaḥ || sa jayati pulakēśī vallabhaḥ satyāśrayaḥ...',
      lines: [
        {
          lineNumber: 1,
          originalText: 'ಜಯತಿ ಭಗವಾನ್ ಜಿನೇಂದ್ರೋ ಜನ್ಮ-ಜರಾ-ವಿಪ್ರಮುಕ್ತ-ಪರಮ-ಪದಃ',
          iastText: 'jayati bhagavān jinēndrō janma-jarā-vipramukta-parama-padaḥ',
          modernKannadaLine: 'ಜನನ ಮತ್ತು ಮುಪ್ಪುಗಳಿಂದ ಮುಕ್ತವಾಗಿ ಪರಮಪದವನ್ನು ಹೊಂದಿದ ಭಗವಾನ್ ಜಿನೇಂದ್ರನಿಗೆ ಜಯವಾಗಲಿ,'
        },
        {
          lineNumber: 2,
          originalText: 'ಯಸ್ಯ ಜ್ಞಾನಾರ್ಣವ-ಸಂಭೃತ-ಭುವನತ್ರಯ-ರೂಪ-ಸಂಪನ್ನಃ',
          iastText: 'yasya jñānārṇava-sambhṛta-bhuvanatraya-rūpa-sampannaḥ',
          modernKannadaLine: 'ಯಾರ ಜ್ಞಾನವೆಂಬ ಸಾಗರದಲ್ಲಿ ಮೂರು ಲೋಕಗಳ ಸಮಗ್ರ ಸ್ವರೂಪವೂ ತುಂಬಿಕೊಂಡಿದೆಯೋ,'
        },
        {
          lineNumber: 3,
          originalText: 'ಸ ಜಯತಿ ಪುಲಕೇಶೀ ವಲ್ಲಭಃ ಸತ್ಯಾಶ್ರಯಃ ಪರಮೇಶ್ವರಃ',
          iastText: 'sa jayati pulakēśī vallabhaḥ satyāśrayaḥ paramēśvaraḥ',
          modernKannadaLine: 'ಆ ಸತ್ಯಾಶ್ರಯ, ಪರಮೇಶ್ವರ ಇಮ್ಮಡಿ ಪುಲಕೇಶಿ ವಲ್ಲಭ ಮಹಾರಾಜನು ಚಿರಕಾಲ ವಿಜಯಶಾಲಿಯಾಗಿ ಬಾಳಲಿ.'
        }
      ],
      detectedGlyphsCount: 52,
      isMockData: true
    },
    translation: {
      sourceLanguage: 'sanskrit',
      languageConfidence: 0.988,
      modernKannada: 'ಜನನ ಮರಣಗಳ ಚಕ್ರದಿಂದ ಮುಕ್ತನಾಗಿ ಪರಮ ಮುಕ್ತಿಪದವನ್ನು ಪಡೆದಿರುವ ಭಗವಾನ್ ಜಿನೇಂದ್ರನಿಗೆ ಜಯವಾಗಲಿ. ಆತನ ಅಪಾರ ಕೇವಲಜ್ಞಾನವೆಂಬ ಮಹಾಸಾಗರದಲ್ಲಿ ಸಮಸ್ತ ತ್ರಿಭುವನಗಳ ಸತ್ಯವೂ ಪ್ರಕಾಶಿಸುತ್ತದೆ. ಉತ್ತರ ಪಥೇಶ್ವರನಾದ ಹರ್ಷವರ್ಧನನನ್ನು ನರ್ಮದಾ ನದಿಯ ತೀರದಲ್ಲಿ ಹಿಮ್ಮೆಟ್ಟಿಸಿ ದಕ್ಷಿಣಾಪಥದ ಸಾರ್ವಭೌಮನಾದ, ಸತ್ಯಾಶ್ರಯ ಬಿರುದಾಂಕಿತ ಇಮ್ಮಡಿ ಪುಲಕೇಶಿ ಚಕ್ರವರ್ತಿಯು ಪ್ರಖ್ಯಾತ ವಿಜಯಿಯಾಗಿ ರಾರಾಜಿಸುತ್ತಿದ್ದಾನೆ.',
      englishTranslation: 'Victorious is Lord Jinendra, who has transcended birth and decay to attain the supreme abode, whose ocean of omniscience mirrors the entire threefold universe. Victorious too is Emperor Pulakeshin II (Satyashraya), who repelled the northern emperor Harshavardhana on the banks of the Narmada and established supreme sovereignty over peninsular India.',
      glossary: [
        {
          term: 'ಸತ್ಯಾಶ್ರಯಃ',
          iast: 'satyāśrayaḥ',
          modernKannadaEquivalent: 'ಸತ್ಯಕ್ಕೆ ಆಶ್ರಯನಾದವನು (ಪುಲಕೇಶಿಯ ಬಿರುದು)',
          englishDefinition: 'Refuge of Truth (canonical dynastic title of the Western Chalukya monarchs).',
          grammaticalCategory: 'Bahuvrihi Compound'
        },
        {
          term: 'ರವಿಕೀರ್ತಿ',
          iast: 'ravikīrti',
          modernKannadaEquivalent: 'ಆಸ್ಥಾನ ಮಹಾಕವಿ ರವಿಕೀರ್ತಿ',
          englishDefinition: 'The celebrated court poet who composed this 37-verse eulogy in Saka 556 (634 CE).',
          grammaticalCategory: 'Proper Noun'
        }
      ],
      stylisticNotes: 'Composed on fine-grained red sandstone slab fitted into the eastern wall of the Meguti Jain temple at Aihole.',
      isMockData: true
    },
    provenance: 'Eastern exterior wall of Meguti Jain Temple at Aihole hilltop, Bagalkote District.',
    currentLocation: 'In situ stele, Meguti Temple, Aihole'
  },
  {
    id: 'ins-dharwad-006',
    accessionNumber: 'KHA-EP-0850-DHW',
    title: 'Dharwad Hero Stone of Amoghavarsha Nrupatunga',
    kannadaTitle: 'ಅಮೋಘವರ್ಷ ನೃಪತುಂಗನ ಧಾರವಾಡ ವೀರಗಲ್ಲು ಶಾಸನ',
    scriptClass: 'rashtrakuta',
    sourceLanguage: 'halegannada',
    substrate: 'granite',
    dimensions: {
      heightCm: 135,
      widthCm: 72,
      depthCm: 20
    },
    imageUrl: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&q=80&w=1200',
    conditionRating: 'fair',
    reviewStatus: 'verified',
    lastUpdated: '09 Oct 2026',
    historicalContext: {
      dynasty: 'Imperial Rashtrakutas',
      ruler: 'Emperor Amoghavarsha I Nrupatunga',
      regnalPeriod: 'c. 814 – 878 CE',
      approximateDate: 'c. 850 CE',
      century: '9th Century CE',
      findSpot: {
        village: 'Navalgund',
        taluk: 'Navalgund',
        district: 'Dharwad',
        state: 'Karnataka'
      },
      epigraphiaReference: 'South Indian Inscriptions Vol. XI, Part I, No. 12',
      historicalSummary: 'Erected during the reign of the peace-loving scholar-emperor Amoghavarsha I Nrupatunga. Records the sacrifice of an officer who defended cattle wealth and village boundaries during a border skirmish, granting tax concessions to his bereaved family.',
      linguisticSignificance: 'Contemporary with the seminal literary work Kavirajamarga. Demonstrates the mature Classical Old Kannada (Halegannada) case inflections and broad Rashtrakuta glyph kerning.'
    },
    transcription: {
      scriptClass: 'rashtrakuta',
      scriptConfidence: 0.978,
      recognizedText: 'ಸ್ವಸ್ತಿ ಶ್ರೀ ನೃಪತುಂಗದೇವ ರಾಜ್ಯವರ್ಧಮಾನೊಳ್ ನಾಡಾಳ್ವ ಬಂಕೆಯನ ಮಗನ್ ಊರೊಳ್ ತೂಱುವಂ ಕಾದು ಬಟಹರೊಳ್ ಅಳಿದಂಗೆ ನೆತ್ತರುಪಟ್ಟಿ ಕೊಟ್ಟಾರ್...',
      iastTransliteration: 'svasti śrī nr̥patuṅgadēva rājyavardhamānoḷ nāḍāḷva baṅkeyana magan ūroḷ tūṟuvaṁ kādu baṭaharoḷ aḷidange nettarupaṭṭi koṭṭār...',
      lines: [
        {
          lineNumber: 1,
          originalText: 'ಸ್ವಸ್ತಿ ಶ್ರೀ ನೃಪತುಂಗದೇವ ರಾಜ್ಯವರ್ಧಮಾನೊಳ್',
          iastText: 'svasti śrī nr̥patuṅgadēva rājyavardhamānoḷ',
          modernKannadaLine: 'ಶುಭವಾಗಲಿ, ಶ್ರೀ ನೃಪತುಂಗದೇವನ ರಾಜ್ಯವು ಅಭಿವೃದ್ಧಿ ಹೊಂದುತ್ತಿರುವಾಗ,'
        },
        {
          lineNumber: 2,
          originalText: 'ನಾಡಾಳ್ವ ಬಂಕೆಯನ ಮಗನ್ ಊರೊಳ್ ತೂಱುವಂ ಕಾದು',
          iastText: 'nāḍāḷva baṅkeyana magan ūroḷ tūṟuvaṁ kādu',
          modernKannadaLine: 'ನಾಡನ್ನು ಆಳುತ್ತಿದ್ದ ಬಂಕೆಯನ ಪುತ್ರನು ಗ್ರಾಮದಲ್ಲಿ ಗೋಸಂಪತ್ತನ್ನು ರಕ್ಷಿಸಿ,'
        },
        {
          lineNumber: 3,
          originalText: 'ಬಟಹರೊಳ್ ಅಳಿದಂಗೆ ನೆತ್ತರುಪಟ್ಟಿ ಕೊಟ್ಟಾರ್',
          iastText: 'baṭaharoḷ aḷidange nettarupaṭṭi koṭṭār',
          modernKannadaLine: 'ಕದನದಲ್ಲಿ ವೀರಸ್ವರ್ಗ ಪಡೆದ ವೀರನಿಗೆ ಗೌರವಾರ್ಥವಾಗಿ ರಕ್ತಮಾನ್ಯ (ನೆತ್ತರುಪಟ್ಟಿ) ಭೂಮಿಯನ್ನು ನೀಡಿದರು.'
        }
      ],
      detectedGlyphsCount: 44,
      isMockData: true
    },
    translation: {
      sourceLanguage: 'halegannada',
      languageConfidence: 0.981,
      modernKannada: 'ಶ್ರೀಮಂತ ರಾಷ್ಟ್ರಕೂಟ ಚಕ್ರವರ್ತಿ ನೃಪತುಂಗದೇವನ ಶಾಂತಿಯುತ ಆಳ್ವಿಕೆಯ ಕಾಲದಲ್ಲಿ, ಪ್ರಾಂತ್ಯವನ್ನು ಆಳುತ್ತಿದ್ದ ಸೇನಾನಿ ಬಂಕೆಯನ ಪುತ್ರನು ಊರಿನ ಮೇಲೆ ದಾಳಿ ಮಾಡಿದ ವೈರಿಗಳಿಂದ ಗೋವುಗಳನ್ನು ಮತ್ತು ಪ್ರಜೆಗಳನ್ನು ರಕ್ಷಿಸುವ ಹೋರಾಟದಲ್ಲಿ ವೀರಮರಣ ಹೊಂದಿದನು. ಆತನ ಅಪ್ರತಿಮ ತ್ಯಾಗವನ್ನು ಸ್ಮರಿಸಿ ಆತನ ಕುಟುಂಬಕ್ಕೆ ಶಾಶ್ವತ ನೆತ್ತರುಪಟ್ಟಿ (ವೀರಭೂಮಿ) ದಾನವನ್ನು ನೀಡಲಾಯಿತು.',
      englishTranslation: 'During the prosperous reign of the Rashtrakuta emperor Nrupatunga Deva, the son of the provincial governor Bankeya fought valiantly against cattle-raiders to defend the township. Having attained martyrdom on the battlefield, the administration conferred a perpetual tax-free blood-grant (Nettarupatti) to his kin.',
      glossary: [
        {
          term: 'ನೆತ್ತರುಪಟ್ಟಿ',
          iast: 'nettarupaṭṭi',
          modernKannadaEquivalent: 'ವೀರಮರಣ ಹೊಂದಿದ ಯೋಧನ ಕುಟುಂಬಕ್ಕೆ ನೀಡುವ ತೆರಿಗೆ ರಹಿತ ಭೂಮಿ',
          englishDefinition: 'Blood-grant endowment granted to the lineage of a fallen hero.',
          grammaticalCategory: 'Compound Noun'
        },
        {
          term: 'ತೂಱು',
          iast: 'tūṟu',
          modernKannadaEquivalent: 'ಗೋವುಗಳು / ಹಸುಗಳ ಹಿಂಡು',
          englishDefinition: 'Kine / Cattle herd being rustled by adversaries.',
          grammaticalCategory: 'Dravidian Archaic Noun'
        }
      ],
      stylisticNotes: 'Features typical 9th-century horizontally broadened characters with horizontal bar talakattus chiseled on hard grey granite.',
      isMockData: true
    },
    provenance: 'Relocated from Navalgund fields; documented in Dharwad District Archaeological Survey.',
    currentLocation: 'Kannada Research Institute (KRI) Museum, Karnatak University, Dharwad'
  },
  {
    id: 'ins-hampi-007',
    accessionNumber: 'KHA-EP-1509-HMP',
    title: 'Hampi Virupaksha Stele of Krishnadevaraya (Coronation Endowment)',
    kannadaTitle: 'ಕೃಷ್ಣದೇವರಾಯನ ಹಂಪಿಯ ವಿರೂಪಾಕ್ಷ ಮಹಾದೇಗುಲ ಶಾಸನ (ಪಟ್ಟಾಭಿಷೇಕ ದಾನ)',
    scriptClass: 'vijayanagara',
    sourceLanguage: 'nadugannada',
    substrate: 'granite',
    dimensions: {
      heightCm: 195,
      widthCm: 88,
      depthCm: 30
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Stone_Chariot_Hampi.jpg/1280px-Stone_Chariot_Hampi.jpg',
    conditionRating: 'excellent',
    reviewStatus: 'verified',
    lastUpdated: '13 Oct 2026',
    historicalContext: {
      dynasty: 'Vijayanagara Empire (Tuluva)',
      ruler: 'Emperor Sri Krishnadevaraya',
      regnalPeriod: 'c. 1509 – 1529 CE',
      approximateDate: '1509 CE (Saka 1431)',
      century: '16th Century CE',
      findSpot: {
        village: 'Hampi (Vijayanagara)',
        taluk: 'Hosapete',
        district: 'Vijayanagara',
        state: 'Karnataka'
      },
      epigraphiaReference: 'South Indian Inscriptions Vol. IV, No. 258',
      historicalSummary: 'Installed on the occasion of Sri Krishnadevaraya’s imperial coronation (Pattabhisheka). Records the construction of the large entrance Gopuram, the 100-pillared Ranga Mandapa in front of the sanctum, and generous grants of gold and villages to Lord Virupaksha.',
      linguisticSignificance: 'Classic Vijayanagara-era Nadugannada administrative prose with extensive Sanskrit titles and direct vernacular clarity.'
    },
    transcription: {
      scriptClass: 'vijayanagara',
      scriptConfidence: 0.992,
      recognizedText: 'ಶುಭಮಸ್ತು | ಶಕವರುಷ ೧೪೩೧ನೆಯ ಶುಕ್ಲ ಸಂವತ್ಸರದ ಮಾಘ ಶುದ್ಧ ೧೪ ಯಲ್ಲೂ ಶ್ರೀಮನ್ಮಹಾರಾಜಾಧಿರಾಜ ರಾಜಪರಮೇಶ್ವರ ಶ್ರೀವೀರಪ್ರತಾಪ ಶ್ರೀಕೃಷ್ಣದೇವರಾಯ ಮಹಾರಾಯರು ಪಟ್ಟಾಭಿಷಿಕ್ತರಾದ ಶುಭ ಮುಹೂರ್ತದಲ್ಲಿ...',
      iastTransliteration: 'śubhamastu | śakavaruṣa 1431neya śukla saṁvatsarada māgha śuddha 14 yallū śrīmanmahārājādhirāja rājaparamēśvara śrīvīrapratāpa śrīkr̥ṣṇadēvarāya mahārāyaru paṭṭābhiṣiktarāda śubha muhūrtadallī...',
      lines: [
        {
          lineNumber: 1,
          originalText: 'ಶುಭಮಸ್ತು | ಶಕವರುಷ ೧೪೩೧ನೆಯ ಶುಕ್ಲ ಸಂವತ್ಸರದ',
          iastText: 'śubhamastu | śakavaruṣa 1431neya śukla saṁvatsarada',
          modernKannadaLine: 'ಶುಭವಾಗಲಿ, ಶಕ ವರ್ಷ ೧೪೩೧ನೆಯ ಶುಕ್ಲ ಸಂವತ್ಸರದ,'
        },
        {
          lineNumber: 2,
          originalText: 'ಮಾಘ ಶುದ್ಧ ೧೪ ಯಲ್ಲೂ ಶ್ರೀಮನ್ಮಹಾರಾಜಾಧಿರಾಜ ರಾಜಪರಮೇಶ್ವರ',
          iastText: 'māgha śuddha 14 yallū śrīmanmahārājādhirāja rājaparamēśvara',
          modernKannadaLine: 'ಮಾಘ ಶುದ್ಧ ಚತುರ್ದಶಿಯಂದು, ಶ್ರೀಮನ್ ಮಹಾರಾಜಾಧಿರಾಜ ರಾಜಪರಮೇಶ್ವರ,'
        },
        {
          lineNumber: 3,
          originalText: 'ಶ್ರೀವೀರಪ್ರತಾಪ ಶ್ರೀಕೃಷ್ಣದೇವರಾಯ ಮಹಾರಾಯರು ಪಟ್ಟಾಭಿಷಿಕ್ತರಾದ ಶುಭ ಮುಹೂರ್ತದಲ್ಲಿ',
          iastText: 'śrīvīrapratāpa śrīkr̥ṣṇadēvarāya mahārāyaru paṭṭābhiṣiktarāda śubha muhūrtadallī',
          modernKannadaLine: 'ಶ್ರೀ ವೀರಪ್ರತಾಪ ಶ್ರೀ ಕೃಷ್ಣದೇವರಾಯ ಮಹಾರಾಯರು ವಿಜಯನಗರದ ಸಿಂಹಾಸನದಲ್ಲಿ ಪಟ್ಟಾಭಿಷಿಕ್ತರಾದ ಸಂದರ್ಭದಲ್ಲಿ...'
        }
      ],
      detectedGlyphsCount: 56,
      isMockData: true
    },
    translation: {
      sourceLanguage: 'nadugannada',
      languageConfidence: 0.994,
      modernKannada: 'ಮಂಗಳವಾಗಲಿ. ಶಕ ವರ್ಷ ೧೪೩೧ರ ಶುಕ್ಲ ಸಂವತ್ಸರದ ಮಾಘ ಶುದ್ಧ ಚತುರ್ದಶಿಯ ಶುಭ ಮುಹೂರ್ತದಲ್ಲಿ ವಿಜಯನಗರದ ಸಿಂಹಾಸನಾರೋಹಣ ಮಾಡಿದ ಶ್ರೀ ಕೃಷ್ಣದೇವರಾಯ ಮಹಾರಾಯರು ಪಂಪಾಪತಿ ಶ್ರೀ ವಿರೂಪಾಕ್ಷ ದೇವರಿಗೆ ಶೋಭಾಯಮಾನವಾದ ರಂಗಮಂಟಪವನ್ನು ಮತ್ತು ಭವ್ಯ ರಾಯಗೋಪುರವನ್ನು ನಿರ್ಮಿಸಿಕೊಟ್ಟರು. ಜೊತೆಗೆ ರತ್ನಖಚಿತ ಸುವರ್ಣ ಕಿರೀಟವನ್ನು ಸಮರ್ಪಿಸಿ ನಿತ್ಯ ಅನ್ನದಾನಕ್ಕೆ ಗ್ರಾಮಗಳನ್ನು ಉಂಬಳಿಯಾಗಿ ನೀಡಿದರು.',
      englishTranslation: 'May auspiciousness prevail. On the sacred date of Magha Shuddha Chaturdashi in Saka year 1431 (1509 CE), marking his coronation upon the imperial throne of Vijayanagara, Emperor Sri Krishnadevaraya caused the grand pillared Ranga Mandapa and majestic entrance Gopuram to be erected for Lord Virupaksha, dedicating endowed villages for perennial temple maintenance.',
      glossary: [
        {
          term: 'ಪಟ್ಟಾಭಿಷಿಕ್ತರಾದ',
          iast: 'paṭṭābhiṣiktarāda',
          modernKannadaEquivalent: 'ರಾಜಮುಕುಟ ಧರಿಸಿ ಸಿಂಹಾಸನಾರೋಹಣ ಮಾಡಿದ',
          englishDefinition: 'Ritually anointed and crowned as the sovereign emperor.',
          grammaticalCategory: 'Adjectival Participle'
        },
        {
          term: 'ರಂಗಮಂಟಪ',
          iast: 'raṅgamaṇṭapa',
          modernKannadaEquivalent: 'ದೇವಸ್ಥಾನದ ಮುಂಭಾಗದ ವಿಶಾಲ ಸಭಾ ಮಂಟಪ',
          englishDefinition: 'Grand ceremonial pavilion in front of the sanctum.',
          grammaticalCategory: 'Architecture Compound'
        }
      ],
      stylisticNotes: 'Deeply engraved in grey crystalline granite with bold, decoupled glyph forms and isolated consonant bodies typical of the 16th century.',
      isMockData: true
    },
    provenance: 'Erected in the pillared cloister of Sri Virupaksha Temple, Hampi.',
    currentLocation: 'In situ stele, Virupaksha Temple Courtyard, Hampi'
  },
  {
    id: 'ins-mysuru-008',
    accessionNumber: 'KHA-EP-1650-MYS',
    title: 'Srirangapatna Royal Charter of Kanthirava Narasaraja Wodeyar',
    kannadaTitle: 'ರಣಧೀರ ಕಂಠೀರವ ನರಸರಾಜ ಒಡೆಯರ ಶ್ರೀರಂಗಪಟ್ಟಣ ತಾಮ್ರಶಾಸನ',
    scriptClass: 'mysuru',
    sourceLanguage: 'nadugannada',
    substrate: 'copper_plate',
    dimensions: {
      heightCm: 28,
      widthCm: 18,
      depthCm: 0.4
    },
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=1200',
    conditionRating: 'excellent',
    reviewStatus: 'verified',
    lastUpdated: '07 Oct 2026',
    historicalContext: {
      dynasty: 'Kingdom of Mysore (Wodeyars)',
      ruler: 'Ranadheera Kanthirava Narasaraja I',
      regnalPeriod: 'c. 1638 – 1659 CE',
      approximateDate: 'c. 1650 CE',
      century: '17th Century CE',
      findSpot: {
        village: 'Srirangapatna',
        taluk: 'Srirangapatna',
        district: 'Mandya',
        state: 'Karnataka'
      },
      epigraphiaReference: 'Epigraphia Carnatica Vol. III, Sr. 14',
      historicalSummary: 'Issued by Ranadheera Kanthirava Narasaraja Wodeyar, the first Mysore monarch to mint sovereign gold coins (Kanthirava Pagodas/Hana). Records royal endowments for Vedic scholars, irrigational canals along the Cauvery River, and temple provisions.',
      linguisticSignificance: 'Features the distinctive Mysore Wodeyar script with cursive arcs and circular loops adapted from palm-leaf stylus writing, representing the immediate precursor to modern print Kannada.'
    },
    transcription: {
      scriptClass: 'mysuru',
      scriptConfidence: 0.995,
      recognizedText: 'ಶ್ರೀ ವರಾಹಸ್ವಾಮಿ ಪ್ರಸನ್ನ | ಶ್ರೀರಂಗಪಟ್ಟಣದ ರಾಜಧಾನಿಯಲ್ಲಿ ಶ್ರೀಮನ್ಮಹೀಶೂರ ಕಂಠೀರವ ನರಸರಾಜ ವೊಡೆಯರಯ್ಯನವರು ಕಾವೇರಿ ತೀರದ ಫಲವತ್ತಾದ ಕೃಷಿಭೂಮಿಯನ್ನು ಅಗ್ರಹಾರದ ಬ್ರಾಹ್ಮಣರಿಗೆ ಸರ್ವಮಾನ್ಯವಾಗಿ ದಯಪಾಲಿಸಿದ ಧರ್ಮಶಾಸನ...',
      iastTransliteration: 'śrī varāhasvāmī prasanna | śrīraṅgapaṭṭaṇada rājadhāniyallī śrīmanmahīśūra kaṇṭhīrava narasarāja voḍeyarayyanavaru kāvēri tīrada phalavattāda kr̥ṣibhūmiyanu agrahārada brāhmaṇarige sarvamānyavāgi dayapālisida dharmaśāsana...',
      lines: [
        {
          lineNumber: 1,
          originalText: 'ಶ್ರೀ ವರಾಹಸ್ವಾಮಿ ಪ್ರಸನ್ನ | ಶ್ರೀರಂಗಪಟ್ಟಣದ ರಾಜಧಾನಿಯಲ್ಲಿ',
          iastText: 'śrī varāhasvāmī prasanna | śrīraṅgapaṭṭaṇada rājadhāniyallī',
          modernKannadaLine: 'ಶ್ರೀ ವರಾಹಸ್ವಾಮಿಯು ಪ್ರಸನ್ನನಾಗಲಿ | ಶ್ರೀರಂಗಪಟ್ಟಣದ ರಾಜಧಾನಿಯಲ್ಲಿ,'
        },
        {
          lineNumber: 2,
          originalText: 'ಶ್ರೀಮನ್ಮಹೀಶೂರ ಕಂಠೀರವ ನರಸರಾಜ ವೊಡೆಯರಯ್ಯನವರು',
          iastText: 'śrīmanmahīśūra kaṇṭhīrava narasarāja voḍeyarayyanavaru',
          modernKannadaLine: 'ಶ್ರೀಮಂತ ಮೈಸೂರಿನ ಕಂಠೀರವ ನರಸರಾಜ ಒಡೆಯರವರು,'
        },
        {
          lineNumber: 3,
          originalText: 'ಕಾವೇರಿ ತೀರದ ಫಲವತ್ತಾದ ಕೃಷಿಭೂಮಿಯನ್ನು ಸರ್ವಮಾನ್ಯವಾಗಿ ದಯಪಾಲಿಸಿದ ಶಾಸನ',
          iastText: 'kāvēri tīrada phalavattāda kr̥ṣibhūmiyanu sarvamānyavāgi dayapālisida śāsana',
          modernKannadaLine: 'ಕಾವೇರಿ ನದಿ ತೀರದ ಫಲವತ್ತಾದ ಕೃಷಿ ಭೂಮಿಯನ್ನು ತೆರಿಗೆ ರಹಿತವಾಗಿ ದಾನ ನೀಡಿದ ಶಾಸನ.'
        }
      ],
      detectedGlyphsCount: 48,
      isMockData: true
    },
    translation: {
      sourceLanguage: 'nadugannada',
      languageConfidence: 0.991,
      modernKannada: 'ಶ್ರೀ ವರಾಹಸ್ವಾಮಿಯ ಕೃಪೆಯು ಸದಾ ರಕ್ಷಿಸಲಿ. ರಾಜಧಾನಿ ಶ್ರೀರಂಗಪಟ್ಟಣದಿಂದ ಆಳ್ವಿಕೆ ನಡೆಸುತ್ತಿದ್ದ ಮೈಸೂರಿನ ಅಧಿಪತಿ ಶ್ರೀ ಕಂಠೀರವ ನರಸರಾಜ ಒಡೆಯರವರು ಕಾವೇರಿ ನದಿಯ ನೀರಾವರಿ ನಾಲೆಗಳಿಂದ ಸಮೃದ್ಧವಾದ ಕೃಷಿ ಭೂಮಿಯನ್ನು ಸರ್ವಮಾನ್ಯವಾಗಿ ಅಗ್ರಹಾರಕ್ಕೆ ದಾನವಾಗಿ ನೀಡಿ ಧರ್ಮಶಾಶ್ವತತೆಯನ್ನು ಸ್ಥಾಪಿಸಿದರು.',
      englishTranslation: 'By the grace of Sri Varahaswamy. Sovereign ruler of Mysore, Sri Kanthirava Narasaraja Wodeyar, reigning from the island fortress capital of Srirangapatna, granted fertile agricultural land irrigated by Cauvery canal networks to scholarly preceptors as a tax-exempt charitable endowment in perpetuity.',
      glossary: [
        {
          term: 'ಸರ್ವಮಾನ್ಯ',
          iast: 'sarvamānya',
          modernKannadaEquivalent: 'ಎಲ್ಲಾ ಬಗೆಯ ಕಂದಾಯ ಮತ್ತು ತೆರಿಗೆಗಳಿಂದ ಮುಕ್ತವಾದ ದಾನ',
          englishDefinition: 'Land granted totally free of all government levies and royal imposts.',
          grammaticalCategory: 'Administrative Legal Term'
        },
        {
          term: 'ಕಂಠೀರವ',
          iast: 'kaṇṭhīrava',
          modernKannadaEquivalent: 'ಸಿಂಹದಂತಹ ಗರ್ಜನೆ ಮತ್ತು ಶೌರ್ಯವುಳ್ಳವನು (ಸಿಂಹ)',
          englishDefinition: 'Lion-voiced / lion-hearted (royal epithet of Narasaraja I).',
          grammaticalCategory: 'Sanskrit Tatshama Epithet'
        }
      ],
      stylisticNotes: 'Engraved on a set of 3 copper plates linked by a bronze ring bearing the royal Varaha (Boar) seal of the Mysore Wodeyars.',
      isMockData: true
    },
    provenance: 'Discovered in Srirangapatna palace chancellery archives; documented by Mysore Epigraphical Survey.',
    currentLocation: 'Palace Museum & Archives, Mysore Palace, Mysuru'
  }
];

export const MOCK_HISTORICAL_RULES: HistoricalRuleItem[] = [
  {
    id: 'rule-phon-01',
    ruleCode: 'RULE-HAL-PHON-01',
    ruleType: 'phonological',
    title: 'Sakata Repha (ಱ) Alveolar Trill Retention & Loss',
    kannadaTitle: 'ಶಕಟ ರೇಫ (ಱ) ಧ್ವನಿಮಾ ವಿಕಾಸ ಮತ್ತು ವಿಲೀನ ನಿಯಮ',
    associatedScript: 'kadamba',
    associatedLanguage: 'purvada_halegannada',
    ruleVersion: 'v1.4.2',
    evidenceSource: 'Shabdamanidarpana Sutra 32; Halmidi Stele line 2; Kavirajamarga I.48',
    reviewStatus: 'verified_epigraphist',
    applicability: '5th–12th Century CE inscriptions (Kadamba, Badami Chalukya, Rashtrakuta steles)',
    expertReviewRequired: true,
    description: 'Distinct alveolar trill (hard "r") contrasted phonemically with standard dental "r" (ರ). In Purvada Halegannada and Classical Halegannada, replacing ಱ with ರ creates semantic change or corruption (e.g. ಅಱಿ [to know] vs ಅರಿ [enemy]). By the Nadugannada era (12th-14th C.), ಱ had completely merged into standard ರ.',
    modernKannadaRule: 'ಹಳೆಗನ್ನಡ ಶಾಸನಗಳಲ್ಲಿ ಬರುವ "ಱ" (ಶಕಟ ರೇಫ) ಅಕ್ಷರವನ್ನು ಆಧುನಿಕ ಹೊಸಗನ್ನಡಕ್ಕೆ ರೂಪಾಂತರಿಸುವಾಗ ನಿಯಮಬದ್ಧವಾಗಿ ಸಾಮಾನ್ಯ "ರ" ಅಕ್ಷರವಾಗಿ ಪರಿವರ್ತಿಸಬೇಕು. ಉದಾ: ನರಿದಾವಿಱೆಯುಳ್ → ನರಿದಾವಿಳೆಯುಳ್ / ನರಿದಾವಿರೆಯಲ್ಲಿ, ಅಱಿದು → ಅರಿತು.',
    inscriptionalExample: 'ನರಿದಾವಿಱೆಯುಳ್ ನಾಡೊಳ್ (Halmidi, Line 2); ಪೆಱನಲ್ಲನ್ (Badami, Line 3)',
    modernEquivalent: 'ನರಿದಾವಿರೆಯ ನಾಡಿನಲ್ಲಿ; ಬೇರೆಯವನಲ್ಲನು',
    exceptionsOrCaveats: 'Must not be confused with dental "ರ". Minimal pairs in Old Kannada establish strict phonemic contrast.',
    lastUpdated: '14 Oct 2026',
    isDraftPrototype: true
  },
  {
    id: 'rule-phon-02',
    ruleCode: 'RULE-HAL-PHON-02',
    ruleType: 'phonological',
    title: 'Kula Repha (ೞ) Retroflex Approximant Mutation into ಳ / ರ',
    kannadaTitle: 'ಕುಳ / ಕ್ಷಳ ರೇಫ (ೞ) ಧ್ವನಿಮಾ ರೂಪಾಂತರ ನಿಯಮ',
    associatedScript: 'kadamba',
    associatedLanguage: 'purvada_halegannada',
    ruleVersion: 'v1.3.0',
    evidenceSource: 'Kavirajamarga (c. 850 CE); Shabdamanidarpana Sutra 28; Halmidi Inscription',
    reviewStatus: 'verified_epigraphist',
    applicability: '5th–10th Century CE epigraphs and copper plates',
    expertReviewRequired: true,
    description: 'Voiced retroflex central approximant (historically cognate to Tamil ழ and Malayalam ഴ). Between the 9th and 11th centuries, it underwent systematic split mutation: intervocalically or terminally mutating into "ಳ" (la), and in certain consonant environments into "ರ" (ra).',
    modernKannadaRule: 'ಶಾಸನೋಕ್ತ "ೞ" ಅಕ್ಷರವು 10ನೇ ಶತಮಾನದ ನಂತರ ನಿಯಮಬದ್ಧವಾಗಿ "ಳ" ಅಥವಾ "ರ" ಕಾರವಾಗಿ ಪರಿವರ್ತನೆ ಹೊಂದುತ್ತದೆ. ಉದಾ: ಪಾೞ್ಮಡಿ → ಪಾಲ್ಮಡಿ / ಹಲ್ಮಿಡಿ; ಪೂೞ್ → ಪೂಳ್ / ಹೂಳು; ಏೞ್ → ಏಳು.',
    inscriptionalExample: 'ಪಾೞ್ಮಡಿಯುಂ ಮುಳಿವಳ್ಳಿಯುಂ ಕೊಟ್ಟಾರ್ (Halmidi Inscription); ಬಾೞ್ಗೆ (Live long)',
    modernEquivalent: 'ಪಾಲ್ಮಡಿಯನ್ನೂ ಮುಳಿವಳ್ಳಿಯನ್ನೂ ಕೊಟ್ಟರು; ಬಾಳಿಗೆ / ಬಾಳಲಿ',
    exceptionsOrCaveats: 'Some archaic proper names freeze the archaic form in scholarly transliterations.',
    lastUpdated: '12 Oct 2026',
    isDraftPrototype: true
  },
  {
    id: 'rule-morph-03',
    ruleCode: 'RULE-HAL-MORPH-03',
    ruleType: 'morphological',
    title: 'Purvada Halegannada Locative Seventh Case Suffix (-oḷ / ಒಳ್)',
    kannadaTitle: 'ಸಪ್ತಮೀ ವಿಭಕ್ತಿ ಪ್ರತ್ಯಯ (-ಒಳ್) ಆಧುನಿಕೀಕರಣ ನಿಯಮ',
    associatedScript: 'badami_chalukya',
    associatedLanguage: 'halegannada',
    ruleVersion: 'v2.0.1',
    evidenceSource: 'Karnatakabhashabhushana Sutra 78; Halmidi Line 2; Kappe Arabhatta Inscription',
    reviewStatus: 'verified_epigraphist',
    applicability: 'All inscriptional corpora from 5th to 14th Century CE',
    expertReviewRequired: false,
    description: 'In Proto and Classical Old Kannada, the locative relationship (in, within, upon) is marked by the suffix "-oḷ" (ಒಳ್) or "-uḷ" (ಉಳ್). In Modern Kannada (Hosagannada), this corresponds to the locative ending "-alli" (ಅಲ್ಲಿ) or "-olage" (ಒಳಗೆ).',
    modernKannadaRule: 'ಶಾಸನದ ನಾಮಪದಗಳ ಅಂತ್ಯದಲ್ಲಿ ಬರುವ ಸಪ್ತಮೀ ವಿಭಕ್ತಿಯ "-ಒಳ್" ಪ್ರತ್ಯಯವನ್ನು ಆಧುನಿಕ ಕನ್ನಡದ "-ನಲ್ಲಿ" ಅಥವಾ "-ದಲ್ಲಿ" ಪ್ರತ್ಯಯಕ್ಕೆ ಸಮೀಕರಿಸಬೇಕು. ಉದಾ: ನಾಡೊಳ್ → ನಾಡಿನಲ್ಲಿ; ಬಟಹರೊಳ್ → ಯುದ್ಧದಲ್ಲಿ / ಹೋರಾಟದಲ್ಲಿ.',
    inscriptionalExample: 'ನಾಡೊಳ್ ಮೃಗೇಶನಾಗೇಂದ್ರಾಭಿಲರ್ (Halmidi); ಇರ್ವ್ವರಾ ಬಟಹರೊಳ್ ಅಳಿದ (Halmidi Line 4)',
    modernEquivalent: 'ನಾಡಿನಲ್ಲಿ ಮೃಗೇಶ-ನಾಗೇಂದ್ರರಂತೆ ಪ್ರಸಿದ್ಧರಾದವರು; ಇಬ್ಬರ ಕದನದಲ್ಲಿ ವೀರಮರಣ ಹೊಂದಿದ',
    lastUpdated: '10 Oct 2026',
    isDraftPrototype: true
  },
  {
    id: 'rule-morph-04',
    ruleCode: 'RULE-HAL-MORPH-04',
    ruleType: 'morphological',
    title: 'Honorific Dative Suffix (-aṅge / ಅಂಗೆ) Mutation',
    kannadaTitle: 'ಚತುರ್ಥೀ ವಿಭಕ್ತಿ ಪ್ರತ್ಯಯ (-ಅಂಗೆ/-ಅಂಕೆ) ರೂಪಾಂತರ ನಿಯಮ',
    associatedScript: 'badami_chalukya',
    associatedLanguage: 'halegannada',
    ruleVersion: 'v1.5.0',
    evidenceSource: 'Shabdamanidarpana Sutra 124; Badami Cliff Stele; Belur Hoysala epigraphs',
    reviewStatus: 'verified_epigraphist',
    applicability: 'Masculine animate nouns and royal honorific titles (5th–13th C. CE)',
    expertReviewRequired: false,
    description: 'The fourth grammatical case (dative: to/for) in Old Kannada appends the suffix "-aṅge" (ಅಂಗೆ) with a guttural nasal bindu to masculine and honorific bases, whereas modern Kannada consistently uses "-anige" (ಅನಿಗೆ) or "-ige" (ಇಗೆ).',
    modernKannadaRule: 'ಪುಲ್ಲಿಂಗ ಹಾಗೂ ಗೌರವಾನ್ವಿತ ವ್ಯಕ್ತಿವಾಚಕ ನಾಮಪದಗಳ ಕೊನೆಯಲ್ಲಿ ಬರುವ "-ಅಂಗೆ" ಚತುರ್ಥೀ ಪ್ರತ್ಯಯವನ್ನು ಹೊಸಗನ್ನಡದ "-ನಿಗೆ" ಪ್ರತ್ಯಯವಾಗಿ ಪರಿವರ್ತಿಸಬೇಕು. ಉದಾ: ಸಾಧುಗೆ → ಸಾಧುವಿಗೆ; ವಿಜಾಯರಸಂಗೆ → ವಿಜಯರಸನಿಗೆ; ಮಾಧುರ್ಯಂಗೆ → ಮಧುರ ಸ್ವಭಾವದವನಿಗೆ.',
    inscriptionalExample: 'ಸಾಧುಗೆ ಸಾಧು ಮಾಧುರ್ಯಂಗೆ ಮಾಧುರ್ಯಂ ಬಾದಿಪ್ಪ ಕಲಿಗೆ ಕಲಿಯುಗ ವಿಪರೀತನ್ (Badami Cliff)',
    modernEquivalent: 'ಸಾಧು ಪುರುಷನಿಗೆ ಸಾಧು, ಮಧುರನಾದವನಿಗೆ ಪರಮ ಮಧುರನು, ಪೀಡಿಸುವ ಯೋಧನಿಗೆ ಕಲಿಯುಗದ ಯಮನು',
    lastUpdated: '08 Oct 2026',
    isDraftPrototype: true
  },
  {
    id: 'rule-orth-05',
    ruleCode: 'RULE-HAL-ORTH-05',
    ruleType: 'orthographical',
    title: 'Epigraphical Adesha Sandhi (Consonant Softening: k/t/p → g/d/b)',
    kannadaTitle: 'ಶಾಸನೋಕ್ತ ಆದೇಶ ಸಂಧಿ ಮತ್ತು ವ್ಯಂಜನ ಮೃದುತ್ವ ನಿಯಮ',
    associatedScript: 'rashtrakuta',
    associatedLanguage: 'halegannada',
    ruleVersion: 'v1.2.0',
    evidenceSource: 'Shabdamanidarpana Sandhi Prakarana; Kavirajamarga I.62',
    reviewStatus: 'preliminary_draft',
    applicability: 'Compound words, royal titles, and territorial endowments across 8th–14th C.',
    expertReviewRequired: true,
    description: 'When two words join in inscriptional compound nouns, initial voiceless plosives (k, t, p) regularly soften into their voiced counterparts (g, d, b), frequently retaining gemination in epigraphical stone engravings (e.g. bāḷ + kaccu → bāgaḷchu / bāḷgaccu).',
    modernKannadaRule: 'ಶಾಸನಗಳಲ್ಲಿ ಸಮಾಸ ಪದಗಳು ಕೂಡುವಾಗ ಮೊದಲ ಪದದ ಅಂತ್ಯ ಸ್ವರದ ನಂತರ ಬರುವ ಕ/ತ/ಪ ವ್ಯಂಜನಗಳು ಕ್ರಮವಾಗಿ ಗ/ದ/ಬ ಕಾರಗಳಾಗಿ ಆದೇಶವಾಗುತ್ತವೆ. ವಿಶ್ಲೇಷಣೆ ಮಾಡುವಾಗ ಮೂಲ ಪದವನ್ನು ಬೇರ್ಪಡಿಸಿ (ವಾಳ್/ಬಾಳ್ + ಕಚ್ಚು = ಬಾಳ್ಗಚ್ಚು) ಅರ್ಥೈಸಬೇಕು.',
    inscriptionalExample: 'ಬಾಗಳ್ಚು ಕೊಟ್ಟಾರ್ (Halmidi Line 6); ಬಾಳ್ಗಚ್ಚು (Heroic endowment)',
    modernEquivalent: 'ವೀರಭೋಗವಾಗಿ ಕತ್ತಿಯ ಕೊಡುಗೆಯಾಗಿ ಭೂಮಿಯನ್ನು ದಾನ ನೀಡಿದರು',
    lastUpdated: '05 Oct 2026',
    isDraftPrototype: true
  },
  {
    id: 'rule-metr-06',
    ruleCode: 'RULE-HAL-METR-06',
    ruleType: 'metric_poetic',
    title: 'Classical Tripadi Moraic Metrical Verification',
    kannadaTitle: 'ಶಾಸನೋಕ್ತ ತ್ರಿಪದಿ ಛಂದಸ್ಸು ಮಾತ್ರಾ ವಿನ್ಯಾಸ ಮತ್ತು ಪಾದ ಪರಿಶೀಲನೆ',
    associatedScript: 'badami_chalukya',
    associatedLanguage: 'halegannada',
    ruleVersion: 'v2.1.0',
    evidenceSource: 'Chhandombudhi by Nagavarma I (c. 990 CE); Kappe Arabhatta Inscription (c. 700 CE)',
    reviewStatus: 'verified_epigraphist',
    applicability: 'Epigraphical heroic steles, memorial verses, and cliff epigraphs',
    expertReviewRequired: true,
    description: 'Native Kannada lyrical metre consisting of 3 lines structured with 11 Ganas (metrical units). The first line contains 4 ganas, the second line 4 ganas, and the third line 3 ganas, with caesura (Yati) placed strategically for oral recitative singing.',
    modernKannadaRule: 'ತ್ರಿಪದಿ ಛಂದಸ್ಸಿನ ಶಾಸನ ಪದ್ಯಗಳನ್ನು ಮೂರು ಸಾಲುಗಳ ಸಾಂಪ್ರದಾಯಿಕ ಗಣ ವಿನ್ಯಾಸದೊಂದಿಗೆ (ನಾಲ್ಕು, ನಾಲ್ಕು ಮತ್ತು ಮೂರು ಗಣಗಳು) ವಿಂಗಡಿಸಿ, ಪಾದಾದಿ ಪ್ರಾಸವನ್ನು ಗುರುತಿಸಿ ಭಾವಾನುವಾದ ನೀಡಬೇಕು.',
    inscriptionalExample: 'ಸಾಧುಗೆ ಸಾಧು ಮಾಧುರ್ಯಂಗೆ ಮಾಧುರ್ಯಂ / ಬಾದಿಪ್ಪ ಕಲಿಗೆ ಕಲಿಯುಗ ವಿಪರೀತನ್ / ಮಾಧವನ್ ಇತ್ತನ್ ಪೆರನಲ್ಲನ್',
    modernEquivalent: 'ಒಳ್ಳೆಯವರಿಗೆ ಒಳ್ಳೆಯವನು, ಮೃದು ಸ್ವಭಾವದವರಿಗೆ ಮಧುರನು / ಹಿಂಸಿಸುವ ಶತ್ರುಗಳಿಗೆ ಕಲಿಯುಗದ ಯಮನು / ಇವನು ಸಾಕ್ಷಾತ್ ಮಾಧವನೇ ಹೊರತು ಅನ್ಯನಲ್ಲ',
    lastUpdated: '11 Oct 2026',
    isDraftPrototype: true
  },
  {
    id: 'rule-pale-07',
    ruleCode: 'RULE-ASH-PALE-07',
    ruleType: 'paleographical',
    title: 'Ashokan Rectilinear Stroke & Talakattu-Absence Validator',
    kannadaTitle: 'ಅಶೋಕನ ಬ್ರಾಹ್ಮೀ ರೇಖಾಗಣಿತ ಮತ್ತು ತಲೆಕಟ್ಟು ರಹಿತತೆಯ ದೃಢೀಕರಣ',
    associatedScript: 'ashoka',
    associatedLanguage: 'prakrit',
    ruleVersion: 'v1.0.4',
    evidenceSource: 'Maski Minor Rock Edict, Brahmagiri Edicts, Corpus Inscriptionum Indicarum Vol. I',
    reviewStatus: 'verified_epigraphist',
    applicability: '3rd Century BCE granitic cliff inscriptions and rock edicts',
    expertReviewRequired: false,
    description: 'Ashokan Brahmi characters in Karnataka epigraphy exhibit strict geometric rectilinearity: zero cursive loops, perpendicular strokes chiseled at 90-degree intersections, and total absence of upper serifs or Talakattu.',
    modernKannadaRule: 'ಅಶೋಕನ ಕಾಲದ ಶಾಸನ ಲಿಪಿಗಳಲ್ಲಿ ಯಾವುದೇ ತಲೆಕಟ್ಟು ಇರುವುದಿಲ್ಲ. ಪ್ರತಿ ಅಕ್ಷರವೂ ರೇಖಾಗಣಿತದ ನೇರ ರೇಖೆಗಳು ಮತ್ತು ವೃತ್ತಗಳಿಂದ ಕೂಡಿರುತ್ತದೆ. ಲಿಪಿ ವಿಶ್ಲೇಷಕವು ಯಾವುದೇ ತಲೆಕಟ್ಟನ್ನು ಶೋಧಿಸಬಾರದು.',
    inscriptionalExample: 'ದೇವಾನಾಂಪಿಯಸ ಅಸೋಕಸ (Maski Rock Edict Line 1)',
    modernEquivalent: 'ದೇವತೆಗಳಿಗೆ ಪ್ರಿಯನಾದ ಅಶೋಕ ಮಹಾರಾಜನ...',
    lastUpdated: '01 Oct 2026',
    isDraftPrototype: true
  },
  {
    id: 'rule-pale-08',
    ruleCode: 'RULE-KAD-PALE-08',
    ruleType: 'paleographical',
    title: 'Kadamba Box-Head (Petika-shirsha) Terminal Verification',
    kannadaTitle: 'ಕದಂಬ ಪೇಟಿಕಾ-ಶೀರ್ಷ (ಪೆಟ್ಟಿಗೆ ತಲೆಕಟ್ಟು) ಲಿಪಿ ಲಕ್ಷಣ ವಿಶ್ಲೇಷಣೆ',
    associatedScript: 'kadamba',
    associatedLanguage: 'purvada_halegannada',
    ruleVersion: 'v1.1.2',
    evidenceSource: 'Halmidi Stele; Talagunda Pillar Inscription; Banavasi Kadamba Charters',
    reviewStatus: 'verified_epigraphist',
    applicability: '4th–6th Century CE sandstone and copper plate engravings',
    expertReviewRequired: true,
    description: 'The defining diagnostic hallmark of Kadamba script is the box-head (Petika-shirsha) engraved at the apex of vertical consonants (ka, ga, ca, ta, pa). Formed by two horizontal incisions connected by two vertical cuts, leaving a hollow or solid square.',
    modernKannadaRule: 'ಕದಂಬ ಲಿಪಿಯ ಪ್ರತಿಯೊಂದು ಲಂಬಾಕ್ಷರದ ತಲೆಯ ಮೇಲೆಯೂ ಚೌಕಾಕಾರದ ಪೆಟ್ಟಿಗೆಯಂತಹ "ಪೇಟಿಕಾ ಶೀರ್ಷ" ಇರುತ್ತದೆ. ಇದು ನಂತರದ ಬಾದಾಮಿ ಚಾಲುಕ್ಯ ಲಿಪಿಯಲ್ಲಿ ಬಾಗಿದ ಕೊಕ್ಕೆಯಾಗಿ ರೂಪಾಂತರಗೊಳ್ಳುತ್ತದೆ.',
    inscriptionalExample: 'ಶ್ರೀಮತ್ ಕದಂಬಪನ್ ಕಾಗುಸ್ಥಭಟ್ಟೋರನ್ (Halmidi Line 1)',
    modernEquivalent: 'ಶ್ರೀಮಂತ ಕದಂಬ ರಾಜ ಕಾಕುಸ್ಥವರ್ಮನು...',
    lastUpdated: '03 Oct 2026',
    isDraftPrototype: true
  },
  {
    id: 'rule-pale-09',
    ruleCode: 'RULE-HOY-PALE-09',
    ruleType: 'paleographical',
    title: 'Hoysala Chloritic Schist Double-Loop & V-Talakattu Parser',
    kannadaTitle: 'ಹೊಯ್ಸಳ ಬಳಪದ ಕಲ್ಲಿನ ಸುರುಳಿ ಮತ್ತು ವಿ-ಆಕಾರದ ತಲೆಕಟ್ಟು ನಿಯಮ',
    associatedScript: 'hoysala',
    associatedLanguage: 'halegannada',
    ruleVersion: 'v1.0.0',
    evidenceSource: 'Belur & Halebidu Temple Steles; Epigraphia Carnatica Vol. V & XV',
    reviewStatus: 'needs_peer_review',
    applicability: '11th–14th Century CE chloritic schist monumental inscriptions',
    expertReviewRequired: true,
    description: 'Hoysala calligraphers took advantage of soft soapstone (chloritic schist) to engrave deeply undercut double spirals, intricate recursive curls, and standard V-shaped downward talakattus with multi-tiered subscript stacking.',
    modernKannadaRule: 'ಹೊಯ್ಸಳ ಶಾಸನ ಲಿಪಿಯಲ್ಲಿ ಗರಿಷ್ಠ ಅಲಂಕಾರಿಕ ಸುರುಳಿಗಳು ಮತ್ತು ಕೆಳಮುಖವಾದ ವಿ-ಆಕಾರದ ತಲೆಕಟ್ಟುಗಳು ಕಂಡುಬರುತ್ತವೆ. ಸಂಯುಕ್ತಾಕ್ಷರಗಳು ಲಂಬವಾಗಿ ಕೆಳಗೆ ಜೋಡಿಸಲ್ಪಟ್ಟಿರುತ್ತವೆ.',
    inscriptionalExample: 'ಶ್ರೀಮತು ಪ್ರತಾಪ ಹೊಯ್ಸಳ ಶ್ರೀ ವೀರ ಬಿಟ್ಟಿದೇವ ವಿಷ್ಣುವರ್ಧನದೇವರು (Belur)',
    modernEquivalent: 'ಶ್ರೀಮಂತ ಪ್ರತಾಪಶಾಲಿಯಾದ ಹೊಯ್ಸಳ ವೀರ ಬಿಟ್ಟಿದೇವ ವಿಷ್ಣುವರ್ಧನ ಮಹಾರಾಜರು...',
    lastUpdated: '09 Oct 2026',
    isDraftPrototype: true
  },
  {
    id: 'rule-pale-10',
    ruleCode: 'RULE-VIJ-PALE-10',
    ruleType: 'paleographical',
    title: 'Vijayanagara Granite Decoupling & Kannada-Telugu Differentiation',
    kannadaTitle: 'ವಿಜಯನಗರ ಕಾಲದ ಗ್ರಾನೈಟ್ ಲಿಪಿ ಸರಳೀಕರಣ ಮತ್ತು ಕನ್ನಡ-ತೆಲುಗು ಪ್ರತ್ಯೇಕತೆ',
    associatedScript: 'vijayanagara',
    associatedLanguage: 'nadugannada',
    ruleVersion: 'v1.2.0',
    evidenceSource: 'Hampi Virupaksha Stele (1509 CE); South Indian Inscriptions Vol. IV',
    reviewStatus: 'verified_epigraphist',
    applicability: '14th–16th Century CE granite steles and copper charters',
    expertReviewRequired: false,
    description: 'Due to the hardness of granite used in Vijayanagara temple complexes, ornate soapstone spirals were abandoned in favor of sturdy, isolated circular glyph bodies. This era marks the definitive morphological divergence between Kannada and Telugu scripts.',
    modernKannadaRule: 'ವಿಜಯನಗರ ಶಾಸನ ಲಿಪಿಯು ಕಠಿಣ ಗ್ರಾನೈಟ್ ಕಲ್ಲಿನಲ್ಲಿ ಕೆತ್ತಲಾದ್ದರಿಂದ ಸರಳ ಹಾಗೂ ಸ್ವತಂತ್ರ ವೃತ್ತಾಕಾರದ ಅಕ್ಷರಗಳನ್ನು ಹೊಂದಿರುತ್ತದೆ. ಇಲ್ಲಿ ಕನ್ನಡ ಮತ್ತು ತೆಲುಗು ಲಿಪಿಗಳು ಸಂಪೂರ್ಣವಾಗಿ ಪ್ರತ್ಯೇಕಗೊಳ್ಳುತ್ತವೆ.',
    inscriptionalExample: 'ರಾಜಾಧಿರಾಜ ರಾಜಪರಮೇಶ್ವರ ಶ್ರೀ ವೀರಪ್ರತಾಪ ಶ್ರೀ ಕೃಷ್ಣದೇವರಾಯ ಮಹಾರಾಯರು (Hampi)',
    modernEquivalent: 'ರಾಜಾಧಿರಾಜ, ರಾಜಪರಮೇಶ್ವರ, ಶ್ರೀ ವೀರಪ್ರತಾಪ ಶ್ರೀ ಕೃಷ್ಣದೇವರಾಯ ಮಹಾರಾಯರು...',
    lastUpdated: '13 Oct 2026',
    isDraftPrototype: true
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
