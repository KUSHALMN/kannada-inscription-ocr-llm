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
    <div className="space-y-8">
      {/* Top Workspace Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToCorpus}
            className="flex items-center gap-2 px-3.5 py-2 text-xs text-stone-200 bg-white/5 hover:bg-white/10 border border-white/15 rounded-lg transition-colors shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Corpus Catalog</span>
          </button>
          <div>
            <h2 className="text-xl font-serif font-bold text-white tracking-tight">
              {activeInscription.title}
            </h2>
            <p className="font-kannada text-xs text-amber-300/80">
              {activeInscription.kannadaTitle}
            </p>
          </div>
        </div>

        {/* Inscription Selector & Upload Demonstrator */}
        <div className="flex items-center gap-2.5">
          {/* Inscription Switcher */}
          <select
            value={activeInscription.id}
            onChange={(e) => {
              const found = inscriptions.find(ins => ins.id === e.target.value);
              if (found) onSelectInscription(found);
            }}
            className="text-xs bg-[#0F1521] border border-white/15 rounded-lg px-3 py-2 text-stone-200 focus:outline-none focus:border-amber-400 shadow-sm max-w-[220px] truncate"
          >
            {inscriptions.map((ins) => (
              <option key={ins.id} value={ins.id}>
                {ins.accessionNumber} — {ins.title}
              </option>
            ))}
          </select>

          {/* Upload Inscription Image (Demonstrator) */}
          <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-stone-950 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 border border-amber-300/40 rounded-lg transition-all shadow-glow-amber">
            <Upload className="w-3.5 h-3.5 text-stone-950" />
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
      <div className="border border-white/10 bg-[#0F1521]/70 backdrop-blur-md p-4 rounded-xl text-xs text-stone-300 flex items-start gap-3 shadow-sm">
        <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
        <div className="leading-relaxed font-serif">
          <span className="font-sans font-bold text-amber-300 text-[11px] uppercase tracking-wider block font-mono">
            Research Paleographic Note:
          </span>
          The classification and transcription shown above reflects verified epigraphical records documented in 
          <em className="text-stone-200"> Epigraphia Carnatica</em>. When future neural vision models (CNN + Vision Transformer) are coupled to the 
          FastAPI backend, real-time inference predictions will seamlessly populate through the <code className="font-mono text-amber-300 bg-black/40 px-1.5 py-0.5 rounded border border-white/10">IEpigraphyService</code> interface.
        </div>
      </div>
    </div>
  );
};
