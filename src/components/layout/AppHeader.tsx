import React from 'react';
import { BookOpen, Compass, ShieldAlert, Layers } from 'lucide-react';
import { Badge } from '../common/Badge';

interface AppHeaderProps {
  currentTab: 'corpus' | 'timeline' | 'inspector';
  onTabChange: (tab: 'corpus' | 'timeline' | 'inspector') => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ currentTab, onTabChange }) => {
  return (
    <header className="border-b border-heritage-border bg-parchment-50 sticky top-0 z-40">
      {/* Top institutional banner */}
      <div className="bg-stone-100 border-b border-stone-200/80 px-4 sm:px-8 py-1.5 flex items-center justify-between text-xs text-stone-600">
        <div className="flex items-center gap-2">
          <span className="font-serif italic text-stone-700">Epigraphical Paleography & Linguistic Reconstruction Lab</span>
          <span className="text-stone-300">|</span>
          <span className="font-mono text-[11px] text-stone-500">Karnataka Inscriptional Corpus</span>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="warning" size="sm">
            <span className="flex items-center gap-1 font-mono">
              <ShieldAlert className="w-3 h-3 text-amber-700" />
              Local Demonstration Adapter (Phase 1)
            </span>
          </Badge>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Title Branding */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 border border-heritage-ochre/40 bg-parchment-200 flex items-center justify-center rounded-xs shadow-subtle">
            <span className="font-serif text-xl font-bold text-stone-800">ಕ</span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tracking-tight">
                Kannada Heritage AI
              </h1>
              <span className="text-xs font-serif text-stone-500 hidden sm:inline">v0.1.0-alpha</span>
            </div>
            <p className="text-xs text-stone-600 font-serif">
              ಐತಿಹಾಸಿಕ ಕನ್ನಡ ಶಾಸನ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಭಾಷಾಂತರ ಅಧ್ಯಯನ ವೇದಿಕೆ
            </p>
          </div>
        </div>

        {/* Navigation tabs */}
        <nav className="flex items-center space-x-1 border border-stone-300 bg-stone-100 p-0.5 rounded-xs">
          <button
            onClick={() => onTabChange('corpus')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xs transition-colors ${
              currentTab === 'corpus'
                ? 'bg-parchment-50 text-stone-900 shadow-subtle border border-stone-300/60 font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-stone-500" />
            <span>Epigraph Corpus</span>
          </button>

          <button
            onClick={() => onTabChange('timeline')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xs transition-colors ${
              currentTab === 'timeline'
                ? 'bg-parchment-50 text-stone-900 shadow-subtle border border-stone-300/60 font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-stone-500" />
            <span>Script Timeline (10 Eras)</span>
          </button>

          <button
            onClick={() => onTabChange('inspector')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xs transition-colors ${
              currentTab === 'inspector'
                ? 'bg-parchment-50 text-stone-900 shadow-subtle border border-stone-300/60 font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-stone-500" />
            <span>Paleographic Workbench</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
