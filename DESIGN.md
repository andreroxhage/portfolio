# DESIGN.md — Portfolio Design System

> Single source of truth for all visual and styling decisions. Both human contributors and AI agents follow this document.

---

## 1. Visual Theme & Atmosphere

**Identity**: Warm, organic, and intentionally imperfect — cream paper, forest greens, and earth tones. The aesthetic is professional yet inviting, like a well-made notebook rather than a corporate brochure. Every surface has warmth; every neutral has a hint of yellow or brown.

**Philosophy**: Reductive but not cold. Elements earn their place. The interface retreats to let content breathe, but unlike clinical minimalism, the warmth of the palette makes the emptiness feel cozy rather than austere.

**Key characteristics:**

- The platform's own system font (SF Pro on Apple, Segoe UI on Windows, Roboto on Android) — normal weight (400) for body, medium (500) for headings and UI
- A warm adaptation of Apple's restraint: 17px reading text, gently tightened tracking, frosted chrome, flat surfaces
- Warm oklch neutrals with yellow/brown undertones (never cool grays)
- Squircle corners everywhere — iOS-inspired superellipse softness
- Green as the singular interactive accent color
- Frosted `material-chrome` navigation floating above content
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

| Token                                | Light Mode Purpose                                                           | Dark Mode Purpose                                |
| ------------------------------------ | ---------------------------------------------------------------------------- | ------------------------------------------------ |
| `background`                         | Page background (warm cream)                                                 | Page background (near-black)                     |
| `foreground`                         | Primary text (warm dark)                                                     | Primary text (near-white)                        |
| `card` / `card-foreground`           | Card surfaces and text                                                       | Card surfaces and text                           |
| `primary` / `primary-foreground`     | Green action color (`0.72 0.11 148`, between stops 400 and 500) + white text | Green action color (`0.68 0.1 148`) + white text |
| `secondary` / `secondary-foreground` | Secondary surfaces                                                           | Secondary surfaces                               |
| `muted` / `muted-foreground`         | Muted backgrounds and text                                                   | Muted backgrounds and text                       |
| `accent` / `accent-foreground`       | Link hover text, accent tints                                                | Link hover text, accent tints                    |
| `border`                             | Warm ink at 12% opacity                                                      | White at 10% opacity                             |
| `ring`                               | Focus ring (matches primary)                                                 | Focus ring (matches primary)                     |
| `surface-dark`                       | Scene surface base (cream)                                                   | Scene surface base (warm near-black)             |
| `surface-dark-card`                  | Card on the scene surface                                                    | Card on the scene surface                        |
| `surface-dark-elevated`              | Elevated scene surface, hover                                                | Elevated scene surface, hover                    |
| `surface-dark-foreground`            | Text on the scene surface                                                    | Text on the scene surface                        |
| `surface-dark-muted`                 | Muted text on the scene surface                                              | Muted text on the scene surface                  |

### Surface Roles

Two palettes, three contexts. Pick the palette by _where_ a component lives, never by the current theme:

| Role       | Palette                                                  | Where                                                                         | Theme behaviour                                                                                    |
| ---------- | -------------------------------------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Page**   | `background`, `foreground`, `secondary`, `muted`, `card` | Home sections, `/work`, 404                                                   | Follows the theme                                                                                  |
| **Scene**  | `surface-dark-*`                                         | Project, experiment and writing pages, their `content/*.tsx`, `ProjectLayout` | Follows the theme — cream in light, warm near-black in dark. The `-dark` in the name is historical |
| **Chrome** | `surface-dark-*` inside `.surface-lock-dark`             | FloatingNav, the home project grid shell, Footer                              | Pinned dark in both themes                                                                         |

Detail-page content uses the scene palette directly (`text-surface-dark-foreground`, `bg-surface-dark-card`); that is correct, not a leak. Components that can appear in more than one role take a `surface: 'page' | 'scene'` variant (see Components → Variant Pattern). There is no destructive token; the portfolio has no destructive actions.

### Color Rules

