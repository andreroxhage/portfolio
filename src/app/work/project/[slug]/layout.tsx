'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { EASING } from '@/app/lib/motion';

interface ProjectsLayoutProps {
  children: React.ReactNode;
}

const ProjectsLayout: React.FC<ProjectsLayoutProps> = ({ children }) => {
  return (
    <div className="relative">
      {/* Fade from black overlay only when navigating from /projects */}
      <FadeFromProjectsParent />

      {/* Page content */}
      {children}
    </div>
  );
};

const FadeFromProjectsParent: React.FC = () => {
  const [shouldFade, setShouldFade] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      const flag = sessionStorage.getItem('fromProjects');
      if (flag === '1' && pathname?.startsWith('/work/project/')) {
        setShouldFade(true);
      }
      sessionStorage.removeItem('fromProjects');
    } catch (_e) {
      /* noop */
    }
  }, [pathname]);

  if (!shouldFade) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black pointer-events-none z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: EASING.ENTER }}
    />
  );
};

export default ProjectsLayout;
