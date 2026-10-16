import React from 'react';
import {
  Home,
  LayoutDashboard,
  SearchCode,
  Archive,
  Layers,
  Scroll,
  Settings,
  ShieldCheck,
  X
} from 'lucide-react';

export type NavItemKey =
  | 'home'
  | 'overview'
  | 'new_analysis'
  | 'archive'
  | 'scripts_languages'
  | 'historical_rules'
  | 'settings'
  | 'results';

interface SidebarProps {
  activeTab: NavItemKey;
  onNavigate: (tab: NavItemKey) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onNavigate,
  isMobileOpen,
  onCloseMobile,
}) => {
  const navItems: { key: NavItemKey; label: string; kannadaLabel: string; icon: React.ReactNode }[] = [
    {
      key: 'home',
      label: 'Home',
      kannadaLabel: 'ಮುಖಪುಟ',
      icon: <Home className="w-4 h-4" />,
    },
    {
      key: 'overview',
      label: 'Overview',
      kannadaLabel: 'ಅವಲೋಕನ',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      key: 'new_analysis',
      label: 'New Analysis',
      kannadaLabel: 'ಹೊಸ ವಿಶ್ಲೇಷಣೆ',
      icon: <SearchCode className="w-4 h-4" />,
    },
    {
      key: 'archive',
      label: 'Inscription Archive',
      kannadaLabel: 'ಶಾಸನ ಕೋಶ',
      icon: <Archive className="w-4 h-4" />,
    },
    {
      key: 'scripts_languages',
      label: 'Scripts & Languages',
      kannadaLabel: 'ಲಿಪಿ ಮತ್ತು ಭಾಷೆ',
      icon: <Layers className="w-4 h-4" />,
    },
    {
      key: 'historical_rules',
      label: 'Historical Rules',
      kannadaLabel: 'ವ್ಯಾಕರಣ ಮತ್ತು ಛಂದಸ್ಸು',
      icon: <Scroll className="w-4 h-4" />,
    },
    {
      key: 'settings',
      label: 'Settings',
      kannadaLabel: 'ವ್ಯವಸ್ಥಾಪನೆ',
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  const handleNavClick = (key: NavItemKey) => {
    onNavigate(key);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-xl border-r border-slate-200/90 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 shadow-sm ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Institutional Brand Header */}
          <div className="p-5 border-b border-slate-200/80 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Historical Chiseled Emblem */}
              <div className="w-10 h-10 border border-amber-300 bg-gradient-to-br from-amber-100 to-amber-200 text-amber-800 rounded-lg flex items-center justify-center shadow-xs flex-shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-amber-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  {/* Classical Kadamba Box-Head & Inscribed Glyph cross */}
                  <rect x="4" y="3" width="16" height="4" rx="0.5" className="fill-amber-300/40" />
                  <path d="M12 7v14" />
                  <path d="M7 14c0-2.5 5-2.5 5-2.5s5 0 5 2.5" />
                  <path d="M6 18c0-3 6-3 6-3s6 0 6 3" />
                </svg>
              </div>

              <div>
                <span className="font-serif font-bold text-sm text-slate-900 tracking-tight block">
                  Kannada Heritage AI
                </span>
                <span className="text-[10px] font-kannada text-amber-800 font-medium block">
                  ಕನ್ನಡ ಶಾಸನ ಅಧ್ಯಯನ ವೇದಿಕೆ
                </span>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden text-slate-400 hover:text-slate-700 p-1 rounded hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Institutional Academic Subtitle */}
          <div className="px-5 py-2 bg-amber-50/60 border-b border-slate-200/60 flex items-center justify-between">
            <span className="text-[10px] font-mono text-amber-800 uppercase tracking-widest font-semibold">
              Epigraphical Workbench
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.key || (activeTab === 'results' && item.key === 'new_analysis');
              return (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs transition-all duration-200 group ${
                    isActive
                      ? 'bg-amber-50 text-amber-900 border-l-3 border-amber-600 font-bold shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 border-l-3 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`transition-colors ${isActive ? 'text-amber-700' : 'text-slate-400 group-hover:text-slate-600'}`}>
                      {item.icon}
                    </span>
                    <span className="font-sans text-left tracking-wide">{item.label}</span>
                  </div>
                  <span className={`text-[10px] font-kannada transition-colors ${isActive ? 'text-amber-700 font-medium' : 'text-slate-400 group-hover:text-slate-600'}`}>
                    {item.kannadaLabel}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Status Indicators */}
        <div className="p-4 border-t border-slate-200/80 bg-slate-50 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-700">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Epigraphy Adapter</span>
            </span>
            <span className="text-amber-800 font-mono text-[10px] bg-amber-100 px-1.5 py-0.5 rounded border border-amber-200 font-semibold">Phase 1-3</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-serif italic text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>FastAPI Contract Ready</span>
          </div>
        </div>
      </aside>
    </>
  );
};
