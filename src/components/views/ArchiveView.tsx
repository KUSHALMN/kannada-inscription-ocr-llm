import React, { useState, useMemo } from 'react';
import { InscriptionRecord } from '../../types';
import {
  Search,
  ArrowRight,
  BookOpen,
  Landmark,
  MapPin,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Maximize2,
  ChevronDown,
  LayoutGrid,
  List,
  Table as TableIcon,
  Home,
  ChevronRight,
  BarChart3,
  X
} from 'lucide-react';
import heroBg from '../../assets/hero-bg.jpg';
import sampleStele from '../../assets/sample-stele.jpg';

interface ArchiveViewProps {
  inscriptions: InscriptionRecord[];
  onSelectInscription: (inscription: InscriptionRecord) => void;
  onNavigateHome?: () => void;
}

interface InscriptionArchiveCardItem {
  id: string;
  accessionNumber: string;
  title: string;
  kannadaTitle: string;
  scriptBadge: string;
  periodBadge: string;
  status: 'verified' | 'under_review' | 'provisional';
  location: string;
  material: string;
  lineCount: number;
  condition: string;
  imageUrl: string;
  rawInscriptionRecord?: InscriptionRecord;
}

const CANONICAL_CATALOGUE: InscriptionArchiveCardItem[] = [
  {
    id: 'ins-maski-002',
    accessionNumber: 'KHA-EP-0001-ASK',
    title: 'Ashokan Pillar Inscription at Maski',
    kannadaTitle: 'ಮಸ್ಕಿ ಅಶೋಕ ಶಿಲಾಶಾಸನ',
    scriptBadge: 'Brahmi',
    periodBadge: '3rd Century BCE',
    status: 'verified',
    location: 'Maski, Raichur',
    material: 'Stone (Granite)',
    lineCount: 4,
    condition: 'Excellent',
    imageUrl: '/temples/ashoka.jpg'
  },
  {
    id: 'ins-halmidi-001',
    accessionNumber: 'KHA-EP-0450-HLM',
    title: 'Halmidi Kadamba Stele Inscription',
    kannadaTitle: 'ಹಲ್ಮಿಡಿ ಕದಂಬ ಶಿಲಾಶಾಸನ',
    scriptBadge: 'Early Kannada',
    periodBadge: '4th–6th Century CE',
    status: 'verified',
    location: 'Halmidi, Hassan',
    material: 'Sandstone Stele',
    lineCount: 16,
    condition: 'Good',
    imageUrl: '/temples/kadamba.jpg'
  },
  {
    id: 'ins-aihole-005',
    accessionNumber: 'KHA-EP-0634-AHL',
    title: 'Aihole Prashasti of Ravikirti (Pulakeshin II Victory Stele)',
    kannadaTitle: 'ಐಹೊಳೆ ರವಿಕೀರ್ತಿ ಪ್ರಶಸ್ತಿ',
    scriptBadge: 'Early Kannada',
    periodBadge: '6th–8th Century CE',
    status: 'verified',
    location: 'Aihole (Aryapura), Bagalkote',
    material: 'Sandstone',
    lineCount: 3,
    condition: 'Excellent',
    imageUrl: '/temples/chalukya.jpg'
  },
  {
    id: 'ins-badami-003',
    accessionNumber: 'KHA-EP-0700-BDM',
    title: 'Kappe Arabhatta Inscription of Badami (Tripadi Metre)',
    kannadaTitle: 'ಬಾದಾಮಿ ಕಪ್ಪೆ ಅರಭಟ್ಟ ಶಿಲಾಶಾಸನ',
    scriptBadge: 'Early Kannada',
    periodBadge: '6th–8th Century CE',
    status: 'verified',
    location: 'Badami (Vatapi), Bagalkote',
    material: 'Sandstone',
    lineCount: 3,
    condition: 'Excellent',
    imageUrl: '/temples/chalukya.jpg'
  },
  {
    id: 'ins-belur-004',
    accessionNumber: 'KHA-EP-1117-BLR',
    title: 'Belur Chennakeshava Temple Consecration Epigraph',
    kannadaTitle: 'ಬೇಲೂರು ಚೆನ್ನಕೇಶವ ದೇವಾಲಯ ಪ್ರತಿಷ್ಠಾಪನಾ ಶಾಸನ',
    scriptBadge: 'Halegannada',
    periodBadge: '10th–14th Century CE',
    status: 'verified',
    location: 'Belur, Hassan',
    material: 'Soapstone',
    lineCount: 5,
    condition: 'Good',
    imageUrl: '/temples/hoysala.jpg'
  },
  {
    id: 'ins-hampi-007',
    accessionNumber: 'KHA-EP-1423-HMP',
    title: 'Vijayanagara Royal Grant Inscription',
    kannadaTitle: 'ವಿಜಯನಗರ ರಾಜಶಾಸನ',
    scriptBadge: 'Halegannada',
    periodBadge: '14th–16th Century CE',
    status: 'verified',
    location: 'Hampi, Vijayanagara',
    material: 'Granite',
    lineCount: 6,
    condition: 'Good',
    imageUrl: '/temples/vijayanagara.jpg'
  },
  {
    id: 'ins-mysuru-008',
    accessionNumber: 'KHA-EP-1678-MYS',
    title: 'Nayaka Period Temple Inscription',
    kannadaTitle: 'ನಾಯಕ ಕಾಲದ ದೇವಾಲಯ ಶಿಲಾಶಾಸನ',
    scriptBadge: 'Halegannada',
    periodBadge: '16th–18th Century CE',
    status: 'under_review',
    location: 'Srirangapatna, Mandya',
    material: 'Granite',
    lineCount: 4,
    condition: 'Fair',
    imageUrl: '/temples/nayaka.jpg'
  },
  {
    id: 'ins-dharwad-006',
    accessionNumber: 'KHA-EP-0850-DHW',
    title: 'Dharwad Hero Stone of Amoghavarsha Nrupatunga',
    kannadaTitle: 'ಅಮೋಘವರ್ಷ ನೃಪತುಂಗನ ಧಾರವಾಡ ವೀರಶಿಲಾಶಾಸನ',
    scriptBadge: 'Sanskrit',
    periodBadge: '8th–10th Century CE',
    status: 'verified',
    location: 'Dharwad, Dharwad',
    material: 'Copper Plate',
    lineCount: 4,
    condition: 'Good',
    imageUrl: '/temples/rashtrakuta.jpg'
  },
  {
    id: 'ins-shravana-009',
    accessionNumber: 'KHA-EP-1290-SRG',
    title: 'Shravanabelagola Jain Inscription',
    kannadaTitle: 'ಶ್ರವಣಬೆಳಗೊಳ ಜೈನ ಶಿಲಾಶಾಸನ',
    scriptBadge: 'Halegannada',
    periodBadge: '12th–13th Century CE',
    status: 'provisional',
    location: 'Shravanabelagola, Hassan',
    material: 'Granite',
    lineCount: 5,
    condition: 'Fair',
    imageUrl: '/temples/ganga.jpg'
  }
];

