import React from 'react';
import { Landmark, FileText, Database, Sparkles } from 'lucide-react';

export const AppFooter: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 mt-20 text-slate-500 text-xs relative overflow-hidden shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-100">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-md bg-amber-50 border border-amber-200 text-amber-700">
                <Landmark className="w-4 h-4" />
              </div>
              <span className="font-serif font-bold text-slate-900 text-sm tracking-wide">
                Kannada Heritage AI
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed font-serif text-xs">
              A scholarly paleographic computing platform engineered for Indian epigraphical research, 
              historical script tracking across 10 chronological stages, and linguistic reconstruction 
              of inscriptional records from Karnataka.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-md bg-sky-50 border border-sky-200 text-sky-700">
                <Database className="w-4 h-4" />
              </div>
              <span className="font-serif font-bold text-slate-900 text-sm tracking-wide">
                Epigraphical Corpus Reference
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed text-xs">
              Corpus catalog numbers follow standard classifications harmonized with 
              <em className="text-slate-800"> Epigraphia Carnatica</em> (Vols. I–XVI), <em className="text-slate-800">South Indian Inscriptions</em> (SII), 
              and Karnataka State Archaeology field registers.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700">
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-serif font-bold text-slate-900 text-sm tracking-wide">
                Architecture & Paleography Model
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed text-xs">
              High-precision OCR and transformer-based Halegannada language modeling. 
              Equipped with decoupled service adapters ready for live FastAPI and PyTorch model endpoints.
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-3">
          <p className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>© 2026 Archaeological & Computational Epigraphy Research. Open-Access Heritage Initiative.</span>
          </p>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span className="hover:text-slate-800 cursor-pointer">TEI-XML Schema</span>
            <span>•</span>
            <span className="hover:text-slate-800 cursor-pointer">ASI Inscription Registry</span>
            <span>•</span>
            <span className="hover:text-slate-800 cursor-pointer">Epigraphia Carnatica</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
