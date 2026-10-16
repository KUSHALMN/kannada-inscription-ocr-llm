import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 select-none focus:outline-none disabled:opacity-40 disabled:pointer-events-none cursor-pointer active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-xs px-4 py-2 gap-2',
    lg: 'text-sm px-5 py-2.5 gap-2.5 font-semibold',
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-stone-950 font-bold border border-amber-300/40 shadow-glow-amber',
    secondary: 'bg-white/[0.07] hover:bg-white/[0.12] text-stone-100 border border-white/10 backdrop-blur-md shadow-sm',
    outline: 'bg-transparent text-stone-300 hover:text-white hover:bg-white/[0.06] border border-white/15',
    ghost: 'bg-transparent text-stone-400 hover:text-stone-100 hover:bg-white/[0.05] border border-transparent',
    danger: 'bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 border border-rose-500/30 shadow-sm',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {!isLoading && icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </button>
  );
};
