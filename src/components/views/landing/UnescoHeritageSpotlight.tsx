import React, { useState } from 'react';
import {
  Award,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  ScrollText,
  ExternalLink,
  ShieldCheck,
  Landmark
} from 'lucide-react';
import { InscriptionRecord } from '../../../types';

interface UnescoHeritageSpotlightProps {
  inscriptions: InscriptionRecord[];
  onSelectInscription: (inscription: InscriptionRecord) => void;
  onNavigateToArchive: () => void;
}

interface UnescoSite {
  id: string;
  name: string;
  kannadaName: string;
  yearInscribed: string;
  dynasty: string;
  period: string;
  district: string;
  imageUrl: string;
  secondaryImageUrl: string;
  quote: string;
  epigraphHighlights: string[];
  totalEpigraphs: number;
  significance: string;
  targetInscriptionId: string;
}

const UNESCO_SITES: UnescoSite[] = [
  {
    id: 'hoysala-ensembles',
    name: 'Sacred Ensembles of the Hoysalas (Belur & Halebidu)',
    kannadaName: 'ಹೊಯ್ಸಳರ ಪವಿತ್ರ ದೇವಾಲಯ ಸಮೂಹಗಳು (ಬೇಲೂರು ಮತ್ತು ಹಳೇಬೀಡು)',
    yearInscribed: 'UNESCO Inscribed 2023',
    dynasty: 'Hoysala Empire',
    period: '12th Century CE (1117 – 1121 CE)',
    district: 'Hassan District, Karnataka',
    imageUrl: '/temples/hoysala.jpg',
    secondaryImageUrl: '/temples/hoysala.jpg',
    quote: 'The soft chloritic schist allowed Hoysala epigraphists to engrave Kannada poetry with the precision of ivory carving and calligraphic fluidness.',
    epigraphHighlights: [
      'King Vishnuvardhana 1117 CE Talakadu victory consecration inscription',
      'Signed artist epigraphs of master sculptors Dasoja of Balligavi & Mallitamma',
      'Ornate Kannada Champu and Vritta metres chiseled along star-shaped base friezes'
    ],
    totalEpigraphs: 212,
    significance: 'Recognized globally for its unparalleled micro-sculptural virtuosity in soapstone and calligraphic Old Kannada inscriptions detailing medieval court guilds.',
    targetInscriptionId: 'ins-belur-004'
  },
  {
    id: 'hampi-monuments',
    name: 'Group of Monuments at Hampi (Vijayanagara)',
    kannadaName: 'ಹಂಪಿಯ ಸ್ಮಾರಕಗಳ ಸಮೂಹ (ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯ)',
    yearInscribed: 'UNESCO Inscribed 1986',
    dynasty: 'Vijayanagara Empire',
    period: '14th – 16th Century CE',
    district: 'Vijayanagara District, Karnataka',
    imageUrl: '/temples/vijayanagara.jpg',
    secondaryImageUrl: '/temples/vijayanagara.jpg',
    quote: 'The granite boulders of Tungabhadra cradle hundreds of royal decrees written in Nadugannada script documenting international trade and imperial endowments.',
    epigraphHighlights: [
      'Sri Krishnadevaraya 1509 CE coronation endowment slab in Virupaksha temple',
      'Vittala Temple Stone Chariot (ಗರುಡ ರಥ) dedication charter',
      'International maritime trade decrees recording merchant guilds from Arabia and Portugal'
    ],
    totalEpigraphs: 520,
    significance: 'One of the largest open-air archaeological complexes on Earth, where imperial granite steles and bilingual copper charters immortalize medieval Indian statecraft.',
    targetInscriptionId: 'ins-hampi-007'
  },
  {
    id: 'pattadakal-complex',
    name: 'Group of Monuments at Pattadakal (Chalukyas)',
    kannadaName: 'ಪಟ್ಟದಕಲ್ಲು ದೇವಾಲಯಗಳ ಸಂಕೀರ್ಣ (ಬಾದಾಮಿ ಚಾಲುಕ್ಯರು)',
    yearInscribed: 'UNESCO Inscribed 1987',
    dynasty: 'Badami Chalukyas',
    period: '7th – 8th Century CE',
    district: 'Bagalkote District, Karnataka',
    imageUrl: '/temples/chalukya.jpg',
    secondaryImageUrl: '/temples/chalukya.jpg',
    quote: 'At Pattadakal, Northern Nagara and Southern Dravida architectural forms merged, consecrated by monumental Old Kannada royal prashastis.',
    epigraphHighlights: [
      'Queen Lokamahadevi victory inscription commemorating the capture of Kanchipuram',
      'Architect recognition inscription honoring master builder Gundan Anivaritachari',
      'Early Badami Chalukyan rounded script transitioning into medieval Kannada forms'
    ],
    totalEpigraphs: 42,
    significance: 'The historic coronation grounds (Kisuvolal) of the Chalukya emperors, preserving seminal inscriptions documenting medieval architects receiving royal honours.',
    targetInscriptionId: 'ins-badami-003'
  }
];

