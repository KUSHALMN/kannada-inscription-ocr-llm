import React, { useState } from 'react';
import { Sidebar, NavItemKey } from './Sidebar';
import { AppFooter } from './AppFooter';
import { Menu, ShieldAlert } from 'lucide-react';
import { Badge } from '../common/Badge';

interface MainLayoutProps {
  children: React.ReactNode;
  activeTab: NavItemKey;
  onNavigate: (tab: NavItemKey) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  activeTab,
  onNavigate,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-parchment-50 text-stone-900 flex">
      {/* Narrow Elegant Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onNavigate={onNavigate}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        {/* Mobile Header Bar & Desktop Top Banner */}
        <header className="border-b border-heritage-border bg-parchment-100/70 sticky top-0 z-30 px-4 sm:px-8 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-1.5 rounded-xs border border-stone-300 text-stone-600 hover:text-stone-900"
              title="Open Navigation"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-xs text-stone-600">
              <span className="font-serif italic text-stone-700 hidden sm:inline">
                Epigraphical Paleography & Linguistic Reconstruction Lab
              </span>
              <span className="text-stone-300 hidden sm:inline">|</span>
              <span className="font-mono text-[11px] text-stone-500">
                Karnataka Inscriptional Corpus
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="warning" size="sm">
              <span className="flex items-center gap-1 font-mono text-[10px]">
                <ShieldAlert className="w-3 h-3 text-amber-700" />
                Phase 1–3 Archive
              </span>
            </Badge>
          </div>
        </header>

        {/* Content View Container */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8">
          {children}
        </main>

        {/* Institutional Academic Footer */}
        <AppFooter />
      </div>
    </div>
  );
};
