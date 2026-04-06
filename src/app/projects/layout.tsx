import React from 'react';

interface ProjectsLayoutProps {
  children: React.ReactNode;
}

const ProjectsLayout: React.FC<ProjectsLayoutProps> = ({ children }) => {
  return (
    <div>
      <main
        className="dark min-h-screen"
        style={{
          background:
            'radial-gradient(ellipse 80% 50vh at 64% 50vh, oklch(0.145 0.01 70) 0%, oklch(0.08 0 0) 70%) fixed',
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default ProjectsLayout;
