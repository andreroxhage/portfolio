# Design System Overhaul — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace scattered design authority with a single DESIGN.md, migrate to Plus Jakarta Sans, adopt Apple-inspired typography tracking, and clean up stale tokens/hardcoded values.

**Architecture:** Documentation-first approach — write DESIGN.md as the source of truth, then update code to match. Font migration via `next/font/google`. Token cleanup in globals.css. Claude setup restructured to point at DESIGN.md.

**Tech Stack:** Next.js 15, Tailwind CSS 4, oklch color system, Plus Jakarta Sans (via next/font/google), Framer Motion

---

## File Map

### Create
- `DESIGN.md` — 9-section design system document (project root)
- `.claude/rules/design.md` — minimal pointer rule with paths glob

### Modify
- `src/app/layout.tsx` — add Plus Jakarta Sans via next/font/google, apply to html element
- `src/app/globals.css` — update `--font-sans`, add `--tracking-body` token
- `CLAUDE.md` — slim down Non-Negotiables to point at DESIGN.md
- `src/app/projects/layout.tsx` — replace hardcoded hex gradient with token references
- `src/app/work/layout.tsx` — same
- `src/app/ideas/layout.tsx` — same
- `src/app/writing/layout.tsx` — same
- `src/app/components/ProjectHeader.tsx:16,27` — replace hex fallbacks with CSS variable references
- `src/app/data/projects.ts:15` — replace default titleColor hex with CSS variable reference
- `src/app/components/text-reveal-card.tsx:108` — replace `via-[#5f514a]` with `via-neutral-600`
- `src/app/components/ThemeToggle.tsx:40` — `rounded-[10px]` → `rounded-[8px]`
- `src/app/components/projectHoverEffect/VideoDialogMobile.tsx:153` — `rounded-[16px]` → `rounded-[12px]`

### Delete
- `.claude/skills/frontend-style/SKILL.md` — stale hex colors, zero-usage tokens
- `.claude/rules/frontend.md` — replaced by design.md rule + DESIGN.md

---

### Task 1: Write DESIGN.md

**Files:**
- Create: `DESIGN.md`

- [ ] **Step 1: Create the complete DESIGN.md file**

Write the full 9-section design system document at project root. The content below is derived from the spec at `docs/superpowers/specs/2026-04-06-design-system-overhaul-design.md` and the current `src/app/globals.css` token definitions.

