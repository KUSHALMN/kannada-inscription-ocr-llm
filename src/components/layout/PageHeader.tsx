import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  kannadaSubtitle?: string;
  categoryTag?: string;
  action?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  kannadaSubtitle,
  categoryTag,
  action,
  className = '',
}) => {
  return (
    <div className={`border-b border-[#E8DEC8] pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 relative ${className}`}>
      <div className="space-y-2">
        {categoryTag && (
          <div className="text-[11px] font-cinzel font-bold uppercase tracking-[0.2em] text-[#8B4823] block">
            {categoryTag}
          </div>
        )}
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E120B] tracking-tight flex items-center gap-3">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs sm:text-sm text-[#564337] font-serif leading-relaxed max-w-3xl">
            {subtitle}
          </p>
        )}
        {kannadaSubtitle && (
          <p className="text-xs sm:text-sm text-[#8B4823] font-kannada font-semibold leading-relaxed">
            {kannadaSubtitle}
          </p>
        )}
      </div>

      {action && (
        <div className="flex-shrink-0">
          {action}
        </div>
      )}
    </div>
  );
};
