import React from 'react';
import { IconArrowUpRight } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { SectionHeading as BaseSectionHeading } from '@/app/components/ProjectLayout';

// Text primitives for the short-form experiment pages only. They keep one
// reading rhythm across all seven pages: body at text-base, 16px between
// paragraphs, headings tied closer to their text than to the block above.

const body = 'text-base leading-relaxed';

// Opening paragraph of a page. Same size as body, lifted by colour alone.
export function Lead({ children }: { children: React.ReactNode }) {
  return <p className={cn(body, 'text-surface-dark-foreground')}>{children}</p>;
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className={cn(body, 'text-muted-foreground')}>{children}</p>;
}

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return <BaseSectionHeading>{children}</BaseSectionHeading>;
}

// Sub-heading inside a section (h3 under SectionHeading's h2)
export function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-2 text-lg font-medium tracking-tight text-surface-dark-foreground">
      {children}
    </h3>
  );
}

// A sub-heading with the paragraphs and media that belong to it
export function Block({
  title,
  className,
  children,
}: {
  title?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn('space-y-4', className)}>
      {title && <SubHeading>{title}</SubHeading>}
      {children}
    </div>
  );
}

// Numbered list with an optional run-in title per item. Long lists can go
// two-up from md; below md every list is a single column.
export function ItemList({
  items,
  columns = 1,
}: {
  items: { title?: string; body: React.ReactNode }[];
  columns?: 1 | 2;
}) {
  return (
    <ol
      className={cn(
        'grid list-decimal gap-x-10 gap-y-4 pl-5 marker:text-surface-dark-muted',
        columns === 2 && 'md:grid-cols-2'
      )}
    >
      {items.map((item, i) => (
        <li
          key={item.title ?? i}
          className={cn(body, 'pl-1 text-muted-foreground')}
        >
          {item.title && (
            <span className="block font-medium text-surface-dark-foreground">
              {item.title}
            </span>
          )}
          {item.body}
        </li>
      ))}
    </ol>
  );
}

// Outbound link. primary-500 is under 3:1 on cream, so light mode uses
// primary-800 (about 4.7:1) and dark mode keeps primary-500.
export function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center gap-1 rounded-[8px] corner-squircle text-sm text-primary-800 underline-offset-4 transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:text-primary-500"
    >
      {children}
      <IconArrowUpRight size={16} stroke={1.5} aria-hidden="true" />
    </a>
  );
}
