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
      label: 'Corroborated by ASI / EC Register',
      dotColor: 'bg-[#2D6A4F]',
      bg: 'bg-[#2D6A4F]/10',
      text: 'text-[#1B4332]',
      border: 'border-[#2D6A4F]/30',
    },
    in_review: {
      label: 'Scholarly Peer Review Inquest',
      dotColor: 'bg-[#B07D38]',
      bg: 'bg-[#B07D38]/10',
      text: 'text-[#6A4B1A]',
      border: 'border-[#B07D38]/30',
    },
    pending_verification: {
      label: 'Archival Ingestion (Pending Collation)',
      dotColor: 'bg-[#5A6B7C]',
      bg: 'bg-[#5A6B7C]/10',
      text: 'text-[#34404E]',
      border: 'border-[#5A6B7C]/30',
    },
    archived: {
      label: 'Canonical Museum Register',
      dotColor: 'bg-[#7C695C]',
      bg: 'bg-[#7C695C]/10',
      text: 'text-[#4A3D35]',
      border: 'border-[#7C695C]/30',
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
