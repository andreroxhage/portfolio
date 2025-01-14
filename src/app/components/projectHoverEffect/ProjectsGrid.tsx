import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/app/data';
import Link from 'next/link';
import GifDialog from '@/app/components/projectHoverEffect/GifDialog';
import { Project } from '@/app/types';
import ProjectCard from '@/app/components/projectHoverEffect/ProjectCard';

const ProjectGrid = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [hoverKey, setHoverKey] = useState(0);

  const handleMouseEnter = (project: Project) => {
    setIsLoading(true);
    setIsHovered(true);
    setCurrentProject(project);
    setHoverKey(prevKey => prevKey + 1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTimeout(() => {
      if (!isHovered) {
        setCurrentProject(null);
        setIsLoading(false);
      }
    }, 100);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="flex flex-col h-full justify-between items-center pb-12 flex-grow">
      <div className="grid grid-cols-10 gap-4 pb-24 pt-12 w-full h-full overflow-y-auto">
        {projects.map((project, index) => (
          <Link
            key={index}
            href={`/projects/${project.projectSlug}`}
            onMouseEnter={() => handleMouseEnter(project)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            className="col-span-5"
          >
            <ProjectCard project={project} />
          </Link>
        ))}
        <AnimatePresence>
          {isHovered && currentProject && (
            <GifDialog
              key={`dialog-${hoverKey}`}
              gifSrc={currentProject.gifSrc}
              mousePosition={mousePosition}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {currentProject && isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="hover:bg-white flex bg-primary-whiteish/60 p-3 px-4 gap-8 text-base rounded-3xl group transition-all duration-150"
          >
            <label className="font-medium text-primary-grey">
              {currentProject.title}
            </label>
            <label className="text-primary-grey-brighter">
              {currentProject.date}
            </label>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectGrid;
