import { projectRegistry } from '@/app/data/projects';
import { experimentRegistry } from '@/app/data/experiments';
import type { GalleryItem } from '@/app/types';

// The work shown on the home page: projects and experiments not opted out
// with `showInPreview: false`, in `order`. The desktop hover grid and the
// mobile list both read this, so they always show the same items.
export const previewGallery: GalleryItem[] = [
  ...projectRegistry,
  ...experimentRegistry,
]
  .filter(item => item.showInPreview !== false)
  .sort((a, b) => a.order - b.order);

export function galleryHref(item: GalleryItem): string {
  return item.type === 'project'
    ? `/work/project/${item.projectSlug}`
    : `/work/experiment/${item.experimentSlug}`;
}

// Registry `type` as a label for list meta
export const workTypeLabel: Record<
  'project' | 'experiment' | 'writing',
  string
> = {
  project: 'Project',
  experiment: 'Experiment',
  writing: 'Writing',
};
