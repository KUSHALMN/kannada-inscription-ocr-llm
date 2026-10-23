import { IEpigraphyService } from '../types';
import { MockEpigraphyService } from './mockEpigraphyService';
import { FastApiEpigraphyService, fastApiEpigraphyService } from './fastapiEpigraphyService';

/**
 * Service Adapter Factory
 * Allows seamless switching between local mock demonstration data
 * and FastAPI remote endpoints without altering any UI components.
 */
class ServiceRegistry {
  private activeService: IEpigraphyService;

  constructor() {
    // Defaults to MockEpigraphyService; can be toggled to fastApiEpigraphyService
    this.activeService = new MockEpigraphyService();
  }

  public getService(): IEpigraphyService {
    return this.activeService;
  }

  public setService(service: IEpigraphyService): void {
    this.activeService = service;
  }

  public useFastApi(): void {
    this.activeService = fastApiEpigraphyService;
  }

  public useMock(): void {
    this.activeService = new MockEpigraphyService();
  }
}

export const serviceRegistry = new ServiceRegistry();
export const epigraphyService = serviceRegistry.getService();
export { FastApiEpigraphyService, fastApiEpigraphyService };

