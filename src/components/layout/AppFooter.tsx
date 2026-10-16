import React from 'react';
import { Landmark, FileText, Database, Sparkles } from 'lucide-react';

export const AppFooter: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#090D14]/90 py-12 mt-20 text-stone-400 text-xs relative overflow-hidden backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-white/[0.07]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-sm bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Landmark className="w-4 h-4" />
              </div>
              <span className="font-serif font-bold text-stone-100 text-sm tracking-wide">
                Kannada Heritage AI
              </span>
            </div>
            <p className="text-stone-400 leading-relaxed font-serif text-xs">
              A scholarly paleographic computing platform engineered for Indian epigraphical research, 
              historical script tracking across 10 chronological stages, and linguistic reconstruction 
              of inscriptional records from Karnataka.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-sm bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Database className="w-4 h-4" />
              </div>
              <span className="font-serif font-bold text-stone-100 text-sm tracking-wide">
                Epigraphical Corpus Reference
              </span>
            </div>
            <p className="text-stone-400 leading-relaxed text-xs">
              Corpus catalog numbers follow standard classifications harmonized with 
              <em className="text-stone-300"> Epigraphia Carnatica</em> (Vols. I–XVI), <em className="text-stone-300">South Indian Inscriptions</em> (SII), 
              and Karnataka State Archaeology field registers.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-sm bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-serif font-bold text-stone-100 text-sm tracking-wide">
                Architecture & Paleography Model
              </span>
            </div>
            <p className="text-stone-400 leading-relaxed text-xs">
              High-precision OCR and transformer-based Halegannada language modeling. 
              Equipped with decoupled service adapters ready for live FastAPI and PyTorch model endpoints.
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-stone-400 gap-3">
          <p className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>© 2026 Archaeological & Computational Epigraphy Research. Open-Access Heritage Initiative.</span>
          </p>
          <div className="flex items-center gap-3 text-[11px] font-mono text-stone-400">
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">React 18</span>
            <span>•</span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">TypeScript</span>
            <span>•</span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Vite</span>
            <span>•</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">FastAPI Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
