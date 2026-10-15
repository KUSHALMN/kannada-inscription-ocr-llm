import React, { useState, useEffect } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { NavItemKey } from './components/layout/Sidebar';
import { OverviewView } from './components/views/OverviewView';
import { NewAnalysisView } from './components/views/NewAnalysisView';
import { ArchiveView } from './components/views/ArchiveView';
import { ScriptsLanguagesView } from './components/views/ScriptsLanguagesView';
import { HistoricalRulesView } from './components/views/HistoricalRulesView';
import { SettingsView } from './components/views/SettingsView';
import { epigraphyService } from './services/epigraphyService';
import { InscriptionRecord, ScriptClassMetadata, SourceLanguageMetadata, ResearchActivityItem } from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavItemKey>('overview');
  const [inscriptions, setInscriptions] = useState<InscriptionRecord[]>([]);
  const [scripts, setScripts] = useState<ScriptClassMetadata[]>([]);
  const [languages, setLanguages] = useState<SourceLanguageMetadata[]>([]);
  const [recentActivity, setRecentActivity] = useState<ResearchActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load initial epigraphical data from decoupled service adapter
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
      } catch (err) {
        console.error('Failed to load epigraphical data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadCorpusData();
  }, []);

  const handleSelectInscription = (_inscription: InscriptionRecord) => {
    setActiveTab('new_analysis');
  };

  return (
    <MainLayout activeTab={activeTab} onNavigate={setActiveTab}>
      {isLoading ? (
        <div className="py-28 text-center space-y-3">
          <div className="inline-block w-7 h-7 border-2 border-stone-400 border-t-stone-900 rounded-full animate-spin"></div>
          <p className="text-xs font-serif text-stone-600">Accessing Inscription Archive Registers...</p>
        </div>
      ) : (
        <>
          {activeTab === 'overview' && (
            <OverviewView
              inscriptions={inscriptions}
              recentActivity={recentActivity}
              onNavigateToAnalysis={() => setActiveTab('new_analysis')}
              onNavigateToArchive={() => setActiveTab('archive')}
              onNavigateToScripts={() => setActiveTab('scripts_languages')}
              onSelectInscription={handleSelectInscription}
            />
          )}

          {activeTab === 'new_analysis' && (
            <NewAnalysisView
              inscriptions={inscriptions}
              onBackToOverview={() => setActiveTab('overview')}
            />
          )}

          {activeTab === 'archive' && (
            <ArchiveView
              inscriptions={inscriptions}
              onSelectInscription={handleSelectInscription}
            />
          )}

          {activeTab === 'scripts_languages' && (
            <ScriptsLanguagesView
              scripts={scripts}
              languages={languages}
            />
          )}

          {activeTab === 'historical_rules' && (
            <HistoricalRulesView />
          )}

          {activeTab === 'settings' && (
            <SettingsView />
          )}
        </>
      )}
    </MainLayout>
  );
};
