import { lazy, type ComponentType } from 'react';

export const experimentContentMap: Record<string, ComponentType> = {
  'malmo-museum-3d-map': lazy(
    () => import('./[slug]/content/malmo-museum-3d-map')
  ),
  readiness: lazy(() => import('./[slug]/content/readiness')),
  'meal-planning-agents': lazy(
    () => import('./[slug]/content/meal-planning-agents')
  ),
  'ai-running-coach': lazy(() => import('./[slug]/content/ai-running-coach')),
  'spotify-events': lazy(() => import('./[slug]/content/spotify-events')),
  'usability-evaluation-of-microsoft-teams-calendar-feature': lazy(
    () =>
      import('./[slug]/content/usability-evaluation-of-microsoft-teams-calendar-feature')
  ),
  'login-experience-in-vr': lazy(
    () => import('./[slug]/content/login-experience-in-vr')
  ),
};

export const experimentContentSlugs = Object.keys(experimentContentMap);
