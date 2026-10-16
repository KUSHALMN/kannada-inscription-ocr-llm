import React from 'react';

interface MetadataRowProps {
  label: string;
  value: React.ReactNode;
  kannadaValue?: React.ReactNode;
  citation?: string;
  className?: string;
}

export const MetadataRow: React.FC<MetadataRowProps> = ({
  label,
  value,
  kannadaValue,
  citation,
  className = '',
}) => {
  return (
    <div className={`py-2.5 border-b border-white/[0.07] flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs ${className}`}>
      <span className="font-mono text-[11px] uppercase tracking-wider text-stone-400 min-w-[140px] flex-shrink-0">
        {label}
      </span>
      <div className="text-right sm:text-left flex-1 space-y-0.5">
        <div className="text-stone-100 font-medium">{value}</div>
        {kannadaValue && (
          <div className="text-amber-300/80 font-kannada text-xs">{kannadaValue}</div>
        )}
        {citation && (
          <div className="text-[10px] text-stone-400 font-mono">{citation}</div>
        )}
      </div>
    </div>
  );
};
