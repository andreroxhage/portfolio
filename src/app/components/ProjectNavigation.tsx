import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Project {
  projectSlug: string;
  title: string;
  titleColor: string;
}

interface ProjectNavigationProps {
  projects: Project[];
  currentProjectSlug: string;
}

const ProjectNavigation: React.FC<ProjectNavigationProps> = ({
  projects,
  currentProjectSlug,
}) => {
  const currentIndex = projects.findIndex(
    p => p.projectSlug === currentProjectSlug
  );
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <motion.div
      className="w-full border-t border-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-8 flex justify-between items-center">
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.projectSlug}`}
            className="group flex items-center space-x-3 text-primary-grey-brighter hover:text-primary-grey-brightest transition-colors"
          >
            <motion.div whileHover={{ x: -4 }} transition={{ duration: 0.2 }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-primary-grey group-hover:text-primary-grey-brightest group-hover:scale-110 transition-all duration-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </motion.div>
            <div className="text-left">
              <div className="text-sm text-gray-500">Previous Project</div>
              <label className="font-medium text-primary-blackish group-hover:text-primary-grey duration-300">
                {prevProject.title}
              </label>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextProject ? (
          <Link
            href={`/projects/${nextProject.projectSlug}`}
            className="group flex items-center space-x-3 text-primary-grey-brighter hover:text-primary-grey-brightest transition-colors"
          >
            <div className="text-right">
              <div className="text-sm text-gray-500">Next Project</div>
              <label className="font-medium text-secondary-green-darker group-hover:text-secondary-green duration-300">
                {nextProject.title}
              </label>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-primary-grey group-hover:text-primary-grey-brightest group-hover:scale-110 transition-all duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </motion.div>
  );
};

export default ProjectNavigation;