```markdown
# DESIGN.md — Portfolio Design System

> Single source of truth for all visual and styling decisions. Both human contributors and AI agents follow this document.

---

## 1. Visual Theme & Atmosphere

**Identity**: Warm, organic, and intentionally imperfect — cream paper, forest greens, and earth tones. The aesthetic is professional yet inviting, like a well-made notebook rather than a corporate brochure. Every surface has warmth; every neutral has a hint of yellow or brown.

**Philosophy**: Reductive but not cold. Elements earn their place. The interface retreats to let content breathe, but unlike clinical minimalism, the warmth of the palette makes the emptiness feel cozy rather than austere.

**Key characteristics:**
- Plus Jakarta Sans with medium weight (500) as the gravity center — warm, geometric, modern
- Warm oklch neutrals with yellow/brown undertones (never cool grays)
- Squircle corners everywhere — iOS-inspired superellipse softness
- Green as the singular interactive accent color
- Glass navigation floating above content
- Generous whitespace between sections, tight text within

---

## 2. Color Palette & Roles

All colors use the oklch perceptual color space. Source of truth: `src/app/globals.css`.

### Primary Scale (green, nature-inspired)

| Stop | oklch Value | Role |
|------|-------------|------|
| 50 | `oklch(0.975 0.02 148)` | Lightest tint, hover backgrounds |
| 100 | `oklch(0.95 0.04 146)` | Light accent backgrounds |
| 200 | `oklch(0.91 0.06 144)` | Borders, dividers |
| 300 | `oklch(0.855 0.085 144)` | Active state backgrounds |
| 400 | `oklch(0.79 0.095 144)` | Secondary buttons |
| 500 | `oklch(0.75 0.105 144)` | **Primary action color** |
| 600 | `oklch(0.69 0.085 148)` | Hover on primary |
| 700 | `oklch(0.635 0.08 148)` | Active on primary, default title accent |
| 800 | `oklch(0.54 0.07 148)` | Dark accents |
| 900 | `oklch(0.45 0.06 148)` | Dark emphasis |
| 950 | `oklch(0.3 0.04 148)` | Darkest primary |

### Neutral Scale (warm earth)

| Stop | oklch Value | Role |
|------|-------------|------|
| 25 | `oklch(0.975 0.005 85)` | Page background (light mode) |
| 50 | `oklch(0.995 0 0)` | Pure white surfaces |
| 100 | `oklch(0.988 0.008 80)` | Card surfaces |
| 200 | `oklch(0.955 0.025 85)` | Secondary backgrounds |
| 300 | `oklch(0.91 0.025 80)` | Muted backgrounds, input fields |
| 400 | `oklch(0.8 0.015 80)` | Borders, muted UI elements |
| 500 | `oklch(0.65 0.012 80)` | Muted text, placeholders |
| 600 | `oklch(0.45 0.01 90)` | Secondary text |
| 700 | `oklch(0.34 0.01 90)` | Primary text (light mode) |
| 800 | `oklch(0.26 0.01 80)` | Emphasized text |
| 900 | `oklch(0.2 0.008 90)` | Near-black text |
| 950 | `oklch(0.145 0.01 70)` | Dark mode surface, near-black |
| 975 | `oklch(0.115 0.008 70)` | Page background (dark mode), darkest surface |

### Semantic Tokens

These map to oklch values via CSS custom properties. Light and dark mode definitions in `globals.css`.

| Token | Light Mode Purpose | Dark Mode Purpose |
|-------|-------------------|-------------------|
| `background` | Page background (warm cream) | Page background (near-black) |
| `foreground` | Primary text (warm dark) | Primary text (near-white) |
| `card` / `card-foreground` | Card surfaces and text | Card surfaces and text |
| `primary` / `primary-foreground` | Green action color + white text | Green action color + white text |
| `secondary` / `secondary-foreground` | Secondary surfaces | Secondary surfaces |
| `muted` / `muted-foreground` | Muted backgrounds and text | Muted backgrounds and text |
| `accent` / `accent-foreground` | Accent backgrounds and text | Accent backgrounds and text |
| `border` | White at 12% opacity | White at 10% opacity |
| `ring` | Focus ring (matches primary) | Focus ring (matches primary) |
| `surface-dark` | Always-dark surface base | Always-dark surface base |
| `surface-dark-card` | Card on dark surface | Card on dark surface |
| `surface-dark-elevated` | Elevated dark surface | Elevated dark surface |
| `surface-dark-foreground` | Text on dark surface | Text on dark surface |
| `surface-dark-muted` | Muted text on dark surface | Muted text on dark surface |
| `surface-footer` | Footer background | Footer background |

### Color Rules

- **Never hardcode hex or rgb values** — always use Tailwind token classes or CSS custom properties
- **All neutrals are warm** — yellow/brown undertones. Never use cool grays (slate, zinc, gray)
- **Green is the singular interactive accent** — buttons, links, focus rings, action states
- **Per-project brand colors** (e.g., blue for VR project) are stored in `src/app/data/projects.ts` and applied via inline styles — this is the only acceptable use of non-token colors

---

## 3. Typography Rules

### Font Family

**Plus Jakarta Sans** — loaded globally via `next/font/google` in `src/app/layout.tsx`. Single font family, no display/text split. Warm geometric letterforms that complement the cream/green palette.

Custom sizes available: `text-8.5xl` (6.5rem), `text-9.5xl` (10rem) for hero headings.

### Hierarchy

| Role | Mobile | Desktop | Weight | Tracking | Line Height | Use |
|------|--------|---------|--------|----------|-------------|-----|
| Display Hero | text-6xl | text-8xl | medium (500) | tighter (-0.05em) | snug (1.125) | Main name, hero moments |
| Page Title | text-4xl | text-6xl | medium (500) | tighter (-0.05em) | tight (1.25) | Page headings, footer CTA |
| Section Heading | text-2xl | text-4xl | medium (500) | tight (-0.025em) | tight (1.25) | "About me", section intros |
| Card Title | text-xl | text-2xl–3xl | medium (500) | tight (-0.025em) | snug (1.375) | Project cards, resume items |
| Body | text-base | text-lg | medium (500) | body (-0.011em) | relaxed (1.625) | Descriptions, paragraphs |
| Body Light | text-base | text-lg | normal (400) | body (-0.011em) | relaxed (1.625) | De-emphasized body, breadcrumbs |
| Small / Meta | text-xs | text-sm | medium (500) | normal | normal (1.5) | Timestamps, metadata |
| Label | text-xs | text-xs | normal (400) | widest + uppercase | normal (1.5) | Section labels in lists |

### Tracking (Letter-Spacing)

Apple-inspired negative tracking at all sizes:

- **Display (4xl+):** `tracking-tighter` (-0.05em) — machined, billboard-like compression
- **Heading (xl–3xl):** `tracking-tight` (-0.025em) — subtle tightening, professional
- **Body (base–lg):** `tracking-body` (-0.011em) — custom token, barely perceptible crispness
- **Small/Label:** `tracking-normal` or `tracking-widest` (uppercase labels only)

### Weight Restraint

- **font-medium (500)** — THE default. Headings, body, cards, navigation — everything unless there's a reason to deviate.
- **font-normal (400)** — De-emphasis: breadcrumbs, article subtitles, secondary descriptions.
- **font-semibold (600)** — Emphasis within content: bold inline text, important labels.
- **font-light (300)** and **font-bold (700)** — Do not use in new work.

### Line-Height Philosophy

"Compression within, expansion between" (Apple-inspired):
- Headlines compress (`leading-snug` 1.125 to `leading-tight` 1.25) — dense and intentional
- Body text opens (`leading-relaxed` 1.625) — comfortable reading rhythm
- This contrast creates visual hierarchy through rhythm alone

---

## 4. Component Stylings

### Buttons

Primary uses `bg-primary text-primary-foreground`. Rounded with `corner-squircle`. Standard patterns from shadcn/ui with brand customization. Hover: `hover:bg-primary-600 transition-colors duration-200`.

### Cards & Containers

- Background: semantic surface tokens (`bg-card`, `bg-surface-dark-card`)
- Border: `border-border` (1px), used sparingly
- Radius: follows the border radius scale (see Section 5)
- Shadow: **Flat by default.** Only `shadow-customShadow` for rare emphasis.
- Content: generous internal padding (`p-6` typical)

### Navigation (FloatingNav)

- Glass effect: `bg-surface-dark backdrop-blur-md inset-shadow-border-glow shadow-lg`
- Shape: `rounded-[140px] corner-squircle` — extreme pill
- Always dark surface via `surface-lock-dark` class
- Collapses/expands with spring animation

### Image Treatment

- Always in squircle containers (`corner-squircle` + radius from scale)
- Progressive loading: blur-up placeholder -> full resolution (ProgressiveMedia component)
- Profile/avatar: `rounded-full` (no corner-squircle)
- Image accent borders: `rounded-[2px] corner-squircle`
- No drop-shadows on images — the container provides shape
- Products/projects on solid-color backgrounds, not floating

### Motion & Animation

| Category | Duration | Easing | Use |
|----------|----------|--------|-----|
| Micro | 150-200ms | ease-out | Hovers, focus rings, color transitions |
| Standard | 250-350ms | ease-out / spring | Component mount/unmount, reveals |
| Dramatic | 400-600ms | spring (stiffness: 100-200) | Page transitions, hero animations |
| Ambient | 2s-60s | linear infinite | Shimmer, aurora background effects |

**Rules:**
- Always gate behind `useReducedMotion()` hook — no exceptions
- Spring physics preferred over bezier curves for interactive elements
- Stagger children by 50-80ms for list reveals
- Exit animations faster than entry (ease-in, shorter duration)
- Framer Motion for component animation, CSS keyframes for ambient effects only
- Motion constants are centralized in `src/app/lib/motion.ts`

### Icons

- **Primary:** `@tabler/icons-react` — stroke-based, 1.5px stroke width, clean aesthetic. Use for all new icon needs.
- **Secondary:** `@heroicons/react` — outline variant only. Legacy usage, don't expand.
- Sizing: 16px with small text, 20px with body, 24px with headings.
- Color: always inherit via `currentColor`. Never hardcode icon colors.

---

## 5. Layout Principles

### Spacing

- Base unit: 4px (Tailwind default)
- Section gaps: `mb-16` (64px) is the most common section spacer
- Horizontal padding: `px-4` (16px) mobile, `px-6` (24px) desktop
- Internal card padding: `p-6` (24px)
- Grid gaps: `gap-x-6` to `gap-x-10`

### Grid & Container

- Max content width: `max-w-7xl` (80rem), `max-w-8xl` (90rem) for full-bleed
- 10-column grid in sections (About, VoluntaryWork, Footer)
- Breakpoints: default -> sm (640) -> md (768) -> lg (1024) -> xl (1280) -> 2xl (1536) -> 3xl (1600px custom)

### Whitespace Philosophy

"Compression within, expansion between" — tight text (negative tracking, compressed leading on headings) surrounded by generous section padding. Each major section occupies significant viewport height. White space is not empty — it's the pause between scenes.

### Section Rhythm

Warm adaptation of Apple's cinematic light/dark alternation:
- **Warm-light sections:** `bg-background` / `bg-secondary` — informational, open, breathing
- **Warm-dark sections:** `bg-surface-dark` — immersive, dramatic, focus
- Transitions use rounded corners (`rounded-t-[40px] corner-squircle`) as "scene change" markers
- The alternation creates cinematic pacing without stark black/white binary

### Border Radius Scale

| Name | Value | Use | Squircle? |
|------|-------|-----|-----------|
| Hairline | 2px | Image accent borders | Yes |
| Small | 8px | Toggles, small cards, dropdown items | Yes |
| Base | 12px | Dropdowns, badges, section containers | Yes |
| Medium | 20px | Media containers, progressive images | Yes |
| Large | 28px | Cards (compact/mobile) | Yes |
| XL | 40px | Video previews, footer, dialogs | Yes |
| 2XL | 50px | Cards (desktop/expanded) | Yes |
| Pill | 140px | Navigation, pill-shaped elements | Yes |
| Circle | 50% (`rounded-full`) | Avatars, circular buttons | No |

**Rule:** All rectangular radii pair with `corner-squircle`. Never use `corner-squircle` without an explicit radius. `rounded-full` does NOT use `corner-squircle`.

---

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (0) | No shadow, surface color differentiation only | Most content, sections, cards |
| Glass (1) | `backdrop-blur-md` + `inset-shadow-border-glow` + `shadow-lg` | Floating navigation only |
| Elevated (2) | `shadow-customShadow` (`0 45px 70.8px -48px rgba(0,0,0,0.95)`) | Hero images, rare dramatic emphasis |

**Shadow philosophy:**
- Most elements have NO shadow. Elevation comes from surface color contrast.
- Glass effect (blur + inner glow) is navigation-only — the signature depth element.
- `shadow-customShadow` is deliberately dramatic — deep, directional, studio-lighting feel. 1-2 elements per page max.
- `shadow-xs` on buttons is acceptable for subtle tactile feedback.

**Decorative depth:**
- `inset-shadow-border-glow`: inner border on dark surfaces — `inset 0 1px 0 0 rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.05)`. Soft edge catch-light.
- Section color transitions: depth implied by warm-light <-> warm-dark alternation

---

## 7. Do's and Don'ts

### Do

- Use oklch semantic tokens for all colors — never hardcode hex or rgb
- Apply `corner-squircle` with explicit `rounded-[Npx]` on all rectangular curved surfaces
- Use `font-medium` as the default weight for all new text elements
- Apply negative letter-spacing at display and heading sizes (`tracking-tighter`, `tracking-tight`)
- Gate all animation behind `useReducedMotion()` — no exceptions
- Use Tabler icons (`@tabler/icons-react`) for all new icon needs
- Keep section padding generous — let content breathe
- Use spring physics for interactive animations (Framer Motion)
- Alternate warm-light and warm-dark sections for cinematic rhythm
- Use `cn()` from `@/lib/utils` for conditional class merging

### Don't

- Don't use `font-bold` (700) or `font-light` (300) in new work
- Don't introduce new icon libraries — Tabler primary, Heroicons legacy only
- Don't add shadows to flat elements — elevation is rare and intentional
- Don't use `corner-squircle` without an explicit radius value
- Don't use cool grays (slate, zinc, gray) — all neutrals are warm
- Don't hardcode colors in inline styles or CSS — use Tailwind classes or CSS custom properties
- Don't add animation without a reduced-motion fallback
- Don't use `rounded-full` with `corner-squircle`
- Don't introduce textures or complex gradients — solid semantic colors only (aurora/shimmer are the exception)
- Don't center-align body text — body copy is left-aligned; only headlines may center
- Don't use CSS modules for new components (legacy ZoomParallax is the exception)

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| default | <640px | Single column, compact typography |
| sm | 640px | Minor layout adjustments |
| md | 768px | Typography scale-up begins, 2-column grids |
| lg | 1024px | Full desktop layout |
| xl | 1280px | Wider content areas |
| 2xl | 1536px | Maximum standard width |
| 3xl | 1600px | Custom — generous margins, full-bleed content |

### Typography Scaling

Aggressive responsive jumps (e.g., `text-4xl md:text-6xl`). The hierarchy table in Section 3 specifies mobile and desktop sizes for each role.

### Touch Targets

44px minimum for all interactive elements. Buttons use adequate padding. Navigation links are 48px+ height.

### Collapsing Strategy

- Project grids: multi-column -> single column stacked
- Navigation: pill nav stays, content collapses into expandable menu
- Section backgrounds: maintain full-width color blocks at all breakpoints — the section rhythm never breaks
- Images: scale proportionally within squircle containers, never crop

---

## 9. Agent Prompt Guide

Quick reference for AI agents building components in this design system.

### Color Quick Reference

| Need | Class |
|------|-------|
| Primary action | `bg-primary` / `text-primary` |
| Page background | `bg-background` |
| Dark surface | `bg-surface-dark` |
| Text on light | `text-foreground` |
| Text on dark | `text-surface-dark-foreground` |
| Muted text | `text-muted-foreground` |
| Borders | `border-border` |
| Focus ring | `ring-ring` |

### Example Component Recipes

**Section heading:**
```
text-2xl md:text-4xl font-medium tracking-tight text-foreground
```
On dark surfaces: use `text-surface-dark-foreground`.

**Project card:**
```
bg-card rounded-[28px] md:rounded-[50px] corner-squircle
```
No shadow. Image inside: `rounded-[20px] corner-squircle`. Title at Card Title tier.

**CTA button:**
```
bg-primary text-primary-foreground rounded-[8px] corner-squircle px-4 py-2 font-medium tracking-tight
hover:bg-primary-600 transition-colors duration-200
```

**Dark section:**
```
bg-surface-dark rounded-t-[40px] corner-squircle
```
All text: `text-surface-dark-foreground` or `text-surface-dark-muted`.

### Iteration Checklist

1. All colors use semantic tokens — no hardcoded values
2. Typography follows the hierarchy table — correct size, weight, tracking for each role
3. Border radius from the scale — paired with `corner-squircle`
4. Shadows are flat unless intentionally elevated (Level 0 default)
5. Animation gated by `useReducedMotion()` with appropriate duration tier
6. Warm neutrals only — no cool grays
```

