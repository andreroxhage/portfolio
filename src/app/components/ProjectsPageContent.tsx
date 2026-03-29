'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion';
import { IconChevronDown } from '@tabler/icons-react';
import { SimpleList } from '@/app/components/SimpleList';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';
import { EASING } from '@/app/lib/motion';
import type { GridItem } from '@/app/types';

const ProjectsGrid = dynamic(
  () => import('@/app/components/projectHoverEffect/ProjectsGrid'),
  { ssr: false }
);

const ProfileSection: React.FC = () => (
  <Link href="/" className="flex gap-8 items-center justify-start group">
    <div className="flex flex-col gap-[6px] justify-center items-start">
      <motion.h1
        className="text-4xl md:text-6xl font-medium tracking-tighter text-surface-dark-foreground group-hover:text-accent transition-all duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
      >
        André Roxhage
      </motion.h1>
    </div>
  </Link>
);

function ScrollIndicator({
  galleryRef,
}: {
  galleryRef: React.RefObject<HTMLDivElement | null>;
}) {
  const reduced = useReducedMotion();

  const handleClick = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleClick}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-primary-500 cursor-pointer"
      aria-label="Scroll to gallery"
    >
      <motion.div
        animate={reduced ? undefined : { y: [0, 8, 0] }}
        transition={
          reduced
            ? undefined
            : {
                duration: 2,
                repeat: Infinity,
                ease: EASING.STANDARD,
              }
        }
      >
        <IconChevronDown size={28} stroke={2} />
      </motion.div>
    </button>
  );
}

interface ProjectsPageContentProps {
  items?: GridItem[];
}

export function ProjectsPageContent({ items }: ProjectsPageContentProps) {
  const galleryTriggerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: galleryTriggerRef,
    offset: ['start end', 'start start'],
  });
  const backgroundAlpha = useTransform(scrollYProgress, [0.35, 1], [0.0, 0.3]);
  const pageBackgroundColor = useMotionTemplate`oklch(var(--surface-dark-elevated) / ${backgroundAlpha})`;

  return (
    <motion.div style={{ backgroundColor: pageBackgroundColor }}>
      {/* Hero section — full viewport */}
      <div id="header" className="relative h-screen overflow-hidden">
        <div className="max-w-7xl px-4 mx-auto h-full flex flex-col py-20 text-surface-dark-foreground">
          <div className="flex items-center justify-between w-full">
            <ProfileSection />
          </div>
          <ProjectsGrid items={items} />
        </div>

        {/* Shadow overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-black/40 pointer-events-none" />

        {/* Scroll indicator */}
        <ScrollIndicator galleryRef={galleryTriggerRef} />
      </div>

      {/* List section — below the fold */}
      <div ref={galleryTriggerRef}>
        <SimpleList />
      </div>
    </motion.div>
  );
}
