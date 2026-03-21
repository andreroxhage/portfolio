'use client';
import { ProjectsPageContent } from '@/app/components/ProjectsPageContent';
import { CapabilitiesHero } from '@/app/components/CapabilitiesHero';

export default function WorkPage() {
  return (
    <ProjectsPageContent
      heroMode="capabilities"
      heroContent={<CapabilitiesHero />}
    />
  );
}
