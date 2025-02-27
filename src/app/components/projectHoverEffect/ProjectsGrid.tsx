import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, ideas } from '@/app/data';
import Link from 'next/link';
import { Project } from '@/app/types';
import ProjectCard from '@/app/components/projectHoverEffect/ProjectCard';
import VideoDialog from './VideoDialog';

const ProjectGrid = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentItem, setCurrentItem] = useState<Project | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [hoverKey, setHoverKey] = useState(0);

  const handleMouseEnter = (item: Project) => {
    setIsLoading(true);
    setIsHovered(true);
    setCurrentItem(item);
    setHoverKey(prevKey => prevKey + 1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTimeout(() => {
      if (!isHovered) {
        setCurrentItem(null);
        setIsLoading(false);
      }
    }, 100);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const renderItems = (items: Project[], isProject: boolean) => (
    <div className="grid grid-cols-10 gap-4 w-full">
      {items.map(item => {
        if (isProject && item.projectSlug) {
          return (
            <Link
              key={item.title}
              href={`/projects/${item.projectSlug}`}
              onMouseEnter={() => handleMouseEnter(item)}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
              className="col-span-5"
            >
              <ProjectCard project={item} />
            </Link>
          );
        }

        return (
          <button
            key={item.title}
            onMouseEnter={() => handleMouseEnter(item)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onClick={() => {}}
            aria-label={`View preview of ${item.title}`}
            className="col-span-5 text-left cursor-default"
          >
            <ProjectCard project={item} />
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="flex flex-col h-full justify-between items-center pb-12 flex-grow">
      <div className="flex flex-col gap-12 pb-24 pt-12 w-full h-full overflow-y-auto">
        <div className="flex flex-col gap-8">
          <h2 className="text-xl font-semibold text-primary-grey">Projects</h2>
          {renderItems(projects, true)}
        </div>

        {ideas.length > 0 && (
          <>
            <div className="w-full h-px bg-primary-grey/20" />
            <div className="flex flex-col gap-8">
              <h2 className="text-xl font-semibold text-primary-grey">Ideas</h2>
              {renderItems(ideas, false)}
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {isHovered && currentItem && (
          <VideoDialog
            key={`dialog-${hoverKey}`}
            videoSrc={currentItem.videoSrc}
            mousePosition={mousePosition}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentItem && isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="hover:bg-white flex bg-primary-whiteish/60 p-3 px-4 gap-8 text-base rounded-3xl group transition-all duration-150"
          >
            <div className="flex items-center gap-8">
              <label className="font-medium text-primary-grey">
                {currentItem.title}
              </label>
              <label className="text-primary-grey-brighter">
                {currentItem.date}
              </label>
            </div>
            {currentItem.projectSlug && (
              <div className="flex items-center gap-2 text-primary-grey-brighter">
                <span>|</span>
                <span className="text-sm">Click to read more</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectGrid;
