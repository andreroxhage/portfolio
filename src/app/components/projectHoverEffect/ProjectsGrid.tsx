'use client';

import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { projects } from '@/app/data/projects';
import { ideas } from '@/app/data/ideas';
import { GridItem, galleryItemToGridItem } from '@/app/types';
import type { GalleryItem } from '@/app/types';
import ProjectCardDesktop from '@/app/components/projectHoverEffect/ProjectCardDesktop';
import { useVideo, prefetchVideo } from '@/app/hooks/useVideo';
import { useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import ImageFader from '../ImageFader';
import { STAGGER } from '@/app/lib/motion';

interface ProjectGridProps {
  items?: GridItem[];
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ items: itemsProp }) => {
  const allItems = useMemo(() => {
    if (itemsProp) {
      return itemsProp;
    }
    const gallery: GalleryItem[] = [...projects, ...ideas].filter(
      item => item.showInPreview !== false
    );
    return gallery.map(galleryItemToGridItem).sort((a, b) => a.order - b.order);
  }, [itemsProp]);

  const firstItem = allItems[0];

  // Prefetch all video URLs so they're cached before the user clicks
  const queryClient = useQueryClient();
  useEffect(() => {
    allItems.forEach(item => {
      const id = item.videoIdentifier ?? item.id;
      if (id && !item.imageFader?.length) {
        prefetchVideo(queryClient, id);
      }
    });
  }, [allItems, queryClient]);

  const [expandedItemId, setExpandedItemId] = useState<string | null>(
    firstItem?.id ?? null
  );

  const handleCardClick = useCallback((itemId: string) => {
    setExpandedItemId(itemId);
  }, []);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full py-24">
        <motion.div
          className="md:col-span-5 flex flex-col gap-6 justify-center pl-0 md:pl-2"
          layout
        >
          {allItems.map((item, index) => {
            const isExpanded = expandedItemId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1],
                  delay: index * STAGGER.DELAY,
                }}
              >
                <ProjectCardDesktop
                  item={item}
                  isExpanded={isExpanded}
                  onClick={() => handleCardClick(item.id)}
                />
              </motion.div>
            );
          })}
        </motion.div>

        <RightPreviewPanel
          item={allItems.find(item => item.id === expandedItemId)}
          isActive={!!expandedItemId}
        />
      </div>
    </div>
  );
};

export default ProjectGrid;

const RightPreviewPanel = ({
  item,
  isActive,
}: {
  item?: GridItem;
  isActive: boolean;
}) => {
  const identifier = item?.videoIdentifier ?? item?.id ?? '';
  const { video_url: videoUrl } = useVideo(identifier);
  const [prevVideoUrl, setPrevVideoUrl] = useState<string>('');
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reset videoReady when switching items
  useEffect(() => {
    setVideoReady(false);
  }, [identifier]);

  useEffect(() => {
    if (videoUrl && videoUrl !== prevVideoUrl) {
      setPrevVideoUrl(videoUrl);
      setIsFirstLoad(false);
    }
  }, [videoUrl, prevVideoUrl]);

  const hasImageFader = item?.imageFader && item.imageFader.length > 0;
  const showPanel = isActive && !!identifier && (!!videoUrl || hasImageFader);
  const shouldRound = item?.roundedCorners !== false;

  const easings = {
    videoTransition: [0.45, 0.0, 0.15, 1] as const,
  };

  const sharedStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    width: 'auto' as const,
    height: 'auto' as const,
  };

  const roundingClass = shouldRound ? 'rounded-[40px] corner-squircle' : '';

  return (
    <div className="hidden md:block md:col-span-7">
      <div className="top-28 md:top-36 h-[70vh] flex items-center justify-center p-12">
        <AnimatePresence mode="wait">
          {showPanel && (
            <>
              {hasImageFader ? (
                <motion.div
                  key={identifier}
                  className={`overflow-hidden ${roundingClass}`}
                  initial={{ opacity: 0, y: -64 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{
                    duration: isFirstLoad ? 0.6 : 0.5,
                    ease: easings.videoTransition,
                  }}
                  style={sharedStyle}
                >
                  <ImageFader
                    images={item!.imageFader!.map(src => src)}
                    intervalTime={item!.intervalTime || 5000}
                  />
                </motion.div>
              ) : (
                videoUrl && (
                  <motion.video
                    key={identifier}
                    ref={videoRef}
                    src={videoUrl}
                    poster={item?.posterImage}
                    className={`${roundingClass} ${!videoReady ? 'video-shimmer' : ''}`}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    initial={{ opacity: 0, y: -64 }}
                    animate={{ opacity: videoReady ? 1 : 0, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{
                      duration: isFirstLoad ? 0.6 : 0.5,
                      ease: easings.videoTransition,
                    }}
                    onLoadedData={() => {
                      const v = videoRef.current;
                      if (v) {
                        v.play()
                          .then(() => setVideoReady(true))
                          .catch(() => setVideoReady(true));
                      }
                    }}
                    style={sharedStyle}
                  />
                )
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
