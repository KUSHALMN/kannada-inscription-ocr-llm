import React from 'react';
import { InscriptionRecord } from '../../types';
import { Badge } from '../common/Badge';
import { MapPin, Calendar, Landmark, ArrowRight } from 'lucide-react';

interface InscriptionCardProps {
  inscription: InscriptionRecord;
  onSelect: (inscription: InscriptionRecord) => void;
}

export const InscriptionCard: React.FC<InscriptionCardProps> = ({ inscription, onSelect }) => {
  return (
    <div className="border border-heritage-border bg-parchment-50 rounded-xs overflow-hidden shadow-subtle hover:border-stone-400 transition-all flex flex-col justify-between">
      <div>
        {/* Card Header metadata */}
        <div className="p-4 border-b border-heritage-border/70 bg-stone-50/70 flex items-center justify-between">
          <span className="font-mono text-[11px] text-stone-500 font-medium">
            {inscription.accessionNumber}
          </span>
          <div className="flex items-center gap-1.5">
            <Badge variant="script" size="sm">{inscription.scriptClass.replace('_', ' ')}</Badge>
            <Badge variant="language" size="sm">{inscription.sourceLanguage.replace('_', ' ')}</Badge>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5 space-y-3">
          <div>
            <h3 className="font-serif font-bold text-base text-stone-900 leading-snug">
              {inscription.title}
            </h3>
            <p className="font-kannada text-xs text-stone-600 mt-1">
              {inscription.kannadaTitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 pt-2 border-t border-heritage-border/50">
            <div className="flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-stone-400" />
              <span className="truncate">{inscription.historicalContext.dynasty}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              <span>{inscription.historicalContext.approximateDate}</span>
            </div>
            <div className="flex items-center gap-1.5 col-span-2">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              <span>
                {inscription.historicalContext.findSpot.village}, {inscription.historicalContext.findSpot.district}
              </span>
            </div>
          </div>

          {/* Substrate and Condition */}
          <div className="flex items-center gap-2 pt-2 text-[11px] text-stone-500">
            <span className="uppercase font-mono tracking-wider">Medium:</span>
            <span className="font-medium text-stone-700 capitalize">{inscription.substrate.replace('_', ' ')}</span>
            <span className="text-stone-300">•</span>
            <span className="uppercase font-mono tracking-wider">Condition:</span>
            <span className="font-medium text-stone-700 capitalize">{inscription.conditionRating.replace('_', ' ')}</span>
          </div>
        </div>
      </div>

      {/* Card Action footer */}
      <div className="p-4 bg-stone-100/50 border-t border-heritage-border flex items-center justify-between">
        <span className="text-[11px] text-stone-500 font-mono">
          {inscription.transcription.lines.length} lines transcribed
        </span>
        <button
          onClick={() => onSelect(inscription)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-900 bg-parchment-50 border border-stone-300 rounded-xs hover:bg-stone-200/60 transition-colors shadow-subtle"
        >
          <span>Examine Epigraph</span>
          <ArrowRight className="w-3.5 h-3.5 text-stone-600" />
        </button>
      </div>
    </div>
  );
};
