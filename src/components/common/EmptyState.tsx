import React from 'react';
import { Archive, AlertCircle, X, Check } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div className={`border border-stone-300/80 bg-stone-50/60 p-10 text-center rounded-xs space-y-3 ${className}`}>
      <div className="w-10 h-10 mx-auto rounded-xs border border-stone-300 bg-parchment-100 flex items-center justify-center text-stone-500 shadow-subtle">
        {icon || <Archive className="w-5 h-5 text-stone-500" />}
      </div>
      <div>
        <h4 className="font-serif font-bold text-sm text-stone-900">{title}</h4>
        <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1 font-serif leading-relaxed">
          {description}
        </p>
      </div>
      {actionLabel && onAction && (
        <div className="pt-2">
          <Button variant="secondary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

interface ErrorMessageProps {
  title?: string;
  message: string;
  onDismiss?: () => void;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'Epigraphical Query Notice',
  message,
  onDismiss,
  className = '',
}) => {
  return (
    <div className={`border border-heritage-terracotta/40 bg-amber-50/50 p-3.5 rounded-xs flex items-start gap-3 text-xs ${className}`}>
      <AlertCircle className="w-4 h-4 text-heritage-terracotta mt-0.5 flex-shrink-0" />
      <div className="flex-1 space-y-0.5">
        <h5 className="font-mono text-[11px] uppercase tracking-wider font-bold text-stone-800">
          {title}
        </h5>
        <p className="text-stone-700 font-serif leading-relaxed">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-stone-400 hover:text-stone-700 p-0.5"
          title="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  description,
  confirmLabel = 'Confirm Action',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  isDestructive = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-[1px]">
      <div className="bg-parchment-50 border border-stone-400 rounded-xs max-w-md w-full p-6 shadow-elevation space-y-4">
        <div>
          <h3 className="font-serif font-bold text-base text-stone-900">{title}</h3>
          <p className="text-xs text-stone-600 mt-1 font-serif leading-relaxed">
            {description}
          </p>
        </div>
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-heritage-border">
          <Button variant="outline" size="sm" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button
            variant={isDestructive ? 'danger' : 'primary'}
            size="sm"
            onClick={onConfirm}
            icon={<Check className="w-3.5 h-3.5" />}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
