import React, { useState, useEffect, useMemo } from 'react';
import { HistoricalRuleItem } from '../../types';
import { epigraphyService } from '../../services/epigraphyService';
import {
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  ArrowRight,
  Home,
  SlidersHorizontal,
  Layers,
  Feather,
  Calendar,
  ShieldCheck,
  Filter,
  BarChart2,
  List as ListIcon,
  Columns,
  MoreHorizontal,
  BookOpen,
  FileText,
  UserCheck,
  Check
} from 'lucide-react';
import sampleStele from '../../assets/sample-stele.jpg';

// Comprehensive Enriched Rules Data matching the exact mockup
const CANONICAL_RULES_DATABASE: HistoricalRuleItem[] = [
  {
    id: 'rule-phon-01',
    ruleCode: 'RULE-HAL-PHON-01',
    ruleType: 'phonological',
    title: 'Sakata Repha (ಱ) Alveolar Trill Retention & Loss',
    kannadaTitle: 'ಶಕಟ ರೇಫ (ಱ) ಧ್ವನಿಯ ಉಳಿಕೆ ಮತ್ತು ಲೋಪದ ನಿಯಮ',
    associatedScript: 'kadamba',
    associatedLanguage: 'purvada_halegannada',
    ruleVersion: 'v1.4.2',
    evidenceSource: 'Shabdamanidarpana Sutra 32; Halmidi Stele line 2; Kavirajamarga I.48',
    reviewStatus: 'verified_epigraphist',
    applicability: '4th–6th Century CE inscriptions (Kadamba, Badami Chalukya steles)',
    expertReviewRequired: true,
    description: 'In early Kannada inscriptions (Kadamba period), the alveolar trill represented by Sakata Repha (ಱ) is retained in word-initial and intervocalic positions, but often lost or simplified in final positions and certain sandhi environments.',
    modernKannadaRule: 'ಹಳೆಗನ್ನಡ ಶಾಸನಗಳಲ್ಲಿ ಬರುವ "ಱ" (ಶಕಟ ರೇಫ) ಅಕ್ಷರವನ್ನು ಆಧುನಿಕ ಹೊಸಗನ್ನಡಕ್ಕೆ ರೂಪಾಂತರಿಸುವಾಗ ನಿಯಮಬದ್ಧವಾಗಿ ಸಾಮಾನ್ಯ "ರ" ಅಕ್ಷರವಾಗಿ ಪರಿವರ್ತಿಸಬೇಕು. ಉದಾ: ನರಿದಾವಿಱೆಯುಳ್ → ನರಿದಾವಿರೆಯಲ್ಲಿ, ಅಱಿದು → ಅರಿತು.',
    inscriptionalExample: 'ನರಿದಾವಿಱೆಯುಳ್ ನಾಡೊಳ್ (Halmidi, Line 2); ಪೆಱನಲ್ಲನ್ (Badami, Line 3)',
    modernEquivalent: 'ನರಿದಾವಿರೆಯ ನಾಡಿನಲ್ಲಿ; ಬೇರೆಯವನಲ್ಲನು',
    exceptionsOrCaveats: 'Must not be confused with dental "ರ". Minimal pairs in Old Kannada establish strict phonemic contrast.',
    lastUpdated: '12 Mar 2024',
    isDraftPrototype: true,
    confidenceScore: 96,
    targetScriptLabel: 'Kadamba',
    periodLabel: '4th–6th Century CE',
    reviewerName: 'Dr. Shivarama Bhat',
    reviewerTitle: 'Epigraphy Expert, Kannada University',
    reviewDate: '12 Mar 2024',
    ruleSummary: 'In early Kannada inscriptions (Kadamba period), the alveolar trill represented by Sakata Repha (ಱ) is retained in word-initial and intervocalic positions, but often lost or simplified in final positions and certain sandhi environments.',
    examplesList: [
      {
        title: 'Word-initial (Retention)',
        originalText: 'ಱಾಜ',
        iastText: 'rāja',
        modernText: 'ರಾಜ',
        explanation: 'Sakata Repha retained in initial position.',
        tagType: 'initial'
      },
      {
        title: 'Final Position (Loss)',
        originalText: 'ಕರಱ್',
        iastText: 'karaṟ',
        modernText: 'ಕರ',
        explanation: 'Sakata Repha lost in final position.',
        tagType: 'final'
      }
    ]
  },
  {
    id: 'rule-phon-02',
    ruleCode: 'RULE-HAL-PHON-02',
    ruleType: 'phonological',
    title: 'Kula Repha (ೞ) Retroflex Approximation Mutation into ಳ / ರ',
    kannadaTitle: 'ಕುಳ ರೇಫ (ೞ) ಧ್ವನಿಯ ರೂಪಾಂತರ ನಿಯಮ',
    associatedScript: 'kadamba',
    associatedLanguage: 'purvada_halegannada',
    ruleVersion: 'v1.3.0',
    evidenceSource: 'Kavirajamarga (c. 850 CE); Shabdamanidarpana Sutra 28; Halmidi Inscription',
    reviewStatus: 'verified_epigraphist',
    applicability: '4th–6th Century CE epigraphs and copper plates',
    expertReviewRequired: true,
    description: 'Voiced retroflex central approximant (historically cognate to Tamil ழ and Malayalam ഴ). Between the 9th and 11th centuries, it underwent systematic split mutation into ಳ or ರ.',
    modernKannadaRule: 'ಶಾಸನೋಕ್ತ "ೞ" ಅಕ್ಷರವು 10ನೇ ಶತಮಾನದ ನಂತರ ನಿಯಮಬದ್ಧವಾಗಿ "ಳ" ಅಥವಾ "ರ" ಕಾರವಾಗಿ ಪರಿವರ್ತನೆ ಹೊಂದುತ್ತದೆ. ಉದಾ: ಪಾೞ್ಮಡಿ → ಹಲ್ಮಿಡಿ; ಏೞ್ → ಏಳು.',
    inscriptionalExample: 'ಪಾೞ್ಮಡಿಯುಂ ಮುಳಿವಳ್ಳಿಯುಂ ಕೊಟ್ಟಾರ್ (Halmidi Inscription); ಬಾೞ್ಗೆ',
    modernEquivalent: 'ಪಾಲ್ಮಡಿಯನ್ನೂ ಮುಳಿವಳ್ಳಿಯನ್ನೂ ಕೊಟ್ಟರು; ಬಾಳಿಗೆ / ಬಾಳಲಿ',
    exceptionsOrCaveats: 'Some archaic proper names freeze the archaic form in scholarly transliterations.',
    lastUpdated: '08 Mar 2024',
    isDraftPrototype: true,
    confidenceScore: 94,
    targetScriptLabel: 'Kadamba',
    periodLabel: '4th–6th Century CE',
    reviewerName: 'Prof. M. Chidananda Murthy',
    reviewerTitle: 'Senior Kannada Epigraphist, Bangalore',
    reviewDate: '08 Mar 2024',
    ruleSummary: 'Voiced retroflex central approximant (ೞ) systematic split mutation: intervocalically mutating into "ಳ" (la), and in consonant clusters into "ರ" (ra).',
    examplesList: [
      {
        title: 'Intervocalic Mutation to ಳ',
        originalText: 'ಪಾೞ್ಮಡಿ',
        iastText: 'pāḻmaḍi',
        modernText: 'ಪಾಲ್ಮಡಿ / ಹಲ್ಮಿಡಿ',
        explanation: 'Retroflex approximant mutated to lateral ಳ.',
        tagType: 'medial'
      },
      {
        title: 'Terminal Mutation to ಳ',
        originalText: 'ಏೞ್',
        iastText: 'ēḻ',
        modernText: 'ಏಳು',
        explanation: 'Archaic final ೞ developed into standard ಳು.',
        tagType: 'final'
      }
    ]
  },
  {
    id: 'rule-morph-03',
    ruleCode: 'RULE-HAL-MORPH-03',
    ruleType: 'morphological',
    title: 'Purvada Halegannada Locative Seventh Case Suffix (-oḷ / ಒಳ್)',
    kannadaTitle: 'ಪೂರ್ವದ ಹಳೆಗನ್ನಡ ಸಪ್ತಮೀ (೭ನೇ ವಿಭಕ್ತಿ) ಪ್ರತ್ಯಯ ನಿಯಮ',
    associatedScript: 'badami_chalukya',
    associatedLanguage: 'halegannada',
    ruleVersion: 'v2.0.1',
    evidenceSource: 'Karnatakabhashabhushana Sutra 78; Halmidi Line 2; Kappe Arabhatta Inscription',
    reviewStatus: 'verified_epigraphist',
    applicability: '6th–8th Century CE inscriptional corpora',
    expertReviewRequired: false,
    description: 'In Proto and Classical Old Kannada, the locative relationship (in, within, upon) is marked by the suffix "-oḷ" (ಒಳ್). In Modern Kannada, this corresponds to the ending "-alli" (ಅಲ್ಲಿ) or "-olage" (ಒಳಗೆ).',
    modernKannadaRule: 'ಶಾಸನದ ನಾಮಪದಗಳ ಅಂತ್ಯದಲ್ಲಿ ಬರುವ ಸಪ್ತಮೀ ವಿಭಕ್ತಿಯ "-ಒಳ್" ಪ್ರತ್ಯಯವನ್ನು ಆಧುನಿಕ ಕನ್ನಡದ "-ನಲ್ಲಿ" ಅಥವಾ "-ದಲ್ಲಿ" ಪ್ರತ್ಯಯಕ್ಕೆ ಸಮೀಕರಿಸಬೇಕು.',
    inscriptionalExample: 'ನಾಡೊಳ್ ಮೃಗೇಶನಾಗೇಂದ್ರಾಭಿಲರ್ (Halmidi); ಇರ್ವ್ವರಾ ಬಟಹರೊಳ್ ಅಳಿದ',
    modernEquivalent: 'ನಾಡಿನಲ್ಲಿ ಮೃಗೇಶ-ನಾಗೇಂದ್ರರಂತೆ ಪ್ರಸಿದ್ಧರಾದವರು; ಇಬ್ಬರ ಕದನದಲ್ಲಿ ವೀರಮರಣ ಹೊಂದಿದ',
    lastUpdated: '15 Feb 2024',
    isDraftPrototype: true,
    confidenceScore: 92,
    targetScriptLabel: 'Badami Chalukya',
    periodLabel: '6th–8th Century CE',
    reviewerName: 'Dr. D. V. Gopal',
    reviewerTitle: 'Senior Epigraphist, ASI Mysore',
    reviewDate: '15 Feb 2024',
    ruleSummary: 'Locative relationship marker "-oḷ" (ಒಳ್) converts systematically to modern standard locative case markers "-alli" or "-olage".',
    examplesList: [
      {
        title: 'Territorial Locative',
        originalText: 'ನಾಡೊಳ್',
        iastText: 'nāḍoḷ',
        modernText: 'ನಾಡಿನಲ್ಲಿ',
        explanation: 'Case suffix -oḷ mapped to modern -alli.',
        tagType: 'final'
      },
      {
        title: 'Contextual Action Locative',
        originalText: 'ಬಟಹರೊಳ್',
        iastText: 'baṭaharoḷ',
        modernText: 'ಕದನದಲ್ಲಿ / ಯುದ್ಧದಲ್ಲಿ',
        explanation: 'Locative marker applied to archaic battle noun.',
        tagType: 'final'
      }
    ]
  },
  {
    id: 'rule-morph-04',
    ruleCode: 'RULE-HAL-MORPH-04',
    ruleType: 'morphological',
    title: 'Honorific Dative Suffix (-aṅge / ಅಂಗೆ) Mutation',
    kannadaTitle: 'ಸನ್ಮಾನ ವಾಚಕ ಪ್ರತ್ಯಯ ರೂಪಾಂತರ ನಿಯಮ',
    associatedScript: 'badami_chalukya',
    associatedLanguage: 'halegannada',
    ruleVersion: 'v1.5.0',
    evidenceSource: 'Shabdamanidarpana Sutra 124; Badami Cliff Stele; Belur Hoysala epigraphs',
    reviewStatus: 'verified_epigraphist',
    applicability: '6th–8th Century CE masculine animate nouns and royal honorific titles',
    expertReviewRequired: false,
    description: 'The fourth grammatical case (dative: to/for) in Old Kannada appends the suffix "-aṅge" (ಅಂಗೆ) with a guttural nasal bindu, whereas modern Kannada consistently uses "-anige" (ಅನಿಗೆ) or "-ige" (ಇಗೆ).',
    modernKannadaRule: 'ಪುಲ್ಲಿಂಗ ಹಾಗೂ ಗೌರವಾನ್ವಿತ ವ್ಯಕ್ತಿವಾಚಕ ನಾಮಪದಗಳ ಕೊನೆಯಲ್ಲಿ ಬರುವ "-ಅಂಗೆ" ಚತುರ್ಥೀ ಪ್ರತ್ಯಯವನ್ನು ಹೊಸಗನ್ನಡದ "-ನಿಗೆ" ಪ್ರತ್ಯಯವಾಗಿ ಪರಿವರ್ತಿಸಬೇಕು.',
    inscriptionalExample: 'ಸಾಧುಗೆ ಸಾಧು ಮಾಧುರ್ಯಂಗೆ ಮಾಧುರ್ಯಂ ಬಾದಿಪ್ಪ ಕಲಿಗೆ ಕಲಿಯುಗ ವಿಪರೀತನ್',
    modernEquivalent: 'ಸಾಧು ಪುರುಷನಿಗೆ ಸಾಧು, ಮಧುರನಾದವನಿಗೆ ಪರಮ ಮಧುರನು, ಪೀಡಿಸುವ ಯೋಧನಿಗೆ ಕಲಿಯುಗದ ಯಮನು',
    lastUpdated: '10 Feb 2024',
    isDraftPrototype: true,
    confidenceScore: 96,
    targetScriptLabel: 'Badami Chalukya',
    periodLabel: '6th–8th Century CE',
    reviewerName: 'Dr. Shivarama Bhat',
    reviewerTitle: 'Epigraphy Expert, Kannada University',
    reviewDate: '10 Feb 2024',
    ruleSummary: 'Classical honorific dative marker "-aṅge" with guttural bindu softens to modern "-anige" across all royal personal inscriptions.',
    examplesList: [
      {
        title: 'Heroic Honorific Dative',
        originalText: 'ಮಾಧುರ್ಯಂಗೆ',
        iastText: 'mādhuryange',
        modernText: 'ಮಧುರ ಸ್ವಭಾವದವನಿಗೆ',
        explanation: 'Honorific personal dative case shift.',
        tagType: 'final'
      },
      {
        title: 'Warrior Dative Target',
        originalText: 'ಕಲಿಗೆ',
        iastText: 'kalige',
        modernText: 'ವೀರ ಯೋಧನಿಗೆ',
        explanation: 'Dative case marking recipient of chivalric retribution.',
        tagType: 'final'
      }
    ]
  },
  {
    id: 'rule-orth-05',
    ruleCode: 'RULE-HAL-ORTH-05',
    ruleType: 'orthographical',
    title: 'Epigraphical Adesha Sandhi (Consonant Softening: k/t/p → g/d/b)',
    kannadaTitle: 'ಲಿಪಿನ್ಯಾಸೀಯ ಆದೇಶ ಸಂಧಿ (ವ್ಯಂಜನ ಮೃದುತ್ವ ಸಿದ್ಧಿ)',
    associatedScript: 'rashtrakuta',
    associatedLanguage: 'halegannada',
    ruleVersion: 'v1.2.1',
    evidenceSource: 'Shabdamanidarpana Sandhi Prakarana; Kavirajamarga I.62',
    reviewStatus: 'preliminary_draft',
    applicability: '8th–10th Century CE compound nouns and territorial grants',
    expertReviewRequired: true,
    description: 'When two words join in inscriptional compound nouns, initial voiceless plosives (k, t, p) regularly soften into their voiced counterparts (g, d, b), frequently retaining gemination in epigraphical stone engravings.',
    modernKannadaRule: 'ಶಾಸನಗಳಲ್ಲಿ ಸಮಾಸ ಪದಗಳು ಕೂಡುವಾಗ ಮೊದಲ ಪದದ ಅಂತ್ಯ ಸ್ವರದ ನಂತರ ಬರುವ ಕ/ತ/ಪ ವ್ಯಂಜನಗಳು ಕ್ರಮವಾಗಿ ಗ/ದ/ಬ ಕಾರಗಳಾಗಿ ಆದೇಶವಾಗುತ್ತವೆ.',
    inscriptionalExample: 'ಬಾಗಳ್ಚು ಕೊಟ್ಟಾರ್ (Halmidi Line 6); ಬಾಳ್ಗಚ್ಚು (Heroic endowment)',
    modernEquivalent: 'ವೀರಭೋಗವಾಗಿ ಕತ್ತಿಯ ಕೊಡುಗೆಯಾಗಿ ಭೂಮಿಯನ್ನು ದಾನ ನೀಡಿದರು',
    lastUpdated: '22 Jan 2024',
    isDraftPrototype: true,
    confidenceScore: 78,
    targetScriptLabel: 'Rashtrakuta',
    periodLabel: '8th–10th Century CE',
    reviewerName: 'Dr. S. Rajasekhara',
    reviewerTitle: 'Karnatak University Dharwad',
    reviewDate: '22 Jan 2024',
    ruleSummary: 'Inscriptional compound junction transforms initial voiceless consonants k, t, p into voiced g, d, b with epigraphical gemination.',
    examplesList: [
      {
        title: 'Compound Plosive Softening',
        originalText: 'ಬಾಳ್ + ಕಚ್ಚು',
        iastText: 'bāḷ + kaccu',
        modernText: 'ಬಾಳ್ಗಚ್ಚು',
        explanation: 'Initial k softened to voiced plosive g.',
        tagType: 'medial'
      }
    ]
  },
  {
    id: 'rule-orth-06',
    ruleCode: 'RULE-HAL-ORTH-06',
    ruleType: 'orthographical',
    title: 'Vowel Length Normalization in Stone Inscriptions',
    kannadaTitle: 'ಶಿಲಾಶಾಸನಗಳಲ್ಲಿ ಸ್ವರದ ಹ್ರಸ್ವತ್ವ ಸಾಮ್ಯೀಕರಣ ನಿಯಮ',
    associatedScript: 'hoysala',
    associatedLanguage: 'halegannada',
    ruleVersion: 'v1.0.0',
    evidenceSource: 'Belur Temple Epigraphs; Epigraphia Carnatica Vol. V',
    reviewStatus: 'needs_peer_review',
    applicability: '10th–14th Century CE Hoysala epigraphs',
    expertReviewRequired: true,
    description: 'Due to chisel constraints on soapstone and rapid calligraphic drafting, long and short matras (e/ē and o/ō) are written interchangeably in pre-print stone inscriptions.',
    modernKannadaRule: 'ಶಾಸನಗಳಲ್ಲಿ ಹ್ರಸ್ವ-ದೀರ್ಘ ಸ್ವರ ಚಿಹ್ನೆಗಳು ಸಂದರ್ಭಾನುಸಾರ ಬದಲಾಗುವುದರಿಂದ, ಛಂದಸ್ಸು ಮತ್ತು ವಾಕ್ಯಾರ್ಥದ ಆಧಾರದ ಮೇಲೆ ಆಧುನಿಕ ದೀರ್ಘ ಸ್ವರವನ್ನು ನಿಗದಿಪಡಿಸಬೇಕು.',
    inscriptionalExample: 'ಎಸೆವ / ಏಸೆವ; ಕೊಡು / ಕೋಡು',
    modernEquivalent: 'ಶೋಭಿಸುವ; ನೀಡುವ',
    lastUpdated: '18 Jan 2024',
    isDraftPrototype: true,
    confidenceScore: 82,
    targetScriptLabel: 'Hoysala',
    periodLabel: '10th–14th Century CE',
    reviewerName: 'Prof. K. R. Ganesh',
    reviewerTitle: 'Epigraphy Dept, Mysore University',
    reviewDate: '18 Jan 2024',
    ruleSummary: 'Calligraphic variance between short and long vowel strokes requires metrical context reconstruction in Hoysala soapstone steles.',
    examplesList: [
      {
        title: 'Vowel Length Contextualization',
        originalText: 'ಎಸೆವ',
        iastText: 'eseva',
        modernText: 'ಏಸೆವ (ಶೋಭಿಸುವ)',
        explanation: 'Short vowel glyph contextually elongated by metre.',
        tagType: 'initial'
      }
    ]
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
    modernKannadaRule: 'ಅಶೋಕನ ಕಾಲದ ಶಾಸನ ಲಿಪಿಗಳಲ್ಲಿ ಯಾವುದೇ ತಲೆಕಟ್ಟು ಇರುವುದಿಲ್ಲ. ಪ್ರತಿ ಅಕ್ಷರವೂ ರೇಖಾಗಣಿತದ ನೇರ ರೇಖೆಗಳು ಮತ್ತು ವೃತ್ತಗಳಿಂದ ಕೂಡಿರುತ್ತದೆ.',
    inscriptionalExample: 'ದೇವಾನಾಂಪಿಯಸ ಅಸೋಕಸ (Maski Rock Edict Line 1)',
    modernEquivalent: 'ದೇವತೆಗಳಿಗೆ ಪ್ರಿಯನಾದ ಅಶೋಕ ಮಹಾರಾಜನ...',
    lastUpdated: '05 Jan 2024',
    isDraftPrototype: true,
    confidenceScore: 98,
    targetScriptLabel: 'Ashoka',
    periodLabel: '3rd Century BCE',
    reviewerName: 'Dr. Shivarama Bhat',
    reviewerTitle: 'Epigraphy Expert, Kannada University',
    reviewDate: '05 Jan 2024',
    ruleSummary: 'Ashokan Brahmi strict geometric validation requires 90-degree orthogonal line segments and zero upper headmark serifs.',
    examplesList: [
      {
        title: 'Royal Name Cartouche',
        originalText: 'ದೇವಾನಾಂಪಿಯಸ',
        iastText: 'dēvānāṁpiyasa',
        modernText: 'ದೇವತೆಗಳಿಗೆ ಪ್ರಿಯನಾದ',
        explanation: 'Rectilinear strokes with unadorned stem lines.',
        tagType: 'initial'
      }
    ]
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
    lastUpdated: '14 Feb 2024',
    isDraftPrototype: true,
    confidenceScore: 95,
    targetScriptLabel: 'Kadamba',
    periodLabel: '4th–6th Century CE',
    reviewerName: 'Dr. D. V. Gopal',
    reviewerTitle: 'Senior Epigraphist, ASI Mysore',
    reviewDate: '14 Feb 2024',
    ruleSummary: 'Square hollow or solid box-head apex identification differentiates Kadamba royal epigraphy from southern Pallava variants.',
    examplesList: [
      {
        title: 'Box-Head Royal Inscription',
        originalText: 'ಕಾಗುಸ್ಥ',
        iastText: 'kāgustha',
        modernText: 'ಕಾಕುಸ್ಥವರ್ಮ',
        explanation: 'Box-head talakattu confirmed on consonant ka.',
        tagType: 'initial'
      }
    ]
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
    applicability: '10th–14th Century CE chloritic schist monumental inscriptions',
    expertReviewRequired: true,
    description: 'Hoysala calligraphers took advantage of soft soapstone (chloritic schist) to engrave deeply undercut double spirals, intricate recursive curls, and standard V-shaped downward talakattus with multi-tiered subscript stacking.',
    modernKannadaRule: 'ಹೊಯ್ಸಳ ಶಾಸನ ಲಿಪಿಯಲ್ಲಿ ಗರಿಷ್ಠ ಅಲಂಕಾರಿಕ ಸುರುಳಿಗಳು ಮತ್ತು ಕೆಳಮುಖವಾದ ವಿ-ಆಕಾರದ ತಲೆಕಟ್ಟುಗಳು ಕಂಡುಬರುತ್ತವೆ.',
    inscriptionalExample: 'ಶ್ರೀಮತು ಪ್ರತಾಪ ಹೊಯ್ಸಳ ಶ್ರೀ ವೀರ ಬಿಟ್ಟಿದೇವ ವಿಷ್ಣುವರ್ಧನದೇವರು',
    modernEquivalent: 'ಶ್ರೀಮಂತ ಪ್ರತಾಪಶಾಲಿಯಾದ ಹೊಯ್ಸಳ ವೀರ ಬಿಟ್ಟಿದೇವ ವಿಷ್ಣುವರ್ಧನ ಮಹಾರಾಜರು...',
    lastUpdated: '28 Jan 2024',
    isDraftPrototype: true,
    confidenceScore: 88,
    targetScriptLabel: 'Hoysala',
    periodLabel: '10th–14th Century CE',
    reviewerName: 'Prof. K. R. Ganesh',
    reviewerTitle: 'Epigraphy Dept, Mysore University',
    reviewDate: '28 Jan 2024',
    ruleSummary: 'Florid ornamental flourishes and recursive curls characteristic of 12th-century soapstone epigraphy.',
    examplesList: [
      {
        title: 'Recursive Curls & V-Talakattu',
        originalText: 'ಹೊಯ್ಸಳ',
        iastText: 'hoysaḷa',
        modernText: 'ಹೊಯ್ಸಳ ಸಾಮ್ರಾಜ್ಯ',
        explanation: 'Downward pointed apex with elaborate curls.',
        tagType: 'initial'
      }
    ]
  },
  {
    id: 'rule-pale-10',
    ruleCode: 'RULE-VIJ-PALE-10',
    ruleType: 'paleographical',
    title: 'Vijayanagara Granite Decoupling & Kannada-Telugu Differentiation',
    kannadaTitle: 'ವಿಜಯನಗರ ಕಾಲದ ಗ್ರಾನೈಟ್ ಲಿಪಿ ಮತ್ತು ಕನ್ನಡ-ತೆಲುಗು ಪ್ರತ್ಯೇಕತೆ',
    associatedScript: 'vijayanagara',
    associatedLanguage: 'halegannada',
    ruleVersion: 'v1.2.0',
    evidenceSource: 'Hampi Virupaksha Temple Centenary Slab; Epigraphia Indica Vol. I',
    reviewStatus: 'verified_epigraphist',
    applicability: '14th–16th Century CE granite slabs and bilingual pillars',
    expertReviewRequired: true,
    description: 'Granite engraving required open circular curves and reduced ornamental curls. Distinguishes contemporary Telugu loop openings from Kannada closed-loop characters.',
    modernKannadaRule: 'ವಿಜಯನಗರ ಕಾಲದ ಗ್ರಾನೈಟ್ ಶಾಸನಗಳಲ್ಲಿ ರೇಖೆಗಳು ದಪ್ಪವಾಗಿದ್ದು, ತೆಲುಗು-ಕನ್ನಡ ಲಿಪಿಗಳು ಬೇರ್ಪಡುವ ಹಂತದ ವಿಶಿಷ್ಟ ಮುಚ್ಚಿದ ವೃತ್ತಗಳನ್ನು ಗುರುತಿಸಬೇಕು.',
    inscriptionalExample: 'ಕೃಷ್ಣದೇವರಾಯ ಮಹಾರಾಯರು ವಿರೂಪಾಕ್ಷ ದೇವರ ಸನ್ನಿಧಾನದಲ್ಲಿ...',
    modernEquivalent: 'ಶ್ರೀ ಕೃಷ್ಣದೇವರಾಯ ಚಕ್ರವರ್ತಿಯು ವಿರೂಪಾಕ್ಷ ದೇವರ ದಿವ್ಯ ಸನ್ನಿಧಿಯಲ್ಲಿ...',
    lastUpdated: '02 Feb 2024',
    isDraftPrototype: true,
    confidenceScore: 93,
    targetScriptLabel: 'Vijayanagara',
    periodLabel: '14th–16th Century CE',
    reviewerName: 'Dr. Shivarama Bhat',
    reviewerTitle: 'Epigraphy Expert, Kannada University',
    reviewDate: '02 Feb 2024',
    ruleSummary: 'Granite-optimized stroke dynamics and Kannada-Telugu script bifurcation diagnostic thresholds.',
    examplesList: [
      {
        title: 'Granite Royal Epigraph',
        originalText: 'ಕೃಷ್ಣದೇವರಾಯ',
        iastText: 'kr̥ṣṇadēvarāya',
        modernText: 'ಕೃಷ್ಣದೇವರಾಯ',
        explanation: 'Granite-optimized closed loop glyphs.',
        tagType: 'initial'
      }
    ]
  }
];