- **Never hardcode hex or rgb values** — always use Tailwind token classes or CSS custom properties. Two literals are sanctioned because their formats cannot read CSS variables: `viewport.themeColor` in `layout.tsx` and `theme_color`/`background_color` in `manifest.webmanifest`. Both mirror `--background` and must be updated with it
- **No pure black or white utilities** (`bg-black`, `from-black/80`) — scrims and fades use `neutral-975` with an alpha
- **Dark neutrals keep their warmth** — dark surfaces use hue 70–85 at chroma 0.004–0.008, never chroma 0
- **All neutrals are warm** — yellow/brown undertones. Never use cool grays (slate, zinc, gray)
- **Green is the singular interactive accent** — buttons, links, focus rings, action states
- **Text selection uses warm neutral** — `neutral-200` (`oklch(0.955 0.025 85)`) background with inherited foreground text. Applied globally via `::selection` in `globals.css`. Never rely on browser-default blue highlights.
- **Per-project brand colors** (e.g., blue for VR project) are stored in `src/app/data/projects.ts` and applied via inline styles — this is the only acceptable use of non-token colors
- **Chart colors are data, not UI** — `chart-1`…`chart-5` encode series identity inside charts only. They never style buttons, links or text, so green stays the single interactive accent

### Chart Palette

Five categorical slots for charts, in a fixed order that was validated for color-vision deficiency in both modes. The earthy hues come from the site's own palette. Tokens are `--chart-1`…`--chart-5` (Tailwind: `fill-chart-N`, `stroke-chart-N`, `bg-chart-N`). How to build charts with them lives in the `portfolio-charts` skill (`.claude/skills/portfolio-charts/`).

| Slot | Hue   | Light                  | Dark                   |
| ---- | ----- | ---------------------- | ---------------------- |
| 1    | green | `oklch(0.6 0.12 150)`  | `oklch(0.67 0.11 150)` |
| 2    | clay  | `oklch(0.47 0.11 42)`  | `oklch(0.56 0.12 42)`  |
| 3    | blue  | `oklch(0.55 0.12 250)` | `oklch(0.62 0.11 250)` |
| 4    | ochre | `oklch(0.6 0.11 78)`   | `oklch(0.66 0.12 78)`  |
| 5    | plum  | `oklch(0.46 0.11 350)` | `oklch(0.56 0.12 350)` |

- Assign slots in order and never cycle. A sixth series folds into "Other" or becomes small multiples
- Scatter and small multiples take at most three series (slots 1–3)
- Magnitude uses the `primary` green scale as a one-hue ramp, not the categorical slots
- Chart text (values, axes, legends) stays in `foreground` / `muted-foreground`, never in a slot color
- After changing any slot, run `node .claude/skills/portfolio-charts/scripts/check-chart-palette.mjs`

---

## 3. Typography Rules

### Font Family

**System stack** — `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`, set via `--font-sans` in `globals.css`. SF Pro on Apple platforms (with its optical sizes), Segoe UI on Windows, Roboto on Android. Nothing is downloaded. Single family, no display/text split.

Body text runs at **17px** (`--text-base: 1.0625rem`, line-height 1.47) — Apple's reading pace, one pixel slower than the 16px default.

Custom sizes available: `text-8.5xl` (6.5rem), `text-9.5xl` (10rem) for hero headings.

### Hierarchy

| Role            | Mobile    | Desktop      | Weight       | Tracking                    | Line Height     | Use                             |
| --------------- | --------- | ------------ | ------------ | --------------------------- | --------------- | ------------------------------- |
| Display Hero    | text-6xl  | text-8xl     | medium (500) | `tracking-display` -0.025em | snug (1.125)    | Main name, hero moments         |
| Page Title      | text-4xl  | text-6xl     | medium (500) | `tracking-display` -0.025em | tight (1.25)    | Page headings, footer CTA       |
| Section Heading | text-2xl  | text-4xl     | medium (500) | `tracking-display` -0.025em | tight (1.25)    | "About me", section intros      |
| Card Title      | text-xl   | text-2xl–3xl | medium (500) | `tracking-heading` -0.015em | snug (1.375)    | Project cards, resume items     |
| Body            | text-base | text-lg      | normal (400) | body default -0.01em        | relaxed (1.625) | Descriptions, paragraphs        |
| Body Light      | text-base | text-lg      | normal (400) | body default -0.01em        | relaxed (1.625) | De-emphasized body, breadcrumbs |
| Small / Meta    | text-xs   | text-sm      | normal (400) | body default -0.01em        | normal (1.5)    | Timestamps, metadata            |
| Label           | text-xs   | text-xs      | normal (400) | wide                        | normal (1.5)    | Section labels in lists         |

