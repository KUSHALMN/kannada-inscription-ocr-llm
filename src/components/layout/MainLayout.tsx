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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex relative overflow-x-hidden selection:bg-amber-100 selection:text-amber-900">
      {/* Subtle light ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/3 w-[600px] h-[350px] bg-amber-400/[0.04] blur-[120px] rounded-full" />
        <div className="absolute top-1/2 right-10 w-[500px] h-[350px] bg-blue-400/[0.03] blur-[120px] rounded-full" />
      </div>

      {/* Luminous Light Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onNavigate={onNavigate}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64 relative z-10">
        {/* Floating Light Topbar */}
        <header className="sticky top-0 z-30 px-4 sm:px-8 py-3 flex items-center justify-between border-b border-slate-200/90 backdrop-blur-xl bg-white/90 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-md border border-slate-200 bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              title="Open Navigation"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2.5 text-xs text-slate-600">
              <span className="font-serif tracking-wide text-slate-800 hidden sm:inline flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Epigraphical Paleography & AI Reconstruction Lab
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="font-mono text-[11px] text-slate-500">
                Karnataka Epigraphia Corpus
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-mono font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span>OCR Pipeline Ready</span>
            </div>

            <Badge variant="warning" size="sm">
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-amber-800">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
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
