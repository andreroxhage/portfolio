import { projects, ideas } from '@/app/data';
import { Project } from '@/app/types';
import { AnimatePresence } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import GifDialogMobile from './VideoDialogMobile';
import ProjectCard from './ProjectCard';
import { preloadTopNVideos, prioritizeVideo } from '@/app/hooks/useVideo';
import { useQueryClient } from '@tanstack/react-query';
import LoadingScreen from '@/app/components/projectHoverEffect/LoadingScreen';

const ProjectGridMobile = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Project | null>(null);
  const [isVideosLoaded, setIsVideosLoaded] = useState(false);

  const allItems = useMemo(() => {
    return [...(projects as Project[]), ...ideas].sort((a, b) => {
      const orderA = a.order ?? 999;
      const orderB = b.order ?? 999;
      return orderA - orderB;
    });
  }, []);

  useEffect(() => {
    const noImageFader = (item: Project) =>
      !item.imageFader || item.imageFader.length === 0;

    const itemsNeedingVideos = allItems.filter(noImageFader);

    const identifiers = itemsNeedingVideos
      .map(item => {
        if ('projectSlug' in item && (item as any).projectSlug) {
          return (item as any).projectSlug as string;
        }
        if ('id' in item && (item as any).id) {
          return (item as any).id as string;
        }
        return null;
      })
      .filter((id): id is string => Boolean(id));

    const top3 = allItems.slice(0, 3);
    const top3VideoCount = top3.filter(noImageFader).length;

    if (identifiers.length === 0) {
      setIsVideosLoaded(true);
      return;
    }

    if (top3VideoCount === 0) {
      setIsVideosLoaded(true);
      preloadTopNVideos(identifiers, queryClient, 0).catch(err => {
        console.error('Mobile background video preload failed:', err);
      });
      return;
    }

    preloadTopNVideos(identifiers, queryClient, top3VideoCount)
      .catch(err => {
        console.error('Mobile top 3 videos preload failed:', err);
      })
      .finally(() => {
        setIsVideosLoaded(true);
      });
  }, [allItems, queryClient]);

  return (
    <div className="flex flex-col h-full justify-between items-center pb-12 flex-grow">
      <AnimatePresence>{!isVideosLoaded && <LoadingScreen />}</AnimatePresence>
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
                  // Prioritize the clicked item if it isn't loaded yet
                  const id =
                    ('projectSlug' in item && item.projectSlug) ||
                    (('id' in item && item.id) as string);
                  if (id) {
                    prioritizeVideo(id, queryClient).catch(err => {
                      console.error('Mobile prioritize video failed:', id, err);
                    });
                  }
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
