'use client';
import React, { Suspense, use } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ideaRegistry } from '@/app/data/ideas';
import IdeaNavigation from '@/app/components/IdeaNavigation';

const contentMap: Record<string, React.ComponentType> = {};

export default function IdeaPage({
  params,
}: {
  params: Promise<{ ideaSlug: string }>;
}) {
  const { ideaSlug } = use(params);
  const idea = ideaRegistry.find(i => i.ideaSlug === ideaSlug);

  if (!idea) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl md:text-3xl font-medium tracking-tight leading-tight text-foreground">
            Idea not found
          </h1>
        </div>
      </div>
    );
  }

  const Content = contentMap[ideaSlug];

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <header className="max-w-2xl mx-auto px-4 w-full flex flex-col justify-start items-start pt-16 pb-14 gap-6">
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
        {idea.tags && idea.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {idea.tags.map(tag => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs bg-muted text-muted-foreground border-0 corner-squircle"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      <Suspense
        fallback={
          <div className="max-w-2xl mx-auto px-4">
            <div className="h-96 animate-pulse bg-muted rounded-xl corner-squircle" />
          </div>
        }
      >
        <div className="pb-20">
          {Content ? (
            <Content />
          ) : (
            <div className="max-w-2xl mx-auto px-4 text-muted-foreground py-20">
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

      <IdeaNavigation currentIdeaSlug={ideaSlug} />
    </motion.div>
  );
}
