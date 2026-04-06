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
          'py-5 px-2 -mx-2 cursor-pointer',
          'hover:bg-card/40 transition-colors duration-150',
          className
        )}
      >
        <p className="text-base font-medium text-foreground leading-snug">
          {title}
        </p>
        <p className="text-base text-muted-foreground leading-snug mt-1">
          {description}
        </p>
      </div>
    </Link>
  );
}
