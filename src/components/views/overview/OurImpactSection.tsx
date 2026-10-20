import React from 'react';
import { Landmark, TrendingUp, BookOpen, Globe } from 'lucide-react';

export const OurImpactSection: React.FC = () => {
  return (
    <section className="space-y-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h2 className="font-serif font-bold text-2xl text-[#24150E]">
          Our Impact
        </h2>
        <div className="flex items-center gap-1.5 text-[#DFCBB0]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A84A1C]" />
          <div className="w-20 h-px bg-[#DFCBB0]" />
        </div>
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
        {/* Impact 1: Cultural Preservation */}
        <div className="bg-[#FFF9F3] border border-[#F3E2D2] rounded-2xl p-5 flex flex-col justify-center space-y-3 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-[#F8E3D2] text-[#8C3B18] flex items-center justify-center">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-sm text-[#8C3B18]">
              Cultural Preservation
            </h4>
            <p className="text-xs text-[#6F5B4F] pt-1 leading-snug font-serif">
              Safeguarding Karnataka’s historical inscriptions.
            </p>
          </div>
        </div>

        {/* Impact 2: Research Advancement */}
        <div className="bg-[#F4F9FD] border border-[#DBE9F4] rounded-2xl p-5 flex flex-col justify-center space-y-3 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-[#DBEAF5] text-[#1E5D8F] flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-sm text-[#1E4E79]">
              Research Advancement
            </h4>
            <p className="text-xs text-[#4F6577] pt-1 leading-snug font-serif">
              Enabling new discoveries through AI and data.
            </p>
          </div>
        </div>

        {/* Impact 3: Education & Awareness */}
        <div className="bg-[#F8F5FB] border border-[#E8DEF2] rounded-2xl p-5 flex flex-col justify-center space-y-3 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-[#EADEF5] text-[#5E2F8C] flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-sm text-[#54287A]">
              Education &amp; Awareness
            </h4>
            <p className="text-xs text-[#665478] pt-1 leading-snug font-serif">
              Bringing epigraphical knowledge to students and the public.
            </p>
          </div>
        </div>

        {/* Impact 4: Global Accessibility */}
        <div className="bg-[#F2F9F5] border border-[#D9EDE0] rounded-2xl p-5 flex flex-col justify-center space-y-3 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-[#D7EFE0] text-[#1D6C44] flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-sm text-[#1D674A]">
              Global Accessibility
            </h4>
            <p className="text-xs text-[#4D6758] pt-1 leading-snug font-serif">
              Sharing Karnataka’s heritage with the world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
