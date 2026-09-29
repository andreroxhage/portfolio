'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { ProjectMeta } from '@/app/types';
import WorkBreadcrumb from '@/app/components/WorkBreadcrumb';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';
import { DURATION, EASING, STAGGER } from '@/app/lib/motion';

const TITLE_FALLBACK = 'oklch(var(--surface-dark-foreground))';

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
      <WorkBreadcrumb
        title={project.title}
        year={project.date}
        tags={project.tags}
      />

      {/* Per-project brand colour (DESIGN.md's one allowed inline colour).
          Both theme values are set as custom properties and the .dark class
          picks one in CSS, so the server render is already right in either
          theme. Without a brand colour the title falls back to the neutral
          title token. */}
      <motion.h1
        className="text-2xl md:text-3xl font-medium tracking-tight leading-tight text-(color:--project-title) dark:text-(color:--project-title-dark)"
        style={
          {
            '--project-title':
              project.titleColorLight ?? project.titleColor ?? TITLE_FALLBACK,
            '--project-title-dark': project.titleColor ?? TITLE_FALLBACK,
            textWrap: 'balance',
          } as React.CSSProperties
        }
        {...enterVariant(STAGGER.DELAY)}
      >
        {project.title}
      </motion.h1>
    </header>
  );
}
