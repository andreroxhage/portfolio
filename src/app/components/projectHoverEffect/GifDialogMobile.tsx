import React, { useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Project {
  title: string;
  date: string;
  subtitle: string;
  tags: string[];
  gifSrc: string;
  projectSlug: string;
}

interface GifDialogMobileProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const Tag = memo(({ tag }: { tag: string }) => (
  <span className="px-3 py-1 rounded-xl border border-gray-800/40 text-primary-grey-brighter text-xs">
    {tag}
  </span>
));

Tag.displayName = 'Tag';

const ProjectImage = memo(
  ({ src, alt, onLoad }: { src: string; alt: string; onLoad: () => void }) => (
    <div className="w-full aspect-video relative">
      <Image
        src={src}
        alt={alt}
        fill={true}
        unoptimized
        onLoad={onLoad}
        priority
        className="transition-opacity duration-300"
      />
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
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { delay: 0.1 } },
    exit: { scale: 0.9, opacity: 0 },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          variants={dialogVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={handleClose}
        >
          <motion.div
            variants={contentVariants}
            className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
              aria-label="Close dialog"
            >
              <XMarkIcon className="w-6 h-6 text-gray-700" />
            </button>

            <ProjectImage
              src={project.gifSrc}
              alt={`${project.title} preview`}
              onLoad={() => {}} // Handle loading state if needed
            />

            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-primary-grey">
                  {project.title}
                </h3>
                <span className="text-sm text-primary-grey-brighter">
                  {project.date}
                </span>
              </div>

              <p className="text-primary-grey mb-4">{project.subtitle}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, index) => (
                  <Tag key={`${tag}-${index}`} tag={tag} />
                ))}
              </div>

              <Link
                href={`/projects/${project.projectSlug}`}
                className="flex items-center justify-between w-full p-4 bg-primary-whiteish hover:bg-white rounded-2xl text-primary-grey group transition-all duration-150"
                onClick={handleClose}
              >
                <span className="font-medium">Read More</span>
                <ArrowUpRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(GifDialogMobile);
