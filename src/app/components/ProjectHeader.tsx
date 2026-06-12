'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { ProjectMeta } from '@/app/types';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';
import { DURATION, EASING, STAGGER } from '@/app/lib/motion';

interface ProjectHeaderProps {
  project: ProjectMeta;
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  const reducedMotion = useReducedMotion();

  const enterVariant = (delay: number) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: DURATION.SLOW,
      ease: EASING.ENTER,
      delay: reducedMotion ? 0 : delay,
    },
  });

  return (
    <header className="max-w-2.5xl mx-auto px-4 w-full flex flex-col justify-start items-start pt-16 pb-10 gap-6">
      <motion.h1
        className="text-2xl md:text-3xl font-medium tracking-tight leading-tight"
        style={
          {
            color: project.titleColor || 'oklch(0.635 0.08 148)',
            textWrap: 'balance',
          } as React.CSSProperties
        }
        {...enterVariant(0)}
      >
        {project.title}
      </motion.h1>

      {project.date && (
        <motion.h3
          className="text-lg md:text-2xl font-normal opacity-80"
          style={
            {
              color: project.subtitleColor || 'oklch(0.45 0.01 90)',
              textWrap: 'balance',
            } as React.CSSProperties
          }
          {...enterVariant(STAGGER.DELAY)}
        >
          {project.date}
        </motion.h3>
      )}

      {/* Tags hidden for now per user feedback
      {project.tags && project.tags.length > 0 && (
        <motion.div
          className="flex flex-wrap gap-2 mt-2"
          {...enterVariant(STAGGER.DELAY * 2)}
        >
          {project.tags.map(tag => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs bg-surface-dark-elevated text-surface-dark-muted border-0 corner-squircle"
            >
              {tag}
            </Badge>
          ))}
        </motion.div>
      )}
      */}
    </header>
  );
}
