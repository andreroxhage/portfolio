'use client';

import React, { useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Project } from '@/app/types';
import { useVideo } from '@/app/hooks/useVideo';
import VideoLoadingAnimation from '../VideoLoadingAnimation';
import ImageSlider from '../ImageSlider';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';

interface GifDialogMobileProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectVideo = memo(
  ({
    identifier,
    onLoad,
    shouldRound = true,
    imageSlider,
    intervalTime,
  }: {
    identifier: string;
    onLoad: () => void;
    shouldRound?: boolean;
    imageSlider?: any[];
    intervalTime?: number;
  }) => {
    const { video_url: videoUrl, loading } = useVideo(identifier);
    const hasImageSlider = imageSlider && imageSlider.length > 0;

    return (
      <div
        className={`relative mx-auto max-w-[60vw] w-full overflow-hidden ${shouldRound ? 'rounded-[40px]' : ''}`}
      >
        <div className="relative flex h-full w-full items-center justify-center">
          {hasImageSlider ? (
            <ImageSlider
              images={imageSlider}
              intervalTime={intervalTime || 5000}
            />
          ) : (
            <>
              <AnimatePresence>
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-30 flex items-center justify-center"
                  >
                    <VideoLoadingAnimation className="w-full h-full min-h-[100px]" />
                  </motion.div>
                )}
              </AnimatePresence>
              {videoUrl && (
                <video
                  key={videoUrl}
                  src={videoUrl}
                  className={`w-full h-full object-contain transition-opacity duration-300 ${
                    loading ? 'opacity-0' : 'opacity-100'
                  }`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  onLoadedData={() => {
                    onLoad();
                  }}
                />
              )}
            </>
          )}
        </div>
      </div>
    );
  }
);

ProjectVideo.displayName = 'ProjectVideo';

const GifDialogMobile = ({
  project,
  isOpen,
  onClose,
}: GifDialogMobileProps) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'auto';
      };
    }
  }, [isOpen]);

  const dialogVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const prefersReducedMotion = useReducedMotion();

  const contentVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: prefersReducedMotion
        ? { duration: 0.01 }
        : {
            type: 'spring',
            stiffness: 300,
            damping: 30,
          },
    },
    exit: { scale: 0.95, opacity: 0 },
  };

  if (!project.projectSlug && !project.id) {
    return null;
  }

  const identifier = (project.projectSlug ?? project.id) as string;
  const shouldRound = project.roundedCorners !== false;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          variants={dialogVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4"
          onClick={handleClose}
        >
          <motion.div
            variants={contentVariants}
            className="relative w-full"
            onClick={e => e.stopPropagation()}
          >
            <ProjectVideo
              identifier={identifier}
              onLoad={() => {}}
              shouldRound={shouldRound}
              imageSlider={project.imageSlider}
              intervalTime={project.intervalTime}
            />
          </motion.div>

          <div className="absolute bottom-5 flex-row flex items-center gap-3 px-4 py-2 rounded-2xl bg-gray-600/30 border border-white/10 shadow-lg">
            <p className="text-white text-center text-sm">{project.title}</p>
            <p className="text-white/70 text-sm text-center">{project.date}</p>
          </div>

          <div className="absolute bottom-3 px-3 flex items-center justify-between w-full">
            <button
              onClick={handleClose}
              className="p-3 rounded-full overflow-hidden relative bg-gray-600/30 border border-white/10 shadow-lg"
              aria-label="Close dialog"
            >
              <XMarkIcon className="w-8 h-8 text-white relative z-10" />
            </button>
            {project.projectSlug && (
              <Link
                href={`/projects/${project.projectSlug}`}
                className="p-3 rounded-full overflow-hidden relative bg-gray-600/30 border border-white/10 shadow-lg"
                aria-label="Visit Project"
              >
                <ArrowUpRightIcon className="w-8 h-8 text-white relative z-10" />
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(GifDialogMobile);
