import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Project } from '@/app/types';
import { PlusIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { EASING, BUTTON_PRESS_SCALE, DURATION } from '@/app/lib/motion';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';

interface ProjectCardDesktopProps {
  project: Project;
  isExpanded: boolean;
  onClick: () => void;
}

const ProjectCardDesktop: React.FC<ProjectCardDesktopProps> = React.memo(
  ({ project, isExpanded, onClick }) => {
    const hasProjectSlug = 'projectSlug' in project && project.projectSlug;
    const router = useRouter();
    const prefersReducedMotion = useReducedMotion();
    const [isHovering, setIsHovering] = useState(false);

    const handleClick = () => {
      if (isExpanded && hasProjectSlug) {
        if (typeof window !== 'undefined') {
          try {
            sessionStorage.setItem('fromProjects', '1');
          } catch (_e) {
            /* noop */
          }
        }
        router.push(`/projects/${project.projectSlug}`);
        return;
      }
      onClick();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (isExpanded && hasProjectSlug) {
          if (typeof window !== 'undefined') {
            try {
              sessionStorage.setItem('fromProjects', '1');
            } catch (_e) {
              /* noop */
            }
          }
          router.push(`/projects/${project.projectSlug}`);
          return;
        }
        onClick();
      }
    };

    return (
      <motion.div
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={isExpanded}
        whileTap={{ scale: BUTTON_PRESS_SCALE }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="bg-gray-900 border-white/10 rounded-[50px] corner-squircle hover:bg-gray-800 cursor-pointer transition-all duration-150 overflow-hidden w-fit"
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
              <PlusIcon className="w-5 h-5 text-gray-300 flex-shrink-0" />
              <h3 className="text-base md:text-lg font-medium text-gray-100 w-fit">
                {project.title}
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
              <span className="text-base md:text-lg font-medium text-gray-100">
                {project.title}
                {project.subtitle && (
                  <>
                    .{' '}
                    <span className="text-base md:text-lg font-thin text-gray-200">
                      {project.subtitle}
                    </span>
                  </>
                )}
              </span>

              {hasProjectSlug && (
                <motion.div
                  animate={{ opacity: isExpanded ? 1 : 0 }}
                  transition={{
                    duration: 0.4,
                    ease: EASING.ENTER,
                    delay: isExpanded ? 0.38 : 0,
                  }}
                >
                  <Link
                    href={`/projects/${project.projectSlug}`}
                    className="text-sm text-gray-100 hover:text-secondary-green-darker transition-colors duration-200 flex items-center gap-2"
                    onClick={e => e.stopPropagation()}
                  >
                    View Project{' '}
                    <motion.span
                      aria-hidden
                      animate={{
                        x: isExpanded && hasProjectSlug && isHovering ? 4 : 0,
                      }}
                      transition={{
                        duration: prefersReducedMotion ? 0.01 : DURATION.FAST,
                        ease: EASING.ENTER,
                      }}
                      style={{ display: 'inline-block' }}
                    >
                      <ArrowRightIcon className="w-4 h-4 inline mb-1" />
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
