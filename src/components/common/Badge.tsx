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
  const baseStyles = 'inline-flex items-center font-serif font-semibold border rounded-lg select-none tracking-wide';
  
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 leading-tight',
    md: 'text-xs px-2.5 py-1 leading-normal',
  };

  const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-[#F2ECE1] text-[#443831] border-[#DFCBB0]',
    script: 'bg-[#F8EFE4] text-[#8C3B18] border-[#DFCBB0] shadow-2xs',
    language: 'bg-[#EDF4FA] text-[#1E5D8F] border-[#CDE0EE]',
    period: 'bg-[#F4EFE6] text-[#635147] border-[#DFCBB0] font-cinzel text-[10px]',
    substrate: 'bg-[#F1EFEA] text-[#554C46] border-[#D6CFC7]',
    warning: 'bg-[#FDF3E7] text-[#9A4A1C] border-[#F0D5BE]',
    status: 'bg-[#EBF5EE] text-[#1D6C44] border-[#CCE5D4]',
    rule_type: 'bg-[#F3EEF9] text-[#5D2E8B] border-[#DDD0EE]',
  };

  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
