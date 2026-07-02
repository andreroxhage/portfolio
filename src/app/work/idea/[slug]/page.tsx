import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ideaRegistry } from '@/app/data/ideas';
import IdeaPageClient from './IdeaPageClient';

export const dynamicParams = false;

export function generateStaticParams() {
  return ideaRegistry.map(idea => ({ slug: idea.ideaSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const idea = ideaRegistry.find(i => i.ideaSlug === slug);

  if (!idea) {
    return {};
  }

  const description = idea.previewSubtitle ?? idea.subtitle;
  const image = idea.posterImage ?? idea.image;

  return {
    title: `${idea.title} | André Roxhage`,
    description,
    openGraph: {
      title: `${idea.title} | André Roxhage`,
      description,
      type: 'article',
      images: image ? [image] : undefined,
    },
  };
}

export default async function IdeaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const idea = ideaRegistry.find(i => i.ideaSlug === slug);

  if (!idea) {
    notFound();
  }

  return <IdeaPageClient slug={slug} />;
}
