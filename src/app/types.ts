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
  tags: string[];
  videoAlt?: string;
  titleColor?: string;
  subtitleColor?: string;
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
