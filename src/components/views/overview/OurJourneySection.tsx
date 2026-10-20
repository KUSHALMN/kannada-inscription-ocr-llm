import React from 'react';
import { Landmark, Cpu, Languages, Globe } from 'lucide-react';

interface OurJourneySectionProps {
  onNavigateToArchive: () => void;
  onNavigateToAnalysis: () => void;
}

export const OurJourneySection: React.FC<OurJourneySectionProps> = ({
  onNavigateToArchive,
  onNavigateToAnalysis,
}) => {
  return (
    <section className="space-y-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h2 className="font-serif font-bold text-2xl text-[#24150E]">
          Our Journey
        </h2>
        <div className="flex items-center gap-1.5 text-[#DFCBB0]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A84A1C]" />
          <div className="w-20 h-px bg-[#DFCBB0]" />
        </div>
      </div>

      {/* Container with two internal subcolumns */}
      <div className="bg-[#FFFDF9] border border-[#EADBCA] rounded-2xl p-6 sm:p-7 shadow-xs flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 relative overflow-hidden">
        {/* Left Subcolumn (Span 6): Vertical 4-Epoch Timeline */}
        <div className="md:col-span-6 relative pl-6 space-y-6">
          {/* Continuous vertical timeline connector line */}
          <div className="absolute left-[7px] top-2 bottom-3 w-0.5 bg-[#E4D5BF]" />

          {/* Node 1 */}
          <div className="relative group">
            <span className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#8C3B18] ring-4 ring-[#FAF6EE] group-hover:scale-110 transition-transform" />
            <h4 className="font-serif font-bold text-sm text-[#24150E]">
              Ancient Roots
            </h4>
            <p className="text-xs text-[#6F5B4F] leading-snug pt-0.5 font-serif">
              2,300+ years of epigraphical heritage across Karnataka.
            </p>
          </div>

          {/* Node 2 */}
          <div className="relative group">
            <span className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#A84A1C] ring-4 ring-[#FAF6EE] group-hover:scale-110 transition-transform" />
            <h4 className="font-serif font-bold text-sm text-[#24150E]">
              Digitization
            </h4>
            <p className="text-xs text-[#6F5B4F] leading-snug pt-0.5 font-serif">
              High-resolution imaging and cataloguing of inscriptions.
            </p>
          </div>

          {/* Node 3 */}
          <div className="relative group">
            <span className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#C05621] ring-4 ring-[#FAF6EE] group-hover:scale-110 transition-transform" />
            <h4 className="font-serif font-bold text-sm text-[#24150E]">
              AI &amp; Research
            </h4>
            <p className="text-xs text-[#6F5B4F] leading-snug pt-0.5 font-serif">
              Script recognition, translation, and historical analysis.
            </p>
          </div>

          {/* Node 4 */}
          <div className="relative group">
            <span className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#8C3B18] ring-4 ring-[#FAF6EE] group-hover:scale-110 transition-transform" />
            <h4 className="font-serif font-bold text-sm text-[#24150E]">
              Open Access
            </h4>
            <p className="text-xs text-[#6F5B4F] leading-snug pt-0.5 font-serif">
              Making Karnataka’s history accessible to everyone.
            </p>
          </div>
        </div>

        {/* Right Subcolumn (Span 6): Visual Heritage Route with milestones & temple silhouettes */}
        <div className="md:col-span-6 relative flex flex-col items-center justify-between min-h-[260px] bg-[#FAF5EC]/70 rounded-xl p-4 border border-[#EEDBCA] overflow-hidden">
          {/* Etched temple background artwork */}
          <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
            <svg viewBox="0 0 300 200" className="w-full h-full text-[#8C3B18]" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M 50 180 L 50 120 L 75 70 L 100 120 L 100 180 Z" />
              <path d="M 120 180 L 120 90 L 150 40 L 180 90 L 180 180 Z" />
              <path d="M 200 180 L 200 110 L 225 60 L 250 110 L 250 180 Z" />
              <line x1="20" y1="180" x2="280" y2="180" />
            </svg>
          </div>

          {/* Decorative winding road SVG connecting the 4 milestones */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 240 240" fill="none">
            <path
              d="M 50 200 C 130 180 70 140 140 120 C 190 105 130 60 170 40"
              stroke="#DFCBB0"
              strokeWidth="32"
              strokeLinecap="round"
            />
            <path
              d="M 50 200 C 130 180 70 140 140 120 C 190 105 130 60 170 40"
              stroke="#CBB394"
              strokeWidth="2"
              strokeDasharray="4 4"
              strokeLinecap="round"
            />
          </svg>

          {/* Milestone 1: Inscriptions */}
          <div className="relative z-10 self-start ml-2 flex items-center gap-2 group cursor-pointer" onClick={onNavigateToArchive}>
            <div className="w-8 h-8 rounded-full bg-[#FAF3E8] border border-[#CFA985] text-[#8C3B18] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              <Landmark className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-serif font-bold text-[#24150E] bg-white/90 px-2 py-0.5 rounded-full border border-[#EADBCA] shadow-2xs">
              Inscriptions
            </span>
          </div>

          {/* Milestone 2: AI Analysis */}
          <div className="relative z-10 self-end mr-4 flex items-center gap-2 group cursor-pointer" onClick={onNavigateToAnalysis}>
            <div className="w-8 h-8 rounded-full bg-[#FAF3E8] border border-[#CFA985] text-[#8C3B18] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              <Cpu className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-serif font-bold text-[#24150E] bg-white/90 px-2 py-0.5 rounded-full border border-[#EADBCA] shadow-2xs">
              AI Analysis
            </span>
          </div>

          {/* Milestone 3: Translations */}
          <div className="relative z-10 self-start ml-8 flex items-center gap-2 group cursor-pointer" onClick={onNavigateToAnalysis}>
            <div className="w-8 h-8 rounded-full bg-[#FAF3E8] border border-[#CFA985] text-[#8C3B18] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              <Languages className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-serif font-bold text-[#24150E] bg-white/90 px-2 py-0.5 rounded-full border border-[#EADBCA] shadow-2xs">
              Translations
            </span>
          </div>

          {/* Milestone 4: Public Access */}
          <div className="relative z-10 self-end mr-2 flex items-center gap-2 group cursor-pointer" onClick={onNavigateToArchive}>
            <div className="w-8 h-8 rounded-full bg-[#FAF3E8] border border-[#CFA985] text-[#8C3B18] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              <Globe className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-serif font-bold text-[#24150E] bg-white/90 px-2 py-0.5 rounded-full border border-[#EADBCA] shadow-2xs">
              Public Access
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
