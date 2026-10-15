import React, { useState } from 'react';
import { InscriptionRecord } from '../../types';
import { ImageInspector } from './ImageInspector';
import { EpigraphComparator } from './EpigraphComparator';
import { Upload, ArrowLeft, ShieldCheck } from 'lucide-react';

interface WorkbenchViewProps {
  inscriptions: InscriptionRecord[];
  activeInscription: InscriptionRecord;
  onSelectInscription: (inscription: InscriptionRecord) => void;
  onBackToCorpus: () => void;
}

export const WorkbenchView: React.FC<WorkbenchViewProps> = ({
  inscriptions,
  activeInscription,
  onSelectInscription,
  onBackToCorpus,
}) => {
  const [isSimulatingUpload, setIsSimulatingUpload] = useState<boolean>(false);

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsSimulatingUpload(true);
      setTimeout(() => {
        setIsSimulatingUpload(false);
        // Canonical mock demonstration
        onSelectInscription(inscriptions[0]);
      }, 700);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Workspace Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-heritage-border pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToCorpus}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xs transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Corpus Catalog</span>
          </button>
          <div>
            <h2 className="text-xl font-serif font-bold text-stone-900 tracking-tight">
              {activeInscription.title}
            </h2>
            <p className="font-kannada text-xs text-stone-500">
              {activeInscription.kannadaTitle}
            </p>
          </div>
        </div>

        {/* Inscription Selector & Upload Demonstrator */}
        <div className="flex items-center gap-2">
          {/* Inscription Switcher */}
          <select
            value={activeInscription.id}
            onChange={(e) => {
              const found = inscriptions.find(ins => ins.id === e.target.value);
              if (found) onSelectInscription(found);
            }}
            className="text-xs bg-parchment-50 border border-stone-300 rounded-xs px-2.5 py-1.5 text-stone-800 focus:outline-none focus:border-stone-500 shadow-subtle max-w-[220px] truncate"
          >
            {inscriptions.map((ins) => (
              <option key={ins.id} value={ins.id}>
                {ins.accessionNumber} — {ins.title}
              </option>
            ))}
          </select>

          {/* Upload Inscription Image (Demonstrator) */}
          <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-800 bg-parchment-100/80 hover:bg-stone-200/70 border border-stone-300 rounded-xs transition-colors shadow-subtle">
            <Upload className="w-3.5 h-3.5 text-stone-600" />
            <span>{isSimulatingUpload ? 'Analyzing...' : 'Upload Inscription'}</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleSimulateUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Main Dual-Pane Paleographic Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Pane: High-Fidelity Stone Image Inspector */}
        <div>
          <ImageInspector inscription={activeInscription} />
        </div>

        {/* Right Pane: 4-Pillar Synchronized Comparator */}
        <div>
          <EpigraphComparator inscription={activeInscription} />
        </div>
      </div>

      {/* Research Methodology Footnote */}
      <div className="border border-stone-200/80 bg-stone-100/50 p-4 rounded-xs text-xs text-stone-600 flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-stone-500 mt-0.5 flex-shrink-0" />
        <div className="leading-relaxed font-serif">
          <span className="font-sans font-bold text-stone-800 text-[11px] uppercase tracking-wider block font-mono">
            Research Paleographic Note:
          </span>
          The classification and transcription shown above reflects verified epigraphical records documented in 
          <em>Epigraphia Carnatica</em>. When future neural vision models (CNN + Vision Transformer) are coupled to the 
          FastAPI backend, real-time inference predictions will seamlessly populate through the <code className="font-mono text-stone-800 bg-stone-200/80 px-1 py-0.5 rounded-xs">IEpigraphyService</code> interface.
        </div>
      </div>
    </div>
  );
};
