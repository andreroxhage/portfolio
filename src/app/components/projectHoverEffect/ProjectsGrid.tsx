import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { projects, ideas } from '@/app/data';
import { Project } from '@/app/types';
import ProjectCardDesktop from '@/app/components/projectHoverEffect/ProjectCardDesktop';
import {
  preloadTopNVideos,
  prioritizeVideo,
  useVideo,
} from '@/app/hooks/useVideo';
import LoadingScreen from '@/app/components/projectHoverEffect/LoadingScreen';
import { motion, AnimatePresence } from 'framer-motion';
import { useQueryClient } from '@tanstack/react-query';
import ImageFader from '../ImageFader';

const ProjectGrid = () => {
  const queryClient = useQueryClient();

  const allItems = useMemo(
    () =>
      [...(projects as Project[]), ...(ideas as Project[])].sort((a, b) => {
        const orderA = a.order ?? 999;
        const orderB = b.order ?? 999;
        return orderA - orderB;
      }),
    []
  );

  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(
    null
  );
  const [isVideosLoaded, setIsVideosLoaded] = useState(false);

  useEffect(() => {
    const noImageFader = (item: Project) =>
      !item.imageFader || item.imageFader.length === 0;

    const itemsNeedingVideos = allItems.filter(noImageFader);

    const identifiers = itemsNeedingVideos
      .map(item => item.projectSlug || (item as any).id)
      .filter(Boolean);

    const firstProject = allItems[0];
    const firstProjectId = firstProject
      ? firstProject.projectSlug || (firstProject as any).id
      : null;

    // Determine how many of the top 3 require video
    const top3 = allItems.slice(0, 3);
    const top3VideoCount = top3.filter(noImageFader).length;

    // If no videos exist at all, show content immediately
    if (identifiers.length === 0) {
      setExpandedProjectId(firstProjectId);
      setIsVideosLoaded(true);
      return;
    }

    // If none of the top 3 need videos, show content and start background loading
    if (top3VideoCount === 0) {
      setExpandedProjectId(firstProjectId);
      setIsVideosLoaded(true);
      preloadTopNVideos(identifiers, queryClient, 0).catch(err => {
        console.error('Background video preload failed:', err);
      });
      return;
    }

    // Preload top 3 video blobs (or fewer, depending on how many top 3 need video)
    preloadTopNVideos(identifiers, queryClient, top3VideoCount)
      .catch(err => {
        console.error('Top 3 videos preload failed:', err);
      })
      .finally(() => {
        setExpandedProjectId(firstProjectId);
        setIsVideosLoaded(true);
      });
  }, [allItems, queryClient]);

  const handleCardClick = useCallback(
    (itemId: string) => {
      // Prioritize video preload for clicked item
      prioritizeVideo(itemId, queryClient).catch(err => {
        console.error('Prioritize video failed:', itemId, err);
      });
      setExpandedProjectId(itemId);
    },
    [queryClient]
  );

  return (
    <>
      <AnimatePresence>{!isVideosLoaded && <LoadingScreen />}</AnimatePresence>

      {/* Main Content */}
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
              item =>
                (item.projectSlug || (item as any).id) === expandedProjectId
            )}
          />
        </div>
      </div>
    </>
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
  const { video_url: videoUrl } = useVideo(itemIdentifier || '', true);
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
                  className={`${shouldRound ? 'rounded-[40px]' : ''} overflow-hidden`}
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
                  className={`shadow-xl ${shouldRound ? 'rounded-[40px]' : ''}`}
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
