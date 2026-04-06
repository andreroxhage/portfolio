# Scroll-Driven Header with Sequential About Reveal

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Merge the About section into the Header as a scroll-driven sticky experience — the first 100vh stays fixed while three content phases (subtitle, "At work", "Elsewhere") sequence in and out via scroll progress, with a slow-drift parallax on the hero image.

**Architecture:** A tall outer wrapper (300vh) with a sticky inner container (100vh). A single Framer Motion `useScroll({ target })` produces a 0–1 progress value. All animations — text crossfades, parallax, overlay darkening — derive from this progress via `useTransform`. No tabs, no click interaction, no IntersectionObserver. The standalone About section is removed from the page.

**Tech:** Framer Motion (`useScroll`, `useTransform`, `motion.div`), existing `useReducedMotion` hook, existing motion constants from `src/app/lib/motion.ts`.

---

## 1. Scroll Container Structure

The Header section becomes:

```
<section ref={containerRef} style={{ height: '300vh' }}>      ← scroll travel
  <div style={{ position: 'sticky', top: 0, height: '100vh' }}> ← viewport lock
    <HeroBar />           ← top 33-40% with parallax image
    <ContentArea />       ← bottom 60-67% with sequenced text + profile photo
  </div>
</section>
```

`useScroll({ target: containerRef, offset: ['start start', 'end end'] })` yields `scrollYProgress` from 0 to 1 as the 300vh container scrolls through.

The entry animations (name blur-in, subtitle blur-in, profile picture scale-in) from the current Header.js remain as-is — they fire on mount, before any scroll happens. The scroll-driven content transitions begin only after the user starts scrolling.

---

## 2. Scroll Timeline

| Progress | Left Column Content | Hero Image | Overlay Opacity |
|----------|-------------------|------------|-----------------|
| 0–0.25 | h2 subtitle ("Design Engineer, blending...") at full opacity | scale 1.0, translateY 0% | 0.85 |
| 0.25–0.35 | h2 fades out (opacity→0, translateY→-10px). "At work" heading fades in (opacity→1, translateY 20→0px), body follows ~2% later | scale ~1.02, translateY ~-5% | 0.87 |
| 0.35–0.55 | "At work" content holds at full opacity (reading time) | scale ~1.03, translateY ~-8% | 0.88 |
| 0.55–0.65 | "At work" fades out. "Elsewhere" heading + body fades in with same rise pattern | scale ~1.04, translateY ~-11% | 0.89 |
| 0.65–0.85 | "Elsewhere" content holds at full opacity | scale ~1.04, translateY ~-13% | 0.90 |
| 0.85–1.0 | All content fades out, section unsticks naturally | scale 1.05, translateY -15% | 0.90 |

---

## 3. Hero Parallax (Slow Drift)

The hero background image (top bar of the header) gets three scroll-driven transforms:

- **translateY:** `useTransform(scrollYProgress, [0, 1], ['0%', '-15%'])` — image scrolls slower than content, creating depth
- **scale:** `useTransform(scrollYProgress, [0, 1], [1, 1.05])` — subtle zoom-in as user scrolls, cinematic breathing effect
- **Overlay opacity:** `useTransform(scrollYProgress, [0, 1], [0.85, 0.90])` — darkens slightly to maintain text legibility as image shifts

The image container uses `overflow: hidden` to clip the parallax movement. The "André Roxhage" h1 stays in its current position — no scroll transform on it.

---

## 4. Text Transition Micro-Interactions

Each content phase (subtitle, "At work", "Elsewhere") uses Fade + Subtle Rise:

**Enter:**
- Heading: opacity 0→1, translateY 20px→0px over ~10% scroll progress
- Body text: same animation, offset by ~2% scroll progress (heading leads)

**Exit:**
- Both: opacity 1→0, translateY 0→-10px over ~10% scroll progress

**"At work" and "Elsewhere" content structure:**
- A heading (h3 style: `text-2xl md:text-4xl font-medium tracking-tight text-foreground`)
- Body paragraph (`text-base md:text-lg font-normal leading-relaxed text-muted-foreground`)
- Content sourced from the existing `about` array in `src/app/data/home.ts`

The subtitle exit and "At work" enter overlap slightly (both happening in the 0.25–0.35 range) to create a crossfade rather than a sequential black-out.

---

## 5. Right Column (Profile Picture)

The profile picture stays anchored in its current grid position throughout all scroll phases. No animation, no opacity changes. It provides visual stability while the left column text transitions.

Existing classes and layout: `col-start-3 p-6 md:p-6 col-span-6 md:col-start-7 md:col-span-3` with the circular profile image.

---

## 6. Reduced Motion

When `useReducedMotion()` returns true:

- **Parallax:** disabled — no translateY, no scale on hero image
- **Text transitions:** instant opacity swaps (no translateY movement), content still sequences via scroll but transitions are immediate
- **Overlay:** stays at constant 0.85 opacity
- **Entry animations:** already handled (existing `reducedMotion` checks in Header.js)

---

## 7. Mobile Behavior

Same sticky scroll behavior on mobile. The existing responsive grid already handles the layout shift (profile picture moves below content on small screens via `col-span-10` vs `md:col-span-6`).

The 300vh scroll distance is kept on mobile — the three content phases still sequence. Single-column stacked layout with the same fade+rise transitions.

---

## 8. File Changes

| File | Action | Details |
|------|--------|---------|
| `src/app/sections/Header.js` | **Rewrite** | Add scroll wrapper, useScroll/useTransform, parallax on hero image, 3-phase content sequencing in left column |
| `src/app/sections/About.js` | **Delete** | Fully merged into Header |
| `src/app/page.tsx` | **Modify** | Remove `<About />` import and usage |
| `src/app/data/home.ts` | **No change** | `about` array already has correct shape (`[{title, description}, ...]`) |
| `src/app/lib/motion.ts` | **No change** | Existing constants sufficient |

---

## 9. What's NOT Changing

- The "André Roxhage" h1 in the hero bar — keeps existing mount animation
- The hero background image source and overlay structure
- The profile picture and its mount animation
- The header `id="header"` for nav scroll-to
- The warm-light/warm-dark section rhythm (header stays `bg-secondary` lower half)
- CurrentWork section and everything below — unchanged
