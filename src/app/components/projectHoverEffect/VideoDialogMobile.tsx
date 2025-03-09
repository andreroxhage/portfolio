import React, { useEffect, useCallback, memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Project } from '@/app/types';

interface GifDialogMobileProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectVideo = memo(
  ({ identifier, onLoad }: { identifier: string; onLoad: () => void }) => {
    const [videoUrl, setVideoUrl] = useState<string>('');

    useEffect(() => {
      fetch(`/api/videos?project=${identifier}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) {
            setVideoUrl(data[0].video_url);
          }
        })
        .catch(error => console.error('Error fetching video:', error));
    }, [identifier]);

    if (!videoUrl) {
      return null;
    }

    return (
      <div className="relative mx-auto w-[calc(100%-32px)] max-w-[80vw] max-h-[80vh] rounded-[40px] overflow-hidden bg-black">
        <div className="relative flex items-center justify-center w-full h-full">
          <video
            src={videoUrl}
            className="max-w-full max-h-full object-contain"
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={onLoad}
          />
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

  if (!project.projectSlug && !project.id) {
    return null;
  }

  const identifier = (project.projectSlug ?? project.id) as string;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          variants={dialogVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 p-4"
          onClick={handleClose}
        >
          <motion.div
            variants={contentVariants}
            className="relative w-full"
            onClick={e => e.stopPropagation()}
          >
            <ProjectVideo identifier={identifier} onLoad={() => {}} />
          </motion.div>

          <div className="absolute bottom-5 flex-row flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/20 border border-white/10 shadow-lg">
            <p className="text-white text-center">{project.title}</p>
            <p className="text-white/70 text-sm text-center">{project.date}</p>
          </div>

          <div className="absolute bottom-3 px-3 flex items-center justify-between w-full">
            <button
              onClick={handleClose}
              className="p-3 rounded-full overflow-hidden relative bg-white/20 border border-white/10 shadow-lg"
              aria-label="Close dialog"
            >
              <XMarkIcon className="w-8 h-8 text-white relative z-10" />
            </button>
            {project.projectSlug && (
              <Link
                href={`/projects/${project.projectSlug}`}
                className="p-3 rounded-full overflow-hidden relative bg-white/20 border border-white/10 shadow-lg"
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
