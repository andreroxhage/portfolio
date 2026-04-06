import type { ProjectMeta } from '@/app/types';

export const projectRegistry: ProjectMeta[] = [
  {
    projectSlug: 'join-cx',
    title: 'Join CX',
    subtitle:
      'Redesigning a loyalty platform and building the analytics tools behind it.',
    date: '2023 – 2025',
    image: '/resource/joinMockup1.png',
    imageAlt: 'Join CX platform dashboard showing customer analytics',
    tags: ['Design Engineering', 'SaaS', 'Data Visualization'],
    order: 1,
    type: 'project',
    titleColor: 'oklch(0.635 0.08 250)',
  },
  {
    projectSlug: 'spotify-events',
    title: 'Spotify events',
    subtitle: 'Turning event invitations into personalized music experiences.',
    date: '2025',
    image: '/resource/projects/p4_d_a.png',
    imageAlt: 'Spotify events concept design in Figma',
    videoIdentifier: 'spotify-events',
    order: 2,
    type: 'project',
    titleColor: 'oklch(0.635 0.08 148)',
  },
  {
    projectSlug: 'login-experience-in-vr',
    title: 'Login experience in VR',
    subtitle: 'A novel login method that keeps you in the action.',
    date: '2024',
    image: '/resource/projects/p2_hifi.jpeg',
    imageAlt: 'Scroll Select Authentication in VR',
    videoIdentifier: 'login-experience-in-vr',
    order: 5,
    type: 'project',
    titleColor: '#668799',
    subtitleColor: '#768288',
  },
  {
    projectSlug: 'usability-evaluation-of-microsoft-teams-calendar-feature',
    title: 'Usability evaluation',
    subtitle: 'Finding the friction in Microsoft Teams calendar.',
    date: '2024',
    image: '/resource/projects/p1.jpeg',
    imageAlt: 'Usability Evaluation of Microsoft Teams Calendar Feature',
    videoIdentifier: 'usability-evaluation-of-microsoft-teams-calendar-feature',
    order: 4,
    type: 'project',
    titleColor: '#686699',
    subtitleColor: '#767688',
  },
];

// Backward-compatible alias for existing consumers (ProjectsGrid, etc.)
export const projects = projectRegistry;
