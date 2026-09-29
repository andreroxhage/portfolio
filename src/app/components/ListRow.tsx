import Link from 'next/link';
import { IconChevronRight } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

interface ListRowProps {
  title: string;
  description: string;
  href: string;
  /** Short facts after the title, e.g. year and type */
  meta?: string;
  className?: string;
}

export function ListRow({
  title,
  description,
  href,
  meta,
  className,
}: ListRowProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group block -mx-3 my-4 px-3 py-3 min-h-11',
        'rounded-[12px] corner-squircle',
        'transition-colors duration-200 ease-out',
        'hover:bg-secondary active:bg-muted',
        'outline-none focus-visible:bg-secondary focus-visible:ring-2 focus-visible:ring-ring',
        className
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          {/* Meta wraps under the title when both don't fit on one line */}
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
            <p className="min-w-0 text-base font-medium text-foreground">
              {title}
            </p>
            {meta && (
              <p className="shrink-0 text-sm text-muted-foreground tabular-nums">
                {meta}
              </p>
            )}
          </div>
          <p className="text-base font-normal text-muted-foreground mt-1">
            {description}
          </p>
        </div>
        <IconChevronRight
          size={16}
          stroke={1.5}
          aria-hidden
          className="shrink-0 text-muted-foreground/35 transition-colors duration-200 ease-out group-hover:text-muted-foreground group-focus-visible:text-muted-foreground"
        />
      </div>
    </Link>
  );
}
