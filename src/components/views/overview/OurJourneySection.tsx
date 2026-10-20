import React from 'react';

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

        {/* Right Subcolumn (Span 6): Scholarly Epigraphical Pipeline */}
        <div className="md:col-span-6 flex flex-col justify-between gap-3 bg-[#FAF5EC]/80 rounded-xl p-4 sm:p-5 border border-[#EEDBCA]">
          <div className="text-[11px] font-cinzel font-bold text-[#8C3B18] tracking-wider uppercase border-b border-[#DFCBB0] pb-2 flex items-center justify-between">
            <span>Epigraphical Processing Pipeline</span>
            <span className="text-[10px] text-[#7C695C] font-serif font-normal italic">End-to-End Workflow</span>
          </div>

          <div className="space-y-2.5">
            {/* Step 1 */}
            <div
              onClick={onNavigateToArchive}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-white/80 hover:bg-white border border-[#E8DFC8] shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#F5EADB] text-[#8C3B18] flex items-center justify-center font-cinzel font-bold text-xs shrink-0 group-hover:scale-105 transition-transform">
                01
              </div>
              <div className="min-w-0">
                <div className="font-serif font-bold text-xs text-[#24150E] group-hover:text-[#8C3B18] transition-colors truncate">
                  Archival Epigraph Ingestion
                </div>
                <div className="text-[10px] text-[#7C695C] font-serif truncate">
                  High-resolution stone squeeze &amp; monument photography
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div
              onClick={onNavigateToAnalysis}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-white/80 hover:bg-white border border-[#E8DFC8] shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#EBF4EE] text-[#1D6C44] flex items-center justify-center font-cinzel font-bold text-xs shrink-0 group-hover:scale-105 transition-transform">
                02
              </div>
              <div className="min-w-0">
                <div className="font-serif font-bold text-xs text-[#24150E] group-hover:text-[#1D6C44] transition-colors truncate">
                  Paleographical Ligature Analysis
                </div>
                <div className="text-[10px] text-[#7C695C] font-serif truncate">
                  Deep script epoch classification across 10 historical dynasties
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div
              onClick={onNavigateToAnalysis}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-white/80 hover:bg-white border border-[#E8DFC8] shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#EBF2F8] text-[#1E5D8F] flex items-center justify-center font-cinzel font-bold text-xs shrink-0 group-hover:scale-105 transition-transform">
                03
              </div>
              <div className="min-w-0">
                <div className="font-serif font-bold text-xs text-[#24150E] group-hover:text-[#1E5D8F] transition-colors truncate">
                  Bilingual Textual Decipherment
                </div>
                <div className="text-[10px] text-[#7C695C] font-serif truncate">
                  IAST transliteration into Hosagannada &amp; scholarly English
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div
              onClick={onNavigateToArchive}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-white/80 hover:bg-white border border-[#E8DFC8] shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#F3EEF9] text-[#5E2F8D] flex items-center justify-center font-cinzel font-bold text-xs shrink-0 group-hover:scale-105 transition-transform">
                04
              </div>
              <div className="min-w-0">
                <div className="font-serif font-bold text-xs text-[#24150E] group-hover:text-[#5E2F8D] transition-colors truncate">
                  Open Cultural Preservation Corpus
                </div>
                <div className="text-[10px] text-[#7C695C] font-serif truncate">
                  Open access repository for scholars, universities &amp; public
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
