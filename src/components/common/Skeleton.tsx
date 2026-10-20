import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rounded' | 'rectangular';
  width?: string | number;
  height?: string | number;
  className?: string;
  shimmer?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rounded',
  width,
  height,
  className = '',
  shimmer = true,
  style,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full';
      case 'text':
        return 'rounded-md h-4';
      case 'rectangular':
        return 'rounded-none';
      case 'rounded':
      default:
        return 'rounded-xl';
    }
  };

  const inlineStyles: React.CSSProperties = {
    width: width !== undefined ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height: height !== undefined ? (typeof height === 'number' ? `${height}px` : height) : undefined,
    ...style,
  };

  return (
    <div
      style={inlineStyles}
      className={`
        relative overflow-hidden bg-[#EADBCA]/35
        ${getVariantStyles()}
        ${shimmer ? 'animate-shimmer' : 'animate-pulse'}
        ${className}
      `}
      {...props}
    >
      {/* Specular fluid light shimmer wave */}
      {shimmer && (
        <div
          className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none"
        />
      )}
    </div>
  );
};

interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({ lines = 3, className = '' }) => {
  return (
    <div className={`space-y-2.5 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => {
        const width = i === lines - 1 ? '65%' : i === 0 ? '100%' : '85%';
        return (
          <Skeleton
            key={i}
            variant="text"
            style={{ width }}
            className="h-3.5 bg-[#EADBCA]/30"
          />
        );
      })}
    </div>
  );
};
