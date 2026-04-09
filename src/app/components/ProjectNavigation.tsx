import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { projectRegistry } from '@/app/data/projects';

interface ProjectNavigationProps {
  currentProjectSlug: string;
}

const ProjectNavigation: React.FC<ProjectNavigationProps> = ({
  currentProjectSlug,
}) => {
  const currentIndex = projectRegistry.findIndex(
    p => p.projectSlug === currentProjectSlug
  );

  const prevProject =
    currentIndex > 0
      ? projectRegistry[currentIndex - 1]
      : projectRegistry[projectRegistry.length - 1];

  const nextProject =
    currentIndex < projectRegistry.length - 1
      ? projectRegistry[currentIndex + 1]
      : projectRegistry[0];

  return (
    <motion.div
      className="w-full border-t border-border"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="max-w-2xl mx-auto px-4 py-8 flex justify-between items-center">
        <Link
          href={`/projects/${prevProject.projectSlug}`}
          className="group flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          <motion.div whileHover={{ x: -4 }} transition={{ duration: 0.2 }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-foreground group-hover:text-foreground group-hover:scale-110 transition-all duration-300 mr-[-2px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </motion.div>
          <div className="text-left">
            <div className="text-sm text-muted-foreground">
              Previous Project
            </div>
            <label
              className="font-medium duration-300"
              style={{ color: prevProject.titleColor }}
            >
              {prevProject.title}
            </label>
          </div>
        </Link>

        <Link
          href={`/projects/${nextProject.projectSlug}`}
          className="group flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Next Project</div>
            <label
              className="font-medium duration-300"
              style={{ color: nextProject.titleColor }}
            >
              {nextProject.title}
            </label>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-foreground group-hover:text-foreground group-hover:scale-110 transition-all duration-300 ml-[-2px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectNavigation;
