import { IEpigraphyService } from '../types';
import { MockEpigraphyService } from './mockEpigraphyService';

/**
 * Service Adapter Factory
 * Allows seamless switching between local mock demonstration data
 * and future FastAPI remote endpoints without altering any UI components.
 */
class ServiceRegistry {
  private activeService: IEpigraphyService;

  constructor() {
    // Phase 1 defaults to MockEpigraphyService with strictly typed mock data
    this.activeService = new MockEpigraphyService();
  }

  public getService(): IEpigraphyService {
    return this.activeService;
  }

  public setService(service: IEpigraphyService): void {
    this.activeService = service;
  }
}

export const serviceRegistry = new ServiceRegistry();
export const epigraphyService = serviceRegistry.getService();
