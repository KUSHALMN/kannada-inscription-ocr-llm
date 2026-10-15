import React from 'react';
import { AppHeader } from './AppHeader';
import { AppFooter } from './AppFooter';

interface MainLayoutProps {
  children: React.ReactNode;
  currentTab: 'corpus' | 'timeline' | 'inspector';
  onTabChange: (tab: 'corpus' | 'timeline' | 'inspector') => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  currentTab,
  onTabChange,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-parchment-50 text-stone-900">
      <AppHeader currentTab={currentTab} onTabChange={onTabChange} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8">
        {children}
      </main>
      <AppFooter />
    </div>
  );
};
