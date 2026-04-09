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
    <div className={cn('max-w-2xl mx-auto px-4', className)}>{children}</div>
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
        'text-2xl font-medium tracking-tight text-surface-dark-foreground mb-6',
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
  default: 'w-full',
  lg: 'w-full',
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
}) {
  const sizeClass = maxWidth ? 'mx-auto' : sizeClasses[size];

  return (
    <div
      className={cn(sizeClass, className)}
      style={maxWidth ? { maxWidth } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn('w-full h-auto', rounded && 'rounded-xl corner-squircle')}
      />
      {caption && (
        <p className="text-sm text-surface-dark-muted mt-3 text-center">
          {caption}
        </p>
      )}
    </div>
  );
}
