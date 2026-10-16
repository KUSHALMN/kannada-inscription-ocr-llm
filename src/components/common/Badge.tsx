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
    default: 'bg-white/[0.06] text-stone-300 border-white/10',
    script: 'bg-amber-500/10 text-amber-300 border-amber-500/30 shadow-sm',
    language: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    period: 'bg-white/[0.04] text-stone-300 border-white/10 font-mono text-[11px]',
    substrate: 'bg-stone-800/80 text-stone-300 border-white/10',
    warning: 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-glow-amber',
    status: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-glow-emerald',
    rule_type: 'bg-purple-500/15 text-purple-300 border-purple-500/30 font-mono',
  };

  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
