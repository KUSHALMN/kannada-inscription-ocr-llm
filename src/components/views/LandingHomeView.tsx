import React, { useState, useRef } from 'react';
import { InscriptionRecord } from '../../types';
import {
  ArrowRight,
  Upload,
  FileText,
  Image as ImageIcon,
  Feather,
  BookOpen,
  MapPin,
  ChevronRight,
  Globe,
  Users,
  Compass,
  ChevronLeft,
  Landmark
} from 'lucide-react';
import heroBg from '../../assets/hero-bg.jpg';
import sampleStele from '../../assets/sample-stele.jpg';

interface LandingHomeViewProps {
  inscriptions: InscriptionRecord[];
  onNavigateToAnalysis: () => void;
  onNavigateToArchive: () => void;
  onNavigateToScripts: () => void;
  onNavigateToRules: () => void;
  onSelectInscription: (inscription: InscriptionRecord) => void;
}

interface DynastyCardItem {
  id: string;
  name: string;
  century: string;
  kannadaPeriod: string;
  imageUrl: string;
  location: string;
}

const MAJOR_DYNASTIES: DynastyCardItem[] = [
  {
    id: 'ashoka',
    name: 'Ashoka',
    century: '3rd Century BCE',
    kannadaPeriod: 'ಮೌರ್ಯ ಸಾಮ್ರಾಜ್ಯ',
    imageUrl: '/temples/ashoka.jpg',
    location: 'Maski & Brahmagiri'
  },
  {
    id: 'kadamba',
    name: 'Kadamba',
    century: '4th–6th Century',
    kannadaPeriod: 'ಕದಂಬ ರಾಜವಂಶ',
    imageUrl: '/temples/kadamba.jpg',
    location: 'Halmidi & Banavasi'
  },
  {
    id: 'chalukya',
    name: 'Chalukya',
    century: '6th–8th Century',
    kannadaPeriod: 'ಬಾದಾಮಿ ಚಾಲುಕ್ಯರು',
    imageUrl: '/temples/chalukya.jpg',
    location: 'Badami, Aihole, Pattadakal'
  },
  {
    id: 'rashtrakuta',
    name: 'Rashtrakuta',
    century: '8th–10th Century',
    kannadaPeriod: 'ರಾಷ್ಟ್ರಕೂಟ ಸಾಮ್ರಾಜ್ಯ',
    imageUrl: '/temples/rashtrakuta.jpg',
    location: 'Manyakheta & Ellora'
  },
  {
    id: 'hoysala',
    name: 'Hoysala',
    century: '10th–14th Century',
    kannadaPeriod: 'ಹೊಯ್ಸಳ ಸಾಮ್ರಾಜ್ಯ',
    imageUrl: '/temples/hoysala.jpg',
    location: 'Belur & Halebidu'
  },
  {
    id: 'vijayanagara',
    name: 'Vijayanagara',
    century: '14th–16th Century',
    kannadaPeriod: 'ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯ',
    imageUrl: '/temples/vijayanagara.jpg',
    location: 'Hampi & Hospet'
  },
  {
    id: 'nayaka',
    name: 'Nayaka',
    century: '16th–18th Century',
    kannadaPeriod: 'ಕೆಳದಿ ನಾಯಕರು',
    imageUrl: '/temples/nayaka.jpg',
    location: 'Keladi, Ikkeri, Chitradurga'
  },
  {
    id: 'ganga',
    name: 'Western Ganga',
    century: '4th–10th Century',
    kannadaPeriod: 'ಪಶ್ಚಿಮ ಗಂಗರು',
    imageUrl: '/temples/ganga.jpg',
    location: 'Shravanabelagola & Talakadu'
  }
];

