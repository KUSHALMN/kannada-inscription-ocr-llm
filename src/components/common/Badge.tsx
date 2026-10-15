import React from 'react';

export type BadgeVariant = 'default' | 'script' | 'language' | 'period' | 'substrate' | 'warning';

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
  const baseStyles = 'inline-flex items-center font-medium border rounded-xs uppercase tracking-wider select-none';
  
  const sizeStyles = {
    sm: 'text-[10px] px-1.5 py-0.5 leading-tight',
    md: 'text-xs px-2.5 py-0.5 leading-normal',
  };

  const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-stone-100 text-stone-700 border-stone-300',
    script: 'bg-parchment-200 text-stone-900 border-heritage-ochre/40',
    language: 'bg-stone-100 text-heritage-terracotta border-heritage-terracotta/30',
    period: 'bg-stone-50 text-stone-600 border-stone-300 font-mono text-[11px]',
    substrate: 'bg-stone-200/60 text-stone-700 border-stone-300/80',
    warning: 'bg-amber-50 text-amber-900 border-amber-300/70',
  };

  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
