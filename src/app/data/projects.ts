import type { ProjectMeta } from '@/app/types';

export const projectRegistry: ProjectMeta[] = [
  {
    projectSlug: 'join-cx',
    title: 'Join CX',
    subtitle:
      'Redesigning a loyalty platform and building the analytics tools behind it.',
    previewSubtitle:
      "Data platforms shouldn't feel like rocket science. I led Join's redesign to turn complex customer data into clear insights and intuitive workflows, improving usability and driving adoption",
    date: '2023 – 2026',
    image: '/resource/joinMockup2.png',
    imageAlt: 'Join CX platform dashboard showing customer analytics',
    imageFader: ['/resource/joinMockup2.png', '/resource/joinMockup1.png'],
    intervalTime: 5000,
    roundedCorners: false,
    tags: ['Design Engineering', 'SaaS', 'Data Visualization'],
    order: 0,
    type: 'project',
    titleColor: 'oklch(0.387 0.063 187.2)',
    titleColorLight: 'oklch(0.387 0.063 187.2)',
  },
  {
    projectSlug: 'ai-for-interrogation-analysis',
    title: 'AI for interrogation analysis',
    subtitle:
      'Building an offline RAG pipeline and agentic workflow for intelligence services',
    previewSubtitle:
      'Designing an offline RAG pipeline and agentic workflow to transform raw interrogations into actionable intelligence',
    date: '2026',
    image: '/resource/projects/fenrir_1.png',
    imageAlt:
      'Abstract representation of artificial intelligence and cognitive science',
    imageFader: ['/resource/projects/fenrir_1.png'],
    tags: ['Human-AI Collaboration', 'UX Research', 'System Design'],
    order: 1,
    type: 'project',
    titleColor: 'oklch(0.6856 0.0518 149.31)',
    titleColorLight: 'oklch(0.4588 0.0518 149.31)',
  },
  {
    projectSlug: 'ai-as-a-second-opinion',
    title: 'AI as a second opinion',
    subtitle: 'Why timing decides whether AI helps or hurts a diagnosis.',
    previewSubtitle:
      'A controlled study with 51 clinicians on when AI should surface its suggestion. Show it too early and it quietly takes over their reasoning; hold it back and judgment stays sharp',
    date: '2025',
    tags: ['UX Research', 'Clinical AI', 'Automation Bias'],
    order: 2,
    type: 'project',
    titleColor: 'oklch(0.64 0.07 232)',
    titleColorLight: 'oklch(0.46 0.07 232)',
    showInPreview: false,
  },
];

// Backward-compatible alias for existing consumers (ProjectsGrid, etc.)
export const projects = projectRegistry;
