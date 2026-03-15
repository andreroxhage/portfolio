'use client';
import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const ProjectsGrid = dynamic(
  () => import('@/app/components/projectHoverEffect/ProjectsGrid'),
  { ssr: false }
);

const ProfileSection: React.FC = () => (
  <Link href="/" className="flex gap-8 items-center justify-start group">
    <div className="flex flex-col gap-[6px] justify-center items-start">
      <motion.h1
        className="text-4xl md:text-6xl font-medium tracking-tighter text-surface-dark-foreground group-hover:text-accent transition-all duration-300"
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
  return (
    <div>
      <div id="header">
        <div className="max-w-8xl px-4 mx-auto h-full min-h-screen flex flex-col py-20 text-surface-dark-foreground">
          <div className="flex items-center justify-between w-full">
            <ProfileSection />
          </div>
          <ProjectsGrid />
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
