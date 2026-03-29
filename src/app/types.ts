export interface Section {
  title?: string;
  layout?: 'middle' | 'two-col' | 'full-width';
  content: Array<{
    type: string;
    column?: string;
    [key: string]: any;
  }>;
}

// Base interface for common properties between projects and ideas
interface BaseItem {
  title: string;
  subtitle?: string;
  date?: string;
  tags?: string[];
  videoAlt?: string;
  titleColor?: string;
  subtitleColor?: string;
  roundedCorners?: boolean; // Controls video dialog corner rounding
  imageFader?: any[]; // Array of images for slider (instead of video)
  intervalTime?: number; // Interval time for image slider in ms
  order?: number; // Display order (lower numbers appear first)
}

// Project specific interface
interface ProjectItem extends BaseItem {
  projectSlug: string;
  headerSrc?: string;
  image: string;
  imageAlt: string;
  sections?: Section[];
  id?: never; // Projects don't have an id
}

// Idea specific interface
interface IdeaItem extends BaseItem {
  id: string;
  image?: string;
  imageAlt?: string;
  projectSlug?: never; // Ideas don't have a projectSlug
}

// Union type that can be either a project or an idea
export type Project = ProjectItem | IdeaItem;

// Registry types for the split data layer

export interface ProjectMeta {
  projectSlug: string;
  title: string;
  subtitle: string;
  date: string;
  image: string;
  imageAlt: string;
  videoIdentifier?: string;
  tags?: string[];
  order: number;
  type: 'project';
  titleColor?: string;
  subtitleColor?: string;
}

export interface IdeaMeta {
  id: string;
  ideaSlug: string;
  title: string;
  subtitle: string;
  date: string;
  image?: string;
  imageAlt?: string;
  imageFader?: string[];
  intervalTime?: number;
  roundedCorners?: boolean;
  tags?: string[];
  order: number;
  type: 'idea';
  hasDetailPage: boolean;
}

export type GalleryItem = ProjectMeta | IdeaMeta;

export interface WritingMeta {
  writingSlug: string;
  title: string;
  subtitle: string;
  date: string;
  url?: string;
  order: number;
  type: 'writing';
}

export interface Capability {
  id: string;
  title: string;
  description: string;
  videoIdentifier?: string;
  imageSrc?: string;
  imageAlt?: string;
  order: number;
}

// Unified item type consumed by ProjectsGrid and its children
export interface GridItem {
  id: string;
  title: string;
  subtitle: string;
  image?: string;
  imageAlt?: string;
  videoIdentifier?: string;
  imageFader?: string[];
  intervalTime?: number;
  roundedCorners?: boolean;
  order: number;
  href?: string;
  titleColor?: string;
  subtitleColor?: string;
}

export function galleryItemToGridItem(item: GalleryItem): GridItem {
  if (item.type === 'project') {
    return {
      id: item.projectSlug,
      title: item.title,
      subtitle: item.subtitle,
      image: item.image,
      imageAlt: item.imageAlt,
      videoIdentifier: item.videoIdentifier,
      order: item.order,
      href: `/projects/${item.projectSlug}`,
      titleColor: item.titleColor,
      subtitleColor: item.subtitleColor,
    };
  }
  return {
    id: item.ideaSlug,
    title: item.title,
    subtitle: item.subtitle,
    image: item.image,
    imageAlt: item.imageAlt,
    imageFader: item.imageFader,
    intervalTime: item.intervalTime,
    roundedCorners: item.roundedCorners,
    order: item.order,
    href: `/ideas/${item.ideaSlug}`,
  };
}

export function capabilityToGridItem(cap: Capability): GridItem {
  return {
    id: cap.id,
    title: cap.title,
    subtitle: cap.description,
    image: cap.imageSrc,
    imageAlt: cap.imageAlt,
    videoIdentifier: cap.videoIdentifier,
    order: cap.order,
    // No href — capabilities have no detail pages
  };
}
