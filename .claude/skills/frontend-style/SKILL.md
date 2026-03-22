---
name: frontend-style
description: Portfolio UI design-system guardrails. Use for any visual/styled change (Tailwind classes, colors/tokens, typography, spacing/layout, component styling, shadcn customization, icons, shadows, and motion/reduced-motion behavior).
origin: portfolio
---

# Portfolio Frontend Style Guide

## Visual Identity: Warm & Organic

The portfolio uses a warm, natural color palette evoking cream paper, forest greens, and earth tones. The aesthetic is professional yet inviting — not clinical or corporate.

## Color Palette

### Brand Colors (core identity)

| Token                 | Hex       | Usage                                  |
| --------------------- | --------- | -------------------------------------- |
| `brand-blackish`      | `#222222` | Primary dark text, dark backgrounds    |
| `brand-whiteish`      | `#FEFEFE` | Light text on dark, light backgrounds  |
| `brand-vanilla`       | `#FAEFDE` | Page background, section backgrounds   |
| `brand-grey`          | `#40403B` | Headings, primary body text            |
| `brand-grey-brighter` | `#5D5D56` | Secondary text, subtle labels          |
| `brand-cream`         | `#EBE1D1` | Card backgrounds, borders, muted areas |

### Primary Scale (green — nature-inspired)

| Token         | Hex       | Usage                            |
| ------------- | --------- | -------------------------------- |
| `primary-50`  | `#F4F9F0` | Lightest tint, hover backgrounds |
| `primary-100` | `#E7F3DD` | Light accent backgrounds         |
| `primary-200` | `#D3E9C2` | Borders, dividers                |
| `primary-300` | `#B8DDA5` | Active states                    |
| `primary-400` | `#9CC988` | Secondary buttons                |
| `primary-500` | `#88C075` | **Primary action color**         |
| `primary-600` | `#7DAA6F` | Hover on primary                 |
| `primary-700` | `#739966` | Active on primary                |
| `primary-800` | `#5D7D52` | Dark accents                     |
| `primary-900` | `#4A6542` | Dark emphasis                    |
| `primary-950` | `#2D3D28` | Darkest primary                  |

### Secondary Green

| Token                     | Hex       |
| ------------------------- | --------- |
| `secondary-green`         | `#BCE5AE` |
| `secondary-green-darker`  | `#739966` |
| `secondary-green-lighter` | `#D3E9C2` |

### Custom Muted Tones

| Token           | Hex       | Character   |
| --------------- | --------- | ----------- |
| `custom-green`  | `#BCD3BB` | Sage        |
| `custom-brown`  | `#D3C4BB` | Warm clay   |
| `custom-yellow` | `#D1D3BB` | Dried grass |
| `custom-blue`   | `#BBCCD3` | Mist        |

### Accent (orange warmth)

Full scale `accent-50` through `accent-950`. Used sparingly for highlights, CTAs on dark backgrounds.

### Neutral (warm earth)

