'use client';
import React, { lazy, Suspense, use } from 'react';
import { motion } from 'framer-motion';
import { projectRegistry } from '@/app/data/projects';
import ProjectNavigation from '@/app/components/ProjectNavigation';
import ProjectHeader from '@/app/components/ProjectHeader';

// Static content map — avoids webpack variable import path limitation
const contentMap: Record<string, React.ComponentType> = {
  'spotify-events': lazy(() => import('./content/spotify-events')),
  'login-experience-in-vr': lazy(
    () => import('./content/login-experience-in-vr')
  ),
  'usability-evaluation-of-microsoft-teams-calendar-feature': lazy(
    () =>
      import('./content/usability-evaluation-of-microsoft-teams-calendar-feature')
  ),
};

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const project = projectRegistry.find(p => p.projectSlug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-dark">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl md:text-3xl font-medium tracking-tight leading-tight text-surface-dark-foreground">
            Project not found
          </h1>
          <p className="text-lg text-surface-dark-muted">
            The project you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  const Content = contentMap[slug];

  return (
    <motion.div
      id="header"
      className="bg-surface-dark min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <ProjectHeader project={project} />

      <Suspense
        fallback={
          <div className="max-w-4xl mx-auto px-4">
            <div className="h-96 animate-pulse bg-surface-dark-card rounded-xl corner-squircle" />
          </div>
        }
      >
        <div className="pb-16">
          {Content ? (
            <Content />
          ) : (
            <div className="max-w-2.5xl mx-auto px-4 text-surface-dark-muted text-center py-20">
              Content coming soon.
            </div>
          )}
        </div>
      </Suspense>

      <ProjectNavigation currentProjectSlug={slug} />
    </motion.div>
  );
}
