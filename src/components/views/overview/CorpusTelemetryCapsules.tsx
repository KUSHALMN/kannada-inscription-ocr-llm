import React from 'react';
import { BookOpen, Landmark, MapPin, Share2 } from 'lucide-react';

interface TelemetryMetric {
  id: string;
  value: string;
  label: string;
  icon: React.ReactNode;
}

const METRICS: TelemetryMetric[] = [
  {
    id: 'inscriptions',
    value: '10,248+',
    label: 'Inscriptions',
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    id: 'dynasties',
    value: '12+',
    label: 'Major Dynasties',
    icon: <Landmark className="w-5 h-5" />,
  },
  {
    id: 'sites',
    value: '100+',
    label: 'Historical Sites',
    icon: <MapPin className="w-5 h-5" />,
  },
  {
    id: 'scripts',
    value: '10',
    label: 'Script Types',
    icon: <Share2 className="w-5 h-5" />,
  },
];

export const CorpusTelemetryCapsules: React.FC = () => {
  return (
    <div className="bg-[#FFFDF9]/95 backdrop-blur-md border border-[#E8DCC9] rounded-2xl p-4 sm:p-5 shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
      {METRICS.map((metric) => (
        <div key={metric.id} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F6EADB] text-[#8C3B18] flex items-center justify-center shrink-0 shadow-2xs">
            {metric.icon}
          </div>
          <div>
            <div className="font-serif font-bold text-base sm:text-lg text-[#24150E] leading-tight">
              {metric.value}
            </div>
            <div className="text-[10px] font-mono tracking-wider text-[#7C695C] uppercase font-semibold">
              {metric.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
