import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/legacy/image";
import Link from "next/link";
import { ArrowUpRightIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface GifDialogMobileProps {
  project: {
    title: string;
    date: string;
    subtitle: string;
    tags: string[];
    gifSrc: string;
    projectSlug: string;
  };
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}

const GifDialogMobile = ({
  project,
  isLoading,
  setIsLoading,
  onClose,
}: GifDialogMobileProps) => {
  useEffect(() => {
    setIsLoading(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [setIsLoading]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      style={{ position: "fixed" }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden"
        style={{ position: "relative" }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
        >
          <XMarkIcon className="w-6 h-6 text-gray-700" />
        </button>

        <div className="w-full aspect-video relative">
          <Image
            src={project.gifSrc}
            alt={`${project.title} preview`}
            className={`w-full h-full object-contain transition-opacity duration-300 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            fill
            unoptimized
            onLoad={handleImageLoad}
            priority
          />
        </div>

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
              <span
                key={index}
                className="px-3 py-1 rounded-xl border border-gray-800/40 text-primary-grey-brighter text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          <Link
            href={`/projects/${project.projectSlug}`}
            className="flex items-center justify-between w-full p-4 bg-primary-whiteish hover:bg-white rounded-2xl text-primary-grey group transition-all duration-150"
            onClick={onClose}
          >
            <span className="font-medium">Read More CONDITIONALLY,!!!</span>
            <ArrowUpRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GifDialogMobile;
