'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const ProjectsGrid = dynamic(
  () => import('@/app/components/projectHoverEffect/ProjectsGrid'),
  { ssr: false }
);

const ProjectGridMobile = dynamic(
  () => import('@/app/components/projectHoverEffect/ProjectsGridMobile'),
  { ssr: false }
);

export default function RecentProjects() {
  return (
    <section className="surface-lock-dark bg-surface-dark dark:bg-background rounded-[40px] corner-squircle h-full">
      <div className="max-w-7xl mx-auto">
        {/* Desktop project browser */}
        <div className="hidden md:block">
          <ProjectsGrid />
        </div>

        {/* Mobile project list */}
        <div className="md:hidden">
          <ProjectGridMobile />
        </div>
      </div>
    </section>
  );
}
