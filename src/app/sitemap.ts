import type { MetadataRoute } from 'next';
import { projectRegistry } from '@/app/data/projects';
import { experimentRegistry } from '@/app/data/experiments';
import { writingRegistry } from '@/app/data/writing';

const BASE_URL = 'https://andreroxhage.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
    },
    {
      url: `${BASE_URL}/work`,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projectRegistry.map(project => ({
    url: `${BASE_URL}/work/project/${project.projectSlug}`,
  }));

  const experimentRoutes: MetadataRoute.Sitemap = experimentRegistry.map(
    experiment => ({
      url: `${BASE_URL}/work/experiment/${experiment.experimentSlug}`,
    })
  );

  const writingRoutes: MetadataRoute.Sitemap = writingRegistry.map(writing => ({
    url: `${BASE_URL}/work/writing/${writing.writingSlug}`,
  }));

  return [
    ...staticRoutes,
    ...projectRoutes,
    ...experimentRoutes,
    ...writingRoutes,
  ];
}
