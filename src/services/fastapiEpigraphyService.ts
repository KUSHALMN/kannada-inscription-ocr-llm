import {
  IEpigraphyService,
  InscriptionRecord,
  ScriptClassMetadata,
  SourceLanguageMetadata,
  InscriptionFilter,
  AnalysisJobResult,
  ResearchActivityItem,
  ScriptClassId,
  SourceLanguageId,
} from '../types';

/**
 * Optional metadata fields accepted when submitting an inscriptional rubbing
 * or monument photograph for computational paleography.
 */
export interface AnalyzeRubbingOptions {
  title?: string;
  location?: string;
  dynasty?: string;
  approximateDate?: string;
  knownScript?: ScriptClassId | 'uncertain';
  knownLanguage?: SourceLanguageId | 'uncertain';
  researcherNotes?: string;
}

export interface JobStatusResponse {
  jobId: string;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'partial';
  progress: number;
  currentStep?: string;
  result?: AnalysisJobResult;
  errorMessage?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface HealthResponse {
  status: string;
  appName: string;
  version: string;
  timestamp: string;
  environment: string;
  adapterMode: string;
  torchAvailable: boolean;
  gpuAvailable: boolean;
  deviceName: string;
  deviceCount: number;
  vramAllocatedMb?: number | null;
  vramTotalMb?: number | null;
  modelLoadedFlags: Record<string, boolean>;
}

export class EpigraphyApiError extends Error {
  public statusCode: number;
  public errorCode?: string;
  public details?: unknown;

  constructor(message: string, statusCode: number, errorCode?: string, details?: unknown) {
    super(message);
    this.name = 'EpigraphyApiError';
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
  }
}

/**
 * FastApiEpigraphyService
 * Production-ready HTTP client implementation of IEpigraphyService.
 * Connects directly to the Kannada Heritage AI FastAPI backend (/api/v1).
 */
export class FastApiEpigraphyService implements IEpigraphyService {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    // Defaults to VITE_API_URL or local FastAPI dev port
    const envUrl = typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL;
    this.baseUrl = (baseUrl || envUrl || 'http://localhost:8000/api/v1').replace(/\/+$/, '');
  }

  /**
   * Internal request helper with structured error parsing and correlation tracing.
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    const headers = new Headers(options.headers || {});

    // Ensure Accept header is json unless specified
    if (!headers.has('Accept')) {
      headers.set('Accept', 'application/json');
    }

    try {
      const response = await fetch(url, { ...options, headers });

      if (!response.ok) {
        let errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
        let errorCode: string | undefined;
        let errorData: unknown;

        try {
          const body = await response.json();
          errorData = body;
          if (body.error && body.error.message) {
            errorMessage = body.error.message;
            errorCode = body.error.code;
          } else if (body.detail) {
            errorMessage = typeof body.detail === 'string' ? body.detail : JSON.stringify(body.detail);
          }
        } catch {
          // Response body was not JSON
        }

        throw new EpigraphyApiError(errorMessage, response.status, errorCode, errorData);
      }

      return (await response.json()) as T;
    } catch (err: unknown) {
      if (err instanceof EpigraphyApiError) {
        throw err;
      }
      throw new EpigraphyApiError(
        err instanceof Error ? err.message : 'Network request failed. Is the FastAPI backend running?',
        0
      );
    }
  }

  // =========================================================================
  // Metadata Queries
  // =========================================================================

  async getScriptClasses(): Promise<ScriptClassMetadata[]> {
    return this.request<ScriptClassMetadata[]>('/scripts');
  }

  async getScriptClassById(id: ScriptClassId): Promise<ScriptClassMetadata> {
    return this.request<ScriptClassMetadata>(`/scripts/${id}`);
  }

  async getSourceLanguages(): Promise<SourceLanguageMetadata[]> {
    return this.request<SourceLanguageMetadata[]>('/languages');
  }

  async getSourceLanguageById(id: SourceLanguageId): Promise<SourceLanguageMetadata> {
    return this.request<SourceLanguageMetadata>(`/languages/${id}`);
  }

  // =========================================================================
  // Catalog Queries & Updates
  // =========================================================================

  async getInscriptions(filter?: InscriptionFilter): Promise<InscriptionRecord[]> {
    const params = new URLSearchParams();

    if (filter) {
      if (filter.scriptClass && filter.scriptClass !== 'all') {
        params.append('scriptClass', filter.scriptClass);
      }
      if (filter.sourceLanguage && filter.sourceLanguage !== 'all') {
        params.append('sourceLanguage', filter.sourceLanguage);
      }
      if (filter.substrate && filter.substrate !== 'all') {
        params.append('substrate', filter.substrate);
      }
      if (filter.reviewStatus && filter.reviewStatus !== 'all') {
        params.append('reviewStatus', filter.reviewStatus);
      }
      if (filter.historicalPeriod && filter.historicalPeriod !== 'all') {
        params.append('historicalPeriod', filter.historicalPeriod);
      }
      if (filter.searchQuery && filter.searchQuery.trim() !== '') {
        params.append('searchQuery', filter.searchQuery.trim());
      }
      if (filter.sortBy) {
        // Map frontend sorting keys to backend enum if necessary
        params.append('sortBy', filter.sortBy);
      }
    }

    const qs = params.toString();
    return this.request<InscriptionRecord[]>(`/inscriptions${qs ? `?${qs}` : ''}`);
  }

  async getInscriptionById(id: string): Promise<InscriptionRecord | null> {
    try {
      return await this.request<InscriptionRecord>(`/inscriptions/${id}`);
    } catch (err) {
      if (err instanceof EpigraphyApiError && err.statusCode === 404) {
        return null;
      }
      throw err;
    }
  }

  async updateInscription(id: string, updates: Partial<InscriptionRecord>): Promise<InscriptionRecord> {
    return this.request<InscriptionRecord>(`/inscriptions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
  }

  async getRecentActivity(limit = 10): Promise<ResearchActivityItem[]> {
    return this.request<ResearchActivityItem[]>(`/activity?limit=${limit}`);
  }

  // =========================================================================
  // Paleographical Analysis (Sync & Async)
  // =========================================================================

  /**
   * Synchronous analysis ingestion:
   * Uploads rubbing and waits for the full 6-stage computational pipeline.
   */
  async analyzeInscriptionImage(
    file: File | Blob,
    options?: AnalyzeRubbingOptions
  ): Promise<AnalysisJobResult> {
    const formData = new FormData();
    const filename = file instanceof File ? file.name : 'rubbing.jpg';
    formData.append('file', file, filename);

    if (options) {
      if (options.title) formData.append('title', options.title);
      if (options.location) formData.append('location', options.location);
      if (options.dynasty) formData.append('dynasty', options.dynasty);
      if (options.approximateDate) formData.append('approximateDate', options.approximateDate);
      if (options.knownScript) formData.append('knownScript', options.knownScript);
      if (options.knownLanguage) formData.append('knownLanguage', options.knownLanguage);
      if (options.researcherNotes) formData.append('researcherNotes', options.researcherNotes);
    }

    return this.request<AnalysisJobResult>('/analyze', {
      method: 'POST',
      body: formData,
    });
  }

