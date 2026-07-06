import { lazy, type ComponentType } from 'react';

export const projectContentMap: Record<string, ComponentType> = {
  'join-cx': lazy(() => import('./[slug]/content/join-cx')),
  'ai-for-interrogation-analysis': lazy(
    () => import('./[slug]/content/ai-for-interrogation-analysis')
  ),
  'ai-as-a-second-opinion': lazy(
    () => import('./[slug]/content/ai-as-a-second-opinion')
  ),
};

export const projectContentSlugs = Object.keys(projectContentMap);
