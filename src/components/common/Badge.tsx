import React from 'react';

export type BadgeVariant = 'default' | 'script' | 'language' | 'period' | 'substrate' | 'warning' | 'status' | 'rule_type';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
  size = 'md',
}) => {
  const baseStyles = 'inline-flex items-center font-medium border rounded-md uppercase tracking-wider select-none font-mono';
  
  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 leading-tight',
    md: 'text-xs px-2.5 py-0.5 leading-normal',
  };

  const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    script: 'bg-amber-50 text-amber-800 border-amber-200 shadow-xs font-semibold',
    language: 'bg-sky-50 text-sky-800 border-sky-200 font-semibold',
    period: 'bg-slate-100 text-slate-700 border-slate-200 font-mono text-[11px]',
    substrate: 'bg-stone-100 text-stone-700 border-stone-200',
    warning: 'bg-amber-100 text-amber-900 border-amber-300 font-semibold',
    status: 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold',
    rule_type: 'bg-purple-50 text-purple-800 border-purple-200 font-mono font-semibold',
  };

  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
