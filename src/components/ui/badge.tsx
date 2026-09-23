import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// Pill-shaped label. `rounded-full` is a circle-family radius, so no
// corner-squircle (DESIGN.md → Border Radius Scale).
const badgeVariants = cva(
  'inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0 tabular-nums [&>svg]:size-3 [&>svg]:pointer-events-none',
  {
    variants: {
      variant: {
        neutral: 'shadow-hairline',
        primary: 'bg-primary text-primary-foreground',
        outline: 'border border-border',
      },
      surface: {
        page: '',
        scene: '',
      },
    },
    compoundVariants: [
      {
        variant: 'neutral',
        surface: 'page',
        className: 'bg-secondary text-muted-foreground',
      },
      {
        variant: 'neutral',
        surface: 'scene',
        className: 'bg-surface-dark-elevated text-surface-dark-muted',
      },
      { variant: 'outline', surface: 'page', className: 'text-foreground' },
      {
        variant: 'outline',
        surface: 'scene',
        className: 'text-surface-dark-foreground',
      },
    ],
    defaultVariants: {
      variant: 'neutral',
      surface: 'page',
    },
  }
);

function Badge({
  className,
  variant,
  surface,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, surface }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
