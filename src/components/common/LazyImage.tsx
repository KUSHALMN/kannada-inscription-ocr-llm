import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  fallbackIcon?: React.ReactNode;
}

/**
 * High-performance responsive LazyImage with native lazy loading,
 * async decoding, animated skeleton shimmer during download,
 * and graceful error fallback.
 */
export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  fallbackIcon,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${wrapperClassName}`}>
      {/* Skeleton Shimmer */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
      )}

      {/* Fallback state on error */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-slate-400 bg-slate-100">
          {fallbackIcon || <ImageIcon className="w-6 h-6 stroke-1 text-slate-400 mb-1" />}
          <span className="text-[10px] font-sans text-slate-400 text-center truncate max-w-full">
            {alt || 'Archival image preview'}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
};
