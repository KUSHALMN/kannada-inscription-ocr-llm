import React from 'react';
import heroPanorama from '../../../assets/hero-new-heritage.jpg';
import { CorpusTelemetryCapsules } from './CorpusTelemetryCapsules';

export const HeroBannerSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#EADBCA] bg-[#FAF6EE] shadow-sm">
      {/* Background panoramic stele image on right */}
      <div
        className="absolute inset-y-0 right-0 w-full lg:w-3/5 bg-cover bg-right bg-no-repeat pointer-events-none opacity-90 lg:opacity-100"
        style={{ backgroundImage: `url(${heroPanorama})` }}
      >
        {/* Gradient blend overlay to create parchment fade on left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6EE] via-[#FAF6EE]/90 to-transparent lg:from-[#FAF6EE] lg:via-[#FAF6EE]/70 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6EE] via-transparent to-transparent lg:hidden" />
      </div>

      {/* Floating Quote Box on top right */}
      <div className="hidden lg:block absolute top-7 right-8 z-10 max-w-xs">
        <div className="bg-black/45 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-white shadow-xl space-y-2">
          <span className="text-[#F59E0B] font-serif text-4xl leading-none select-none block">
            “
          </span>
          <p className="font-serif italic text-sm text-stone-100 leading-snug">
            Stones are not silent; they speak in a language of time.
          </p>
          <div className="pt-1 text-[11px] font-mono tracking-wider text-amber-200/90 font-medium">
            — Epigraphical Research Initiative
          </div>
        </div>
      </div>

      {/* Hero Left Content */}
      <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-2xl space-y-6">
        {/* Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3E7D3] border border-[#DFCBB0] text-[10.5px] font-mono uppercase tracking-widest text-[#8C3B18] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8C3B18]" />
          ABOUT KANNADA HERITAGE
        </div>

        {/* Heading */}
        <div className="space-y-1">
          <h1 className="font-serif font-black text-3xl sm:text-4xl lg:text-[46px] text-[#24150E] leading-[1.12] tracking-tight">
            Preserving{' '}
            <span className="text-[#C05621] font-serif">Karnataka’s</span>
            <br />
            Epigraphical Heritage
          </h1>
        </div>

        {/* Subtitle & Kannada Subtitle */}
        <div className="space-y-2">
          <p className="font-serif text-[#5E4D43] text-sm sm:text-base leading-relaxed">
            A digital platform to decode, document, and translate ancient stone inscriptions
            using AI and expert research, bridging the past and present.
          </p>
          <p className="font-kannada text-[#3F2E25] text-sm sm:text-base font-semibold leading-relaxed">
            ಕಲ್ಲುಗಳಲ್ಲಿ ಕೆತ್ತಿದ ಇತಿಹಾಸವನ್ನು, ತಂತ್ರಜ್ಞಾನದಿಂದ ಜನರಿಗೆ ತಲುಪಿಸುವ ಪ್ರಯತ್ನ.
          </p>
        </div>

        {/* 4 Stat Badges / Capsule */}
        <div className="pt-2">
          <CorpusTelemetryCapsules />
        </div>
      </div>
    </section>
  );
};
