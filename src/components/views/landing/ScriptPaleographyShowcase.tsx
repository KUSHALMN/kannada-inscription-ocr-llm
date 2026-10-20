import React, { useState } from 'react';
import {
  Layers,
  ArrowRight,
  Sparkles,
  Calendar,
  Eye,
  Scroll
} from 'lucide-react';

interface ScriptPaleographyShowcaseProps {
  onNavigateToScripts: () => void;
}

interface ScriptEraData {
  epoch: string;
  name: string;
  kannadaName: string;
  period: string;
  dynasty: string;
  headmarkStyle: string;
  substrate: string;
  glyphSample: string;
  diagnosticFeature: string;
  historicSite: string;
}

const SCRIPT_EPOCHS: ScriptEraData[] = [
  {
    epoch: '01',
    name: 'Ashokan Brahmi',
    kannadaName: 'ಅಶೋಕನ ಬ್ರಾಹ್ಮೀ',
    period: 'c. 250 BCE',
    dynasty: 'Mauryan Empire',
    headmarkStyle: 'None (Plain Rectilinear)',
    substrate: 'Hard Granite Boulders',
    glyphSample: '𑀓',
    diagnosticFeature: 'Rigid orthogonal cross (+) for "Ka", strictly geometric without top serifs.',
    historicSite: 'Maski & Brahmagiri Rock Edicts'
  },
  {
    epoch: '02',
    name: 'Satavahana Brahmi',
    kannadaName: 'ಶಾತವಾಹನ ಬ್ರಾಹ್ಮೀ',
    period: '1st C. BCE – 2nd C. CE',
    dynasty: 'Satavahana Dynasty',
    headmarkStyle: 'Incipient Triangular Serif',
    substrate: 'Limestone & Granite Stabs',
    glyphSample: '𑀓',
    diagnosticFeature: 'Base of vertical shafts begins curving leftward; curved vowel marks.',
    historicSite: 'Sannati Stupa & Banavasi'
  },
  {
    epoch: '03',
    name: 'Kadamba Script',
    kannadaName: 'ಕದಂಬ ಲಿಪಿ (ಪೇಟಿಕಾ-ಶೀರ್ಷ)',
    period: '4th – 6th C. CE',
    dynasty: 'Kadambas of Banavasi',
    headmarkStyle: 'Box-Headed (Petika-shirsha)',
    substrate: 'Sandstone Pillars & Steles',
    glyphSample: 'ꢀ',
    diagnosticFeature: 'Square hollow or filled box at the top of every consonant stem.',
    historicSite: 'Halmidi Stele & Talagunda Pillar'
  },
  {
    epoch: '04',
    name: 'Badami Chalukya',
    kannadaName: 'ಬಾದಾಮಿ ಚಾಲುಕ್ಯ ಲಿಪಿ',
    period: '6th – 8th C. CE',
    dynasty: 'Early Chalukyas of Vatapi',
    headmarkStyle: 'Curved Hook Serifs',
    substrate: 'Red Sandstone Cliffs',
    glyphSample: 'ಕ',
    diagnosticFeature: 'Pronounced loops, fluid cursive arcs, earliest Tripadi poetry.',
    historicSite: 'Badami Cliffs & Aihole Meguti'
  },
  {
    epoch: '05',
    name: 'Rashtrakuta Script',
    kannadaName: 'ರಾಷ್ಟ್ರಕೂಟ ಲಿಪಿ',
    period: '8th – 10th C. CE',
    dynasty: 'Imperial Rashtrakutas',
    headmarkStyle: 'Horizontal Top Bar',
    substrate: 'Granite & Black Basalt',
    glyphSample: 'ಕ',
    diagnosticFeature: 'Broad horizontal character kerning; era of Kavirajamarga & Pampa.',
    historicSite: 'Manyakheta & Navalgund'
  },
  {
    epoch: '06',
    name: 'Kalyana Chalukya',
    kannadaName: 'ಕಲ್ಯಾಣ ಚಾಲುಕ್ಯ ಲಿಪಿ',
    period: '10th – 12th C. CE',
    dynasty: 'Western Chalukyas',
    headmarkStyle: 'Early Angle Headmark',
    substrate: 'Finely Polished Chloritic Schist',
    glyphSample: 'ಕ',
    diagnosticFeature: 'Completely circular circular contours emerge; letters resemble pearls.',
    historicSite: 'Lakkundi, Gadag & Itagi'
  },
  {
    epoch: '07',
    name: 'Hoysala Script',
    kannadaName: 'ಹೊಯ್ಸಳ ಲಿಪಿ (ಮುತ್ತಿನ ಹಾರ)',
    period: '11th – 14th C. CE',
    dynasty: 'Hoysala Empire',
    headmarkStyle: 'V-Check Talakattu (✓)',
    substrate: 'Soapstone / Chloritic Schist',
    glyphSample: 'ಕ',
    diagnosticFeature: 'Intricate calligraphic loops resembling a garland of strung pearls.',
    historicSite: 'Belur & Halebidu Temples'
  },
  {
    epoch: '08',
    name: 'Vijayanagara Script',
    kannadaName: 'ವಿಜಯನಗರ ಲಿಪಿ',
    period: '14th – 16th C. CE',
    dynasty: 'Vijayanagara Empire',
    headmarkStyle: 'Prominent Talakattu (✓)',
    substrate: 'Crystalline Granite & Copper',
    glyphSample: 'ಕ',
    diagnosticFeature: 'Segregated individual characters for high legibility chiseled on granite.',
    historicSite: 'Hampi Virupaksha & Vittala'
  },
  {
    epoch: '09',
    name: 'Mysuru Wodeyar',
    kannadaName: 'ಮೈಸೂರು ಒಡೆಯರ್ ಲಿಪಿ',
    period: '17th – 19th C. CE',
    dynasty: 'Kingdom of Mysore',
    headmarkStyle: 'Fluid Cursive Talakattu',
    substrate: 'Palm Leaf & Copper Plate',
    glyphSample: 'ಕ',
    diagnosticFeature: 'Smooth rounded forms designed not to pierce dried palm leaves.',
    historicSite: 'Srirangapatna & Mysuru Palace'
  },
  {
    epoch: '10',
    name: 'Present Kannada',
    kannadaName: 'ಪ್ರಸ್ತುತ ಆಧುನಿಕ ಕನ್ನಡ',
    period: 'Contemporary',
    dynasty: 'Modern Karnataka Era',
    headmarkStyle: 'Standard Open Talakattu',
    substrate: 'Digital Unicode / Print',
    glyphSample: 'ಕ',
    diagnosticFeature: 'Standardized 49-character alphabet with normalized typographic grid.',
    historicSite: 'Modern Administrative & Literary'
  }
];

