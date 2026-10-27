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
  MOCK_RESEARCH_ACTIVITY
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

    if (filter.reviewStatus && filter.reviewStatus !== 'all') {
      result = result.filter(ins => ins.reviewStatus === filter.reviewStatus);
    }

    if (filter.historicalPeriod && filter.historicalPeriod !== 'all') {
      const hp = filter.historicalPeriod.toLowerCase();
      result = result.filter(ins =>
        ins.historicalContext.century.toLowerCase().includes(hp) ||
        ins.historicalContext.approximateDate.toLowerCase().includes(hp)
      );
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

    if (filter.sortBy) {
      if (filter.sortBy === 'title_asc') {
        result.sort((a, b) => a.title.localeCompare(b.title));
      } else if (filter.sortBy === 'title_desc') {
        result.sort((a, b) => b.title.localeCompare(a.title));
      } else if (filter.sortBy === 'recently_updated') {
        result.sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));
      } else if (filter.sortBy === 'chronological_asc') {
        result.sort((a, b) => a.id.localeCompare(b.id));
      } else if (filter.sortBy === 'chronological_desc') {
        result.sort((a, b) => b.id.localeCompare(a.id));
      }
    }

    return Promise.resolve(result);
  }

  async getInscriptionById(id: string): Promise<InscriptionRecord | null> {
    const found = this.inscriptions.find(ins => ins.id === id);
    return Promise.resolve(found || null);
  }

  async getRecentActivity(_limit?: number): Promise<import('../types').ResearchActivityItem[]> {
    return Promise.resolve([...MOCK_RESEARCH_ACTIVITY]);
  }

  async updateInscription(id: string, updates: Partial<InscriptionRecord>): Promise<InscriptionRecord> {
    const idx = this.inscriptions.findIndex(ins => ins.id === id);
    if (idx !== -1) {
      this.inscriptions[idx] = { ...this.inscriptions[idx], ...updates };
      return Promise.resolve(this.inscriptions[idx]);
    }
    throw new Error(`Inscription with id ${id} not found in mock store`);
  }

  /**
   * Demonstration analysis adapter for uploaded rubbings/images.
   * Explicitly flagged as demonstration mock data to prevent false claims.
   */
  async analyzeInscriptionImage(file: File | Blob, options?: any): Promise<AnalysisJobResult> {
    // Attempt live FastAPI neural backend first so real user uploads are always analyzed
    try {
      const { fastApiEpigraphyService } = await import('./fastapiEpigraphyService');
      const liveResult = await fastApiEpigraphyService.analyzeInscriptionImage(file, options);
      if (liveResult && liveResult.transcription) {
        return liveResult;
      }
    } catch (e) {
      console.warn('FastAPI live analysis failed in mock fallback, generating local preview:', e);
    }

    const canonical = this.inscriptions[0];
    const userImgUrl = file && file.size > 0 && typeof URL !== 'undefined'
      ? URL.createObjectURL(file)
      : canonical.imageUrl;

    return Promise.resolve({
      jobId: `demo-job-${Date.now()}`,
      status: 'completed',
      inferredScript: canonical.scriptClass,
      inferredLanguage: canonical.sourceLanguage,
      transcription: canonical.transcription,
      translation: canonical.translation,
      historicalContext: canonical.historicalContext,
      isDemonstrationOnly: true,
      adapterSource: 'mock_local',
      imageUrl: userImgUrl,
      reliefImageUrl: userImgUrl,
      rubbingImageUrl: userImgUrl,
    });
  }
}
