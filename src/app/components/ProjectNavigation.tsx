'use client';

import React from 'react';
import WorkNavigation from './WorkNavigation';

interface ProjectNavigationProps {
  currentProjectSlug: string;
}

const ProjectNavigation: React.FC<ProjectNavigationProps> = ({
  currentProjectSlug,
}) => {
  return <WorkNavigation currentSlug={currentProjectSlug} />;
};

export default ProjectNavigation;