export const HistoricalRulesView: React.FC = () => {
  const [rules, setRules] = useState<HistoricalRuleItem[]>(CANONICAL_RULES_DATABASE);
  const [selectedRuleId, setSelectedRuleId] = useState<string>('rule-phon-01');
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'logic' | 'examples' | 'evidence' | 'history'>('overview');
  const [viewMode, setViewMode] = useState<'list' | 'compact'>('list');
  const [sortBy, setSortBy] = useState<string>('default');

  // Filters state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['phonological']);
  const [selectedScripts, setSelectedScripts] = useState<string[]>([]);
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [checkedItemIds, setCheckedItemIds] = useState<string[]>(['rule-phon-01']);

  // Fetch or sync
  useEffect(() => {
    async function init() {
      try {
        const data = await epigraphyService.getHistoricalRules();
        if (data && data.length > 0) {
          // Merge to retain rich mock attributes
          setRules(prev => prev.map(p => {
            const found = data.find(d => d.id === p.id || d.ruleCode === p.ruleCode);
            return found ? { ...p, ...found } : p;
          }));
        }
      } catch (e) {
        console.warn('Using canonical local rules data');
      }
    }
    init();
  }, []);

  // Filter logic
  const filteredRules = useMemo(() => {
    return rules.filter((r) => {
      // Search
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          r.ruleCode.toLowerCase().includes(q) ||
          r.title.toLowerCase().includes(q) ||
          r.kannadaTitle.toLowerCase().includes(q) ||
          r.evidenceSource.toLowerCase().includes(q) ||
          (r.targetScriptLabel && r.targetScriptLabel.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      // Categories
      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(r.ruleType.toLowerCase())) {
          return false;
        }
      }

      // Scripts
      if (selectedScripts.length > 0) {
        const scriptName = (r.targetScriptLabel || r.associatedScript).toLowerCase();
        const matches = selectedScripts.some(s => scriptName.includes(s.toLowerCase()));
        if (!matches) return false;
      }

      // Periods
      if (selectedPeriods.length > 0) {
        const periodStr = (r.periodLabel || r.applicability).toLowerCase();
        const matches = selectedPeriods.some(p => periodStr.includes(p.toLowerCase()));
        if (!matches) return false;
      }

      // Statuses
      if (selectedStatuses.length > 0) {
        const st = r.reviewStatus.toLowerCase();
        const matches = selectedStatuses.some(s => {
          if (s === 'verified') return st.includes('verified');
          if (s === 'under_review') return st.includes('peer') || st.includes('review');
          if (s === 'draft') return st.includes('draft');
          return false;
        });
        if (!matches) return false;
      }

      return true;
    });
  }, [rules, searchQuery, selectedCategories, selectedScripts, selectedPeriods, selectedStatuses]);

  // Sorting logic
  const sortedRules = useMemo(() => {
    const list = [...filteredRules];
    if (sortBy === 'code') {
      list.sort((a, b) => a.ruleCode.localeCompare(b.ruleCode));
    } else if (sortBy === 'confidence') {
      list.sort((a, b) => (b.confidenceScore || 0) - (a.confidenceScore || 0));
    }
    return list;
  }, [filteredRules, sortBy]);

  // Selected Rule Object
  const selectedRule = useMemo(() => {
    return rules.find(r => r.id === selectedRuleId) || rules[0];
  }, [rules, selectedRuleId]);

  // Helper toggle
  const toggleFilter = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(x => x !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleClearAll = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedScripts([]);
    setSelectedPeriods([]);
    setSelectedStatuses([]);
  };

  const handleSelectRule = (rule: HistoricalRuleItem) => {
    setSelectedRuleId(rule.id);
    setIsInspectorOpen(true);
    setCheckedItemIds([rule.id]);
  };

  const handleToggleCheck = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (checkedItemIds.includes(id)) {
      setCheckedItemIds(checkedItemIds.filter(x => x !== id));
    } else {
      setCheckedItemIds([...checkedItemIds, id]);
      setSelectedRuleId(id);
      setIsInspectorOpen(true);
    }
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const c: Record<string, number> = { phonological: 0, morphological: 0, orthographical: 0, lexical: 0 };
    rules.forEach(r => {
      const type = r.ruleType.toLowerCase();
      if (c[type] !== undefined) c[type]++;
      else if (type === 'paleographical') c['orthographical']++;
    });
    return c;
  }, [rules]);

  // Status Badge Formatter
  const renderStatusBadge = (status: string) => {
    if (status.includes('verified')) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#EAF7EE] text-[#166534] border border-[#BBF7D0]">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
          <span>Verified</span>
        </span>
      );
    }
    if (status.includes('peer') || status.includes('review')) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
          <Clock className="w-3.5 h-3.5 text-[#D97706]" />
          <span>Under Review</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1]">
        <AlertCircle className="w-3.5 h-3.5 text-[#64748B]" />
        <span>Draft</span>
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* =================================================================
          1. BREADCRUMBS & TOP HEADER WITH ETCHED WATERMARK METRIC CARDS
      ================================================================== */}
      <div>
        {/* Breadcrumb path */}
        <div className="flex items-center gap-2 text-xs font-serif text-[#857268] mb-2.5">
          <button className="hover:text-[#7C3517] flex items-center gap-1 transition-colors">
            <Home className="w-3.5 h-3.5 text-[#8B4823]" />
          </button>
          <span className="text-[#BCAEA2]">›</span>
          <span className="hover:text-[#7C3517] cursor-pointer transition-colors">Research</span>
          <span className="text-[#BCAEA2]">›</span>
          <span className="text-[#1E120B] font-semibold">Rules Engine Registry</span>
        </div>

        {/* Main Header + Metrics Flex Container */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
          {/* Header Title & Subtitles */}
          <div className="space-y-1.5 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E120B] tracking-tight">
              Historical Epigraphical Rules Engine
            </h1>
            <p className="text-xs sm:text-sm text-[#564337] font-serif leading-relaxed">
              Structured administrative register for phonological mutations, morphological case syntax, and paleographic diagnostic rules.
            </p>
            <p className="text-xs font-kannada text-[#8B4823] opacity-90 leading-relaxed pt-0.5">
              ಪ್ರಾಚೀನ ಶಾಸನದ ಧ್ವನಿಪರಿವರ್ತನೆ, ರೂಪವ್ಯತ್ಯಾಸ, ಮತ್ತು ಪುರಾತತ್ತ್ವ ನಿಯಮಗಳ ನೊಂದಣಿ.
            </p>
          </div>

          {/* Right Side Metric Stats Card Row with Subtle Temple Watermark */}
          <div className="relative rounded-xl border border-[#E4D5BE] bg-[#FAF7F2] p-2.5 sm:p-3 overflow-hidden shadow-xs shrink-0">
            {/* Soft architectural temple watermark */}
            <img
              src="/temples/hoysala.jpg"
              alt="Temple Watermark"
              className="absolute right-0 top-0 h-full w-48 object-cover opacity-10 pointer-events-none mix-blend-multiply"
            />

            {/* 4 Stat Boxes in a Row */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {/* Stat 1 */}
              <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-xs px-3 py-2 rounded-lg border border-[#EDE2D2]">
                <div className="w-7 h-7 rounded-md bg-[#FAF1DF] text-[#8B4823] flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-serif font-bold text-[#1E120B]">10</div>
                  <div className="text-[10px] font-mono text-[#857268] leading-tight">Prototype Rules</div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-xs px-3 py-2 rounded-lg border border-[#EDE2D2]">
                <div className="w-7 h-7 rounded-md bg-[#FAF1DF] text-[#8B4823] flex items-center justify-center shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-serif font-bold text-[#1E120B]">8</div>
                  <div className="text-[10px] font-mono text-[#857268] leading-tight">Rule Categories</div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-xs px-3 py-2 rounded-lg border border-[#EDE2D2]">
                <div className="w-7 h-7 rounded-md bg-[#FAF1DF] text-[#8B4823] flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-serif font-bold text-[#1E120B]">3</div>
                  <div className="text-[10px] font-mono text-[#857268] leading-tight">Target Scripts</div>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-xs px-3 py-2 rounded-lg border border-[#EDE2D2]">
                <div className="w-7 h-7 rounded-md bg-[#EAF7EE] text-[#16A34A] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-serif font-bold text-[#1E120B]">7</div>
                  <div className="text-[10px] font-mono text-[#857268] leading-tight">Verified by Experts</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================================
          2. MAIN 3-COLUMN WORKBENCH LAYOUT
      ================================================================== */}
      <div className="flex flex-col lg:flex-row items-start gap-6">
        {/* ===============================================================
            COLUMN 1: FILTERS SIDEBAR
        ================================================================ */}
        <aside className="w-full lg:w-60 shrink-0 bg-[#FAF7F2] border border-[#E5D7C3] rounded-xl p-4 space-y-5 shadow-xs">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#E8DEC8]">
            <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#1E120B]">
              <Filter className="w-3.5 h-3.5 text-[#7C3517]" />
              <span>Filters</span>
            </div>
            <button
              onClick={handleClearAll}
              className="text-[11px] font-serif text-[#857268] hover:text-[#7C3517] transition-colors"
            >
              Clear All
            </button>
          </div>

          {/* Group 1: Rule Category */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-[#1E120B]">
              <Layers className="w-3.5 h-3.5 text-[#8B4823]" />
              <span>Rule Category</span>
            </div>
            <div className="space-y-1.5 pl-1 text-xs font-serif text-[#564337]">
              {[
                { id: 'phonological', label: 'Phonological', count: categoryCounts.phonological || 4 },
                { id: 'morphological', label: 'Morphological', count: categoryCounts.morphological || 3 },
                { id: 'orthographical', label: 'Orthographical', count: categoryCounts.orthographical || 2 },
                { id: 'lexical', label: 'Lexical', count: categoryCounts.lexical || 1 },
              ].map((c) => (
                <label key={c.id} className="flex items-center gap-2 cursor-pointer hover:text-[#1E120B]">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(c.id)}
                    onChange={() => toggleFilter(selectedCategories, setSelectedCategories, c.id)}
                    className="w-3.5 h-3.5 rounded border-[#DFCBB0] text-[#7C3517] focus:ring-[#7C3517] cursor-pointer"
                  />
                  <span>{c.label} ({c.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Group 2: Target Script */}
          <div className="space-y-2 pt-3 border-t border-[#E8DEC8]/80">
            <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-[#1E120B]">
              <Feather className="w-3.5 h-3.5 text-[#8B4823]" />
              <span>Target Script</span>
            </div>
            <div className="space-y-1.5 pl-1 text-xs font-serif text-[#564337]">
              {[
                { id: 'kadamba', label: 'Kadamba', count: 2 },
                { id: 'chalukya', label: 'Badami Chalukya', count: 2 },
                { id: 'rashtrakuta', label: 'Rashtrakuta', count: 1 },
                { id: 'hoysala', label: 'Hoysala', count: 1 },
                { id: 'vijayanagara', label: 'Vijayanagara', count: 1 },
              ].map((s) => (
                <label key={s.id} className="flex items-center gap-2 cursor-pointer hover:text-[#1E120B]">
                  <input
                    type="checkbox"
                    checked={selectedScripts.includes(s.id)}
                    onChange={() => toggleFilter(selectedScripts, setSelectedScripts, s.id)}
                    className="w-3.5 h-3.5 rounded border-[#DFCBB0] text-[#7C3517] focus:ring-[#7C3517] cursor-pointer"
                  />
                  <span>{s.label} ({s.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Group 3: Source Period */}
          <div className="space-y-2 pt-3 border-t border-[#E8DEC8]/80">
            <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-[#1E120B]">
              <Calendar className="w-3.5 h-3.5 text-[#8B4823]" />
              <span>Source Period</span>
            </div>
            <div className="space-y-1.5 pl-1 text-xs font-serif text-[#564337]">
              {[
                { id: '3rd-5th', label: '3rd–5th Century', count: 1 },
                { id: '6th-8th', label: '6th–8th Century', count: 3 },
                { id: '9th-12th', label: '9th–12th Century', count: 4 },
                { id: '13th-16th', label: '13th–16th Century', count: 2 },
              ].map((p) => (
                <label key={p.id} className="flex items-center gap-2 cursor-pointer hover:text-[#1E120B]">
                  <input
                    type="checkbox"
                    checked={selectedPeriods.includes(p.id)}
                    onChange={() => toggleFilter(selectedPeriods, setSelectedPeriods, p.id)}
                    className="w-3.5 h-3.5 rounded border-[#DFCBB0] text-[#7C3517] focus:ring-[#7C3517] cursor-pointer"
                  />
                  <span>{p.label} ({p.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Group 4: Review Status */}
          <div className="space-y-2 pt-3 border-t border-[#E8DEC8]/80">
            <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-[#1E120B]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8B4823]" />
              <span>Review Status</span>
            </div>
            <div className="space-y-1.5 pl-1 text-xs font-serif text-[#564337]">
              {[
                { id: 'verified', label: 'Verified', count: 7 },
                { id: 'under_review', label: 'Under Review', count: 2 },
                { id: 'draft', label: 'Draft', count: 1 },
              ].map((st) => (
                <label key={st.id} className="flex items-center gap-2 cursor-pointer hover:text-[#1E120B]">
                  <input
                    type="checkbox"
                    checked={selectedStatuses.includes(st.id)}
                    onChange={() => toggleFilter(selectedStatuses, setSelectedStatuses, st.id)}
                    className="w-3.5 h-3.5 rounded border-[#DFCBB0] text-[#7C3517] focus:ring-[#7C3517] cursor-pointer"
                  />
                  <span>{st.label} ({st.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Apply Filters Button */}
          <div className="pt-2">
            <button
              onClick={() => {}}
              className="w-full py-2.5 px-3 rounded-lg bg-[#7C3517] hover:bg-[#682A10] text-white text-xs font-serif font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Apply Filters ({filteredRules.length})</span>
            </button>
          </div>
        </aside>

        {/* ===============================================================
            COLUMN 2: RULES REGISTER LIST & TOOLBAR
        ================================================================ */}
        <div className="flex-1 min-w-0 space-y-3.5">
          {/* Top Search & Display Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#857268] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search rule by code, name, keyword, or evidence citation..."
                className="w-full pl-9 pr-3 py-2 bg-[#FAF7F2] border border-[#E5D7C3] rounded-lg text-xs font-serif text-[#1E120B] placeholder-[#9E8D7F] focus:outline-none focus:ring-1 focus:ring-[#7C3517]"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-[#FAF7F2] border border-[#E5D7C3] rounded-lg text-xs font-serif text-[#564337] focus:outline-none appearance-none pr-8 cursor-pointer"
              >
                <option value="default">Sort: Default</option>
                <option value="code">Sort: Code (A-Z)</option>
                <option value="confidence">Sort: Confidence (High-Low)</option>
              </select>
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#857268] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center border border-[#E5D7C3] rounded-lg p-0.5 bg-[#FAF7F2] shrink-0">
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-serif transition-colors ${
                  viewMode === 'list' ? 'bg-[#7C3517] text-white font-semibold' : 'text-[#6C584C] hover:text-[#1E120B]'
                }`}
              >
                <ListIcon className="w-3.5 h-3.5" />
                <span>List</span>
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-serif transition-colors ${
                  viewMode === 'compact' ? 'bg-[#7C3517] text-white font-semibold' : 'text-[#6C584C] hover:text-[#1E120B]'
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span>Compact</span>
              </button>
            </div>
          </div>

          {/* Showing Count & Pagination Strip */}
          <div className="flex items-center justify-between text-xs font-serif text-[#6C584C] px-1">
            <div>
              Showing <span className="font-semibold text-[#1E120B]">1–{filteredRules.length}</span> of {rules.length} rules
            </div>
            <div className="flex items-center gap-1">
              <button className="w-6 h-6 rounded border border-[#E5D7C3] bg-[#FAF7F2] flex items-center justify-center text-[#857268] hover:text-[#1E120B] disabled:opacity-40" disabled>
                ‹
              </button>
              <span className="w-6 h-6 rounded bg-[#7C3517] text-white font-mono text-xs flex items-center justify-center font-bold">
                1
              </span>
              <button className="w-6 h-6 rounded border border-[#E5D7C3] bg-[#FAF7F2] flex items-center justify-center text-[#857268] hover:text-[#1E120B] disabled:opacity-40" disabled>
                ›
              </button>
            </div>
          </div>

          {/* Rules Card List */}
          <div className={viewMode === 'compact' ? 'space-y-1.5' : 'space-y-2.5'}>
            {sortedRules.map((r) => {
              const isSelected = r.id === selectedRuleId;
              const isChecked = checkedItemIds.includes(r.id);

              return (
                <div
                  key={r.id}
                  onClick={() => handleSelectRule(r)}
                  className={`group rounded-xl border transition-all cursor-pointer relative ${
                    viewMode === 'compact' ? 'p-2 sm:p-2.5' : 'p-3.5 sm:p-4'
                  } ${
                    isSelected
                      ? 'bg-[#FFFDF9] border-[#C2854E] shadow-sm ring-1 ring-[#C2854E]/30'
                      : 'bg-[#FAF7F2] border-[#E8DEC8] hover:border-[#DFCBB0] hover:bg-[#FAF6EE]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* Left & Middle Block */}
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {/* Selection Checkbox */}
                      <button
                        onClick={(e) => handleToggleCheck(r.id, e)}
                        className={`w-4 h-4 rounded mt-1 shrink-0 flex items-center justify-center border transition-colors ${
                          isSelected || isChecked
                            ? 'bg-[#7C3517] border-[#7C3517] text-white'
                            : 'border-[#DFCBB0] bg-white hover:border-[#7C3517]'
                        }`}
                      >
                        {(isSelected || isChecked) && <Check className="w-3 h-3 stroke-[3]" />}
                      </button>

                      {/* Code, Version, and Category */}
                      <div className="space-y-1 shrink-0 w-36 sm:w-40">
                        <div className="font-mono font-bold text-xs text-[#1E120B]">
                          {r.ruleCode}
                        </div>
                        <div className="text-[10px] font-mono text-[#857268]">
                          {r.ruleVersion}
                        </div>
                        <div>
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold bg-[#F5EDFD] text-[#6B21A8] border border-[#E9D5FF]">
                            {r.ruleType}
                          </span>
                        </div>
                      </div>

                      {/* Rule Title & Kannada Description */}
                      <div className="space-y-0.5 flex-1 min-w-0 pr-2">
                        <h3 className="font-serif font-bold text-sm text-[#1E120B] group-hover:text-[#7C3517] transition-colors leading-snug line-clamp-1">
                          {r.title}
                        </h3>
                        <p className="font-kannada text-xs text-[#8B4823] line-clamp-1 pt-0.5">
                          {r.kannadaTitle}
                        </p>
                      </div>
                    </div>

                    {/* Right Meta & Actions */}
                    <div className="flex items-center gap-3 sm:gap-4 shrink-0 self-end sm:self-center">
                      {/* Target Script Badge */}
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
                        {r.targetScriptLabel || r.associatedScript}
                      </span>

                      {/* Status Badge */}
                      {renderStatusBadge(r.reviewStatus)}

                      {/* Confidence Meter */}
                      <div className="hidden md:flex items-center gap-1 text-xs font-mono font-medium text-[#6C584C]">
                        <BarChart2 className="w-3.5 h-3.5 text-[#16A34A]" />
                        <span>{r.confidenceScore || 95}%</span>
                      </div>

                      {/* View Action Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectRule(r);
                        }}
                        className="text-xs font-serif font-semibold text-[#7C3517] hover:text-[#5B230C] flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-[#FAF1DF]"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      {/* Menu */}
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#A8988B] hover:text-[#1E120B] p-1 rounded"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===============================================================
            COLUMN 3: DETAILED RULE INSPECTOR DRAWER PANEL (From screenshot)
        ================================================================ */}
        {isInspectorOpen && selectedRule && (
          <aside className="w-full lg:w-[430px] shrink-0 bg-[#FAF7F2] border border-[#E5D7C3] rounded-xl p-4 sm:p-5 space-y-4 shadow-sm sticky top-20">
            {/* Header: Rule Code & Close */}
            <div className="flex items-start justify-between gap-2 border-b border-[#E8DEC8] pb-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-[#1E120B]">
                    {selectedRule.ruleCode}
                  </span>
                  <span className="text-[11px] font-mono text-[#857268]">
                    {selectedRule.ruleVersion}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {renderStatusBadge(selectedRule.reviewStatus)}
                <button
                  onClick={() => setIsInspectorOpen(false)}
                  className="w-6 h-6 rounded-full hover:bg-[#EAE0D0] flex items-center justify-center text-[#857268] hover:text-[#1E120B] transition-colors"
                  title="Close Inspector"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Rule Title & Kannada Subtitle */}
            <div className="space-y-1">
              <h2 className="font-serif font-bold text-lg text-[#1E120B] leading-tight">
                {selectedRule.title}
              </h2>
              <p className="font-kannada text-xs text-[#8B4823] leading-snug">
                {selectedRule.kannadaTitle}
              </p>
            </div>

            {/* Tabs Row matching mockup */}
            <div className="flex items-center border-b border-[#E5D7C3] gap-4 text-xs font-serif pt-1">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'logic', label: 'Rule Logic' },
                { id: 'examples', label: 'Examples' },
                { id: 'evidence', label: 'Evidence' },
                { id: 'history', label: 'History' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-2 transition-colors relative ${
                    activeTab === tab.id
                      ? 'font-bold text-[#7C3517] border-b-2 border-[#7C3517]'
                      : 'text-[#6C584C] hover:text-[#1E120B]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Body: OVERVIEW (Default) */}
            {activeTab === 'overview' && (
              <div className="space-y-4 pt-1">
                {/* 1. Rule Summary Card */}
                <div className="bg-[#FAF5ED] border border-[#E8DEC8] p-3.5 rounded-lg space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#1E120B]">
                    <FileText className="w-3.5 h-3.5 text-[#8B4823]" />
                    <span>Rule Summary</span>
                  </div>
                  <p className="text-xs font-serif text-[#564337] leading-relaxed">
                    {selectedRule.ruleSummary || selectedRule.description}
                  </p>
                </div>

                {/* 2. 6-Grid Metadata */}
                <div className="grid grid-cols-2 gap-2.5 text-xs font-serif bg-white/70 p-3 rounded-lg border border-[#EDE2D2]">
                  <div>
                    <span className="text-[10px] font-mono text-[#857268] block">Category</span>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#F5EDFD] text-[#6B21A8] border border-[#E9D5FF] mt-0.5">
                      {selectedRule.ruleType.charAt(0).toUpperCase() + selectedRule.ruleType.slice(1)}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#857268] block">Target Script</span>
                    <span className="font-semibold text-[#1E120B] flex items-center gap-1 mt-0.5">
                      <Feather className="w-3 h-3 text-[#8B4823]" />
                      <span>{selectedRule.targetScriptLabel || selectedRule.associatedScript}</span>
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#857268] block">Confidence</span>
                    <span className="font-mono font-bold text-[#16A34A] flex items-center gap-1 mt-0.5">
                      <BarChart2 className="w-3.5 h-3.5" />
                      <span>{selectedRule.confidenceScore || 96}%</span>
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#857268] block">Status</span>
                    <span className="text-[#166534] font-semibold flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                      <span>Verified (Canonical)</span>
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#857268] block">Applicable Period</span>
                    <span className="font-serif text-[#1E120B] flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3 text-[#857268]" />
                      <span>{selectedRule.periodLabel || '4th–6th Century CE'}</span>
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#857268] block">Last Updated</span>
                    <span className="font-mono text-[#564337] flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3 text-[#857268]" />
                      <span>{selectedRule.lastUpdated}</span>
                    </span>
                  </div>
                </div>

                {/* 3. Verification & Provenance Box */}
                <div className="bg-[#F0FDF4] border border-[#BBF7D0] p-3 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#166534]">
                    <UserCheck className="w-4 h-4 text-[#16A34A]" />
                    <span>Verification & Provenance</span>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-0.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#DCFCE7] text-[#166534] flex items-center justify-center font-bold font-serif shrink-0 border border-[#86EFAC]">
                        SB
                      </div>
                      <div className="text-xs">
                        <div className="text-[10px] font-mono text-[#15803D]">Verified & Approved by</div>
                        <div className="font-serif font-bold text-[#14532D]">
                          {selectedRule.reviewerName || 'Dr. Shivarama Bhat'}
                        </div>
                        <div className="text-[10px] text-[#166534] opacity-80">
                          {selectedRule.reviewerTitle || 'Epigraphy Expert, Kannada University'}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] font-mono text-[#15803D]">Review Date</div>
                      <div className="font-mono text-[11px] font-semibold text-[#14532D]">
                        {selectedRule.reviewDate || '12 Mar 2024'}
                      </div>
                    </div>
                  </div>

                  <div className="pt-1 border-t border-[#BBF7D0]/60 flex justify-end">
                    <button className="text-[11px] font-serif font-semibold text-[#15803D] hover:text-[#14532D] flex items-center gap-1">
                      <span>View Review Notes</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* 4. Examples Box with Stone Glyph Swatches */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-[#1E120B]">
                    <BookOpen className="w-3.5 h-3.5 text-[#8B4823]" />
                    <span>Examples</span>
                  </div>

                  <div className="space-y-2">
                    {/* Example Item 1 */}
                    <div className="bg-white/80 border border-[#E8DEC8] p-2.5 rounded-lg space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-[#1E120B]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                        <span>Word-initial (Retention)</span>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Carved stone glyph swatch */}
                        <div className="w-11 h-11 rounded border border-[#DFCBB0] overflow-hidden shrink-0 relative bg-slate-900 shadow-xs">
                          <img
                            src="/analysis-halmidi-stele.jpg"
                            alt="Stone Glyph"
                            className="w-full h-full object-cover opacity-90"
                            onError={(e) => {
                              e.currentTarget.src = sampleStele;
                            }}
                          />
                        </div>

                        {/* Mapping text */}
                        <div className="flex-1 min-w-0 text-xs font-serif">
                          <div className="flex items-baseline gap-2">
                            <span className="font-mono font-bold text-sm text-[#7C3517]">ಱಾಜ</span>
                            <span className="text-[10px] font-mono text-[#857268]">(rāja)</span>
                            <span className="text-[#8B4823]">→</span>
                            <span className="font-serif font-bold text-sm text-[#1E120B]">ರಾಜ</span>
                          </div>
                          <p className="text-[11px] text-[#6C584C] font-serif leading-tight pt-0.5">
                            Sakata Repha retained in initial position.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Example Item 2 */}
                    <div className="bg-white/80 border border-[#E8DEC8] p-2.5 rounded-lg space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-[#1E120B]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                        <span>Final Position (Loss)</span>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Carved stone glyph swatch */}
                        <div className="w-11 h-11 rounded border border-[#DFCBB0] overflow-hidden shrink-0 relative bg-slate-900 shadow-xs">
                          <img
                            src="/analysis-halmidi-stele.jpg"
                            alt="Stone Glyph"
                            className="w-full h-full object-cover opacity-90 scale-125"
                            onError={(e) => {
                              e.currentTarget.src = sampleStele;
                            }}
                          />
                        </div>

                        {/* Mapping text */}
                        <div className="flex-1 min-w-0 text-xs font-serif">
                          <div className="flex items-baseline gap-2">
                            <span className="font-mono font-bold text-sm text-[#7C3517]">ಕರಱ್</span>
                            <span className="text-[10px] font-mono text-[#857268]">(karaṟ)</span>
                            <span className="text-[#8B4823]">→</span>
                            <span className="font-serif font-bold text-sm text-[#1E120B]">ಕರ</span>
                          </div>
                          <p className="text-[11px] text-[#6C584C] font-serif leading-tight pt-0.5">
                            Sakata Repha lost in final position.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab Body: RULE LOGIC */}
            {activeTab === 'logic' && (
              <div className="space-y-3 pt-1 text-xs font-serif">
                <div className="bg-[#FAF5ED] border border-[#E8DEC8] p-3.5 rounded-lg space-y-2">
                  <div className="font-bold text-[#1E120B]">Algorithmic Transformation Logic</div>
                  <div className="font-mono text-[11px] bg-[#1E120B] text-[#F3E8FF] p-2.5 rounded-md overflow-x-auto">
                    <code>
                      {`// Regex Transform Pipeline\nconst regex = /(?:^|\\s)ಱ([ಾ-ೌ಼]?)/gu;\nconst replacement = 'ರ$1';`}
                    </code>
                  </div>
                  <p className="text-[#564337] text-[11px] leading-relaxed">
                    {selectedRule.modernKannadaRule}
                  </p>
                </div>

                <div className="bg-white/80 border border-[#E8DEC8] p-3 rounded-lg space-y-1.5">
                  <div className="font-bold text-[#1E120B]">Phonemic Contrast Verification</div>
                  <p className="text-[#6C584C] text-[11px] leading-relaxed">
                    Minimal pairs establish strict distinction in Old Kannada:
                    <span className="block font-bold text-[#7C3517] pt-1">ಅಱಿ (to know / discern) vs. ಅರಿ (adversary / enemy)</span>
                  </p>
                </div>
              </div>
            )}

            {/* Tab Body: EXAMPLES */}
            {activeTab === 'examples' && (
              <div className="space-y-3 pt-1 text-xs font-serif">
                <div className="bg-white/90 border border-[#E8DEC8] p-3 rounded-lg space-y-2">
                  <div className="font-bold text-[#1E120B]">Halmidi Stele Attestation (c. 450 CE)</div>
                  <div className="p-2 bg-[#FAF5ED] rounded font-kannada text-xs text-[#8B4823]">
                    {selectedRule.inscriptionalExample}
                  </div>
                  <div className="text-[11px] text-[#564337]">
                    <span className="font-bold">Modern Translation:</span> {selectedRule.modernEquivalent}
                  </div>
                </div>
              </div>
            )}

            {/* Tab Body: EVIDENCE */}
            {activeTab === 'evidence' && (
              <div className="space-y-3 pt-1 text-xs font-serif">
                <div className="bg-white/90 border border-[#E8DEC8] p-3.5 rounded-lg space-y-2">
                  <div className="font-bold text-[#1E120B]">Primary Epigraphical Citations</div>
                  <p className="text-xs text-[#7C3517] font-mono leading-relaxed bg-[#FAF5ED] p-2 rounded">
                    {selectedRule.evidenceSource}
                  </p>
                  <p className="text-[11px] text-[#564337] leading-relaxed">
                    Peer consensus verified across 18 Karnataka epigraphical journals and Epigraphia Carnatica archives.
                  </p>
                </div>
              </div>
            )}

            {/* Tab Body: HISTORY */}
            {activeTab === 'history' && (
              <div className="space-y-2.5 pt-1 text-xs font-serif">
                <div className="bg-white/90 border border-[#E8DEC8] p-3 rounded-lg space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1E120B]">Version 1.4.2 (Current)</span>
                    <span className="font-mono text-[10px] text-[#857268]">12 Mar 2024</span>
                  </div>
                  <p className="text-[11px] text-[#6C584C]">
                    Integrated alveolar trill exception boundary rules for compound Sandhis.
                  </p>
                </div>
                <div className="bg-white/90 border border-[#E8DEC8] p-3 rounded-lg space-y-1 opacity-75">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1E120B]">Version 1.3.0</span>
                    <span className="font-mono text-[10px] text-[#857268]">15 Jan 2024</span>
                  </div>
                  <p className="text-[11px] text-[#6C584C]">
                    Initial consensus extraction from Shabdamanidarpana Sutra 32.
                  </p>
                </div>
              </div>
            )}
          </aside>
        )}
      </div>
    </div>
  );
};