  /**
   * Asynchronous analysis with background polling:
   * Submits to the single-worker GPU queue, polls /jobs/{jobId} until done,
   * invoking an optional progress callback on each progress milestone.
   */
  async analyzeInscriptionImageAsync(
    file: File | Blob,
    options?: AnalyzeRubbingOptions,
    onProgress?: (status: JobStatusResponse) => void,
    pollIntervalMs = 500,
    timeoutMs = 60000
  ): Promise<AnalysisJobResult> {
    const formData = new FormData();
    const filename = file instanceof File ? file.name : 'rubbing.jpg';
    formData.append('file', file, filename);

    if (options) {
      if (options.title) formData.append('title', options.title);
      if (options.location) formData.append('location', options.location);
      if (options.dynasty) formData.append('dynasty', options.dynasty);
      if (options.approximateDate) formData.append('approximateDate', options.approximateDate);
      if (options.knownScript) formData.append('knownScript', options.knownScript);
      if (options.knownLanguage) formData.append('knownLanguage', options.knownLanguage);
      if (options.researcherNotes) formData.append('researcherNotes', options.researcherNotes);
    }

    // 1. Submit job in async mode
    const accepted = await this.request<{ jobId: string; status: string }>('/analyze?async=true', {
      method: 'POST',
      body: formData,
    });

    const jobId = accepted.jobId;
    const startTime = Date.now();

    // 2. Poll until completed or failed
    while (Date.now() - startTime < timeoutMs) {
      const jobStatus = await this.getJobStatus(jobId);

      if (onProgress) {
        onProgress(jobStatus);
      }

      if (jobStatus.status === 'completed' || jobStatus.status === 'partial') {
        if (jobStatus.result) {
          return jobStatus.result;
        }
        throw new EpigraphyApiError(
          jobStatus.errorMessage || `Job ${jobId} finished with status '${jobStatus.status}' but returned no result payload.`,
          500
        );
      }

      if (jobStatus.status === 'failed') {
        throw new EpigraphyApiError(
          jobStatus.errorMessage || `Analysis pipeline failed for job ${jobId}`,
          500
        );
      }

      await new Promise(res => setTimeout(res, pollIntervalMs));
    }

    throw new EpigraphyApiError(`Timed out waiting for analysis job ${jobId} after ${timeoutMs / 1000}s`, 408);
  }

  async getJobStatus(jobId: string): Promise<JobStatusResponse> {
    return this.request<JobStatusResponse>(`/jobs/${jobId}`);
  }

  /**
   * Converts a finished analysis job into a permanent catalog InscriptionRecord.
   */
  async saveAnalyzedJob(jobId: string): Promise<InscriptionRecord> {
    return this.request<InscriptionRecord>(`/analyze/${jobId}/save`, {
      method: 'POST',
    });
  }

  // =========================================================================
  // Telemetry & Hardware Diagnostics
  // =========================================================================

  async getHealth(): Promise<HealthResponse> {
    return this.request<HealthResponse>('/health');
  }
}

// Export singleton configured with standard environment settings
export const fastApiEpigraphyService = new FastApiEpigraphyService();
