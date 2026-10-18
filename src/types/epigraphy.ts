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

export interface ScriptRelationship {
  ancestorScripts: string[];
  descendantScripts: string[];
  parallelScripts: string[];
  branchName: string;
}

export interface SampleGlyphItem {
  id: string;
  label: string;
  kannadaChar: string;
  iast: string;
  imagePath: string;
  morphologicalNote: string;
}

export interface ScriptClassMetadata {
  id: ScriptClassId;
  name: string;
  kannadaName: string;
  approximatePeriod: string;
  diagnosticFeatures: string[];
  characteristicSubstrate: SubstrateMaterial[];
  historicalDynasty: string;
  significance: string;
  relationships?: ScriptRelationship;
  sampleGlyphs?: SampleGlyphItem[];
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

export type ReviewStatus = 'verified' | 'in_review' | 'pending_verification' | 'archived';

export interface ResearchActivityItem {
  id: string;
  timestamp: string;
  type: 'transcription_verified' | 'translation_updated' | 'rubbing_catalogued' | 'lexicon_added';
  title: string;
  description: string;
  scholar: string;
  inscriptionId: string;
  inscriptionTitle: string;
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
  reviewStatus: ReviewStatus;
  lastUpdated: string;
  historicalContext: HistoricalContext;
  transcription: TranscriptionResult;
  translation: TranslationResult;
  provenance: string;
  currentLocation: string; // e.g. "Government Museum, Bengaluru"
}

export type RuleType =
  | 'phonological'
  | 'morphological'
  | 'orthographical'
  | 'metric_poetic'
  | 'paleographical';

export type RuleReviewStatus =
  | 'verified_epigraphist'
  | 'preliminary_draft'
  | 'needs_peer_review'
  | 'deprecated';

export interface HistoricalRuleItem {
  id: string;
  ruleCode: string;
  ruleType: RuleType;
  title: string;
  kannadaTitle: string;
  associatedScript: ScriptClassId | 'all';
  associatedLanguage: SourceLanguageId | 'all';
  ruleVersion: string;
  evidenceSource: string;
  reviewStatus: RuleReviewStatus;
  applicability: string;
  expertReviewRequired: boolean;
  description: string;
  modernKannadaRule: string;
  inscriptionalExample: string;
  modernEquivalent: string;
  exceptionsOrCaveats?: string;
  lastUpdated: string;
  isDraftPrototype: true;
  confidenceScore?: number;
  targetScriptLabel?: string;
  periodLabel?: string;
  reviewerName?: string;
  reviewerTitle?: string;
  reviewDate?: string;
  ruleSummary?: string;
  examplesList?: Array<{
    title: string;
    originalText: string;
    iastText?: string;
    modernText: string;
    explanation: string;
    tagType?: 'initial' | 'final' | 'medial';
    snippetImg?: string;
  }>;
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
  getRecentActivity(): Promise<ResearchActivityItem[]>;
  getHistoricalRules(): Promise<HistoricalRuleItem[]>;
  analyzeInscriptionImage(file: File | Blob): Promise<AnalysisJobResult>;
}

export interface InscriptionFilter {
  scriptClass?: ScriptClassId | 'all';
  sourceLanguage?: SourceLanguageId | 'all';
  substrate?: SubstrateMaterial | 'all';
  reviewStatus?: ReviewStatus | 'all';
  historicalPeriod?: string | 'all';
  searchQuery?: string;
  century?: string;
  sortBy?: 'chronological_asc' | 'chronological_desc' | 'title_asc' | 'title_desc' | 'recently_updated';
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
