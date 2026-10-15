import React from 'react';
import { ReviewStatus } from '../../types';

interface StatusIndicatorProps {
  status: ReviewStatus;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size = 'md',
  className = '',
}) => {
  const sizeClass = size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : 'text-[11px] px-2 py-0.5';
  const configs: Record<ReviewStatus, { label: string; dotColor: string; bg: string; text: string; border: string }> = {
    verified: {
      label: 'Verified by Epigraphist',
      dotColor: 'bg-stone-700',
      bg: 'bg-stone-100',
      text: 'text-stone-800',
      border: 'border-stone-300',
    },
    in_review: {
      label: 'Under Peer Review',
      dotColor: 'bg-heritage-ochre',
      bg: 'bg-amber-50/70',
      text: 'text-stone-800',
      border: 'border-amber-300/60',
    },
    pending_verification: {
      label: 'Pending Verification',
      dotColor: 'bg-stone-400',
      bg: 'bg-stone-50',
      text: 'text-stone-600',
      border: 'border-stone-200',
    },
    archived: {
      label: 'Cataloged Record',
      dotColor: 'bg-stone-400',
      bg: 'bg-stone-100',
      text: 'text-stone-500',
      border: 'border-stone-200',
    },
  };

  const current = configs[status] || configs.archived;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-xs border font-mono select-none ${sizeClass} ${current.bg} ${current.text} ${current.border} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dotColor}`} />
      <span>{current.label}</span>
    </span>
  );
};
