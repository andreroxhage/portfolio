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
  tags?: string[];
}

export default function WorkBreadcrumb({
  title,
  year,
  tags,
}: WorkBreadcrumbProps) {
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
            className="group flex items-center gap-1.5 text-surface-dark-muted/70 hover:text-accent transition-colors duration-200"
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
          className="mx-2 select-none text-surface-dark-muted/40"
        >
          /
        </li>
        <li
          aria-current="page"
          className="min-w-0 truncate text-surface-dark-muted"
        >
          {title}
        </li>
      </ol>
      {(year || (tags && tags.length > 0)) && (
        <div className="flex shrink-0 items-center gap-2 text-surface-dark-muted/70">
          {tags?.slice(0, 2).map((tag, i) => (
            <React.Fragment key={tag}>
              {i > 0 && (
                <span
                  aria-hidden
                  className="hidden select-none text-surface-dark-muted/35 sm:inline"
                >
                  ·
                </span>
              )}
              <span className="hidden whitespace-nowrap sm:inline">{tag}</span>
            </React.Fragment>
          ))}
          {tags && tags.length > 0 && year && (
            <span
              aria-hidden
              className="hidden select-none text-surface-dark-muted/35 sm:inline"
            >
              ·
            </span>
          )}
          {year && <span className="whitespace-nowrap">{year}</span>}
        </div>
      )}
    </motion.nav>
  );
}
