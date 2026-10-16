import React, { useState } from 'react';
import { InscriptionRecord } from '../../types';
import { Badge } from '../common/Badge';
import { BookOpen, Languages, History, BookMarked, FileCode, Sparkles } from 'lucide-react';

interface EpigraphComparatorProps {
  inscription: InscriptionRecord;
}

export const EpigraphComparator: React.FC<EpigraphComparatorProps> = ({ inscription }) => {
  const [activeTab, setActiveTab] = useState<'transcription' | 'translation_kannada' | 'translation_english' | 'history' | 'lexicon'>('translation_kannada');

  return (
    <div className="border border-white/10 bg-[#0F1521]/80 backdrop-blur-md rounded-2xl overflow-hidden flex flex-col h-[540px] shadow-elevation">
      {/* Top Essential Epigraphical Distinction Bar */}
      <div className="bg-black/40 border-b border-white/10 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {inscription.accessionNumber}
          </span>
          <span className="text-xs font-serif italic text-stone-300">
            {inscription.historicalContext.epigraphiaReference || 'State Epigraphical Survey'}
          </span>
        </div>

        {/* Clear 4-pillar distinction */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2.5 border-t border-white/10">
          <div className="bg-white/[0.03] border border-white/10 p-2.5 rounded-xl hover:border-amber-500/30 transition-colors">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">1. Script</span>
            <span className="font-serif font-bold text-xs text-amber-300 block truncate">
              {inscription.scriptClass.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          <div className="bg-white/[0.03] border border-white/10 p-2.5 rounded-xl hover:border-cyan-500/30 transition-colors">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">2. Language</span>
            <span className="font-serif font-bold text-xs text-cyan-300 block truncate">
              {inscription.sourceLanguage.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          <div className="bg-white/[0.03] border border-white/10 p-2.5 rounded-xl hover:border-emerald-500/30 transition-colors">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">3. Era</span>
            <span className="font-mono text-[11px] text-emerald-300 block truncate">
              {inscription.historicalContext.century}
            </span>
          </div>

          <div className="bg-white/[0.03] border border-white/10 p-2.5 rounded-xl hover:border-amber-500/30 transition-colors">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">4. Synthesis</span>
            <span className="font-serif font-bold text-xs text-stone-200 block">
              ಹೊಸಗನ್ನಡ + EN
            </span>
          </div>
        </div>
      </div>

      {/* Synchronized Tabbed Navigation */}
      <div className="flex border-b border-white/10 bg-black/20 overflow-x-auto">
        <button
          onClick={() => setActiveTab('translation_kannada')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'translation_kannada'
              ? 'border-amber-400 text-amber-300 bg-amber-500/10 font-bold shadow-sm'
              : 'border-transparent text-stone-400 hover:text-white hover:bg-white/[0.03]'
          }`}
        >
          <Languages className="w-3.5 h-3.5 text-amber-400" />
          <span>ಹೊಸಗನ್ನಡ ಅನುವಾದ (Modern)</span>
        </button>

        <button
          onClick={() => setActiveTab('transcription')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'transcription'
              ? 'border-amber-400 text-amber-300 bg-amber-500/10 font-bold shadow-sm'
              : 'border-transparent text-stone-400 hover:text-white hover:bg-white/[0.03]'
          }`}
        >
          <FileCode className="w-3.5 h-3.5 text-cyan-400" />
          <span>Original & IAST</span>
        </button>

        <button
          onClick={() => setActiveTab('translation_english')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'translation_english'
              ? 'border-amber-400 text-amber-300 bg-amber-500/10 font-bold shadow-sm'
              : 'border-transparent text-stone-400 hover:text-white hover:bg-white/[0.03]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
          <span>English Translation</span>
        </button>

        <button
          onClick={() => setActiveTab('lexicon')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'lexicon'
              ? 'border-amber-400 text-amber-300 bg-amber-500/10 font-bold shadow-sm'
              : 'border-transparent text-stone-400 hover:text-white hover:bg-white/[0.03]'
          }`}
        >
          <BookMarked className="w-3.5 h-3.5 text-purple-400" />
          <span>Archaic Lexicon ({inscription.translation.glossary.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'history'
              ? 'border-amber-400 text-amber-300 bg-amber-500/10 font-bold shadow-sm'
              : 'border-transparent text-stone-400 hover:text-white hover:bg-white/[0.03]'
          }`}
        >
          <History className="w-3.5 h-3.5 text-amber-400" />
          <span>Historical Context</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {/* Tab: Modern Kannada Translation */}
        {activeTab === 'translation_kannada' && (
          <div className="space-y-4">
            <div className="bg-black/40 border border-white/10 p-4 rounded-xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block mb-1.5 font-bold">
                ಸಮಗ್ರ ಹೊಸಗನ್ನಡ ಭಾವಾನುವಾದ (Full Modern Meaning):
              </span>
              <p className="kannada-text text-stone-100 text-sm leading-relaxed">
                {inscription.translation.modernKannada}
              </p>
            </div>

            <div className="space-y-2.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block font-semibold">
                ಸಾಲು ಸಾಲಿನ ಅನುವಾದ ತಾಳೆ (Line-by-Line Alignment):
              </span>
              {inscription.transcription.lines.map((line) => (
                <div key={line.lineNumber} className="border border-white/10 bg-white/[0.02] p-3.5 rounded-xl space-y-2 hover:border-amber-500/30 transition-colors">
                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                    <span className="text-amber-400 font-bold">LINE {line.lineNumber}</span>
                    <span className="text-stone-400 font-serif italic">IAST: {line.iastText}</span>
                  </div>
                  <div className="text-xs font-kannada text-stone-300">
                    <span className="font-semibold text-stone-400">ಮೂಲ:</span> {line.originalText}
                  </div>
                  <div className="text-xs font-kannada text-stone-100 font-medium bg-black/40 p-2.5 rounded-lg border border-white/10">
                    <span className="font-semibold text-amber-400">ಅರ್ಥ:</span> {line.modernKannadaLine}
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
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block mb-1.5 font-bold">
                ಮೂಲ ಶಾಸನ ಪಾಠ (Epigraphical Transcription):
              </span>
              <div className="font-kannada text-white bg-black/40 border border-white/10 p-4 rounded-xl text-sm leading-loose">
                {inscription.transcription.recognizedText}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-1.5 font-bold">
                IAST (International Alphabet of Sanskrit Transliteration):
              </span>
              <div className="font-mono text-xs text-stone-300 bg-white/[0.03] border border-white/10 p-3.5 rounded-xl leading-relaxed">
                {inscription.transcription.iastTransliteration}
              </div>
            </div>

            <div className="text-xs text-stone-300 font-mono flex items-center justify-between bg-black/40 border border-white/10 p-3 rounded-xl">
              <span>Detected Glyphs: <strong className="text-cyan-400">{inscription.transcription.detectedGlyphsCount}</strong></span>
              <span>Model Confidence: <strong className="text-emerald-400">{(inscription.transcription.scriptConfidence * 100).toFixed(1)}%</strong></span>
            </div>
          </div>
        )}

        {/* Tab: English Translation */}
        {activeTab === 'translation_english' && (
          <div className="space-y-4">
            <div className="bg-black/40 border border-white/10 p-4 rounded-xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block mb-1.5 font-bold">
                Scholarly English Translation:
              </span>
              <p className="font-serif text-stone-100 text-sm leading-relaxed italic">
                "{inscription.translation.englishTranslation}"
              </p>
            </div>

            <div className="bg-white/[0.02] border border-white/10 p-4 rounded-xl space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block font-bold">
                Stylistic & Morphological Notes:
              </span>
              <p className="text-xs text-stone-300 leading-relaxed font-serif">
                {inscription.translation.stylisticNotes}
              </p>
            </div>
          </div>
        )}

        {/* Tab: Archaic Lexicon & Glossary */}
        {activeTab === 'lexicon' && (
          <div className="space-y-3">
            <div className="text-xs text-stone-400 font-serif">
              Glossary of archaic Halegannada grammatical terms and historical vocabulary:
            </div>
            {inscription.translation.glossary.map((item, idx) => (
              <div key={idx} className="border border-white/10 bg-white/[0.02] p-3.5 rounded-xl space-y-1.5 hover:border-purple-500/30 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-kannada font-bold text-sm text-white">{item.term}</span>
                  <Badge variant="period" size="sm">{item.grammaticalCategory}</Badge>
                </div>
                <div className="text-[11px] font-mono text-cyan-300">IAST: {item.iast}</div>
                <div className="text-xs font-kannada text-stone-200">
                  <span className="font-semibold text-stone-400">ಹೊಸಗನ್ನಡ ಅರ್ಥ:</span> {item.modernKannadaEquivalent}
                </div>
                <div className="text-xs text-stone-300 font-serif italic">
                  <span className="font-sans font-semibold text-stone-400 not-italic">English:</span> {item.englishDefinition}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Historical Context */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-black/40 border border-white/10 p-3 rounded-xl">
                <span className="text-[10px] font-mono text-stone-400 block uppercase mb-1">Dynasty</span>
                <span className="font-serif font-bold text-amber-300 text-sm">{inscription.historicalContext.dynasty}</span>
              </div>
              <div className="bg-black/40 border border-white/10 p-3 rounded-xl">
                <span className="text-[10px] font-mono text-stone-400 block uppercase mb-1">Ruler / Sovereign</span>
                <span className="font-serif font-bold text-white text-sm">{inscription.historicalContext.ruler}</span>
              </div>
              <div className="bg-black/40 border border-white/10 p-3 rounded-xl">
                <span className="text-[10px] font-mono text-stone-400 block uppercase mb-1">Regnal Date</span>
                <span className="font-mono text-cyan-300">{inscription.historicalContext.approximateDate}</span>
              </div>
              <div className="bg-black/40 border border-white/10 p-3 rounded-xl">
                <span className="text-[10px] font-mono text-stone-400 block uppercase mb-1">Find-spot</span>
                <span className="text-stone-200">
                  {inscription.historicalContext.findSpot.village}, {inscription.historicalContext.findSpot.district}
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block font-bold">
                Historical Significance
              </span>
              <p className="text-xs text-stone-300 leading-relaxed font-serif bg-black/40 border border-white/10 p-3.5 rounded-xl">
                {inscription.historicalContext.historicalSummary}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block font-bold">
                Linguistic & Epigraphical Value
              </span>
              <p className="text-xs text-stone-300 leading-relaxed font-serif bg-white/[0.02] border border-white/10 p-3.5 rounded-xl">
                {inscription.historicalContext.linguisticSignificance}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
