'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { IconArrowLeft } from '@tabler/icons-react';
import { DURATION, EASING } from '@/app/lib/motion';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';

interface WorkBreadcrumbProps {
  title: string;
  year?: string;
}

export default function WorkBreadcrumb({ title, year }: WorkBreadcrumbProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.nav
      aria-label="Breadcrumb"
      className="w-full flex items-center justify-between gap-6 text-sm font-normal tracking-wide"
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.SLOW, ease: EASING.ENTER }}
    >
      <ol className="flex items-center min-w-0">
        <li>
          <Link
            href="/work"
            className="group flex items-center gap-1.5 text-surface-dark-muted hover:text-accent transition-colors duration-200"
          >
            <IconArrowLeft
              size={15}
              stroke={1.5}
              aria-hidden
              className={
                reducedMotion
                  ? undefined
                  : 'transition-transform duration-200 group-hover:-translate-x-0.5'
              }
            />
            Work
          </Link>
        </li>
        <li
          role="presentation"
          aria-hidden
          className="mx-2 select-none text-surface-dark-muted/50"
        >
          /
        </li>
        <li
          aria-current="page"
          className="min-w-0 truncate text-surface-dark-foreground/90"
        >
          {title}
        </li>
      </ol>
      {year && (
        <span className="whitespace-nowrap text-surface-dark-muted">
          {year}
        </span>
      )}
    </motion.nav>
  );
}
