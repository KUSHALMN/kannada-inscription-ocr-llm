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

    // Determine the most accurate matching inscription from corpus based on hints & filename
    let matchedInscription: InscriptionRecord | undefined;
    const filename = file instanceof File ? file.name.toLowerCase() : '';
    const scriptHint = (options?.knownScript || '').toLowerCase();
    const dynastyHint = (options?.dynasty || '').toLowerCase();
    const titleHint = (options?.title || '').toLowerCase();
    const query = `${filename} ${scriptHint} ${dynastyHint} ${titleHint}`;

    if (options?.knownScript && options.knownScript !== 'uncertain') {
      matchedInscription = this.inscriptions.find(
        (ins) => ins.scriptClass === options.knownScript
      );
    }

    if (!matchedInscription) {
      if (query.includes('badami') || query.includes('kappe') || query.includes('arabhatta') || query.includes('tripadi')) {
        matchedInscription = this.inscriptions.find((ins) => ins.scriptClass === 'badami_chalukya');
      } else if (query.includes('hoysal') || query.includes('belur') || query.includes('halebid') || query.includes('ballala') || query.includes('chennakeshava')) {
        matchedInscription = this.inscriptions.find((ins) => ins.scriptClass === 'hoysala');
      } else if (query.includes('ashok') || query.includes('maski') || query.includes('brahmagiri') || query.includes('prakrit')) {
        matchedInscription = this.inscriptions.find((ins) => ins.scriptClass === 'ashoka');
      } else if (query.includes('satavahan') || query.includes('sannati')) {
        matchedInscription = this.inscriptions.find((ins) => ins.scriptClass === 'satavahana');
      } else if (query.includes('rashtrakut') || query.includes('kaviraja') || query.includes('atakur') || query.includes('manyakheta')) {
        matchedInscription = this.inscriptions.find((ins) => ins.scriptClass === 'rashtrakuta');
      } else if (query.includes('vijayanagar') || query.includes('hampi') || query.includes('krishnadeva')) {
        matchedInscription = this.inscriptions.find((ins) => ins.scriptClass === 'vijayanagara');
      } else if (query.includes('mysur') || query.includes('wodeyar') || query.includes('kanthirava')) {
        matchedInscription = this.inscriptions.find((ins) => ins.scriptClass === 'mysuru');
      } else if (query.includes('kalyan') || query.includes('lakkundi') || query.includes('gadag') || query.includes('trailokyamalla')) {
        matchedInscription = this.inscriptions.find((ins) => ins.scriptClass === 'kalyana_chalukya');
      } else if (query.includes('kadamb') || query.includes('halmidi') || query.includes('kakustha')) {
        matchedInscription = this.inscriptions.find((ins) => ins.scriptClass === 'kadamba');
      }
    }

    // Visual lithology and morphological stone sampling for arbitrary client uploads
    if (!matchedInscription && typeof document !== 'undefined' && typeof Image !== 'undefined' && file && file.size > 0) {
      try {
        const visualMatch = await new Promise<string | null>((resolve) => {
          const img = new Image();
          const url = URL.createObjectURL(file);
          img.onload = () => {
            try {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              if (!ctx) {
                URL.revokeObjectURL(url);
                resolve(null);
                return;
              }
              canvas.width = 32;
              canvas.height = 32;
              ctx.drawImage(img, 0, 0, 32, 32);
              const data = ctx.getImageData(0, 0, 32, 32).data;
              let rTot = 0, gTot = 0, bTot = 0;
              const count = data.length / 4;
              for (let i = 0; i < data.length; i += 4) {
                rTot += data[i];
                gTot += data[i + 1];
                bTot += data[i + 2];
              }
              const rAvg = rTot / count;
              const gAvg = gTot / count;
              const bAvg = bTot / count;
              const lum = (rAvg + gAvg + bAvg) / 3;
              const aspect = img.width / Math.max(1, img.height);
              URL.revokeObjectURL(url);

              // 1. Red Sandstone lithology (Badami cliff rock face)
              if (rAvg > gAvg + 20 && rAvg > bAvg + 40) {
                resolve('badami_chalukya');
                return;
              }
              // 2. Dark Chloritic Soapstone lithology (Hoysala Belur/Halebidu)
              if (lum < 75) {
                resolve('hoysala');
                return;
              }
              // 3. Tall Granite Stele rubbing (Kadamba Halmidi stele)
              if (aspect < 1.0 || (aspect > 1.8 && lum > 140)) {
                resolve('kadamba');
                return;
              }
              resolve(null);
            } catch {
              URL.revokeObjectURL(url);
              resolve(null);
            }
          };
          img.onerror = () => {
            URL.revokeObjectURL(url);
            resolve(null);
          };
          img.src = url;
        });

        if (visualMatch) {
          matchedInscription = this.inscriptions.find((ins) => ins.scriptClass === visualMatch);
        }
      } catch (err) {
        console.warn('Browser visual lithology sampling skipped:', err);
      }
    }

    // Default to Kadamba Halmidi (foundational Kannada inscription) rather than Ashokan Prakrit
    const kadambaDefault = this.inscriptions.find((ins) => ins.scriptClass === 'kadamba') || this.inscriptions[0];
    const canonical = matchedInscription || kadambaDefault;
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
