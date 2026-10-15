import React from 'react';
import { PageHeader } from '../layout/PageHeader';
import { Scroll } from 'lucide-react';

export const HistoricalRulesView: React.FC = () => {
  const archaicPhonemes = [
    {
      symbol: 'ಱ',
      name: 'Sakata Repha (ಶಕಟ ರೇಫ)',
      iast: 'ṟa (alveolar trill)',
      period: 'Found in 5th–12th C. Halegannada inscriptions',
      notes: 'Distinct alveolar trill (hard "r") contrasted with standard dental "r" (ರ). Disappeared in Middle Kannada (Nadugannada), merging entirely into standard "ರ". Example: ಅಱಿ (know) vs ಅರಿ (enemy).'
    },
    {
      symbol: 'ೞ',
      name: 'Kula / Kshala Repha (ಕುಳ / ಕ್ಷಳ ರೇಫ)',
      iast: 'ḻa (retroflex approximant)',
      period: 'Found in 5th–10th C. Halegannada inscriptions',
      notes: 'Voiced retroflex central approximant (equivalent to Tamil "ழ" / Malayalam "ഴ"). By the 10th-12th Century, it mutated systematically: ೞ → ಳ or ೞ → ರ. Example: ಪಾೞ್ಮಡಿ → ಪಾಲ್ಮಡಿ (ಹಲ್ಮಿಡಿ), ಪೂೞ್ → ಪೂಳ್ (ಹೂಳು).'
    }
  ];

  const grammaticalRules = [
    {
      title: 'Locative Case Ending (-oḷ / ಒಳ್)',
      rule: 'In Purvada Halegannada and Classical Halegannada, the locative seventh case (ಸಪ್ತಮೀ ವಿಭಕ್ತಿ) is formed by suffixing "-oḷ" (ಒಳ್) rather than modern "-alli" (ಅಲ್ಲಿ).',
      example: 'ನಾಡೊಳ್ (in the land / country) → modern ನಾಡಿನಲ್ಲಿ; ಬಟಹರೊಳ್ (in the battle) → modern ಯುದ್ಧದಲ್ಲಿ.'
    },
    {
      title: 'Dative Case Suffix (-aṅge / -aṅke)',
      rule: 'The fourth dative case (ಚತುರ್ಥೀ ವಿಭಕ್ತಿ) appends "-aṅge" (ಅಂಗೆ) or "-aṅke" to masculine and honorific nouns rather than modern "-ige" (ಇಗೆ).',
      example: 'ವಿಜಾಯರಸಂಗೆ (unto Vijaya Arasa) → modern ವಿಜಯರಸನಿಗೆ; ಕಾಗುಸ್ಥಂಗೆ → modern ಕಾಕುಸ್ಥನಿಗೆ.'
    },
    {
      title: 'Adesha Sandhi (ಆದೇಶ ಸಂಧಿ in Inscriptions)',
      rule: 'When words coalesce in ancient stone inscriptions, initial unvoiced stops (ಕ, ತ, ಪ) systematically soften into voiced consonants (ಗ, ದ, ಬ).',
      example: 'ಪಾಳ್ + ಮಡಿ → ಪಾೞ್ಮಡಿ / ಪಾಲ್ಮಡಿ; ವಾಳ್ + ಕಚ್ಚು → ಬಾಳ್ಗಚ್ಚು / ಬಾಗಳ್ಚು.'
    },
    {
      title: 'Halegannada Tripadi Metre (ತ್ರಿಪದಿ ಛಂದಸ್ಸು)',
      rule: 'Ancient Kannada lyrical form consisting of three lines with structured morae (Matras). The earliest attested stone inscription in Tripadi metre is the Badami cliff inscription of Kappe Arabhatta (c. 700 CE).',
      example: 'ಸಾಧುಗೆ ಸಾಧು ಮಾಧುರ್ಯಂಗೆ ಮಾಧುರ್ಯಂ / ಬಾದಿಪ್ಪ ಕಲಿಗೆ ಕಲಿಯುಗ ವಿಪರೀತನ್ / ಮಾಧವನ್ ಇತ್ತನ್ ಪೆರನಲ್ಲನ್.'
    }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Epigraphical & Linguistic Rules"
        subtitle="Grammatical, phonological, and orthographical guidelines for deciphering Halegannada inscriptions."
        kannadaSubtitle="ಶಾಸನೋಕ್ತ ಹಳೆಗನ್ನಡ ವ್ಯಾಕರಣ, ವರ್ಣವಿಕಾಸ ಮತ್ತು ಛಂದೋನಿಯಮಗಳು"
        categoryTag="Epigraphical Grammar Reference"
      />

      {/* Archaic Phonemes Section */}
      <div className="space-y-4">
        <div className="border-b border-heritage-border pb-2">
          <h3 className="font-serif font-bold text-lg text-stone-900">
            Archaic Inscriptional Phonemes (ಲುಪ್ತ ವರ್ಣಗಳು)
          </h3>
          <p className="text-xs text-stone-500 font-serif">
            Distinctive phonemes present in ancient stone steles that later merged or disappeared in modern Kannada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {archaicPhonemes.map((ph, idx) => (
            <div
              key={idx}
              className="border border-heritage-border bg-parchment-50 p-5 rounded-xs space-y-3 shadow-subtle"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-parchment-200 border border-stone-300 rounded-xs flex items-center justify-center font-kannada text-2xl font-bold text-stone-900 shadow-subtle flex-shrink-0">
                  {ph.symbol}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-stone-900">
                    {ph.name}
                  </h4>
                  <span className="font-mono text-xs text-stone-500">
                    IAST: {ph.iast}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-heritage-border/60 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">
                  Chronological Occurrence:
                </span>
                <p className="text-xs text-stone-600 font-mono">
                  {ph.period}
                </p>
              </div>

              <div className="pt-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-0.5">
                  Epigraphical & Linguistic Behavior:
                </span>
                <p className="text-xs text-stone-700 font-serif leading-relaxed">
                  {ph.notes}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grammatical and Inscriptional Rules */}
      <div className="space-y-4 pt-4">
        <div className="border-b border-heritage-border pb-2">
          <h3 className="font-serif font-bold text-lg text-stone-900">
            Halegannada Inscriptional Morphology & Syntax
          </h3>
          <p className="text-xs text-stone-500 font-serif">
            Classical case systems, sandhi modifications, and poetic structures encountered across 5th–14th Century records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {grammaticalRules.map((rule, idx) => (
            <div
              key={idx}
              className="border border-heritage-border bg-stone-50/70 p-4 rounded-xs space-y-2 shadow-subtle"
            >
              <h4 className="font-serif font-bold text-sm text-stone-900 flex items-center gap-2">
                <Scroll className="w-4 h-4 text-heritage-ochre flex-shrink-0" />
                <span>{rule.title}</span>
              </h4>
              <p className="text-xs text-stone-700 font-serif leading-relaxed">
                {rule.rule}
              </p>
              <div className="bg-parchment-100/70 border border-stone-200 p-2.5 rounded-xs text-xs font-kannada text-stone-800">
                <span className="font-mono text-[10px] uppercase text-stone-500 block mb-0.5">Inscriptional Example:</span>
                {rule.example}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
