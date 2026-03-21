import type { IdeaMeta } from '@/app/types';

export const ideaRegistry: IdeaMeta[] = [
  {
    id: 'i1',
    ideaSlug: 'join',
    title: 'Join',
    subtitle:
      "Customer data platforms shouldn't feel like rocket science. I led Join's redesign to turn complex data into clear insights and intuitive workflows, improving usability and driving adoption",
    date: '2023 – Current',
    imageFader: ['/resource/joinMockup1.png', '/resource/joinMockup2.png'],
    intervalTime: 5000,
    roundedCorners: false,
    tags: ['Design Leadership', 'Product Design', 'UX Research'],
    order: 1,
    type: 'idea',
    hasDetailPage: true,
  },
  {
    id: 'i2',
    ideaSlug: 'malmo-museum-3d-map',
    title: 'Malmö museum 3D map',
    subtitle:
      'Museum maps are flat and confusing. This concept reimagines wayfinding with an interactive 3D navigator that helps visitors explore exhibits spatially',
    date: '2025',
    tags: ['Concept', 'Spatial UX', '3D'],
    order: 6,
    type: 'idea',
    hasDetailPage: true,
  },
  {
    id: 'i3',
    ideaSlug: 'readiness',
    title: 'Readiness',
    subtitle:
      "Knowing whether you're overtrained or ready for a workout shouldn't be a guess. This SwiftUI project uses HRV data from Apple Health to help you understand your body's response to stress and activity",
    date: '2025',
    tags: ['iOS', 'SwiftUI', 'Health Tech'],
    order: 3,
    type: 'idea',
    hasDetailPage: true,
  },
];

// Backward-compatible alias for existing consumers (ProjectsGrid, etc.)
export const ideas = ideaRegistry;
