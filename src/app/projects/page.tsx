'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const ProjectsGrid = dynamic(
  () => import('@/app/components/projectHoverEffect/ProjectsGrid'),
  { ssr: false }
);
const ProjectsGridMobile = dynamic(
  () => import('@/app/components/projectHoverEffect/ProjectsGridMobile'),
  { ssr: false }
);

const ProfileSection: React.FC = () => (
  <Link href="/" className="flex gap-8 items-center justify-start group">
    <div className="flex flex-col gap-[6px] justify-center items-start">
      <motion.h1
        className="text-4xl md:text-6xl font-medium tracking-tighter text-foreground dark:text-foreground group-hover:text-accent-foreground dark:group-hover:text-accent transition-all duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
      >
        André Roxhage
      </motion.h1>
    </div>
  </Link>
);

const ProjectsPage: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768);
      }
    };

    checkMobile();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  // Static dark background for projects page (no animated background)

  return (
    <div className="dark">
      <div id="header">
        <div className="max-w-8xl px-4 mx-auto h-full min-h-screen flex flex-col py-20  text-surface-dark-foreground">
          <div className="flex items-center justify-between w-full">
            <ProfileSection />
          </div>
          {isMobile ? <ProjectsGridMobile /> : <ProjectsGrid />}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
