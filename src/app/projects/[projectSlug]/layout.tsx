import React from 'react';
import Footer from '@/app/sections/Footer';

interface ProjectsLayoutProps {
  children: React.ReactNode;
}

const ProjectsLayout: React.FC<ProjectsLayoutProps> = ({ children }) => {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
};

export default ProjectsLayout;
