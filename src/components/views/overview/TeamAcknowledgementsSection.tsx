import React from 'react';
import { Users, Code2, Landmark } from 'lucide-react';

export const TeamAcknowledgementsSection: React.FC = () => {
  return (
    <section className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h2 className="font-serif font-bold text-2xl text-[#24150E]">
          Our Team &amp; Acknowledgements
        </h2>
        <div className="flex items-center gap-1.5 text-[#DFCBB0]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A84A1C]" />
          <div className="w-20 h-px bg-[#DFCBB0]" />
        </div>
      </div>

      {/* 3 Horizontal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Team 1: Researchers & Historians */}
        <div className="bg-[#FFFDF9] border border-[#EADBCA] rounded-2xl p-5 flex items-center gap-4 shadow-2xs hover:shadow-xs transition-all">
          <div className="w-12 h-12 rounded-xl bg-[#F7E1D0] text-[#8C3B18] flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-sm text-[#24150E]">
              Researchers &amp; Historians
            </h4>
            <p className="text-xs text-[#6F5B4F] leading-snug pt-0.5 font-serif">
              Guidance, verification, and academic support.
            </p>
          </div>
        </div>

        {/* Team 2: Technology & AI */}
        <div className="bg-[#FFFDF9] border border-[#EADBCA] rounded-2xl p-5 flex items-center gap-4 shadow-2xs hover:shadow-xs transition-all">
          <div className="w-12 h-12 rounded-xl bg-[#DBEAF6] text-[#1E5D8F] flex items-center justify-center shrink-0">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-sm text-[#24150E]">
              Technology &amp; AI
            </h4>
            <p className="text-xs text-[#6F5B4F] leading-snug pt-0.5 font-serif">
              Building intelligent tools for epigraphical analysis.
            </p>
          </div>
        </div>

        {/* Team 3: Cultural Institutions */}
        <div className="bg-[#FFFDF9] border border-[#EADBCA] rounded-2xl p-5 flex items-center gap-4 shadow-2xs hover:shadow-xs transition-all">
          <div className="w-12 h-12 rounded-xl bg-[#F2DFCE] text-[#843314] flex items-center justify-center shrink-0">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-sm text-[#24150E]">
              Cultural Institutions
            </h4>
            <p className="text-xs text-[#6F5B4F] leading-snug pt-0.5 font-serif">
              Collaboration with museums, archives, and universities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
