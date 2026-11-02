import React from 'react';

interface ConfidenceIndicatorProps {
  score: number; // 0.0 to 1.0 or 0 to 100
  label?: string;
  showBar?: boolean;
  className?: string;
}

export const ConfidenceIndicator: React.FC<ConfidenceIndicatorProps> = ({
  score,
  label = 'Paleographical Concordance',
  showBar = true,
  className = '',
}) => {
  // Normalize to 0-100
  const normalized = score <= 1.0 ? Math.round(score * 1000) / 10 : Math.round(score * 10) / 10;
  const isHigh = normalized >= 85;
  const isMed = normalized >= 70 && normalized < 85;

  return (
    <div className={`space-y-1.5 font-mono text-[11px] ${className}`}>
      <div className="flex items-center justify-between text-[#3E2D24]">
        <span className="uppercase text-[10px] tracking-wider text-[#7C695C] font-semibold">{label}</span>
        <span className={`font-bold ${isHigh ? 'text-[#2D6A4F]' : isMed ? 'text-[#B07D38]' : 'text-[#9A3B26]'}`}>
          {normalized.toFixed(1)}%
        </span>
      </div>
      {showBar && (
        <div className="w-full h-1.5 bg-[#EAE2D5] rounded-full overflow-hidden border border-[#D8CCBA]">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isHigh
                ? 'bg-[#2D6A4F]'
                : isMed
                ? 'bg-[#B07D38]'
                : 'bg-[#9A3B26]'
            }`}
            style={{ width: `${Math.min(Math.max(normalized, 0), 100)}%` }}
          />
        </div>
      )}
    </div>
  );
};
