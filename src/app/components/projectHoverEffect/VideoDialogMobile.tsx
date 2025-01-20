import React, { useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Project } from "@/app/types";

interface GifDialogMobileProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectVideo = memo(
  ({ videoSrc, onLoad }: { videoSrc: string; onLoad: () => void }) => (
    <div className="relative mx-auto w-[calc(100%-32px)] max-w-[80vw] max-h-[80vh] rounded-[40px] overflow-hidden bg-black">
      <div className="relative flex items-center justify-center w-full h-full">
        <video
          src={videoSrc}
          className="max-w-full max-h-full object-contain"
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={onLoad}
        />
      </div>
    </div>
  )
);

ProjectVideo.displayName = "ProjectVideo";

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
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
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
        type: "spring",
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
            onClick={(e) => e.stopPropagation()}
          >
            <ProjectVideo videoSrc={project.videoSrc} onLoad={() => {}} />
          </motion.div>

          <div className="absolute bottom-3 px-3 flex items-center justify-between w-full">
            <button
              onClick={handleClose}
              className="p-3 rounded-full overflow-hidden relative"
              aria-label="Close dialog"
            >
              <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />
              <XMarkIcon className="w-8 h-8 text-white relative z-10 " />
            </button>{" "}
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
