'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Footer from '@/app/sections/Footer';
import { EASING } from '@/app/lib/motion';

interface ProjectsLayoutProps {
  children: React.ReactNode;
}

const ProjectsLayout: React.FC<ProjectsLayoutProps> = ({ children }) => {
  return (
    <div className="relative">
      {/* Fade from black overlay */}
      <motion.div
        className="fixed inset-0 bg-black pointer-events-none z-50"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: EASING.ENTER }}
      />

      {/* Page content */}
      {children}
      <Footer />
    </div>
  );
};

export default ProjectsLayout;