export const UnescoHeritageSpotlight: React.FC<UnescoHeritageSpotlightProps> = ({
  inscriptions,
  onSelectInscription,
  onNavigateToArchive,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  const site = UNESCO_SITES[currentSlideIndex];

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % UNESCO_SITES.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + UNESCO_SITES.length) % UNESCO_SITES.length);
  };

  const handleInspectEpigraph = () => {
    const matched = inscriptions.find(ins => ins.id === site.targetInscriptionId);
    if (matched) {
      onSelectInscription(matched);
    } else {
      onNavigateToArchive();
    }
  };

  return (
    <section className="bg-slate-900 text-white rounded-2xl overflow-hidden shadow-xl border border-slate-800">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Side: Real Temple Photography Slide */}
        <div className="lg:col-span-6 relative min-h-[320px] lg:min-h-[460px] bg-slate-950 overflow-hidden group">
          <img
            src={site.imageUrl}
            alt={site.name}
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

          {/* UNESCO Tag */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500 text-slate-950 flex items-center gap-1.5 shadow-md">
              <Award className="w-3.5 h-3.5" />
              <span>{site.yearInscribed}</span>
            </span>
          </div>

          {/* Epigraph Census Tag */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-950/80 text-amber-300 border border-amber-400/30">
              {site.totalEpigraphs}+ Documented Steles
            </span>
          </div>

          {/* Secondary Thumbnail Overlay */}
          <div className="absolute bottom-4 right-4 w-28 h-20 rounded-lg overflow-hidden border-2 border-white/40 shadow-lg hidden sm:block">
            <img src={site.secondaryImageUrl} alt="" className="w-full h-full object-cover" />
          </div>

          {/* Bottom Location Info */}
          <div className="absolute bottom-4 left-4 right-32 text-white">
            <div className="flex items-center gap-1 text-xs text-amber-300 font-mono mb-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{site.district}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white drop-shadow-sm">
              {site.name}
            </h3>
          </div>
        </div>

        {/* Right Side: Epigraphical Dossier & Quotes */}
        <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                  World Heritage Inscriptions
                </span>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  aria-label="Previous UNESCO Site"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-slate-400 px-2">
                  0{currentSlideIndex + 1} / 0{UNESCO_SITES.length}
                </span>
                <button
                  onClick={handleNext}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  aria-label="Next UNESCO Site"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                <span>{site.period}</span>
                <span>•</span>
                <span className="text-amber-300 font-semibold">{site.dynasty}</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-white">
                {site.name}
              </h2>
              <p className="font-kannada text-amber-200 text-sm">
                {site.kannadaName}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-serif italic border-l-2 border-amber-500 pl-3">
              "{site.quote}"
            </p>

            <p className="text-xs text-slate-400 leading-relaxed">
              {site.significance}
            </p>

            {/* Epigraph Highlights */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                Key Canonical Inscriptions at this Site
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {site.epigraphHighlights.map((hl, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <ScrollText className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>ASI Registered Monument</span>
            </div>

            <button
              onClick={handleInspectEpigraph}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors shadow-md"
            >
              <span>Examine Site Epigraph Dossier</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
