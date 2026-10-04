import React from 'react';
import { IconArrowUpRight, IconBrandGithub } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

// "github.com/owner/repo" -> "owner/repo"
function repoPath(url: string) {
  return url
    .replace(/^https?:\/\/(www\.)?github\.com\//, '')
    .replace(/\/$/, '');
}

const focusRing =
  'outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50';

// Compact link that sits next to the page title. Icon-only on small
// screens, where the title needs the width; the full callout at the
// bottom of the page always carries the label.
export function RepoHeaderLink({
  url,
  className,
}: {
  url: string;
  className?: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Source code on GitHub (${repoPath(url)}), opens in a new tab`}
      className={cn(
        'group inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-1.5 rounded-[12px] corner-squircle border border-border px-3 text-sm font-medium tracking-tight',
        'text-primary-800 dark:text-primary-500 hover:text-primary-900 dark:hover:text-primary-400 hover:bg-surface-dark-elevated transition-colors duration-200',
        focusRing,
        className
      )}
    >
      <IconBrandGithub size={20} stroke={1.5} aria-hidden />
      <span className="hidden sm:inline">GitHub</span>
      <IconArrowUpRight
        size={16}
        stroke={1.5}
        aria-hidden
        className="hidden sm:inline transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:transform-none"
      />
    </a>
  );
}

// End-of-page callout: the natural next step after reading how it works.
export function RepoCallout({ url }: { url: string }) {
  const path = repoPath(url);

  return (
    <aside aria-label="Source code" className="max-w-2.5xl mx-auto px-4">
      <div className="flex flex-col gap-4 rounded-[20px] corner-squircle border border-border bg-surface-dark-card p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <IconBrandGithub
            size={24}
            stroke={1.5}
            aria-hidden
            className="shrink-0 text-surface-dark-foreground"
          />
          <div className="min-w-0">
            <p className="text-sm text-surface-dark-muted">
              The code is open source
            </p>
            <p className="truncate font-medium tracking-tight text-surface-dark-foreground">
              {path}
            </p>
          </div>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-[8px] corner-squircle bg-primary px-4 py-2 font-medium tracking-tight text-primary-foreground hover:bg-primary-600 transition-colors duration-200',
            focusRing
          )}
        >
          View on GitHub
          <IconArrowUpRight
            size={16}
            stroke={1.5}
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:transform-none"
          />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </aside>
  );
}
