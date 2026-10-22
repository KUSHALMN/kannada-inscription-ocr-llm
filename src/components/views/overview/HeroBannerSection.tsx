import React from 'react';
import heroPanorama from '../../../assets/hero-new-heritage.jpg';
import { CorpusTelemetryCapsules } from './CorpusTelemetryCapsules';

export const HeroBannerSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#EADBCA] bg-[#FAF6EE] shadow-sm">
      {/* Background panoramic stele image on right */}
      <div
        className="absolute inset-y-0 right-0 w-full lg:w-[60%] bg-cover bg-[center_right] bg-no-repeat pointer-events-none opacity-95 lg:opacity-100"
        style={{ backgroundImage: `url(${heroPanorama})` }}
      >
        {/* Crisp gradient blend so temple scenery remains vivid while text stays legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6EE] via-[#FAF6EE]/50 via-25% to-transparent lg:w-[42%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6EE] via-[#FAF6EE]/20 to-transparent lg:hidden" />
      </div>

      {/* Hero Left Content - Spacious layout now that floating overlay is removed */}
      <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-xl lg:max-w-2xl space-y-6">
        {/* Dignified Inscriptional Overline with Accent Rule */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-cinzel font-bold text-[#8C3B18] tracking-[0.25em] uppercase">
            ABOUT KANNADA HERITAGE
          </span>
          <div className="w-16 h-px bg-[#DFCBB0]" />
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