- [ ] **Step 2: Verify the file was created correctly**

Run: `wc -l DESIGN.md && head -3 DESIGN.md`
Expected: ~250-300 lines, first line is `# DESIGN.md — Portfolio Design System`

- [ ] **Step 3: Commit**

```bash
git add DESIGN.md
git commit -m "docs: add DESIGN.md as single source of truth for design system

Comprehensive 9-section design system document covering color palette,
typography, components, layout, elevation, do's/don'ts, responsive
behavior, and agent prompt guide. Replaces scattered design guidance."
```

---

### Task 2: Migrate Font to Plus Jakarta Sans

**Files:**
- Modify: `src/app/layout.tsx:1-66`
- Modify: `src/app/globals.css:18`

- [ ] **Step 1: Add Plus Jakarta Sans import to layout.tsx**

At the top of `src/app/layout.tsx`, add the next/font/google import and font configuration. Replace the current imports section:

```tsx
import React from 'react';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import FloatingNav from './components/Navbar/FloatingNav';
import ThemeToggle from './components/ThemeToggle';
import { ProjectHoverProvider } from './contexts/ProjectHoverContext';
import { ThemeProvider } from './contexts/ThemeContext';
import QueryProvider from './components/QueryProvider';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-sans',
});
```

The `weight` array includes 400 (normal), 500 (medium — the default), and 600 (semibold).
The `variable` option sets the CSS custom property so Tailwind picks it up.

