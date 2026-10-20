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
        {/* Subtle, highly transparent gradient blend overlay so temple scenery remains crisp & visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6EE] via-[#FAF6EE]/40 to-transparent lg:w-[48%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6EE] via-transparent to-transparent lg:hidden" />
      </div>

      {/* Epigraphical Quotation Badge - Floating Liquid Glass with High Transparency (20% opacity + blur) */}
      <div className="hidden xl:block absolute top-6 right-[290px] 2xl:right-[340px] z-10 w-[235px]">
        <div className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/50 p-4 rounded-2xl shadow-sm space-y-1.5 transition-all">
          <span className="text-[#C05621] font-serif text-2xl leading-none select-none block">
            “
          </span>
          <p className="font-serif italic text-xs text-[#1E120B] leading-snug font-semibold">
            Stones are not silent; they speak in a language of time.
          </p>
          <div className="pt-0.5 text-[10px] font-cinzel text-[#5E4D43] font-bold tracking-wider">
            — Epigraphical Research Initiative
          </div>
        </div>
      </div>

      {/* Hero Left Content - Constrained width to guarantee zero overlap with center temples and stele */}
      <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-lg xl:max-w-xl space-y-6">
        {/* Dignified Inscriptional Overline */}
        <div className="text-xs font-cinzel font-bold text-[#8C3B18] tracking-[0.2em] uppercase">
          ABOUT KANNADA HERITAGE
        </div>

        {/* Heading */}
        <div className="space-y-1">
          <h1 className="font-serif font-black text-3xl sm:text-4xl lg:text-[44px] text-[#24150E] leading-[1.12] tracking-tight">
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

        {/* Responsive inline quote for viewports under xl to prevent floating collision */}
        <div className="xl:hidden border-l-2 border-[#C05621] pl-3 py-1.5 bg-white/40 backdrop-blur-xs rounded-r-lg max-w-md">
          <p className="font-serif italic text-xs text-[#24150E] font-medium">
            “Stones are not silent; they speak in a language of time.”
          </p>
          <span className="text-[10px] font-cinzel text-[#7C695C] font-bold tracking-wider">
            — Epigraphical Research Initiative
          </span>
        </div>

        {/* 4 Stat Badges / Capsule */}
        <div className="pt-2">
          <CorpusTelemetryCapsules />
        </div>
      </div>
    </section>
  );
};
