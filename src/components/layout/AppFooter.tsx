import React from 'react';
import { Landmark, FileText, Database, BookOpen } from 'lucide-react';

export const AppFooter: React.FC = () => {
  return (
    <footer className="border-t border-[#DFCBB0] bg-[#FAF7F2] py-12 mt-20 text-[#6C584C] text-xs relative overflow-hidden shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-[#E8DEC8]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-md bg-[#EFE5D2] border border-[#DFCBB0] text-[#7C3517]">
                <Landmark className="w-4 h-4" />
              </div>
              <span className="font-serif font-bold text-[#1E120B] text-sm tracking-wide">
                Karnataka Epigraphical Archive
              </span>
            </div>
            <p className="text-[#564337] leading-relaxed font-serif text-xs">
              A scholarly paleographic computing platform engineered for Indian epigraphical research, 
              historical script tracking across 10 chronological stages, and linguistic reconstruction 
              of inscriptional records from Karnataka.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-md bg-[#EFE5D2] border border-[#DFCBB0] text-[#7C3517]">
                <Database className="w-4 h-4" />
              </div>
              <span className="font-serif font-bold text-[#1E120B] text-sm tracking-wide">
                Epigraphical Corpus Reference
              </span>
            </div>
            <p className="text-[#564337] leading-relaxed text-xs">
              Corpus catalog numbers follow standard classifications harmonized with 
              <em className="text-[#1E120B] font-semibold"> Epigraphia Carnatica</em> (Vols. I–XVI), <em className="text-[#1E120B] font-semibold">South Indian Inscriptions</em> (SII), 
              and Karnataka State Archaeology field registers.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-md bg-[#EFE5D2] border border-[#DFCBB0] text-[#7C3517]">
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-serif font-bold text-[#1E120B] text-sm tracking-wide">
                Computational Paleography Lab
              </span>
            </div>
            <p className="text-[#564337] leading-relaxed text-xs">
              High-precision OCR and transformer-based Halegannada language modeling. 
              Equipped with decoupled service adapters ready for live FastAPI and PyTorch model endpoints.
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[#7C695C] gap-3">
          <p className="flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-[#8C3B18]" />
            <span>© 2026 Karnataka Epigraphical Archive &amp; Computational Paleography Workbench. Open-Access Research.</span>
          </p>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span className="hover:text-[#1E120B] cursor-pointer">Epigraphia Carnatica BL-58</span>
            <span>•</span>
            <span className="hover:text-[#1E120B] cursor-pointer">ASI Inscription Registry</span>
            <span>•</span>
            <span className="hover:text-[#1E120B] cursor-pointer">TEI-XML Schema</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
