'use client';
import React, { lazy, Suspense, use } from 'react';
import { motion } from 'framer-motion';
import { projectRegistry } from '@/app/data/projects';
import ProjectNavigation from '@/app/components/ProjectNavigation';
import ProjectHeader from '@/app/components/ProjectHeader';
import Footer from '@/app/sections/Footer';

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
  params: Promise<{ projectSlug: string }>;
}) {
  const { projectSlug } = use(params);
  const project = projectRegistry.find(p => p.projectSlug === projectSlug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-dark">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl md:text-6xl font-medium tracking-tighter text-surface-dark-foreground">
            Project not found
          </h1>
          <p className="text-lg text-surface-dark-muted">
            The project you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  const Content = contentMap[projectSlug];

  return (
    <motion.div
      id="header"
      className="bg-surface-dark"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <ProjectHeader project={project} />

      <Suspense
        fallback={
          <div className="max-w-2xl mx-auto px-4">
            <div className="h-96 animate-pulse bg-surface-dark-card rounded-xl corner-squircle" />
          </div>
        }
      >
        <div className="max-w-2xl mx-auto px-4 pb-16">
          {Content ? (
            <Content />
          ) : (
            <div className="text-surface-dark-muted text-center py-20">
              Content coming soon.
            </div>
          )}
        </div>
      </Suspense>

      <ProjectNavigation currentProjectSlug={projectSlug} />
      <Footer />
    </motion.div>
  );
}
