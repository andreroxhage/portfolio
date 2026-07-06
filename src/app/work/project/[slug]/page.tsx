import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projectRegistry } from '@/app/data/projects';
import ProjectPageClient from './ProjectPageClient';

export const dynamicParams = false;

export function generateStaticParams() {
  return projectRegistry.map(project => ({ slug: project.projectSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectRegistry.find(p => p.projectSlug === slug);

  if (!project) {
    return {};
  }

  const description = project.previewSubtitle ?? project.subtitle;

  return {
    title: `${project.title} | André Roxhage`,
    description,
    openGraph: {
      title: `${project.title} | André Roxhage`,
      description,
      type: 'article',
      images: project.image ? [project.image] : undefined,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectRegistry.find(p => p.projectSlug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectPageClient slug={slug} />;
}
