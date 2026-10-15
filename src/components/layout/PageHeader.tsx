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
    <div className={`border-b border-heritage-border pb-5 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 ${className}`}>
      <div className="space-y-1">
        {categoryTag && (
          <span className="text-[11px] font-mono uppercase tracking-widest text-stone-500 block">
            {categoryTag}
          </span>
        )}
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs sm:text-sm text-stone-600 font-serif leading-relaxed">
            {subtitle}
          </p>
        )}
        {kannadaSubtitle && (
          <p className="text-xs text-stone-500 font-kannada">
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
