# DESIGN.md — Portfolio Design System

> Single source of truth for all visual and styling decisions. Both human contributors and AI agents follow this document.

---

## 1. Visual Theme & Atmosphere

**Identity**: Warm, organic, and intentionally imperfect — cream paper, forest greens, and earth tones. The aesthetic is professional yet inviting, like a well-made notebook rather than a corporate brochure. Every surface has warmth; every neutral has a hint of yellow or brown.

**Philosophy**: Reductive but not cold. Elements earn their place. The interface retreats to let content breathe, but unlike clinical minimalism, the warmth of the palette makes the emptiness feel cozy rather than austere.

**Key characteristics:**

- Roboto with normal weight (400) for body, medium (500) for headings and UI — familiar, versatile, warm
- Warm oklch neutrals with yellow/brown undertones (never cool grays)
- Squircle corners everywhere — iOS-inspired superellipse softness
- Green as the singular interactive accent color
- Glass navigation floating above content
- Generous whitespace between sections, tight text within

---

## 2. Color Palette & Roles

All colors use the oklch perceptual color space. Source of truth: `src/app/globals.css`.

### Primary Scale (green, nature-inspired)

| Stop | oklch Value              | Role                                    |
| ---- | ------------------------ | --------------------------------------- |
| 50   | `oklch(0.975 0.02 148)`  | Lightest tint, hover backgrounds        |
| 100  | `oklch(0.95 0.04 148)`   | Light accent backgrounds                |
| 200  | `oklch(0.91 0.06 148)`   | Borders, dividers                       |
| 300  | `oklch(0.855 0.085 148)` | Active state backgrounds                |
| 400  | `oklch(0.79 0.095 148)`  | Secondary buttons                       |
| 500  | `oklch(0.75 0.105 148)`  | **Primary action color**                |
| 600  | `oklch(0.69 0.085 148)`  | Hover on primary                        |
| 700  | `oklch(0.635 0.08 148)`  | Active on primary, default title accent |
| 800  | `oklch(0.54 0.07 148)`   | Dark accents                            |
| 900  | `oklch(0.45 0.06 148)`   | Dark emphasis                           |
| 950  | `oklch(0.3 0.04 148)`    | Darkest primary                         |

### Neutral Scale (warm earth)

| Stop | oklch Value             | Role                                         |
| ---- | ----------------------- | -------------------------------------------- |
| 25   | `oklch(0.975 0.005 85)` | Page background (light mode)                 |
| 50   | `oklch(0.995 0 0)`      | Pure white surfaces                          |
| 100  | `oklch(0.988 0.008 80)` | Card surfaces                                |
| 200  | `oklch(0.955 0.025 85)` | Secondary backgrounds                        |
| 300  | `oklch(0.91 0.025 80)`  | Muted backgrounds, input fields              |
| 400  | `oklch(0.8 0.015 80)`   | Borders, muted UI elements                   |
| 500  | `oklch(0.65 0.012 80)`  | Muted text, placeholders                     |
| 600  | `oklch(0.45 0.01 90)`   | Secondary text                               |
| 700  | `oklch(0.34 0.01 90)`   | Primary text (light mode)                    |
| 800  | `oklch(0.26 0.01 80)`   | Emphasized text                              |
| 900  | `oklch(0.2 0.008 90)`   | Near-black text                              |
| 950  | `oklch(0.145 0.01 70)`  | Dark mode surface, near-black                |
| 975  | `oklch(0.115 0.008 70)` | Page background (dark mode), darkest surface |

### Semantic Tokens

These map to oklch values via CSS custom properties. Light and dark mode definitions in `globals.css`.

| Token                                | Light Mode Purpose              | Dark Mode Purpose               |
| ------------------------------------ | ------------------------------- | ------------------------------- |
| `background`                         | Page background (warm cream)    | Page background (near-black)    |
| `foreground`                         | Primary text (warm dark)        | Primary text (near-white)       |
| `card` / `card-foreground`           | Card surfaces and text          | Card surfaces and text          |
| `primary` / `primary-foreground`     | Green action color + white text | Green action color + white text |
| `secondary` / `secondary-foreground` | Secondary surfaces              | Secondary surfaces              |
| `muted` / `muted-foreground`         | Muted backgrounds and text      | Muted backgrounds and text      |
| `accent` / `accent-foreground`       | Accent backgrounds and text     | Accent backgrounds and text     |
| `border`                             | White at 12% opacity            | White at 10% opacity            |
| `ring`                               | Focus ring (matches primary)    | Focus ring (matches primary)    |
| `surface-dark`                       | Always-dark surface base        | Always-dark surface base        |
| `surface-dark-card`                  | Card on dark surface            | Card on dark surface            |
| `surface-dark-elevated`              | Elevated dark surface           | Elevated dark surface           |
| `surface-dark-foreground`            | Text on dark surface            | Text on dark surface            |
| `surface-dark-muted`                 | Muted text on dark surface      | Muted text on dark surface      |
| `surface-footer`                     | Footer background               | Footer background               |

### Color Rules

- **Never hardcode hex or rgb values** — always use Tailwind token classes or CSS custom properties
- **All neutrals are warm** — yellow/brown undertones. Never use cool grays (slate, zinc, gray)
- **Green is the singular interactive accent** — buttons, links, focus rings, action states
- **Per-project brand colors** (e.g., blue for VR project) are stored in `src/app/data/projects.ts` and applied via inline styles — this is the only acceptable use of non-token colors

