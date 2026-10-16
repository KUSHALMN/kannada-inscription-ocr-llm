import React from 'react';

interface ConfidenceIndicatorProps {
  score: number; // 0.0 to 1.0 or 0 to 100
  label?: string;
  showBar?: boolean;
  className?: string;
}

export const ConfidenceIndicator: React.FC<ConfidenceIndicatorProps> = ({
  score,
  label = 'Model Confidence',
  showBar = true,
  className = '',
}) => {
  // Normalize to 0-100
  const normalized = score <= 1.0 ? Math.round(score * 1000) / 10 : Math.round(score * 10) / 10;
  const isHigh = normalized >= 85;
  const isMed = normalized >= 70 && normalized < 85;

  return (
    <div className={`space-y-1.5 font-mono text-[11px] ${className}`}>
      <div className="flex items-center justify-between text-stone-300">
        <span className="uppercase text-[10px] tracking-wider text-stone-400">{label}</span>
        <span className={`font-bold ${isHigh ? 'text-emerald-400' : isMed ? 'text-amber-400' : 'text-rose-400'}`}>
          {normalized.toFixed(1)}%
        </span>
      </div>
      {showBar && (
        <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isHigh
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-glow-emerald'
                : isMed
                ? 'bg-gradient-to-r from-amber-500 to-yellow-400 shadow-glow-amber'
                : 'bg-gradient-to-r from-rose-500 to-red-400'
            }`}
            style={{ width: `${Math.min(Math.max(normalized, 0), 100)}%` }}
          />
        </div>
      )}
    </div>
  );
};
