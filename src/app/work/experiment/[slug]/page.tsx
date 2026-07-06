import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { experimentRegistry } from '@/app/data/experiments';
import ExperimentPageClient from './ExperimentPageClient';

export const dynamicParams = false;

export function generateStaticParams() {
  return experimentRegistry.map(experiment => ({
    slug: experiment.experimentSlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const experiment = experimentRegistry.find(e => e.experimentSlug === slug);

  if (!experiment) {
    return {};
  }

  const description = experiment.previewSubtitle ?? experiment.subtitle;
  const image = experiment.posterImage ?? experiment.image;

  return {
    title: `${experiment.title} | André Roxhage`,
    description,
    openGraph: {
      title: `${experiment.title} | André Roxhage`,
      description,
      type: 'article',
      images: image ? [image] : undefined,
    },
  };
}

export default async function ExperimentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experiment = experimentRegistry.find(e => e.experimentSlug === slug);

  if (!experiment) {
    notFound();
  }

  return <ExperimentPageClient slug={slug} />;
}
