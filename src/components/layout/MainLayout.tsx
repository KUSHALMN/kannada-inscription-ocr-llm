import React from 'react';
import { NavItemKey } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { AppFooter } from './AppFooter';

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
  const isHomePage = activeTab === 'home';

  return (
    <div className="min-h-screen bg-[#FBF8F2] text-[#241711] flex flex-col relative overflow-x-hidden selection:bg-[#F2D7B3] selection:text-[#5B230C]">
      {/* Ambient luminous glow orbs for liquid glass optical refraction */}
      <div className="fixed top-0 left-1/4 w-[450px] h-80 bg-amber-400/14 rounded-full blur-3xl pointer-events-none -z-10 -translate-y-1/2" />
      <div className="fixed top-2 right-1/4 w-[520px] h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed top-16 left-1/2 -translate-x-1/2 w-[720px] h-64 bg-amber-200/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Heritage Navbar with liquid glass effect */}
      <TopNavbar
        activeTab={activeTab}
        onNavigate={onNavigate}
        onOpenSearch={() => onNavigate('archive')}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full">
        {isHomePage ? (
          // Full-width edge-to-edge for new Landing Page design
          children
        ) : (
          // Contained layout for analytical workflows (Archive, Results, Analysis, Rules)
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 animate-fadeIn">
            {children}
          </div>
        )}
      </main>

      {/* Institutional Academic Footer for interior pages if not home */}
      {!isHomePage && <AppFooter />}
    </div>
  );
};
