import React, { useState } from 'react';
import { InscriptionRecord } from '../../types';
import { PageHeader } from '../layout/PageHeader';
import { Button } from '../common/Button';
import { FormField, Select } from '../common/FormField';
import { ImageInspector } from '../inspector/ImageInspector';
import { EpigraphComparator } from '../inspector/EpigraphComparator';
import { Upload, ShieldAlert, RefreshCw, ArrowLeft } from 'lucide-react';
import { Badge } from '../common/Badge';

interface NewAnalysisViewProps {
  inscriptions: InscriptionRecord[];
  onBackToOverview: () => void;
}

export const NewAnalysisView: React.FC<NewAnalysisViewProps> = ({
  inscriptions,
  onBackToOverview,
}) => {
  const [selectedRecord, setSelectedRecord] = useState<InscriptionRecord>(inscriptions[0]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [hasRunAnalysis, setHasRunAnalysis] = useState<boolean>(true);

  // Preprocessing filter states (simulated research controls)
  const [contrastEnhance, setContrastEnhance] = useState<boolean>(true);
  const [denoiseLevel, setDenoiseLevel] = useState<string>('bilateral_medium');
  const [binarizationMode, setBinarizationMode] = useState<string>('sauvola_adaptive');

  const handleUploadSimulate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setHasRunAnalysis(true);
        // Load canonical record
        setSelectedRecord(inscriptions[0]);
      }, 900);
    }
  };

  const handleReanalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasRunAnalysis(true);
    }, 600);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Epigraphical Analysis Workbench"
        subtitle="Upload rubbings, stone photographs, or copper-plate grants to detect script, reconstruct text, and translate into Modern Kannada."
        categoryTag="Analytical Pipeline"
        action={
          <Button
            variant="outline"
            size="sm"
            icon={<ArrowLeft className="w-3.5 h-3.5" />}
            onClick={onBackToOverview}
          >
            Back to Overview
          </Button>
        }
      />

      {/* Preprocessing & Ingestion Controller Panel */}
      <div className="border border-heritage-border bg-stone-100/60 p-5 rounded-xs shadow-subtle space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200/80 pb-4">
          <div className="flex items-center gap-3">
            {/* Upload Button */}
            <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-parchment-50 bg-stone-900 hover:bg-stone-800 rounded-xs shadow-subtle transition-colors">
              <Upload className="w-4 h-4 text-parchment-100" />
              <span>{isAnalyzing ? 'Ingesting Rubbing...' : 'Upload Inscription Image'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleUploadSimulate}
                className="hidden"
              />
            </label>

            {/* Inscription Selector from Archive */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase text-stone-500">Or Select Sample:</span>
              <select
                value={selectedRecord.id}
                onChange={(e) => {
                  const found = inscriptions.find(i => i.id === e.target.value);
                  if (found) setSelectedRecord(found);
                }}
                className="text-xs bg-parchment-50 border border-stone-300 rounded-xs px-2.5 py-1.5 text-stone-800 focus:outline-none focus:border-stone-600 shadow-subtle"
              >
                {inscriptions.map((ins) => (
                  <option key={ins.id} value={ins.id}>
                    {ins.accessionNumber} — {ins.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            icon={<RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />}
            onClick={handleReanalyze}
            disabled={isAnalyzing}
          >
            Re-run Pipeline
          </Button>
        </div>

        {/* Archival Preprocessing Configuration */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-1">
          <FormField label="Contrast Enhancement (CLAHE)" hint="Enhances weathered stone chisel marks">
            <Select
              value={contrastEnhance ? 'enabled' : 'disabled'}
              onChange={(e) => setContrastEnhance(e.target.value === 'enabled')}
            >
              <option value="enabled">Enabled (Adaptive Clip Limit: 2.0)</option>
              <option value="disabled">Raw Image (Bypass)</option>
            </Select>
          </FormField>

          <FormField label="Surface Denoising" hint="Suppresses crystalline granite background texture">
            <Select
              value={denoiseLevel}
              onChange={(e) => setDenoiseLevel(e.target.value)}
            >
              <option value="bilateral_low">Bilateral Filter (Mild)</option>
              <option value="bilateral_medium">Bilateral Filter (Recommended)</option>
              <option value="wavelet">Wavelet Denoising</option>
            </Select>
          </FormField>

          <FormField label="Binarization Algorithm" hint="Separates stroke relief from stone substrate">
            <Select
              value={binarizationMode}
              onChange={(e) => setBinarizationMode(e.target.value)}
            >
              <option value="sauvola_adaptive">Sauvola Adaptive Thresholding</option>
              <option value="niblack">Niblack Local Binarization</option>
              <option value="otsu">Otsu Global Threshold</option>
            </Select>
          </FormField>
        </div>
      </div>

      {/* Demonstration Notice */}
      <div className="bg-amber-50/70 border border-amber-300/60 p-3 rounded-xs text-xs text-amber-900 flex items-center justify-between">
        <div className="flex items-center gap-2 font-serif">
          <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0" />
          <span>
            <strong>Local Demonstration Mode:</strong> Operating with verified historical sample data. When connected to FastAPI, this workbench receives automated YOLOv11 character segmentation and CNN+ViT epoch inference.
          </span>
        </div>
        <Badge variant="period" size="sm">Phase 1-3</Badge>
      </div>

      {/* Main Dual-Pane High-Precision Workbench */}
      {hasRunAnalysis && selectedRecord && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div>
            <ImageInspector inscription={selectedRecord} />
          </div>
          <div>
            <EpigraphComparator inscription={selectedRecord} />
          </div>
        </div>
      )}
    </div>
  );
};
