'use client';
import React, { lazy, Suspense, use } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { DURATION, EASING } from '@/app/lib/motion';
import { ideaRegistry } from '@/app/data/ideas';
import ProjectBreadcrumb from '@/app/components/ProjectBreadcrumb';
import IdeaNavigation from '@/app/components/IdeaNavigation';

const contentMap: Record<string, React.ComponentType> = {
  join: lazy(() => import('./content/join')),
};

export default function IdeaPage({
  params,
}: {
  params: Promise<{ ideaSlug: string }>;
}) {
  const { ideaSlug } = use(params);
  const idea = ideaRegistry.find(i => i.ideaSlug === ideaSlug);

  if (!idea) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-dark">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl md:text-6xl font-medium tracking-tighter text-surface-dark-foreground">
            Idea not found
          </h1>
        </div>
      </div>
    );
  }

  const Content = contentMap[ideaSlug];

  return (
    <motion.div
      className="bg-surface-dark"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: DURATION.SLOW, ease: EASING.ENTER }}
    >
      <header className="max-w-7xl mx-auto px-4 w-full flex flex-col justify-start items-start pt-8 pb-20 gap-6">
        <ProjectBreadcrumb title={idea.title} />
        <motion.h1
          className="text-4xl md:text-6xl font-medium tracking-tighter text-primary-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DURATION.SLOW, ease: EASING.ENTER }}
        >
          {idea.title}
        </motion.h1>
        {idea.date && (
          <motion.h3
            className="text-lg md:text-2xl font-normal text-surface-dark-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: DURATION.SLOW,
              ease: EASING.ENTER,
              delay: 0.1,
            }}
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
                className="text-xs bg-surface-dark-elevated text-surface-dark-muted border-0 corner-squircle"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-4">
            <div className="h-96 animate-pulse bg-surface-dark-card rounded-xl corner-squircle" />
          </div>
        }
      >
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-10 gap-8 pb-16">
          {Content ? (
            <Content />
          ) : (
            <div className="col-span-10 text-surface-dark-muted py-20">
              <p className="text-lg mb-4">{idea.subtitle}</p>
              <p className="text-sm text-surface-dark-muted/60">
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