`text-base` is 17px; `text-lg` stays 18px.

> **Note:** The h1 element is used for SEO across all pages. Its visual sizing and treatment can vary per page context — the hierarchy table above is a design guide, not a rigid constraint. Detail pages (projects, writing, ideas) may use smaller h1 sizing to suit their content layout.

### Tracking (Letter-Spacing)

Tighten gently as size grows — Apple's cadence, not billboard compression. Tokens live in `globals.css` (`--tracking-*`):

- **Display (text-4xl+, or any heading that scales up to 4xl):** `tracking-display` (-0.025em)
- **Heading (text-xl–3xl):** `tracking-heading` (-0.015em)
- **Body and below:** inherited from `body` — `--tracking-body` (-0.01em). Don't add a class
- **Labels:** `tracking-wide` for small uppercase labels and meta text
- `tracking-tighter` (-0.05em) is retired — too tight for the system font

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

### Text Selection

Highlighted text uses a warm neutral tint — like marking cream paper, not browser-default blue:

- **Background:** `neutral-200` — `oklch(0.955 0.025 85)`
- **Text:** inherits `foreground` for readable contrast on both light and dark surfaces
- **Implementation:** global `::selection` / `::-moz-selection` in `globals.css`

---

## 4. Component Stylings

### Variant Pattern

Every shared component exposes its styling through one `cva()` recipe exported next to it (`buttonVariants`, `badgeVariants`, `cardVariants`), and call sites use `cn(xVariants({ ... }), className)` — never a long hand-written class string. Rules for a recipe:

- Composes named tokens only: semantic colors, the radius scale (`rounded-small` … `rounded-pill`) with `corner-squircle`, `shadow-hairline`
- A `surface: 'page' | 'scene'` variant whenever the component can appear in more than one surface role; palette differences go in `compoundVariants`
- Flat by default; no `shadow-xs`/`sm`/`md`/`lg`/`xl`
- Press feedback is `motion-safe:active:scale-[0.96]` (CSS) or `whileTap={{ scale: BUTTON_PRESS_SCALE }}` (Framer)

`src/components/ui/` holds the primitives (button, badge, card, select, tabs, separator, breadcrumb).

### Buttons

`<Button variant="primary | secondary | ghost | link" surface="page | scene" size="sm | md | lg | icon">`. Primary is `bg-primary text-primary-foreground hover:bg-primary-600`, radius `rounded-small` (`rounded-base` at `lg`), always with `corner-squircle`. Use `asChild` to render a `Link`.

### Cards & Containers

- Background: semantic surface tokens (`bg-card`, `bg-surface-dark-card`)
- Border: `border-border` (1px), used sparingly
- Radius: follows the border radius scale (see Section 5)
- Shadow: **Flat by default.** `shadow-hairline` when an edge is needed; `shadow-customShadow` only under photography (see Section 6).
- Content: generous internal padding (`p-6` typical)

### Navigation (FloatingNav)

- Material: `material-chrome inset-shadow-border-glow` — `saturate(180%) blur(20px)` over the surface at 72%, constant (no scroll-linked opacity), no drop shadow
- Shape: `rounded-pill corner-squircle` — extreme pill
- Always dark surface via `surface-lock-dark` class
- Collapses/expands with spring animation

### Image Treatment

