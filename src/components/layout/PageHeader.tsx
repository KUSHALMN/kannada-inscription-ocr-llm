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
    <div className={`border-b border-white/[0.08] pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 relative ${className}`}>
      <div className="space-y-1.5">
        {categoryTag && (
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400/90 font-semibold block">
              {categoryTag}
            </span>
          </div>
        )}
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight flex items-center gap-3">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed max-w-3xl">
            {subtitle}
          </p>
        )}
        {kannadaSubtitle && (
          <p className="text-xs text-amber-300/80 font-kannada font-medium">
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
