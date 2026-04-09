import type { IdeaMeta } from '@/app/types';

export const ideaRegistry: IdeaMeta[] = [
  {
    id: 'i2',
    ideaSlug: 'malmo-museum-3d-map',
    title: 'Malmö museum 3D map',
    subtitle: 'Interactive 3D wayfinding for museum visitors.',
    previewSubtitle:
      'Museum maps are flat and confusing. This concept reimagines wayfinding with an interactive 3D navigator that helps visitors explore exhibits spatially',
    date: '2025',
    posterImage: '/resource/projects/i2_poster.jpg',
    tags: ['Concept', 'Spatial UX', '3D'],
    order: 6,
    type: 'idea',
    hasDetailPage: true,
  },
  {
    id: 'i3',
    ideaSlug: 'readiness',
    title: 'Readiness',
    subtitle: 'HRV-based recovery tracking built with SwiftUI.',
    previewSubtitle:
      "Knowing whether you're overtrained or ready for a workout shouldn't be a guess. This SwiftUI project uses HRV data from Apple Health to help you understand your body's response to stress and activity",
    date: '2025',
    posterImage: '/resource/projects/i3_poster.jpg',
    tags: ['iOS', 'SwiftUI', 'Health Tech'],
    order: 3,
    type: 'idea',
    hasDetailPage: true,
  },
];

// Backward-compatible alias for existing consumers (ProjectsGrid, etc.)
export const ideas = ideaRegistry;
