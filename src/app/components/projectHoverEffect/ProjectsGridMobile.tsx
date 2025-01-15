import { projects } from '@/app/data';
import { Project } from '@/app/types';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import GifDialogMobile from './VideoDialogMobile';
import ProjectCard from './ProjectCard';

const ProjectGridMobile = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  return (
    <div className="flex flex-col h-full justify-between items-center pb-12 flex-grow">
      <div className="grid grid-cols-1 gap-4 pb-24 pt-12 w-full h-full overflow-y-auto">
        {projects.map((project, index) => (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => {
              setDialogOpen(true);
              setCurrentProject(project);
            }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
      <AnimatePresence>
        {dialogOpen && currentProject && (
          <GifDialogMobile
            project={currentProject}
            isOpen={dialogOpen}
            onClose={() => setDialogOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectGridMobile;
