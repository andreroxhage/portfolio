// Registry types for the split data layer

export interface ProjectMeta {
  projectSlug: string;
  title: string;
  subtitle: string;
  previewSubtitle?: string;
  showInPreview?: boolean;
  date: string;
  image?: string;
  imageAlt?: string;
  videoIdentifier?: string;
  posterImage?: string;
  imageFader?: string[];
  intervalTime?: number;
  roundedCorners?: boolean;
  tags?: string[];
  order: number;
  type: 'project';
  titleColor?: string;
  subtitleColor?: string;
  titleColorLight?: string;
  subtitleColorLight?: string;
}

export interface ExperimentMeta {
  id: string;
  experimentSlug: string;
  title: string;
  subtitle: string;
  previewSubtitle?: string;
  showInPreview?: boolean;
  date: string;
  image?: string;
  imageAlt?: string;
  videoIdentifier?: string;
  posterImage?: string;
  imageFader?: string[];
  intervalTime?: number;
  roundedCorners?: boolean;
  tags?: string[];
  order: number;
  type: 'experiment';
}

export type GalleryItem = ProjectMeta | ExperimentMeta;

export interface WritingMeta {
  writingSlug: string;
  title: string;
  subtitle: string;
  date: string;
  url?: string;
  order: number;
  type: 'writing';
}

// Unified item type consumed by ProjectsGrid and its children
export interface GridItem {
  id: string;
  title: string;
  subtitle: string;
  previewSubtitle?: string;
  image?: string;
  imageAlt?: string;
  videoIdentifier?: string;
  posterImage?: string;
  imageFader?: string[];
  intervalTime?: number;
  roundedCorners?: boolean;
  order: number;
  href?: string;
  titleColor?: string;
  subtitleColor?: string;
  titleColorLight?: string;
  subtitleColorLight?: string;
}

export function galleryItemToGridItem(item: GalleryItem): GridItem {
  if (item.type === 'project') {
    return {
      id: item.projectSlug,
      title: item.title,
      subtitle: item.subtitle,
      previewSubtitle: item.previewSubtitle,
      image: item.image,
      imageAlt: item.imageAlt,
      videoIdentifier: item.videoIdentifier,
      posterImage: item.posterImage,
      imageFader: item.imageFader,
      intervalTime: item.intervalTime,
      roundedCorners: item.roundedCorners,
      order: item.order,
      href: `/work/project/${item.projectSlug}`,
      titleColor: item.titleColor,
      subtitleColor: item.subtitleColor,
      titleColorLight: item.titleColorLight,
      subtitleColorLight: item.subtitleColorLight,
    };
  }
  return {
    id: item.experimentSlug,
    title: item.title,
    subtitle: item.subtitle,
    previewSubtitle: item.previewSubtitle,
    image: item.image,
    imageAlt: item.imageAlt,
    videoIdentifier: item.videoIdentifier ?? item.id,
    posterImage: item.posterImage,
    imageFader: item.imageFader,
    intervalTime: item.intervalTime,
    roundedCorners: item.roundedCorners,
    order: item.order,
    href: `/work/experiment/${item.experimentSlug}`,
  };
}
