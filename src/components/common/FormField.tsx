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
        <label className="block text-xs font-medium text-[#2E1E16] tracking-tight font-sans">
          {label} {required && <span className="text-[#8B4823] font-bold">*</span>}
        </label>
      )}
      {children}
      {hint && !error && (
        <p className="text-[11px] text-[#6C584C] font-sans leading-normal">{hint}</p>
      )}
      {error && (
        <p className="text-[11px] text-rose-600 font-sans">{error}</p>
      )}
    </div>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className = '',
  ...props
}) => (
  <input
    className={`w-full px-3.5 py-2.5 text-xs font-sans bg-[#FAF7F2] border border-[#DFCBB0] rounded-lg text-[#1E120B] placeholder-[#8A796D] focus:bg-white focus:outline-none focus:border-[#7C3517] focus:ring-2 focus:ring-[#7C3517]/15 transition-all shadow-2xs ${className}`}
    {...props}
  />
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <select
    className={`w-full px-3.5 py-2.5 text-xs font-sans bg-[#FAF7F2] border border-[#DFCBB0] rounded-lg text-[#1E120B] focus:bg-white focus:outline-none focus:border-[#7C3517] focus:ring-2 focus:ring-[#7C3517]/15 transition-all shadow-2xs cursor-pointer ${className}`}
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
    className={`w-full px-3.5 py-2.5 text-xs font-sans bg-[#FAF7F2] border border-[#DFCBB0] rounded-lg text-[#1E120B] placeholder-[#8A796D] focus:bg-white focus:outline-none focus:border-[#7C3517] focus:ring-2 focus:ring-[#7C3517]/15 transition-all shadow-2xs ${className}`}
    {...props}
  />
);
