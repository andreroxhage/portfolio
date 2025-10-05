import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Project } from '@/app/types';
import { PlusIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface ProjectCardDesktopProps {
  project: Project;
  isExpanded: boolean;
  onClick: () => void;
}

const ProjectCardDesktop: React.FC<ProjectCardDesktopProps> = React.memo(
  ({ project, isExpanded, onClick }) => {
    const hasProjectSlug = 'projectSlug' in project && project.projectSlug;

    const handleClick = () => {
      onClick();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
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
        className="bg-gray-900 border-white/10 rounded-4xl hover:bg-gray-800 cursor-pointer transition-all duration-150 overflow-hidden w-fit"
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
              type: 'spring',
              stiffness: 250,
              damping: 28,
              mass: 0.8,
            },
            opacity: {
              duration: isExpanded ? 0 : 0.82,
              ease: [0.4, 0, 0.2, 1],
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
              type: 'spring',
              stiffness: 200,
              damping: 24,
              mass: 1.2,
            },
            opacity: {
              duration: isExpanded ? 0.6 : 0,
              ease: [0.4, 0, 0.2, 1],
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
                    ease: [0.4, 0, 0.2, 1],
                    delay: isExpanded ? 0.38 : 0,
                  }}
                >
                  <Link
                    href={`/projects/${project.projectSlug}`}
                    className="text-sm text-gray-100 hover:text-secondary-green-darker transition-colors duration-200"
                    onClick={e => e.stopPropagation()}
                  >
                    View Project <ArrowRightIcon className="w-4 h-4 inline" />
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