export const ArchiveView: React.FC<ArchiveViewProps> = ({
  inscriptions,
  onSelectInscription,
  onNavigateHome,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedScripts, setSelectedScripts] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedDynasties, setSelectedDynasties] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('chronological_asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'table'>('grid');

  // Merged Catalog
  const fullCatalogue = useMemo(() => {
    return CANONICAL_CATALOGUE.map((item) => {
      const match = inscriptions.find(
        (ins) => ins.id === item.id || ins.title.toLowerCase().includes(item.title.toLowerCase().split(' ')[0])
      );
      return {
        ...item,
        rawInscriptionRecord: match || inscriptions[0],
      };
    });
  }, [inscriptions]);

  const filteredItems = useMemo(() => {
    return fullCatalogue.filter((item) => {
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          item.title.toLowerCase().includes(q) ||
          item.kannadaTitle.toLowerCase().includes(q) ||
          item.accessionNumber.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      if (selectedScripts.length > 0 && !selectedScripts.includes(item.scriptBadge)) {
        return false;
      }

      if (selectedDynasties.length > 0) {
        const itemText = (item.title + ' ' + item.periodBadge + ' ' + (item.rawInscriptionRecord?.historicalContext?.dynasty || '')).toLowerCase();
        const matchesDyn = selectedDynasties.some((d) => {
          const key = d.toLowerCase().split(' ')[0].replace(/[^a-z]/g, '');
          return itemText.includes(key);
        });
        if (!matchesDyn) return false;
      }

      if (selectedMaterials.length > 0 && !selectedMaterials.some((m) => item.material.includes(m))) {
        return false;
      }

      if (selectedConditions.length > 0 && !selectedConditions.includes(item.condition)) {
        return false;
      }

      return true;
    });
  }, [fullCatalogue, searchQuery, selectedScripts, selectedDynasties, selectedMaterials, selectedConditions]);

  const handleClearAll = () => {
    setSearchQuery('');
    setSelectedScripts([]);
    setSelectedLanguages([]);
    setSelectedDynasties([]);
    setSelectedMaterials([]);
    setSelectedConditions([]);
  };

  const handleToggleFilter = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    if (list.includes(val)) {
      setList(list.filter((x) => x !== val));
    } else {
      setList([...list, val]);
    }
  };

  return (
    <div className="w-full space-y-6 pb-16 bg-[#FBF8F2] text-[#241711]">
      {/* =================================================================
          1. BREADCRUMBS
      ================================================================== */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-4">
        <div className="flex items-center gap-2 text-xs font-serif text-[#6C584C]">
          <button
            onClick={onNavigateHome}
            className="hover:text-[#241711] flex items-center gap-1 transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-[#8B4823]" />
          </button>
          <ChevronRight className="w-3 h-3 text-[#A8988B]" />
          <span className="hover:text-[#241711] cursor-pointer">Inscriptions</span>
          <ChevronRight className="w-3 h-3 text-[#A8988B]" />
          <span className="font-semibold text-[#8B4823]">Archive</span>
        </div>
      </div>

      {/* =================================================================
          2. HERO BANNER: INSCRIPTION ARCHIVE REGISTER (With Background Scenery)
      ================================================================== */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div
          className="relative rounded-2xl overflow-hidden border border-[#E8DEC8] bg-[#FAF7F2] p-6 sm:p-10 shadow-xs bg-cover bg-right bg-no-repeat"
          style={{
            backgroundImage: `url(${heroBg})`,
          }}
        >
          {/* Warm Parchment Gradient Wash on Left to match screenshot */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/95 to-transparent sm:w-[70%] z-0" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Header Narrative */}
            <div className="lg:col-span-8 space-y-3.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E07A2B]" />
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-semibold text-[#8B4823]">
                  PERMANENT COLLECTIONS
                </span>
              </div>

              <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#1E120B] tracking-tight">
                Inscription Archive Register
              </h1>

              <p className="text-xs sm:text-sm text-[#564337] font-serif max-w-2xl leading-relaxed">
                Search, filter, and explore verified historical epigraphs catalogued from Karnataka archaeological steles and copper plates.
              </p>

              <p className="font-kannada text-xs sm:text-sm text-[#8B4823] font-semibold leading-relaxed">
                ಕರ್ನಾಟಕದ ಪ್ರಾಚೀನ ಶಿಲಾಶಾಸನಗಳು ಮತ್ತು ತಾಮ್ರಪತ್ರಗಳ ದೃಢೀಕೃತ ಸಂಗ್ರಹ
              </p>

              {/* Motto with authentic divider on readable parchment */}
              <div className="pt-1 flex items-center gap-3 text-xs sm:text-sm font-serif text-[#6C584C] italic">
                <span className="w-8 h-px bg-[#8B4823]/60" />
                <span>“Stones that speak, Records that live.”</span>
              </div>
            </div>

            {/* Right side is kept clean so authentic carved stele background is completely unobstructed */}
            <div className="lg:col-span-4 hidden lg:block" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* =================================================================
          3. METRICS BAR STRIP (Exact match from screenshot)
      ================================================================== */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="bg-[#FAF7F2] border border-[#E8DEC8] rounded-xl p-3 sm:p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-serif text-[#564337]">
            {/* Metric 1 */}
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-[#7C3517]" />
              <div>
                <span className="font-bold text-[#1E120B] text-sm">8</span>
                <span className="text-[11px] text-[#6C584C] block leading-none">Catalogued Inscriptions</span>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex items-center gap-2.5">
              <Landmark className="w-4 h-4 text-[#7C3517]" />
              <div>
                <span className="font-bold text-[#1E120B] text-sm">10</span>
                <span className="text-[11px] text-[#6C584C] block leading-none">Historical Eras</span>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#7C3517]" />
              <div>
                <span className="font-bold text-[#1E120B] text-sm">32</span>
                <span className="text-[11px] text-[#6C584C] block leading-none">Districts</span>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="flex items-center gap-2.5">
              <span className="w-4 h-4 rounded bg-[#EFE5D2] text-[#7C3517] font-kannada font-bold text-xs flex items-center justify-center">
                ಕ
              </span>
              <div>
                <span className="font-bold text-[#1E120B] text-sm">5</span>
                <span className="text-[11px] text-[#6C584C] block leading-none">Scripts</span>
              </div>
            </div>

            {/* Metric 5 */}
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-[#7C3517]" />
              <div>
                <span className="font-bold text-[#1E120B] text-sm">3</span>
                <span className="text-[11px] text-[#6C584C] block leading-none">Source Languages</span>
              </div>
            </div>

            {/* Metric 6 */}
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#1B6331]" />
              <div>
                <span className="font-bold text-[#1E120B] text-sm">6</span>
                <span className="text-[11px] text-[#6C584C] block leading-none">Verified by Experts</span>
              </div>
            </div>
          </div>

          {/* Right Action Pill */}
          <div className="p-2 px-3 rounded-lg bg-[#EFE5D2]/70 border border-[#DFCBB0] flex items-center gap-3 text-xs font-serif shrink-0 cursor-pointer hover:bg-[#EFE5D2] transition-colors">
            <BarChart3 className="w-4 h-4 text-[#7C3517]" />
            <div>
              <span className="font-bold text-[#7C3517] flex items-center gap-1">
                View Corpus Details <ArrowRight className="w-3 h-3" />
              </span>
              <span className="text-[10px] text-[#857268] font-mono block">3rd C. BCE – 19th C. CE</span>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================================
          4. MAIN ARCHIVE WORKSPACE: FILTERS SIDEBAR + INSCRIPTION GRID
      ================================================================== */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ==================== LEFT FILTERS SIDEBAR ==================== */}
          <aside className="lg:col-span-3 bg-[#FAF7F2] border border-[#E8DEC8] rounded-xl p-5 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E8DEC8] pb-3">
              <h2 className="font-serif font-bold text-sm tracking-wider uppercase text-[#1E120B]">
                FILTERS
              </h2>
              <button
                onClick={handleClearAll}
                className="text-xs font-serif text-[#7C3517] hover:underline font-semibold"
              >
                Clear All
              </button>
            </div>

            {/* Accordion 1: Script (Historical Era) */}
            <div className="space-y-2.5 text-xs font-serif text-[#564337]">
              <div className="flex items-center justify-between font-bold text-[#1E120B]">
                <span>Script (Historical Era)</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
              <div className="space-y-1.5 pl-0.5">
                {[
                  { label: 'Brahmi', count: 3 },
                  { label: 'Early Kannada', count: 2 },
                  { label: 'Halegannada', count: 5 },
                  { label: 'Sanskrit', count: 2 },
                  { label: 'Grantha', count: 1 },
                ].map((s) => (
                  <label key={s.label} className="flex items-center gap-2 cursor-pointer hover:text-[#1E120B]">
                    <input
                      type="checkbox"
                      checked={selectedScripts.includes(s.label)}
                      onChange={() => handleToggleFilter(selectedScripts, setSelectedScripts, s.label)}
                      className="rounded border-[#DFCBB0] text-[#7C3517] focus:ring-[#7C3517]"
                    />
                    <span>{s.label} ({s.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Accordion 2: Source Language */}
            <div className="space-y-2.5 text-xs font-serif text-[#564337] pt-2 border-t border-[#E8DEC8]">
              <div className="flex items-center justify-between font-bold text-[#1E120B]">
                <span>Source Language</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
              <div className="space-y-1.5 pl-0.5">
                {[
                  { label: 'Kannada', count: 4 },
                  { label: 'Sanskrit', count: 2 },
                  { label: 'Prakrit', count: 1 },
                  { label: 'Tamil', count: 1 },
                ].map((l) => (
                  <label key={l.label} className="flex items-center gap-2 cursor-pointer hover:text-[#1E120B]">
                    <input
                      type="checkbox"
                      checked={selectedLanguages.includes(l.label)}
                      onChange={() => handleToggleFilter(selectedLanguages, setSelectedLanguages, l.label)}
                      className="rounded border-[#DFCBB0] text-[#7C3517] focus:ring-[#7C3517]"
                    />
                    <span>{l.label} ({l.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Accordion 3: Dynasty / Ruler */}
            <div className="space-y-2.5 text-xs font-serif text-[#564337] pt-2 border-t border-[#E8DEC8]">
              <div className="flex items-center justify-between font-bold text-[#1E120B]">
                <span>Dynasty / Ruler</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
              <div className="space-y-1.5 pl-0.5">
                {[
                  { label: 'Ashoka', count: 1 },
                  { label: 'Kadamba', count: 2 },
                  { label: 'Chalukya', count: 1 },
                  { label: 'Rashtrakuta', count: 1 },
                  { label: 'Hoysala', count: 1 },
                  { label: 'Vijayanagara', count: 1 },
                  { label: 'Nayaka', count: 1 },
                ].map((d) => (
                  <label key={d.label} className="flex items-center gap-2 cursor-pointer hover:text-[#1E120B]">
                    <input
                      type="checkbox"
                      checked={selectedDynasties.includes(d.label)}
                      onChange={() => handleToggleFilter(selectedDynasties, setSelectedDynasties, d.label)}
                      className="rounded border-[#DFCBB0] text-[#7C3517] focus:ring-[#7C3517]"
                    />
                    <span>{d.label} ({d.count})</span>
                  </label>
                ))}
                <button className="text-[11px] text-[#7C3517] font-semibold hover:underline block pt-1">
                  Show more
                </button>
              </div>
            </div>

            {/* Accordion 4: Century / Period */}
            <div className="space-y-2.5 text-xs font-serif text-[#564337] pt-2 border-t border-[#E8DEC8]">
              <div className="flex items-center justify-between font-bold text-[#1E120B]">
                <span>Century / Period</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
              <div className="space-y-1">
                <input
                  type="range"
                  min="1"
                  max="10"
                  defaultValue="5"
                  className="w-full accent-[#7C3517]"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#857268]">
                  <span>3rd BCE</span>
                  <span>19th CE</span>
                </div>
              </div>
            </div>

            {/* Accordion 5: Material */}
            <div className="space-y-2.5 text-xs font-serif text-[#564337] pt-2 border-t border-[#E8DEC8]">
              <div className="flex items-center justify-between font-bold text-[#1E120B]">
                <span>Material</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
              <div className="space-y-1.5 pl-0.5">
                {[
                  { label: 'Stone', count: 6 },
                  { label: 'Copper Plate', count: 2 },
                ].map((m) => (
                  <label key={m.label} className="flex items-center gap-2 cursor-pointer hover:text-[#1E120B]">
                    <input
                      type="checkbox"
                      checked={selectedMaterials.includes(m.label)}
                      onChange={() => handleToggleFilter(selectedMaterials, setSelectedMaterials, m.label)}
                      className="rounded border-[#DFCBB0] text-[#7C3517] focus:ring-[#7C3517]"
                    />
                    <span>{m.label} ({m.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Accordion 6: Condition */}
            <div className="space-y-2.5 text-xs font-serif text-[#564337] pt-2 border-t border-[#E8DEC8]">
              <div className="flex items-center justify-between font-bold text-[#1E120B]">
                <span>Condition</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
              <div className="space-y-1.5 pl-0.5">
                {[
                  { label: 'Excellent', count: 4 },
                  { label: 'Good', count: 3 },
                  { label: 'Fair', count: 1 },
                ].map((c) => (
                  <label key={c.label} className="flex items-center gap-2 cursor-pointer hover:text-[#1E120B]">
                    <input
                      type="checkbox"
                      checked={selectedConditions.includes(c.label)}
                      onChange={() => handleToggleFilter(selectedConditions, setSelectedConditions, c.label)}
                      className="rounded border-[#DFCBB0] text-[#7C3517] focus:ring-[#7C3517]"
                    />
                    <span>{c.label} ({c.count})</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* ==================== RIGHT INSCRIPTIONS DISPLAY ==================== */}
          <div className="lg:col-span-9 space-y-4">
            {/* Search Input & Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search Field */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#857268] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, ruler, dynasty, accession #, district, village, keyword..."
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] border border-[#E8DEC8] rounded-lg text-xs font-serif text-[#1E120B] focus:outline-none focus:ring-1 focus:ring-[#7C3517]"
                />
              </div>

              {/* Search Button */}
              <button className="px-6 py-2.5 bg-[#7C3517] hover:bg-[#682A10] text-white rounded-lg text-xs font-serif font-semibold shadow-xs transition-colors">
                Search
              </button>

              {/* Sort By Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2.5 bg-[#FAF7F2] border border-[#E8DEC8] rounded-lg text-xs font-serif text-[#564337] focus:outline-none appearance-none pr-8 cursor-pointer"
                >
                  <option value="chronological_asc">⇅ Chronological (Oldest First)</option>
                  <option value="chronological_desc">⇅ Chronological (Newest First)</option>
                  <option value="title_asc">Title (A–Z)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#857268] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* View Switch Buttons */}
              <div className="flex items-center border border-[#E8DEC8] rounded-lg p-0.5 bg-[#FAF7F2]">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'grid' ? 'bg-[#7C3517] text-white' : 'text-[#857268] hover:text-[#1E120B]'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'list' ? 'bg-[#7C3517] text-white' : 'text-[#857268] hover:text-[#1E120B]'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'table' ? 'bg-[#7C3517] text-white' : 'text-[#857268] hover:text-[#1E120B]'
                  }`}
                  title="Table View"
                >
                  <TableIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Dynasty Explorer Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#8B4823] font-semibold shrink-0 pr-1">
                Dynasty:
              </span>
              {[
                { label: 'All Dynasties', key: '' },
                { label: 'Ashoka', key: 'Ashoka' },
                { label: 'Kadamba', key: 'Kadamba' },
                { label: 'Chalukya', key: 'Chalukya' },
                { label: 'Rashtrakuta', key: 'Rashtrakuta' },
                { label: 'Hoysala', key: 'Hoysala' },
                { label: 'Vijayanagara', key: 'Vijayanagara' },
                { label: 'Nayaka', key: 'Nayaka' },
                { label: 'Western Ganga', key: 'Ganga' },
              ].map((dyn) => {
                const isActive = dyn.key === '' ? selectedDynasties.length === 0 : selectedDynasties.includes(dyn.key);
                return (
                  <button
                    key={dyn.label}
                    onClick={() => {
                      if (dyn.key === '') {
                        setSelectedDynasties([]);
                      } else {
                        handleToggleFilter(selectedDynasties, setSelectedDynasties, dyn.key);
                      }
                    }}
                    className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-serif transition-colors border ${
                      isActive
                        ? 'bg-[#7C3517] text-white border-[#7C3517] font-semibold shadow-xs'
                        : 'bg-[#FAF7F2] text-[#564337] border-[#DFCBB0] hover:border-[#7C3517] hover:text-[#1E120B]'
                    }`}
                  >
                    {dyn.label}
                  </button>
                );
              })}
            </div>

            {/* Quick Filter Status Strip */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-serif pt-1">
              <span className="font-bold text-[#1E120B]">
                {filteredItems.length} Inscriptions Found
              </span>

              {/* Filter Chips matching screenshot */}
              {['All Scripts', 'All Languages', 'All Periods', 'All Dynasties', 'All Status'].map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF7F2] border border-[#DFCBB0] text-[11px] text-[#564337] shadow-xs"
                >
                  <span>{chip}</span>
                  <X className="w-3 h-3 text-[#A8988B] hover:text-[#7C3517] cursor-pointer" />
                </span>
              ))}
            </div>

            {/* Inscription Cards Grid (4 columns x 2 rows = 8 cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 pt-2">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectInscription(item.rawInscriptionRecord || inscriptions[0])}
                  className="bg-[#FAF7F2] border border-[#E8DEC8] rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#8B4823] transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    {/* Stele Image with Badges */}
                    <div className="relative h-44 bg-slate-900 overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = sampleStele;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                      {/* Status Badge */}
                      <div className="absolute top-2.5 right-2.5">
                        {item.status === 'verified' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#E5F4E9]/95 text-[#1B6331] border border-[#BDE5C7] flex items-center gap-1 shadow-xs">
                            <CheckCircle2 className="w-3 h-3 text-[#27A844]" />
                            <span>Verified</span>
                          </span>
                        )}
                        {item.status === 'under_review' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#FFF4E5]/95 text-[#975A16] border border-[#F6D2A2] flex items-center gap-1 shadow-xs">
                            <Clock className="w-3 h-3 text-[#D68227]" />
                            <span>Under Review</span>
                          </span>
                        )}
                        {item.status === 'provisional' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#F5EBE1]/95 text-[#8B4823] border border-[#DFCBB0] flex items-center gap-1 shadow-xs">
                            <AlertCircle className="w-3 h-3 text-[#8B4823]" />
                            <span>Provisional</span>
                          </span>
                        )}
                      </div>

                      {/* Zoom / Expand icon button */}
                      <button
                        className="absolute bottom-2.5 right-2.5 p-1 rounded-md bg-slate-900/60 hover:bg-slate-900 text-white/90 transition-colors"
                        title="View Full Stele"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Card Body */}
                    <div className="p-3.5 space-y-2.5">
                      {/* Script & Period Pill Badges */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                        <span className="px-2 py-0.5 rounded bg-[#EBF2F7] text-[#245C80] font-semibold border border-[#CDE0ED]">
                          {item.scriptBadge}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#FAF1DF] text-[#7C5A17] font-semibold border border-[#EEDCBA]">
                          {item.periodBadge}
                        </span>
                      </div>

                      {/* Accession Number */}
                      <div className="text-[10px] font-mono text-[#857268]">
                        {item.accessionNumber}
                      </div>

                      {/* Title & Kannada Subtitle */}
                      <div>
                        <h3 className="font-serif font-bold text-sm text-[#1E120B] group-hover:text-[#7C3517] transition-colors line-clamp-1 leading-snug">
                          {item.title}
                        </h3>
                        <p className="font-kannada text-xs text-[#8B4823] line-clamp-1 pt-0.5">
                          {item.kannadaTitle}
                        </p>
                      </div>

                      {/* Location & Material */}
                      <div className="text-[11px] text-[#564337] space-y-1 font-serif pt-1 border-t border-[#E8DEC8]/80">
                        <div className="flex items-center gap-1.5 truncate">
                          <MapPin className="w-3 h-3 text-[#8B4823] shrink-0" />
                          <span className="truncate">{item.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 truncate">
                          <FileText className="w-3 h-3 text-[#8B4823] shrink-0" />
                          <span className="truncate">{item.material}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Line count + Examine Button */}
                  <div className="p-3 bg-[#F4EDE0]/60 border-t border-[#E8DEC8] flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-[#6C584C]">
                      {item.lineCount} lines • {item.condition}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectInscription(item.rawInscriptionRecord || inscriptions[0]);
                      }}
                      className="px-3 py-1.5 bg-[#7C3517] hover:bg-[#682A10] text-white rounded text-xs font-serif font-semibold flex items-center gap-1 shadow-xs transition-colors shrink-0"
                    >
                      <span>Examine</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
