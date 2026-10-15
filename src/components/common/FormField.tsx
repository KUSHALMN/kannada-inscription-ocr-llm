import React from 'react';

interface FormFieldProps {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  hint,
  error,
  required,
  children,
  className = '',
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-xs font-mono uppercase tracking-wider text-stone-600">
          {label} {required && <span className="text-heritage-terracotta">*</span>}
        </label>
      )}
      {children}
      {hint && !error && (
        <p className="text-[11px] text-stone-500 font-serif leading-normal">{hint}</p>
      )}
      {error && (
        <p className="text-[11px] text-heritage-terracotta font-mono">{error}</p>
      )}
    </div>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className = '',
  ...props
}) => (
  <input
    className={`w-full px-3 py-2 text-xs bg-parchment-50 border border-stone-300 rounded-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-600 shadow-subtle ${className}`}
    {...props}
  />
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <select
    className={`w-full px-3 py-2 text-xs bg-parchment-50 border border-stone-300 rounded-xs text-stone-900 focus:outline-none focus:border-stone-600 shadow-subtle ${className}`}
    {...props}
  >
    {children}
  </select>
);

export const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  className = '',
  ...props
}) => (
  <textarea
    className={`w-full px-3 py-2 text-xs bg-parchment-50 border border-stone-300 rounded-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-600 shadow-subtle font-kannada leading-relaxed ${className}`}
    {...props}
  />
);