Full scale `neutral-50` (#faf9f7) through `neutral-950` (#2a2420). These are warm-toned, NOT cool grays.

### Semantic Tokens (CSS variables)

| Token                | Light Value             | Purpose                                    |
| -------------------- | ----------------------- | ------------------------------------------ |
| `--background`       | brand-vanilla           | Page background                            |
| `--foreground`       | brand-grey              | Default text                               |
| `--card`             | brand-whiteish          | Card surfaces                              |
| `--primary`          | primary-500             | Action color                               |
| `--secondary`        | brand-cream             | Secondary surfaces                         |
| `--muted`            | brand-cream             | Muted backgrounds                          |
| `--muted-foreground` | brand-grey-brighter     | Muted text                                 |
| `--accent`           | secondary-green-lighter | Accent backgrounds                         |
| `--destructive`      | accent-600              | Destructive actions (warm orange, not red) |
| `--border`           | brand-cream             | Default borders                            |
| `--ring`             | primary-500             | Focus rings                                |

## Typography

- **Font family**: Roboto sans-serif (global)
- **Custom sizes**: `text-8.5xl` (6.5rem), `text-9.5xl` (10rem) for hero headings
- **Headings**: Always `text-brand-grey`
- **Body text**: `text-brand-grey` or `text-brand-grey-brighter`

## Corner Shapes

The portfolio uses `corner-squircle` extensively for iOS-style superellipse corners:

```html
<!-- Standard pattern: rounded-[Npx] + corner-squircle -->
<div class="rounded-[40px] corner-squircle">
  <!-- Large: dialogs, videos -->
  <div class="rounded-[12px] corner-squircle">
    <!-- Medium: cards, panels -->
    <div class="rounded-[8px] corner-squircle">
      <!-- Small: badges, tags -->
      <div class="rounded-[2px] corner-squircle">
        <!-- Minimal: images, thumbnails -->
      </div>
    </div>
  </div>
</div>
```

Always pair `rounded-[Npx]` with `corner-squircle`. Never use `corner-squircle` alone.

## Shadows

- `shadow-customShadow`: Deep dramatic shadow (`0 45px 70.8px -48px rgba(0, 0, 0, 0.95)`) — use sparingly on elevated cards
- `shadow-xl`: Standard elevation for dialogs and overlays
- Most elements should NOT have shadows — use subtle background color shifts instead

## Animations

### CSS Keyframes

- `animate-shimmer`: Background position shift, 2s linear infinite (loading states)
- `animate-aurora`: Background position shift, 60s linear infinite (ambient effect)

### Framer Motion

- Use for component mount/unmount, hover, layout animations
- Duration: 150-300ms for micro-interactions, up to 600ms for page transitions
- Easing: ease-out for entries, ease-in for exits
- Always wrap in reduced-motion check: `useReducedMotion()` hook at `src/app/hooks/useReducedMotion.ts`

## Spacing & Layout

- Max container width: `max-w-8xl` (90rem)
- Breakpoints: default → `sm` → `md` → `lg` → `xl` → `2xl` → `3xl` (1600px)
- Standard border: `border-1` (1px) with brand-cream or neutral colors

## Component Patterns

### Class Merging

Always use `cn()` from `@/lib/utils`:

```tsx
import { cn } from '@/lib/utils';

<div
  className={cn(
    'base-classes',
    conditional && 'conditional-classes',
    className
  )}
/>;
```

### shadcn/ui Components

Located at `src/components/ui/`. Install with:

```bash
npx shadcn@latest add <component-name>
```

### Icons

- Primary: `@tabler/icons-react` — stroke-based, clean
- Secondary: `@heroicons/react` — solid and outline variants
- Always import icons directly from these libraries in your components. Do not use other icon libraries (e.g., lucide, fontawesome, react-icons).

## Visual Verification

When building or modifying components, verify the result visually using Playwright MCP tools:

1. **Start the dev server** if not already running (`npm run dev`)
2. **Navigate** to the page/test page with `browser_navigate`
3. **Take a screenshot** with `browser_take_screenshot` to verify colors, spacing, and layout match the design system
4. **Interact** — click buttons, open dialogs, switch tabs — and screenshot each state
5. **Check** that brand colors render correctly (warm vanilla/cream tones, no cool grays)

This is especially important after customizing shadcn/ui components — default shadcn styles (zinc, slate, gray) must be fully replaced with brand tokens before the component is considered done.

## Anti-Patterns

1. **No hardcoded colors** — always use Tailwind classes or CSS variables
2. **No new font families** without discussion
3. **No CSS modules** for new components (legacy ZoomParallax is the exception)
4. **No inline styles** for colors or spacing — use Tailwind utilities
5. **No `!important`** — restructure specificity instead
6. **No unused imports** — clean up after refactoring
7. **No `any` types** — use proper TypeScript typing
8. **No animation without reduced-motion fallback**
