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
    <div className="space-y-8">
      {/* 1. Page Header */}
      <PageHeader
        title="Kannada Heritage AI"
        subtitle="Explore inscriptions. Understand their script. Preserve their meaning."
        kannadaSubtitle="ಕನ್ನಡದ ಐತಿಹಾಸಿಕ ಶಾಸನಗಳ ಅಧ್ಯಯನ, ಲಿಪಿ ಗುರುತಿಸುವಿಕೆ ಮತ್ತು ಭಾಷಾಂತರ ಸಂಶೋಧನಾ ವೇದಿಕೆ"
        categoryTag="Institutional Digital Archive"
        action={
          <Button
            variant="primary"
            size="md"
            icon={<SearchCode className="w-4 h-4" />}
            onClick={onNavigateToAnalysis}
          >
            Analyze an inscription
          </Button>
        }
      />

      {/* 2. Main Workspace: Editorial-Style Archival Feature */}
      <div className="border border-heritage-border bg-parchment-50 rounded-xs overflow-hidden shadow-subtle grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Column: Authentic Archival Image Slot */}
        <div className="lg:col-span-5 bg-stone-900 border-b lg:border-b-0 lg:border-r border-heritage-border relative overflow-hidden flex items-center justify-center min-h-[300px]">
          {featuredStele && (
            <>
              <img
                src={featuredStele.imageUrl}
                alt={featuredStele.title}
                className="w-full h-full object-cover max-h-[360px] opacity-90 select-none"
              />
              <div className="absolute inset-0 bg-stone-900/30"></div>
              {/* Image Identification Plate */}
              <div className="absolute bottom-3 left-3 right-3 bg-stone-950/90 border border-stone-700/80 p-2.5 rounded-xs text-[11px] font-mono text-stone-300 backdrop-blur-sm flex items-center justify-between">
                <div>
                  <span className="text-stone-400 block text-[9px] uppercase tracking-wider">Reference Stele</span>
                  <span className="font-serif italic text-stone-200">{featuredStele.title}</span>
                </div>
                <Badge variant="period" size="sm">
                  {featuredStele.historicalContext.century}
                </Badge>
              </div>
            </>
          )}
        </div>

        {/* Right Column: Editorial Inscription Description & Call To Action */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-heritage-ochre font-bold">
                Archival Research Spotlight
              </span>
              <span className="text-stone-300">•</span>
              <span className="font-mono text-xs text-stone-500">Halmidi (c. 450 CE)</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 leading-snug">
              Preserving Two Millennia of Karnataka Epigraphical Memory
            </h2>

            <p className="text-xs sm:text-sm text-stone-700 font-serif leading-relaxed">
              From the 3rd Century BCE Mauryan rock edicts at Maski to the flourishing classical epigraphs 
              of the Kadambas, Chalukyas, and Hoysalas, Karnataka possesses tens of thousands of inscriptional monuments. 
              This research platform provides calibrated tools to classify historical script eras, separate the source language 
              from the script, and accurately render original text into Modern Standard Kannada.
            </p>

            <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="border border-stone-200 bg-stone-50/70 p-2.5 rounded-xs">
                <span className="font-mono text-[10px] uppercase text-stone-400 block">Script Eras</span>
                <span className="font-serif font-bold text-stone-900">10 Historical Stages</span>
              </div>
              <div className="border border-stone-200 bg-stone-50/70 p-2.5 rounded-xs">
                <span className="font-mono text-[10px] uppercase text-stone-400 block">Chronology</span>
                <span className="font-mono font-medium text-stone-900">3rd C. BCE – Present</span>
              </div>
              <div className="border border-stone-200 bg-stone-50/70 p-2.5 rounded-xs col-span-2 sm:col-span-1">
                <span className="font-mono text-[10px] uppercase text-stone-400 block">Linguistic Scope</span>
                <span className="font-serif font-bold text-stone-900">Old to Modern Kannada</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-heritage-border flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="md"
              icon={<SearchCode className="w-4 h-4" />}
              onClick={onNavigateToAnalysis}
            >
              Analyze an inscription
            </Button>
            <Button
              variant="outline"
              size="md"
              icon={<Archive className="w-4 h-4" />}
              onClick={onNavigateToArchive}
            >
              Browse archival catalog
            </Button>
          </div>
        </div>
      </div>

      {/* 3. Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={onNavigateToAnalysis}
          className="p-4 border border-heritage-border bg-stone-100/50 hover:bg-stone-200/50 rounded-xs text-left transition-colors space-y-1.5 shadow-subtle group"
        >
          <div className="flex items-center justify-between text-stone-700">
            <div className="w-7 h-7 rounded-xs border border-stone-300 bg-parchment-50 flex items-center justify-center">
              <SearchCode className="w-4 h-4 text-stone-800" />
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <h3 className="font-serif font-bold text-sm text-stone-900">Analyze an Inscription</h3>
          <p className="text-[11px] text-stone-500 font-serif leading-normal">
            Upload rubbings, stone photos, or copper plates for script identification and translation.
          </p>
        </button>

        <button
          onClick={onNavigateToArchive}
          className="p-4 border border-heritage-border bg-stone-100/50 hover:bg-stone-200/50 rounded-xs text-left transition-colors space-y-1.5 shadow-subtle group"
        >
          <div className="flex items-center justify-between text-stone-700">
            <div className="w-7 h-7 rounded-xs border border-stone-300 bg-parchment-50 flex items-center justify-center">
              <Archive className="w-4 h-4 text-stone-800" />
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <h3 className="font-serif font-bold text-sm text-stone-900">Browse the Archive</h3>
          <p className="text-[11px] text-stone-500 font-serif leading-normal">
            Inspect canonical Karnataka inscriptions catalogued across districts and dynasties.
          </p>
        </button>

        <button
          onClick={onNavigateToScripts}
          className="p-4 border border-heritage-border bg-stone-100/50 hover:bg-stone-200/50 rounded-xs text-left transition-colors space-y-1.5 shadow-subtle group"
        >
          <div className="flex items-center justify-between text-stone-700">
            <div className="w-7 h-7 rounded-xs border border-stone-300 bg-parchment-50 flex items-center justify-center">
              <Layers className="w-4 h-4 text-stone-800" />
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <h3 className="font-serif font-bold text-sm text-stone-900">Explore Script Classifications</h3>
          <p className="text-[11px] text-stone-500 font-serif leading-normal">
            Trace the 2,300-year evolution from Ashokan Brahmi to modern Kannada typography.
          </p>
        </button>
      </div>

      {/* 4. Two-Column Workspace: Recent Inscriptions Table & Research Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Inscriptions Table (8 Columns) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between border-b border-heritage-border pb-2">
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Recent Inscription Records
              </h3>
              <p className="text-xs text-stone-500 font-serif">
                Locally catalogued baseline epigraphs available for paleographic study.
              </p>
            </div>
            <button
              onClick={onNavigateToArchive}
              className="text-xs font-mono text-stone-600 hover:text-stone-900 flex items-center gap-1"
            >
              <span>View all ({inscriptions.length})</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="border border-heritage-border bg-parchment-50 rounded-xs overflow-x-auto shadow-subtle">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100/80 border-b border-heritage-border text-stone-600 font-mono text-[10px] uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-4 font-semibold">Inscription</th>
                  <th className="py-2.5 px-3 font-semibold">Detected Script</th>
                  <th className="py-2.5 px-3 font-semibold">Source Language</th>
                  <th className="py-2.5 px-3 font-semibold">Estimated Period</th>
                  <th className="py-2.5 px-3 font-semibold">Review Status</th>
                  <th className="py-2.5 px-4 font-semibold text-right">Last Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-heritage-border/60">
                {inscriptions.map((ins) => (
                  <tr
                    key={ins.id}
                    onClick={() => onSelectInscription(ins)}
                    className="hover:bg-parchment-100/60 cursor-pointer transition-colors group"
                  >
                    <td className="py-3 px-4">
                      <div className="font-serif font-bold text-stone-900 group-hover:text-heritage-ochre transition-colors">
                        {ins.title}
                      </div>
                      <div className="font-mono text-[10px] text-stone-400">
                        {ins.accessionNumber}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <Badge variant="script" size="sm">
                        {ins.scriptClass.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="py-3 px-3">
                      <Badge variant="language" size="sm">
                        {ins.sourceLanguage.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-stone-600">
                      {ins.historicalContext.century}
                    </td>
                    <td className="py-3 px-3">
                      <StatusIndicator status={ins.reviewStatus} size="sm" />
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-stone-500 text-right">
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
          <div className="border-b border-heritage-border pb-2">
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Research Activity
            </h3>
            <p className="text-xs text-stone-500 font-serif">
              Recent local scholarly reviews and paleographical annotations.
            </p>
          </div>

          <div className="border border-heritage-border bg-stone-100/50 rounded-xs p-4 space-y-3.5 shadow-subtle">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="border-b border-heritage-border/60 pb-3 last:border-b-0 last:pb-0 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                  <span className="flex items-center gap-1 font-semibold text-stone-600">
                    <CheckCircle className="w-3 h-3 text-stone-500" />
                    {activity.title}
                  </span>
                  <span>{activity.timestamp}</span>
                </div>
                <p className="text-xs text-stone-700 font-serif leading-snug">
                  {activity.description}
                </p>
                <div className="flex items-center justify-between text-[10px] text-stone-500 pt-0.5">
                  <span className="font-serif italic">{activity.scholar}</span>
                  <span className="font-mono text-stone-400 truncate max-w-[140px]">
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
