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

  return (
    <div className={`space-y-1 font-mono text-[11px] ${className}`}>
      <div className="flex items-center justify-between text-stone-600">
        <span className="uppercase text-[10px] tracking-wider text-stone-400">{label}</span>
        <span className="font-bold text-stone-800">{normalized.toFixed(1)}%</span>
      </div>
      {showBar && (
        <div className="w-full h-1 bg-stone-200 rounded-xs overflow-hidden">
          <div
            className="h-full bg-stone-700 transition-all duration-300"
            style={{ width: `${Math.min(Math.max(normalized, 0), 100)}%` }}
          />
        </div>
      )}
    </div>
  );
};