- [ ] **Step 2: Apply the font class to the html element**

In the same file, update the `<html>` tag to include the font variable class:

Change:
```tsx
    <html
      lang="en"
      suppressHydrationWarning
      style={{ scrollBehavior: 'smooth' }}
      className="overflow-x-hidden w-full"
    >
```

To:
```tsx
    <html
      lang="en"
      suppressHydrationWarning
      style={{ scrollBehavior: 'smooth' }}
      className={`overflow-x-hidden w-full ${plusJakartaSans.variable}`}
    >
```

- [ ] **Step 3: Update the font-sans token in globals.css**

In `src/app/globals.css`, line 18, change:

```css
  --font-sans: 'Roboto', sans-serif;
```

To:

```css
  --font-sans: 'Plus Jakarta Sans', sans-serif;
```

- [ ] **Step 4: Verify build compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "feat: migrate font from Roboto to Plus Jakarta Sans

Load Plus Jakarta Sans via next/font/google with weights 400/500/600.
PJS is warmer and geometrically tighter than Roboto, complementing
the cream/green palette. Updates --font-sans CSS custom property."
```

---

### Task 3: Add Tracking Token to globals.css

**Files:**
- Modify: `src/app/globals.css:16-94` (inside `@theme inline` block)

- [ ] **Step 1: Add the custom tracking token**

In `src/app/globals.css`, inside the `@theme inline { }` block, after line 18 (`--font-sans`), add:

```css
  /* Custom tracking (letter-spacing) */
  --tracking-body: -0.011em;
