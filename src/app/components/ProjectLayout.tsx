'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// MiddleSection — constrains content to prose width, centered
export function MiddleSection({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn('max-w-2.5xl mx-auto px-4', className)}>{children}</div>
  );
}

// WideSection — wider container for media, centered
export function WideSection({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn('max-w-4xl mx-auto px-4', className)}>{children}</div>
  );
}

// SectionHeading — styled h2 for section titles
export function SectionHeading({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      className={cn(
        'text-xl font-medium tracking-tight text-surface-dark-foreground mb-6',
        className
      )}
    >
      {children}
    </h2>
  );
}

// ProjectImage — Next/Image with size variants
const sizeClasses = {
  xs: 'max-w-xs mx-auto',
  sm: 'max-w-sm mx-auto',
  md: 'max-w-md mx-auto',
  lg: 'max-w-lg mx-auto',
  xl: 'max-w-xl mx-auto',
  xxl: 'max-w-2xl mx-auto',
  xxxl: 'max-w-3xl mx-auto',
  xxxxl: 'max-w-4xl mx-auto',
  xxxxxl: 'max-w-5xl mx-auto',
  xxxxxxl: 'max-w-6xl mx-auto',
  xxxxxxxl: 'max-w-7xl mx-auto',
  xxxxxxxxl: 'max-w-8xl mx-auto',
  default: 'w-full',
  full: 'w-full',
} as const;

export function ProjectImage({
  src,
  alt,
  size = 'default',
  width = 1200,
  height = 800,
  maxWidth,
  caption,
  className,
  rounded = true,
  bg,
}: {
  src: string;
  alt: string;
  size?: keyof typeof sizeClasses;
  width?: number;
  height?: number;
  maxWidth?: string;
  caption?: string;
  className?: string;
  rounded?: boolean;
  /** Add a background behind the image (e.g. for SVGs with transparent/light backgrounds on dark pages) */
  bg?: 'light' | 'dark';
}) {
  const sizeClass = maxWidth ? 'mx-auto' : sizeClasses[size];
  const bgClass =
    bg === 'light'
      ? 'bg-neutral-100 p-6'
      : bg === 'dark'
        ? 'bg-neutral-900 p-6'
        : '';

  return (
    <div
      className={cn(sizeClass, className)}
      style={maxWidth ? { maxWidth } : undefined}
    >
      <div
        className={cn(
          bgClass,
          bgClass && rounded && 'rounded-xl corner-squircle',
          bgClass && 'image-depth-outline'
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            'w-full h-auto',
            rounded && !bgClass && 'rounded-xl corner-squircle'
          )}
        />
      </div>
      {caption && (
        <p className="text-sm text-surface-dark-muted mt-3 text-center">
          {caption}
        </p>
      )}
    </div>
  );
}
