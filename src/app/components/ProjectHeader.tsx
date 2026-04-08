'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import type { ProjectMeta } from '@/app/types';

interface ProjectHeaderProps {
  project: ProjectMeta;
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <header className="max-w-2xl mx-auto px-4 w-full flex flex-col justify-start items-start pt-16 pb-10 gap-6">
      <motion.h1
        className="text-2xl md:text-3xl font-medium tracking-tight leading-tight"
        style={{ color: project.titleColor || 'oklch(0.635 0.08 148)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
      >
        {project.title}
      </motion.h1>

      {project.date && (
        <motion.h3
          className="text-lg md:text-2xl font-normal opacity-80"
          style={{ color: project.subtitleColor || 'oklch(0.45 0.01 90)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.9 }}
        >
          {project.date}
        </motion.h3>
      )}

      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {project.tags.map(tag => (
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
  );
}
