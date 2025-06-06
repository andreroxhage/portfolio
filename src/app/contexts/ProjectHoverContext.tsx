'use client';
import React, { createContext, useContext, useState } from 'react';

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
