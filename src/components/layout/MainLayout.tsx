import React, { useState } from 'react';
import { Sidebar, NavItemKey } from './Sidebar';
import { AppFooter } from './AppFooter';
import { Menu, ShieldCheck, Sparkles } from 'lucide-react';
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
    <div className="min-h-screen bg-[#0B0F17] text-stone-100 flex relative overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/3 w-[600px] h-[350px] bg-amber-500/[0.04] blur-[140px] rounded-full" />
        <div className="absolute top-1/2 right-10 w-[500px] h-[350px] bg-cyan-500/[0.03] blur-[140px] rounded-full" />
      </div>

      {/* Modern Obsidian Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onNavigate={onNavigate}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64 relative z-10">
        {/* Floating Glass Topbar */}
        <header className="sticky top-0 z-30 px-4 sm:px-8 py-3 flex items-center justify-between border-b border-white/[0.08] backdrop-blur-xl bg-[#0B0F17]/85 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-md border border-white/10 bg-white/5 text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Open Navigation"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2.5 text-xs text-stone-300">
              <span className="font-serif tracking-wide text-stone-200 hidden sm:inline flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Epigraphical Paleography & AI Reconstruction Lab
              </span>
              <span className="text-white/20 hidden sm:inline">•</span>
              <span className="font-mono text-[11px] text-stone-400">
                Karnataka Epigraphia Corpus
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>OCR Pipeline Ready</span>
            </div>

            <Badge variant="warning" size="sm">
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-amber-300">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                Phase 1–3 Archive
              </span>
            </Badge>
          </div>
        </header>

        {/* Content View Container */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 animate-fadeIn">
          {children}
        </main>

        {/* Institutional Academic Footer */}
        <AppFooter />
      </div>
    </div>
  );
};
