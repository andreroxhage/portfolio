'use client';
import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ideaRegistry } from '@/app/data/ideas';
import WorkNavigation from '@/app/components/WorkNavigation';
import { ideaContentMap as contentMap } from '@/app/work/idea/content-map';

export default function IdeaPageClient({ slug }: { slug: string }) {
  const idea = ideaRegistry.find(i => i.ideaSlug === slug);

  if (!idea) {
    return null;
  }

  const Content = contentMap[slug];

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <header className="max-w-2.5xl mx-auto px-4 w-full flex flex-col justify-start items-start pt-16 pb-14 gap-6">
        <motion.h1
          className="text-2xl md:text-3xl font-medium tracking-tight leading-tight text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
        >
          {idea.title}
        </motion.h1>
        {idea.date && (
          <motion.h3
            className="text-lg md:text-2xl font-normal text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.9 }}
          >
            {idea.date}
          </motion.h3>
        )}
      </header>

      <Suspense
        fallback={
          <div className="max-w-2.5xl mx-auto px-4">
            <div className="h-96 animate-pulse bg-muted rounded-xl corner-squircle" />
          </div>
        }
      >
        <div className="pb-20">
          {Content ? (
            <Content />
          ) : (
            <div className="max-w-2.5xl mx-auto px-4 text-muted-foreground py-20">
              <p className="text-lg mb-4">
                {idea.previewSubtitle || idea.subtitle}
              </p>
              <p className="text-sm text-muted-foreground/60">
                Content coming soon.
              </p>
            </div>
          )}
        </div>
      </Suspense>

      <WorkNavigation currentSlug={slug} />
    </motion.div>
  );
}
