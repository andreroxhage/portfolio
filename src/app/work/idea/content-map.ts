import { lazy, type ComponentType } from 'react';

export const ideaContentMap: Record<string, ComponentType> = {
  'malmo-museum-3d-map': lazy(
    () => import('./[slug]/content/malmo-museum-3d-map')
  ),
  readiness: lazy(() => import('./[slug]/content/readiness')),
  'meal-planning-agents': lazy(
    () => import('./[slug]/content/meal-planning-agents')
  ),
  'ai-running-coach': lazy(() => import('./[slug]/content/ai-running-coach')),
};

export const ideaContentSlugs = Object.keys(ideaContentMap);
