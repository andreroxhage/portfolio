import type { MetadataRoute } from 'next';
import { projectRegistry } from '@/app/data/projects';
import { ideaRegistry } from '@/app/data/ideas';
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

  const ideaRoutes: MetadataRoute.Sitemap = ideaRegistry.map(idea => ({
    url: `${BASE_URL}/work/idea/${idea.ideaSlug}`,
  }));

  const writingRoutes: MetadataRoute.Sitemap = writingRegistry.map(writing => ({
    url: `${BASE_URL}/work/writing/${writing.writingSlug}`,
  }));

  return [...staticRoutes, ...projectRoutes, ...ideaRoutes, ...writingRoutes];
}