```

This enables `tracking-body` as a Tailwind utility class.

- [ ] **Step 2: Verify the token is recognized**

Run: `npx tsc --noEmit`
Expected: No errors (CSS-only change, no TS impact)

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add tracking-body custom letter-spacing token

Adds --tracking-body: -0.011em to the Tailwind theme for subtle body
text tightening. Part of Apple-inspired tracking discipline."
```

---

### Task 4: Update Claude Setup

**Files:**
- Create: `.claude/rules/design.md`
- Modify: `CLAUDE.md:91-97`
- Delete: `.claude/skills/frontend-style/SKILL.md`
- Delete: `.claude/rules/frontend.md`

- [ ] **Step 1: Create the new design rule**

Create `.claude/rules/design.md`:

```markdown
---
paths:
  - 'src/**/*.{ts,tsx,js,jsx,css}'
---

# Design System Rule

Follow DESIGN.md at project root for all visual and styling decisions. It is the single source of truth for colors, typography, spacing, border radius, elevation, animation, and component patterns.
```

- [ ] **Step 2: Update CLAUDE.md Non-Negotiables**

In `CLAUDE.md`, replace the Non-Negotiables section (lines 91-97):

Current:
```markdown
## Non-Negotiables

- Preserve warm, organic visual identity (`brand-vanilla`, `brand-cream`, primary greens).
- Keep global typography consistent with Roboto.
- Use `corner-squircle` with explicit rounded classes on curved surfaces.
- Respect reduced motion for all animation work.
- Avoid introducing new visual systems when existing tokens/components already solve it.
```

Replace with:
```markdown
## Non-Negotiables

- Follow `DESIGN.md` for all visual and styling decisions — it is the single source of truth.
- Use `corner-squircle` with explicit rounded classes on curved surfaces.
- Respect reduced motion for all animation work.
```

- [ ] **Step 3: Delete the stale frontend-style skill**

```bash
rm .claude/skills/frontend-style/SKILL.md
```

