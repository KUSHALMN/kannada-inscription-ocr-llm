import React, { useState } from 'react';
import { InscriptionRecord } from '../../types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import {
  ArrowRight,
  ShieldCheck,
  SearchCode,
  Archive,
  Layers,
  BookOpen,
  Volume2,
  Cpu,
  History,
  CheckCircle2,
  Calendar,
  Landmark,
  MapPin,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { TempleAtlasSection } from './landing/TempleAtlasSection';
import { ScriptPaleographyShowcase } from './landing/ScriptPaleographyShowcase';
import { LiveDeciphermentPlayground } from './landing/LiveDeciphermentPlayground';
import { UnescoHeritageSpotlight } from './landing/UnescoHeritageSpotlight';
import { EpigraphyQuizSection } from './landing/EpigraphyQuizSection';

interface LandingHomeViewProps {
  inscriptions: InscriptionRecord[];
  onNavigateToAnalysis: () => void;
  onNavigateToArchive: () => void;
  onNavigateToScripts: () => void;
  onNavigateToRules: () => void;
  onSelectInscription: (inscription: InscriptionRecord) => void;
}

export const LandingHomeView: React.FC<LandingHomeViewProps> = ({
  inscriptions,
  onNavigateToAnalysis,
  onNavigateToArchive,
  onNavigateToScripts,
  onNavigateToRules,
  onSelectInscription,
}) => {
  // Interactive Hero Preview Tier State
  const [heroActiveTier, setHeroActiveTier] = useState<'halegannada' | 'modern' | 'english'>('halegannada');
  const [heroAudioPlaying, setHeroAudioPlaying] = useState<boolean>(false);

  // Featured sample inscription (Halmidi or first record)
  const featuredInscription = inscriptions[0] || {
    id: 'halmidi-001',
    accessionNumber: 'EC-05-BL-001',
    title: 'Halmidi Inscription (ಹಾಲ್ಮಿಡಿ ಶಾಸನ)',
    kannadaTitle: 'ಕರ್ನಾಟಕದ ಮೊಟ್ಟಮೊದಲ ಅಧಿಕೃತ ಕನ್ನಡ ಶಿಲಾಶಾಸನ',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Halmidi_inscription.jpg/800px-Halmidi_inscription.jpg',
    scriptClass: 'kadamba',
    sourceLanguage: 'purvada_halegannada',
    substrate: 'sandstone',
    historicalContext: {
      approximateDate: 'c. 450 CE',
      century: '5th Century CE',
      dynasty: 'Early Kadamba Dynasty',
      ruler: 'King Kakusthavarma',
      findSpot: { village: 'Halmidi', district: 'Hassan', state: 'Karnataka' },
      historicalSummary: 'Earliest epigraphical evidence of classical Kannada language, recording royal grant exemptions for military heroes.',
    },
    transcription: {
      recognizedText: 'ನಮಃ ಶ್ರೀಮತ್ ಕದಂಬ ಪಣ್ ಮಹಾ ಕದಂಬನ ಪಲಕಾಲಮನ್...',
      iastTransliteration: 'namaḥ śrīmat kadamba paṇ mahā kadambana palakālaman...',
      lines: [
        { lineNumber: 1, originalText: 'ನಮಃ ಶ್ರೀಮತ್ ಕದಂಬ ಪಣ್', iastText: 'namaḥ śrīmat kadamba paṇ' },
        { lineNumber: 2, originalText: 'ಮಹಾ ಕದಂಬನ ಪಲಕಾಲಮನ್', iastText: 'mahā kadambana palakālaman' },
      ],
      scriptConfidence: 0.9875,
      detectedGlyphsCount: 168,
    },
    translation: {
      modernKannada: 'ಶ್ರೀಮತ್ ಕದಂಬ ರಾಜವಂಶದ ಕಕುಸ್ಥವರ್ಮನ ಆಳ್ವಿಕೆಯಲ್ಲಿ ವಿಜಯಿ ಯೋಧರಿಗೆ ನೀಡಲಾದ ವೀರಗಲ್ಲು ಭೂಮಿ ಉಂಬಳಿ ದಾನ.',
      englishTranslation: 'Salutations to the auspicious Kadamba king Kakusthavarma; recording a battle tax exemption for heroic warriors.',
    },
  };

  const handlePlayHeroAudio = () => {
    setHeroAudioPlaying(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance('ನಮಃ ಶ್ರೀಮತ್ ಕದಂಬ ಪಣ್ ಮಹಾ ಕದಂಬನ ಪಲಕಾಲಮನ್');
      utterance.rate = 0.85;
      utterance.lang = 'kn-IN';
      utterance.onend = () => setHeroAudioPlaying(false);
      utterance.onerror = () => setHeroAudioPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setHeroAudioPlaying(false), 2000);
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* ==========================================
          SECTION 1: HERO SECTION
      ========================================== */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-white via-amber-50/40 to-white border border-slate-200/90 shadow-sm p-6 sm:p-10 lg:p-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Hero Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs font-semibold shadow-xs">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>ASI & Epigraphia Carnatica Standard • AI Epigraphical Intelligence</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-slate-900 tracking-tight leading-tight">
                Reviving <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800">2,300 Years</span> of Ancient Kannada Epigraphy
              </h1>
              <p className="font-kannada text-lg sm:text-xl text-amber-900 font-semibold leading-relaxed">
                ಪ್ರಾಚೀನ ಕನ್ನಡ ಶಿಲಾಶಾಸನಗಳ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ಶೋಧನೆ, ಲಿಪಿ ವಿಕಾಸ ಮತ್ತು ಅನುವಾದ ವೇದಿಕೆ
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-serif">
              From 3rd Century BCE Ashokan Brahmi rock edicts at Maski to the 5th Century Halmidi Stele, Hoysala soapstone poetry at Belur, and ornate Vijayanagara charters at Hampi. 
              Decipher weathered steles with YOLOv11 character segmentation, ViT epoch classification, and a 4-tier decoupled translation engine.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={onNavigateToAnalysis}
              >
                Launch Analysis Pipeline
              </Button>
              <Button
                variant="outline"
                size="lg"
                icon={<Archive className="w-4 h-4 text-amber-700" />}
                onClick={onNavigateToArchive}
              >
                Browse Inscription Archive
              </Button>
              <Button
                variant="ghost"
                size="lg"
                icon={<Layers className="w-4 h-4 text-slate-600" />}
                onClick={onNavigateToScripts}
              >
                Script Paleography
              </Button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-200/80 text-xs text-slate-600 font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>10 Historical Script Dynasties</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>4-Tier Decoupled Translation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Sub-100ms Neural Inference</span>
              </div>
            </div>
          </div>

          {/* Right Hero Interactive Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              {/* Card Header */}
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-slate-700 font-bold">LIVE DECIPHERMENT PREVIEW</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-100 text-amber-900 border border-amber-300 font-bold">
                  98.75% AI Confidence
                </span>
              </div>

              {/* Stele Image Visualizer with Real Photo */}
              <div className="relative h-60 bg-slate-900 overflow-hidden group">
                <img
                  src={featuredInscription.imageUrl}
                  alt={featuredInscription.title}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Simulated AI character detection boxes */}
                <div className="absolute top-10 left-12 w-20 h-10 border-2 border-amber-400 bg-amber-400/25 rounded shadow-sm animate-pulse flex items-start justify-end p-0.5">
                  <span className="text-[9px] font-mono bg-amber-500 text-slate-950 font-bold px-1 rounded-xs">ಕ</span>
                </div>
                <div className="absolute top-16 left-36 w-24 h-12 border-2 border-emerald-400 bg-emerald-400/25 rounded shadow-sm flex items-start justify-end p-0.5">
                  <span className="text-[9px] font-mono bg-emerald-500 text-white font-bold px-1 rounded-xs">ದಂ</span>
                </div>
                <div className="absolute bottom-12 right-16 w-28 h-10 border-2 border-cyan-400 bg-cyan-400/25 rounded shadow-sm flex items-start justify-end p-0.5">
                  <span className="text-[9px] font-mono bg-cyan-500 text-white font-bold px-1 rounded-xs">ಬ</span>
                </div>

                {/* Overlay Metadata */}
                <div className="absolute bottom-3 left-4 right-4 text-white flex items-center justify-between text-xs">
                  <div>
                    <div className="font-serif font-bold text-sm drop-shadow-sm">{featuredInscription.title}</div>
                    <div className="text-[11px] text-amber-300 font-mono">
                      {featuredInscription.historicalContext.century} • {featuredInscription.historicalContext.dynasty}
                    </div>
                  </div>
                  <Badge variant="script" size="sm">Kadamba Box-Headed</Badge>
                </div>
              </div>

              {/* Interactive 4-Tier Preview Tabs */}
              <div className="p-4 bg-white space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex border border-slate-200 rounded-lg p-0.5 bg-slate-100 text-xs font-mono flex-1 mr-2">
                    <button
                      onClick={() => setHeroActiveTier('halegannada')}
                      className={`flex-1 py-1.5 rounded-md transition-all text-center ${
                        heroActiveTier === 'halegannada'
                          ? 'bg-white text-amber-900 font-bold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      1. ಹಳೆಗನ್ನಡ
                    </button>
                    <button
                      onClick={() => setHeroActiveTier('modern')}
                      className={`flex-1 py-1.5 rounded-md transition-all text-center ${
                        heroActiveTier === 'modern'
                          ? 'bg-white text-emerald-900 font-bold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      2. ಹೊಸಗನ್ನಡ
                    </button>
                    <button
                      onClick={() => setHeroActiveTier('english')}
                      className={`flex-1 py-1.5 rounded-md transition-all text-center ${
                        heroActiveTier === 'english'
                          ? 'bg-white text-blue-900 font-bold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      3. English
                    </button>
                  </div>

                  <button
                    onClick={handlePlayHeroAudio}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 border border-slate-200 transition-colors"
                    title="Audio recitation"
                  >
                    <Volume2 className={`w-4 h-4 ${heroAudioPlaying ? 'text-amber-700 animate-pulse' : 'text-slate-600'}`} />
                  </button>
                </div>

                {/* Dynamic Tier Text Output */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg min-h-[90px] flex items-center">
                  {heroActiveTier === 'halegannada' && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-amber-800 font-bold block">
                        Reconstructed Halegannada Transcription:
                      </span>
                      <p className="font-kannada text-sm text-slate-900 font-semibold leading-relaxed">
                        {featuredInscription.transcription.recognizedText}
                      </p>
                    </div>
                  )}

                  {heroActiveTier === 'modern' && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-emerald-800 font-bold block">
                        Standard Hosagannada Translation:
                      </span>
                      <p className="font-kannada text-sm text-slate-900 font-semibold leading-relaxed">
                        {featuredInscription.translation.modernKannada}
                      </p>
                    </div>
                  )}

                  {heroActiveTier === 'english' && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-blue-800 font-bold block">
                        Academic Epigraphical English:
                      </span>
                      <p className="font-serif italic text-xs text-slate-800 leading-relaxed">
                        "{featuredInscription.translation.englishTranslation}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Action button inside card */}
                <button
                  onClick={() => onSelectInscription(featuredInscription as InscriptionRecord)}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Examine Full Inscription Dossier</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 2: KEY STATISTICAL TELEMETRY
      ========================================== */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs hover:border-amber-400 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase text-slate-500 font-semibold">Epigraphs in Karnataka</span>
            <Landmark className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-900">25,000+</div>
          <p className="text-xs text-slate-500 mt-1 font-serif">Highest density in Indian subcontinent</p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs hover:border-amber-400 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase text-slate-500 font-semibold">Chronological Span</span>
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-900">2,300+ Yrs</div>
          <p className="text-xs text-slate-500 mt-1 font-serif">3rd C. BCE Ashokan rock to Wodeyars</p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs hover:border-amber-400 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase text-slate-500 font-semibold">Neural Precision</span>
            <Cpu className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-extrabold text-emerald-600">98.75%</div>
          <p className="text-xs text-slate-500 mt-1 font-serif">CNN + Vision Transformer hybrid model</p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs hover:border-amber-400 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase text-slate-500 font-semibold">Script Evolution</span>
            <Layers className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-900">10 Dynasties</div>
          <p className="text-xs text-slate-500 mt-1 font-serif">Stone ➔ Halegannada ➔ Modern Kannada</p>
        </div>
      </section>

      {/* ==========================================
          SECTION 3: LIVE DECIPHERMENT PLAYGROUND
      ========================================== */}
      <LiveDeciphermentPlayground
        inscriptions={inscriptions}
        onSelectInscription={onSelectInscription}
        onNavigateToAnalysis={onNavigateToAnalysis}
      />

      {/* ==========================================
          SECTION 4: KARNATAKA TEMPLE ATLAS
      ========================================== */}
      <TempleAtlasSection
        inscriptions={inscriptions}
        onSelectInscription={onSelectInscription}
        onNavigateToArchive={onNavigateToArchive}
      />

      {/* ==========================================
          SECTION 5: UNESCO WORLD HERITAGE SPOTLIGHT
      ========================================== */}
      <UnescoHeritageSpotlight
        inscriptions={inscriptions}
        onSelectInscription={onSelectInscription}
        onNavigateToArchive={onNavigateToArchive}
      />

      {/* ==========================================
          SECTION 6: SCRIPT PALEOGRAPHY SHOWCASE
      ========================================== */}
      <ScriptPaleographyShowcase
        onNavigateToScripts={onNavigateToScripts}
      />

      {/* ==========================================
          SECTION 7: SCIENTIFIC ARCHITECTURE
      ========================================== */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 font-semibold">
            Scientific & Paleographical Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Engineered for Academic Epigraphists & Historians
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-serif">
            A state-of-the-art computational system respecting historical orthography, ligature clusters, and phonological sound laws.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs hover:border-amber-400 hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
              <SearchCode className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">
              1. YOLOv11 Character Segmentation
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-serif">
              Detects line and character bounding boxes across weathered, eroded stone steles, hero stones (ವೀರಗಲ್ಲು), and copper plates with sub-millimeter precision.
            </p>
            <div className="pt-2 text-xs font-mono text-amber-700 font-semibold flex items-center gap-1">
              <span>Interactive Glyph Inspector</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs hover:border-amber-400 hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">
              2. 4-Tier Decoupled Translation
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-serif">
              Enforces the epigraphical principle that Script Identity ≠ Language Identity. Translates ancient Halegannada grammar into modern Hosagannada with glossary mapping.
            </p>
            <div className="pt-2 text-xs font-mono text-emerald-700 font-semibold flex items-center gap-1">
              <span>Metric Moraic Analysis</span>
              <BookOpen className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3 */}
          <div
            onClick={onNavigateToRules}
            className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs hover:border-amber-400 hover:shadow-md transition-all space-y-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 group-hover:bg-amber-100 group-hover:text-amber-800 transition-colors">
              <History className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-amber-800 transition-colors">
              3. Epigraphia Rules & Phonology
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-serif">
              Deterministic computational rules tracking historical linguistic shifts (P ➔ H shift, archaic Sakata Repha ಱ, and liquid retroflex Kula L ೞ).
            </p>
            <div className="pt-2 text-xs font-mono text-blue-700 group-hover:text-amber-800 font-semibold flex items-center gap-1">
              <span>Inspect Formal Grammar Rules</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 8: FEATURED BENCHMARK EPIGRAPHS
      ========================================== */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
              Canonical Inscriptions
            </span>
            <h2 className="text-2xl font-serif font-bold text-slate-900 mt-1">
              Historic Steles Available in Archive
            </h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            onClick={onNavigateToArchive}
          >
            View All Catalogued Inscriptions ({inscriptions.length})
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {inscriptions.slice(0, 3).map((ins) => (
            <div
              key={ins.id}
              onClick={() => onSelectInscription(ins)}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:border-amber-400 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 bg-slate-900 overflow-hidden">
                  <img
                    src={ins.imageUrl}
                    alt={ins.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <Badge variant="script" size="sm">{ins.scriptClass.replace('_', ' ')}</Badge>
                  </div>
                  <div className="absolute bottom-2 right-3 font-mono text-[11px] text-white/90 bg-slate-950/70 px-2 py-0.5 rounded">
                    {ins.historicalContext.century}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-1">
                    {ins.title}
                  </h3>
                  <p className="font-kannada text-xs text-slate-500 line-clamp-1">
                    {ins.kannadaTitle}
                  </p>

                  <div className="text-xs text-slate-600 pt-2 border-t border-slate-100 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Landmark className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{ins.historicalContext.dynasty}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{ins.historicalContext.findSpot.village}, {ins.historicalContext.findSpot.district}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  {ins.transcription.lines.length} lines transcribed
                </span>
                <span className="text-xs font-semibold text-amber-700 font-serif group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                  <span>Examine</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          SECTION 9: EPIGRAPHY DISCOVERY QUIZ
      ========================================== */}
      <EpigraphyQuizSection />

      {/* ==========================================
          SECTION 10: INVITATION CALL TO ACTION
      ========================================== */}
      <section className="rounded-2xl bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 p-8 sm:p-12 text-white text-center space-y-5 shadow-lg">
        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto text-amber-200">
          <Sparkles className="w-6 h-6" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-extrabold tracking-tight">
          Ready to Decipher Historical Steles & Rubbings?
        </h2>
        <p className="text-amber-100 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-serif">
          Upload an inscription image or select from our verified archival register to run automated paleographical segmentation and 4-tier translation.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onNavigateToAnalysis}
            className="px-6 py-2.5 rounded-lg bg-white text-slate-900 hover:bg-amber-50 font-bold text-xs transition-colors shadow-sm inline-flex items-center gap-2"
          >
            <SearchCode className="w-4 h-4 text-amber-700" />
            <span>Start New Inscription Analysis</span>
          </button>
          <button
            onClick={onNavigateToArchive}
            className="px-6 py-2.5 rounded-lg bg-amber-950/60 hover:bg-amber-950/80 border border-amber-400/40 text-white font-semibold text-xs transition-colors inline-flex items-center gap-2"
          >
            <Archive className="w-4 h-4" />
            <span>Search Inscription Register</span>
          </button>
        </div>
      </section>
    </div>
  );
};
