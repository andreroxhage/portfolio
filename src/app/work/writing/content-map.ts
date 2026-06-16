import { lazy, type ComponentType } from 'react';

export const writingContentMap: Record<string, ComponentType> = {
  'ai-as-a-second-opinion': lazy(
    () => import('./[slug]/content/ai-as-a-second-opinion')
  ),
};

export const writingContentSlugs = Object.keys(writingContentMap);