- Always in squircle containers (`corner-squircle` + radius from scale, usually `rounded-media`)
- Progressive loading: blur-up placeholder -> full resolution (ProgressiveMedia component)
- Profile/avatar: `rounded-full` (no corner-squircle)
- Image accent borders: `rounded-hairline corner-squircle`, plus `image-depth-outline` (1px inset outline, flips to white in dark mode)
- No drop-shadows on images — the container provides shape
- Products/projects on solid-color backgrounds, not floating

### Motion & Animation

| Category | Duration | Easing                                | Token                       | Use                              |
| -------- | -------- | ------------------------------------- | --------------------------- | -------------------------------- |
| Micro    | 150ms    | ease-out                              | `DURATION.FAST`             | Hovers, press, icon swaps        |
| Standard | 300ms    | ease-out / spring                     | `DURATION.MEDIUM`           | Component mount/unmount, reveals |
| Dramatic | 500ms    | ease-out / spring (stiffness 200–300) | `DURATION.SLOW`, `SPRING.*` | Page and hero entrances          |
| Ambient  | 2s+      | linear infinite                       | `--animate-shimmer`         | Loading shimmer                  |

Curves (`src/app/lib/motion.ts`, mirrored as CSS `--ease-*` tokens so `ease-out` / `ease-in` / `ease-in-out` utilities match):

- `EASING.ENTER` — `cubic-bezier(0.28, 0.11, 0.32, 1)`, Apple's quick-start, long-landing ease-out
- `EASING.EXIT` — `cubic-bezier(0.4, 0, 1, 1)`
- `EASING.STANDARD` — `cubic-bezier(0.42, 0, 0.58, 1)`
- `SPRING.INTERACTIVE` — `{ damping: 30, stiffness: 250 }` for gesture-driven motion

**Rules:**

- Respect reduced motion — no exceptions. `<MotionProvider>` (`MotionConfig reducedMotion="user"`) in the root layout neutralises every Framer transform and layout animation app-wide; opacity and colour fades still run
- Gate what MotionConfig can't reach with `useReducedMotion()`: scroll-bound `style` values (`useTransform` → `style={{ scale }}`), width/height tweens, WebGL loops (render one static frame), autoplaying media and timers (hold the first frame)
- CSS transforms on hover/press use the `motion-safe:` variant
- Spring physics preferred over bezier curves for interactive elements
- Stagger children by 50-80ms for list reveals (`STAGGER.DELAY`)
- Exit animations faster than entry (ease-in, shorter duration)
- Framer Motion for component animation, CSS keyframes for ambient effects only
- No ad-hoc durations or curves — use the constants
- **Size changes never re-wrap text.** Don't tween `width`/`height` to `'auto'` on content that wraps — Framer measures `auto` at the in-between width and snaps. Lay each state out at its final width, measure it, animate the container between measured px boxes and clip (see `ProjectCardDesktop`)
- **Sizes that change together move together.** Every simultaneous width/height animation uses `RESIZE` (one duration, one curve), so combined heights glide in one direction and centred lists never wobble
- **Swap content with `CROSSFADE`**: the outgoing layer clears in `OUT` before `IN` starts at the resize midpoint — no ghosting, no clipped text. Hidden layers are `inert` and `aria-hidden`

### Icons

- **Only:** `@tabler/icons-react` — stroke-based, `stroke={1.5}`. No other icon library and no hand-pasted SVG paths.
- Sizing: 16px with small text, 20px with body, 24px with headings.
- Color: always inherit via `currentColor`. Never hardcode icon colors.
- Decorative icons get `aria-hidden`.

### State Management

One owner per kind of state. No state library beyond these.

| Category                       | Owner                                                                                            | Rule                                                                                                                                                                                     |
| ------------------------------ | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Server / remote data           | TanStack Query (`QueryProvider`)                                                                 | One options factory per resource next to its hook (`useVideo` → `videoQueryOptions`, `prefetchVideo`). Never fetch in `useEffect`                                                        |
| Cross-component UI state       | React context (`ThemeContext`, `ProjectHoverContext`)                                            | Only when two or more distant components need it. One context per concern; memoise the provider `value`                                                                                  |
| Ephemeral local state          | `useState` in the owning component                                                               | Never mirror props or derived values into state; never use an effect to sync state. To reset state when an item changes, key a child component by that item                              |
| Derived / media-query / scroll | `useMediaQuery` (built on `useSyncExternalStore`), Framer motion values, render-time computation | `useReducedMotion` and `useIsMobile` wrap `useMediaQuery`. Scroll position lives in motion values (`useScroll` + `useMotionValueEvent`); React state only changes when behaviour changes |

