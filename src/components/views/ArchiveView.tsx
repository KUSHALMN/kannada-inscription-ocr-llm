import React, { useState, useMemo } from 'react';
import { InscriptionRecord, InscriptionFilter } from '../../types';
import { PageHeader } from '../layout/PageHeader';
import { InscriptionCard } from '../explorer/InscriptionCard';
import { InscriptionFilterBar } from '../explorer/InscriptionFilterBar';
import { EmptyState } from '../common/EmptyState';
import { Badge } from '../common/Badge';
import { Calendar, MapPin, Landmark, ArrowRight, ShieldCheck, Database } from 'lucide-react';

interface ArchiveViewProps {
  inscriptions: InscriptionRecord[];
  onSelectInscription: (inscription: InscriptionRecord) => void;
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({
  inscriptions,
  onSelectInscription,
}) => {
  const [filter, setFilter] = useState<InscriptionFilter>({
    scriptClass: 'all',
    sourceLanguage: 'all',
    substrate: 'all',
    reviewStatus: 'all',
    historicalPeriod: 'all',
    searchQuery: '',
    sortBy: 'chronological_asc',
  });

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filteredInscriptions = useMemo(() => {
    let result = inscriptions.filter((ins) => {
      if (filter.scriptClass && filter.scriptClass !== 'all' && ins.scriptClass !== filter.scriptClass) {
        return false;
      }
      if (filter.sourceLanguage && filter.sourceLanguage !== 'all' && ins.sourceLanguage !== filter.sourceLanguage) {
        return false;
      }
      if (filter.substrate && filter.substrate !== 'all' && ins.substrate !== filter.substrate) {
        return false;
      }
      if (filter.reviewStatus && filter.reviewStatus !== 'all' && ins.reviewStatus !== filter.reviewStatus) {
        return false;
      }
      if (filter.historicalPeriod && filter.historicalPeriod !== 'all') {
        const hp = filter.historicalPeriod.toLowerCase();
        if (
          !ins.historicalContext.century.toLowerCase().includes(hp) &&
          !ins.historicalContext.approximateDate.toLowerCase().includes(hp)
        ) {
          return false;
        }
      }
      if (filter.searchQuery && filter.searchQuery.trim() !== '') {
        const q = filter.searchQuery.toLowerCase().trim();
        return (
          ins.title.toLowerCase().includes(q) ||
          ins.kannadaTitle.toLowerCase().includes(q) ||
          ins.accessionNumber.toLowerCase().includes(q) ||
          ins.historicalContext.dynasty.toLowerCase().includes(q) ||
          ins.historicalContext.ruler.toLowerCase().includes(q) ||
          ins.historicalContext.findSpot.district.toLowerCase().includes(q) ||
          ins.historicalContext.findSpot.village.toLowerCase().includes(q)
        );
      }
      return true;
    });

    // Sorting
    if (filter.sortBy === 'title_asc') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filter.sortBy === 'title_desc') {
      result.sort((a, b) => b.title.localeCompare(a.title));
    } else if (filter.sortBy === 'recently_updated') {
      result.sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));
    } else if (filter.sortBy === 'chronological_asc') {
      result.sort((a, b) => a.id.localeCompare(b.id));
    } else if (filter.sortBy === 'chronological_desc') {
      result.sort((a, b) => b.id.localeCompare(a.id));
    }

