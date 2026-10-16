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
        <label className="block text-xs font-mono uppercase tracking-wider text-stone-300">
          {label} {required && <span className="text-amber-400">*</span>}
        </label>
      )}
      {children}
      {hint && !error && (
        <p className="text-[11px] text-stone-400 font-serif leading-normal">{hint}</p>
      )}
      {error && (
        <p className="text-[11px] text-rose-400 font-mono">{error}</p>
      )}
    </div>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className = '',
  ...props
}) => (
  <input
    className={`w-full px-3.5 py-2.5 text-xs bg-[#0F1521] border border-white/15 rounded-md text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all duration-200 shadow-sm ${className}`}
    {...props}
  />
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <select
    className={`w-full px-3.5 py-2.5 text-xs bg-[#0F1521] border border-white/15 rounded-md text-stone-100 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all duration-200 shadow-sm ${className}`}
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
    className={`w-full px-3.5 py-2.5 text-xs bg-[#0F1521] border border-white/15 rounded-md text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 font-kannada leading-relaxed transition-all duration-200 shadow-sm ${className}`}
    {...props}
  />
);
