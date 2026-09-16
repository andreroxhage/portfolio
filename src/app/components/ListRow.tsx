import Link from 'next/link';
import { IconChevronRight } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

interface ListRowProps {
  title: string;
  description: string;
  href: string;
  year?: string;
  className?: string;
}

export function ListRow({
  title,
  description,
  href,
  year,
  className,
}: ListRowProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group block -mx-3 my-4 px-3 py-3',
        'rounded-[12px] corner-squircle',
        'transition-colors duration-200 ease-out',
        'hover:bg-secondary active:bg-muted',
        'outline-none focus-visible:bg-secondary focus-visible:ring-2 focus-visible:ring-ring',
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-base text-foreground/90 tracking-wide">{title}</p>
          <p className="text-base font-normal text-muted-foreground/90 mt-1 tracking-wide">
            {description}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {year && (
            <span className="mt-0.5 text-sm tracking-wide tabular-nums text-muted-foreground/50">
              {year}
            </span>
          )}
          <IconChevronRight
            size={16}
            stroke={1.5}
            aria-hidden
            className="mt-0.5 shrink-0 text-muted-foreground/35 transition-[color,transform] duration-200 ease-out group-hover:text-muted-foreground/80 group-hover:translate-x-0.5 group-focus-visible:text-muted-foreground/80 group-focus-visible:translate-x-0.5"
          />
        </div>
      </div>
    </Link>
  );
}
