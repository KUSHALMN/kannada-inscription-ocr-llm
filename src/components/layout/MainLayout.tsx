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
      {/* Top Heritage Navbar matching new design */}
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
