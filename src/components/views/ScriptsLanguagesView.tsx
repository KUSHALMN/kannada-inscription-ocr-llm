import React, { useState } from 'react';
import { ScriptClassMetadata, SourceLanguageMetadata } from '../../types';
import { PageHeader } from '../layout/PageHeader';
import { ScriptTimeline } from '../explorer/ScriptTimeline';
import { Badge } from '../common/Badge';

interface ScriptsLanguagesViewProps {
  scripts: ScriptClassMetadata[];
  languages: SourceLanguageMetadata[];
}

export const ScriptsLanguagesView: React.FC<ScriptsLanguagesViewProps> = ({
  scripts,
  languages,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'scripts' | 'languages'>('scripts');

  return (
    <div className="space-y-8">
      <PageHeader
        title="Epigraphical Scripts & Source Languages"
        subtitle="Chronological paleography and linguistic classification of inscriptional systems across Karnataka history."
        kannadaSubtitle="ಶಾಸನ ಲಿಪಿಗಳ ವಿಕಾಸ ಮತ್ತು ಮೂಲ ಭಾಷೆಗಳ ವರ್ಗೀಕರಣ"
        categoryTag="Paleographic Typology"
        action={
          <div className="flex border border-stone-300 bg-stone-100 p-0.5 rounded-xs text-xs">
            <button
              onClick={() => setActiveSubTab('scripts')}
              className={`px-3 py-1.5 rounded-xs transition-colors font-medium ${
                activeSubTab === 'scripts'
                  ? 'bg-parchment-50 text-stone-900 border border-stone-300 shadow-subtle'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              10 Script Eras (ಲಿಪಿ ವಿಕಾಸ)
            </button>
            <button
              onClick={() => setActiveSubTab('languages')}
              className={`px-3 py-1.5 rounded-xs transition-colors font-medium ${
                activeSubTab === 'languages'
                  ? 'bg-parchment-50 text-stone-900 border border-stone-300 shadow-subtle'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Source Languages (ಮೂಲ ಭಾಷೆಗಳು)
            </button>
          </div>
        }
      />

      {/* Subtab 1: 10 Script Eras */}
      {activeSubTab === 'scripts' && (
        <ScriptTimeline scripts={scripts} />
      )}

      {/* Subtab 2: Source Languages */}
      {activeSubTab === 'languages' && (
        <div className="space-y-6">
          <div className="border-b border-heritage-border pb-3">
            <h3 className="font-serif font-bold text-xl text-stone-900">
              Historical Languages in Karnataka Epigraphy
            </h3>
            <p className="text-xs text-stone-600 font-serif mt-1">
              Inscriptions in Karnataka recorded administrative, religious, and royal grants across multiple distinct linguistic phases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {languages.map((lang) => (
              <div
                key={lang.id}
                className="border border-heritage-border bg-parchment-50 p-5 rounded-xs space-y-3 shadow-subtle"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-base text-stone-900">
                      {lang.name}
                    </h4>
                    <span className="font-kannada text-xs text-stone-600">
                      {lang.kannadaName}
                    </span>
                  </div>
                  <Badge variant="period" size="sm">
                    {lang.centuryRange}
                  </Badge>
                </div>

                <div className="border-t border-heritage-border/60 pt-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block mb-1">
                    Linguistic & Morphological Characteristics:
                  </span>
                  <p className="text-xs text-stone-700 font-serif leading-relaxed">
                    {lang.linguisticFeatures}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
