'use client';
import { useMemo } from 'react';
import { ProjectsPageContent } from '@/app/components/ProjectsPageContent';
import { capabilities } from '@/app/data/capabilities';
import { capabilityToGridItem } from '@/app/types';

export default function WorkPage() {
  const items = useMemo(() => capabilities.map(capabilityToGridItem), []);

  return <ProjectsPageContent items={items} />;
}
