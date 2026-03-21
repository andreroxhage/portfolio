import type { Capability } from '@/app/types';

export const capabilities: Capability[] = [
  {
    id: 'overview',
    title: 'Overview',
    description:
      'Design engineer — from research to shipped product. I bridge the gap between user needs and technical execution.',
    order: 1,
  },
  {
    id: 'research',
    title: 'Research & Requirements',
    description:
      'User research, requirements gathering, problem framing and validation.',
    imageSrc: '/resource/projects/p1.png',
    imageAlt: 'Research process',
    order: 2,
  },
  {
    id: 'design',
    title: 'Design & Creative Iteration',
    description:
      'Iterative design process, prototyping, visual design, interaction patterns.',
    imageSrc: '/resource/projects/p2.png',
    imageAlt: 'Design iteration',
    order: 3,
  },
  {
    id: 'ai-workflows',
    title: 'AI-Enhanced Workflows',
    description:
      'Claude Code, fast iteration, data-driven decisions, continuous reevaluation.',
    imageSrc: '/resource/projects/p4.png',
    imageAlt: 'AI workflow',
    order: 4,
  },
];
