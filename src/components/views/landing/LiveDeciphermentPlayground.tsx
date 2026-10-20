import React, { useState } from 'react';
import {
  Sparkles,
  Sliders,
  Volume2,
  ZoomIn,
  Eye,
  CheckCircle2,
  ChevronRight,
  SearchCode
} from 'lucide-react';
import { InscriptionRecord } from '../../../types';

interface LiveDeciphermentPlaygroundProps {
  inscriptions: InscriptionRecord[];
  onSelectInscription: (inscription: InscriptionRecord) => void;
  onNavigateToAnalysis: () => void;
}

interface PlaygroundSample {
  id: string;
  name: string;
  dynasty: string;
  century: string;
  site: string;
  imageUrl: string;
  scriptEra: string;
  boundingBoxes: Array<{ id: string; top: number; left: number; width: number; height: number; char: string; iast: string }>;
  halegannada: string;
  iast: string;
  hosagannada: string;
  english: string;
  audioPronunciationText: string;
  historicalNote: string;
}

const PLAYGROUND_SAMPLES: PlaygroundSample[] = [
  {
    id: 'halmidi',
    name: 'Halmidi Kadamba Stele (ಕ್ರಿ.ಶ. ೪೫೦)',
    dynasty: 'Early Kadambas',
    century: 'c. 450 CE',
    site: 'Halmidi, Hassan District',
    imageUrl: '/analysis-halmidi-stele.jpg',
    scriptEra: 'Kadamba Box-Headed Script',
    boundingBoxes: [
      { id: 'b1', top: 18, left: 22, width: 14, height: 10, char: 'ನ', iast: 'na' },
      { id: 'b2', top: 18, left: 38, width: 15, height: 10, char: 'ಮಃ', iast: 'maḥ' },
      { id: 'b3', top: 18, left: 56, width: 18, height: 10, char: 'ಶ್ರೀ', iast: 'śrī' },
      { id: 'b4', top: 32, left: 24, width: 22, height: 12, char: 'ಕದಂ', iast: 'kadam' },
      { id: 'b5', top: 32, left: 48, width: 18, height: 12, char: 'ಬ', iast: 'ba' },
      { id: 'b6', top: 48, left: 30, width: 28, height: 12, char: 'ಪಶುಪತಿ', iast: 'paśupati' },
    ],
    halegannada: 'ನಮಃ ಶ್ರೀಮತ್ ಕದಂಬ ಪಣ್ ಮಹಾ ಕದಂಬನ ಪಲಕಾಲಮನ್ ಪಶುಪತಿ ಸತ್ಯಾಗೌರವಾನ್...',
    iast: 'namaḥ śrīmat kadamba paṇ mahā kadambana palakālaman paśupati...',
    hosagannada: 'ಶ್ರೀಮತ್ ಕದಂಬ ವಂಶದ ರಾಜ ಕಾಕುಸ್ಥವರ್ಮನ ಆಳ್ವಿಕೆಯಲ್ಲಿ ವಿಜಯರಸನ ವೀರಮರಣವನ್ನು ಸ್ಮರಿಸಿ ನೀಡಲಾದ ಬಾಳ್ಗಚ್ಚು ಭೂದಾನ.',
    english: 'Salutations. In the reign of Kadamba sovereign Kakusthavarma, recording a tax-free heroic endowment for the martyred hero Vijaya Arasa.',
    audioPronunciationText: 'ನಮಃ ಶ್ರೀಮತ್ ಕದಂಬ ಪಣ್ ಮಹಾ ಕದಂಬನ ಪಲಕಾಲಮನ್',
    historicalNote: 'First verified stone epigraph in the Kannada language, proving formal royal prose usage in the 5th century.'
  },
  {
    id: 'kappe',
    name: 'Kappe Arabhatta Cliff Poem (ಕ್ರಿ.ಶ. ೭೦೦)',
    dynasty: 'Badami Chalukyas',
    century: 'c. 700 CE',
    site: 'Badami Rock Cliff, Bagalkote',
    imageUrl: '/temples/chalukya.jpg',
    scriptEra: 'Badami Chalukya Script',
    boundingBoxes: [
      { id: 'b1', top: 25, left: 20, width: 20, height: 12, char: 'ಸಾಧುಗೆ', iast: 'sādhuge' },
      { id: 'b2', top: 25, left: 45, width: 18, height: 12, char: 'ಸಾಧು', iast: 'sādhu' },
      { id: 'b3', top: 42, left: 20, width: 28, height: 12, char: 'ಮಾಧುರ್ಯಂಗೆ', iast: 'mādhuryange' },
      { id: 'b4', top: 42, left: 52, width: 25, height: 12, char: 'ಮಾಧುರ್ಯಂ', iast: 'mādhuryam' },
    ],
    halegannada: 'ಸಾಧುಗೆ ಸಾಧು ಮಾಧುರ್ಯಂಗೆ ಮಾಧುರ್ಯಂ | ಬಾಧಿಪ್ಪ ಕಲಿಯುಗ ಕಲಿಯಂ ಕಲಿಯುಗ ವಿಪರೀತನ್ ||',
    iast: 'sādhuge sādhu mādhuryange mādhuryam | bādhippa kaliyuga kaliyaṁ kaliyuga viparītan ||',
    hosagannada: 'ಒಳ್ಳೆಯವರಿಗೆ ಒಳ್ಳೆಯವನು, ಪ್ರೀತಿ ತೋರಿಸುವವರಿಗೆ ಅತ್ಯಂತ ಮಧುರವಾದವನು; ತೊಂದರೆ ಕೊಡುವ ದುಷ್ಟರಿಗೆ ಈತನು ಕಲಿಯುಗದ ಯಮಸ್ವರೂಪನು.',
    english: 'Kind to the kind, honey-sweet to the gentle; but a relentless Nemesis of the Kali age to those who seek malice.',
    audioPronunciationText: 'ಸಾಧುಗೆ ಸಾಧು ಮಾಧುರ್ಯಂಗೆ ಮಾಧುರ್ಯಂ ಬಾಧಿಪ್ಪ ಕಲಿಯುಗ ಕಲಿಯಂ',
    historicalNote: 'The earliest recorded instance of the indigenous 3-line Kannada Tripadi poetic metre carved into Badami sandstone.'
  },
  {
    id: 'belur',
    name: 'Belur Chennakeshava Plinth (ಕ್ರಿ.ಶ. ೧೧೧೭)',
    dynasty: 'Hoysala Empire',
    century: '1117 CE',
    site: 'Belur, Hassan District',
    imageUrl: '/temples/hoysala.jpg',
    scriptEra: 'Hoysala Calligraphic Script',
    boundingBoxes: [
      { id: 'b1', top: 20, left: 25, width: 24, height: 12, char: 'ಶ್ರೀಮತ್', iast: 'śrīmat' },
      { id: 'b2', top: 20, left: 52, width: 28, height: 12, char: 'ವಿಷ್ಣುವರ್ಧನ', iast: 'viṣṇuvardhana' },
      { id: 'b3', top: 40, left: 28, width: 22, height: 12, char: 'ತಲಕಾಡು', iast: 'talakāḍu' },
      { id: 'b4', top: 40, left: 54, width: 22, height: 12, char: 'ಗೊಂಡ', iast: 'goṇḍa' },
    ],
    halegannada: 'ಶ್ರೀಮತ್ ಪ್ರೌಢಪ್ರತಾಪ ಹೊಯ್ಸಳ ಶ್ರೀ ವಿಷ್ಣುವರ್ಧನ ದೇವರ್ ತಲಕಾಡಂ ಕೊಂಡು ಚೋಳನಂ ಬೆನ್ನಟ್ಟಿ...',
    iast: 'śrīmat prauḍhapratāpa hoysaḷa śrī viṣṇuvardhana dēvar talakāḍaṁ koṇḍu...',
    hosagannada: 'ಮಹಾಪರಾಕ್ರಮಿ ಹೊಯ್ಸಳ ದೊರೆ ವಿಷ್ಣುವರ್ಧನನು ತಲಕಾಡನ್ನು ವಶಪಡಿಸಿಕೊಂಡು ಚೋಳರನ್ನು ಹಿಮ್ಮೆಟ್ಟಿಸಿದ ವಿಜಯೋತ್ಸವದ ಶಾಸನ.',
    english: 'The illustrious and valiant Hoysala monarch Vishnuvardhana, having conquered Talakadu and routed the Chola forces, consecrated this temple.',
    audioPronunciationText: 'ಶ್ರೀಮತ್ ಪ್ರೌಢಪ್ರತಾಪ ಹೊಯ್ಸಳ ಶ್ರೀ ವಿಷ್ಣುವರ್ಧನ ದೇವರ್',
    historicalNote: 'Celebrates King Vishnuvardhana adopting the imperial title "Talakadugonda" (Conqueror of Talakadu).'
  },
  {
    id: 'hampi',
    name: 'Hampi Virupaksha Mandapa (ಕ್ರಿ.ಶ. ೧೫೦೯)',
    dynasty: 'Vijayanagara Empire',
    century: '1509 CE',
    site: 'Hampi, Vijayanagara District',
    imageUrl: '/temples/vijayanagara.jpg',
    scriptEra: 'Vijayanagara Granite Script',
    boundingBoxes: [
      { id: 'b1', top: 22, left: 20, width: 24, height: 12, char: 'ಶುಭಮಸ್ತು', iast: 'śubhamastu' },
      { id: 'b2', top: 22, left: 48, width: 32, height: 12, char: 'ಕೃಷ್ಣದೇವರಾಯ', iast: 'kr̥ṣṇadēvarāya' },
      { id: 'b3', top: 42, left: 30, width: 28, height: 12, char: 'ಪಟ್ಟಾಭಿಷೇಕ', iast: 'paṭṭābhiṣēka' },
    ],
    halegannada: 'ಶುಭಮಸ್ತು | ಶಕವರುಷ ೧೪೩೧ನೆಯ ಮಾಘ ಶುದ್ಧ ೧೪ ಯಲ್ಲೂ ಶ್ರೀಕೃಷ್ಣದೇವರಾಯ ಮಹಾರಾಯರು ಪಟ್ಟಾಭಿಷಿಕ್ತರಾದ ಶುಭ ಮುಹೂರ್ತದಲ್ಲಿ...',
    iast: 'śubhamastu | śakavaruṣa 1431neya māgha śuddha 14 yallū śrīkr̥ṣṇadēvarāya...',
    hosagannada: 'ಶಕ ವರ್ಷ ೧೪೩೧ರಲ್ಲಿ ಶ್ರೀ ಕೃಷ್ಣದೇವರಾಯ ಮಹಾರಾಯರು ವಿಜಯನಗರದ ಸಿಂಹಾಸನಾರೋಹಣ ಮಾಡಿದ ಶುಭ ಸಂದರ್ಭದಲ್ಲಿ ವಿರೂಪಾಕ್ಷನಿಗೆ ಅರ್ಪಿಸಿದ ರಂಗಮಂಟಪ.',
    english: 'May good fortune prevail. In Saka 1431, on the auspicious coronation of Emperor Krishnadevaraya, the hundred-pillared Ranga Mandapa was endowed.',
    audioPronunciationText: 'ಶುಭಮಸ್ತು ಶಕವರುಷ ೧೪೩೧ನೆಯ ಮಾಘ ಶುದ್ಧ ೧೪ ಯಲ್ಲೂ ಶ್ರೀಕೃಷ್ಣದೇವರಾಯ ಮಹಾರಾಯರು',
    historicalNote: 'Records the coronation gifts and construction of the soaring eastern Gopuram and pillared courtyard at Hampi.'
  }
];

