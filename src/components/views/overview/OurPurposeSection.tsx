import React from 'react';
import { ArrowRight, FileText, Languages, Users } from 'lucide-react';

interface OurPurposeSectionProps {
  onNavigateToArchive: () => void;
  onNavigateToAnalysis: () => void;
  onNavigateToScripts: () => void;
}

export const OurPurposeSection: React.FC<OurPurposeSectionProps> = ({
  onNavigateToArchive,
  onNavigateToAnalysis,
  onNavigateToScripts,
}) => {
  return (
    <section className="space-y-5">
      {/* Section Header with ornamental dash and timeline tags */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h2 className="font-serif font-bold text-2xl text-[#24150E]">
            Our Purpose
          </h2>
          <div className="flex items-center gap-1.5 text-[#DFCBB0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A84A1C]" />
            <div className="w-16 h-px bg-[#DFCBB0]" />
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-serif font-medium text-[#7C695C] tracking-wide">
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#7C695C]" />
            Past
          </span>
          <span className="text-[#DFCBB0]">•</span>
          <span>Present</span>
          <span className="text-[#DFCBB0]">•</span>
          <span>Future</span>
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Preserve */}
        <div
          onClick={onNavigateToArchive}
          className="group relative bg-[#FDF6ED] border border-[#F1E0CE] rounded-2xl p-6 flex flex-col justify-between space-y-5 hover:shadow-md hover:border-[#E8CDB4] transition-all cursor-pointer overflow-hidden"
        >
          <div className="space-y-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-[#F6DFCE] text-[#8C3B18] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 3c-2 4-5 7-9 9 4 2 7 5 9 9 2-4 5-7 9-9-4-2-7-5-9-9z" />
                <path d="M12 12c-1.5-2-3-3-5-3 2 1.5 3 3 5 3z" />
                <path d="M12 12c1.5-2 3-3 5-3-2 1.5-3 3-5 3z" />
              </svg>
            </div>

            <div>
              <h3 className="font-serif font-bold text-lg text-[#24150E] group-hover:text-[#8C3B18] transition-colors">
                Preserve
              </h3>
              <p className="text-xs text-[#6F5B4F] leading-relaxed pt-1 font-serif">
                Digitally archive and preserve thousands of Kannada inscriptions for future generations.
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-2 relative z-10">
            <div className="w-7 h-7 rounded-full bg-[#F3D7C1] text-[#7A3215] flex items-center justify-center group-hover:bg-[#8C3B18] group-hover:text-white transition-all shadow-2xs">
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Card 2: Decode */}
        <div
          onClick={onNavigateToAnalysis}
          className="group relative bg-[#F2F8F4] border border-[#DCEEE2] rounded-2xl p-6 flex flex-col justify-between space-y-5 hover:shadow-md hover:border-[#C4E2CE] transition-all cursor-pointer overflow-hidden"
        >
          <div className="space-y-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-[#DCEDE1] text-[#1E6B44] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
              <FileText className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-serif font-bold text-lg text-[#163827] group-hover:text-[#1E6B44] transition-colors">
                Decode
              </h3>
              <p className="text-xs text-[#4F685B] leading-relaxed pt-1 font-serif">
                Use AI and paleography to identify scripts, language, and historical context.
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-2 relative z-10">
            <div className="w-7 h-7 rounded-full bg-[#CCE4D4] text-[#195637] flex items-center justify-center group-hover:bg-[#1E6B44] group-hover:text-white transition-all shadow-2xs">
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Card 3: Translate */}
        <div
          onClick={onNavigateToAnalysis}
          className="group relative bg-[#F0F6FB] border border-[#D7E7F4] rounded-2xl p-6 flex flex-col justify-between space-y-5 hover:shadow-md hover:border-[#BDD9EF] transition-all cursor-pointer overflow-hidden"
        >
          <div className="space-y-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-[#D8E8F5] text-[#1E5D90] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
              <Languages className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-serif font-bold text-lg text-[#13324C] group-hover:text-[#1E5D90] transition-colors">
                Translate
              </h3>
              <p className="text-xs text-[#4E677B] leading-relaxed pt-1 font-serif">
                Transliterate and translate ancient Kannada into modern Kannada and English.
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-2 relative z-10">
            <div className="w-7 h-7 rounded-full bg-[#CAE0F1] text-[#1A4F7B] flex items-center justify-center group-hover:bg-[#1E5D90] group-hover:text-white transition-all shadow-2xs">
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Card 4: Enable Research */}
        <div
          onClick={onNavigateToScripts}
          className="group relative bg-[#F7F3FB] border border-[#E5DAF0] rounded-2xl p-6 flex flex-col justify-between space-y-5 hover:shadow-md hover:border-[#D4C3E5] transition-all cursor-pointer overflow-hidden"
        >
          <div className="space-y-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-[#E8DCF4] text-[#5E2F8D] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
              <Users className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-serif font-bold text-lg text-[#301A47] group-hover:text-[#5E2F8D] transition-colors">
                Enable Research
              </h3>
              <p className="text-xs text-[#635176] leading-relaxed pt-1 font-serif">
                Support historians, researchers, and the public with verified and accessible knowledge.
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-2 relative z-10">
            <div className="w-7 h-7 rounded-full bg-[#DCCAF0] text-[#50267A] flex items-center justify-center group-hover:bg-[#5E2F8D] group-hover:text-white transition-all shadow-2xs">
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
