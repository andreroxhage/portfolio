---
name: portfolio-charts
description: Use before building any chart, graph, plot, sparkline, stat tile, KPI number or flow diagram on the portfolio, including charts inside project, experiment or writing pages. Covers the chart-1…chart-5 palette, ramps, marks, labels, hover and table view, all in the Claude chart style on the site's warm tokens. Also use when changing chart colors or the --chart-* tokens in globals.css.
---

# Portfolio charts

Charts on this site should look like Claude's charts and diagrams: quiet, thin marks, recessive grid, one clear point per figure. They wear the portfolio's own warm tokens instead of Claude's palette. The method is Claude's data-viz method; only the parameters are ours.

DESIGN.md is still the source of truth. This skill only covers what DESIGN.md delegates to it.

## First: chart or diagram?

- **Data** (numbers over time, comparisons, parts of a whole) → a chart. Follow the procedure below.
- **Mechanism** (a pipeline, who does what, a flow of steps) → a diagram. Use the existing `@/app/components/Diagram` primitives. See `references/diagrams.md`.
- **One number** → not a chart. Use a stat tile or just write the number in the sentence.

## The procedure, in order

Color comes last. Most bad charts start with color.

1. **Pick the form from the data's job.**

   | Job                                 | Form                                                            |
   | ----------------------------------- | --------------------------------------------------------------- |
   | One headline value                  | Stat tile (`StatTile`), not a one-bar chart                     |
   | Trend over time                     | Line; single series gets a 10% area wash                        |
   | Compare a few categories            | Columns / bars                                                  |
   | One series matters, rest is context | Emphasis: `chart-1` for the story, `foreground/20` for the rest |
   | Part of a whole                     | Stacked bar, not a pie                                          |
   | Before → after per item             | Dumbbell (two shades of one hue)                                |
   | Above / below a baseline            | Diverging bar                                                   |

   Never use a dual axis. Two measures on different scales become two charts.

2. **Assign color by job** (tokens in `references/palette.md`):
   - Identity (which series) → `chart-1`, `chart-2`, … in order, never cycled, never skipped. At most **5** series. A sixth folds into "Other" or becomes small multiples. Scatter and small multiples cap at **3**.
   - Magnitude or order → one-hue green ramp from `primary-*`, never the categorical slots.
   - Polarity → `chart-3` (blue, below) ↔ `chart-2` (clay, above), neutral midpoint.
   - Colour follows the entity. A filter never repaints the series that remain.
   - Text never wears a series color. Values, axes and legends use `foreground` / `muted-foreground`.

3. **Build it with the chart kit** (`references/chart-kit.md`). It already applies the mark specs: bars of 24px or less with a 4px rounded data end and square foot, 2px gaps, 2px lines, an 8px end dot with a 2px surface ring, and 1px solid gridlines. If `src/app/components/Chart/` doesn't exist yet, create it from that file first, then import from it.

4. **Label sparingly.** For two or more series, show a legend. A single series needs none, because the title names it. Direct-label only the story: the end of a line, the one bar that matters. Never put a number on every point.

5. **Interaction is part of the deliverable.** Bars get a tooltip on hover and focus. Lines get a crosshair that snaps to the nearest x and lists every series, value first. Tooltips add to the chart but never gate a value: every chart ships the `Show data` table view.

6. **Both modes.** The tokens switch per theme automatically. Still look at the chart in light and dark mode, because a label that works on cream can vanish on near-black.

7. **Render it and look.** Screenshot the page in light and dark mode at desktop and ~390px wide with Playwright. Check for colliding labels, clipped text, tooltip placement and the x-axis band.

8. **Check it against the anti-patterns** in `references/rules.md`. If the chart matches one, it's wrong.

Then run the usual gates: `npm run lint`, `npx tsc --noEmit`, `npm run build`.

## Non-negotiables

- Only `chart-*` tokens and existing semantic tokens. No hex, no rgb, no Tailwind default palette (`blue-500` etc.). Warm neutrals only.
- Assign slots 1→5 in order, never cycled. Never generate a sixth hue.
- One axis per chart.
- Thin marks, a solid 1px grid (never dashed), and separation by surface gaps, never by strokes around marks.
- Legend for two or more series, selective direct labels, and a table view on every chart.
- Charts are static by default. Any entry animation goes through `useReducedMotion()` with `DURATION` / `EASING` from `src/app/lib/motion.ts`, and must be skippable.
- The chart sits in a figure with `corner-squircle` and radii from the DESIGN.md scale (the kit's `ChartFrame` already does this).
- Copy follows the `personal-voice` skill. Titles and labels are sentence case with no trailing colon, and the caption states the takeaway ("Hard volume stays near 20% while total distance grows"), not "Chart of X".

## Changing the palette

The five slots were chosen by validator, not by eye. Before changing any `--chart-*` value in `src/app/globals.css`, run:

```bash
node .claude/skills/portfolio-charts/scripts/check-chart-palette.mjs
```

It reads the tokens straight from `globals.css` and checks both modes. It checks lightness band, chroma floor, adjacent-pair colour-blind separation (target ΔE ≥ 8), a normal-vision floor (ΔE ≥ 15), contrast of 3:1 against `background`, `secondary` and `card`, and all-pairs separation for slots 1–3. It exits 1 on any hard fail. Update the table in DESIGN.md → Chart Palette in the same change.

## References

| File                              | Read it when                                                        |
| --------------------------------- | ------------------------------------------------------------------- |
| `references/palette.md`           | Choosing colors: slots, ramps, diverging, chrome tokens, surfaces   |
| `references/rules.md`             | Mark specs, labels, tooltips, stat tiles, and the anti-pattern list |
| `references/chart-kit.md`         | Building: tested `ChartFrame`, `BarChart`, `LineChart`, `StatTile`  |
| `references/diagrams.md`          | Drawing a flow or mechanism instead of data                         |
| `scripts/check-chart-palette.mjs` | After touching any `--chart-*` token                                |
