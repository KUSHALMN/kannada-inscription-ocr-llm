import React from 'react';
import {
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
          className="fixed inset-0 bg-stone-900/40 z-40 lg:hidden backdrop-blur-[1px]"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-parchment-100 border-r border-heritage-border flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Institutional Brand Header */}
          <div className="p-5 border-b border-heritage-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Historical Chiseled Emblem */}
              <div className="w-9 h-9 border border-heritage-ochre/50 bg-parchment-200 rounded-xs flex items-center justify-center shadow-subtle flex-shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-stone-800"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                >
                  {/* Classical Kadamba Box-Head & Inscribed Glyph cross */}
                  <rect x="4" y="3" width="16" height="4" rx="0.5" className="fill-heritage-ochre/20" />
                  <path d="M12 7v14" />
                  <path d="M7 14c0-2.5 5-2.5 5-2.5s5 0 5 2.5" />
                  <path d="M6 18c0-3 6-3 6-3s6 0 6 3" />
                </svg>
              </div>

              <div>
                <span className="font-serif font-bold text-sm text-stone-900 tracking-tight block">
                  Kannada Heritage AI
                </span>
                <span className="text-[10px] font-kannada text-stone-600 block">
                  ಕನ್ನಡ ಶಾಸನ ಅಧ್ಯಯನ ವೇದಿಕೆ
                </span>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Institutional Academic Subtitle */}
          <div className="px-5 py-2.5 bg-stone-100/60 border-b border-stone-200/60 text-[10px] font-mono text-stone-500 uppercase tracking-widest">
            Archaeological Workbench
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.key || (activeTab === 'results' && item.key === 'new_analysis');
              return (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xs text-xs transition-colors ${
                    isActive
                      ? 'bg-parchment-50 text-stone-900 border border-stone-300 font-semibold shadow-subtle'
                      : 'text-stone-600 hover:bg-stone-200/50 hover:text-stone-900 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-heritage-ochre' : 'text-stone-400'}>
                      {item.icon}
                    </span>
                    <span className="font-sans text-left">{item.label}</span>
                  </div>
                  <span className="text-[10px] font-kannada text-stone-400">
                    {item.kannadaLabel}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Status Indicators */}
        <div className="p-4 border-t border-heritage-border bg-stone-100/40 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-stone-600">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-stone-600"></span>
              Local Demo Adapter
            </span>
            <span className="text-stone-400 font-mono text-[10px]">Phase 1-3</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-serif italic text-stone-500">
            <ShieldCheck className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
            <span>FastAPI Contract Ready</span>
          </div>
        </div>
      </aside>
    </>
  );
};
