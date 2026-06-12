'use client';

import React from 'react';
import WorkNavigation from './WorkNavigation';

interface WritingNavigationProps {
  currentWritingSlug: string;
}

const WritingNavigation: React.FC<WritingNavigationProps> = ({
  currentWritingSlug,
}) => {
  return <WorkNavigation currentSlug={currentWritingSlug} />;
};

export default WritingNavigation;
