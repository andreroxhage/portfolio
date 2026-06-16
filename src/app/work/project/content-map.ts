import { lazy, type ComponentType } from 'react';

export const projectContentMap: Record<string, ComponentType> = {
  'join-cx': lazy(() => import('./[slug]/content/join-cx')),
  'spotify-events': lazy(() => import('./[slug]/content/spotify-events')),
  'login-experience-in-vr': lazy(
    () => import('./[slug]/content/login-experience-in-vr')
  ),
  'usability-evaluation-of-microsoft-teams-calendar-feature': lazy(
    () =>
      import('./[slug]/content/usability-evaluation-of-microsoft-teams-calendar-feature')
  ),
  'ai-for-interrogation-analysis': lazy(
    () => import('./[slug]/content/ai-for-interrogation-analysis')
  ),
};

export const projectContentSlugs = Object.keys(projectContentMap);
