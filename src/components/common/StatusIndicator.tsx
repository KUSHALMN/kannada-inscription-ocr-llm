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
  const sizeClass = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-[11px] px-2.5 py-1';
  const configs: Record<ReviewStatus, { label: string; dotColor: string; bg: string; text: string; border: string }> = {
    verified: {
      label: 'Verified by Epigraphist',
      dotColor: 'bg-emerald-400 shadow-glow-emerald',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-300',
      border: 'border-emerald-500/30',
    },
    in_review: {
      label: 'Under Peer Review',
      dotColor: 'bg-amber-400 shadow-glow-amber',
      bg: 'bg-amber-500/10',
      text: 'text-amber-300',
      border: 'border-amber-500/30',
    },
    pending_verification: {
      label: 'Pending Verification',
      dotColor: 'bg-cyan-400 shadow-glow-cyan',
      bg: 'bg-cyan-500/10',
      text: 'text-cyan-300',
      border: 'border-cyan-500/30',
    },
    archived: {
      label: 'Cataloged Record',
      dotColor: 'bg-stone-400',
      bg: 'bg-white/[0.05]',
      text: 'text-stone-300',
      border: 'border-white/10',
    },
  };

  const current = configs[status] || configs.archived;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border font-mono select-none ${sizeClass} ${current.bg} ${current.text} ${current.border} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dotColor}`} />
      <span>{current.label}</span>
    </span>
  );
};