---

## 3. Typography Rules

### Font Family

**Roboto** — set globally via `--font-sans` in `globals.css`. Single font family, no display/text split. Versatile and readable at all sizes.

Custom sizes available: `text-8.5xl` (6.5rem), `text-9.5xl` (10rem) for hero headings.

### Hierarchy

| Role            | Mobile    | Desktop      | Weight       | Tracking           | Line Height     | Use                             |
| --------------- | --------- | ------------ | ------------ | ------------------ | --------------- | ------------------------------- |
| Display Hero    | text-6xl  | text-8xl     | medium (500) | tighter (-0.05em)  | snug (1.125)    | Main name, hero moments         |
| Page Title      | text-4xl  | text-6xl     | medium (500) | tighter (-0.05em)  | tight (1.25)    | Page headings, footer CTA       |
| Section Heading | text-2xl  | text-4xl     | medium (500) | tight (-0.025em)   | tight (1.25)    | "About me", section intros      |
| Card Title      | text-xl   | text-2xl–3xl | medium (500) | tight (-0.025em)   | snug (1.375)    | Project cards, resume items     |
| Body            | text-base | text-lg      | normal (400) | normal             | relaxed (1.625) | Descriptions, paragraphs        |
| Body Light      | text-base | text-lg      | normal (400) | normal             | relaxed (1.625) | De-emphasized body, breadcrumbs |
| Small / Meta    | text-xs   | text-sm      | normal (400) | normal             | normal (1.5)    | Timestamps, metadata            |
| Label           | text-xs   | text-xs      | normal (400) | widest + uppercase | normal (1.5)    | Section labels in lists         |

### Tracking (Letter-Spacing)

Apple-inspired negative tracking on headlines only — body text uses default spacing for readability:

- **Display (4xl+):** `tracking-tighter` (-0.05em) — machined, billboard-like compression
- **Heading (xl–3xl):** `tracking-tight` (-0.025em) — subtle tightening, professional
- **Body and below:** `tracking-normal` (default) — let the font breathe at reading sizes
- **Labels:** `tracking-widest` (uppercase labels only)

### Weight Restraint

- **font-normal (400)** — THE default for body text, descriptions, metadata, and any reading content.
- **font-medium (500)** — Headings, navigation, card titles, buttons, and UI labels. The weight for structure and emphasis.
- **font-semibold (600)** — Strong emphasis within content: bold inline text, important callouts. Use sparingly.
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

| Category | Duration  | Easing                      | Use                                    |
| -------- | --------- | --------------------------- | -------------------------------------- |
| Micro    | 150-200ms | ease-out                    | Hovers, focus rings, color transitions |
| Standard | 250-350ms | ease-out / spring           | Component mount/unmount, reveals       |
| Dramatic | 400-600ms | spring (stiffness: 100-200) | Page transitions, hero animations      |
| Ambient  | 2s-60s    | linear infinite             | Shimmer, aurora background effects     |

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

| Name     | Value                | Use                                   | Squircle? |
| -------- | -------------------- | ------------------------------------- | --------- |
| Hairline | 2px                  | Image accent borders                  | Yes       |
| Small    | 8px                  | Toggles, small cards, dropdown items  | Yes       |
| Base     | 12px                 | Dropdowns, badges, section containers | Yes       |
| Medium   | 20px                 | Media containers, progressive images  | Yes       |
| Large    | 28px                 | Cards (compact/mobile)                | Yes       |
| XL       | 40px                 | Video previews, footer, dialogs       | Yes       |
| 2XL      | 50px                 | Cards (desktop/expanded)              | Yes       |
| Pill     | 140px                | Navigation, pill-shaped elements      | Yes       |
| Circle   | 50% (`rounded-full`) | Avatars, circular buttons             | No        |

**Rule:** All rectangular radii pair with `corner-squircle`. Never use `corner-squircle` without an explicit radius. `rounded-full` does NOT use `corner-squircle`.

---

## 6. Depth & Elevation

| Level        | Treatment                                                      | Use                                 |
| ------------ | -------------------------------------------------------------- | ----------------------------------- |
| Flat (0)     | No shadow, surface color differentiation only                  | Most content, sections, cards       |
| Glass (1)    | `backdrop-blur-md` + `inset-shadow-border-glow` + `shadow-lg`  | Floating navigation only            |
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
- Use `font-normal` for body text, `font-medium` for headings and UI elements
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

| Name    | Width  | Key Changes                                   |
| ------- | ------ | --------------------------------------------- |
| default | <640px | Single column, compact typography             |
| sm      | 640px  | Minor layout adjustments                      |
| md      | 768px  | Typography scale-up begins, 2-column grids    |
| lg      | 1024px | Full desktop layout                           |
| xl      | 1280px | Wider content areas                           |
| 2xl     | 1536px | Maximum standard width                        |
| 3xl     | 1600px | Custom — generous margins, full-bleed content |

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

| Need            | Class                          |
| --------------- | ------------------------------ |
| Primary action  | `bg-primary` / `text-primary`  |
| Page background | `bg-background`                |
| Dark surface    | `bg-surface-dark`              |
| Text on light   | `text-foreground`              |
| Text on dark    | `text-surface-dark-foreground` |
| Muted text      | `text-muted-foreground`        |
| Borders         | `border-border`                |
| Focus ring      | `ring-ring`                    |

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
