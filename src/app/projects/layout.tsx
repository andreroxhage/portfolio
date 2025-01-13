import React from 'react';

interface ProjectsLayoutProps {
  children: React.ReactNode;
}

const ProjectsLayout: React.FC<ProjectsLayoutProps> = ({ children }) => {
  return (
    <div>
      <main className="bg-primary-whiteish">{children}</main>
    </div>
  );
};

export default ProjectsLayout;