Theme: the pre-paint script in `layout.tsx` and `ThemeProvider` share one rule — a stored `light`/`dark` wins, otherwise follow `prefers-color-scheme`. Change both together or the page flashes.

---

## 5. Layout Principles

### Spacing

- Base unit: 4px (Tailwind default)
- Section gaps: `mb-16` (64px) is the most common section spacer
- Horizontal padding: detail pages use `px-4`; home sections use `px-5 sm:px-6 md:px-4` inside `max-w-7xl` (the container's own margin supplies the desktop gutter)
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
- Transitions use rounded corners (`rounded-t-panel corner-squircle`) as "scene change" markers. This is where the portfolio deliberately departs from Apple's square, full-bleed tiles — the rounded edge is the signature
- The colour change itself is the divider: no borders or rules between sections
- The alternation creates cinematic pacing without stark black/white binary

### Border Radius Scale

Tokens in `globals.css` (`--radius-*`), so every step is a real class:

| Name     | Value                | Class              | Use                                                       | Squircle? |
| -------- | -------------------- | ------------------ | --------------------------------------------------------- | --------- |
| Hairline | 2px                  | `rounded-hairline` | Image accent borders                                      | Yes       |
| Small    | 8px                  | `rounded-small`    | Buttons, toggles, dropdown items                          | Yes       |
| Base     | 12px                 | `rounded-base`     | Dropdowns, list rows, skeletons, large buttons            | Yes       |
| Medium   | 20px                 | `rounded-media`    | Media containers, progressive images, inline cards        | Yes       |
| Large    | 28px                 | `rounded-card`     | Cards (compact/mobile), diagram frames                    | Yes       |
| XL       | 40px                 | `rounded-panel`    | Video previews, footer, expanded nav, section transitions | Yes       |
| 2XL      | 50px                 | `rounded-card-lg`  | Cards (desktop/expanded)                                  | Yes       |
| Pill     | 140px                | `rounded-pill`     | Navigation, pill-shaped elements                          | Yes       |
| Circle   | 50% (`rounded-full`) | `rounded-full`     | Avatars, dots, circular buttons, badges                   | No        |

**Rule:** All rectangular radii pair with `corner-squircle`. Never use `corner-squircle` without an explicit radius. `rounded-full` does NOT use `corner-squircle`. No arbitrary `rounded-[Npx]` values and no Tailwind defaults (`rounded-md`, `rounded-xl`, `rounded-2xl` …) — use the named steps.

---

## 6. Depth & Elevation

Four levels. Elevation comes from surface colour first; shadows are rare.

| Level        | Treatment                                                                                                      | Use                                                             |
| ------------ | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Flat (0)     | No shadow, surface color differentiation only                                                                  | Most content, sections, cards                                   |
| Hairline (1) | `shadow-hairline` — a soft 1px ring plus a whisper of depth; flips to a white ring on dark and chrome surfaces | Inline cards, select, secondary buttons, badges                 |
| Material (2) | `material-chrome` + `inset-shadow-border-glow`                                                                 | Floating navigation only                                        |
| Product (3)  | `shadow-customShadow` (`0 45px 70.8px -48px oklch(0 0 0 / 0.95)`)                                              | Photography resting on a surface — never cards, buttons or text |

**Shadow philosophy:**

- Most elements have NO shadow. Elevation comes from surface color contrast.
- The material (blur + inner glow) is navigation-only — the signature depth element. It carries no drop shadow.
- `shadow-customShadow` is deliberately dramatic — deep, directional, studio lighting. Reserved for product photography, 1–2 per page max.
- Tailwind's `shadow-xs` … `shadow-2xl` are not part of the system.

**Decorative depth:**

- `inset-shadow-border-glow`: inner border on dark surfaces — `inset 0 1px 0 0 oklch(1 0 0 / 0.08), inset 0 0 0 1px oklch(1 0 0 / 0.05)`. Soft edge catch-light.
- `image-depth-outline`: 1px inset outline on images so they don't bleed into the page.
- Section color transitions: depth implied by warm-light <-> warm-dark alternation

---

## 7. Do's and Don'ts

### Do

- Use oklch semantic tokens for all colors — never hardcode hex or rgb
- Apply `corner-squircle` with a named radius (`rounded-small` … `rounded-pill`) on all rectangular curved surfaces
- Use `font-normal` for body text, `font-medium` for headings and UI elements
- Apply `tracking-display` / `tracking-heading` at display and heading sizes
- Respect reduced motion — MotionConfig covers Framer transforms; gate everything else with `useReducedMotion()`
- Build shared components as `cva()` recipes (see Components → Variant Pattern)
- Use Tabler icons (`@tabler/icons-react`) for all new icon needs
- Keep section padding generous — let content breathe
- Use spring physics for interactive animations (Framer Motion)
- Alternate warm-light and warm-dark sections for cinematic rhythm
- Use `cn()` from `@/lib/utils` for conditional class merging

### Don't

- Don't use `font-bold` (700) or `font-light` (300) in new work
- Don't introduce other icon libraries or paste raw SVG icon paths — Tabler only
- Don't use arbitrary radii (`rounded-[Npx]`) or Tailwind's default radius and shadow scales
- Don't add shadows to flat elements — elevation is rare and intentional
- Don't use `corner-squircle` without an explicit radius value
- Don't use cool grays (slate, zinc, gray) — all neutrals are warm
- Don't hardcode colors in inline styles or CSS — use Tailwind classes or CSS custom properties
- Don't add animation without a reduced-motion fallback
- Don't use `rounded-full` with `corner-squircle`
- Don't introduce textures or complex gradients — solid semantic colors only (the loading shimmer and section fades are the exception)
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

| Need                   | Class                           |
| ---------------------- | ------------------------------- |
| Primary action         | `bg-primary` / `text-primary`   |
| Page background        | `bg-background`                 |
| Dark surface           | `bg-surface-dark`               |
| Text on light          | `text-foreground`               |
| Text on scene / chrome | `text-surface-dark-foreground`  |
| Muted text             | `text-muted-foreground`         |
| Borders                | `border-border`                 |
| Chart series           | `fill-chart-1` … `fill-chart-5` |
| Focus ring             | `ring-ring`                     |
| Text selection         | `neutral-200` background        |

### Example Component Recipes

**Section heading:**

```
text-2xl md:text-4xl font-medium tracking-display text-foreground
```

On dark surfaces: use `text-surface-dark-foreground`.

**Project card:**

```
<Card surface="page | scene">  // bg-card rounded-card md:rounded-card-lg corner-squircle
```

No shadow. Image inside: `rounded-media corner-squircle`. Title at Card Title tier.

**CTA button:**

```
<Button asChild><Link href="…">Label</Link></Button>
// bg-primary text-primary-foreground rounded-small corner-squircle font-medium tracking-heading
// hover:bg-primary-600 motion-safe:active:scale-[0.96]
```

**Dark section:**

```
bg-surface-dark rounded-t-panel corner-squircle
```

All text: `text-surface-dark-foreground` or `text-surface-dark-muted`.

### Iteration Checklist

1. All colors use semantic tokens — no hardcoded values
2. Typography follows the hierarchy table — correct size, weight, tracking for each role
3. Border radius from the named scale — paired with `corner-squircle`
4. Shadows are flat unless intentionally elevated (Level 0 default)
5. Motion uses the `DURATION`/`EASING` constants; anything Framer's MotionConfig can't reach is gated by `useReducedMotion()`
6. Warm neutrals only — no cool grays, no zero-chroma darks
7. Tabler icons only; `cva()` recipe for anything shared
