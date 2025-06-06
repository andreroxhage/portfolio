import { projects, ideas } from '@/app/data';
import { Project } from '@/app/types';
import { AnimatePresence } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import GifDialogMobile from './VideoDialogMobile';
import ProjectCard from './ProjectCard';
import { useProjectHover } from '../../contexts/ProjectHoverContext';

const ProjectGridMobile = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Project | null>(null);
  const { setIsProjectHovered } = useProjectHover();

  const projectsArray = useMemo(() => projects as Project[], []);
  const ideasArray = useMemo(() => ideas, []);

  // Update the global project hover state when the mobile dialog is open
  useEffect(() => {
    setIsProjectHovered(dialogOpen);
  }, [dialogOpen, setIsProjectHovered]);

  const renderItems = (items: Project[], isProject: boolean) => (
    <div className="grid grid-cols-1 gap-4 w-full">
      {items.map((item, index) => (
        <button
          key={index}
          className={
            isProject ? 'cursor-pointer text-left' : 'cursor-default text-left'
          }
          onClick={() => {
            setDialogOpen(true);
            setCurrentItem(item);
          }}
        >
          <ProjectCard project={item} />
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col h-full justify-between items-center pb-12 flex-grow">
      <div className="flex flex-col gap-12 pb-24 pt-12 w-full h-full overflow-y-auto">
        <div className="flex flex-col gap-4">
          {renderItems(projectsArray, true)}
          {renderItems(ideasArray, false)}
        </div>
      </div>

      <AnimatePresence>
        {dialogOpen && currentItem && (
          <GifDialogMobile
            project={currentItem}
            isOpen={dialogOpen}
            onClose={() => setDialogOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectGridMobile;
