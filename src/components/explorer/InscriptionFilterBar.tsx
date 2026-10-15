import React from 'react';
import { InscriptionFilter, ScriptClassId, SourceLanguageId, SubstrateMaterial, ReviewStatus } from '../../types';
import { Search, Filter, RotateCcw, ArrowUpDown, LayoutGrid, List } from 'lucide-react';

interface InscriptionFilterBarProps {
  filter: InscriptionFilter;
  onFilterChange: (newFilter: InscriptionFilter) => void;
  onReset: () => void;
  totalCount: number;
  viewMode?: 'grid' | 'table';
  onViewModeChange?: (mode: 'grid' | 'table') => void;
}

export const InscriptionFilterBar: React.FC<InscriptionFilterBarProps> = ({
  filter,
  onFilterChange,
  onReset,
  totalCount,
  viewMode = 'grid',
  onViewModeChange,
}) => {
  const hasActiveFilters = Boolean(
    (filter.scriptClass && filter.scriptClass !== 'all') ||
    (filter.sourceLanguage && filter.sourceLanguage !== 'all') ||
    (filter.substrate && filter.substrate !== 'all') ||
    (filter.reviewStatus && filter.reviewStatus !== 'all') ||
    (filter.historicalPeriod && filter.historicalPeriod !== 'all') ||
    (filter.searchQuery && filter.searchQuery.trim() !== '')
  );

  return (
    <div className="border border-heritage-border bg-stone-100/70 p-4 rounded-xs space-y-3 shadow-subtle">
      <div className="flex flex-col md:flex-row items-center gap-3">
        {/* Search input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search epigraph by title, ruler, dynasty, accession #, district or village..."
            value={filter.searchQuery || ''}
            onChange={(e) => onFilterChange({ ...filter, searchQuery: e.target.value })}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-parchment-50 border border-stone-300 rounded-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-500 shadow-subtle font-serif"
          />
        </div>

        {/* Sorting Dropdown & View Mode Switcher */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-1.5 bg-parchment-50 border border-stone-300 rounded-xs px-2 py-1 shadow-subtle">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
            <select
              value={filter.sortBy || 'chronological_asc'}
              onChange={(e) => onFilterChange({ ...filter, sortBy: e.target.value as InscriptionFilter['sortBy'] })}
              className="text-xs bg-transparent text-stone-700 font-serif focus:outline-none cursor-pointer"
            >
              <option value="chronological_asc">Chronological (Oldest First)</option>
              <option value="chronological_desc">Chronological (Newest First)</option>
              <option value="title_asc">Title (A to Z)</option>
              <option value="title_desc">Title (Z to A)</option>
              <option value="recently_updated">Recently Ingested / Verified</option>
            </select>
          </div>

          {onViewModeChange && (
            <div className="flex border border-stone-300 rounded-xs bg-stone-200/60 p-0.5">
              <button
                type="button"
                onClick={() => onViewModeChange('grid')}
                className={`p-1 rounded-xs transition-colors ${viewMode === 'grid' ? 'bg-parchment-50 text-stone-900 shadow-subtle' : 'text-stone-500 hover:text-stone-800'}`}
                title="Grid Card View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onViewModeChange('table')}
                className={`p-1 rounded-xs transition-colors ${viewMode === 'table' ? 'bg-parchment-50 text-stone-900 shadow-subtle' : 'text-stone-500 hover:text-stone-800'}`}
                title="Archival Register Table"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Record counter */}
          <div className="text-xs font-mono text-stone-500 whitespace-nowrap hidden lg:block">
            Found: <span className="font-bold text-stone-900">{totalCount}</span>
          </div>
        </div>
      </div>

      {/* Multi-tier Filter Dropdowns */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-200/80">
        <div className="flex items-center gap-1.5 text-xs text-stone-500 mr-1">
          <Filter className="w-3.5 h-3.5" />
          <span className="font-mono text-[10px] uppercase tracking-wider">Filters:</span>
        </div>

        {/* Script Class Filter */}
        <select
          value={filter.scriptClass || 'all'}
          onChange={(e) => onFilterChange({ ...filter, scriptClass: e.target.value as ScriptClassId | 'all' })}
          className="text-xs bg-parchment-50 border border-stone-300 rounded-xs px-2.5 py-1 text-stone-700 focus:outline-none focus:border-stone-500 shadow-subtle"
        >
          <option value="all">All Scripts (10 Historical Eras)</option>
          <option value="ashoka">1. Ashokan Brahmi</option>
          <option value="satavahana">2. Satavahana Brahmi</option>
          <option value="kadamba">3. Kadamba (Proto-Kannada)</option>
          <option value="badami_chalukya">4. Badami Chalukya</option>
          <option value="rashtrakuta">5. Rashtrakuta</option>
          <option value="kalyana_chalukya">6. Kalyana Chalukya</option>
          <option value="hoysala">7. Hoysala</option>
          <option value="vijayanagara">8. Vijayanagara</option>
          <option value="mysuru">9. Mysuru Wodeyar</option>
          <option value="present_kannada">10. Present Kannada</option>
        </select>

        {/* Source Language Filter */}
        <select
          value={filter.sourceLanguage || 'all'}
          onChange={(e) => onFilterChange({ ...filter, sourceLanguage: e.target.value as SourceLanguageId | 'all' })}
          className="text-xs bg-parchment-50 border border-stone-300 rounded-xs px-2.5 py-1 text-stone-700 focus:outline-none focus:border-stone-500 shadow-subtle"
        >
          <option value="all">All Source Languages</option>
          <option value="prakrit">Prakrit (Southern Epigraphical)</option>
          <option value="sanskrit">Epigraphical Sanskrit</option>
          <option value="purvada_halegannada">Purvada Halegannada (Early Old Kannada)</option>
          <option value="halegannada">Classical Halegannada (Old Kannada)</option>
          <option value="nadugannada">Nadugannada (Middle Kannada)</option>
          <option value="hosagannada">Hosagannada (Modern Kannada)</option>
        </select>

        {/* Historical Period / Century Filter */}
        <select
          value={filter.historicalPeriod || 'all'}
          onChange={(e) => onFilterChange({ ...filter, historicalPeriod: e.target.value })}
          className="text-xs bg-parchment-50 border border-stone-300 rounded-xs px-2.5 py-1 text-stone-700 focus:outline-none focus:border-stone-500 shadow-subtle"
        >
          <option value="all">All Epochs / Centuries</option>
          <option value="3rd Century BCE">3rd Century BCE (Mauryan)</option>
          <option value="5th Century CE">5th Century CE (Early Kadamba)</option>
          <option value="7th Century CE">7th Century CE (Badami Chalukya)</option>
          <option value="9th Century CE">9th Century CE (Rashtrakuta)</option>
          <option value="12th Century CE">12th Century CE (Hoysala)</option>
          <option value="16th Century CE">16th Century CE (Vijayanagara)</option>
          <option value="17th Century CE">17th Century CE (Mysore Wodeyar)</option>
        </select>

        {/* Review Status Filter */}
        <select
          value={filter.reviewStatus || 'all'}
          onChange={(e) => onFilterChange({ ...filter, reviewStatus: e.target.value as ReviewStatus | 'all' })}
          className="text-xs bg-parchment-50 border border-stone-300 rounded-xs px-2.5 py-1 text-stone-700 focus:outline-none focus:border-stone-500 shadow-subtle"
        >
          <option value="all">All Review Statuses</option>
          <option value="verified">Verified by Epigraphist</option>
          <option value="in_review">In Scholarly Peer Review</option>
          <option value="pending_verification">Pending Field Verification</option>
          <option value="archived">Archival Reference Record</option>
        </select>

        {/* Substrate Material Filter */}
        <select
          value={filter.substrate || 'all'}
          onChange={(e) => onFilterChange({ ...filter, substrate: e.target.value as SubstrateMaterial | 'all' })}
          className="text-xs bg-parchment-50 border border-stone-300 rounded-xs px-2.5 py-1 text-stone-700 focus:outline-none focus:border-stone-500 shadow-subtle"
        >
          <option value="all">All Substrate Mediums</option>
          <option value="granite">Granite Boulder / Stele</option>
          <option value="sandstone">Red / Sandstone Cliff</option>
          <option value="chlorite_schist">Chloritic Schist (Soapstone)</option>
          <option value="limestone">Limestone Slab</option>
          <option value="copper_plate">Copper Plate Charter (ತಾಮ್ರಶಾಸನ)</option>
        </select>

        {/* Clear / Reset Filter Button */}
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-[11px] font-mono text-stone-600 hover:text-stone-900 px-2 py-1 rounded-xs hover:bg-stone-200/70 border border-stone-300 transition-colors ml-auto shadow-subtle"
          >
            <RotateCcw className="w-3 h-3 text-stone-500" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>
    </div>
  );
};
