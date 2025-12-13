import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { projects, ideas } from '@/app/data';
import { Project } from '@/app/types';
import ProjectCardDesktop from '@/app/components/projectHoverEffect/ProjectCardDesktop';
import { useVideo } from '@/app/hooks/useVideo';
import { motion, AnimatePresence } from 'framer-motion';
import ImageFader from '../ImageFader';

const ProjectGrid = () => {
  const allItems = useMemo(
    () =>
      [...(projects as Project[]), ...(ideas as Project[])].sort((a, b) => {
        const orderA = a.order ?? 999;
        const orderB = b.order ?? 999;
        return orderA - orderB;
      }),
    []
  );

  const firstProject = allItems[0];
  const firstProjectId = firstProject
    ? firstProject.projectSlug || (firstProject as any).id
    : null;

  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(
    firstProjectId
  );

  const handleCardClick = useCallback((itemId: string) => {
    setExpandedProjectId(itemId);
  }, []);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full py-12">
        <motion.div
          className="md:col-span-5 flex flex-col gap-6 justify-center"
          layout
        >
          {allItems.map(item => {
            const itemId = item.projectSlug || (item as any).id;
            const isExpanded = expandedProjectId === itemId;

            return (
              <ProjectCardDesktop
                key={itemId || item.title}
                project={item}
                isExpanded={isExpanded}
                onClick={() => handleCardClick(itemId)}
              />
            );
          })}
        </motion.div>

        <RightPreviewPanel
          itemIdentifier={expandedProjectId || ''}
          isActive={!!expandedProjectId}
          currentProject={allItems.find(
            item => (item.projectSlug || (item as any).id) === expandedProjectId
          )}
        />
      </div>
    </div>
  );
};

export default ProjectGrid;

const RightPreviewPanel = ({
  itemIdentifier,
  isActive,
  currentProject,
}: {
  itemIdentifier: string;
  isActive: boolean;
  currentProject?: Project;
}) => {
  const { video_url: videoUrl } = useVideo(itemIdentifier || '');
  const [prevVideoUrl, setPrevVideoUrl] = useState<string>('');
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (videoUrl && videoUrl !== prevVideoUrl) {
      setPrevVideoUrl(videoUrl);
      setIsFirstLoad(false);
    }
  }, [videoUrl, prevVideoUrl]);

  const hasImageFader =
    currentProject?.imageFader && currentProject.imageFader.length > 0;
  const showPanel =
    isActive && !!itemIdentifier && (!!videoUrl || hasImageFader);
  const shouldRound = currentProject?.roundedCorners !== false;

  const easings = {
    videoTransition: [0.45, 0.0, 0.15, 1] as const,
  };

  return (
    <div className="hidden md:block md:col-span-7">
      <div className="sticky top-28 md:top-36 h-[70vh] flex items-center justify-center p-12">
        <AnimatePresence mode="wait">
          {showPanel && (
            <>
              {hasImageFader ? (
                <motion.div
                  key={itemIdentifier}
                  className={`${shouldRound ? 'rounded-[40px] corner-squircle' : ''} overflow-hidden`}
                  initial={{ opacity: 0, y: -64 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 64 }}
                  transition={{
                    duration: isFirstLoad ? 0.6 : 0.5,
                    ease: easings.videoTransition,
                  }}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                  }}
                >
                  <ImageFader
                    images={currentProject.imageFader!.map(src => src)}
                    intervalTime={currentProject.intervalTime || 5000}
                  />
                </motion.div>
              ) : (
                <motion.video
                  key={itemIdentifier}
                  src={videoUrl}
                  className={`shadow-xl ${shouldRound ? 'rounded-[40px] corner-squircle' : ''}`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  initial={{ opacity: 0, y: -64 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 64 }}
                  transition={{
                    duration: isFirstLoad ? 0.6 : 0.5,
                    ease: easings.videoTransition,
                  }}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                  }}
                />
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