export const LandingHomeView: React.FC<LandingHomeViewProps> = ({
  inscriptions,
  onNavigateToAnalysis,
  onNavigateToArchive,
  onNavigateToScripts,
  onNavigateToRules,
  onSelectInscription,
}) => {
  // Live Demo Card Tab state
  const [activeTab, setActiveTab] = useState<'upload' | 'type' | 'example'>('upload');
  const [typedText, setTypedText] = useState<string>('ಶ್ರೀ ವೀರನಾರಾಯಣ ಪುಂಡರೀಕದೇವರೆ...');
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onNavigateToAnalysis();
    }
  };

  const handleScrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleSelectDynasty = (dynasty: DynastyCardItem) => {
    const matched = inscriptions.find(ins =>
      ins.historicalContext.dynasty.toLowerCase().includes(dynasty.name.toLowerCase()) ||
      ins.scriptClass.toLowerCase().includes(dynasty.name.toLowerCase())
    );
    if (matched) {
      onSelectInscription(matched);
    } else {
      onNavigateToArchive();
    }
  };

  return (
    <div className="w-full space-y-16 pb-0">
      {/* =================================================================
          1. HERO SECTION WITH TEMPLE BACKGROUND & LIVE TRANSLATION CARD
      ================================================================== */}
      <section
        className="relative w-full min-h-[640px] lg:min-h-[720px] overflow-hidden bg-[#FAF6EE] text-[#2B1B14] flex items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
        {/* Soft, delicate warm wash on the left so headline & typography are 100% crisp while keeping full temple scenery visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6EE]/95 via-[#FAF6EE]/55 to-transparent sm:w-[50%] pointer-events-none z-1" />

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-8 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Narrative, and Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Category Breadcrumb Tag */}
            <div className="inline-block">
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] font-semibold text-[#8B4823]">
                INSCRIPTIONS • HISTORY • PEOPLE • KARNATAKA'S LEGACY
              </span>
            </div>

            {/* Main Headline (Exact typography from design) */}
            <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-[#1E120B] tracking-tight leading-[1.12]">
              Bridging 2,300 Years <br />
              <span className="text-[#1E120B]">of Kannada History</span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-sm sm:text-base text-[#564337] leading-relaxed max-w-xl font-serif">
              Read, translate and explore ancient Kannada inscriptions from temples, pillars, heroes stones and monuments using AI and epigraphical knowledge.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                onClick={onNavigateToAnalysis}
                className="px-6 py-3 bg-[#7C3517] hover:bg-[#682A10] text-[#FFF9F2] rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm transition-all hover:shadow-md"
              >
                <Feather className="w-4 h-4 text-[#F2C58A]" />
                <span>Translate an Inscription</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onNavigateToArchive}
                className="px-6 py-3 bg-[#FAF6F0]/90 hover:bg-[#FAF6F0] text-[#2B1B14] border border-[#DFCBB0] rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all"
              >
                <BookOpen className="w-4 h-4 text-[#8B4823]" />
                <span>Explore Inscriptions</span>
              </button>
            </div>

            {/* Statistics Bar (Horizontal strip from design) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-[#DECBB2]/80 max-w-2xl">
              {/* Stat 1 */}
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded bg-[#EFE5D2] text-[#7C3517] shrink-0 mt-0.5">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-serif font-bold text-base sm:text-lg text-[#1E120B] leading-none">
                    10,000+
                  </div>
                  <div className="text-[11px] text-[#6C584C] mt-1 font-serif">
                    Inscriptions (Growing)
                  </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded bg-[#EFE5D2] text-[#7C3517] shrink-0 mt-0.5">
                  <Landmark className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-serif font-bold text-base sm:text-lg text-[#1E120B] leading-none">
                    12+
                  </div>
                  <div className="text-[11px] text-[#6C584C] mt-1 font-serif">
                    Major Dynasties
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded bg-[#EFE5D2] text-[#7C3517] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-serif font-bold text-base sm:text-lg text-[#1E120B] leading-none">
                    100+
                  </div>
                  <div className="text-[11px] text-[#6C584C] mt-1 font-serif">
                    Historical Sites
                  </div>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded bg-[#EFE5D2] text-[#7C3517] shrink-0 mt-0.5">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-serif font-bold text-base sm:text-lg text-[#1E120B] leading-none">
                    Multiple
                  </div>
                  <div className="text-[11px] text-[#6C584C] mt-1 font-serif">
                    Languages &amp; Scripts
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Interactive "TRY A TRANSLATION" Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#FAF7F2] rounded-2xl border border-[#E4D7C2] shadow-2xl p-5 sm:p-6 space-y-4">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#3E2D24]">
                  TRY A TRANSLATION
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E5F4E9] border border-[#BDE5C7] text-[#1B6331] text-[11px] font-mono font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#27A844] animate-pulse" />
                  <span>Live Demo</span>
                </span>
              </div>

              {/* Tabs Container */}
              <div className="grid grid-cols-3 gap-1 bg-[#EBE2D2] p-1 rounded-lg text-xs font-serif font-medium">
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`py-1.5 rounded-md flex items-center justify-center gap-1.5 transition-all ${
                    activeTab === 'upload'
                      ? 'bg-white text-[#7C3517] shadow-xs font-bold'
                      : 'text-[#6C584C] hover:text-[#2B1B14]'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Image</span>
                </button>

                <button
                  onClick={() => setActiveTab('type')}
                  className={`py-1.5 rounded-md flex items-center justify-center gap-1.5 transition-all ${
                    activeTab === 'type'
                      ? 'bg-white text-[#7C3517] shadow-xs font-bold'
                      : 'text-[#6C584C] hover:text-[#2B1B14]'
                  }`}
                >
                  <span className="font-mono text-xs">Aa</span>
                  <span>Type Text</span>
                </button>

                <button
                  onClick={() => setActiveTab('example')}
                  className={`py-1.5 rounded-md flex items-center justify-center gap-1.5 transition-all ${
                    activeTab === 'example'
                      ? 'bg-white text-[#7C3517] shadow-xs font-bold'
                      : 'text-[#6C584C] hover:text-[#2B1B14]'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Example</span>
                </button>
              </div>

              {/* Active Tab Content: Drag & Drop Zone */}
              {activeTab === 'upload' && (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragOver(false);
                    onNavigateToAnalysis();
                  }}
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-all bg-[#F4EDE0]/60 ${
                    isDragOver ? 'border-[#7C3517] bg-[#EFE5D2]' : 'border-[#D5C2A6] hover:border-[#7C3517]'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-[#EFE5D2] flex items-center justify-center mx-auto mb-2 text-[#7C3517]">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-[#564337] font-serif mb-3">
                    Drag &amp; drop an inscription image here <br />
                    <span className="text-[11px] text-[#7C695C]">or</span>
                  </p>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-5 py-2 bg-[#7C3517] hover:bg-[#682A10] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                  >
                    Choose Image
                  </button>

                  <div className="text-[10px] text-[#857268] font-mono mt-3">
                    Supports: JPG, PNG (max 10MB)
                  </div>
                </div>
              )}

              {activeTab === 'type' && (
                <div className="space-y-2">
                  <textarea
                    rows={3}
                    value={typedText}
                    onChange={(e) => setTypedText(e.target.value)}
                    placeholder="Type or paste Old Kannada text..."
                    className="w-full p-3 rounded-lg border border-[#DFCBB0] bg-white text-xs font-kannada text-[#2B1B14] focus:outline-none focus:ring-1 focus:ring-[#7C3517]"
                  />
                  <button
                    onClick={onNavigateToAnalysis}
                    className="w-full py-2 bg-[#7C3517] text-white rounded-lg text-xs font-semibold"
                  >
                    Analyze Text
                  </button>
                </div>
              )}

              {activeTab === 'example' && (
                <div className="p-3 bg-[#EFE5D2]/60 rounded-xl border border-[#DFCBB0] text-xs space-y-1.5 font-serif">
                  <p className="font-bold text-[#7C3517]">Preloaded Academic Stele</p>
                  <p className="text-[#564337] italic">
                    Halmidi Inscription (c. 450 CE) Kadamba Box-Headed stone grant.
                  </p>
                  <button
                    onClick={onNavigateToAnalysis}
                    className="text-[#7C3517] font-bold text-xs underline"
                  >
                    Load Halmidi in Workspace →
                  </button>
                </div>
              )}

              {/* Sample Result Box (Exact 3-step format from screenshot) */}
              <div className="pt-2 border-t border-[#E8DEC8] space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="font-bold uppercase tracking-wider text-[#3E2D24]">
                    SAMPLE RESULT
                  </span>
                  <span className="text-[#857268]">
                    Example from Hoysala period (12th–13th century)
                  </span>
                </div>

                <div className="grid grid-cols-12 gap-3 items-center">
                  {/* Left Thumbnail: Authentic Stone Inscription */}
                  <div className="col-span-4 h-28 rounded-lg overflow-hidden border border-[#D5C2A6] bg-slate-900 shadow-xs">
                    <img
                      src={sampleStele}
                      alt="Hoysala Inscription"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Right: 3 Numbered Steps */}
                  <div className="col-span-8 space-y-2 text-xs">
                    {/* Step 1: Halegannada */}
                    <div className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#1E120B] text-white flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">
                        1
                      </span>
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono text-[#564337] font-bold block">
                          Halegannada <span className="font-normal text-[#857268]">(Original Reading)</span>
                        </span>
                        <p className="font-kannada text-xs font-semibold text-[#1E120B] truncate">
                          ಶ್ರೀ ವೀರನಾರಾಯಣ ಪುಂಡರೀಕದೇವರೆ...
                        </p>
                      </div>
                    </div>

                    {/* Step 2: Hosa Kannada */}
                    <div className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#8B4823] text-white flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">
                        2
                      </span>
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono text-[#564337] font-bold block">
                          Hosa Kannada <span className="font-normal text-[#857268]">(Modern Kannada)</span>
                        </span>
                        <p className="font-kannada text-xs font-semibold text-[#1E120B] truncate">
                          ಶ್ರೀ ವೀರನಾರಾಯಣ ಪುಂಡರೀಕದೇವರೆ...
                        </p>
                      </div>
                    </div>

                    {/* Step 3: English */}
                    <div className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#B88746] text-white flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">
                        3
                      </span>
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono text-[#564337] font-bold block">
                          English <span className="font-normal text-[#857268]">(Translation)</span>
                        </span>
                        <p className="font-serif text-[11px] italic text-[#1E120B] truncate">
                          King Vira Narayana Pundarikadeva...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          2. FOUR FEATURE ACTION CARDS ROW (Exact match from screenshot)
      ================================================================== */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Feature Card 1: Upload & Translate */}
          <div
            onClick={onNavigateToAnalysis}
            className="p-5 bg-[#FAF7F2] border border-[#E8DEC8] rounded-xl hover:border-[#8B4823] hover:shadow-md transition-all cursor-pointer group flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-lg bg-[#EFE5D2] border border-[#DFCBB0] flex items-center justify-center text-[#7C3517] shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-sm text-[#1E120B] group-hover:text-[#7C3517] transition-colors">
                  Upload &amp; Translate
                </h3>
                <p className="text-[11px] text-[#6C584C] font-serif leading-snug">
                  Get Halegannada to Hosa Kannada translation with script analysis.
                </p>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#7C3517] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Feature Card 2: Browse by Dynasty */}
          <div
            onClick={() => {
              const el = document.getElementById('dynasties-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="p-5 bg-[#FAF7F2] border border-[#E8DEC8] rounded-xl hover:border-[#8B4823] hover:shadow-md transition-all cursor-pointer group flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-lg bg-[#EFE5D2] border border-[#DFCBB0] flex items-center justify-center text-[#7C3517] shrink-0">
                <Landmark className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-sm text-[#1E120B] group-hover:text-[#7C3517] transition-colors">
                  Browse by Dynasty
                </h3>
                <p className="text-[11px] text-[#6C584C] font-serif leading-snug">
                  Explore inscriptions from Ashoka, Kadamba, Chalukya, Rashtrakuta, Hoysala and more.
                </p>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#7C3517] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Feature Card 3: Script Evolution */}
          <div
            onClick={onNavigateToScripts}
            className="p-5 bg-[#FAF7F2] border border-[#E8DEC8] rounded-xl hover:border-[#8B4823] hover:shadow-md transition-all cursor-pointer group flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-lg bg-[#EFE5D2] border border-[#DFCBB0] flex items-center justify-center text-[#7C3517] font-kannada font-bold text-xl shrink-0">
                ಕ
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-sm text-[#1E120B] group-hover:text-[#7C3517] transition-colors">
                  Script Evolution
                </h3>
                <p className="text-[11px] text-[#6C584C] font-serif leading-snug">
                  Learn the evolution of Kannada script from early forms to modern Kannada.
                </p>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#7C3517] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Feature Card 4: Historical Context */}
          <div
            onClick={onNavigateToRules}
            className="p-5 bg-[#FAF7F2] border border-[#E8DEC8] rounded-xl hover:border-[#8B4823] hover:shadow-md transition-all cursor-pointer group flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-lg bg-[#EFE5D2] border border-[#DFCBB0] flex items-center justify-center text-[#7C3517] shrink-0">
                <Compass className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-sm text-[#1E120B] group-hover:text-[#7C3517] transition-colors">
                  Historical Context
                </h3>
                <p className="text-[11px] text-[#6C584C] font-serif leading-snug">
                  Get information about period, location, language, material and significance.
                </p>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#7C3517] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          3. EXPLORE: MAJOR DYNASTIES OF KARNATAKA (Gallery Carousel)
      ================================================================== */}
      <section id="dynasties-section" className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-6">
        {/* Header with line and View All Link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-semibold text-[#8B4823]">
              EXPLORE
            </span>
            <div className="flex items-center gap-4">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E120B]">
                Major Dynasties of Karnataka
              </h2>
              <div className="hidden md:block w-32 h-px bg-[#DFCBB0]" />
            </div>
          </div>

          <div className="flex items-center gap-4 self-end sm:self-auto">
            <button
              onClick={onNavigateToArchive}
              className="text-xs font-serif font-semibold text-[#7C3517] hover:text-[#5B230C] flex items-center gap-1 transition-colors"
            >
              <span>View all Dynasties</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Carousel navigation buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleScrollCarousel('left')}
                className="w-8 h-8 rounded-full border border-[#D5C2A6] bg-[#FAF7F2] hover:bg-[#EFE5D2] flex items-center justify-center text-[#564337]"
                aria-label="Previous Dynasties"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScrollCarousel('right')}
                className="w-8 h-8 rounded-full border border-[#D5C2A6] bg-[#FAF7F2] hover:bg-[#EFE5D2] flex items-center justify-center text-[#564337]"
                aria-label="Next Dynasties"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Carousel of Dynasty Cards */}
        <div
          ref={carouselRef}
          className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-none scroll-smooth"
        >
          {MAJOR_DYNASTIES.map((dyn) => (
            <div
              key={dyn.id}
              onClick={() => handleSelectDynasty(dyn)}
              className="w-56 sm:w-64 shrink-0 rounded-xl overflow-hidden bg-[#1A120B] border border-[#DFCBB0]/60 shadow-xs hover:shadow-xl hover:border-[#B57C48] transition-all cursor-pointer group flex flex-col justify-between relative h-72"
            >
              {/* Real Temple Heritage Photo */}
              <img
                src={dyn.imageUrl}
                alt={dyn.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-90"
                onError={(e) => {
                  e.currentTarget.src = '/temples/vijayanagara.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0A08] via-[#0F0A08]/50 to-black/20 group-hover:via-[#0F0A08]/40 transition-colors" />

              {/* Top Location Badge */}
              <div className="relative z-10 p-3 flex justify-end">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-sans font-medium bg-black/55 backdrop-blur-xs text-[#EADDC9] border border-white/10">
                  <MapPin className="w-2.5 h-2.5 text-[#E6AF65]" />
                  <span className="truncate max-w-[140px]">{dyn.location}</span>
                </span>
              </div>

              {/* Dynasty Card Info */}
              <div className="relative z-10 p-4 text-white space-y-1">
                <div className="flex items-baseline justify-between gap-1">
                  <h3 className="font-serif font-bold text-lg text-white group-hover:text-[#F2C58A] transition-colors leading-tight drop-shadow-xs">
                    {dyn.name}
                  </h3>
                </div>
                <p className="text-xs text-[#F0E6D2] font-mono tracking-tight drop-shadow-xs">
                  {dyn.century}
                </p>
                <div className="flex items-center justify-between pt-1 border-t border-white/15">
                  <p className="font-kannada text-xs text-[#EADDC9] font-medium">
                    {dyn.kannadaPeriod}
                  </p>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E6AF65] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =================================================================
          4. BOTTOM DARK STONE QUOTE & MISSION BANNER (From screenshot)
      ================================================================== */}
      <footer className="w-full bg-[#18110D] text-[#FFF9F2] py-12 px-4 sm:px-8 border-t border-[#36251C]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Sculpted Relief Image + Quote */}
          <div className="lg:col-span-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            {/* Hoysala Royal Lion / Nandi Carving Thumbnail */}
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-900 border border-[#483328] shrink-0 shadow-md">
              <img
                src={sampleStele}
                alt="Stone relief carving"
                className="w-full h-full object-cover filter contrast-125 sepia-50"
              />
            </div>

            {/* Majestic Quote */}
            <div className="space-y-3">
              <p className="font-serif italic text-lg sm:text-xl lg:text-2xl text-[#E8DEC8] leading-relaxed max-w-2xl">
                “In stones, they wrote not just words, but the story of a people, a language and a civilization.”
              </p>
              <div className="w-24 h-0.5 bg-[#8B4823] mx-auto sm:mx-0" />
            </div>
          </div>

          {/* Right: 4 Mission Pillars */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4 text-xs font-serif text-[#DFCBB0]">
            <div className="flex items-center gap-2.5">
              <Feather className="w-4 h-4 text-[#C99052] shrink-0" />
              <span>Preserve Heritage</span>
            </div>

            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-[#C99052] shrink-0" />
              <span>Make Knowledge Accessible</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-[#C99052] shrink-0" />
              <span>Enable Research</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-[#C99052] shrink-0" />
              <span>For Future Generations</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
