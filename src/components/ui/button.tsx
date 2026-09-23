import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// Variant pattern (DESIGN.md → Components): every primitive composes named
// tokens only. `surface` picks the palette — `page` uses background/foreground
// (home, /work), `scene` uses surface-dark-* (detail pages, and chrome inside
// `.surface-lock-dark`).
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap corner-squircle text-sm font-medium tracking-heading transition-colors duration-200 ease-out motion-safe:active:scale-[0.96] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary-600',
        secondary: 'shadow-hairline',
        ghost: '',
        link: 'underline-offset-4 hover:underline',
      },
      surface: {
        page: '',
        scene: '',
      },
      size: {
        sm: 'h-8 rounded-small px-3 has-[>svg]:px-2.5',
        md: 'h-10 rounded-small px-4 has-[>svg]:px-3',
        lg: 'h-11 rounded-base px-6 has-[>svg]:px-4',
        icon: 'size-9 rounded-small',
      },
    },
    compoundVariants: [
      {
        variant: 'secondary',
        surface: 'page',
        className: 'bg-card text-foreground hover:bg-secondary',
      },
      {
        variant: 'secondary',
        surface: 'scene',
        className:
          'bg-surface-dark-card text-surface-dark-foreground hover:bg-surface-dark-elevated',
      },
      {
        variant: 'ghost',
        surface: 'page',
        className: 'text-foreground hover:bg-secondary',
      },
      {
        variant: 'ghost',
        surface: 'scene',
        className:
          'text-surface-dark-foreground hover:bg-surface-dark-elevated',
      },
      { variant: 'link', className: 'text-primary-700 hover:text-primary-500' },
    ],
    defaultVariants: {
      variant: 'primary',
      surface: 'page',
      size: 'md',
    },
  }
);

function Button({
  className,
  variant,
  surface,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, surface, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