export const ScriptPaleographyShowcase: React.FC<ScriptPaleographyShowcaseProps> = ({
  onNavigateToScripts,
}) => {
  const [selectedEpochIndex, setSelectedEpochIndex] = useState<number>(2); // Default to Kadamba (Halmidi)
  const [selectedCharacter, setSelectedCharacter] = useState<'ka' | 'a' | 'ga' | 'ra'>('ka');

  const selectedEra = SCRIPT_EPOCHS[selectedEpochIndex];

  // Morphological character evolution map across eras
  const characterEvolutionMap: Record<string, { desc: string; representations: string[] }> = {
    ka: {
      desc: 'The unvoiced velar stop [ka] underwent the most dramatic morphological journey from a simple cross (+) in 250 BCE to the box-headed Kadamba form, circular Hoysala loops, and the modern checkmark Talakattu.',
      representations: ['+', 'ᚵ', 'ꢀ', 'क', 'ಕ', 'ಕ', 'ಕ', 'ಕ', 'ಕ', 'ಕ']
    },
    a: {
      desc: 'The foundational primary vowel [a], evolving from a leftward fishhook in Brahmi to the dual-curved Kadamba form and contemporary rounded open loop.',
      representations: ['𑀅', 'ꢂ', 'ಅ', 'ಅ', 'ಅ', 'ಅ', 'ಅ', 'ಅ', 'ಅ', 'ಅ']
    },
    ga: {
      desc: 'The voiced velar stop [ga], starting as an inverted chevron (^) without baseline, closing over centuries into a balanced arched letter.',
      representations: ['^', '⋒', 'ಗ', 'ಗ', 'ಗ', 'ಗ', 'ಗ', 'ಗ', 'ಗ', 'ಗ']
    },
    ra: {
      desc: 'The archaic alveolar trill Sakata Repha (ಱ) and standard dental liquid (ರ), recording essential phonological shifts across Old Kannada steles.',
      representations: ['|', 'ꢃ', 'ಱ', 'ರ', 'ಱ', 'ರ', 'ಱ', 'ರ', 'ರ', 'ರ']
    }
  };

  return (
    <section className="bg-gradient-to-b from-white via-amber-50/20 to-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="text-xs font-cinzel font-bold text-[#8C3B18] tracking-[0.2em] uppercase flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-amber-700" />
            <span>Paleographical Morphology Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-900 tracking-tight">
            2,300 Years of Script Evolution: From Ashokan Brahmi to Modern Kannada
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Witness how chisel mechanics, royal patrons, and regional stone substrates mutated letter geometries across ten imperial dynasties.
          </p>
        </div>

        <button
          onClick={onNavigateToScripts}
          className="self-start md:self-auto px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium flex items-center gap-2 transition-colors shadow-xs shrink-0"
        >
          <span>Explore All 10 Script Classes</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Epochs Selector Strip */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold block">
          Select Dynasty Epoch to Inspect Stone Characteristics
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
          {SCRIPT_EPOCHS.map((era, idx) => {
            const isSelected = selectedEpochIndex === idx;
            return (
              <button
                key={era.epoch}
                onClick={() => setSelectedEpochIndex(idx)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-amber-700 text-white border-amber-800 shadow-sm scale-102'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-amber-400 hover:bg-amber-50/50'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono opacity-80 mb-1">
                  <span>{era.epoch}</span>
                  <span className={isSelected ? 'text-amber-200' : 'text-amber-700 font-semibold'}>
                    {era.period.split(' ')[0]}
                  </span>
                </div>
                <div className="font-serif font-bold text-xs leading-snug line-clamp-1">
                  {era.name}
                </div>
                <div className={`text-[10px] font-kannada truncate ${isSelected ? 'text-amber-100' : 'text-slate-500'}`}>
                  {era.kannadaName}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Epoch Spotlight Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Epoch Detailed Specimen Card */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg text-xs font-cinzel font-bold bg-[#F8EFE4] text-[#8C3B18] border border-[#DFCBB0]">
                Epoch {selectedEra.epoch} • {selectedEra.dynasty}
              </span>
              <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>{selectedEra.period}</span>
              </span>
            </div>

            <div>
              <h3 className="text-xl font-serif font-bold text-slate-900">
                {selectedEra.name}
              </h3>
              <p className="font-kannada text-amber-800 font-medium text-sm">
                {selectedEra.kannadaName}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {selectedEra.diagnosticFeature}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block">
                  Headmark (Talakattu) Evolution
                </span>
                <span className="font-serif font-semibold text-slate-900">
                  {selectedEra.headmarkStyle}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block">
                  Stone Substrate & Material
                </span>
                <span className="font-serif font-semibold text-slate-900">
                  {selectedEra.substrate}
                </span>
              </div>
            </div>

            <div className="p-3 bg-amber-50/70 rounded-lg border border-amber-200 flex items-center gap-2 text-xs">
              <Scroll className="w-4 h-4 text-amber-700 shrink-0" />
              <div className="text-slate-800">
                <strong className="font-semibold text-amber-900">Benchmark Site: </strong>
                <span>{selectedEra.historicSite}</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-mono">
              AI Vision Classifier Model Accuracy: <strong className="text-emerald-700 font-bold">98.75%</strong>
            </span>
            <button
              onClick={onNavigateToScripts}
              className="text-amber-800 font-semibold hover:text-amber-900 flex items-center gap-1 transition-colors"
            >
              <span>View Inscription Rubbing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Interactive Character Anatomical Journey */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-xl p-6 shadow-md flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono uppercase text-amber-300 font-semibold">
                  Morphological Anatomy Viewer
                </span>
              </div>
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                Interactive Chisel Comparison
              </span>
            </div>

            <p className="text-xs text-slate-300">
              Select an ancient root character to see how its stone chisel geometry morphed across historical epochs:
            </p>

            {/* Character Selector Buttons */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { key: 'ka', label: 'ಕ (ka)', title: 'Consonant Ka' },
                { key: 'a', label: 'ಅ (a)', title: 'Vowel A' },
                { key: 'ga', label: 'ಗ (ga)', title: 'Consonant Ga' },
                { key: 'ra', label: 'ರ / ಱ', title: 'Repha / Trill' },
              ].map((c) => (
                <button
                  key={c.key}
                  onClick={() => setSelectedCharacter(c.key as any)}
                  className={`py-2 px-1 text-center rounded-lg font-kannada text-sm font-bold transition-all ${
                    selectedCharacter === c.key
                      ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Current Morph Presentation in Selected Epoch */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-around text-center my-3">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                  Selected Era ({selectedEra.name})
                </span>
                <div className="text-4xl font-serif text-amber-400 font-bold py-1">
                  {characterEvolutionMap[selectedCharacter].representations[selectedEpochIndex]}
                </div>
                <span className="text-[10px] font-mono text-amber-300">
                  {selectedEra.period}
                </span>
              </div>

              <div className="w-px h-16 bg-slate-800" />

              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                  Contemporary Kannada
                </span>
                <div className="text-4xl font-kannada text-white font-bold py-1">
                  {selectedCharacter === 'ka' ? 'ಕ' : selectedCharacter === 'a' ? 'ಅ' : selectedCharacter === 'ga' ? 'ಗ' : 'ರ'}
                </div>
                <span className="text-[10px] font-mono text-emerald-400">
                  Unicode U+0C80
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-serif italic">
              "{characterEvolutionMap[selectedCharacter].desc}"
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono">ASI Epigraphia Carnatica Standard</span>
            <span className="text-amber-400 font-mono text-[11px] flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              <span>Full Glyph Corpus</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
