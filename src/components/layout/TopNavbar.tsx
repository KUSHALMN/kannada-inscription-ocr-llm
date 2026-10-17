import React, { useState } from 'react';
import { NavItemKey } from './Sidebar';
import {
  Landmark,
  Search,
  ArrowRight,
  Menu,
  X,
  Feather
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

  const navLinks = [
    { key: 'home' as NavItemKey, label: 'Home' },
    { key: 'archive' as NavItemKey, label: 'Inscriptions' },
    { key: 'dynasties' as any, label: 'Dynasties', isAnchor: true },
    { key: 'scripts_languages' as NavItemKey, label: 'Scripts & Language' },
    { key: 'historical_rules' as NavItemKey, label: 'Research' },
    { key: 'overview' as NavItemKey, label: 'About' },
  ];

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.isAnchor) {
      if (activeTab !== 'home') {
        onNavigate('home');
        setTimeout(() => {
          const el = document.getElementById('dynasties-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
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
    <header className="sticky top-0 z-50 bg-[#FBF8F2]/95 backdrop-blur-md border-b border-[#E8DEC8] shadow-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Left Branding */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3.5 cursor-pointer group shrink-0"
        >
          {/* Temple Icon Badge */}
          <div className="w-10 h-10 rounded-lg bg-[#EFE5D2] border border-[#DFCBB0] flex items-center justify-center text-[#7C3517] shadow-xs group-hover:scale-105 transition-transform">
            <Landmark className="w-5 h-5" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-serif font-extrabold text-base sm:text-lg tracking-wider text-[#2B1B14] leading-tight">
                KANNADA HERITAGE
              </span>
            </div>
            <span className="font-kannada text-xs font-semibold text-[#8B4823] leading-none">
              ಕನ್ನಡ ಪರಂಪರೆ
            </span>
          </div>

          {/* Divider & Subtitle */}
          <div className="h-7 w-px bg-[#DFCBB0] mx-1.5 hidden xl:block" />
          <span className="text-[10px] font-mono tracking-widest text-[#7C695C] uppercase font-medium hidden xl:inline">
            EPIGRAPHICAL RESEARCH &amp; TRANSLATION PLATFORM
          </span>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-medium font-serif">
          {navLinks.map((link) => {
            const isActive =
              (activeTab === link.key && !link.isAnchor) ||
              (link.key === 'overview' && activeTab === 'overview') ||
              (link.key === 'home' && activeTab === 'home' && !link.isAnchor);

            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className={`relative py-1.5 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-[#2B1B14] font-bold'
                    : 'text-[#6C584C] hover:text-[#2B1B14]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B4823] rounded-full" />
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
            className="p-2 rounded-lg text-[#6C584C] hover:text-[#2B1B14] hover:bg-[#EFE5D2] transition-colors"
            title="Search Inscriptions"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Primary Translate Inscription Button */}
          <button
            onClick={() => onNavigate('new_analysis')}
            className="px-4 py-2 bg-[#7C3517] hover:bg-[#682A10] text-[#FFF9F2] rounded-lg text-xs font-semibold flex items-center gap-2 shadow-sm transition-all hover:shadow-md"
          >
            <Feather className="w-3.5 h-3.5 text-[#F2C58A]" />
            <span>Translate Inscription</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#6C584C] hover:text-[#2B1B14] hover:bg-[#EFE5D2]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FBF8F2] border-t border-[#E8DEC8] px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link)}
              className="w-full text-left py-2 px-3 rounded-lg text-sm font-serif font-medium text-[#2B1B14] hover:bg-[#EFE5D2]"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
