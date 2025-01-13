import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/app/data";
import Link from "next/link";
import GifDialogMobile from "@/app/components/projectHoverEffect/GifDialogMobile";
import GifDialog from "@/app/components/projectHoverEffect/GifDialog";

type Project = {
  title: string;
  date: string;
  subtitle: string;
  tags: string[];
  gifSrc: string;
  projectSlug: string;
};

const ProjectGrid = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowOnboarding(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = (project: Project) => {
    setIsHovered(true);
    setCurrentProject(project);
    setIsLoading(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentProject(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="flex flex-col h-full justify-between items-center pb-12 flex-grow">
      <div className="grid grid-cols-10 gap-4 pb-24 pt-12 w-full h-full overflow-y-auto">
        {projects.map((project, index) => (
          <Link
            key={index}
            href={`/projects/${project.projectSlug}`}
            onMouseEnter={() => handleMouseEnter(project)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onClick={(e) => {
              if (window.innerWidth < 768) {
                e.preventDefault();
                setDialogOpen(true);
                setCurrentProject(project);
              }
            }}
            className={`relative hover:bg-white bg-primary-whiteish/60 p-4 rounded-3xl group transition-all duration-150 col-span-10 md:col-span-5 ${
              showOnboarding && index === 0
                ? "border-2 border-secondary-green-darker animate-pulse"
                : ""
            }`}
          >
            <div className="text-primary-blackish flex justify-between items-center">
              {showOnboarding && index === 0 ? (
                <label className="text-lg md:text-xl font-semibold text-secondary-green-darker">
                  Hover to Preview - Click to Enter
                </label>
              ) : (
                <label className="text-lg md:text-xl font-semibold text-primary-grey">
                  {project.title}
                </label>
              )}
              <span>{project.date}</span>
            </div>

            <p className="text-base mdtext-lg font-light text-primary-grey mt-2 text-left">
              {project.subtitle}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-3 py-1 rounded-xl border border-gray-800/40 text-primary-grey-brighter w-fit text-xs cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
        <div className="hidden md:inline">
          <AnimatePresence>
            {isHovered && currentProject && (
              <GifDialog
                gifSrc={currentProject.gifSrc}
                mousePosition={mousePosition}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="md:hidden">
        <AnimatePresence>
          {dialogOpen && currentProject && (
            <GifDialogMobile
              project={currentProject}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              onClose={() => setDialogOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {currentProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="hover:bg-white hidden md:flex bg-primary-whiteish/60 p-3 px-4 gap-8 text-sm md:text-base rounded-3xl group transition-all duration-150 col-span-10 md:col-span-5"
          >
            <label className="font-medium text-primary-grey">
              {currentProject.title}
            </label>
            <label className="text-primary-grey-brighter">
              {currentProject.date}
            </label>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectGrid;
