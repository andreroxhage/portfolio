export interface Project {
  title: string;
  subtitle: string;
  headerSrc?: string;
  image: string;
  titleColor?: string;
  subtitleColor?: string;
  date: string;
  projectSlug?: string;
  tags: string[];
  imageAlt: string;
  sections?: any[]; // Or define a proper type for sections if needed
  videoAlt?: string; // Make videoAlt optional since it's not present in all items
}
