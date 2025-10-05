import { projects, ideas } from '@/app/data';
import { Project } from '@/app/types';
import { AnimatePresence } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import GifDialogMobile from './VideoDialogMobile';
import ProjectCard from './ProjectCard';
import { preloadVideos } from '@/app/hooks/useVideo';
import { useQueryClient } from '@tanstack/react-query';

const ProjectGridMobile = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Project | null>(null);

  const allItems = useMemo(() => {
    return [...(projects as Project[]), ...ideas].sort((a, b) => {
      const orderA = a.order ?? 999;
      const orderB = b.order ?? 999;
      return orderA - orderB;
    });
  }, []);

  // Preload all videos in the background for instant mobile dialog opens
  useEffect(() => {
    const identifiers = allItems
      .map(item => {
        if ('projectSlug' in item && item.projectSlug) {
          return item.projectSlug;
        }
        if ('id' in item && item.id) {
          return item.id;
        }
        return null;
      })
      .filter((id): id is string => Boolean(id));

    preloadVideos(identifiers, queryClient).catch(err => {
      console.error('Mobile video preload failed:', err);
    });
  }, [allItems, queryClient]);

  return (
    <div className="flex flex-col h-full justify-between items-center pb-12 flex-grow">
      <div className="flex flex-col gap-12 pb-24 pt-12 w-full h-full overflow-y-auto">
        <div className="flex flex-col gap-4">
          {allItems.map((item, index) => {
            const isProject = 'projectSlug' in item && item.projectSlug;
            return (
              <button
                key={index}
                className={
                  isProject
                    ? 'cursor-pointer text-left'
                    : 'cursor-default text-left'
                }
                onClick={() => {
                  setDialogOpen(true);
                  setCurrentItem(item);
                }}
              >
                <ProjectCard project={item} />
              </button>
            );
          })}
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
