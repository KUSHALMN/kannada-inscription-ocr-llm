import React from 'react';
import { InscriptionRecord, ResearchActivityItem } from '../../types';
import { HeroBannerSection } from './overview/HeroBannerSection';
import { OurPurposeSection } from './overview/OurPurposeSection';
import { OurJourneySection } from './overview/OurJourneySection';
import { OurImpactSection } from './overview/OurImpactSection';
import { TeamAcknowledgementsSection } from './overview/TeamAcknowledgementsSection';

interface OverviewViewProps {
  inscriptions: InscriptionRecord[];
  recentActivity: ResearchActivityItem[];
  onNavigateToAnalysis: () => void;
  onNavigateToArchive: () => void;
  onNavigateToScripts: () => void;
  onSelectInscription: (inscription: InscriptionRecord) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  inscriptions: _inscriptions,
  recentActivity: _recentActivity,
  onNavigateToAnalysis,
  onNavigateToArchive,
  onNavigateToScripts,
  onSelectInscription: _onSelectInscription,
}) => {
  return (
    <div className="space-y-12 max-w-[1400px] mx-auto pb-12 animate-fadeIn text-[#24150E]">
      {/* 1. Hero Banner Section */}
      <HeroBannerSection />

      {/* 2. Our Purpose 4-Card Interactive Section */}
      <OurPurposeSection
        onNavigateToArchive={onNavigateToArchive}
        onNavigateToAnalysis={onNavigateToAnalysis}
        onNavigateToScripts={onNavigateToScripts}
      />

      {/* 3. Two-Column Layout: Our Journey & Our Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7">
          <OurJourneySection
            onNavigateToArchive={onNavigateToArchive}
            onNavigateToAnalysis={onNavigateToAnalysis}
          />
        </div>
        <div className="lg:col-span-5">
          <OurImpactSection />
        </div>
      </div>

      {/* 4. Our Team & Acknowledgements */}
      <TeamAcknowledgementsSection />
    </div>
  );
};
