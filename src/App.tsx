import React, { useState, useEffect } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { NavItemKey } from './components/layout/Sidebar';
import { LandingHomeView } from './components/views/LandingHomeView';
import { OverviewView } from './components/views/OverviewView';
import { NewAnalysisView } from './components/views/NewAnalysisView';
import { AnalysisResultsView } from './components/views/AnalysisResultsView';
import { ArchiveView } from './components/views/ArchiveView';
import { ScriptsLanguagesView } from './components/views/ScriptsLanguagesView';
import { SettingsView } from './components/views/SettingsView';
import { EmptyState } from './components/common/EmptyState';
import { PageSkeletonLoader } from './components/common/PageSkeletonLoader';
import { epigraphyService, serviceRegistry } from './services/epigraphyService';
import { InscriptionRecord, ScriptClassMetadata, SourceLanguageMetadata, ResearchActivityItem } from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavItemKey>('home');
  const [inscriptions, setInscriptions] = useState<InscriptionRecord[]>([]);
  const [scripts, setScripts] = useState<ScriptClassMetadata[]>([]);
  const [languages, setLanguages] = useState<SourceLanguageMetadata[]>([]);
  const [recentActivity, setRecentActivity] = useState<ResearchActivityItem[]>([]);
  const [activeResult, setActiveResult] = useState<InscriptionRecord | null>(null);
  const [selectedDynastyFilter, setSelectedDynastyFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load initial epigraphical data from decoupled service adapter with fallback
  useEffect(() => {
    async function loadCorpusData() {
      setIsLoading(true);
      try {
        const [loadedScripts, loadedLanguages, loadedInscriptions, loadedActivity] = await Promise.all([
          epigraphyService.getScriptClasses(),
          epigraphyService.getSourceLanguages(),
          epigraphyService.getInscriptions(),
          epigraphyService.getRecentActivity(),
        ]);
        setScripts(loadedScripts);
        setLanguages(loadedLanguages);
        setInscriptions(loadedInscriptions);
        setRecentActivity(loadedActivity);
        if (loadedInscriptions.length > 0 && !activeResult) {
          setActiveResult(loadedInscriptions[0]);
        }
      } catch (err) {
        console.warn('Backend unavailable, falling back to mock dataset:', err);
        // Switch to mock demonstrator and retry so the UI never displays empty state
        serviceRegistry.useMock();
        try {
          const [loadedScripts, loadedLanguages, loadedInscriptions, loadedActivity] = await Promise.all([
            epigraphyService.getScriptClasses(),
            epigraphyService.getSourceLanguages(),
            epigraphyService.getInscriptions(),
            epigraphyService.getRecentActivity(),
          ]);
          setScripts(loadedScripts);
          setLanguages(loadedLanguages);
          setInscriptions(loadedInscriptions);
          setRecentActivity(loadedActivity);
          if (loadedInscriptions.length > 0 && !activeResult) {
            setActiveResult(loadedInscriptions[0]);
          }
        } catch (mockErr) {
          console.error('Failed to load even mock epigraphical data:', mockErr);
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadCorpusData();

    // Subscribe to runtime adapter mode changes from SettingsView
    const unsubscribe = serviceRegistry.subscribe(() => {
      loadCorpusData();
    });
    return unsubscribe;
  }, []);

  const handleSelectInscription = (inscription: InscriptionRecord) => {
    setActiveResult(inscription);
    setActiveTab('results');
  };

  const handleAnalysisComplete = (result: InscriptionRecord) => {
    // Prepend newly analyzed record to the active corpus
    setInscriptions((prev) => [result, ...prev.filter((ins) => ins.id !== result.id)]);
    setActiveResult(result);
    setActiveTab('results');
    // Refresh activity feed in background
    epigraphyService.getRecentActivity().then(setRecentActivity).catch(() => {});
  };

  const handleNavigateToArchive = (dynastyFilter?: string) => {
    setSelectedDynastyFilter(dynastyFilter || null);
    setActiveTab('archive');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MainLayout activeTab={activeTab} onNavigate={setActiveTab}>
      {isLoading ? (
        <PageSkeletonLoader />
      ) : (
        <>
          {activeTab === 'home' && (
            <LandingHomeView
              inscriptions={inscriptions}
              onNavigateToAnalysis={() => setActiveTab('new_analysis')}
              onNavigateToArchive={handleNavigateToArchive}
              onNavigateToScripts={() => setActiveTab('scripts_languages')}
              onSelectInscription={handleSelectInscription}
            />
          )}

          {activeTab === 'overview' && (
            <OverviewView
              inscriptions={inscriptions}
              recentActivity={recentActivity}
              onNavigateToAnalysis={() => setActiveTab('new_analysis')}
              onNavigateToArchive={() => handleNavigateToArchive()}
              onNavigateToScripts={() => setActiveTab('scripts_languages')}
              onSelectInscription={handleSelectInscription}
            />
          )}

          {activeTab === 'new_analysis' && (
            <NewAnalysisView
              inscriptions={inscriptions}
              onAnalysisComplete={handleAnalysisComplete}
              onCancel={() => setActiveTab('home')}
            />
          )}

          {activeTab === 'results' && (
            activeResult ? (
              <AnalysisResultsView
                inscription={activeResult}
                onReturnToArchive={() => setActiveTab('archive')}
                onReanalyze={() => setActiveTab('new_analysis')}
              />
            ) : (
              <div className="py-12 max-w-xl mx-auto">
                <EmptyState
                  title="No Inscription Record Selected"
                  description="Please select a catalogued inscription from the permanent archive register, or start a new analysis by uploading an ancient rubbing."
                  actionLabel="Browse Inscription Archive"
                  onAction={() => setActiveTab('archive')}
                  secondaryActionLabel="New Inscription Analysis"
                  onSecondaryAction={() => setActiveTab('new_analysis')}
                />
              </div>
            )
          )}

          {activeTab === 'archive' && (
            <ArchiveView
              inscriptions={inscriptions}
              onSelectInscription={handleSelectInscription}
              onNavigateHome={() => setActiveTab('home')}
              initialDynastyFilter={selectedDynastyFilter}
            />
          )}

          {activeTab === 'scripts_languages' && (
            <ScriptsLanguagesView
              scripts={scripts}
              languages={languages}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView />
          )}
        </>
      )}
    </MainLayout>
  );
};
