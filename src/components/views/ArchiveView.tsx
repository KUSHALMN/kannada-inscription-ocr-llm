import React, { useState } from 'react';
import { InscriptionRecord, InscriptionFilter } from '../../types';
import { PageHeader } from '../layout/PageHeader';
import { InscriptionCard } from '../explorer/InscriptionCard';
import { InscriptionFilterBar } from '../explorer/InscriptionFilterBar';
import { EmptyState } from '../common/EmptyState';

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
    searchQuery: '',
  });

  const filteredInscriptions = inscriptions.filter((ins) => {
    if (filter.scriptClass && filter.scriptClass !== 'all' && ins.scriptClass !== filter.scriptClass) {
      return false;
    }
    if (filter.sourceLanguage && filter.sourceLanguage !== 'all' && ins.sourceLanguage !== filter.sourceLanguage) {
      return false;
    }
    if (filter.substrate && filter.substrate !== 'all' && ins.substrate !== filter.substrate) {
      return false;
    }
    if (filter.searchQuery && filter.searchQuery.trim() !== '') {
      const q = filter.searchQuery.toLowerCase().trim();
      return (
        ins.title.toLowerCase().includes(q) ||
        ins.kannadaTitle.toLowerCase().includes(q) ||
        ins.accessionNumber.toLowerCase().includes(q) ||
        ins.historicalContext.dynasty.toLowerCase().includes(q) ||
        ins.historicalContext.ruler.toLowerCase().includes(q) ||
        ins.historicalContext.findSpot.district.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleResetFilter = () => {
    setFilter({
      scriptClass: 'all',
      sourceLanguage: 'all',
      substrate: 'all',
      searchQuery: '',
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inscription Archive Register"
        subtitle="Search, filter, and inspect verified historical epigraphs catalogued from Karnataka archaeological sites."
        kannadaSubtitle="ಕರ್ನಾಟಕದ ಪ್ರಾಚೀನ ಶಿಲಾಶಾಸನಗಳು ಮತ್ತು ತಾಮ್ರಶಾಸನಗಳ ಅಧಿಕೃತ ಭಂಡಾರ"
        categoryTag="Permanent Collections"
      />

      <InscriptionFilterBar
        filter={filter}
        onFilterChange={setFilter}
        onReset={handleResetFilter}
        totalCount={filteredInscriptions.length}
      />

      {filteredInscriptions.length === 0 ? (
        <EmptyState
          title="No inscriptional records found"
          description="No archived epigraphs match your specific filter criteria. Try resetting the filters or modifying your search term."
          actionLabel="Reset all filters"
          onAction={handleResetFilter}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredInscriptions.map((ins) => (
            <InscriptionCard
              key={ins.id}
              inscription={ins}
              onSelect={onSelectInscription}
            />
          ))}
        </div>
      )}
    </div>
  );
};