export const LiveDeciphermentPlayground: React.FC<LiveDeciphermentPlaygroundProps> = ({
  inscriptions,
  onSelectInscription,
  onNavigateToAnalysis,
}) => {
  const [activeSampleIndex, setActiveSampleIndex] = useState<number>(0);
  const [activeTier, setActiveTier] = useState<'facsimile' | 'halegannada' | 'modern' | 'english'>('halegannada');
  const [showBoundingBoxes, setShowBoundingBoxes] = useState<boolean>(true);
  const [imageFilterMode, setImageFilterMode] = useState<'normal' | 'high_contrast' | 'rubbing_invert'>('normal');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const sample = PLAYGROUND_SAMPLES[activeSampleIndex];

  const handlePlayAudio = () => {
    setIsPlayingAudio(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(sample.audioPronunciationText);
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      utterance.lang = 'kn-IN';
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 2000);
    }
  };

  const handleOpenInWorkspace = () => {
    // Find matching inscription in corpus
    const matched = inscriptions.find(ins =>
      ins.title.toLowerCase().includes(sample.id) ||
      ins.historicalContext.dynasty.toLowerCase().includes(sample.dynasty.toLowerCase().split(' ')[0])
    );
    if (matched) {
      onSelectInscription(matched);
    } else {
      onNavigateToAnalysis();
    }
  };

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="text-xs font-cinzel font-bold text-emerald-900 tracking-[0.2em] uppercase flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Interactive Epigraphical Decipherment Sandbox</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-900 tracking-tight">
            Live Archaeological Decipherment: Test the 4-Tier Engine
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Select authentic steles from across Karnataka. Adjust computer-vision enhancement filters, inspect YOLO glyph boundaries, and explore real-time linguistic reconstruction.
          </p>
        </div>

        <button
          onClick={handleOpenInWorkspace}
          className="self-start md:self-auto px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <SearchCode className="w-4 h-4" />
          <span>Launch Full 5-Stage Analysis</span>
        </button>
      </div>

      {/* Stele Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PLAYGROUND_SAMPLES.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setActiveSampleIndex(idx)}
            className={`p-3 rounded-xl border text-left transition-all ${
              activeSampleIndex === idx
                ? 'bg-amber-50/80 border-amber-400 shadow-xs ring-1 ring-amber-400/30'
                : 'bg-white border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="text-[10px] font-mono text-slate-400 uppercase">
              Sample {idx + 1}
            </div>
            <div className="font-serif font-bold text-xs text-slate-900 line-clamp-1 mt-0.5">
              {s.name}
            </div>
            <div className="text-[11px] text-amber-800 font-mono">
              {s.dynasty}
            </div>
          </button>
        ))}
      </div>

      {/* Interactive Visualizer Canvas & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Enhanced Canvas with Bounding Boxes */}
        <div className="lg:col-span-7 space-y-3">
          {/* Canvas Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-slate-100 rounded-lg text-xs font-mono">
            {/* Filter Toggle */}
            <div className="flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-slate-500 mr-1" />
              <button
                onClick={() => setImageFilterMode('normal')}
                className={`px-2 py-1 rounded text-[11px] transition-colors ${
                  imageFilterMode === 'normal' ? 'bg-white shadow-xs font-bold text-slate-900' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Natural Stone
              </button>
              <button
                onClick={() => setImageFilterMode('high_contrast')}
                className={`px-2 py-1 rounded text-[11px] transition-colors ${
                  imageFilterMode === 'high_contrast' ? 'bg-white shadow-xs font-bold text-amber-800' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                CLAHE Relief
              </button>
              <button
                onClick={() => setImageFilterMode('rubbing_invert')}
                className={`px-2 py-1 rounded text-[11px] transition-colors ${
                  imageFilterMode === 'rubbing_invert' ? 'bg-white shadow-xs font-bold text-blue-800' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Ink Rubbing
              </button>
            </div>

            {/* Bounding Box & Zoom */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
                className={`px-2 py-1 rounded text-[11px] flex items-center gap-1 transition-colors ${
                  showBoundingBoxes ? 'bg-emerald-600 text-white font-semibold' : 'bg-slate-200 text-slate-700'
                }`}
              >
                <Eye className="w-3 h-3" />
                <span>YOLO Boxes</span>
              </button>
              <button
                onClick={() => setZoomLevel(zoomLevel === 1 ? 1.4 : zoomLevel === 1.4 ? 1.8 : 1)}
                className="px-2 py-1 bg-white border border-slate-200 rounded text-[11px] text-slate-700 flex items-center gap-1 hover:bg-slate-50"
              >
                <ZoomIn className="w-3 h-3" />
                <span>{zoomLevel}x</span>
              </button>
            </div>
          </div>

          {/* Stele Image Viewer */}
          <div className="relative h-80 sm:h-96 bg-slate-950 rounded-xl overflow-hidden border border-slate-300 shadow-inner flex items-center justify-center">
            <div
              className="w-full h-full relative transition-transform duration-300"
              style={{
                transform: `scale(${zoomLevel})`,
                filter:
                  imageFilterMode === 'high_contrast'
                    ? 'contrast(160%) brightness(90%) sepia(20%)'
                    : imageFilterMode === 'rubbing_invert'
                    ? 'grayscale(100%) invert(90%) contrast(200%)'
                    : 'none',
              }}
            >
              <img
                src={sample.imageUrl}
                alt={sample.name}
                className="w-full h-full object-cover"
              />

              {/* Bounding Boxes Overlay */}
              {showBoundingBoxes &&
                sample.boundingBoxes.map((box) => (
                  <div
                    key={box.id}
                    className="absolute border-2 border-amber-400 bg-amber-400/25 rounded-xs animate-pulse hover:bg-amber-400/50 transition-all cursor-pointer flex items-start justify-end p-0.5 group"
                    style={{
                      top: `${box.top}%`,
                      left: `${box.left}%`,
                      width: `${box.width}%`,
                      height: `${box.height}%`,
                    }}
                    title={`Character: ${box.char} (${box.iast})`}
                  >
                    <span className="text-[10px] font-mono font-bold bg-amber-500 text-slate-950 px-1 rounded-xs shadow-xs group-hover:scale-110 transition-transform">
                      {box.char}
                    </span>
                  </div>
                ))}
            </div>

            {/* In-canvas floating badge */}
            <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-xs text-white p-2.5 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-amber-400 font-mono text-[10px] font-semibold block">
                  {sample.scriptEra}
                </span>
                <span className="font-serif font-bold">{sample.site}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>99.1% Confidence</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: 4-Tier Interactive Decipherment Panel */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block">
                  Decipherment Output
                </span>
                <h3 className="font-serif font-bold text-base text-slate-900">
                  {sample.name}
                </h3>
              </div>
              <button
                onClick={handlePlayAudio}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  isPlayingAudio
                    ? 'bg-amber-600 text-white animate-pulse'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-amber-50 hover:text-amber-900'
                }`}
                title="Listen to archaic phonological pronunciation"
              >
                <Volume2 className="w-4 h-4 text-amber-700" />
                <span>{isPlayingAudio ? 'Reciting...' : 'Pronounce'}</span>
              </button>
            </div>

            {/* Tier Tabs */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-200/80 rounded-lg text-xs font-mono">
              <button
                onClick={() => setActiveTier('halegannada')}
                className={`py-1.5 text-center rounded transition-all ${
                  activeTier === 'halegannada' ? 'bg-white font-bold text-amber-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                1. ಹಳೆಗನ್ನಡ
              </button>
              <button
                onClick={() => setActiveTier('modern')}
                className={`py-1.5 text-center rounded transition-all ${
                  activeTier === 'modern' ? 'bg-white font-bold text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                2. ಹೊಸಗನ್ನಡ
              </button>
              <button
                onClick={() => setActiveTier('english')}
                className={`py-1.5 text-center rounded transition-all ${
                  activeTier === 'english' ? 'bg-white font-bold text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                3. English
              </button>
            </div>

            {/* Tier Display Content */}
            <div className="p-4 bg-white border border-slate-200 rounded-xl min-h-[140px] space-y-2">
              {activeTier === 'halegannada' && (
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-amber-700 font-bold uppercase tracking-wider block">
                    Transcribed Halegannada (Old Kannada)
                  </span>
                  <p className="font-kannada text-base text-slate-900 font-medium leading-relaxed">
                    {sample.halegannada}
                  </p>
                  <p className="font-mono text-xs text-slate-500 italic pt-1 border-t border-slate-100">
                    IAST: {sample.iast}
                  </p>
                </div>
              )}

              {activeTier === 'modern' && (
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-wider block">
                    Modern Hosagannada Semantic Translation
                  </span>
                  <p className="font-kannada text-sm text-slate-900 leading-relaxed font-medium">
                    {sample.hosagannada}
                  </p>
                </div>
              )}

              {activeTier === 'english' && (
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-blue-700 font-bold uppercase tracking-wider block">
                    Academic Epigraphical Translation
                  </span>
                  <p className="font-serif italic text-xs sm:text-sm text-slate-800 leading-relaxed">
                    "{sample.english}"
                  </p>
                </div>
              )}
            </div>

            {/* Historical Insight Note */}
            <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-lg text-xs space-y-1">
              <span className="font-mono text-[10px] uppercase text-amber-900 font-bold block">
                Epigraphical Context
              </span>
              <p className="text-slate-700 leading-relaxed">
                {sample.historicalNote}
              </p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleOpenInWorkspace}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs mt-3"
          >
            <span>Open Detailed Analytical Dossier</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
