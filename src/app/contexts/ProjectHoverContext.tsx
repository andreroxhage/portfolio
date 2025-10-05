'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface ProjectHoverContextType {
  isProjectHovered: boolean;
  setIsProjectHovered: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectHoverContext = createContext<ProjectHoverContextType | undefined>(
  undefined
);

export const ProjectHoverProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isProjectHovered, setIsProjectHovered] = useState(false);
  const pathname = usePathname();

  // Reset hover state whenever route changes so navbar reappears after navigation
  useEffect(() => {
    setIsProjectHovered(false);
  }, [pathname]);

  return (
    <ProjectHoverContext.Provider
      value={{ isProjectHovered, setIsProjectHovered }}
    >
      {children}
    </ProjectHoverContext.Provider>
  );
};

export const useProjectHover = () => {
  const context = useContext(ProjectHoverContext);
  if (context === undefined) {
    throw new Error(
      'useProjectHover must be used within a ProjectHoverProvider'
    );
  }
  return context;
};
