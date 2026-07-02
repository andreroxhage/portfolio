import { lazy, type ComponentType } from 'react';

export const ideaContentMap: Record<string, ComponentType> = {
  'malmo-museum-3d-map': lazy(
    () => import('./[slug]/content/malmo-museum-3d-map')
  ),
};

export const ideaContentSlugs = Object.keys(ideaContentMap);
