'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import ScrollScaleWrapper from '@/app/components/ScrollScaleWrapper';

// MiddleSection — centered 6-col content within a 10-col grid
export function MiddleSection({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn('col-start-3 col-span-6', className)}>{children}</div>
  );
}

// TwoColSection — full-width nested grid with Left and Right sub-columns
function TwoColSectionRoot({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn('col-span-10 grid grid-cols-10 gap-8', className)}>
      {children}
    </div>
  );
}

function TwoColLeft({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn('col-span-4', className)}>{children}</div>;
}

function TwoColRight({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn('col-span-6', className)}>{children}</div>;
}

export const TwoColSection = Object.assign(TwoColSectionRoot, {
  Left: TwoColLeft,
  Right: TwoColRight,
});

// FullWidthSection — spans all 10 columns
export function FullWidthSection({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn('col-span-10', className)}>{children}</div>;
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
        'text-2xl font-semibold text-surface-dark-foreground mb-6',
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
