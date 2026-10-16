import React from 'react';
import { InscriptionRecord } from '../../types';
import { Badge } from '../common/Badge';
import { MapPin, Calendar, Landmark, ArrowRight, ShieldCheck } from 'lucide-react';

interface InscriptionCardProps {
  inscription: InscriptionRecord;
  onSelect: (inscription: InscriptionRecord) => void;
}

export const InscriptionCard: React.FC<InscriptionCardProps> = ({ inscription, onSelect }) => {
  return (
    <div className="border border-slate-200 bg-white rounded-lg overflow-hidden shadow-xs hover:border-amber-400 hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Card Header metadata */}
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span className="font-mono text-[11px] text-slate-600 font-medium">
              {inscription.accessionNumber}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Badge variant="script" size="sm">{inscription.scriptClass.replace('_', ' ')}</Badge>
            <Badge variant="language" size="sm">{inscription.sourceLanguage.replace('_', ' ')}</Badge>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5 space-y-3">
          <div>
            <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-amber-800 transition-colors leading-snug">
              {inscription.title}
            </h3>
            <p className="font-kannada text-xs text-amber-700 font-medium mt-1">
              {inscription.kannadaTitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-amber-600" />
              <span className="truncate text-slate-700 font-medium">{inscription.historicalContext.dynasty}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-slate-700 font-medium">{inscription.historicalContext.approximateDate}</span>
            </div>
            <div className="flex items-center gap-1.5 col-span-2">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-slate-700 truncate">
                {inscription.historicalContext.findSpot.village}, {inscription.historicalContext.findSpot.district}
              </span>
            </div>
          </div>

          {/* Substrate and Condition */}
          <div className="flex items-center gap-2 pt-2 text-[11px] text-slate-500 border-t border-slate-100">
            <span className="uppercase font-mono tracking-wider text-[10px]">Medium:</span>
            <span className="font-medium text-slate-700 capitalize">{inscription.substrate.replace('_', ' ')}</span>
            <span className="text-slate-300">•</span>
            <span className="uppercase font-mono tracking-wider text-[10px]">Condition:</span>
            <span className="font-medium text-slate-700 capitalize">{inscription.conditionRating.replace('_', ' ')}</span>
          </div>
        </div>
      </div>

      {/* Card Action footer */}
      <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 font-mono">
          {inscription.transcription.lines.length} lines transcribed
        </span>
        <button
          onClick={() => onSelect(inscription)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-md hover:border-amber-400 hover:text-amber-900 hover:bg-amber-50/50 transition-all shadow-xs group/btn"
        >
          <span>Examine Epigraph</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover/btn:translate-x-0.5 group-hover/btn:text-amber-600 transition-transform" />
        </button>
      </div>
    </div>
  );
};
