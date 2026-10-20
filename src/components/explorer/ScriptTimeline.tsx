import React, { useState } from 'react';
import { ScriptClassMetadata } from '../../types';
import { Badge } from '../common/Badge';
import { Calendar, Landmark, CheckCircle2, GitBranch, ArrowRight, ArrowLeft, Image as ImageIcon, Sparkles } from 'lucide-react';

interface ScriptTimelineProps {
  scripts: ScriptClassMetadata[];
  onSelectScript?: (scriptId: string) => void;
}

export const ScriptTimeline: React.FC<ScriptTimelineProps> = ({ scripts, onSelectScript }) => {
  const [selectedScriptId, setSelectedScriptId] = useState<string>(scripts[0]?.id || 'kadamba');

  const currentIndex = scripts.findIndex(s => s.id === selectedScriptId);
  const selectedScript = scripts[currentIndex >= 0 ? currentIndex : 0] || scripts[0];

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevId = scripts[currentIndex - 1].id;
      setSelectedScriptId(prevId);
      if (onSelectScript) onSelectScript(prevId);
    }
  };

  const handleNext = () => {
    if (currentIndex < scripts.length - 1) {
      const nextId = scripts[currentIndex + 1].id;
      setSelectedScriptId(nextId);
      if (onSelectScript) onSelectScript(nextId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview header */}
      <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] uppercase text-amber-700 font-bold tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-600" />
              Chronological Paleography
            </span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
            Kannada Script Paleographical Timeline
          </h2>
          <p className="text-xs text-slate-600 font-serif mt-1">
            Ten developmental stages spanning 2,300 years of South Indian epigraphical evolution (3rd C. BCE to Contemporary Kannada).
          </p>
        </div>

        {/* Stepper Prev/Next controls */}
        <div className="flex items-center gap-2 self-end md:self-center">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-1 text-xs px-3 py-1.5 border border-slate-200 rounded-md bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none shadow-xs transition-all font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Era</span>
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex === scripts.length - 1}
            className="flex items-center gap-1 text-xs px-3 py-1.5 border border-slate-200 rounded-md bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none shadow-xs transition-all font-semibold"
          >
            <span>Next Era</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Epoch Stepper Bar */}
      <div className="border border-slate-200 bg-slate-50/80 p-2.5 rounded-lg overflow-x-auto shadow-xs">
        <div className="flex items-center min-w-max space-x-2">
          {scripts.map((script, index) => {
            const isSelected = script.id === selectedScriptId;
            return (
              <button
                key={script.id}
                onClick={() => {
                  setSelectedScriptId(script.id);
                  if (onSelectScript) onSelectScript(script.id);
                }}
                className={`text-left px-3.5 py-2.5 rounded-md border transition-all ${
                  isSelected
                    ? 'bg-white border-amber-400 text-amber-900 shadow-xs ring-1 ring-amber-400/30'
                    : 'border-slate-200 bg-white/70 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 mb-0.5">
                  <span>{(index + 1).toString().padStart(2, '0')}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></span>}
                </div>
                <div className="font-serif font-bold text-xs tracking-tight text-slate-900 whitespace-nowrap">
                  {script.name}
                </div>
                <div className="text-[10px] text-amber-700 font-kannada whitespace-nowrap mt-0.5 font-medium">
                  {script.kannadaName}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Epoch Detailed Dossier */}
      {selectedScript && (
        <div className="border border-slate-200 bg-white p-6 rounded-lg shadow-xs space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="script" size="sm">Era {currentIndex + 1} of 10</Badge>
                <Badge variant="period" size="sm">
                  <Calendar className="w-3 h-3 inline mr-1 text-amber-600" />
                  {selectedScript.approximatePeriod}
                </Badge>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                {selectedScript.name} <span className="font-kannada font-normal text-amber-700 text-lg">({selectedScript.kannadaName})</span>
              </h3>
            </div>

            <div className="text-xs text-slate-700 bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-md flex items-center gap-2.5 shadow-xs">
              <Landmark className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-mono font-semibold">Historical Dynasty</span>
                <span className="font-bold text-slate-900">{selectedScript.historicalDynasty}</span>
              </div>
            </div>
          </div>

          {/* Diagnostic Features and Significance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Paleographical features */}
            <div>
              <h4 className="text-xs uppercase font-mono tracking-wider text-amber-800 mb-3 flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                Diagnostic Paleographical Characteristics
              </h4>
              <ul className="space-y-2">
                {selectedScript.diagnosticFeatures.map((feat, idx) => (
                  <li key={idx} className="text-xs text-slate-700 flex items-start gap-2 bg-slate-50 border border-slate-200 p-3 rounded-md">
                    <span className="font-mono text-amber-600 text-[10px] mt-0.5">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Historical significance and substrates */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs uppercase font-mono tracking-wider text-slate-600 mb-2 font-bold">
                  Historical & Epigraphical Significance
                </h4>
                <p className="text-xs leading-relaxed text-slate-700 font-serif bg-slate-50 border border-slate-200 p-3.5 rounded-md">
                  {selectedScript.significance}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase font-mono tracking-wider text-slate-600 mb-2 font-bold">
                  Characteristic Inscription Mediums
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedScript.characteristicSubstrate.map((sub, i) => (
                    <Badge key={i} variant="substrate" size="sm">
                      {sub.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Script Relationships & Evolutionary Lineage */}
          {selectedScript.relationships && (
            <div className="border border-slate-200 bg-slate-50/60 p-4 rounded-lg space-y-3">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <h4 className="font-serif font-bold text-slate-900 text-sm">
                  Paleographic Relationships & Evolutionary Lineage
                </h4>
                <span className="text-xs font-serif italic text-amber-900 font-medium ml-auto">
                  {selectedScript.relationships.branchName}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
                <div className="bg-white border border-slate-200 p-3 rounded-md shadow-xs">
                  <span className="font-mono text-[10px] uppercase text-slate-500 block mb-1 font-semibold">
                    Direct Ancestor Script(s)
                  </span>
                  <div className="font-serif text-slate-800">
                    {selectedScript.relationships.ancestorScripts.join(', ')}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-3 rounded-md shadow-xs">
                  <span className="font-mono text-[10px] uppercase text-slate-500 block mb-1 font-semibold">
                    Descendant Script(s)
                  </span>
                  <div className="font-serif text-slate-800">
                    {selectedScript.relationships.descendantScripts.join(', ')}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-3 rounded-md shadow-xs">
                  <span className="font-mono text-[10px] uppercase text-slate-500 block mb-1 font-semibold">
                    Contemporary Parallel Scripts
                  </span>
                  <div className="font-serif text-slate-800">
                    {selectedScript.relationships.parallelScripts.join(', ')}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Authentic In-Project Glyph Corpus Showcase */}
          {selectedScript.sampleGlyphs && selectedScript.sampleGlyphs.length > 0 && (
            <div className="border-t border-slate-200 pt-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <h4 className="font-serif font-bold text-slate-900 text-sm">
                    Verified Archival Glyph Corpus Samples ({selectedScript.name})
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-slate-500 font-medium">
                  Source: Ancient Kannada DATA Dataset
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {selectedScript.sampleGlyphs.map((glyph) => (
                  <div
                    key={glyph.id}
                    className="border border-slate-200 bg-white p-3.5 rounded-lg space-y-2 shadow-xs flex flex-col justify-between hover:border-amber-400 transition-colors"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="font-mono text-[10px] uppercase text-slate-500 font-semibold">
                        {glyph.label}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-kannada text-lg font-bold text-amber-700">
                          {glyph.kannadaChar}
                        </span>
                        <span className="font-mono text-xs text-slate-500">
                          ({glyph.iast})
                        </span>
                      </div>
                    </div>

                    {/* Glyph Image */}
                    <div className="h-28 bg-slate-100/70 border border-slate-200 rounded-md flex items-center justify-center p-2 overflow-hidden">
                      <img
                        src={glyph.imagePath}
                        alt={`Glyph ${glyph.iast} in ${selectedScript.name}`}
                        className="max-h-full max-w-full object-contain filter contrast-125"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>

                    <p className="text-[11px] font-serif text-slate-600 leading-normal pt-1">
                      {glyph.morphologicalNote}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
