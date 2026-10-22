import React, { useState } from 'react';
import { NavItemKey } from './Sidebar';
import {
  Landmark,
  Search,
  ArrowRight,
  Menu,
  X,
  Feather,
  ChevronDown,
  CheckCircle2,
  BookOpen,
  Sparkles
} from 'lucide-react';

interface TopNavbarProps {
  activeTab: NavItemKey;
  onNavigate: (tab: NavItemKey) => void;
  onOpenSearch?: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  activeTab,
  onNavigate,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Exact navigation tabs matching the design:
  // Inscriptions, Dynasties, Scripts & Language, Research, About
  const navLinks = [
    { key: 'archive' as NavItemKey, label: 'Inscriptions' },
    { key: 'dynasties' as any, label: 'Dynasties', isAnchor: true },
    { key: 'scripts_languages' as NavItemKey, label: 'Scripts & Language' },
    { key: 'new_analysis' as NavItemKey, label: 'Research' },
    { key: 'overview' as NavItemKey, label: 'About' },
  ];

  const [dynastiesActive, setDynastiesActive] = useState(false);

  // Monitor when dynasties section is in viewport on home page
  React.useEffect(() => {
    if (activeTab !== 'home') {
      setDynastiesActive(false);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setDynastiesActive(true);
          } else {
            const el = document.getElementById('dynasties-section');
            if (el && el.getBoundingClientRect().top > 150) {
              setDynastiesActive(false);
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: '-80px 0px -40% 0px' }
    );

    const el = document.getElementById('dynasties-section');
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [activeTab]);

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.isAnchor && link.key === 'dynasties') {
      const scrollToDynasties = (attempts = 0) => {
        const el = document.getElementById('dynasties-section');
        if (el) {
          const navOffset = 90;
          const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - navOffset,
            behavior: 'smooth'
          });
          setDynastiesActive(true);
        } else if (attempts < 12) {
          setTimeout(() => scrollToDynasties(attempts + 1), 50);
        }
      };

      if (activeTab !== 'home') {
        onNavigate('home');
        setTimeout(() => scrollToDynasties(), 80);
      } else {
        scrollToDynasties();
      }
    } else {
      setDynastiesActive(false);
      onNavigate(link.key);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-2 sm:top-3 z-50 px-3 sm:px-6 transition-all pointer-events-none">
      <div className="pointer-events-auto max-w-[1440px] mx-auto rounded-2xl sm:rounded-full bg-white/30 backdrop-blur-3xl backdrop-saturate-200 border border-white/80 shadow-[0_12px_40px_rgba(43,23,17,0.08),inset_0_1.5px_2px_0_rgba(255,255,255,0.95)] px-4 sm:px-8 py-2.5 flex items-center justify-between gap-4 relative overflow-hidden transition-all">
        {/* Specular prismatic liquid glass refraction sheen */}
        <div className="absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/5 to-transparent pointer-events-none" />
        {/* Left Branding */}
        <div
          onClick={() => {
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3.5 cursor-pointer group shrink-0"
        >
          {/* Temple Icon Badge with liquid glass refraction */}
          <div className="w-10 h-10 rounded-xl bg-white/70 backdrop-blur-md border border-white/80 flex items-center justify-center text-[#8C3B18] shadow-[inset_0_1px_2px_rgba(255,255,255,0.95),0_2px_8px_rgba(140,59,24,0.08)] group-hover:scale-105 group-hover:bg-white/90 group-hover:shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_4px_14px_rgba(140,59,24,0.14)] transition-all">
            <Landmark className="w-5 h-5" />
          </div>

          <div className="flex flex-col">
            <span className="font-serif font-black text-base sm:text-lg tracking-wider text-[#2B1711] leading-tight">
              KANNADA HERITAGE
            </span>
            <span className="font-kannada text-xs font-semibold text-[#8C3B18] leading-tight">
              ಕನ್ನಡ ಪರಂಪರೆ
            </span>
          </div>

          {/* Divider & Two-Line Stacked Subtitle */}
          <div className="h-8 w-px bg-white/80 border-r border-[#E2D2BC]/60 mx-2 hidden xl:block" />
          <div className="hidden xl:flex flex-col text-[9.5px] font-mono tracking-widest text-[#7C695C] uppercase font-semibold leading-tight">
            <span>EPIGRAPHICAL RESEARCH &amp;</span>
            <span>TRANSLATION PLATFORM</span>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[13px] font-serif font-medium">
          {navLinks.map((link) => {
            const isActive =
              link.key === 'dynasties'
                ? dynastiesActive && activeTab === 'home'
                : link.key === 'overview'
                ? activeTab === 'overview'
                : activeTab === link.key ||
                  (link.key === 'new_analysis' && activeTab === 'results');

            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className={`relative py-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'text-[#2B1711] font-bold'
                    : 'text-[#6C584C] hover:text-[#2B1711]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  /* Signature active ornament: horizontal bar with center accent dot */
                  <div className="absolute -bottom-1.5 left-0 right-0 flex items-center justify-center">
                    <div className="h-[1.5px] w-full bg-[#A84A1C]/70 relative shadow-[0_1px_4px_rgba(168,74,28,0.3)]">
                      <div className="absolute left-1/2 -top-[2px] -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#A84A1C] shadow-[0_0_6px_rgba(168,74,28,0.6)]" />
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Search Icon with Liquid Glass treatment */}
          <button
            onClick={() => {
              if (onOpenSearch) onOpenSearch();
              else onNavigate('archive');
            }}
            className="p-2.5 rounded-xl text-[#6C584C] hover:text-[#2B1711] bg-white/45 hover:bg-white/80 backdrop-blur-md border border-white/70 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_2px_6px_rgba(40,24,18,0.04)] transition-all cursor-pointer"
            title="Search Inscription Registers"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Primary Translate Inscription Button with Liquid Gloss Sheen */}
          <button
            onClick={() => onNavigate('new_analysis')}
            className="px-4 py-2 bg-gradient-to-r from-[#8C3B18] via-[#9B421C] to-[#7A3215] hover:from-[#7C3315] hover:to-[#6A2810] text-[#FFF9F2] rounded-xl text-xs font-semibold flex items-center gap-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_6px_20px_rgba(140,59,24,0.25)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_8px_25px_rgba(140,59,24,0.35)] transition-all cursor-pointer group hover:scale-[1.02]"
          >
            <Feather className="w-3.5 h-3.5 text-[#F5C78E] group-hover:rotate-12 transition-transform" />
            <span>Translate Inscription</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F5C78E] group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* User Profile Chip - Kushal MN with Liquid Glass Pill */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.9),0_2px_8px_rgba(40,24,18,0.04)] hover:bg-white/90 hover:shadow-[inset_0_1px_1.5px_rgba(255,255,255,1),0_4px_14px_rgba(40,24,18,0.08)] transition-all cursor-pointer"
              title="Researcher Account"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#F5E2CF] to-[#E5C7AB] text-[#7A3418] font-serif font-black text-xs flex items-center justify-center shadow-xs border border-white/50">
                K
              </div>
              <span className="text-xs font-serif font-semibold text-[#2B1711] hidden sm:inline">
                Kushal MN
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#7C695C]" />
            </button>

            {/* User Dropdown Menu with Liquid Frosted Refraction */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2.5 w-72 bg-white/85 backdrop-blur-2xl border border-white/90 rounded-2xl shadow-[0_20px_50px_rgba(40,24,18,0.12),inset_0_1px_1.5px_rgba(255,255,255,0.95)] p-3.5 z-50 animate-fadeIn text-xs text-[#2B1711]">
                <div className="flex items-center gap-3 pb-3 border-b border-[#EEDBCA]">
                  <div className="w-10 h-10 rounded-full bg-[#EED6BF] text-[#7A3418] font-serif font-bold text-base flex items-center justify-center">
                    K
                  </div>
                  <div>
                    <div className="font-bold font-serif text-sm">Kushal M N</div>
                    <div className="text-[10px] text-[#8C3B18] font-mono flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Lead Epigraphist &amp; Maintainer
                    </div>
                  </div>
                </div>

                <div className="py-2.5 space-y-1.5 border-b border-[#EEDBCA] text-[11px] text-[#6A574A]">
                  <div className="flex items-center justify-between">
                    <span>Verified Epigraphs:</span>
                    <span className="font-bold text-[#2B1711]">10,248+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Research Role:</span>
                    <span className="font-bold text-[#2B1711]">AI Paleography Lead</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Repository:</span>
                    <span className="font-mono text-[10px] text-[#8C3B18]">kannada-inscription-ocr-llm</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-1">
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      onNavigate('archive');
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-[#F2E5D2] text-[#2B1711] flex items-center justify-between font-serif font-medium"
                  >
                    <span>My Inscription Catalogue</span>
                    <BookOpen className="w-3.5 h-3.5 text-[#8C3B18]" />
                  </button>
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      onNavigate('new_analysis');
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-[#F2E5D2] text-[#2B1711] flex items-center justify-between font-serif font-medium"
                  >
                    <span>Rubbing Analysis Studio</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#8C3B18]" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#6C584C] hover:text-[#2B1711] hover:bg-[#EFE5D2]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu with Liquid Glass */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto lg:hidden mt-2 max-w-[1440px] mx-auto rounded-2xl bg-white/80 backdrop-blur-3xl border border-white/90 px-4 py-4 space-y-2 shadow-2xl">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link)}
              className="w-full text-left py-2 px-3 rounded-xl text-sm font-serif font-medium text-[#2B1711] hover:bg-white/60 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
