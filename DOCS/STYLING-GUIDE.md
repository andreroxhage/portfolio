# Portfolio Styling Guide

How to extend the global styling, update Tailwind, and work with shadcn/ui components.

## Color System Architecture

The portfolio uses a **dual-layer color system**:

1. **Brand colors** — Direct Tailwind classes (`bg-brand-cream`, `text-brand-grey`) defined in `tailwind.config.ts`
2. **Semantic tokens** — CSS custom properties (`--background`, `--primary`) defined in `src/app/globals.css`

### Brand → Semantic Token Mapping

| Semantic Token | Light Mode Source | Hex | Tailwind Class |
|----------------|-------------------|-----|----------------|
| `--background` | brand-vanilla | `#FAEFDE` | `bg-background` |
| `--foreground` | brand-grey | `#40403B` | `text-foreground` |
| `--card` | brand-whiteish | `#FEFEFE` | `bg-card` |
| `--primary` | primary-500 | `#88C075` | `bg-primary` |
| `--secondary` | brand-cream | `#EBE1D1` | `bg-secondary` |
| `--muted` | brand-cream | `#EBE1D1` | `bg-muted` |
| `--muted-foreground` | brand-grey-brighter | `#5D5D56` | `text-muted-foreground` |
| `--accent` | secondary-green-lighter | `#D3E9C2` | `bg-accent` |
| `--destructive` | accent-600 | `#ea580c` | `bg-destructive` |
| `--border` | brand-cream | `#EBE1D1` | `border-border` |
| `--ring` | primary-500 | `#88C075` | `ring-ring` |

### When to Use Which

- **Existing components**: Keep using direct brand classes (`bg-brand-cream`, `text-brand-grey`)
- **New components**: Prefer semantic tokens (`bg-background`, `text-foreground`)
- **shadcn/ui components**: Always use semantic tokens (they're built for it)
- **Gradual migration**: Over time, replace brand classes with semantic equivalents

## How to Add New Colors

### Adding a brand color

Edit `tailwind.config.ts` → `theme.extend.colors`:

```typescript
colors: {
  brand: {
    // existing colors...
    'new-color': '#HEXVAL',
  }
}
```

### Adding a semantic token

1. Add the CSS variable in `src/app/globals.css` under `:root` (and `.dark`):

```css
:root {
  --my-token: 210 40% 98%;  /* HSL values without hsl() wrapper */
}
.dark {
  --my-token: 210 40% 10%;
}
```

2. Use in components as `hsl(var(--my-token))` or add to Tailwind config.

### CSS Variable Format

Semantic tokens use **HSL values without the `hsl()` wrapper**:
```css
--primary: 106 35% 61%;  /* H S% L% — no hsl(), no commas */
```

Use in CSS/Tailwind as: `hsl(var(--primary))` or `bg-primary` (when configured in Tailwind).

## How to Add shadcn/ui Components

```bash
# Add a single component
npx shadcn@latest add button

# Add multiple components
npx shadcn@latest add button card dialog

# List available components
npx shadcn@latest add
```

Components are installed to `src/components/ui/`. They automatically use the semantic tokens defined in `globals.css`.

### Configuration

shadcn/ui is configured in `components.json`:

| Setting | Value | Notes |
|---------|-------|-------|
| Style | default | Component visual style |
| Base color | neutral | Maps to our warm neutral scale |
| CSS variables | true | Uses `--background`, `--primary`, etc. |
| RSC | true | React Server Components support |
| UI path | `@/components/ui` | Where components are installed |
| Utils path | `@/lib/utils` | Where `cn()` lives |

### Class Merging

Always use `cn()` for conditional classes:

```tsx
import { cn } from '@/lib/utils';

<Button className={cn('w-full', isCompact && 'w-auto')} />
```

## Tailwind Configuration

### Current Setup (Tailwind 3)

Configuration lives in `tailwind.config.ts` with:
- Custom brand/primary/accent/neutral color scales
- Custom font sizes (8.5xl, 9.5xl)
- Custom animations (shimmer, aurora)
- Custom box shadow (customShadow)
- Custom breakpoint (3xl: 1600px)
- `@toolwind/corner-shape` plugin (provides `corner-squircle`)
- `addVariablesForColors` plugin (generates CSS vars for all colors)

### After Tailwind 4 Migration

All config moves to CSS-first approach in `globals.css`:
- `@theme inline { }` block replaces `tailwind.config.ts`
- `@import 'tailwindcss'` replaces `@tailwind` directives
- CSS variables auto-generated (no plugin needed)
- `corner-squircle` becomes a custom `@utility`

## Dark Mode

### Current Status

- **Light mode**: Fully defined with semantic tokens mapped to brand palette
- **Dark mode**: Placeholder values defined in `.dark` class — to be finalized after visual design audit
- **Switching**: Class-based (`darkMode: 'class'` in Tailwind config)

### Preparing a Component for Dark Mode

If you use semantic tokens, dark mode works automatically:

```tsx
// This works in both light and dark mode
<div className="bg-background text-foreground border-border">
  <p className="text-muted-foreground">Subtitle</p>
</div>
```

Direct brand classes (`bg-brand-cream`) do NOT auto-switch. For dark mode support, prefer semantic alternatives or add explicit dark variants:

```tsx
// Option A: Semantic token (auto-switches)
<div className="bg-secondary" />

// Option B: Explicit dark variant
<div className="bg-brand-cream dark:bg-neutral-800" />
```

### Adding Dark Mode Toggle

Once dark mode values are finalized:
1. Install `next-themes`: `npm install next-themes`
2. Add `ThemeProvider` to `layout.tsx`
3. Create a toggle component using shadcn/ui

## Corner Shapes

The `corner-squircle` class creates iOS-style superellipse corners. Always pair with `rounded-[Npx]`:

```html
<div class="rounded-[40px] corner-squircle">Large radius</div>
<div class="rounded-[12px] corner-squircle">Medium radius</div>
<div class="rounded-[8px] corner-squircle">Small radius</div>
```

## Animation Guidelines

- Use `animate-shimmer` for loading states
- Use `animate-aurora` for ambient background effects
- Use Framer Motion for component transitions (150-300ms)
- Always check `useReducedMotion()` hook before animating
