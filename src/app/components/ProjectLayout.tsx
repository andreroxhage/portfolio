'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import ScrollScaleWrapper from '@/app/components/ScrollScaleWrapper';

// MiddleSection — passthrough; parent container constrains width to max-w-2xl
export function MiddleSection({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn(className)}>{children}</div>;
}

// WideSection — breaks out of the max-w-2xl prose container for wider media
export function WideSection({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen max-w-4xl mx-auto px-4',
        className
      )}
    >
      {children}
    </div>
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

// ProjectImage — Next/Image with size variants wrapped in ScrollScaleWrapper
const sizeClasses = {
  sm: 'max-w-md mx-auto',
  default: 'w-full',
  xl: 'w-full',
} as const;

export function ProjectImage({
  src,
  alt,
  size = 'default',
  caption,
  className,
}: {
  src: string;
  alt: string;
  size?: 'sm' | 'default' | 'xl';
  caption?: string;
  className?: string;
}) {
  return (
    <div className={cn(sizeClasses[size], className)}>
      <ScrollScaleWrapper className="">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          className="w-full h-auto rounded-xl corner-squircle"
        />
      </ScrollScaleWrapper>
      {caption && (
        <p className="text-sm text-surface-dark-muted mt-3 text-center">
          {caption}
        </p>
      )}
    </div>
  );
}
