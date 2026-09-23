'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { GridItem } from '@/app/types';
import { IconPlus, IconArrowRight } from '@tabler/icons-react';
import { EASING, BUTTON_PRESS_SCALE, DURATION } from '@/app/lib/motion';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';

interface ProjectCardDesktopProps {
  item: GridItem;
  isExpanded: boolean;
  onClick: () => void;
}

const ProjectCardDesktop: React.FC<ProjectCardDesktopProps> = React.memo(
  ({ item, isExpanded, onClick }) => {
    const router = useRouter();
    const prefersReducedMotion = useReducedMotion();
    const [isHovering, setIsHovering] = useState(false);

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
        className="bg-surface-dark-card inset-shadow-border-glow shadow-hairline rounded-card-lg corner-squircle hover:bg-surface-dark-elevated cursor-pointer transition-colors duration-150 overflow-hidden w-fit"
      >
        {/* Collapsed Content - Hidden when expanded */}
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? 0 : 'auto',
            opacity: isExpanded ? 0 : 1,
            width: isExpanded ? 0 : 'auto',
          }}
          transition={{
            height: {
              duration: 0.3,
              ease: EASING.ENTER,
            },
            opacity: {
              duration: isExpanded ? 0 : 0.82,
              ease: EASING.ENTER,
              delay: isExpanded ? 0 : 0.16,
            },
          }}
          className="overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center gap-4">
              <IconPlus
                size={20}
                stroke={1.5}
                aria-hidden
                className="text-surface-dark-muted shrink-0"
              />
              <h3 className="text-base md:text-lg font-medium text-surface-dark-foreground w-fit">
                {item.title}
              </h3>
            </div>
          </div>
        </motion.div>

        {/* Expanded Content - Always in DOM, animated via height + opacity */}
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0,
            width: isExpanded ? 'auto' : 0,
          }}
          transition={{
            height: {
              duration: 0.4,
              ease: EASING.ENTER,
            },
            opacity: {
              duration: isExpanded ? 0.6 : 0,
              ease: EASING.ENTER,
              delay: isExpanded ? 0.32 : 0,
            },
          }}
          className="overflow-hidden"
        >
          <div className="p-6">
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
                  animate={{ opacity: isExpanded ? 1 : 0 }}
                  transition={{
                    duration: 0.4,
                    ease: EASING.ENTER,
                    delay: isExpanded ? 0.38 : 0,
                  }}
                >
                  <Link
                    href={item.href}
                    className="text-sm text-surface-dark-foreground hover:text-accent-foreground transition-colors duration-200 flex items-center gap-2 pr-[calc(theme(spacing.4)-2px)]"
                    onClick={e => e.stopPropagation()}
                  >
                    View Project{' '}
                    <motion.span
                      aria-hidden
                      initial={{ opacity: 0, x: -4 }}
                      animate={{
                        opacity: isExpanded ? 1 : 0,
                        x: isExpanded && isHovering ? 4 : isExpanded ? 0 : -4,
                      }}
                      transition={{
                        duration: prefersReducedMotion ? 0.01 : DURATION.FAST,
                        ease: EASING.ENTER,
                        delay: isExpanded ? 0.42 : 0,
                      }}
                      style={{ display: 'inline-block' }}
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
          </div>
        </motion.div>
      </motion.div>
    );
  }
);

ProjectCardDesktop.displayName = 'ProjectCardDesktop';

export default ProjectCardDesktop;
