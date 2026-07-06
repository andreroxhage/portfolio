# Design System Overhaul — Spec

## Summary

Replace the scattered design authority (frontend-style skill, frontend.md rule, inline CLAUDE.md guidance) with a single `DESIGN.md` at project root. The document follows Apple's 9-section DESIGN.md structure, adapted to the portfolio's warm organic identity. Beyond documentation, adopt Apple-inspired design principles — typography tracking, weight restraint, section rhythm, elevation discipline — while preserving the existing oklch color system and green/cream palette.

## Goals

1. **Single source of truth**: One file (`DESIGN.md`) governs all visual decisions for both human and AI contributors.
2. **Eliminate stale guidance**: Remove `frontend-style/SKILL.md` (hex colors that don't match globals.css) and `frontend.md` rule (thin, redundant).
3. **Adopt Apple-inspired principles**: Typography tracking at all sizes, weight restraint, section rhythm, elevation discipline, whitespace philosophy.
4. **Migrate font**: Replace Roboto with Plus Jakarta Sans — warmer, geometric, better optical balance at display sizes, and naturally tighter than Roboto.
5. **Clean up tokens**: Remove dead CSS custom properties, fix hardcoded hex values, document per-stop color roles.
6. **Formalize implicit patterns**: Border radius scale, motion scale, and typography hierarchy that already exist in code but aren't documented.

## Non-Goals

- Changing the color palette (green/cream/warm neutrals stay)
- Refactoring component architecture
- Adding new components or pages

---

## 1. File Structure Changes

### Create

- **`DESIGN.md`** (project root) — 9-section design system document, structured after Apple's DESIGN.md format:
  1. Visual Theme & Atmosphere
  2. Color Palette & Roles
  3. Typography Rules
  4. Component Stylings
  5. Layout Principles
  6. Depth & Elevation
  7. Do's and Don'ts
  8. Responsive Behavior
  9. Agent Prompt Guide

### Remove

- **`.claude/skills/frontend-style/SKILL.md`** — Stale hex brand colors (`#FAEFDE`, `#222222`, `#EBE1D1`, etc.) that don't match globals.css oklch tokens. Documents custom-green/brown/yellow/blue tokens that have zero usage. Entirely replaced by DESIGN.md.
- **`.claude/rules/frontend.md`** — 6 bullet points, all covered by DESIGN.md Do's/Don'ts section and CLAUDE.md pointer. The `paths:` frontmatter glob trigger is useful but can move to a new minimal rule that just points to DESIGN.md.

### Update

- **`CLAUDE.md`** — Remove the "Non-Negotiables" section's inline design guidance. Replace with: `See DESIGN.md for all visual and styling decisions.` Keep the tech snapshot, architecture, and development sections unchanged.
- **`globals.css`** — Remove dead custom-* color tokens (custom-green, custom-brown, custom-yellow, custom-blue if they exist as CSS variables). Update `--font-sans` from Roboto to Plus Jakarta Sans. Add `--tracking-body` custom tracking token.
- **`.claude/rules/`** — Create a minimal `design.md` rule with a `paths:` glob for `src/**/*.{ts,tsx,js,jsx,css}` that simply says "Follow DESIGN.md for all visual decisions."

---

## 2. DESIGN.md Content Specification

### Section 1: Visual Theme & Atmosphere

**Identity statement**: The portfolio is warm, organic, and intentionally imperfect — cream paper, forest greens, and earth tones. The aesthetic is professional yet inviting, like a well-made notebook rather than a corporate brochure. Every surface has warmth; every neutral has a hint of yellow or brown.

**Philosophy**: Reductive but not cold. Elements earn their place. The interface retreats to let content breathe, but unlike Apple's clinical minimalism, the warmth of the palette makes the emptiness feel cozy rather than austere.

**Key characteristics to document**:
- Plus Jakarta Sans with medium weight as the gravity center — warm, geometric, modern
- Warm oklch neutrals with yellow/brown undertones (never cool grays)
- Squircle corners everywhere — iOS-inspired superellipse softness
- Green as the singular interactive accent color
- Glass navigation floating above content
- Generous whitespace between sections, tight text within

### Section 2: Color Palette & Roles

**Source of truth**: `globals.css` oklch values. Document all three scales with per-stop role assignments:

**Primary scale (green, 50–950):**
| Stop | Role |
|------|------|
| 50–100 | Hover backgrounds, lightest tints |
| 200–300 | Borders, dividers, active state backgrounds |
| 400–500 | **Interactive range** — buttons, links, action colors |
| 600–700 | Hover/active states on interactive elements |
| 800–950 | Dark emphasis, dark mode accents |

**Neutral scale (warm earth, 25–975):**
| Stop | Role |
|------|------|
| 25–50 | Page backgrounds (light mode) |
| 100–200 | Card surfaces, secondary backgrounds |
| 300–400 | Borders, muted UI elements |
| 500–600 | Muted text, placeholders |
| 700–800 | Primary text (light mode) |
| 900–975 | Page backgrounds (dark mode), near-black surfaces |

**Semantic tokens**: Document the light-mode and dark-mode mappings for: background, foreground, card, primary, secondary, muted, accent, border, ring, surface-dark-*, surface-footer.

**What to remove**: The custom muted tones (custom-green `#BCD3BB`, custom-brown `#D3C4BB`, custom-yellow `#D1D3BB`, custom-blue `#BBCCD3`) — zero usage in codebase. If they're ever needed, they can be re-added with oklch values and documented roles.

**Hardcoded hex fixes** (document these as implementation tasks):
| Current | Location | Replace With |
|---------|----------|-------------|
| `#739966` | ProjectHeader.tsx | `text-primary-700` |
| `#788876` | ProjectHeader.tsx | `text-muted-foreground` |
| `#5f514a` | text-reveal-card.tsx | `text-neutral-600` or semantic token |
| `#191919` | 4 layout files | `bg-neutral-975` |
| `#000000` | 4 layout files | `bg-neutral-950` |

### Section 3: Typography Rules

**Font family**: Plus Jakarta Sans (global, via `next/font/google`). Single font, no display/text split (unlike Apple's SF Pro). Plus Jakarta Sans is naturally tighter than Roboto with warmer geometric letterforms that complement the cream/green palette. The tracking system fine-tunes its already-good default spacing.

**Hierarchy table**:

| Role | Mobile | Desktop | Weight | Tracking | Line Height | Use |
|------|--------|---------|--------|----------|-------------|-----|
| Display Hero | text-6xl | text-8xl | medium (500) | tighter (-0.05em) | snug (1.125) | Main name, hero moments |
| Page Title | text-4xl | text-6xl | medium (500) | tighter (-0.05em) | tight (1.25) | Page headings, footer CTA |
| Section Heading | text-2xl | text-4xl | medium (500) | tight (-0.025em) | tight (1.25) | "About me", section intros |
| Card Title | text-xl | text-2xl–3xl | medium (500) | tight (-0.025em) | snug (1.375) | Project cards, resume items |
| Body | text-base | text-lg | medium (500) | -0.011em | relaxed (1.625) | Descriptions, paragraphs |
| Body Light | text-base | text-lg | normal (400) | -0.011em | relaxed (1.625) | De-emphasized body, breadcrumbs |
| Small / Meta | text-xs | text-sm | medium (500) | normal | normal (1.5) | Timestamps, metadata |
| Label | text-xs | text-xs | normal (400) | widest + uppercase | normal (1.5) | Section labels in lists |

**Tracking principles** (Apple-inspired):
- Display sizes (4xl+): `tracking-tighter` (-0.05em) — machined, billboard-like compression
- Heading sizes (xl–3xl): `tracking-tight` (-0.025em) — subtle tightening, professional
- Body sizes (base–lg): `-0.011em` (custom) — barely perceptible crispness. Plus Jakarta Sans is naturally tighter than Roboto, so this value may need tuning downward during implementation
- Small/label sizes: normal or `tracking-widest` for uppercase labels

**Weight restraint**:
- **font-medium (500)** is THE default. Used for headings, body, cards, navigation — everything unless there's a reason to deviate.
- **font-normal (400)** for de-emphasis: breadcrumbs, article subtitles, secondary descriptions.
- **font-semibold (600)** for emphasis within content: bold inline text, important labels.
- **font-light (300)** and **font-bold (700)**: Do not use in new work. Font-light exists in Footer legacy only.

**Line-height philosophy** (Apple-inspired "compression within, expansion between"):
- Headlines compress (`leading-snug` to `leading-tight`) — text blocks feel dense and intentional
- Body text opens (`leading-relaxed`) — comfortable reading rhythm
- This contrast creates visual hierarchy through rhythm alone, independent of size

### Section 4: Component Stylings

**Buttons**: Document existing button patterns from shadcn/ui with brand customization. Primary uses `bg-primary` (green), rounded with corner-squircle.

**Cards & Containers**:
- Background: semantic surface tokens (`bg-card`, `bg-surface-dark-card`)
- Border: `border-border` (1px), used sparingly
- Radius: follows the border radius scale (see Section 5)
- Shadow: Flat by default. Only `shadow-customShadow` for rare emphasis.
- Content: generous internal padding

**Navigation (FloatingNav)**:
- Glass effect: `bg-surface-dark backdrop-blur-md inset-shadow-border-glow shadow-lg`
- Shape: `rounded-[140px] corner-squircle` — extreme pill
- Collapses/expands with spring animation
- Always dark surface regardless of page theme (`surface-lock-dark` pattern)

**Image Treatment**:
- Always in squircle containers (`corner-squircle` + radius from scale)
- Progressive loading: blur-up placeholder → full resolution
- Profile/avatar: `rounded-full`
- Image accent borders: `rounded-[2px] corner-squircle` — thinnest possible squircle edge
- No drop-shadows directly on images — the container provides shape
- Products/projects on solid-color backgrounds, not floating

### Section 5: Layout Principles

**Spacing system**:
- Base unit: 4px (Tailwind's default)
- Section gaps: `mb-16` (64px) is the most common section spacer
- Horizontal padding: `px-4` (16px) mobile, `px-6` (24px) desktop
- Internal padding: `p-6` (24px) for cards and containers
- Grid gaps: `gap-x-6` to `gap-x-10`

**Grid & Container**:
- Max content width: `max-w-7xl` (80rem) for main content, `max-w-8xl` (90rem) available for full-bleed
- 10-column grid in sections (used in About, VoluntaryWork, Footer)
- Breakpoints: default → sm → md → lg → xl → 2xl → 3xl (1600px)

**Whitespace philosophy** (Apple-inspired):
- "Compression within, expansion between" — tight text (negative tracking, compressed line-heights on headings) surrounded by generous section padding
- Each major section occupies significant viewport height, breathing room between them
- White space is not empty — it's the pause between scenes

**Section rhythm** (Apple-inspired warm adaptation):
- **Warm-light sections**: `bg-background` / `bg-secondary` — informational, open, breathing
- **Warm-dark sections**: `bg-surface-dark` — immersive, dramatic, focus
- Transitions between light and dark use rounded corners (`rounded-t-[40px]`) as "scene change" markers
- The alternation creates cinematic pacing without Apple's stark black/white binary

**Border radius scale**:

| Name | Value | Use | Squircle |
|------|-------|-----|----------|
| Hairline | 2px | Image accent borders | Yes |
| Small | 8px | Dropdown items, small cards, toggles | Yes |
| Base | 12px | Dropdowns, badges, section containers | Yes |
| Medium | 20px | Media containers, progressive images | Yes |
| Large | 28px | Cards (compact/mobile) | Yes |
| XL | 40px | Video previews, footer, dialogs | Yes |
| 2XL | 50px | Cards (desktop/expanded) | Yes |
| Pill | 140px | Navigation, pill-shaped elements | Yes |
| Circle | 50% (`rounded-full`) | Avatars, circular buttons | No |

**Rule**: All rectangular radii pair with `corner-squircle`. Never use `corner-squircle` alone (it needs an explicit radius). `rounded-full` does NOT use `corner-squircle` (circles don't need superellipse correction).

**Consolidation**: Migrate `rounded-[10px]` → `rounded-[8px]` (1 instance, ThemeToggle). Migrate `rounded-[16px]` → `rounded-[12px]` or `rounded-[20px]` (1 instance, VideoDialogMobile badge).

### Section 6: Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (0) | No shadow, surface color differentiation only | Most content, sections, cards |
| Glass (1) | `backdrop-blur-md` + `inset-shadow-border-glow` + `shadow-lg` | Floating navigation only |
| Elevated (2) | `shadow-customShadow` (`0 45px 70.8px -48px rgba(0,0,0,0.95)`) | Hero images, rare dramatic emphasis |

**Shadow philosophy** (Apple-inspired):
- Most elements have NO shadow. Elevation comes from surface color contrast (lighter card on slightly different background).
- The glass effect (blur + inner glow) is reserved for navigation — it's the signature depth element.
- `shadow-customShadow` is deliberately dramatic — a deep, directional shadow that mimics studio lighting. Use on 1-2 elements per page maximum.
- `shadow-xs` appears on some buttons — this is acceptable for subtle tactile feedback but should not be expanded.

**Decorative depth**:
- Navigation glass: translucent, blurred nav floating above scrolling content
- Section color transitions: depth implied by warm-light ↔ warm-dark alternation
- `inset-shadow-border-glow`: Subtle inner border on dark surfaces — `inset 0 1px 0 0 rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.05)`. Creates a soft edge catch-light.

### Section 7: Do's and Don'ts

**Do:**
- Use oklch semantic tokens for all colors — never hardcode hex or rgb values
- Apply `corner-squircle` with explicit `rounded-[Npx]` on all rectangular curved surfaces
- Use `font-medium` as the default weight for all new text elements
- Apply negative letter-spacing at display and heading sizes (`tracking-tighter`, `tracking-tight`)
- Gate all animation behind `useReducedMotion()` hook — no exceptions
- Use Tabler icons (`@tabler/icons-react`) for all new icon needs
- Keep section padding generous — let content breathe between sections
- Use spring physics for interactive animations (Framer Motion)
- Alternate warm-light and warm-dark sections for cinematic rhythm

**Don't:**
- Don't use `font-bold` (700) or `font-light` (300) in new work
- Don't introduce new icon libraries — Tabler primary, Heroicons legacy only
- Don't add shadows to elements that should be flat — elevation is rare and intentional
- Don't use `corner-squircle` without an explicit radius value
- Don't use cool grays (slate, zinc, gray) — all neutrals are warm (yellow/brown undertones)
- Don't hardcode colors in inline styles or CSS — use Tailwind classes or CSS custom properties
- Don't add animation without a reduced-motion fallback
- Don't use `rounded-full` with `corner-squircle` — circles don't need superellipse correction
- Don't introduce textures or complex gradients to backgrounds — solid semantic colors only (aurora/shimmer ambient effects are the exception, not the rule)
- Don't center-align body text — body copy is left-aligned; only headlines may center

### Section 8: Responsive Behavior

**Breakpoints** (Tailwind defaults + custom):

| Name | Width | Key Changes |
|------|-------|-------------|
| default | <640px | Single column, compact typography |
| sm | 640px | Minor layout adjustments |
| md | 768px | Typography scale-up begins, 2-column grids |
| lg | 1024px | Full desktop layout |
| xl | 1280px | Wider content areas |
| 2xl | 1536px | Maximum standard width |
| 3xl | 1600px | Custom — generous margins, full-bleed content |

**Typography scaling**: Aggressive responsive jumps (e.g., text-4xl → text-6xl at md breakpoint). The hierarchy table specifies mobile and desktop sizes for each role.

**Touch targets**: Follow 44px minimum for all interactive elements. Buttons use adequate padding. Navigation links are 48px+ height.

**Collapsing strategy**:
- Project grids: multi-column → single column stacked
- Navigation: pill nav stays, content collapses into expandable menu
- Section backgrounds: maintain full-width color blocks at all breakpoints — the section rhythm never breaks
- Images: scale proportionally within their squircle containers, never crop

### Section 9: Agent Prompt Guide

**Quick color reference**:
- Primary action: `bg-primary` / `text-primary` (green, oklch 0.72 0.11 148)
- Page background: `bg-background` (warm cream, oklch 0.975 0.005 85)
- Dark surface: `bg-surface-dark` (near-black, oklch 0.145 0 0)
- Text on light: `text-foreground` (warm dark, oklch 0.34 0.01 90)
- Text on dark: `text-surface-dark-foreground` (near-white, oklch 0.97 0 0)
- Muted text: `text-muted-foreground` (oklch 0.45 0.01 90)
- Borders: `border-border` (oklch white at 12% opacity)
- Focus ring: `ring-ring` (matches primary green)

**Example component prompts**:
- "Create a section heading: `text-2xl md:text-4xl font-medium tracking-tight text-foreground`. On dark surfaces use `text-surface-dark-foreground`."
- "Create a project card: `bg-card rounded-[28px] md:rounded-[50px] corner-squircle` with no shadow. Image inside with `rounded-[20px] corner-squircle`. Title at card-title tier, body text below."
- "Create a CTA button: `bg-primary text-primary-foreground rounded-[8px] corner-squircle px-4 py-2 font-medium tracking-tight`. Hover: `hover:bg-primary-600 transition-colors duration-200`."
- "Create a dark section: `bg-surface-dark rounded-t-[40px] corner-squircle`. All text uses `text-surface-dark-foreground` or `text-surface-dark-muted`. Entry rounded top creates scene-change from light section above."

**Iteration checklist**:
1. All colors use semantic tokens — no hardcoded values
2. Typography follows the hierarchy table — correct size, weight, tracking for each role
3. Border radius from the 8-tier scale — paired with `corner-squircle`
4. Shadows are flat unless intentionally elevated (Level 0 by default)
5. Animation gated by `useReducedMotion()` with appropriate duration tier
6. Warm neutrals only — no cool grays anywhere

---

## 3. Motion & Animation System

This content goes into DESIGN.md Section 4 (Component Stylings) as a "Motion & Animation" subsection:

| Category | Duration | Easing | Use |
|----------|----------|--------|-----|
| Micro | 150–200ms | ease-out | Hovers, focus rings, color transitions |
| Standard | 250–350ms | ease-out / spring | Component mount/unmount, reveals |
| Dramatic | 400–600ms | spring (stiffness: 100–200) | Page transitions, hero animations |
| Ambient | 2s–60s | linear infinite | Shimmer, aurora background effects |

**Rules**:
- Always gate behind `useReducedMotion()` — no exceptions
- Spring physics preferred over bezier curves for interactive elements
- Stagger children by 50–80ms for list reveals
- Exit animations faster than entry (ease-in, shorter duration)
- Use Framer Motion for component-level animation, CSS keyframes for ambient effects only

---

## 4. Claude Setup Changes

### New rule: `.claude/rules/design.md`

```markdown
---
paths:
  - 'src/**/*.{ts,tsx,js,jsx,css}'
---

# Design System Rule

Follow DESIGN.md at project root for all visual and styling decisions. It is the single source of truth for colors, typography, spacing, border radius, elevation, animation, and component patterns.
```

### Updated CLAUDE.md

In the "Non-Negotiables" section, replace the current 5 bullet points with:

```markdown
## Non-Negotiables

- Follow `DESIGN.md` for all visual and styling decisions — it is the single source of truth.
- Use `corner-squircle` with explicit rounded classes on curved surfaces.
- Respect reduced motion for all animation work.
```

Remove the lines about "warm organic visual identity", "brand-vanilla/brand-cream", "global typography consistent with Roboto" — these are now fully covered in DESIGN.md.

### Removed files

- `.claude/skills/frontend-style/SKILL.md` — delete entirely (the skill directory can remain if other files exist, but SKILL.md goes)
- `.claude/rules/frontend.md` — delete entirely (replaced by `design.md` rule + DESIGN.md)

---

## 5. globals.css Token Cleanup

**Remove** (if present as CSS custom properties — they may only exist in the stale skill doc):
- custom-green, custom-brown, custom-yellow, custom-blue

**No new tokens needed**: The tracking system uses Tailwind's built-in `tracking-tight`, `tracking-tighter`, `tracking-widest`. The one custom value (`-0.011em` for body) can be added as a Tailwind theme extension in `tailwind.config` or `globals.css` `@theme` block:

```css
@theme inline {
  --tracking-body: -0.011em;
}
```

This enables `tracking-body` as a Tailwind class.

---

## 6. Implementation Tasks (for plan phase)

These are the concrete code changes that the implementation plan should cover:

1. Write `DESIGN.md` with all 9 sections
2. Create `.claude/rules/design.md` (minimal pointer rule)
3. Update `CLAUDE.md` Non-Negotiables section
4. Delete `.claude/skills/frontend-style/SKILL.md`
5. Delete `.claude/rules/frontend.md`
6. Migrate font: Replace Roboto with Plus Jakarta Sans
   a. Install via `next/font/google` in `layout.tsx`
   b. Update `--font-sans` in globals.css `@theme` block
   c. Remove old Roboto import/reference
   d. Visual comparison to tune weight mapping (PJS 500 vs Roboto 500)
7. Add `--tracking-body` to globals.css `@theme` block (value may need tuning for PJS)
8. Remove dead custom-* tokens from globals.css (verify they exist first)
9. Fix 7 hardcoded hex values in components (ProjectHeader, text-reveal-card, 4 layout files)
10. Migrate `rounded-[10px]` → `rounded-[8px]` in ThemeToggle.tsx
11. Migrate `rounded-[16px]` → `rounded-[12px]` or `rounded-[20px]` in VideoDialogMobile.tsx
12. Add `tracking-tight` to section headings and card titles across components
13. Add `tracking-body` (custom) to body text elements
14. Add `leading-snug` to Display Hero and Page Title elements
15. Visual verification via Playwright screenshots before/after

---

## Open Questions

1. **Body tracking (`-0.011em`)**: Should this be applied globally via a base style in globals.css (affecting all text by default), or per-element via Tailwind classes? Global is less work but harder to override; per-element is explicit but more verbose.

2. **Accent color budget**: The current system has green (primary) + orange (accent scale, used sparingly). Should the DESIGN.md explicitly document when orange is appropriate, or should we tighten to green-only for interactive elements and reserve orange for a specific purpose (e.g., "new" badges, warnings)?

3. **The `surface-dark-*` naming**: These tokens are used on both light and dark mode. The name `surface-dark` is misleading in light mode contexts. Worth renaming in this pass, or defer?

4. **Plus Jakarta Sans weight mapping**: Plus Jakarta Sans supports weights 200–800. Current Roboto usage spans 300–600. PJS at weight 500 (medium) has slightly different visual density than Roboto 500. May need visual comparison to confirm 500 remains the right default, or if the center of gravity shifts slightly with PJS.
