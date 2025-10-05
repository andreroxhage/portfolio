import React from 'react';

interface ProjectsLayoutProps {
  children: React.ReactNode;
}

const ProjectsLayout: React.FC<ProjectsLayoutProps> = ({ children }) => {
  return (
    <div>
      <main
        className="min-h-screen"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 64% 50%, #191919 0%, #000000 70%)',
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default ProjectsLayout;
