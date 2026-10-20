import React from 'react';
import { Skeleton, SkeletonText } from './Skeleton';

export const PageSkeletonLoader: React.FC = () => {
  return (
    <div className="space-y-12 max-w-[1400px] mx-auto pb-12 animate-fadeIn">
      {/* 1. Hero Banner Skeleton */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#EADBCA]/60 bg-[#FAF6EE]/70 p-6 sm:p-10 lg:p-12 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column Skeleton */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill Tag Skeleton */}
            <Skeleton className="h-6 w-44 rounded-full bg-[#EADBCA]/45" />

            {/* Title Skeleton: 2 lines */}
            <div className="space-y-3">
              <Skeleton className="h-10 sm:h-12 w-4/5 rounded-xl bg-[#EADBCA]/50" />
              <Skeleton className="h-10 sm:h-12 w-3/5 rounded-xl bg-[#EADBCA]/40" />
            </div>

            {/* Subtitle Skeletons */}
            <div className="space-y-2 max-w-xl">
              <SkeletonText lines={2} />
              <Skeleton className="h-4 w-2/3 rounded-md bg-[#EADBCA]/35 pt-1" />
            </div>

            {/* 4 Stat Badges Capsule Skeleton */}
            <div className="pt-2">
              <div className="bg-white/80 border border-[#E8DCC9]/70 rounded-2xl p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton variant="rounded" className="w-10 h-10 rounded-xl bg-[#EADBCA]/45 shrink-0" />
                    <div className="space-y-1.5 flex-1">
                      <Skeleton className="h-4 w-14 rounded-md bg-[#EADBCA]/50" />
                      <Skeleton className="h-2.5 w-16 rounded-sm bg-[#EADBCA]/30" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column Skeleton (Silhouette of Stele & Temples) */}
          <div className="hidden lg:flex lg:col-span-5 h-[340px] relative items-center justify-end">
            <div className="absolute right-0 bottom-0 top-6 w-44 rounded-t-3xl bg-gradient-to-t from-[#EADBCA]/45 to-[#EADBCA]/20 border border-[#EADBCA]/40 animate-pulse" />
            <div className="absolute right-48 bottom-0 h-48 w-32 rounded-t-xl bg-gradient-to-t from-[#EADBCA]/35 to-transparent border-t border-l border-[#EADBCA]/30" />
            {/* Quote badge skeleton */}
            <div className="absolute top-4 right-36 w-48 p-3 rounded-xl bg-white/70 border border-[#EADBCA]/60 space-y-2 shadow-2xs">
              <Skeleton className="h-4 w-6 rounded-md bg-[#C05621]/20" />
              <Skeleton className="h-3 w-full rounded-md bg-[#EADBCA]/40" />
              <Skeleton className="h-2.5 w-24 rounded-sm bg-[#EADBCA]/30" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Our Purpose Section Skeleton */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-7 w-36 rounded-lg bg-[#EADBCA]/50" />
            <Skeleton className="h-0.5 w-20 bg-[#EADBCA]/30" />
          </div>
          <Skeleton className="h-4 w-40 rounded-full bg-[#EADBCA]/30 hidden sm:block" />
        </div>

        {/* 4 Cards Skeleton Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white/60 border border-[#EADBCA]/60 rounded-2xl p-6 flex flex-col justify-between space-y-6 min-h-[190px]"
            >
              <div className="space-y-4">
                <Skeleton variant="rounded" className="w-12 h-12 rounded-xl bg-[#EADBCA]/45" />
                <Skeleton className="h-5 w-24 rounded-md bg-[#EADBCA]/50" />
                <SkeletonText lines={2} />
              </div>
              <div className="flex justify-end">
                <Skeleton variant="circular" className="w-7 h-7 bg-[#EADBCA]/40" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Two-Column Journey & Impact Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Journey Skeleton (Col 7) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center gap-3">
            <Skeleton className="h-7 w-32 rounded-lg bg-[#EADBCA]/50" />
            <Skeleton className="h-0.5 w-16 bg-[#EADBCA]/30" />
          </div>

          <div className="bg-white/60 border border-[#EADBCA]/60 rounded-2xl p-6 sm:p-7 grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[290px]">
            {/* Timeline Stepper Skeleton */}
            <div className="md:col-span-6 space-y-6 pl-4 border-l-2 border-[#EADBCA]/35">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <Skeleton className="h-4 w-28 rounded-md bg-[#EADBCA]/50" />
                  <Skeleton className="h-3 w-48 rounded-sm bg-[#EADBCA]/30" />
                </div>
              ))}
            </div>

            {/* Route Map Skeleton */}
            <div className="md:col-span-6 bg-[#FAF5EC]/70 rounded-xl p-4 border border-[#EADBCA]/50 flex flex-col justify-between min-h-[220px]">
              <div className="flex justify-start">
                <Skeleton className="h-6 w-24 rounded-full bg-[#EADBCA]/40" />
              </div>
              <div className="flex justify-end">
                <Skeleton className="h-6 w-24 rounded-full bg-[#EADBCA]/40" />
              </div>
              <div className="flex justify-start ml-6">
                <Skeleton className="h-6 w-24 rounded-full bg-[#EADBCA]/40" />
              </div>
              <div className="flex justify-end">
                <Skeleton className="h-6 w-24 rounded-full bg-[#EADBCA]/40" />
              </div>
            </div>
          </div>
        </div>

        {/* Impact Skeleton (Col 5) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="flex items-center gap-3">
            <Skeleton className="h-7 w-32 rounded-lg bg-[#EADBCA]/50" />
            <Skeleton className="h-0.5 w-16 bg-[#EADBCA]/30" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-[calc(100%-48px)]">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white/60 border border-[#EADBCA]/60 rounded-2xl p-5 flex flex-col justify-center space-y-3 min-h-[135px]"
              >
                <Skeleton variant="rounded" className="w-10 h-10 rounded-xl bg-[#EADBCA]/45" />
                <Skeleton className="h-4 w-28 rounded-md bg-[#EADBCA]/50" />
                <Skeleton className="h-3 w-full rounded-sm bg-[#EADBCA]/30" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Team & Acknowledgements Skeleton */}
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <Skeleton className="h-7 w-60 rounded-lg bg-[#EADBCA]/50" />
          <Skeleton className="h-0.5 w-16 bg-[#EADBCA]/30" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white/60 border border-[#EADBCA]/60 rounded-2xl p-5 flex items-center gap-4"
            >
              <Skeleton variant="rounded" className="w-12 h-12 rounded-xl bg-[#EADBCA]/45 shrink-0" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-36 rounded-md bg-[#EADBCA]/50" />
                <Skeleton className="h-3 w-48 rounded-sm bg-[#EADBCA]/30" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
