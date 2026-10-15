import React, { useState } from 'react';
import { InscriptionRecord } from '../../types';
import { Badge } from '../common/Badge';
import { BookOpen, Languages, History, BookMarked, FileCode } from 'lucide-react';

interface EpigraphComparatorProps {
  inscription: InscriptionRecord;
}

export const EpigraphComparator: React.FC<EpigraphComparatorProps> = ({ inscription }) => {
  const [activeTab, setActiveTab] = useState<'transcription' | 'translation_kannada' | 'translation_english' | 'history' | 'lexicon'>('translation_kannada');

  return (
    <div className="border border-heritage-border bg-parchment-50 rounded-xs overflow-hidden flex flex-col h-[520px] shadow-subtle">
      {/* Top Essential Epigraphical Distinction Bar */}
      <div className="bg-stone-100 border-b border-heritage-border p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="font-mono text-xs text-stone-500 font-semibold uppercase tracking-wider">
            {inscription.accessionNumber}
          </span>
          <span className="text-xs font-serif italic text-stone-600">
            {inscription.historicalContext.epigraphiaReference || 'State Epigraphical Survey'}
          </span>
        </div>

        {/* Clear 4-pillar distinction */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-stone-200">
          <div className="bg-stone-50 border border-stone-200 p-2 rounded-xs">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">1. Script</span>
            <span className="font-serif font-bold text-xs text-stone-900 block truncate">
              {inscription.scriptClass.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          <div className="bg-stone-50 border border-stone-200 p-2 rounded-xs">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">2. Source Language</span>
            <span className="font-serif font-bold text-xs text-heritage-terracotta block truncate">
              {inscription.sourceLanguage.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          <div className="bg-stone-50 border border-stone-200 p-2 rounded-xs">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">3. Historical Era</span>
            <span className="font-mono text-[11px] text-stone-800 block truncate">
              {inscription.historicalContext.century}
            </span>
          </div>

          <div className="bg-stone-50 border border-stone-200 p-2 rounded-xs">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">4. Target Translation</span>
            <span className="font-serif font-bold text-xs text-stone-900 block">
              ಹೊಸಗನ್ನಡ + ENGLISH
            </span>
          </div>
        </div>
      </div>

      {/* Synchronized Tabbed Navigation */}
      <div className="flex border-b border-heritage-border bg-stone-100/60 overflow-x-auto">
        <button
          onClick={() => setActiveTab('translation_kannada')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'translation_kannada'
              ? 'border-heritage-ochre text-stone-900 bg-parchment-50 font-bold'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <Languages className="w-3.5 h-3.5 text-stone-600" />
          <span>ಹೊಸಗನ್ನಡ ಅನುವಾದ (Modern)</span>
        </button>

        <button
          onClick={() => setActiveTab('transcription')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'transcription'
              ? 'border-heritage-ochre text-stone-900 bg-parchment-50 font-bold'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <FileCode className="w-3.5 h-3.5 text-stone-600" />
          <span>Original Transcription & IAST</span>
        </button>

        <button
          onClick={() => setActiveTab('translation_english')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'translation_english'
              ? 'border-heritage-ochre text-stone-900 bg-parchment-50 font-bold'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-stone-600" />
          <span>English Translation</span>
        </button>

        <button
          onClick={() => setActiveTab('lexicon')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'lexicon'
              ? 'border-heritage-ochre text-stone-900 bg-parchment-50 font-bold'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <BookMarked className="w-3.5 h-3.5 text-stone-600" />
          <span>Archaic Lexicon ({inscription.translation.glossary.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'history'
              ? 'border-heritage-ochre text-stone-900 bg-parchment-50 font-bold'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <History className="w-3.5 h-3.5 text-stone-600" />
          <span>Historical Context</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {/* Tab: Modern Kannada Translation */}
        {activeTab === 'translation_kannada' && (
          <div className="space-y-4">
            <div className="bg-stone-100/60 border border-stone-200 p-4 rounded-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block mb-1">
                ಸಮಗ್ರ ಹೊಸಗನ್ನಡ ಭಾವಾನುವಾದ (Full Modern Meaning):
              </span>
              <p className="kannada-text text-stone-900 text-sm leading-relaxed">
                {inscription.translation.modernKannada}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                ಸಾಲು ಸಾಲಿನ ಅನುವಾದ ತಾಳೆ (Line-by-Line Alignment):
              </span>
              {inscription.transcription.lines.map((line) => (
                <div key={line.lineNumber} className="border border-heritage-border bg-stone-50/70 p-3 rounded-xs space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                    <span>LINE {line.lineNumber}</span>
                    <span className="text-stone-500 font-serif italic">IAST: {line.iastText}</span>
                  </div>
                  <div className="text-xs font-kannada text-stone-600">
                    <span className="font-semibold text-stone-700">ಮೂಲ:</span> {line.originalText}
                  </div>
                  <div className="text-xs font-kannada text-stone-900 font-medium bg-parchment-100/60 p-2 rounded-xs border border-heritage-border/60">
                    <span className="font-semibold text-heritage-ochre">ಅರ್ಥ:</span> {line.modernKannadaLine}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Original Transcription */}
        {activeTab === 'transcription' && (
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block mb-1">
                ಮೂಲ ಶಾಸನ ಪಾಠ (Epigraphical Transcription):
              </span>
              <div className="font-kannada text-stone-900 bg-stone-100/80 border border-stone-300 p-4 rounded-xs text-sm leading-loose">
                {inscription.transcription.recognizedText}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block mb-1">
                IAST (International Alphabet of Sanskrit Transliteration):
              </span>
              <div className="font-mono text-xs text-stone-700 bg-stone-50 border border-stone-200 p-3 rounded-xs leading-relaxed">
                {inscription.transcription.iastTransliteration}
              </div>
            </div>

            <div className="text-xs text-stone-500 font-mono flex items-center justify-between bg-stone-100 p-2 rounded-xs">
              <span>Segmented Characters: {inscription.transcription.detectedGlyphsCount}</span>
              <span>Model Confidence: {(inscription.transcription.scriptConfidence * 100).toFixed(1)}%</span>
            </div>
          </div>
        )}

        {/* Tab: English Translation */}
        {activeTab === 'translation_english' && (
          <div className="space-y-4">
            <div className="bg-stone-50 border border-stone-200 p-4 rounded-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-1">
                Scholarly English Translation:
              </span>
              <p className="font-serif text-stone-900 text-sm leading-relaxed italic">
                "{inscription.translation.englishTranslation}"
              </p>
            </div>

            <div className="bg-parchment-100/60 border border-heritage-border p-3.5 rounded-xs space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                Stylistic & Morphological Notes:
              </span>
              <p className="text-xs text-stone-700 leading-relaxed font-serif">
                {inscription.translation.stylisticNotes}
              </p>
            </div>
          </div>
        )}

        {/* Tab: Archaic Lexicon & Glossary */}
        {activeTab === 'lexicon' && (
          <div className="space-y-3">
            <div className="text-xs text-stone-500">
              Glossary of archaic Halegannada grammatical terms and historical vocabulary:
            </div>
            {inscription.translation.glossary.map((item, idx) => (
              <div key={idx} className="border border-heritage-border bg-stone-50/70 p-3 rounded-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-kannada font-bold text-sm text-stone-900">{item.term}</span>
                  <Badge variant="period" size="sm">{item.grammaticalCategory}</Badge>
                </div>
                <div className="text-[11px] font-mono text-stone-500">IAST: {item.iast}</div>
                <div className="text-xs font-kannada text-stone-800">
                  <span className="font-semibold text-stone-500">ಹೊಸಗನ್ನಡ ಅರ್ಥ:</span> {item.modernKannadaEquivalent}
                </div>
                <div className="text-xs text-stone-600 font-serif italic">
                  <span className="font-sans font-semibold text-stone-500 not-italic">English:</span> {item.englishDefinition}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Historical Context */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-stone-50 border border-stone-200 p-2.5 rounded-xs">
                <span className="text-[10px] font-mono text-stone-400 block uppercase">Dynasty</span>
                <span className="font-serif font-bold text-stone-900">{inscription.historicalContext.dynasty}</span>
              </div>
              <div className="bg-stone-50 border border-stone-200 p-2.5 rounded-xs">
                <span className="text-[10px] font-mono text-stone-400 block uppercase">Ruler / Sovereign</span>
                <span className="font-serif font-bold text-stone-900">{inscription.historicalContext.ruler}</span>
              </div>
              <div className="bg-stone-50 border border-stone-200 p-2.5 rounded-xs">
                <span className="text-[10px] font-mono text-stone-400 block uppercase">Regnal Date</span>
                <span className="font-mono text-stone-900">{inscription.historicalContext.approximateDate}</span>
              </div>
              <div className="bg-stone-50 border border-stone-200 p-2.5 rounded-xs">
                <span className="text-[10px] font-mono text-stone-400 block uppercase">Find-spot</span>
                <span className="text-stone-900">
                  {inscription.historicalContext.findSpot.village}, {inscription.historicalContext.findSpot.district}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                Historical Significance
              </span>
              <p className="text-xs text-stone-700 leading-relaxed font-serif bg-stone-50 border border-stone-200 p-3 rounded-xs">
                {inscription.historicalContext.historicalSummary}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                Linguistic & Epigraphical Value
              </span>
              <p className="text-xs text-stone-700 leading-relaxed font-serif bg-parchment-100/60 border border-heritage-border p-3 rounded-xs">
                {inscription.historicalContext.linguisticSignificance}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
