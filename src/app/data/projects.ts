import type { ProjectMeta } from '@/app/types';

export const projectRegistry: ProjectMeta[] = [
  {
    projectSlug: 'join-cx',
    title: 'JoinCX',
    subtitle:
      'Redesigning a loyalty platform and building the analytics tools behind it.',
    previewSubtitle:
      "Customer data platforms shouldn't feel like rocket science. I led Join's redesign to turn complex data into clear insights and intuitive workflows, improving usability and driving adoption",
    date: '2023 – 2025',
    image: '/resource/joinMockup1.png',
    imageAlt: 'Join CX platform dashboard showing customer analytics',
    imageFader: ['/resource/joinMockup1.png', '/resource/joinMockup2.png'],
    intervalTime: 5000,
    roundedCorners: false,
    tags: ['Design Engineering', 'SaaS', 'Data Visualization'],
    order: 1,
    type: 'project',
    titleColor: 'oklch(0.387 0.063 187.2)',
    titleColorLight: 'oklch(0.387 0.063 187.2)',
  },
  {
    projectSlug: 'spotify-events',
    title: 'Spotify events',
    subtitle: 'Turning event invitations into personalized music experiences.',
    previewSubtitle:
      'What if event invitations felt like Spotify Wrapped? This concept turns invites into personalized music experiences, using data and design to build excitement before the party even starts',
    date: '2025',
    image: '/resource/projects/p4_d_a.png',
    imageAlt: 'Spotify events concept design in Figma',
    videoIdentifier: 'spotify-events',
    posterImage: '/resource/projects/p4_poster.jpg',
    order: 2,
    type: 'project',
    titleColor: 'oklch(0.635 0.08 148)',
    titleColorLight: 'oklch(0.45 0.1 148)',
  },
  {
    projectSlug: 'login-experience-in-vr',
    title: 'Login experience in VR',
    subtitle: 'A novel login method that keeps you in the action.',
    previewSubtitle:
      "Typing passwords in VR breaks immersion. This project introduces Scroll Select Authentication, a novel login method designed for GAIM's VR shooting platform that keeps users in the action",
    date: '2024',
    image: '/resource/projects/p2_hifi.jpeg',
    imageAlt: 'Scroll Select Authentication in VR',
    videoIdentifier: 'login-experience-in-vr',
    posterImage: '/resource/projects/p2_poster.jpg',
    order: 5,
    type: 'project',
    titleColor: 'oklch(0.605 0.046 232.4)',
    subtitleColor: 'oklch(0.599 0.017 229.2)',
    titleColorLight: 'oklch(0.449 0.046 230.8)',
    subtitleColorLight: 'oklch(0.456 0.021 214.6)',
  },
  {
    projectSlug: 'usability-evaluation-of-microsoft-teams-calendar-feature',
    title: 'Usability evaluation',
    subtitle: 'Finding the friction in Microsoft Teams calendar.',
    previewSubtitle:
      "Where does Microsoft Teams' free calendar fall short? Through hands-on testing with new users, this evaluation uncovers friction points and offers practical improvements for scheduling and RSVP tracking",
    date: '2024',
    image: '/resource/projects/p1.jpg',
    imageAlt: 'Usability Evaluation of Microsoft Teams Calendar Feature',
    videoIdentifier: 'usability-evaluation-of-microsoft-teams-calendar-feature',
    posterImage: '/resource/projects/p1_poster.jpg',
    order: 4,
    type: 'project',
    titleColor: 'oklch(0.533 0.079 285.2)',
    subtitleColor: 'oklch(0.572 0.028 285.5)',
    titleColorLight: 'oklch(0.373 0.094 282.5)',
    subtitleColorLight: 'oklch(0.417 0.033 284.9)',
  },
];

// Backward-compatible alias for existing consumers (ProjectsGrid, etc.)
export const projects = projectRegistry;
