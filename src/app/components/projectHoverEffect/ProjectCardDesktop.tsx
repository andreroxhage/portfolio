'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { GridItem } from '@/app/types';
import { IconPlus, IconArrowRight } from '@tabler/icons-react';
import {
  BUTTON_PRESS_SCALE,
  CROSSFADE,
  DURATION,
  EASING,
  RESIZE,
  STAGGER,
} from '@/app/lib/motion';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';

interface ProjectCardDesktopProps {
  item: GridItem;
  isExpanded: boolean;
  onClick: () => void;
}

type Box = { width: number; height: number };

const measure = (el: HTMLElement): Box => ({
  width: el.offsetWidth,
  height: el.offsetHeight,
});

/**
 * Both layers are always laid out at their final width, so text never
 * re-wraps mid-animation. The card animates between the two measured boxes
 * and clips; a crossfade swaps the content on top of that single motion.
 */
function useLayerSizes() {
  const collapsedRef = useRef<HTMLDivElement>(null);
  const expandedRef = useRef<HTMLDivElement>(null);
  const [sizes, setSizes] = useState<{
    collapsed: Box;
    expanded: Box;
  } | null>(null);

  useLayoutEffect(() => {
    const collapsed = collapsedRef.current;
    const expanded = expandedRef.current;
    if (!collapsed || !expanded) {
      return;
    }
    const update = () =>
      setSizes({ collapsed: measure(collapsed), expanded: measure(expanded) });

    // Measure before first paint, then follow container or font changes
    update();
    const observer = new ResizeObserver(update);
    observer.observe(collapsed);
    observer.observe(expanded);
    return () => observer.disconnect();
  }, []);

  return { collapsedRef, expandedRef, sizes };
}

const ProjectCardDesktop: React.FC<ProjectCardDesktopProps> = React.memo(
  ({ item, isExpanded, onClick }) => {
    const router = useRouter();
    const prefersReducedMotion = useReducedMotion();
    const [isHovering, setIsHovering] = useState(false);
    const { collapsedRef, expandedRef, sizes } = useLayerSizes();

    // Expanded cards navigate; collapsed cards expand
    const activate = () => {
      if (isExpanded && item.href) {
        try {
          sessionStorage.setItem('fromProjects', '1');
        } catch (_e) {
          /* noop */
        }
        router.push(item.href);
        return;
      }
      onClick();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate();
      }
    };

    const layerTransition = (visible: boolean) =>
      visible ? CROSSFADE.IN : CROSSFADE.OUT;

    return (
      <motion.div
        onClick={activate}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={isExpanded}
        whileTap={{ scale: BUTTON_PRESS_SCALE }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="relative bg-surface-dark-card inset-shadow-border-glow shadow-hairline rounded-card-lg corner-squircle hover:bg-surface-dark-elevated cursor-pointer transition-colors duration-150 overflow-hidden"
        initial={false}
        animate={
          sizes ? (isExpanded ? sizes.expanded : sizes.collapsed) : undefined
        }
        transition={prefersReducedMotion ? { duration: 0 } : RESIZE}
      >
        {/* Collapsed layer — a single line, sized to its title */}
        <motion.div
          ref={collapsedRef}
          className="absolute left-0 top-0 w-max p-6"
          initial={false}
          animate={{ opacity: isExpanded ? 0 : 1 }}
          transition={layerTransition(!isExpanded)}
          aria-hidden={isExpanded}
          inert={isExpanded}
        >
          <div className="flex items-center gap-4">
            <IconPlus
              size={20}
              stroke={1.5}
              aria-hidden
              className="text-surface-dark-muted shrink-0"
            />
            <h3 className="text-base md:text-lg font-medium text-surface-dark-foreground">
              {item.title}
            </h3>
          </div>
        </motion.div>

        {/* Expanded layer — as wide as its text needs, capped at the list
            column (the @container in ProjectsGrid) */}
        <motion.div
          ref={expandedRef}
          className="absolute left-0 top-0 w-max max-w-[100cqw] p-6"
          initial={false}
          animate={{ opacity: isExpanded ? 1 : 0 }}
          transition={layerTransition(isExpanded)}
          aria-hidden={!isExpanded}
          inert={!isExpanded}
        >
          <div className="flex flex-col gap-4">
            <span className="text-base md:text-lg font-medium text-surface-dark-foreground">
              {item.title}
              {(item.previewSubtitle || item.subtitle) && (
                <>
                  .{' '}
                  <span className="text-base md:text-lg font-thin text-surface-dark-foreground text-balance">
                    {item.previewSubtitle || item.subtitle}
                  </span>
                </>
              )}
            </span>

            {item.href && (
              <motion.div
                initial={false}
                animate={{ opacity: isExpanded ? 1 : 0 }}
                transition={
                  isExpanded
                    ? {
                        ...CROSSFADE.IN,
                        delay: CROSSFADE.IN.delay + STAGGER.DELAY,
                      }
                    : CROSSFADE.OUT
                }
              >
                <Link
                  href={item.href}
                  className="w-fit text-sm text-surface-dark-foreground hover:text-accent-foreground transition-colors duration-200 flex items-center gap-2"
                  onClick={e => e.stopPropagation()}
                >
                  View Project{' '}
                  <motion.span
                    aria-hidden
                    className="inline-block"
                    animate={{ x: isHovering ? 4 : 0 }}
                    transition={{ duration: DURATION.FAST, ease: EASING.ENTER }}
                  >
                    <IconArrowRight
                      size={16}
                      stroke={1.5}
                      className="inline mb-1"
                    />
                  </motion.span>
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  }
);

ProjectCardDesktop.displayName = 'ProjectCardDesktop';

export default ProjectCardDesktop;
