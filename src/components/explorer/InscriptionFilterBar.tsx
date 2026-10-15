import React from 'react';
import { InscriptionFilter, ScriptClassId, SourceLanguageId, SubstrateMaterial } from '../../types';
import { Search, Filter, RotateCcw } from 'lucide-react';

interface InscriptionFilterBarProps {
  filter: InscriptionFilter;
  onFilterChange: (newFilter: InscriptionFilter) => void;
  onReset: () => void;
  totalCount: number;
}

export const InscriptionFilterBar: React.FC<InscriptionFilterBarProps> = ({
  filter,
  onFilterChange,
  onReset,
  totalCount,
}) => {
  return (
    <div className="border border-heritage-border bg-stone-100/70 p-4 rounded-xs space-y-3">
      <div className="flex flex-col md:flex-row items-center gap-3">
        {/* Search input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, ruler, dynasty, accession # or find-spot..."
            value={filter.searchQuery || ''}
            onChange={(e) => onFilterChange({ ...filter, searchQuery: e.target.value })}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-parchment-50 border border-stone-300 rounded-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-500 shadow-subtle"
          />
        </div>

        {/* Total results count */}
        <div className="text-xs font-mono text-stone-500 whitespace-nowrap self-end md:self-center">
          Showing <span className="font-bold text-stone-800">{totalCount}</span> catalogued records
        </div>
      </div>

      {/* Filter Select Dropdowns */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-200/80">
        <div className="flex items-center gap-1.5 text-xs text-stone-500 mr-1">
          <Filter className="w-3.5 h-3.5" />
          <span className="font-mono text-[11px] uppercase tracking-wider">Filters:</span>
        </div>

        {/* Script Class Filter */}
        <select
          value={filter.scriptClass || 'all'}
          onChange={(e) => onFilterChange({ ...filter, scriptClass: e.target.value as ScriptClassId | 'all' })}
          className="text-xs bg-parchment-50 border border-stone-300 rounded-xs px-2.5 py-1 text-stone-700 focus:outline-none focus:border-stone-500"
        >
          <option value="all">All Scripts (10 Eras)</option>
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
          className="text-xs bg-parchment-50 border border-stone-300 rounded-xs px-2.5 py-1 text-stone-700 focus:outline-none focus:border-stone-500"
        >
          <option value="all">All Source Languages</option>
          <option value="prakrit">Prakrit</option>
          <option value="sanskrit">Sanskrit</option>
          <option value="purvada_halegannada">Purvada Halegannada (Early Old Kannada)</option>
          <option value="halegannada">Classical Halegannada (Old Kannada)</option>
          <option value="nadugannada">Nadugannada (Middle Kannada)</option>
          <option value="hosagannada">Hosagannada (Modern Kannada)</option>
        </select>

        {/* Substrate Filter */}
        <select
          value={filter.substrate || 'all'}
          onChange={(e) => onFilterChange({ ...filter, substrate: e.target.value as SubstrateMaterial | 'all' })}
          className="text-xs bg-parchment-50 border border-stone-300 rounded-xs px-2.5 py-1 text-stone-700 focus:outline-none focus:border-stone-500"
        >
          <option value="all">All Mediums</option>
          <option value="granite">Granite</option>
          <option value="sandstone">Sandstone</option>
          <option value="chlorite_schist">Chloritic Schist (Soapstone)</option>
          <option value="limestone">Limestone</option>
          <option value="copper_plate">Copper Plate</option>
        </select>

        {/* Reset button */}
        {(filter.scriptClass !== 'all' || filter.sourceLanguage !== 'all' || filter.substrate !== 'all' || filter.searchQuery) && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-[11px] font-mono text-stone-500 hover:text-stone-800 px-2 py-1 rounded-xs hover:bg-stone-200/50 transition-colors ml-auto"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
};
