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
    <div className="border border-stone-800/80 bg-obsidian-900/90 rounded-sm overflow-hidden shadow-obsidian-card hover:border-amber-500/50 hover:shadow-glow-amber-sm transition-all duration-300 flex flex-col justify-between group backdrop-blur-md">
      <div>
        {/* Card Header metadata */}
        <div className="p-4 border-b border-stone-800/80 bg-obsidian-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500/80" />
            <span className="font-mono text-[11px] text-stone-400 font-medium">
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
            <h3 className="font-serif font-bold text-base text-stone-100 group-hover:text-amber-300 transition-colors leading-snug">
              {inscription.title}
            </h3>
            <p className="font-kannada text-xs text-amber-400/90 mt-1">
              {inscription.kannadaTitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-stone-400 pt-2 border-t border-stone-800/80">
            <div className="flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-amber-500/70" />
              <span className="truncate text-stone-300">{inscription.historicalContext.dynasty}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-500/70" />
              <span className="text-stone-300">{inscription.historicalContext.approximateDate}</span>
            </div>
            <div className="flex items-center gap-1.5 col-span-2">
              <MapPin className="w-3.5 h-3.5 text-amber-500/70" />
              <span className="text-stone-300 truncate">
                {inscription.historicalContext.findSpot.village}, {inscription.historicalContext.findSpot.district}
              </span>
            </div>
          </div>

          {/* Substrate and Condition */}
          <div className="flex items-center gap-2 pt-2 text-[11px] text-stone-500 border-t border-stone-800/40">
            <span className="uppercase font-mono tracking-wider text-[10px]">Medium:</span>
            <span className="font-medium text-stone-300 capitalize">{inscription.substrate.replace('_', ' ')}</span>
            <span className="text-stone-700">•</span>
            <span className="uppercase font-mono tracking-wider text-[10px]">Condition:</span>
            <span className="font-medium text-stone-300 capitalize">{inscription.conditionRating.replace('_', ' ')}</span>
          </div>
        </div>
      </div>

      {/* Card Action footer */}
      <div className="p-4 bg-obsidian-950/70 border-t border-stone-800/80 flex items-center justify-between">
        <span className="text-[11px] text-stone-400 font-mono">
          {inscription.transcription.lines.length} lines transcribed
        </span>
        <button
          onClick={() => onSelect(inscription)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-200 bg-obsidian-900 border border-stone-700 rounded-sm hover:border-amber-400 hover:text-amber-300 hover:bg-obsidian-800 transition-all shadow-subtle group/btn"
        >
          <span>Examine Epigraph</span>
          <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover/btn:translate-x-0.5 group-hover/btn:text-amber-400 transition-transform" />
        </button>
      </div>
    </div>
  );
};
