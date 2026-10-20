import React, { useState, useMemo } from 'react';
import { KARNATAKA_TEMPLE_HERITAGE, TempleHeritageSite } from '../../../data/templeRegistry';
import { InscriptionRecord } from '../../../types';
import {
  Landmark,
  MapPin,
  Calendar,
  Search,
  ExternalLink,
  Award,
  ScrollText,
  ChevronRight,
  Maximize2,
  X
} from 'lucide-react';

interface TempleAtlasSectionProps {
  inscriptions: InscriptionRecord[];
  onSelectInscription: (inscription: InscriptionRecord) => void;
  onNavigateToArchive: () => void;
}

export const TempleAtlasSection: React.FC<TempleAtlasSectionProps> = ({
  inscriptions,
  onSelectInscription,
  onNavigateToArchive,
}) => {
  const [selectedDynasty, setSelectedDynasty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalSite, setActiveModalSite] = useState<TempleHeritageSite | null>(null);

  const dynasties = [
    { id: 'all', label: 'All Dynasties (ಎಲ್ಲ ರಾಜವಂಶಗಳು)' },
    { id: 'Hoysala', label: 'Hoysalas (ಹೊಯ್ಸಳರು)' },
    { id: 'Chalukya', label: 'Badami Chalukyas (ಬಾದಾಮಿ ಚಾಲುಕ್ಯರು)' },
    { id: 'Vijayanagara', label: 'Vijayanagara (ವಿಜಯನಗರ)' },
    { id: 'Kadamba', label: 'Kadambas (ಕದಂಬರು)' },
    { id: 'Ganga', label: 'Western Ganga (ಪಶ್ಚಿಮ ಗಂಗರು)' },
  ];

  const filteredSites = useMemo(() => {
    return KARNATAKA_TEMPLE_HERITAGE.filter((site) => {
      const matchesDynasty =
        selectedDynasty === 'all' ||
        site.dynasty.toLowerCase().includes(selectedDynasty.toLowerCase());

      const matchesSearch =
        searchQuery.trim() === '' ||
        site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.kannadaName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.location.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.location.village.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesDynasty && matchesSearch;
    });
  }, [selectedDynasty, searchQuery]);

  const handleExamineSiteEpigraph = (site: TempleHeritageSite) => {
    // Find matching inscription by sampleInscriptionId or dynasty
    const matched = inscriptions.find(
      (ins) =>
        ins.id === site.sampleInscriptionId ||
        ins.historicalContext.dynasty.toLowerCase().includes(site.dynasty.toLowerCase().split(' ')[0])
    );

    if (matched) {
      onSelectInscription(matched);
    } else {
      onNavigateToArchive();
    }
  };

  return (
    <section className="space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="text-xs font-cinzel font-bold text-[#8C3B18] tracking-[0.2em] uppercase flex items-center gap-2">
            <Landmark className="w-3.5 h-3.5 text-amber-700" />
            <span>Karnataka Epigraphical &amp; Temple Heritage Atlas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-900 tracking-tight">
            Sacred Temples & Stone Inscriptions of Karnataka
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Explore authentic archaeological sites from the 5th-century Kadamba rock pillars to Hoysala chloritic schist friezes and Vijayanagara imperial granite steles.
          </p>
        </div>

        {/* Search input */}
        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search temple or district..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 bg-white shadow-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-serif"
          />
        </div>
      </div>

      {/* Dynasty Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
        {dynasties.map((dyn) => (
          <button
            key={dyn.id}
            onClick={() => setSelectedDynasty(dyn.id)}
            className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap font-medium font-serif ${
              selectedDynasty === dyn.id
                ? 'bg-amber-800 text-white shadow-xs font-semibold'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {dyn.label}
          </button>
        ))}
      </div>

      {/* Temples Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredSites.map((site) => (
          <div
            key={site.id}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-lg hover:border-amber-400 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Image Container with Real Photo */}
              <div className="relative h-48 bg-slate-900 overflow-hidden">
                <img
                  src={site.imageUrl}
                  alt={site.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                {/* UNESCO Tag */}
                {site.unescoStatus && (
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/90 text-slate-950 backdrop-blur-xs flex items-center gap-1 shadow-xs">
                      <Award className="w-3 h-3 text-slate-950" />
                      <span>UNESCO Heritage</span>
                    </span>
                  </div>
                )}

                {/* Epigraph count badge */}
                <div className="absolute top-2.5 right-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-950/80 text-amber-300 border border-amber-400/30">
                    {site.epigraphCount}+ Epigraphs
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <div className="text-[11px] font-mono text-amber-300 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{site.century}</span>
                  </div>
                  <h3 className="font-serif font-bold text-sm text-white drop-shadow-xs line-clamp-1">
                    {site.name}
                  </h3>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-4 space-y-3">
                <div className="space-y-1">
                  <div className="font-kannada text-xs font-semibold text-amber-900 line-clamp-1">
                    {site.kannadaName}
                  </div>
                  <div className="flex items-center gap-1 text-slate-500 text-xs">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">
                      {site.location.village}, {site.location.district} Dist.
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                  {site.description}
                </div>

                {/* Key Inscription Highlight */}
                <div className="p-2.5 bg-amber-50/60 border border-amber-200/70 rounded-lg space-y-1">
                  <div className="flex items-center gap-1 text-[10px] font-mono uppercase text-amber-800 font-bold">
                    <ScrollText className="w-3 h-3 text-amber-700" />
                    <span>Prominent Epigraph</span>
                  </div>
                  <p className="text-[11px] text-slate-800 font-serif line-clamp-2">
                    {site.inscriptionHighlights[0]}
                  </p>
                </div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setActiveModalSite(site)}
                className="px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 hover:bg-slate-200/60 rounded transition-colors"
                title="View full site details and photos"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Gallery</span>
              </button>

              <button
                onClick={() => handleExamineSiteEpigraph(site)}
                className="px-3 py-1.5 text-xs bg-amber-700 hover:bg-amber-800 text-white rounded font-medium flex items-center gap-1 shadow-xs transition-colors"
              >
                <span>Decipher</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Site Details & Real Photo Gallery */}
      {activeModalSite && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl">
            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-72 bg-slate-900">
              <img
                src={activeModalSite.imageUrl}
                alt={activeModalSite.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              <button
                onClick={() => setActiveModalSite(null)}
                className="absolute top-3 right-3 p-1.5 bg-slate-950/60 hover:bg-slate-950 text-white rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-amber-500 text-slate-950 mb-1 inline-block">
                  {activeModalSite.dynasty}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  {activeModalSite.name}
                </h3>
                <p className="font-kannada text-amber-300 text-sm">
                  {activeModalSite.kannadaName}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block font-mono">Location</span>
                  <span className="font-semibold text-slate-900">
                    {activeModalSite.location.village}, {activeModalSite.location.district}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-mono">Architectural Style</span>
                  <span className="font-semibold text-slate-900 truncate block">
                    {activeModalSite.architecturalStyle}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-mono">Patron King</span>
                  <span className="font-semibold text-slate-900">{activeModalSite.patronRuler}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-mono">Epigraph Census</span>
                  <span className="font-semibold text-amber-700">
                    {activeModalSite.epigraphCount}+ documented inscriptions
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif font-bold text-slate-900 text-sm">Historical Narrative</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {activeModalSite.description}
                </p>
                <p className="font-kannada text-xs text-amber-900/90 leading-relaxed bg-amber-50/50 p-3 rounded-lg border border-amber-200/60">
                  {activeModalSite.kannadaDescription}
                </p>
              </div>

              {/* Epigraph Highlights List */}
              <div className="space-y-2">
                <h4 className="font-serif font-bold text-slate-900 text-sm">
                  Documented Inscriptions & Epigraph Highlights
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {activeModalSite.inscriptionHighlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gallery Thumbnails */}
              {activeModalSite.galleryImages.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-slate-900 text-sm">Temple & Inscription Gallery</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {activeModalSite.galleryImages.map((img, i) => (
                      <div key={i} className="h-28 rounded-lg overflow-hidden bg-slate-900 border border-slate-200">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={() => setActiveModalSite(null)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleExamineSiteEpigraph(activeModalSite);
                    setActiveModalSite(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <span>Open Epigraph in Decipherment Workspace</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
