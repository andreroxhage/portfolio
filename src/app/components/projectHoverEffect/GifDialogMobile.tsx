import React, { useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Project } from '@/app/types';

interface GifDialogMobileProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectImage = memo(
  ({ src, alt, onLoad }: { src: string; alt: string; onLoad: () => void }) => (
    <div className="relative w-[calc(100%-32px)] max-w-[80vw] max-h-[80vh] mx-auto rounded-[40px] overflow-hidden">
      <div className="w-full h-full relative">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          unoptimized
          onLoad={onLoad}
          priority
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  )
);

ProjectImage.displayName = 'ProjectImage';

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

  const contentVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: { scale: 0.95, opacity: 0 },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          variants={dialogVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={handleClose}
        >
          <motion.div
            variants={contentVariants}
            className="relative w-full"
            onClick={e => e.stopPropagation()}
          >
            <ProjectImage
              src={project.videoSrc}
              alt={`${project.title} preview`}
              onLoad={() => {}}
            />
          </motion.div>

          <div className="absolute bottom-3 px-3 flex items-center justify-between w-full">
            <button
              onClick={handleClose}
              className="p-3 rounded-full overflow-hidden relative"
              aria-label="Close dialog"
            >
              <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />
              <XMarkIcon className="w-8 h-8 text-white relative z-10 " />
            </button>{' '}
            {project?.projectSlug && (
              <Link
                href={`/projects/${project.projectSlug}`}
                className="p-3 rounded-full overflow-hidden relative"
                aria-label="Visit Project"
              >
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />
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
