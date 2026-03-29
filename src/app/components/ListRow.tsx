import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ListRowProps {
  title: string;
  description: string;
  href: string;
  className?: string;
}

export function ListRow({ title, description, href, className }: ListRowProps) {
  return (
    <Link href={href} className="block">
      <div
        className={cn(
          'py-3 px-2 -mx-2 border-b border-surface-dark-elevated cursor-pointer',
          'hover:bg-surface-dark-card/40 transition-colors duration-150',
          className
        )}
      >
        <p className="text-sm font-medium text-surface-dark-foreground leading-snug">
          {title}
        </p>
        <p className="text-sm text-surface-dark-muted leading-snug mt-0.5">
          {description}
        </p>
      </div>
    </Link>
  );
}
