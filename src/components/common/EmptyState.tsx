import React from 'react';
import { Archive, AlertCircle, X, Check } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className = '',
}) => {
  return (
    <div className={`border border-white/10 bg-[#0F1521]/70 backdrop-blur-md p-10 text-center rounded-xl space-y-4 shadow-lg ${className}`}>
      <div className="w-12 h-12 mx-auto rounded-lg border border-amber-500/30 bg-amber-500/10 flex items-center justify-center text-amber-400 shadow-glow-amber">
        {icon || <Archive className="w-6 h-6 text-amber-400" />}
      </div>
      <div>
        <h4 className="font-serif font-bold text-base text-white tracking-wide">{title}</h4>
        <p className="text-xs text-stone-300 max-w-sm mx-auto mt-1.5 font-serif leading-relaxed">
          {description}
        </p>
      </div>
      <div className="pt-2 flex items-center justify-center gap-3">
        {actionLabel && onAction && (
          <Button variant="primary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
        {secondaryActionLabel && onSecondaryAction && (
          <Button variant="secondary" size="sm" onClick={onSecondaryAction}>
            {secondaryActionLabel}
          </Button>
        )}
      </div>
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
    <div className={`border border-amber-500/30 bg-amber-500/10 p-4 rounded-lg flex items-start gap-3 text-xs backdrop-blur-md ${className}`}>
      <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
      <div className="flex-1 space-y-1">
        <h5 className="font-mono text-[11px] uppercase tracking-wider font-bold text-amber-300">
          {title}
        </h5>
        <p className="text-stone-300 font-serif leading-relaxed">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-stone-400 hover:text-white p-1 rounded hover:bg-white/10"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="bg-[#0F1521] border border-white/15 rounded-xl max-w-md w-full p-6 shadow-elevation space-y-4">
        <div>
          <h3 className="font-serif font-bold text-lg text-white">{title}</h3>
          <p className="text-xs text-stone-300 mt-1.5 font-serif leading-relaxed">
            {description}
          </p>
        </div>
        <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-white/10">
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
