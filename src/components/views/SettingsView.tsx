import React, { useState, useEffect } from 'react';
import { PageHeader } from '../layout/PageHeader';
import { Button } from '../common/Button';
import { FormField, Input, Select } from '../common/FormField';
import { Server, FileDown, CheckCircle, Database, Sparkles, AlertTriangle, RefreshCw, Cpu } from 'lucide-react';
import { serviceRegistry, fastApiEpigraphyService, AdapterMode } from '../../services/epigraphyService';
import { HealthResponse } from '../../services/fastapiEpigraphyService';

export const SettingsView: React.FC = () => {
  const [apiEndpoint, setApiEndpoint] = useState<string>(() => {
    return localStorage.getItem('epigraphy_api_endpoint') || fastApiEpigraphyService.getBaseUrl();
  });
  const [adapterMode, setAdapterMode] = useState<AdapterMode>(() => serviceRegistry.getMode());
  const [exportFormat, setExportFormat] = useState<string>('markdown');
  const [kannadaFontFamily, setKannadaFontFamily] = useState<string>('noto_serif');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Health telemetry state
  const [isCheckingHealth, setIsCheckingHealth] = useState<boolean>(false);
  const [healthStatus, setHealthStatus] = useState<{
    healthy: boolean;
    latencyMs: number;
    details?: HealthResponse;
  } | null>(null);

  // Run initial health check on mount
  useEffect(() => {
    handleTestConnection();
  }, [apiEndpoint]);

  const handleTestConnection = async () => {
    setIsCheckingHealth(true);
    fastApiEpigraphyService.setBaseUrl(apiEndpoint);
    const result = await fastApiEpigraphyService.checkHealth();
    setHealthStatus(result);
    setIsCheckingHealth(false);
  };

  const handleAdapterChange = (newMode: AdapterMode) => {
    setAdapterMode(newMode);
    if (newMode === 'fastapi') {
      serviceRegistry.useFastApi();
    } else {
      serviceRegistry.useMock();
    }
  };

  const handleSave = () => {
    localStorage.setItem('epigraphy_api_endpoint', apiEndpoint);
    localStorage.setItem('epigraphy_adapter_mode', adapterMode);
    fastApiEpigraphyService.setBaseUrl(apiEndpoint);
    if (adapterMode === 'fastapi') {
      serviceRegistry.useFastApi();
    } else {
      serviceRegistry.useMock();
    }

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <PageHeader
        title="Settings & Archival Configuration"
        subtitle="Manage computational backend endpoints, academic export schemas, and paleographical display parameters."
        kannadaSubtitle="ವೇದಿಕೆ ವ್ಯವಸ್ಥಾಪನೆ ಮತ್ತು ತಾಂತ್ರಿಕ ಸೆಟ್ಟಿಂಗ್ಸ್"
        categoryTag="Platform Administration"
      />

      {isSaved && (
        <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-md text-xs text-emerald-800 flex items-center gap-2.5 shadow-xs font-medium">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Configuration settings updated and applied to active session.</span>
        </div>
      )}

      {/* Backend API Configuration & Telemetry */}
      <div className="border border-slate-200 bg-white p-6 rounded-lg space-y-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <Server className="w-4 h-4 text-amber-600" />
            <h3 className="font-serif font-bold text-base text-slate-900">
              Computational Epigraphy Backend
            </h3>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleTestConnection}
            disabled={isCheckingHealth}
            icon={<RefreshCw className={`w-3.5 h-3.5 ${isCheckingHealth ? 'animate-spin' : ''}`} />}
          >
            {isCheckingHealth ? 'Testing...' : 'Test Connection'}
          </Button>
        </div>

        <p className="text-xs text-slate-600 font-serif leading-relaxed">
          Configure the FastAPI backend server hosting the YOLOv11 character segmentation weights and 
          the hybrid CNN + Vision Transformer epoch classifier (98.75% accuracy model).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="FastAPI Service Base URL"
            hint="Local development or institutional server endpoint"
          >
            <Input
              value={apiEndpoint}
              onChange={(e) => setApiEndpoint(e.target.value)}
              placeholder="http://localhost:8000/api/v1"
            />
          </FormField>

          <FormField
            label="Active Service Adapter"
            hint="Choose between live FastAPI backend or offline demonstrator"
          >
            <Select
              value={adapterMode}
              onChange={(e) => handleAdapterChange(e.target.value as AdapterMode)}
            >
              <option value="fastapi">FastApiEpigraphyService (Live Remote REST API)</option>
              <option value="mock">MockEpigraphyService (Offline Demonstration Store)</option>
            </Select>
          </FormField>
        </div>

        {/* Live Backend Telemetry Card */}
        <div className="p-4 rounded-md border border-slate-200 bg-slate-50/70 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  healthStatus?.healthy
                    ? 'bg-emerald-500 shadow-xs shadow-emerald-400'
                    : 'bg-rose-500'
                } ${isCheckingHealth ? 'animate-pulse' : ''}`}
              />
              <span className="text-xs font-semibold text-slate-800">
                Backend Status:{' '}
                {isCheckingHealth ? (
                  <span className="text-slate-500 font-normal">Pinging server...</span>
                ) : healthStatus?.healthy ? (
                  <span className="text-emerald-700 font-bold">Online & Responsive</span>
                ) : (
                  <span className="text-rose-700 font-bold">Offline / Unreachable</span>
                )}
              </span>
            </div>

            {healthStatus?.latencyMs !== undefined && (
              <span className="text-[11px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                Roundtrip: {healthStatus.latencyMs} ms
              </span>
            )}
          </div>

          {healthStatus?.healthy && healthStatus.details && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200/80 text-[11px]">
              <div className="bg-white p-2 rounded border border-slate-100">
                <div className="text-slate-400 uppercase text-[9px] font-bold">App Version</div>
                <div className="font-semibold text-slate-800 font-mono">v{healthStatus.details.version}</div>
              </div>
              <div className="bg-white p-2 rounded border border-slate-100">
                <div className="text-slate-400 uppercase text-[9px] font-bold">Device Target</div>
                <div className="font-semibold text-slate-800 font-mono flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-amber-600" />
                  {healthStatus.details.deviceName}
                </div>
              </div>
              <div className="bg-white p-2 rounded border border-slate-100">
                <div className="text-slate-400 uppercase text-[9px] font-bold">Torch Inference</div>
                <div className="font-semibold text-slate-800 font-mono">
                  {healthStatus.details.torchAvailable ? 'Available' : 'CPU Native'}
                </div>
              </div>
              <div className="bg-white p-2 rounded border border-slate-100">
                <div className="text-slate-400 uppercase text-[9px] font-bold">Adapter Pipeline</div>
                <div className="font-semibold text-slate-800 font-mono capitalize">
                  {healthStatus.details.adapterMode}
                </div>
              </div>
            </div>
          )}

          {!healthStatus?.healthy && !isCheckingHealth && (
            <div className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded border border-amber-200 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Backend server is currently not responding at <code className="font-mono bg-white px-1 py-0.5 rounded">{apiEndpoint}</code>.
                Make sure you run <code className="font-mono bg-white px-1 py-0.5 rounded">py -3.14 -m uvicorn backend.app.main:app --port 8000</code> in your terminal. The app is falling back safely to local mock demonstration records.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Epigraphical Export Preferences */}
      <div className="border border-slate-200 bg-white p-6 rounded-lg space-y-4 shadow-xs">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <FileDown className="w-4 h-4 text-amber-600" />
          <h3 className="font-serif font-bold text-base text-slate-900">
            Scholarly Export Standards
          </h3>
        </div>

        <div className="space-y-4 max-w-lg">
          <FormField
            label="Default Inscription Export Schema"
            hint="Standard schema format for exporting transcription, translation, and historical metadata"
          >
            <Select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
            >
              <option value="markdown">Academic Markdown with IAST & Hosagannada Tables</option>
              <option value="tei_xml">TEI-XML (Text Encoding Initiative - Epigraphy Module)</option>
              <option value="json_ld">JSON-LD (Linked Open Data for Cultural Heritage)</option>
              <option value="csv_conllu">CoNLL-U (Computational Linguistic Treebank)</option>
            </Select>
          </FormField>
        </div>
      </div>

      {/* Typography & Rendering Preferences */}
      <div className="border border-slate-200 bg-white p-6 rounded-lg space-y-4 shadow-xs">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <Database className="w-4 h-4 text-amber-600" />
          <h3 className="font-serif font-bold text-base text-slate-900">
            Kannada Typography & Rendering
          </h3>
        </div>

        <div className="space-y-4 max-w-lg">
          <FormField
            label="Kannada Script Font Engine"
            hint="Select the preferred font family for inscriptional rendering"
          >
            <Select
              value={kannadaFontFamily}
              onChange={(e) => setKannadaFontFamily(e.target.value)}
            >
              <option value="noto_serif">Noto Serif Kannada (Recommended for Epigraphical Prose)</option>
              <option value="noto_sans">Noto Sans Kannada (Clean Modern Monoline)</option>
              <option value="system">System Default Unicode Font</option>
            </Select>
          </FormField>
        </div>
      </div>

      {/* Save Action */}
      <div className="pt-2">
        <Button
          variant="primary"
          size="md"
          onClick={handleSave}
          icon={<Sparkles className="w-4 h-4" />}
        >
          Save Configuration
        </Button>
      </div>
    </div>
  );
};
