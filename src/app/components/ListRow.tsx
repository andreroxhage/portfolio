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
          'py-3 px-3 -mx-3 my-4 cursor-pointer',
          'rounded-[12px] corner-squircle',
          'transition-colors duration-200',
          'hover:bg-secondary',
          className
        )}
      >
        <p className="text-base text-foreground/90 tracking-wide">{title}</p>
        <p className="text-base text-normal text-muted-foreground/90 mt-1 tracking-wide">
          {description}
        </p>
      </div>
    </Link>
  );
}
