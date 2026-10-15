import {
  IEpigraphyService,
  InscriptionRecord,
  ScriptClassMetadata,
  SourceLanguageMetadata,
  InscriptionFilter,
  AnalysisJobResult
} from '../types';
import {
  MOCK_INSCRIPTIONS,
  SCRIPT_CLASSES_METADATA,
  SOURCE_LANGUAGES_METADATA,
  MOCK_RESEARCH_ACTIVITY,
} from '../data/mockInscriptions';

/**
 * MockEpigraphyService
 * Implements IEpigraphyService for client-side research demonstration.
 * All demonstration outputs are strictly and explicitly labeled as mock data.
 */
export class MockEpigraphyService implements IEpigraphyService {
  private inscriptions: InscriptionRecord[] = [...MOCK_INSCRIPTIONS];
  private scripts: ScriptClassMetadata[] = [...SCRIPT_CLASSES_METADATA];
  private languages: SourceLanguageMetadata[] = [...SOURCE_LANGUAGES_METADATA];

  async getScriptClasses(): Promise<ScriptClassMetadata[]> {
    // Simulate slight natural async boundary
    return Promise.resolve([...this.scripts]);
  }

  async getSourceLanguages(): Promise<SourceLanguageMetadata[]> {
    return Promise.resolve([...this.languages]);
  }

  async getInscriptions(filter?: InscriptionFilter): Promise<InscriptionRecord[]> {
    let result = [...this.inscriptions];

    if (!filter) return result;

    if (filter.scriptClass && filter.scriptClass !== 'all') {
      result = result.filter(ins => ins.scriptClass === filter.scriptClass);
    }

    if (filter.sourceLanguage && filter.sourceLanguage !== 'all') {
      result = result.filter(ins => ins.sourceLanguage === filter.sourceLanguage);
    }

    if (filter.substrate && filter.substrate !== 'all') {
      result = result.filter(ins => ins.substrate === filter.substrate);
    }

    if (filter.searchQuery && filter.searchQuery.trim() !== '') {
      const q = filter.searchQuery.toLowerCase().trim();
      result = result.filter(ins =>
        ins.title.toLowerCase().includes(q) ||
        ins.kannadaTitle.toLowerCase().includes(q) ||
        ins.accessionNumber.toLowerCase().includes(q) ||
        ins.historicalContext.dynasty.toLowerCase().includes(q) ||
        ins.historicalContext.ruler.toLowerCase().includes(q) ||
        ins.historicalContext.findSpot.district.toLowerCase().includes(q) ||
        ins.historicalContext.findSpot.village.toLowerCase().includes(q)
      );
    }

    return Promise.resolve(result);
  }

  async getInscriptionById(id: string): Promise<InscriptionRecord | null> {
    const found = this.inscriptions.find(ins => ins.id === id);
    return Promise.resolve(found || null);
  }

  async getRecentActivity(): Promise<import('../types').ResearchActivityItem[]> {
    return Promise.resolve([...MOCK_RESEARCH_ACTIVITY]);
  }

  /**
   * Demonstration analysis adapter for uploaded rubbings/images.
   * Explicitly flagged as demonstration mock data to prevent false claims.
   */
  async analyzeInscriptionImage(_file: File | Blob): Promise<AnalysisJobResult> {
    // Select the foundational Halmidi inscription as the canonical demonstration response
    const canonical = this.inscriptions[0];

    return Promise.resolve({
      jobId: `demo-job-${Date.now()}`,
      status: 'completed',
      inferredScript: canonical.scriptClass,
      inferredLanguage: canonical.sourceLanguage,
      transcription: canonical.transcription,
      translation: canonical.translation,
      historicalContext: canonical.historicalContext,
      isDemonstrationOnly: true,
      adapterSource: 'mock_local'
    });
  }
}
