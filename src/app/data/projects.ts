import type { ProjectMeta } from '@/app/types';

export const projectRegistry: ProjectMeta[] = [
  {
    projectSlug: 'spotify-events',
    title: 'Spotify events',
    subtitle:
      'What if event invitations felt like Spotify Wrapped? This concept turns invites into personalized music experiences, using data and design to build excitement before the party even starts',
    date: '2025',
    image: '/resource/projects/p4_d_a.png',
    imageAlt: 'Spotify events concept design in Figma',
    videoIdentifier: 'spotify-events',
    order: 2,
    type: 'project',
    titleColor: '#739966',
  },
  {
    projectSlug: 'login-experience-in-vr',
    title: 'Login experience in VR',
    subtitle:
      "Typing passwords in VR breaks immersion. This project introduces Scroll Select Authentication, a novel login method designed for GAIM's VR shooting platform that keeps users in the action",
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
    subtitle:
      "Where does Microsoft Teams' free calendar fall short? Through hands-on testing with new users, this evaluation uncovers friction points and offers practical improvements for scheduling and RSVP tracking",
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
