'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { projectRegistry } from '@/app/data/projects';
import { writingRegistry } from '@/app/data/writing';
import { experimentRegistry } from '@/app/data/experiments';
import { projectContentSlugs } from '@/app/work/project/content-map';
import { writingContentSlugs } from '@/app/work/writing/content-map';
import { experimentContentSlugs } from '@/app/work/experiment/content-map';

interface NavItem {
  slug: string;
  title: string;
  type: 'project' | 'writing' | 'experiment';
  url: string;
}

// Build the sequential navigation chain from registries + content maps
const activeProjects: NavItem[] = [...projectRegistry]
  .filter(p => projectContentSlugs.includes(p.projectSlug))
  .sort((a, b) => a.order - b.order)
  .map(p => ({
    slug: p.projectSlug,
    title: p.title,
    type: 'project',
    url: `/work/project/${p.projectSlug}`,
  }));

const activeWritings: NavItem[] = [...writingRegistry]
  .filter(w => writingContentSlugs.includes(w.writingSlug))
  .sort((a, b) => a.order - b.order)
  .map(w => ({
    slug: w.writingSlug,
    title: w.title,
    type: 'writing',
    url: `/work/writing/${w.writingSlug}`,
  }));

const activeExperiments: NavItem[] = [...experimentRegistry]
  .filter(e => experimentContentSlugs.includes(e.experimentSlug))
  .sort((a, b) => a.order - b.order)
  .map(e => ({
    slug: e.experimentSlug,
    title: e.title,
    type: 'experiment',
    url: `/work/experiment/${e.experimentSlug}`,
  }));

const navItems: NavItem[] = [
  ...activeProjects,
  ...activeWritings,
  ...activeExperiments,
];

interface WorkNavigationProps {
  currentSlug: string;
}

const WorkNavigation: React.FC<WorkNavigationProps> = ({ currentSlug }) => {
  const currentIndex = navItems.findIndex(item => item.slug === currentSlug);

  if (currentIndex === -1) {
    return null;
  }

  const prevItem =
    currentIndex > 0
      ? navItems[currentIndex - 1]
      : navItems[navItems.length - 1];

  const nextItem =
    currentIndex < navItems.length - 1
      ? navItems[currentIndex + 1]
      : navItems[0];

  return (
    <motion.div
      className="w-full border-t border-border"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="max-w-2.5xl mx-auto px-4 py-8 flex justify-between items-start gap-6">
        <Link href={prevItem.url} className="group flex min-w-0 flex-col">
          <span className="text-sm text-muted-foreground">Previous</span>
          <span className="block truncate text-sm md:text-base font-medium text-foreground group-hover:text-accent transition-colors duration-200">
            {prevItem.title}
          </span>
        </Link>

        <Link
          href={nextItem.url}
          className="group flex min-w-0 flex-col items-end text-right"
        >
          <span className="text-sm text-muted-foreground">Next</span>
          <span className="block w-full truncate text-sm md:text-base font-medium text-foreground group-hover:text-accent transition-colors duration-200">
            {nextItem.title}
          </span>
        </Link>
      </div>
    </motion.div>
  );
};

export default WorkNavigation;
