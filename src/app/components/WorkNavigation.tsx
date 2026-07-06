'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { projectRegistry } from '@/app/data/projects';
import { writingRegistry } from '@/app/data/writing';
import { experimentRegistry } from '@/app/data/experiments';
import { useTheme } from '@/app/contexts/ThemeContext';
import { projectContentSlugs } from '@/app/work/project/content-map';
import { writingContentSlugs } from '@/app/work/writing/content-map';
import { experimentContentSlugs } from '@/app/work/experiment/content-map';

interface NavItem {
  slug: string;
  title: string;
  type: 'project' | 'writing' | 'experiment';
  url: string;
  titleColor?: string;
  titleColorLight?: string;
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
    titleColor: p.titleColor,
    titleColorLight: p.titleColorLight,
  }));

const activeWritings: NavItem[] = [...writingRegistry]
  .filter(w => writingContentSlugs.includes(w.writingSlug))
  .sort((a, b) => a.order - b.order)
  .map(w => ({
    slug: w.writingSlug,
    title: w.title,
    type: 'writing',
    url: `/work/writing/${w.writingSlug}`,
    titleColor: 'oklch(0.635 0.08 148)',
    titleColorLight: 'oklch(0.635 0.08 148)',
  }));

const activeExperiments: NavItem[] = [...experimentRegistry]
  .filter(e => experimentContentSlugs.includes(e.experimentSlug))
  .sort((a, b) => a.order - b.order)
  .map(e => ({
    slug: e.experimentSlug,
    title: e.title,
    type: 'experiment',
    url: `/work/experiment/${e.experimentSlug}`,
    titleColor: 'oklch(0.635 0.08 148)',
    titleColorLight: 'oklch(0.635 0.08 148)',
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
  const { resolvedTheme, mounted } = useTheme();
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

  const getTypeLabel = (type: 'project' | 'writing' | 'experiment') => {
    if (type === 'project') {
      return 'Project';
    }
    if (type === 'writing') {
      return 'Article';
    }
    return 'Experiment';
  };

  const getTitleColor = (item: NavItem) => {
    if (mounted && resolvedTheme === 'light' && item.titleColorLight) {
      return item.titleColorLight;
    }
    return item.titleColor || 'oklch(0.635 0.08 148)';
  };

  return (
    <motion.div
      className="w-full border-t border-border"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="max-w-2.5xl mx-auto px-4 py-8 flex justify-between items-center">
        <Link
          href={prevItem.url}
          className="group flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          <motion.div whileHover={{ x: -4 }} transition={{ duration: 0.2 }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-foreground group-hover:text-foreground group-hover:scale-110 transition-all duration-300 mr-[-2px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </motion.div>
          <div className="text-left">
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium opacity-80">
              Previous {getTypeLabel(prevItem.type)}
            </div>
            <span
              className="font-medium duration-300 text-sm md:text-base"
              style={{ color: getTitleColor(prevItem) }}
            >
              {prevItem.title}
            </span>
          </div>
        </Link>

        <Link
          href={nextItem.url}
          className="group flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          <div className="text-right">
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium opacity-80">
              Next {getTypeLabel(nextItem.type)}
            </div>
            <span
              className="font-medium duration-300 text-sm md:text-base"
              style={{ color: getTitleColor(nextItem) }}
            >
              {nextItem.title}
            </span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-foreground group-hover:text-foreground group-hover:scale-110 transition-all duration-300 ml-[-2px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

export default WorkNavigation;
