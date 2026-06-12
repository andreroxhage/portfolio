'use client';

import React from 'react';
import WorkNavigation from './WorkNavigation';

interface IdeaNavigationProps {
  currentIdeaSlug: string;
}

const IdeaNavigation: React.FC<IdeaNavigationProps> = ({ currentIdeaSlug }) => {
  return <WorkNavigation currentSlug={currentIdeaSlug} />;
};

export default IdeaNavigation;
