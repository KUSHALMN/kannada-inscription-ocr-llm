import React, { useState } from 'react';
import { ScriptClassMetadata } from '../../types';
import { Badge } from '../common/Badge';
import { Calendar, Landmark, CheckCircle2, GitBranch, ArrowRight, ArrowLeft, Image as ImageIcon } from 'lucide-react';

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
      <div className="border-b border-heritage-border pb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">
            Kannada Script Paleographical Timeline
          </h2>
          <p className="text-xs text-stone-600 font-serif mt-1">
            Ten developmental stages spanning 2,300 years of South Indian epigraphical evolution (3rd C. BCE to Contemporary Kannada).
          </p>
        </div>

        {/* Stepper Prev/Next controls */}
        <div className="flex items-center gap-1.5 self-end md:self-center">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-1 text-xs px-2.5 py-1 border border-stone-300 rounded-xs bg-parchment-50 text-stone-700 hover:bg-stone-100 disabled:opacity-40 disabled:pointer-events-none shadow-subtle transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Era</span>
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex === scripts.length - 1}
            className="flex items-center gap-1 text-xs px-2.5 py-1 border border-stone-300 rounded-xs bg-parchment-50 text-stone-700 hover:bg-stone-100 disabled:opacity-40 disabled:pointer-events-none shadow-subtle transition-colors"
          >
            <span>Next Era</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Epoch Stepper Bar */}
      <div className="border border-heritage-border bg-stone-100/60 p-2 rounded-xs overflow-x-auto shadow-subtle">
        <div className="flex items-center min-w-max space-x-1.5">
          {scripts.map((script, index) => {
            const isSelected = script.id === selectedScriptId;
            return (
              <button
                key={script.id}
                onClick={() => {
                  setSelectedScriptId(script.id);
                  if (onSelectScript) onSelectScript(script.id);
                }}
                className={`text-left px-3 py-2 rounded-xs border transition-all ${
                  isSelected
                    ? 'bg-parchment-50 border-stone-400 text-stone-900 shadow-subtle'
                    : 'border-transparent text-stone-600 hover:bg-parchment-100/50 hover:text-stone-900'
                }`}
              >
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-stone-400 mb-0.5">
                  <span>{(index + 1).toString().padStart(2, '0')}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-heritage-ochre"></span>}
                </div>
                <div className="font-serif font-bold text-xs tracking-tight text-stone-900 whitespace-nowrap">
                  {script.name}
                </div>
                <div className="text-[10px] text-stone-500 font-kannada whitespace-nowrap">
                  {script.kannadaName}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Epoch Detailed Dossier */}
      {selectedScript && (
        <div className="border border-heritage-border bg-parchment-50 p-6 rounded-xs shadow-subtle space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-heritage-border pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant="script" size="sm">Era {currentIndex + 1} of 10</Badge>
                <Badge variant="period" size="sm">
                  <Calendar className="w-3 h-3 inline mr-1 text-stone-400" />
                  {selectedScript.approximatePeriod}
                </Badge>
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900">
                {selectedScript.name} <span className="font-kannada font-normal text-stone-600 text-base">({selectedScript.kannadaName})</span>
              </h3>
            </div>

            <div className="text-xs text-stone-600 bg-stone-100 border border-stone-200 px-3 py-2 rounded-xs flex items-center gap-2 shadow-subtle">
              <Landmark className="w-4 h-4 text-stone-500 flex-shrink-0" />
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-mono">Historical Dynasty</span>
                <span className="font-semibold text-stone-800">{selectedScript.historicalDynasty}</span>
              </div>
            </div>
          </div>

          {/* Diagnostic Features and Significance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Paleographical features */}
            <div>
              <h4 className="text-xs uppercase font-mono tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-stone-700" />
                Diagnostic Paleographical Characteristics
              </h4>
              <ul className="space-y-2">
                {selectedScript.diagnosticFeatures.map((feat, idx) => (
                  <li key={idx} className="text-xs text-stone-700 flex items-start gap-2 bg-stone-50 border border-stone-200/80 p-2.5 rounded-xs">
                    <span className="font-mono text-stone-400 text-[10px] mt-0.5">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Historical significance and substrates */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs uppercase font-mono tracking-wider text-stone-500 mb-2">
                  Historical & Epigraphical Significance
                </h4>
                <p className="text-xs leading-relaxed text-stone-700 font-serif bg-parchment-100/60 border border-heritage-border p-3 rounded-xs">
                  {selectedScript.significance}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase font-mono tracking-wider text-stone-500 mb-2">
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
            <div className="border border-stone-200 bg-stone-50/70 p-4 rounded-xs space-y-3">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-heritage-ochre flex-shrink-0" />
                <h4 className="font-serif font-bold text-stone-900 text-sm">
                  Paleographic Relationships & Evolutionary Lineage
                </h4>
                <span className="font-mono text-[10px] uppercase text-stone-500 bg-stone-200/60 px-2 py-0.5 rounded-xs ml-auto">
                  {selectedScript.relationships.branchName}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
                <div className="bg-parchment-50 border border-stone-200 p-2.5 rounded-xs">
                  <span className="font-mono text-[10px] uppercase text-stone-400 block mb-1">
                    Direct Ancestor Script(s)
                  </span>
                  <div className="font-serif text-stone-800">
                    {selectedScript.relationships.ancestorScripts.join(', ')}
                  </div>
                </div>

                <div className="bg-parchment-50 border border-stone-200 p-2.5 rounded-xs">
                  <span className="font-mono text-[10px] uppercase text-stone-400 block mb-1">
                    Descendant Script(s)
                  </span>
                  <div className="font-serif text-stone-800">
                    {selectedScript.relationships.descendantScripts.join(', ')}
                  </div>
                </div>

                <div className="bg-parchment-50 border border-stone-200 p-2.5 rounded-xs">
                  <span className="font-mono text-[10px] uppercase text-stone-400 block mb-1">
                    Contemporary Parallel Scripts
                  </span>
                  <div className="font-serif text-stone-800">
                    {selectedScript.relationships.parallelScripts.join(', ')}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Authentic In-Project Glyph Corpus Showcase */}
          {selectedScript.sampleGlyphs && selectedScript.sampleGlyphs.length > 0 && (
            <div className="border-t border-heritage-border pt-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-stone-600 flex-shrink-0" />
                  <h4 className="font-serif font-bold text-stone-900 text-sm">
                    Verified Archival Glyph Corpus Samples ({selectedScript.name})
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-stone-500">
                  Source: Ancient Kannada DATA Dataset
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {selectedScript.sampleGlyphs.map((glyph) => (
                  <div
                    key={glyph.id}
                    className="border border-stone-300 bg-white p-3 rounded-xs space-y-2 shadow-subtle flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                      <span className="font-mono text-[10px] uppercase text-stone-400">
                        {glyph.label}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-kannada text-lg font-bold text-stone-900">
                          {glyph.kannadaChar}
                        </span>
                        <span className="font-mono text-xs text-stone-500">
                          ({glyph.iast})
                        </span>
                      </div>
                    </div>

                    {/* Glyph Image */}
                    <div className="h-28 bg-stone-50 border border-stone-200 rounded-xs flex items-center justify-center p-2 overflow-hidden">
                      <img
                        src={glyph.imagePath}
                        alt={`Glyph ${glyph.iast} in ${selectedScript.name}`}
                        className="max-h-full max-w-full object-contain filter contrast-125"
                        onError={(e) => {
                          // Graceful fallback if image is not rendered in browser
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>

                    <p className="text-[11px] font-serif text-stone-600 leading-normal pt-1">
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