    return result;
  }, [inscriptions, filter]);

  const handleResetFilter = () => {
    setFilter({
      scriptClass: 'all',
      sourceLanguage: 'all',
      substrate: 'all',
      reviewStatus: 'all',
      historicalPeriod: 'all',
      searchQuery: '',
      sortBy: 'chronological_asc',
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inscription Archive Register"
        subtitle="Search, filter, and inspect verified historical epigraphs catalogued from Karnataka archaeological steles and copper plates."
        kannadaSubtitle="ಕರ್ನಾಟಕದ ಪ್ರಾಚೀನ ಶಿಲಾಶಾಸನಗಳು ಮತ್ತು ತಾಮ್ರಶಾಸನಗಳ ಅಧಿಕೃತ ಭಂಡಾರ"
        categoryTag="Permanent Collections"
      />

      {/* Institutional Metadata & Scope Banner */}
      <div className="bg-gradient-to-r from-obsidian-950 via-stone-900 to-obsidian-950 border border-amber-500/30 p-3.5 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-serif text-stone-300 shadow-glow-amber-sm backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>
            Institutional epigraphical corpus containing <strong className="text-amber-300 font-mono">{inscriptions.length}</strong> catalogued inscriptions spanning 3rd C. BCE to 19th C. CE.
          </span>
        </div>
        <div className="font-mono text-[11px] text-stone-400 flex items-center gap-1.5 whitespace-nowrap bg-obsidian-950/80 px-2.5 py-1 rounded border border-stone-800">
          <Database className="w-3 h-3 text-amber-500/70" />
          ASI & State Archaeology Register
        </div>
      </div>

      <InscriptionFilterBar
        filter={filter}
        onFilterChange={setFilter}
        onReset={handleResetFilter}
        totalCount={filteredInscriptions.length}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {filteredInscriptions.length === 0 ? (
        <EmptyState
          title="No Inscriptional Records Found"
          description="No archived epigraphs match your specific filter criteria. Try resetting the filters or modifying your search term."
          actionLabel="Reset all filters"
          onAction={handleResetFilter}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredInscriptions.map((ins) => (
            <InscriptionCard
              key={ins.id}
              inscription={ins}
              onSelect={onSelectInscription}
            />
          ))}
        </div>
      ) : (
        /* Archival Table View */
        <div className="border border-stone-800/80 rounded-sm overflow-hidden shadow-obsidian-card bg-obsidian-900/90 backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-obsidian-950 border-b border-stone-800 text-stone-400 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-3.5">Accession #</th>
                  <th className="py-3 px-3.5">Title & Epigraph Name</th>
                  <th className="py-3 px-3.5">Script Era</th>
                  <th className="py-3 px-3.5">Language</th>
                  <th className="py-3 px-3.5">Period & Dynasty</th>
                  <th className="py-3 px-3.5">Find-Spot</th>
                  <th className="py-3 px-3.5">Status</th>
                  <th className="py-3 px-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60">
                {filteredInscriptions.map((ins) => (
                  <tr
                    key={ins.id}
                    onClick={() => onSelectInscription(ins)}
                    className="hover:bg-obsidian-800/60 transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-3.5 font-mono text-stone-400 whitespace-nowrap">
                      {ins.accessionNumber}
                    </td>
                    <td className="py-3 px-3.5">
                      <div className="font-serif font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                        {ins.title}
                      </div>
                      <div className="font-kannada text-xs text-amber-400/90 mt-0.5">
                        {ins.kannadaTitle}
                      </div>
                    </td>
                    <td className="py-3 px-3.5 whitespace-nowrap">
                      <Badge variant="script" size="sm">{ins.scriptClass.replace('_', ' ')}</Badge>
                    </td>
                    <td className="py-3 px-3.5 whitespace-nowrap">
                      <Badge variant="language" size="sm">{ins.sourceLanguage.replace('_', ' ')}</Badge>
                    </td>
                    <td className="py-3 px-3.5">
                      <div className="flex items-center gap-1 font-serif text-stone-200 text-xs">
                        <Calendar className="w-3 h-3 text-amber-500/70 flex-shrink-0" />
                        <span>{ins.historicalContext.approximateDate}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-stone-400 mt-0.5">
                        <Landmark className="w-3 h-3 text-stone-500 flex-shrink-0" />
                        <span>{ins.historicalContext.dynasty}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3.5">
                      <div className="flex items-center gap-1 text-stone-300 font-serif">
                        <MapPin className="w-3 h-3 text-stone-500 flex-shrink-0" />
                        <span>{ins.historicalContext.findSpot.village}, {ins.historicalContext.findSpot.district}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3.5 whitespace-nowrap">
                      <Badge variant="status" size="sm">
                        {ins.reviewStatus.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="py-3 px-3.5 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectInscription(ins);
                        }}
                        className="inline-flex items-center gap-1 font-mono text-[11px] text-stone-300 hover:text-amber-300 border border-stone-700 hover:border-amber-400 px-2.5 py-1 rounded-sm bg-obsidian-950 shadow-subtle group-hover:bg-obsidian-900 transition-all"
                      >
                        <span>Inspect</span>
                        <ArrowRight className="w-3 h-3 text-stone-500 group-hover:translate-x-0.5 group-hover:text-amber-400 transition-transform" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
