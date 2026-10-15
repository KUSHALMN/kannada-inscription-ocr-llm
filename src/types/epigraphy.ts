/**
 * Kannada Heritage AI — Epigraphical Domain Types
 * Institutional-grade typed contracts for script recognition, transcription, 
 * translation, and paleographical analysis.
 */

export type ScriptClassId =
  | 'ashoka'
  | 'satavahana'
  | 'kadamba'
  | 'badami_chalukya'
  | 'rashtrakuta'
  | 'kalyana_chalukya'
  | 'hoysala'
  | 'vijayanagara'
  | 'mysuru'
  | 'present_kannada';

export interface ScriptClassMetadata {
  id: ScriptClassId;
  name: string;
  kannadaName: string;
  approximatePeriod: string;
  diagnosticFeatures: string[];
  characteristicSubstrate: SubstrateMaterial[];
  historicalDynasty: string;
  significance: string;
}

export type SourceLanguageId =
  | 'prakrit'
  | 'sanskrit'
  | 'purvada_halegannada' // Early Proto-Old Kannada (e.g., Halmidi)
  | 'halegannada'         // Classical Old Kannada (e.g., Kavirajamarga)
  | 'nadugannada'        // Middle Kannada (e.g., Vijayanagara / Vachana era)
  | 'hosagannada';        // Modern Kannada

export interface SourceLanguageMetadata {
  id: SourceLanguageId;
  name: string;
  kannadaName: string;
  centuryRange: string;
  linguisticFeatures: string;
}

export type SubstrateMaterial =
  | 'granite'
  | 'sandstone'
  | 'chlorite_schist' // Soapstone
  | 'limestone'
  | 'copper_plate'
  | 'palm_leaf'
  | 'paper';

export interface BoundingBox {
  id: string;
  x: number;      // percentage (0-100) or pixel
  y: number;
  width: number;
  height: number;
  label: string;
  confidence: number;
  lineIndex?: number;
}

export interface SegmentedLine {
  lineNumber: number;
  originalText: string;
  iastText: string;
  modernKannadaLine?: string;
  boundingBox?: BoundingBox;
}

export interface ArchaicGlossaryItem {
  term: string;
  iast: string;
  modernKannadaEquivalent: string;
  englishDefinition: string;
  grammaticalCategory: string; // e.g. "Dravidian verbal noun", "Sanskrit Tatshama"
}

export interface HistoricalContext {
  dynasty: string;
  ruler: string;
  regnalPeriod: string;
  approximateDate: string;
  century: string;
  findSpot: {
    village: string;
    taluk: string;
    district: string;
    state: string;
    coordinates?: [number, number];
  };
  epigraphiaReference?: string; // e.g. "Epigraphia Carnatica Vol. XV, BL 58"
  historicalSummary: string;
  linguisticSignificance: string;
}

export interface TranscriptionResult {
  scriptClass: ScriptClassId;
  scriptConfidence: number;
  recognizedText: string;
  iastTransliteration: string;
  lines: SegmentedLine[];
  detectedGlyphsCount: number;
  isMockData: true; // explicit requirement: no fake AI claiming to be real inference
}

export interface TranslationResult {
  sourceLanguage: SourceLanguageId;
  languageConfidence: number;
  modernKannada: string;
  englishTranslation: string;
  glossary: ArchaicGlossaryItem[];
  stylisticNotes: string;
  isMockData: true;
}

export interface InscriptionRecord {
  id: string;
  accessionNumber: string; // Institutional catalog number (e.g. KHA-INS-0450-01)
  title: string;
  kannadaTitle: string;
  scriptClass: ScriptClassId;
  sourceLanguage: SourceLanguageId;
  substrate: SubstrateMaterial;
  dimensions?: {
    heightCm: number;
    widthCm: number;
    depthCm?: number;
  };
  imageUrl: string;
  thumbnailUrl?: string;
  conditionRating: 'excellent' | 'fair' | 'weathered' | 'partially_effaced';
  historicalContext: HistoricalContext;
  transcription: TranscriptionResult;
  translation: TranslationResult;
  provenance: string;
  currentLocation: string; // e.g. "Government Museum, Bengaluru"
}

/**
 * Replaceable Service Adapter Contract
 * Used to decouple UI from backend, seamlessly swappable for FastAPI client.
 */
export interface IEpigraphyService {
  getScriptClasses(): Promise<ScriptClassMetadata[]>;
  getSourceLanguages(): Promise<SourceLanguageMetadata[]>;
  getInscriptions(filter?: InscriptionFilter): Promise<InscriptionRecord[]>;
  getInscriptionById(id: string): Promise<InscriptionRecord | null>;
  analyzeInscriptionImage(file: File | Blob): Promise<AnalysisJobResult>;
}

export interface InscriptionFilter {
  scriptClass?: ScriptClassId | 'all';
  sourceLanguage?: SourceLanguageId | 'all';
  substrate?: SubstrateMaterial | 'all';
  searchQuery?: string;
  century?: string;
}

export interface AnalysisJobResult {
  jobId: string;
  status: 'completed' | 'processing' | 'failed';
  inferredScript: ScriptClassId;
  inferredLanguage: SourceLanguageId;
  transcription: TranscriptionResult;
  translation: TranslationResult;
  historicalContext: HistoricalContext;
  isDemonstrationOnly: true;
  adapterSource: 'mock_local' | 'fastapi_remote';
}
