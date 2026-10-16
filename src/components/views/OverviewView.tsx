import React from 'react';
import { InscriptionRecord, ResearchActivityItem } from '../../types';
import { PageHeader } from '../layout/PageHeader';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { StatusIndicator } from '../common/StatusIndicator';
import {
  SearchCode,
  Archive,
  Layers,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from 'lucide-react';

interface OverviewViewProps {
  inscriptions: InscriptionRecord[];
  recentActivity: ResearchActivityItem[];
  onNavigateToAnalysis: () => void;
  onNavigateToArchive: () => void;
  onNavigateToScripts: () => void;
  onSelectInscription: (inscription: InscriptionRecord) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  inscriptions,
  recentActivity,
  onNavigateToAnalysis,
  onNavigateToArchive,
  onNavigateToScripts,
  onSelectInscription,
}) => {
  // Highlighted canonical editorial stele: Halmidi
  const featuredStele = inscriptions[0];

  return (
    <div className="space-y-10">
      {/* 1. Page Header */}
      <PageHeader
        title="Archaeological Intelligence Hub"
        subtitle="Decode ancient stone epigraphs. Classify historical script epochs. Reconstruct Old Kannada meaning with AI paleography."
        kannadaSubtitle="ಕನ್ನಡದ ಐತಿಹಾಸಿಕ ಶಾಸನಗಳ ಅಧ್ಯಯನ, ಲಿಪಿ ಗುರುತಿಸುವಿಕೆ ಮತ್ತು ಭಾಷಾಂತರ ಸಂಶೋಧನಾ ವೇದಿಕೆ"
        categoryTag="Digital Epigraphia Corpus"
        action={
          <Button
            variant="primary"
            size="lg"
            icon={<SearchCode className="w-4 h-4" />}
            onClick={onNavigateToAnalysis}
          >
            Start Inscription OCR
          </Button>
        }
      />

      {/* 2. Main Workspace: Editorial-Style Archival Feature */}
      <div className="border border-white/10 bg-[#0F1521]/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-elevation grid grid-cols-1 lg:grid-cols-12 gap-0 relative group">
        {/* Subtle Ambient Radial Highlight */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/[0.04] blur-3xl pointer-events-none" />

        {/* Left Column: Authentic Archival Image Slot */}
        <div className="lg:col-span-5 bg-black/60 border-b lg:border-b-0 lg:border-r border-white/10 relative overflow-hidden flex items-center justify-center min-h-[340px]">
          {featuredStele && (
            <>
              <img
                src={featuredStele.imageUrl}
                alt={featuredStele.title}
                className="w-full h-full object-cover max-h-[400px] opacity-85 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700 select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent opacity-80" />
              
              {/* Image Identification Plate */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/85 border border-white/15 p-3 rounded-xl text-xs font-mono text-stone-300 backdrop-blur-md flex items-center justify-between shadow-lg">
                <div className="space-y-0.5">
                  <span className="text-amber-400 block text-[10px] uppercase tracking-wider font-semibold">Reference Stele</span>
                  <span className="font-serif italic text-white text-sm">{featuredStele.title}</span>
                </div>
                <Badge variant="script" size="sm">
                  {featuredStele.historicalContext.century}
                </Badge>
              </div>
            </>
          )}
        </div>

        {/* Right Column: Editorial Inscription Description & Call To Action */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Canonical Stele Spotlight
              </span>
              <span className="text-white/20">•</span>
              <span className="font-mono text-xs text-stone-400">Halmidi (c. 450 CE)</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
              Preserving Two Millennia of Karnataka Epigraphical Heritage
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
              From the 3rd Century BCE Ashokan edicts at Maski to the ornate Hoysala soapstone reliefs at Belur, 
              Karnataka holds over 30,000 documented inscriptional monuments. This digital workbench leverages 
              multimodal paleographical intelligence to detect historical script epochs, transliterate Halegannada ligatures, 
              and translate archaic verses into contemporary Kannada and English.
            </p>

            <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="border border-white/10 bg-white/[0.03] p-3 rounded-xl hover:border-amber-500/30 transition-colors">
                <span className="font-mono text-[10px] uppercase text-stone-400 block mb-1">Script Eras</span>
                <span className="font-serif font-bold text-amber-300 text-sm">10 Historical Epochs</span>
              </div>
              <div className="border border-white/10 bg-white/[0.03] p-3 rounded-xl hover:border-cyan-500/30 transition-colors">
                <span className="font-mono text-[10px] uppercase text-stone-400 block mb-1">Chronology</span>
                <span className="font-mono font-medium text-cyan-300 text-sm">3rd C. BCE – Present</span>
              </div>
              <div className="border border-white/10 bg-white/[0.03] p-3 rounded-xl col-span-2 sm:col-span-1 hover:border-emerald-500/30 transition-colors">
                <span className="font-mono text-[10px] uppercase text-stone-400 block mb-1">Linguistic Range</span>
                <span className="font-serif font-bold text-emerald-300 text-sm">Old to Modern Kannada</span>
              </div>
            </div>
          </div>

          <div className="pt-5 border-t border-white/10 flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="md"
              icon={<SearchCode className="w-4 h-4" />}
              onClick={onNavigateToAnalysis}
            >
              Analyze Stone Rubbing
            </Button>
            <Button
              variant="secondary"
              size="md"
              icon={<Archive className="w-4 h-4" />}
              onClick={onNavigateToArchive}
            >
              Explore Inscription Catalog
            </Button>
          </div>
        </div>
      </div>

      {/* 3. Quick Action Hub */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <button
          onClick={onNavigateToAnalysis}
          className="p-5 border border-white/10 bg-[#0F1521]/70 hover:bg-[#141C2B] hover:border-amber-500/40 rounded-xl text-left transition-all duration-300 space-y-2.5 shadow-sm hover:shadow-glow-amber group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg border border-amber-500/30 bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <SearchCode className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="font-serif font-bold text-base text-white tracking-wide">Analyze New Inscription</h3>
          <p className="text-xs text-stone-400 font-serif leading-relaxed">
            Upload high-resolution stone photographs or rubbings for 5-stage automated paleography analysis.
          </p>
        </button>

        <button
          onClick={onNavigateToArchive}
          className="p-5 border border-white/10 bg-[#0F1521]/70 hover:bg-[#141C2B] hover:border-cyan-500/40 rounded-xl text-left transition-all duration-300 space-y-2.5 shadow-sm hover:shadow-glow-cyan group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <Archive className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="font-serif font-bold text-base text-white tracking-wide">Browse Inscription Archive</h3>
          <p className="text-xs text-stone-400 font-serif leading-relaxed">
            Inspect canonical Karnataka steles catalogued across historical districts and dynasties.
          </p>
        </button>

        <button
          onClick={onNavigateToScripts}
          className="p-5 border border-white/10 bg-[#0F1521]/70 hover:bg-[#141C2B] hover:border-emerald-500/40 rounded-xl text-left transition-all duration-300 space-y-2.5 shadow-sm hover:shadow-glow-emerald group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="font-serif font-bold text-base text-white tracking-wide">Script Evolution Timeline</h3>
          <p className="text-xs text-stone-400 font-serif leading-relaxed">
            Trace the 2,300-year evolution from Ashokan Brahmi to modern Kannada typography.
          </p>
        </button>
      </div>

      {/* 4. Two-Column Workspace: Recent Inscriptions Table & Research Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Inscriptions Table (8 Columns) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="font-serif font-bold text-xl text-white">
                Recent Inscription Records
              </h3>
              <p className="text-xs text-stone-400 font-serif">
                Locally catalogued baseline epigraphs available for paleographic study.
              </p>
            </div>
            <button
              onClick={onNavigateToArchive}
              className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
            >
              <span>View all ({inscriptions.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="border border-white/10 bg-[#0F1521]/80 backdrop-blur-md rounded-xl overflow-x-auto shadow-md">
            <table className="w-full text-left text-xs">
              <thead className="bg-black/40 border-b border-white/10 text-stone-400 font-mono text-[10px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 font-semibold">Inscription</th>
                  <th className="py-3 px-3 font-semibold">Detected Script</th>
                  <th className="py-3 px-3 font-semibold">Source Language</th>
                  <th className="py-3 px-3 font-semibold">Period</th>
                  <th className="py-3 px-3 font-semibold">Review Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {inscriptions.map((ins) => (
                  <tr
                    key={ins.id}
                    onClick={() => onSelectInscription(ins)}
                    className="hover:bg-white/[0.04] cursor-pointer transition-colors group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-serif font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                        {ins.title}
                      </div>
                      <div className="font-mono text-[10px] text-stone-400">
                        {ins.accessionNumber}
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <Badge variant="script" size="sm">
                        {ins.scriptClass.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-3">
                      <Badge variant="language" size="sm">
                        {ins.sourceLanguage.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-[11px] text-stone-300">
                      {ins.historicalContext.century}
                    </td>
                    <td className="py-3.5 px-3">
                      <StatusIndicator status={ins.reviewStatus} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-stone-400 text-right">
                      {ins.lastUpdated}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Research Activity Feed (4 Columns) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="border-b border-white/10 pb-3">
            <h3 className="font-serif font-bold text-xl text-white">
              Research Activity
            </h3>
            <p className="text-xs text-stone-400 font-serif">
              Recent peer annotations and verification log.
            </p>
          </div>

          <div className="border border-white/10 bg-[#0F1521]/80 backdrop-blur-md rounded-xl p-4 space-y-4 shadow-md">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="border-b border-white/[0.07] pb-3.5 last:border-b-0 last:pb-0 space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    {activity.title}
                  </span>
                  <span className="text-stone-500">{activity.timestamp}</span>
                </div>
                <p className="text-xs text-stone-300 font-serif leading-relaxed">
                  {activity.description}
                </p>
                <div className="flex items-center justify-between text-[10px] text-stone-400 pt-1">
                  <span className="font-serif italic text-amber-300/80">{activity.scholar}</span>
                  <span className="font-mono text-stone-500 truncate max-w-[140px]">
                    {activity.inscriptionTitle}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
