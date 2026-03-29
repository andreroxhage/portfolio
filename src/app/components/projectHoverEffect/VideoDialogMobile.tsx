'use client';

import React, { useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import type { GridItem } from '@/app/types';
import { useVideo } from '@/app/hooks/useVideo';
import VideoLoadingAnimation from '../VideoLoadingAnimation';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';
import ImageFader from '../ImageFader';

interface GifDialogMobileProps {
  item: GridItem;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectVideo = memo(
  ({
    identifier,
    onLoad,
    shouldRound = true,
    imageFader,
    intervalTime,
  }: {
    identifier: string;
    onLoad: () => void;
    shouldRound?: boolean;
    imageFader?: string[];
    intervalTime?: number;
  }) => {
    const { video_url: videoUrl, loading } = useVideo(identifier);
    const hasImageFader = imageFader && imageFader.length > 0;

    return (
      <div
        className={`relative mx-auto max-w-[60vw] w-full overflow-hidden ${shouldRound ? 'rounded-[40px] corner-squircle' : ''}`}
      >
        <div className="relative flex h-full w-full items-center justify-center">
          {hasImageFader ? (
            <ImageFader
              images={imageFader}
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

const GifDialogMobile = ({ item, isOpen, onClose }: GifDialogMobileProps) => {
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

  const identifier = item.videoIdentifier ?? item.id;
  const shouldRound = item.roundedCorners !== false;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          variants={dialogVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-surface-dark/90 p-4"
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
              imageFader={item.imageFader}
              intervalTime={item.intervalTime}
            />
          </motion.div>

          <div className="absolute bottom-5 flex-row flex items-center gap-3 px-4 py-2 rounded-[16px] corner-squircle bg-surface-dark/30 inset-shadow-border-glow shadow-lg">
            <p className="text-surface-dark-foreground text-center text-sm">
              {item.title}
            </p>
          </div>

          <div className="absolute bottom-3 px-3 flex items-center justify-between w-full">
            <button
              onClick={handleClose}
              className="p-3 rounded-full overflow-hidden relative bg-surface-dark/30 inset-shadow-border-glow shadow-lg"
              aria-label="Close dialog"
            >
              <XMarkIcon className="w-8 h-8 text-surface-dark-foreground relative z-10" />
            </button>
            {item.href && (
              <Link
                href={item.href}
                className="p-3 rounded-full overflow-hidden relative bg-surface-dark/30 inset-shadow-border-glow shadow-lg"
                aria-label="Visit Project"
              >
                <ArrowUpRightIcon className="w-8 h-8 text-surface-dark-foreground relative z-10" />
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(GifDialogMobile);
