import React, { useState, useEffect } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { InscriptionCard } from './components/explorer/InscriptionCard';
import { InscriptionFilterBar } from './components/explorer/InscriptionFilterBar';
import { ScriptTimeline } from './components/explorer/ScriptTimeline';
import { WorkbenchView } from './components/inspector/WorkbenchView';
import { epigraphyService } from './services/epigraphyService';
import { InscriptionRecord, ScriptClassMetadata, InscriptionFilter } from './types';
import { Compass, Layers, AlertCircle } from 'lucide-react';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'corpus' | 'timeline' | 'inspector'>('corpus');
  const [inscriptions, setInscriptions] = useState<InscriptionRecord[]>([]);
  const [scripts, setScripts] = useState<ScriptClassMetadata[]>([]);
  const [activeInscription, setActiveInscription] = useState<InscriptionRecord | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [filter, setFilter] = useState<InscriptionFilter>({
    scriptClass: 'all',
    sourceLanguage: 'all',
    substrate: 'all',
    searchQuery: '',
  });

  // Initial data loading via decoupled service adapter
  useEffect(() => {
    async function loadInitialData() {
      setIsLoading(true);
      try {
        const [loadedScripts, loadedInscriptions] = await Promise.all([
          epigraphyService.getScriptClasses(),
          epigraphyService.getInscriptions(filter)
        ]);
        setScripts(loadedScripts);
        setInscriptions(loadedInscriptions);
        if (loadedInscriptions.length > 0 && !activeInscription) {
          setActiveInscription(loadedInscriptions[0]);
        }
      } catch (err) {
        console.error('Failed to load epigraphical data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadInitialData();
  }, []);

  // Filter effect
  useEffect(() => {
    async function applyFilter() {
      const filtered = await epigraphyService.getInscriptions(filter);
      setInscriptions(filtered);
    }
    applyFilter();
  }, [filter]);

  const handleSelectInscription = (inscription: InscriptionRecord) => {
    setActiveInscription(inscription);
    setCurrentTab('inspector');
  };

  const handleResetFilter = () => {
    setFilter({
      scriptClass: 'all',
      sourceLanguage: 'all',
      substrate: 'all',
      searchQuery: '',
    });
  };

  return (
    <MainLayout currentTab={currentTab} onTabChange={setCurrentTab}>
      {isLoading ? (
        <div className="py-24 text-center space-y-3">
          <div className="inline-block w-8 h-8 border-2 border-stone-400 border-t-stone-900 rounded-full animate-spin"></div>
          <p className="text-xs font-serif text-stone-600">Accessing Inscription Archive Registers...</p>
        </div>
      ) : (
        <div>
          {/* TAB 1: EPIGRAPH CORPUS CATALOG */}
          {currentTab === 'corpus' && (
            <div className="space-y-6">
              {/* Institutional Overview Header */}
              <div className="border-b border-heritage-border pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 block mb-1">
                    Archival Inscription Register
                  </span>
                  <h2 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">
                    Karnataka Historical Inscription Corpus
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 font-serif mt-1 max-w-2xl">
                    Verified archeological steles, rock edicts, and copper-plate grants classified across 
                    ten evolutionary script eras, detailing script morphology, source languages, transcriptions, 
                    and modern Kannada translations.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentTab('timeline')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xs transition-colors"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>View 10 Script Eras</span>
                  </button>
                  {activeInscription && (
                    <button
                      onClick={() => setCurrentTab('inspector')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-900 bg-parchment-200 hover:bg-parchment-300 border border-stone-400 rounded-xs transition-colors font-medium shadow-subtle"
                    >
                      <Compass className="w-3.5 h-3.5 text-stone-700" />
                      <span>Open Workbench</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Filter Bar */}
              <InscriptionFilterBar
                filter={filter}
                onFilterChange={setFilter}
                onReset={handleResetFilter}
                totalCount={inscriptions.length}
              />

              {/* Inscriptions Grid */}
              {inscriptions.length === 0 ? (
                <div className="border border-stone-200 bg-stone-50/50 p-12 text-center rounded-xs space-y-2">
                  <AlertCircle className="w-6 h-6 text-stone-400 mx-auto" />
                  <p className="text-sm font-serif text-stone-700">No inscriptional records match the specified filters.</p>
                  <button
                    onClick={handleResetFilter}
                    className="text-xs font-mono text-stone-600 underline hover:text-stone-900"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {inscriptions.map((inscription) => (
                    <InscriptionCard
                      key={inscription.id}
                      inscription={inscription}
                      onSelect={handleSelectInscription}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PALEOGRAPHIC SCRIPT TIMELINE */}
          {currentTab === 'timeline' && (
            <ScriptTimeline
              scripts={scripts}
              onSelectScript={(scriptId) => {
                setFilter({ ...filter, scriptClass: scriptId as any });
              }}
            />
          )}

          {/* TAB 3: PALEOGRAPHIC WORKBENCH & COMPARATOR */}
          {currentTab === 'inspector' && activeInscription && (
            <WorkbenchView
              inscriptions={inscriptions}
              activeInscription={activeInscription}
              onSelectInscription={setActiveInscription}
              onBackToCorpus={() => setCurrentTab('corpus')}
            />
          )}
        </div>
      )}
    </MainLayout>
  );
};
