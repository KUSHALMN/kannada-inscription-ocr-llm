import React from 'react';
import { InscriptionFilter, ScriptClassId, SourceLanguageId, ReviewStatus } from '../../types';
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
    <div className="border border-slate-200 bg-white p-4 rounded-lg space-y-3 shadow-xs">
      <div className="flex flex-col md:flex-row items-center gap-3">
        {/* Search input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search epigraph by title, ruler, dynasty, accession #, district or village..."
            value={filter.searchQuery || ''}
            onChange={(e) => onFilterChange({ ...filter, searchQuery: e.target.value })}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500/20 transition-all font-serif"
          />
        </div>

        {/* Sorting Dropdown & View Mode Switcher */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5 shadow-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-amber-600" />
            <select
              value={filter.sortBy || 'chronological_asc'}
              onChange={(e) => onFilterChange({ ...filter, sortBy: e.target.value as InscriptionFilter['sortBy'] })}
              className="text-xs bg-transparent text-slate-800 font-serif focus:outline-none cursor-pointer"
            >
              <option value="chronological_asc" className="bg-white text-slate-900">Chronological (Oldest First)</option>
              <option value="chronological_desc" className="bg-white text-slate-900">Chronological (Newest First)</option>
              <option value="title_asc" className="bg-white text-slate-900">Title (A to Z)</option>
              <option value="title_desc" className="bg-white text-slate-900">Title (Z to A)</option>
              <option value="recently_updated" className="bg-white text-slate-900">Recently Ingested / Verified</option>
            </select>
          </div>

          {onViewModeChange && (
            <div className="flex border border-slate-200 rounded-md bg-slate-50 p-0.5">
              <button
                type="button"
                onClick={() => onViewModeChange('grid')}
                className={`p-1.5 rounded transition-all ${viewMode === 'grid' ? 'bg-white text-amber-800 border border-amber-300 shadow-xs font-semibold' : 'text-slate-500 hover:text-slate-900'}`}
                title="Grid Card View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onViewModeChange('table')}
                className={`p-1.5 rounded transition-all ${viewMode === 'table' ? 'bg-white text-amber-800 border border-amber-300 shadow-xs font-semibold' : 'text-slate-500 hover:text-slate-900'}`}
                title="Archival Register Table"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Record counter */}
          <div className="text-xs font-mono text-slate-500 whitespace-nowrap hidden lg:block bg-slate-50 px-2.5 py-1.5 rounded-md border border-slate-200">
            Catalogued: <span className="font-bold text-amber-700">{totalCount}</span>
          </div>
        </div>
      </div>

      {/* Multi-tier Filter Dropdowns */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mr-1">
          <Filter className="w-3.5 h-3.5 text-amber-600" />
          <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">Filters:</span>
        </div>

        {/* Script Class Filter */}
        <select
          value={filter.scriptClass || 'all'}
          onChange={(e) => onFilterChange({ ...filter, scriptClass: e.target.value as ScriptClassId | 'all' })}
          className="text-xs bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white shadow-xs cursor-pointer"
        >
          <option value="all" className="bg-white text-slate-900">All Scripts (10 Historical Eras)</option>
          <option value="ashoka" className="bg-white text-slate-900">1. Ashokan Brahmi</option>
          <option value="satavahana" className="bg-white text-slate-900">2. Satavahana Brahmi</option>
          <option value="kadamba" className="bg-white text-slate-900">3. Kadamba (Proto-Kannada)</option>
          <option value="badami_chalukya" className="bg-white text-slate-900">4. Badami Chalukya</option>
          <option value="rashtrakuta" className="bg-white text-slate-900">5. Rashtrakuta</option>
          <option value="kalyana_chalukya" className="bg-white text-slate-900">6. Kalyana Chalukya</option>
          <option value="hoysala" className="bg-white text-slate-900">7. Hoysala</option>
          <option value="vijayanagara" className="bg-white text-slate-900">8. Vijayanagara</option>
          <option value="mysuru" className="bg-white text-slate-900">9. Mysuru Wodeyar</option>
          <option value="present_kannada" className="bg-white text-slate-900">10. Present Kannada</option>
        </select>

        {/* Source Language Filter */}
        <select
          value={filter.sourceLanguage || 'all'}
          onChange={(e) => onFilterChange({ ...filter, sourceLanguage: e.target.value as SourceLanguageId | 'all' })}
          className="text-xs bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white shadow-xs cursor-pointer"
        >
          <option value="all" className="bg-white text-slate-900">All Source Languages</option>
          <option value="prakrit" className="bg-white text-slate-900">Prakrit (Southern Epigraphical)</option>
          <option value="sanskrit" className="bg-white text-slate-900">Epigraphical Sanskrit</option>
          <option value="purvada_halegannada" className="bg-white text-slate-900">Purvada Halegannada (Early Old Kannada)</option>
          <option value="halegannada" className="bg-white text-slate-900">Classical Halegannada (Old Kannada)</option>
          <option value="nadugannada" className="bg-white text-slate-900">Nadugannada (Middle Kannada)</option>
          <option value="hosagannada" className="bg-white text-slate-900">Hosagannada (Modern Kannada)</option>
        </select>

        {/* Historical Period / Century Filter */}
        <select
          value={filter.historicalPeriod || 'all'}
          onChange={(e) => onFilterChange({ ...filter, historicalPeriod: e.target.value })}
          className="text-xs bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white shadow-xs cursor-pointer"
        >
          <option value="all" className="bg-white text-slate-900">All Epochs / Centuries</option>
          <option value="3rd Century BCE" className="bg-white text-slate-900">3rd Century BCE (Mauryan)</option>
          <option value="5th Century CE" className="bg-white text-slate-900">5th Century CE (Early Kadamba)</option>
          <option value="7th Century CE" className="bg-white text-slate-900">7th Century CE (Badami Chalukya)</option>
          <option value="9th Century CE" className="bg-white text-slate-900">9th Century CE (Rashtrakuta)</option>
          <option value="12th Century CE" className="bg-white text-slate-900">12th Century CE (Hoysala)</option>
          <option value="16th Century CE" className="bg-white text-slate-900">16th Century CE (Vijayanagara)</option>
          <option value="17th Century CE" className="bg-white text-slate-900">17th Century CE (Mysore Wodeyar)</option>
        </select>

        {/* Review Status Filter */}
        <select
          value={filter.reviewStatus || 'all'}
          onChange={(e) => onFilterChange({ ...filter, reviewStatus: e.target.value as ReviewStatus | 'all' })}
          className="text-xs bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white shadow-xs cursor-pointer"
        >
          <option value="all" className="bg-white text-slate-900">All Review Statuses</option>
          <option value="verified" className="bg-white text-slate-900">Peer Verified</option>
          <option value="in_review" className="bg-white text-slate-900">In Scholarly Review</option>
          <option value="flagged" className="bg-white text-slate-900">Flagged For Revision</option>
        </select>

        {/* Reset button */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-amber-700 hover:text-amber-900 font-semibold underline ml-auto py-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </div>
  );
};
