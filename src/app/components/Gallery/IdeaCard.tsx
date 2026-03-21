'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { IdeaMeta } from '@/app/types';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';
import { DURATION, EASING } from '@/app/lib/motion';

interface IdeaCardProps {
  idea: IdeaMeta;
  viewMode: 'list' | 'rich';
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

function ListRow({ idea, reduced }: { idea: IdeaMeta; reduced: boolean }) {
  return (
    <motion.div
      className="flex items-center gap-4 py-4 border-b border-surface-dark-elevated cursor-pointer group hover:bg-surface-dark-card/50 transition-colors duration-150 px-1"
      variants={reduced ? undefined : rowVariants}
      initial="rest"
      whileHover="hover"
      transition={transition}
    >
      {/* Title + subtitle */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-surface-dark-foreground leading-none mb-1.5 group-hover:text-primary-400 transition-colors duration-150">
          {idea.title}
        </h3>
        <p className="text-xs text-surface-dark-muted leading-relaxed line-clamp-1 max-w-md">
          {idea.subtitle}
        </p>
      </div>

      {/* Arrow indicator */}
      <motion.span
        className="text-surface-dark-muted text-sm shrink-0 w-4 text-right leading-none"
        variants={reduced ? undefined : arrowVariants}
        transition={transition}
      >
        ↗
      </motion.span>
    </motion.div>
  );
}

function RichRow({ idea, reduced }: { idea: IdeaMeta; reduced: boolean }) {
  const thumbnailSrc: string | null =
    idea.imageFader && idea.imageFader.length > 0
      ? idea.imageFader[0]
      : (idea.image ?? null);

  return (
    <motion.div
      className="flex items-center gap-5 py-5 border-b border-surface-dark-elevated cursor-pointer group"
      variants={reduced ? undefined : rowVariants}
      initial="rest"
      whileHover="hover"
      transition={transition}
    >
      {/* Left: text content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-surface-dark-foreground leading-none mb-1.5 group-hover:text-primary-400 transition-colors duration-150">
          {idea.title}
        </h3>
        <p className="text-xs text-surface-dark-muted leading-relaxed line-clamp-1 max-w-sm mb-2.5">
          {idea.subtitle}
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Tags — first 2 */}
          {idea.tags && idea.tags.length > 0 && (
            <div className="flex items-center gap-1.5">
              {idea.tags.slice(0, 2).map(tag => (
                <span
                  key={tag}
                  className="text-xs text-surface-dark-muted/60 border border-surface-dark-elevated px-2 py-0.5 rounded-full corner-squircle"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Date */}
          {idea.date && (
            <span className="text-xs text-surface-dark-muted/50 tabular-nums">
              {idea.date}
            </span>
          )}
        </div>
      </div>

      {/* Right: thumbnail */}
      {thumbnailSrc && (
        <div className="shrink-0 w-[120px] h-[76px] overflow-hidden rounded-[6px] corner-squircle bg-surface-dark-elevated">
          <Image
            src={thumbnailSrc}
            alt={idea.imageAlt ?? idea.title}
            width={120}
            height={76}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Arrow indicator */}
      <motion.span
        className="text-surface-dark-muted text-sm shrink-0 w-4 text-right leading-none"
        variants={reduced ? undefined : arrowVariants}
        transition={transition}
      >
        ↗
      </motion.span>
    </motion.div>
  );
}

export function IdeaCard({ idea, viewMode }: IdeaCardProps) {
  const reduced = useReducedMotion();

  return (
    <Link href={`/ideas/${idea.ideaSlug}`} className="block">
      {viewMode === 'list' ? (
        <ListRow idea={idea} reduced={reduced} />
      ) : (
        <RichRow idea={idea} reduced={reduced} />
      )}
    </Link>
  );
}
