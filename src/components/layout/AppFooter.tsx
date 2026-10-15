import React from 'react';
import { Landmark, FileText, Database } from 'lucide-react';

export const AppFooter: React.FC = () => {
  return (
    <footer className="border-t border-heritage-border bg-stone-100 py-10 mt-16 text-stone-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Landmark className="w-4 h-4 text-stone-600" />
              <span className="font-serif font-bold text-stone-900 text-sm">
                Kannada Heritage AI
              </span>
            </div>
            <p className="text-stone-500 leading-relaxed font-serif text-xs">
              A scholarly paleographic computing platform engineered for Indian epigraphical research, 
              historical script tracking across 10 chronological stages, and linguistic reconstruction 
              of inscriptional records from Karnataka.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-4 h-4 text-stone-600" />
              <span className="font-serif font-bold text-stone-900 text-sm">
                Epigraphical Corpus Reference
              </span>
            </div>
            <p className="text-stone-500 leading-relaxed text-xs">
              Corpus catalog numbers follow standard classifications harmonized with 
              <em>Epigraphia Carnatica</em> (Vols. I–XVI), <em>South Indian Inscriptions</em> (SII), 
              and Karnataka State Archaeology field registers.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-stone-600" />
              <span className="font-serif font-bold text-stone-900 text-sm">
                Architecture & Phase 1 Boundary
              </span>
            </div>
            <p className="text-stone-500 leading-relaxed text-xs">
              Frontend workspace foundation. Operates exclusively with verified inscriptional mock data 
              via typed service adapters. Real deep-learning models (CNN+ViT, YOLOv11) and FastAPI endpoints 
              connect via adapter interface.
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-stone-500 gap-3">
          <p>© 2026 Archaeological & Computational Epigraphy Research. Academic Open-Access Initiative.</p>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>React 18</span>
            <span>•</span>
            <span>TypeScript</span>
            <span>•</span>
            <span>Vite</span>
            <span>•</span>
            <span>FastAPI Adapter Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