Verify the directory is empty (or has no other files):
```bash
ls .claude/skills/frontend-style/
```

If empty, remove the directory too:
```bash
rmdir .claude/skills/frontend-style/
```

- [ ] **Step 4: Delete the old frontend rule**

```bash
rm .claude/rules/frontend.md
```

- [ ] **Step 5: Verify no broken references**

Run: `grep -r "frontend-style" .claude/ CLAUDE.md`
Expected: No matches

Run: `grep -r "frontend.md" .claude/ CLAUDE.md`
Expected: No matches (the new rule is `design.md`, not `frontend.md`)

- [ ] **Step 6: Commit**

```bash
git add .claude/rules/design.md CLAUDE.md
git rm .claude/skills/frontend-style/SKILL.md .claude/rules/frontend.md
git commit -m "refactor: restructure Claude design guidance

- Create .claude/rules/design.md pointing to DESIGN.md
- Slim CLAUDE.md Non-Negotiables to reference DESIGN.md
- Delete stale frontend-style skill (hex colors, zero-usage tokens)
- Delete frontend.md rule (replaced by design.md rule)"
```

---

### Task 5: Fix Hardcoded Hex in Layout Files

**Files:**
- Modify: `src/app/projects/layout.tsx:14`
- Modify: `src/app/work/layout.tsx:14`
- Modify: `src/app/ideas/layout.tsx:14`
- Modify: `src/app/writing/layout.tsx:14`

All four files have the identical inline style:
```tsx
'radial-gradient(ellipse 80% 50vh at 64% 50vh, #191919 0%, #000000 70%) fixed',
```

- [ ] **Step 1: Fix projects/layout.tsx**

In `src/app/projects/layout.tsx`, line 14, change:

```tsx
            'radial-gradient(ellipse 80% 50vh at 64% 50vh, #191919 0%, #000000 70%) fixed',
```

To:

```tsx
            'radial-gradient(ellipse 80% 50vh at 64% 50vh, oklch(0.145 0.01 70) 0%, oklch(0.08 0 0) 70%) fixed',
```

