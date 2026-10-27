import { IEpigraphyService, InscriptionFilter, InscriptionRecord, ScriptClassMetadata, SourceLanguageMetadata, ResearchActivityItem } from '../types';
import { MockEpigraphyService } from './mockEpigraphyService';
import { FastApiEpigraphyService, fastApiEpigraphyService } from './fastapiEpigraphyService';

/**
 * High-Performance Client-Side In-Memory Cache with TTL & Invalidation
 */
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class EpigraphyCache {
  private cache = new Map<string, CacheEntry<any>>();

  public get<T>(key: string, ttlMs: number): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > ttlMs) {
      this.cache.delete(key);
      return null;
    }
    return entry.data as T;
  }

  public set<T>(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  public invalidate(prefix?: string): void {
    if (!prefix) {
      this.cache.clear();
      return;
    }
    for (const key of this.cache.keys()) {
      if (key.startsWith(prefix)) {
        this.cache.delete(key);
      }
    }
  }

  public clear(): void {
    this.cache.clear();
  }
}

export const epigraphyCache = new EpigraphyCache();

/**
 * Service Adapter Factory
 * Allows seamless switching between local mock demonstration data
 * and FastAPI remote endpoints without altering any UI components.
 */
export type AdapterMode = 'fastapi' | 'mock';

type Listener = (mode: AdapterMode) => void;

class ServiceRegistry {
  private activeMode: AdapterMode;
  private activeService: IEpigraphyService;
  private listeners: Set<Listener> = new Set();

  constructor() {
    // Live FastAPI neural backend is primary.
    // Clear stale 'mock' override if present so real neural processing always runs.
    if (typeof localStorage !== 'undefined' && localStorage.getItem('epigraphy_adapter_mode') === 'mock') {
      localStorage.removeItem('epigraphy_adapter_mode');
    }
    this.activeMode = 'fastapi';
    this.activeService = fastApiEpigraphyService;
  }

  public getService(): IEpigraphyService {
    return this.activeService;
  }

  public getMode(): AdapterMode {
    return this.activeMode;
  }

  public useFastApi(): void {
    if (this.activeMode === 'fastapi') return;
    this.activeMode = 'fastapi';
    this.activeService = fastApiEpigraphyService;
    epigraphyCache.clear();
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('epigraphy_adapter_mode', 'fastapi');
    }
    this.notify();
  }

  public useMock(persist = false): void {
    if (this.activeMode === 'mock') return;
    this.activeMode = 'mock';
    this.activeService = new MockEpigraphyService();
    epigraphyCache.clear();
    if (persist && typeof localStorage !== 'undefined') {
      localStorage.setItem('epigraphy_adapter_mode', 'mock');
    }
    this.notify();
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    for (const listener of this.listeners) {
      listener(this.activeMode);
    }
  }
}

export const serviceRegistry = new ServiceRegistry();

/**
 * Dynamic Caching Service Proxy:
 * Dispatches every epigraphy call to active adapter with intelligent in-memory SWR caching.
 */
export const epigraphyService: IEpigraphyService = {
  getScriptClasses: async (): Promise<ScriptClassMetadata[]> => {
    const cacheKey = `scripts_${serviceRegistry.getMode()}`;
    const cached = epigraphyCache.get<ScriptClassMetadata[]>(cacheKey, 300_000); // 5 min TTL
    if (cached) return cached;

    const data = await serviceRegistry.getService().getScriptClasses();
    epigraphyCache.set(cacheKey, data);
    return data;
  },

  getSourceLanguages: async (): Promise<SourceLanguageMetadata[]> => {
    const cacheKey = `languages_${serviceRegistry.getMode()}`;
    const cached = epigraphyCache.get<SourceLanguageMetadata[]>(cacheKey, 300_000); // 5 min TTL
    if (cached) return cached;

    const data = await serviceRegistry.getService().getSourceLanguages();
    epigraphyCache.set(cacheKey, data);
    return data;
  },

  getInscriptions: async (filter?: InscriptionFilter): Promise<InscriptionRecord[]> => {
    const cacheKey = `inscriptions_${serviceRegistry.getMode()}_${JSON.stringify(filter || {})}`;
    const cached = epigraphyCache.get<InscriptionRecord[]>(cacheKey, 60_000); // 1 min TTL
    if (cached) return cached;

    const data = await serviceRegistry.getService().getInscriptions(filter);
    epigraphyCache.set(cacheKey, data);
    return data;
  },

  getInscriptionById: async (id: string): Promise<InscriptionRecord | null> => {
    const cacheKey = `inscription_${serviceRegistry.getMode()}_${id}`;
    const cached = epigraphyCache.get<InscriptionRecord | null>(cacheKey, 60_000);
    if (cached !== null) return cached;

    const data = await serviceRegistry.getService().getInscriptionById(id);
    epigraphyCache.set(cacheKey, data);
    return data;
  },

  updateInscription: async (id: string, updates: Partial<InscriptionRecord>): Promise<InscriptionRecord> => {
    const res = await serviceRegistry.getService().updateInscription(id, updates);
    // Invalidate cached inscription catalogs and individual record
    epigraphyCache.invalidate('inscriptions_');
    epigraphyCache.invalidate(`inscription_${serviceRegistry.getMode()}_${id}`);
    epigraphyCache.invalidate('recent_activity_');
    return res;
  },

  getRecentActivity: async (limit?: number): Promise<ResearchActivityItem[]> => {
    const cacheKey = `recent_activity_${serviceRegistry.getMode()}_${limit || 10}`;
    const cached = epigraphyCache.get<ResearchActivityItem[]>(cacheKey, 30_000); // 30s TTL
    if (cached) return cached;

    const data = await serviceRegistry.getService().getRecentActivity(limit);
    epigraphyCache.set(cacheKey, data);
    return data;
  },

  analyzeInscriptionImage: async (file: File | Blob, options?: any): Promise<import('../types').AnalysisJobResult> => {
    const result = await serviceRegistry.getService().analyzeInscriptionImage(file, options);
    // Invalidate cached lists upon new analysis ingestion
    epigraphyCache.invalidate('inscriptions_');
    epigraphyCache.invalidate('recent_activity_');
    return result;
  },
};

export { FastApiEpigraphyService, fastApiEpigraphyService, MockEpigraphyService };
