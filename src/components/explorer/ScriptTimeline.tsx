import React, { useState } from 'react';
import { ScriptClassMetadata } from '../../types';
import { Badge } from '../common/Badge';
import { ChevronRight, Calendar, Landmark, CheckCircle2 } from 'lucide-react';

interface ScriptTimelineProps {
  scripts: ScriptClassMetadata[];
  onSelectScript?: (scriptId: string) => void;
}

export const ScriptTimeline: React.FC<ScriptTimelineProps> = ({ scripts, onSelectScript }) => {
  const [selectedScriptId, setSelectedScriptId] = useState<string>(scripts[0]?.id || 'kadamba');

  const selectedScript = scripts.find(s => s.id === selectedScriptId) || scripts[0];

  return (
    <div className="space-y-6">
      {/* Overview header */}
      <div className="border-b border-heritage-border pb-4">
        <h2 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">
          Kannada Script Paleographical Timeline
        </h2>
        <p className="text-sm text-stone-600 font-serif mt-1">
          Ten chronological developmental epochs spanning 2,300 years of South Indian epigraphy.
        </p>
      </div>

      {/* Epoch Stepper Bar */}
      <div className="border border-heritage-border bg-stone-100/60 p-2 rounded-xs overflow-x-auto">
        <div className="flex items-center min-w-max space-x-1">
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
        <div className="border border-heritage-border bg-parchment-50 p-6 rounded-xs shadow-subtle">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-heritage-border pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant="script" size="sm">{selectedScript.id.replace('_', ' ')}</Badge>
                <Badge variant="period" size="sm">
                  <Calendar className="w-3 h-3 inline mr-1 text-stone-400" />
                  {selectedScript.approximatePeriod}
                </Badge>
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900">
                {selectedScript.name} <span className="font-kannada font-normal text-stone-600 text-base">({selectedScript.kannadaName})</span>
              </h3>
            </div>

            <div className="text-xs text-stone-600 bg-stone-100 border border-stone-200 px-3 py-2 rounded-xs flex items-center gap-2">
              <Landmark className="w-4 h-4 text-stone-500" />
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-mono">Historical Dynasty</span>
                <span className="font-semibold text-stone-800">{selectedScript.historicalDynasty}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
        </div>
      )}
    </div>
  );
};