Note: `oklch(0.145 0.01 70)` matches `--color-neutral-950`. `oklch(0.08 0 0)` is near-black (darker than neutral-975 at 0.115, closer to the original #000000).

- [ ] **Step 2: Fix work/layout.tsx**

Same change in `src/app/work/layout.tsx`, line 14:

```tsx
            'radial-gradient(ellipse 80% 50vh at 64% 50vh, oklch(0.145 0.01 70) 0%, oklch(0.08 0 0) 70%) fixed',
```

- [ ] **Step 3: Fix ideas/layout.tsx**

Same change in `src/app/ideas/layout.tsx`, line 14.

- [ ] **Step 4: Fix writing/layout.tsx**

Same change in `src/app/writing/layout.tsx`, line 14.

- [ ] **Step 5: Verify build**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 6: Commit**

```bash
git add src/app/projects/layout.tsx src/app/work/layout.tsx src/app/ideas/layout.tsx src/app/writing/layout.tsx
git commit -m "fix: replace hardcoded hex in layout gradients with oklch values

Replace #191919 and #000000 in radial-gradient inline styles with
oklch equivalents matching the neutral token scale."
```

---

### Task 6: Fix Hardcoded Hex in Components

**Files:**
- Modify: `src/app/components/ProjectHeader.tsx:16,27`
- Modify: `src/app/data/projects.ts:15`
- Modify: `src/app/components/text-reveal-card.tsx:108`

- [ ] **Step 1: Fix ProjectHeader.tsx fallback colors**

In `src/app/components/ProjectHeader.tsx`:

Line 16, change:
```tsx
        style={{ color: project.titleColor || '#739966' }}
```
To:
```tsx
        style={{ color: project.titleColor || 'oklch(0.635 0.08 148)' }}
```

Line 27, change:
```tsx
          style={{ color: project.subtitleColor || '#788876' }}
```
To:
```tsx
          style={{ color: project.subtitleColor || 'oklch(0.45 0.01 90)' }}
```

Note: `oklch(0.635 0.08 148)` = primary-700, `oklch(0.45 0.01 90)` = muted-foreground. These are inline styles because per-project colors override them, so we use oklch values directly rather than CSS variable references.

- [ ] **Step 2: Fix default titleColor in projects.ts**

In `src/app/data/projects.ts`, line 15 (spotify-events project), change:
```ts
    titleColor: '#739966',
```
To:
```ts
    titleColor: 'oklch(0.635 0.08 148)',
```

Note: Other projects use intentionally different brand colors (blue `#668799`, purple `#686699`). Those are project-specific and should also be converted to oklch, but the visual match needs to be verified per-project. For now, convert the green one that matches primary-700.

- [ ] **Step 3: Fix text-reveal-card.tsx gradient color**

In `src/app/components/text-reveal-card.tsx`, line 108, change:
```tsx
          className="h-40 w-[8px] bg-gradient-to-b from-transparent via-[#5f514a] to-transparent absolute z-50 will-change-transform"
```
To:
```tsx
          className="h-40 w-[8px] bg-gradient-to-b from-transparent via-neutral-600 to-transparent absolute z-50 will-change-transform"
```

`neutral-600` is `oklch(0.45 0.01 90)` which is visually close to `#5f514a` (a warm brown-gray).

- [ ] **Step 4: Verify build**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add src/app/components/ProjectHeader.tsx src/app/data/projects.ts src/app/components/text-reveal-card.tsx
git commit -m "fix: replace hardcoded hex colors with oklch/token equivalents

- ProjectHeader: fallback colors now use oklch values
- projects.ts: default titleColor uses oklch primary-700
- text-reveal-card: gradient via-color uses neutral-600 token"
```

---

### Task 7: Consolidate Border Radii

**Files:**
- Modify: `src/app/components/ThemeToggle.tsx:40`
- Modify: `src/app/components/projectHoverEffect/VideoDialogMobile.tsx:153`

- [ ] **Step 1: Fix ThemeToggle.tsx radius**

In `src/app/components/ThemeToggle.tsx`, line 40, change:
```tsx
        'h-9 w-9 rounded-[10px] corner-squircle',
```
To:
```tsx
        'h-9 w-9 rounded-[8px] corner-squircle',
```

10px is not in the design system scale. 8px (Small) is the closest tier.

- [ ] **Step 2: Fix VideoDialogMobile.tsx radius**

In `src/app/components/projectHoverEffect/VideoDialogMobile.tsx`, line 153, change:
```tsx
          <div className="absolute bottom-5 flex-row flex items-center gap-3 px-4 py-2 rounded-[16px] corner-squircle bg-surface-dark/30 inset-shadow-border-glow shadow-lg">
```
To:
```tsx
          <div className="absolute bottom-5 flex-row flex items-center gap-3 px-4 py-2 rounded-[12px] corner-squircle bg-surface-dark/30 inset-shadow-border-glow shadow-lg">
```

16px is not in the scale. 12px (Base) is closest — this is a floating badge/label, not a full card.

- [ ] **Step 3: Verify build**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/app/components/ThemeToggle.tsx src/app/components/projectHoverEffect/VideoDialogMobile.tsx
git commit -m "fix: consolidate border radii to design system scale

- ThemeToggle: rounded-[10px] -> rounded-[8px] (Small tier)
- VideoDialogMobile: rounded-[16px] -> rounded-[12px] (Base tier)"
```

---

### Task 8: Add Tracking Classes to Section Headings and Card Titles

**Files:**
- Modify: `src/app/sections/CurrentWork.js:25`
- Modify: `src/app/sections/About.js:26`
- Modify: `src/app/sections/VoluntaryWork.js:18`
- Modify: `src/app/sections/Photography.js:14`
- Modify: `src/app/sections/Footer.js:81,126`
- Modify: `src/app/sections/Header.js:108`
- Modify: `src/app/components/Resume.js:50,89,128`
- Modify: `src/app/components/ProjectLayout.tsx:50`

Section headings (text-2xl/text-3xl/text-4xl tier) and card titles (text-xl tier) should get `tracking-tight` per the typography hierarchy. Display/page title elements already have `tracking-tighter`.

- [ ] **Step 1: Add tracking-tight to section heading elements**

Add `tracking-tight` to each of these className strings:

`src/app/sections/CurrentWork.js:25`:
```
"text-2xl md:text-4xl font-medium tracking-tight cursor-pointer text-foreground"
```

`src/app/sections/About.js:26`:
```
"mx-auto text-foreground text-2xl md:text-4xl font-medium tracking-tight pb-4"
```

`src/app/sections/VoluntaryWork.js:18`:
```
"pt-6 pb-8 sm:pb-10 md:pb-9 md:pt-12 md:col-span-10 col-span-10 text-3xl md:text-5xl font-medium tracking-tight text-foreground"
```

`src/app/sections/Photography.js:14`:
```
"text-foreground text-xl md:text-4xl font-medium tracking-tight"
```

`src/app/sections/Header.js:108`:
```
"text-xl md:text-2xl font-medium tracking-tight max-w-[680px] leading-relaxed"
```

`src/app/sections/Footer.js:81`:
```
"text-xl md:text-2xl text-surface-dark-foreground font-medium tracking-tight col-start-8 col-span-3"
```

`src/app/sections/Footer.js:126`:
```
"text-xl md:text-2xl text-surface-dark-foreground font-medium tracking-tight col-start-1 col-span-7"
```

- [ ] **Step 2: Add tracking-tight to card title elements**

`src/app/components/Resume.js` — lines 50, 89, 128 (three instances of the same pattern):
```
"text-xl sm:text-2xl font-medium tracking-tight text-surface-dark-foreground"
```

`src/app/components/ProjectLayout.tsx:50`:
```
"text-2xl font-semibold tracking-tight text-surface-dark-foreground mb-6"
```

- [ ] **Step 3: Add tracking-tight to voluntary work card titles**

`src/app/sections/VoluntaryWork.js` — lines 84 and 124 (two instances):
```
"text-xl md:text-3xl font-medium tracking-tight"
```

- [ ] **Step 4: Verify build**

Run: `npx tsc --noEmit && npm run lint`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add src/app/sections/ src/app/components/Resume.js src/app/components/ProjectLayout.tsx
git commit -m "feat: add tracking-tight to section headings and card titles

Apply Apple-inspired letter-spacing (-0.025em) to text-xl through
text-4xl elements per the typography hierarchy in DESIGN.md."
```

---

### Task 9: Add Leading Classes to Display and Page Title Elements

**Files:**
- Modify: `src/app/sections/Header.js:59`
- Modify: `src/app/writing/[writingSlug]/page.tsx:25,44`
- Modify: `src/app/ideas/[ideaSlug]/page.tsx:24,43`
- Modify: `src/app/projects/[projectSlug]/page.tsx:32`
- Modify: `src/app/components/ProjectsPageContent.tsx:26`
- Modify: `src/app/components/ProjectHeader.tsx:15`

Per the typography hierarchy: Display Hero gets `leading-snug` (1.125), Page Title gets `leading-tight` (1.25).

- [ ] **Step 1: Add leading-snug to the Display Hero element**

`src/app/sections/Header.js:59` — the main hero heading (text-6xl md:text-8xl):
```
"text-6xl md:text-8xl font-medium tracking-tighter leading-snug text-surface-dark-foreground mix-blend-difference"
```

- [ ] **Step 2: Add leading-tight to Page Title elements**

These are text-4xl md:text-6xl headings on sub-pages:

`src/app/writing/[writingSlug]/page.tsx:25`:
```
"text-4xl md:text-6xl font-medium tracking-tighter leading-tight text-surface-dark-foreground"
```

`src/app/writing/[writingSlug]/page.tsx:44`:
```
"text-4xl md:text-6xl font-medium tracking-tighter leading-tight text-primary-500"
```

`src/app/ideas/[ideaSlug]/page.tsx:24`:
```
"text-4xl md:text-6xl font-medium tracking-tighter leading-tight text-surface-dark-foreground"
```

`src/app/ideas/[ideaSlug]/page.tsx:43`:
```
"text-4xl md:text-6xl font-medium tracking-tighter leading-tight text-primary-500"
```

`src/app/projects/[projectSlug]/page.tsx:32`:
```
"text-4xl md:text-6xl font-medium tracking-tighter leading-tight text-surface-dark-foreground"
```

`src/app/components/ProjectsPageContent.tsx:26`:
```
"text-4xl md:text-6xl font-medium tracking-tighter leading-tight text-surface-dark-foreground group-hover:text-accent transition-all duration-300"
```

`src/app/components/ProjectHeader.tsx:15`:
```
"text-4xl md:text-6xl font-medium tracking-tighter leading-tight"
```

- [ ] **Step 3: Verify build**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/app/sections/Header.js src/app/writing/ src/app/ideas/ src/app/projects/ src/app/components/ProjectsPageContent.tsx src/app/components/ProjectHeader.tsx
git commit -m "feat: add leading-snug/tight to display and page title elements

Display hero gets leading-snug (1.125) for Apple-style headline
compression. Page titles get leading-tight (1.25)."
```

---

### Task 10: Full Build Verification

**Files:** None (verification only)

- [ ] **Step 1: Run TypeScript check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 2: Run ESLint**

Run: `npm run lint`
Expected: No errors (or only pre-existing warnings)

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 4: Fix any issues found**

If any of the above fail, fix the issues before proceeding. Common things to check:
- Font import path correct in layout.tsx
- CSS syntax valid in globals.css @theme block
- No TypeScript errors from removed/renamed references

---

### Task 11: Visual Verification

**Files:** None (verification only)

- [ ] **Step 1: Start dev server**

Run: `npm run dev`
Expected: Server starts on port 3000

- [ ] **Step 2: Screenshot the home page**

Navigate to `http://localhost:3000` and take a screenshot. Verify:
- Plus Jakarta Sans is rendering (compare letterforms — PJS has distinctive 'a' and 'g')
- Colors look correct (warm cream background, green accents)
- Navigation glass effect intact
- Section rhythm preserved (light/dark alternation)

- [ ] **Step 3: Screenshot a project page**

Navigate to `http://localhost:3000/projects/spotify-events` and verify:
- Dark gradient background renders correctly (no visual difference from hex version)
- Title color renders correctly in oklch
- Badges and cards have correct border radii

- [ ] **Step 4: Screenshot the theme toggle**

Click the theme toggle (bottom-right corner) and verify:
- Toggle has correct rounded-[8px] appearance
- Dark mode colors activate properly
- Font remains Plus Jakarta Sans in both themes

- [ ] **Step 5: Stop dev server and commit any fixes**

If visual issues were found and fixed, commit those fixes. Otherwise, no commit needed.
