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
          'py-5 px-3 -mx-3 cursor-pointer',
          'rounded-[12px] corner-squircle',
          'transition-colors duration-200',
          'hover:bg-secondary',
          className
        )}
      >
        <p className="text-base text-foreground">{title}</p>
        <p className="text-base text-normal text-muted-foreground mt-1">
          {description}
        </p>
      </div>
    </Link>
  );
}
