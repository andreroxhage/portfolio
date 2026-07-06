import type { ExperimentMeta } from '@/app/types';

export const experimentRegistry: ExperimentMeta[] = [
  {
    id: 'i2',
    experimentSlug: 'malmo-museum-3d-map',
    title: 'Malmö museum 3D map',
    subtitle: 'Interactive 3D wayfinding for museum visitors.',
    previewSubtitle:
      'Museum maps are flat and confusing. This concept reimagines wayfinding with an interactive 3D navigator that helps visitors explore exhibits spatially',
    date: '2025',
    posterImage: '/resource/projects/i2_poster.jpg',
    tags: ['Concept', 'Spatial UX', '3D'],
    order: 7,
    type: 'experiment',
    showInPreview: false,
  },
  {
    id: 'i3',
    experimentSlug: 'readiness',
    title: 'Readiness',
    subtitle: 'HRV-based recovery tracking built with SwiftUI.',
    previewSubtitle:
      "Knowing whether you're overtrained or ready for a workout shouldn't be a guess. This SwiftUI project uses HRV data from Apple Health to help you understand your body's response to stress and activity",
    date: '2025',
    posterImage: '/resource/projects/i3_poster.jpg',
    tags: ['iOS', 'SwiftUI', 'Health Tech'],
    order: 3,
    type: 'experiment',
  },
  {
    id: 'i4',
    experimentSlug: 'meal-planning-agents',
    title: 'Meal planning with AI agents',
    subtitle: 'A HelloFresh replacement built on Claude Code agents.',
    previewSubtitle:
      'Weekly meal planning that runs itself: specialized AI agents brainstorm dishes, research recipes in parallel, build the shopping list, and plan the cooking',
    date: '2026',
    tags: ['AI Agents', 'Automation', 'Claude Code'],
    order: 2,
    type: 'experiment',
    showInPreview: false,
  },
  {
    id: 'i5',
    experimentSlug: 'ai-running-coach',
    title: 'AI running coach',
    subtitle:
      'Data-driven marathon coaching with an autonomous morning pipeline.',
    previewSubtitle:
      'A personal coaching system that ingests Strava data, assesses recovery, checks my calendar, and delivers each day’s workout as a Todoist task, as I train for a marathon',
    date: '2025 – 2026',
    tags: ['AI Agents', 'Training Data', 'Automation'],
    order: 1,
    type: 'experiment',
    showInPreview: false,
  },
  {
    id: 'i6',
    experimentSlug: 'spotify-events',
    title: 'Spotify events',
    subtitle: 'Turning event invitations into personalized music experiences.',
    previewSubtitle:
      'What if event invitations felt like Spotify Wrapped? This concept turns invites into personalized music experiences, using data and design to build excitement before the party even starts',
    date: '2025',
    videoIdentifier: 'spotify-events',
    posterImage: '/resource/projects/p4_poster.jpg',
    tags: ['Interaction Design', 'Product Psychology', 'UX Concept'],
    order: 4,
    type: 'experiment',
  },
  {
    id: 'i7',
    experimentSlug: 'usability-evaluation-of-microsoft-teams-calendar-feature',
    title: 'Usability evaluation',
    subtitle: 'Finding the friction in Microsoft Teams calendar.',
    previewSubtitle:
      "Where does Microsoft Teams' free calendar fall short? Through hands-on testing with new users, this evaluation uncovers friction points and offers practical improvements for scheduling and RSVP tracking",
    date: '2024',
    videoIdentifier: 'usability-evaluation-of-microsoft-teams-calendar-feature',
    posterImage: '/resource/projects/p1_poster.jpg',
    tags: ['Usability Evaluation', 'User Testing', 'UX Audit'],
    order: 5,
    type: 'experiment',
    showInPreview: false,
  },
  {
    id: 'i8',
    experimentSlug: 'login-experience-in-vr',
    title: 'Login experience in VR',
    subtitle: 'A novel login method that keeps you in the action.',
    previewSubtitle:
      "Typing passwords in VR breaks immersion. This project introduces Scroll Select Authentication, a novel login method designed for GAIM's VR shooting platform that keeps users in the action",
    date: '2024',
    videoIdentifier: 'login-experience-in-vr',
    posterImage: '/resource/projects/p2_poster.jpg',
    tags: ['VR UX', 'Unity Prototyping', 'Spatial Interaction'],
    order: 6,
    type: 'experiment',
    showInPreview: false,
  },
];

// Backward-compatible alias for existing consumers (ProjectsGrid, etc.)
export const experiments = experimentRegistry;
