import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { writingRegistry } from '@/app/data/writing';
import WritingPageClient from './WritingPageClient';

export const dynamicParams = false;

export function generateStaticParams() {
  return writingRegistry.map(writing => ({ slug: writing.writingSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const writing = writingRegistry.find(w => w.writingSlug === slug);

  if (!writing) {
    return {};
  }

  const description = writing.subtitle;

  return {
    title: `${writing.title} | André Roxhage`,
    description,
    openGraph: {
      title: `${writing.title} | André Roxhage`,
      description,
      type: 'article',
    },
  };
}

export default async function WritingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const writing = writingRegistry.find(w => w.writingSlug === slug);

  if (!writing) {
    notFound();
  }

  return <WritingPageClient slug={slug} />;
}
