'use client';
import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { writingRegistry } from '@/app/data/writing';
import WorkNavigation from '@/app/components/WorkNavigation';
import WorkBreadcrumb from '@/app/components/WorkBreadcrumb';
import { DURATION, EASING, STAGGER } from '@/app/lib/motion';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';
import { writingContentMap as contentMap } from '@/app/work/writing/content-map';

export default function WritingPageClient({ slug }: { slug: string }) {
  const reducedMotion = useReducedMotion();
  const writing = writingRegistry.find(w => w.writingSlug === slug);

  if (!writing) {
    return null;
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
        <WorkBreadcrumb title={writing.title} year={writing.date} />
        <motion.h1
          className="text-2xl md:text-3xl font-medium tracking-tight leading-tight text-primary-700"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: DURATION.SLOW,
            ease: EASING.ENTER,
            delay: reducedMotion ? 0 : STAGGER.DELAY,
          }}
        >
          {writing.title}
        </motion.h1>
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

      <WorkNavigation currentSlug={slug} />
    </motion.div>
  );
}
