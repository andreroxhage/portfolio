import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { projects } from '@/app/data/projects';
import { ideas } from '@/app/data/ideas';
import { GridItem, galleryItemToGridItem } from '@/app/types';
import type { GalleryItem } from '@/app/types';
import ProjectCardDesktop from '@/app/components/projectHoverEffect/ProjectCardDesktop';
import { useVideo } from '@/app/hooks/useVideo';
import { motion, AnimatePresence } from 'framer-motion';
import ImageFader from '../ImageFader';

interface ProjectGridProps {
  items?: GridItem[];
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ items: itemsProp }) => {
  const allItems = useMemo(() => {
    if (itemsProp) {
      return itemsProp;
    }
    const gallery: GalleryItem[] = [...projects, ...ideas];
    return gallery.map(galleryItemToGridItem).sort((a, b) => a.order - b.order);
  }, [itemsProp]);

  const firstItem = allItems[0];

  const [expandedItemId, setExpandedItemId] = useState<string | null>(
    firstItem?.id ?? null
  );

  const handleCardClick = useCallback((itemId: string) => {
    setExpandedItemId(itemId);
  }, []);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full py-12">
        <motion.div
          className="md:col-span-5 flex flex-col gap-6 justify-center"
          layout
        >
          {allItems.map(item => {
            const isExpanded = expandedItemId === item.id;

            return (
              <ProjectCardDesktop
                key={item.id}
                item={item}
                isExpanded={isExpanded}
                onClick={() => handleCardClick(item.id)}
              />
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

  return (
    <div className="hidden md:block md:col-span-7">
      <div className="sticky top-28 md:top-36 h-[70vh] flex items-center justify-center p-12">
        <AnimatePresence mode="wait">
          {showPanel && (
            <>
              {hasImageFader ? (
                <motion.div
                  key={identifier}
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
                    images={item!.imageFader!.map(src => src)}
                    intervalTime={item!.intervalTime || 5000}
                  />
                </motion.div>
              ) : (
                <motion.video
                  key={identifier}
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
