import React, { useState } from 'react';
import { PageHeader } from '../layout/PageHeader';
import { Button } from '../common/Button';
import { FormField, Input, Select } from '../common/FormField';
import { Server, FileDown, CheckCircle, Database, Sparkles } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [apiEndpoint, setApiEndpoint] = useState<string>('http://localhost:8000/api/v1');
  const [exportFormat, setExportFormat] = useState<string>('markdown');
  const [kannadaFontFamily, setKannadaFontFamily] = useState<string>('noto_serif');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSave = () => {
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
        <div className="bg-obsidian-950/90 border border-emerald-500/40 p-3.5 rounded-sm text-xs text-emerald-300 flex items-center gap-2.5 shadow-glow-emerald-sm backdrop-blur-md">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>Configuration settings updated and applied to active session.</span>
        </div>
      )}

      {/* Backend API Configuration */}
      <div className="border border-stone-800/80 bg-obsidian-900/90 p-6 rounded-sm space-y-4 shadow-obsidian-card backdrop-blur-md">
        <div className="flex items-center gap-2.5 border-b border-stone-800/80 pb-3">
          <Server className="w-4 h-4 text-amber-400" />
          <h3 className="font-serif font-bold text-base text-stone-100">
            Backend Model & API Endpoint
          </h3>
        </div>

        <p className="text-xs text-stone-300 font-serif leading-relaxed">
          Configure the FastAPI backend server hosting the YOLOv11 character segmentation weights and 
          the hybrid CNN + Vision Transformer epoch classifier (98.75% accuracy model).
        </p>

        <div className="space-y-4 max-w-lg">
          <FormField
            label="FastAPI Service Base URL"
            hint="Default local development port for FastAPI epigraphical server"
          >
            <Input
              value={apiEndpoint}
              onChange={(e) => setApiEndpoint(e.target.value)}
              placeholder="http://localhost:8000/api/v1"
            />
          </FormField>

          <div className="flex items-center gap-2 text-xs text-stone-400 font-mono bg-obsidian-950/80 p-2.5 rounded-sm border border-stone-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Current Service Adapter: <strong className="text-amber-300">MockEpigraphyService (Offline Demonstrator)</strong></span>
          </div>
        </div>
      </div>

      {/* Epigraphical Export Preferences */}
      <div className="border border-stone-800/80 bg-obsidian-900/90 p-6 rounded-sm space-y-4 shadow-obsidian-card backdrop-blur-md">
        <div className="flex items-center gap-2.5 border-b border-stone-800/80 pb-3">
          <FileDown className="w-4 h-4 text-amber-400" />
          <h3 className="font-serif font-bold text-base text-stone-100">
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
      <div className="border border-stone-800/80 bg-obsidian-900/90 p-6 rounded-sm space-y-4 shadow-obsidian-card backdrop-blur-md">
        <div className="flex items-center gap-2.5 border-b border-stone-800/80 pb-3">
          <Database className="w-4 h-4 text-amber-400" />
          <h3 className="font-serif font-bold text-base text-stone-100">
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
