import React from 'react';

interface DividerProps {
  label?: string;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const Divider: React.FC<DividerProps> = ({
  label,
  className = '',
  orientation = 'horizontal',
}) => {
  if (orientation === 'vertical') {
    return <div className={`inline-block w-px self-stretch bg-white/10 ${className}`} />;
  }

  if (!label) {
    return <hr className={`border-0 border-t border-white/10 my-4 ${className}`} />;
  }

  return (
    <div className={`relative flex items-center my-6 ${className}`}>
      <div className="flex-grow border-t border-white/10"></div>
      <span className="flex-shrink mx-4 text-xs tracking-widest uppercase text-amber-400/80 font-serif font-medium">
        {label}
      </span>
      <div className="flex-grow border-t border-white/10"></div>
    </div>
  );
};
