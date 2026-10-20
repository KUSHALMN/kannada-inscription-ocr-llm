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

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.isAnchor) {
      if (activeTab !== 'overview' && activeTab !== 'home') {
        onNavigate('overview');
        setTimeout(() => {
          const el = document.getElementById('dynasties-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      } else {
        const el = document.getElementById('dynasties-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onNavigate(link.key);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EADBCA] shadow-2xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        {/* Left Branding */}
        <div
          onClick={() => onNavigate('overview')}
          className="flex items-center gap-3.5 cursor-pointer group shrink-0"
        >
          {/* Temple Icon Badge */}
          <div className="w-10 h-10 rounded-xl bg-[#EFE4D2] border border-[#DFCBB0] flex items-center justify-center text-[#8C3B18] shadow-xs group-hover:scale-105 transition-transform">
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
          <div className="h-8 w-px bg-[#DFCBB0] mx-2 hidden xl:block" />
          <div className="hidden xl:flex flex-col text-[9.5px] font-mono tracking-widest text-[#7C695C] uppercase font-semibold leading-tight">
            <span>EPIGRAPHICAL RESEARCH &amp;</span>
            <span>TRANSLATION PLATFORM</span>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[13px] font-serif font-medium">
          {navLinks.map((link) => {
            const isActive =
              (activeTab === link.key && !link.isAnchor) ||
              (link.key === 'overview' && (activeTab === 'overview' || activeTab === 'home'));

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
                    <div className="h-[1.5px] w-full bg-[#A84A1C]/70 relative">
                      <div className="absolute left-1/2 -top-[2px] -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#A84A1C]" />
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Search Icon */}
          <button
            onClick={() => {
              if (onOpenSearch) onOpenSearch();
              else onNavigate('archive');
            }}
            className="p-2 rounded-lg text-[#6C584C] hover:text-[#2B1711] hover:bg-[#EFE5D2] transition-colors"
            title="Search Inscription Registers"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Primary Translate Inscription Button */}
          <button
            onClick={() => onNavigate('new_analysis')}
            className="px-4 py-2 bg-[#7D3418] hover:bg-[#682810] text-[#FFF9F2] rounded-lg text-xs font-semibold flex items-center gap-2 shadow-sm transition-all hover:shadow-md cursor-pointer group"
          >
            <Feather className="w-3.5 h-3.5 text-[#F5C78E] group-hover:rotate-12 transition-transform" />
            <span>Translate Inscription</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F5C78E] group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* User Profile Chip - Kushal MN */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full border border-[#E4D5BF] hover:border-[#DFC5A6] hover:bg-[#EFE5D2]/70 transition-all cursor-pointer"
              title="Researcher Account"
            >
              <div className="w-7 h-7 rounded-full bg-[#EED6BF] text-[#7A3418] font-serif font-black text-xs flex items-center justify-center shadow-2xs">
                K
              </div>
              <span className="text-xs font-serif font-semibold text-[#2B1711] hidden sm:inline">
                Kushal MN
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#7C695C]" />
            </button>

            {/* User Dropdown Menu */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-[#FFFDF9] border border-[#E2D2BC] rounded-xl shadow-xl p-3 z-50 animate-fadeIn text-xs text-[#2B1711]">
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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-t border-[#EADBCA] px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link)}
              className="w-full text-left py-2 px-3 rounded-lg text-sm font-serif font-medium text-[#2B1711] hover:bg-[#EFE5D2]"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
