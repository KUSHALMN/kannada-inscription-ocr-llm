import React, { useState } from 'react';
import { ScriptClassMetadata, SourceLanguageMetadata } from '../../types';
import { PageHeader } from '../layout/PageHeader';
import { ScriptTimeline } from '../explorer/ScriptTimeline';
import { Badge } from '../common/Badge';
import { Split, BookOpen, Layers, CheckCircle } from 'lucide-react';

interface ScriptsLanguagesViewProps {
  scripts: ScriptClassMetadata[];
  languages: SourceLanguageMetadata[];
}

export const ScriptsLanguagesView: React.FC<ScriptsLanguagesViewProps> = ({
  scripts,
  languages,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'scripts' | 'languages' | 'decoupling'>('scripts');

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
            <button
              onClick={() => setActiveSubTab('decoupling')}
              className={`px-3 py-1.5 rounded-xs transition-colors font-medium ${
                activeSubTab === 'decoupling'
                  ? 'bg-parchment-50 text-stone-900 border border-stone-300 shadow-subtle'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Script vs Language (ಪ್ರತ್ಯೇಕತೆ)
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

      {/* Subtab 3: Script vs Language Decoupling Matrix */}
      {activeSubTab === 'decoupling' && (
        <div className="space-y-6">
          <div className="border-b border-heritage-border pb-3">
            <div className="flex items-center gap-2">
              <Split className="w-5 h-5 text-heritage-ochre" />
              <h3 className="font-serif font-bold text-xl text-stone-900">
                The Core Architectural Principle: Script Identity ≠ Language Identity
              </h3>
            </div>
            <p className="text-xs text-stone-600 font-serif mt-1">
              In South Indian epigraphy, the graphical writing system (script) must never be conflated with the grammar and vocabulary (language).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case Study A: One Script, Multiple Languages */}
            <div className="border border-heritage-border bg-parchment-50 p-5 rounded-xs space-y-4 shadow-subtle">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-stone-700 flex-shrink-0" />
                <h4 className="font-serif font-bold text-stone-900 text-sm">
                  1. One Script Used Across Multiple Languages
                </h4>
              </div>
              <p className="text-xs text-stone-700 font-serif leading-relaxed">
                A single historical script was frequently utilized to engrave inscriptions in completely different language families:
              </p>

              <div className="space-y-2 text-xs">
                <div className="bg-stone-50 border border-stone-200 p-3 rounded-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 font-serif">Kadamba Script (4th–6th C. CE)</span>
                    <Badge variant="script" size="sm">Petika-shirsha</Badge>
                  </div>
                  <ul className="text-stone-600 space-y-1 pt-1">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      <span><strong>Purvada Halegannada:</strong> Halmidi Stele (c. 450 CE)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      <span><strong>Sanskrit:</strong> Talagunda Pillar Inscription of Mayurasharma</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      <span><strong>Prakrit:</strong> Early Banavasi administrative and memorial steles</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-stone-50 border border-stone-200 p-3 rounded-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 font-serif">Badami Chalukya Script (6th–8th C. CE)</span>
                    <Badge variant="script" size="sm">Curved Hook</Badge>
                  </div>
                  <ul className="text-stone-600 space-y-1 pt-1">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      <span><strong>Classical Halegannada:</strong> Kappe Arabhatta Cliff Stele (Tripadi verse)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      <span><strong>Classical Sanskrit:</strong> Ravikirti’s Aihole Prashasti (Meguti Temple)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Case Study B: One Language Written Across Multiple Scripts */}
            <div className="border border-heritage-border bg-parchment-50 p-5 rounded-xs space-y-4 shadow-subtle">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-stone-700 flex-shrink-0" />
                <h4 className="font-serif font-bold text-stone-900 text-sm">
                  2. One Language Written Across Evolving Scripts
                </h4>
              </div>
              <p className="text-xs text-stone-700 font-serif leading-relaxed">
                The Kannada language persisted unbroken for millennia, while its graphic transcription evolved through successive paleographic dynasties:
              </p>

              <div className="space-y-2 text-xs">
                <div className="bg-stone-50 border border-stone-200 p-3 rounded-xs">
                  <div className="font-bold text-stone-900 font-serif mb-1">
                    Early Kannada (Purvada Halegannada)
                  </div>
                  <p className="text-stone-600">
                    Expressed in <strong>Kadamba</strong> (box-headed) and <strong>Badami Chalukya</strong> scripts.
                  </p>
                </div>

                <div className="bg-stone-50 border border-stone-200 p-3 rounded-xs">
                  <div className="font-bold text-stone-900 font-serif mb-1">
                    Classical Old Kannada (Halegannada)
                  </div>
                  <p className="text-stone-600">
                    Expressed in <strong>Rashtrakuta</strong>, <strong>Kalyana Chalukya</strong> (soapstone circular), and <strong>Hoysala</strong> (ornate double-loop) scripts.
                  </p>
                </div>

                <div className="bg-stone-50 border border-stone-200 p-3 rounded-xs">
                  <div className="font-bold text-stone-900 font-serif mb-1">
                    Middle Kannada (Nadugannada)
                  </div>
                  <p className="text-stone-600">
                    Expressed in <strong>Vijayanagara</strong> granite steles and <strong>Mysuru Wodeyar</strong> palm-leaf manuscripts.
                  </p>
                </div>

                <div className="bg-stone-50 border border-stone-200 p-3 rounded-xs">
                  <div className="font-bold text-stone-900 font-serif mb-1">
                    Modern Kannada (Hosagannada)
                  </div>
                  <p className="text-stone-600">
                    Expressed in standardized <strong>Present Kannada</strong> typography and Unicode standard fonts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
