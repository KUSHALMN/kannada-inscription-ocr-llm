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
    return <div className={`inline-block w-px self-stretch bg-heritage-border ${className}`} />;
  }

  if (!label) {
    return <hr className={`border-0 border-t border-heritage-border my-4 ${className}`} />;
  }

  return (
    <div className={`relative flex items-center my-6 ${className}`}>
      <div className="flex-grow border-t border-heritage-border"></div>
      <span className="flex-shrink mx-4 text-xs tracking-widest uppercase text-stone-500 font-serif">
        {label}
      </span>
      <div className="flex-grow border-t border-heritage-border"></div>
    </div>
  );
};
