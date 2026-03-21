'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { ProjectMeta } from '@/app/types';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';
import { DURATION, EASING } from '@/app/lib/motion';
import { ProgressiveMedia } from '@/app/components/ProgressiveMedia';

interface GalleryCardProps {
  project: ProjectMeta;
  viewMode?: 'list' | 'rich';
}

const rowVariants = {
  rest: { x: 0 },
  hover: { x: 8 },
};

const arrowVariants = {
  rest: { x: 0, y: 0, opacity: 0.4 },
  hover: { x: 3, y: -3, opacity: 1 },
};

const transition = {
  duration: DURATION.FAST,
  ease: EASING.STANDARD,
};

export function GalleryCard({ project, viewMode = 'list' }: GalleryCardProps) {
  const reduced = useReducedMotion();

  if (viewMode === 'rich') {
    return (
      <Link href={`/projects/${project.projectSlug}`} className="block">
        <motion.div
          className={cn(
            'flex items-center gap-5 py-5 border-b border-surface-dark-elevated cursor-pointer',
            'group hover:bg-surface-dark-card/50 transition-colors duration-150'
          )}
          variants={reduced ? undefined : rowVariants}
          initial="rest"
          whileHover="hover"
          transition={transition}
        >
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-surface-dark-foreground leading-none mb-1.5 group-hover:text-primary-400 transition-colors duration-150">
              {project.title}
            </h3>
            <p className="text-xs text-surface-dark-muted leading-relaxed line-clamp-1 max-w-md mb-2">
              {project.subtitle}
            </p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                {project.tags?.slice(0, 2).map(tag => (
                  <span
                    key={tag}
                    className="text-xs text-surface-dark-muted/60 border border-surface-dark-elevated px-2 py-0.5 rounded-full corner-squircle"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-xs text-surface-dark-muted/50 tabular-nums">
                {project.date}
              </span>
            </div>
          </div>

          <div className="shrink-0">
            <ProgressiveMedia
              imageSrc={project.image}
              imageAlt={project.imageAlt}
              videoIdentifier={project.videoIdentifier}
              className="w-[120px] aspect-video"
              rounded
            />
          </div>

          <motion.span
            className="text-surface-dark-muted text-sm shrink-0 w-4 text-right leading-none"
            variants={reduced ? undefined : arrowVariants}
            transition={transition}
          >
            ↗
          </motion.span>
        </motion.div>
      </Link>
    );
  }

  return (
    <Link href={`/projects/${project.projectSlug}`} className="block">
      <motion.div
        className={cn(
          'flex items-center gap-5 py-5 border-b border-surface-dark-elevated cursor-pointer',
          'group hover:bg-surface-dark-card/50 transition-colors duration-150'
        )}
        variants={reduced ? undefined : rowVariants}
        initial="rest"
        whileHover="hover"
        transition={transition}
      >
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-surface-dark-foreground leading-none mb-1.5 group-hover:text-primary-400 transition-colors duration-150">
            {project.title}
          </h3>
          <p className="text-xs text-surface-dark-muted leading-relaxed line-clamp-1 max-w-md">
            {project.subtitle}
          </p>
        </div>

        <motion.span
          className="text-surface-dark-muted text-sm shrink-0 w-4 text-right leading-none"
          variants={reduced ? undefined : arrowVariants}
          transition={transition}
        >
          ↗
        </motion.span>
      </motion.div>
    </Link>
  );
}
