import { IEpigraphyService } from '../types';
import { MockEpigraphyService } from './mockEpigraphyService';
import { FastApiEpigraphyService, fastApiEpigraphyService } from './fastapiEpigraphyService';

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
    // Check saved mode or default to FastAPI for live backend
    const savedMode = typeof localStorage !== 'undefined' ? localStorage.getItem('epigraphy_adapter_mode') : null;
    if (savedMode === 'mock') {
      this.activeMode = 'mock';
      this.activeService = new MockEpigraphyService();
    } else {
      this.activeMode = 'fastapi';
      this.activeService = fastApiEpigraphyService;
    }
  }

  public getService(): IEpigraphyService {
    return this.activeService;
  }

  public getMode(): AdapterMode {
    return this.activeMode;
  }

  public useFastApi(): void {
    this.activeMode = 'fastapi';
    this.activeService = fastApiEpigraphyService;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('epigraphy_adapter_mode', 'fastapi');
    }
    this.notify();
  }

  public useMock(): void {
    this.activeMode = 'mock';
    this.activeService = new MockEpigraphyService();
    if (typeof localStorage !== 'undefined') {
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
 * Dynamic Service Proxy:
 * Dispatches every epigraphy call to whichever service adapter is currently active
 * (FastAPI remote backend or offline Mock demonstrator).
 */
export const epigraphyService: IEpigraphyService = {
  getScriptClasses: () => serviceRegistry.getService().getScriptClasses(),
  getSourceLanguages: () => serviceRegistry.getService().getSourceLanguages(),
  getInscriptions: (filter) => serviceRegistry.getService().getInscriptions(filter),
  getInscriptionById: (id: string) => serviceRegistry.getService().getInscriptionById(id),
  updateInscription: (id: string, updates: Partial<import('../types').InscriptionRecord>) =>
    serviceRegistry.getService().updateInscription(id, updates),
  getRecentActivity: (limit?: number) => serviceRegistry.getService().getRecentActivity(limit),
  analyzeInscriptionImage: (file: File | Blob, options?: any) =>
    serviceRegistry.getService().analyzeInscriptionImage(file, options),
};

export { FastApiEpigraphyService, fastApiEpigraphyService, MockEpigraphyService };

