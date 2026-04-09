'use client';
import React, { lazy, Suspense, use } from 'react';
import { motion } from 'framer-motion';
import { writingRegistry } from '@/app/data/writing';
import WritingNavigation from '@/app/components/WritingNavigation';
import { DURATION, EASING, STAGGER } from '@/app/lib/motion';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';

const contentMap: Record<string, React.ComponentType> = {
  'ai-as-a-second-opinion': lazy(
    () => import('./content/ai-as-a-second-opinion')
  ),
};

export default function WritingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const reducedMotion = useReducedMotion();
  const writing = writingRegistry.find(w => w.writingSlug === slug);

  if (!writing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-dark">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl md:text-3xl font-medium tracking-tight leading-tight text-surface-dark-foreground">
            Article not found
          </h1>
        </div>
      </div>
    );
  }

  const Content = contentMap[slug];

  return (
    <motion.div
      className="bg-surface-dark min-h-screen"
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: DURATION.MEDIUM, ease: EASING.ENTER }}
    >
      <header className="max-w-2.5xl mx-auto px-4 w-full flex flex-col justify-start items-start pt-16 pb-14 gap-6">
        <motion.h1
          className="text-2xl md:text-3xl font-medium tracking-tight leading-tight text-primary-700"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.SLOW, ease: EASING.ENTER }}
        >
          {writing.title}
        </motion.h1>
        {writing.date && (
          <motion.h3
            className="text-lg md:text-2xl font-normal text-surface-dark-muted"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: DURATION.SLOW,
              ease: EASING.ENTER,
              delay: reducedMotion ? 0 : STAGGER.DELAY,
            }}
          >
            {writing.date}
          </motion.h3>
        )}
      </header>

      <Suspense
        fallback={
          <div className="max-w-2.5xl mx-auto px-4">
            <div className="h-96 animate-pulse bg-surface-dark-card rounded-xl corner-squircle" />
          </div>
        }
      >
        <div className="pb-20">
          {Content ? (
            <Content />
          ) : (
            <div className="max-w-2.5xl mx-auto px-4 text-surface-dark-muted py-20">
              <p className="text-lg mb-4">{writing.subtitle}</p>
              <p className="text-sm text-surface-dark-muted/60">
                Content coming soon.
              </p>
            </div>
          )}
        </div>
      </Suspense>

      <WritingNavigation currentWritingSlug={slug} />
    </motion.div>
  );
}
