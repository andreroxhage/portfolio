import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, ideas } from '@/app/data';
import Link from 'next/link';
import { Project } from '@/app/types';
import ProjectCard from '@/app/components/projectHoverEffect/ProjectCard';
import VideoDialog from './VideoDialog';
import { useProjectHover } from '../../contexts/ProjectHoverContext';
import { preloadVideos } from '@/app/hooks/useVideo';

const ProjectGrid = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentItem, setCurrentItem] = useState<Project | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [hoverKey, setHoverKey] = useState(0);
  const { setIsProjectHovered } = useProjectHover();

  const allItems = useMemo(
    () => [...(projects as Project[]), ...(ideas as Project[])],
    []
  );

  // Preload all videos
  useEffect(() => {
    const identifiers = allItems
      .map(item => item.projectSlug || (item as any).id)
      .filter(Boolean);

    preloadVideos(identifiers);
  }, [allItems]);

  useEffect(() => {
    const shouldShowPill = currentItem && isHovered;
    setIsProjectHovered(!!shouldShowPill);
  }, [currentItem, isHovered, setIsProjectHovered]);

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

  const renderItem = (item: Project) => {
    const commonProps = {
      onMouseEnter: () => handleMouseEnter(item),
      onMouseLeave: handleMouseLeave,
      onMouseMove: handleMouseMove,
      className: 'col-span-5',
    };

    if ('projectSlug' in item && item.projectSlug) {
      return (
        <Link
          key={item.title}
          {...commonProps}
          href={`/projects/${item.projectSlug}`}
        >
          <ProjectCard project={item} />
        </Link>
      );
    }

    return (
      <button
        key={item.title}
        {...commonProps}
        onClick={() => {}}
        aria-label={`View preview of ${item.title}`}
      >
        <ProjectCard project={item} />
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full justify-between items-center pb-6 flex-grow">
      <div className="flex flex-col gap-12 pb-24 pt-12 w-full h-full overflow-y-auto">
        <div className="grid grid-cols-10 gap-4 w-full">
          {allItems.map(item => renderItem(item))}
        </div>
      </div>

      <AnimatePresence>
        {isHovered &&
          currentItem &&
          (currentItem.projectSlug || currentItem.id) && (
            <VideoDialog
              key={`dialog-${hoverKey}`}
              identifier={currentItem.projectSlug || (currentItem.id as string)}
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
            className="hover:bg-white flex bg-primary-whiteish/60 p-3 px-4 gap-8 text-base rounded-3xl group transition-all duration-150 z-40"
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
