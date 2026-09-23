# Palette: the portfolio instance of the method

Every colour a chart needs, mapped to tokens that already exist in `src/app/globals.css`. The chart layer only adds `--chart-1`…`--chart-5`; everything else reuses semantic tokens. Use the Tailwind classes, never the raw values.

## Categorical: series identity

| Slot | Hue   | Class stem | Light                  | Dark                   |
| ---- | ----- | ---------- | ---------------------- | ---------------------- |
| 1    | green | `chart-1`  | `oklch(0.6 0.12 150)`  | `oklch(0.67 0.11 150)` |
| 2    | clay  | `chart-2`  | `oklch(0.47 0.11 42)`  | `oklch(0.56 0.12 42)`  |
| 3    | blue  | `chart-3`  | `oklch(0.55 0.12 250)` | `oklch(0.62 0.11 250)` |
| 4    | ochre | `chart-4`  | `oklch(0.6 0.11 78)`   | `oklch(0.66 0.12 78)`  |
| 5    | plum  | `chart-5`  | `oklch(0.46 0.11 350)` | `oklch(0.56 0.12 350)` |

Classes: `fill-chart-N` (bars, dots), `stroke-chart-N` (lines), `bg-chart-N` (legend swatches, tooltip keys), `text-chart-N` (only to feed `currentColor` into an SVG gradient, never on visible text).

Validated results (`scripts/check-chart-palette.mjs`), all hard gates pass:

|                                            | Light                     | Dark                      |
| ------------------------------------------ | ------------------------- | ------------------------- |
| Worst adjacent CVD ΔE (target ≥ 8)         | 12.6, green↔clay (deutan) | 10.9, green↔clay (deutan) |
| Worst adjacent normal-vision ΔE (floor 15) | 20.7, ochre↔plum          | 19.5, ochre↔plum          |
| All-pairs, slots 1–3                       | CVD 12.6 / normal 19.1    | CVD 10.9 / normal 17.6    |
| Contrast vs background / secondary / card  | all ≥ 3:1                 | all ≥ 3:1                 |

Why this order: green comes first because it is the brand, and the story series should wear it. Clay and blue follow as a warm/cool pair, and the order alternates light and dark neighbours so adjacent slots also separate by lightness, which is what colour-blind readers rely on. Adding a fourth series to scatter plots or small multiples breaks the all-pairs floor (ochre sits too close to green under deutan), hence the cap of three for those forms.

Slot 1 is deliberately darker than `--primary`. Primary green (L 0.72) is under 3:1 on cream, which is fine for a button but not for a thin data mark.

## Ordinal and sequential: magnitude, one hue

Use the existing `primary-*` green scale. Never use the categorical slots for magnitude.

- **Ordinal** (discrete ordered marks: stages, tiers, weeks-of-training buckets). The pale end must still clear 2:1 against the chart surface. These sets pass the ordinal checks (monotone lightness, ΔL ≥ 0.06, light end ≥ 2:1, single hue):
  - Light, 4 steps: `primary-600` → `primary-800` → `primary-900` → `primary-950`
  - Dark, 4–5 steps: `primary-900` → `primary-800` → `primary-700` → `primary-500` → `primary-300` (drop `primary-900` for four; the pale end reads strongest on dark)
- **Sequential** (continuous heat: calendars, grids). The full `primary-100` → `primary-900` range is allowed, because "near zero" may recede into the surface. In dark mode flip the anchor: low = `primary-950`, high = `primary-300`. Always ship a scale legend.

## Diverging: polarity

- Poles: `chart-3` blue (below / negative) ↔ `chart-2` clay (above / positive). Warm against cool reads as opposite; green against clay would read as "good/bad" and imply judgement.
- Midpoint: `fill-foreground/15`, a warm gray that reads as "nothing" in both modes.
- Equal steps per arm: the full slot, then `/50` of the same slot.

## Emphasis and "Other"

- The story series: `chart-1`.
- Context series and the "Other" bucket: `fill-foreground/20` / `stroke-foreground/25`. Warm, because `foreground` is warm.

## Status

The portfolio has no status palette, and charts should not invent one. If a value is good or bad, say it with an arrow and a label. A good delta may use `text-accent-foreground`; a bad one stays `text-foreground` with `↓`/`↑`. Never use red or amber from the Tailwind defaults.

## Chrome: chart furniture

| Role                             | Class                                                                                              |
| -------------------------------- | -------------------------------------------------------------------------------------------------- |
| Chart surface (figure)           | `bg-secondary` + `border border-foreground/5` + `rounded-[28px] md:rounded-[40px] corner-squircle` |
| Gridline                         | `stroke-foreground/10`, `strokeWidth={1}`, `shapeRendering="crispEdges"`                           |
| Baseline / zero line / crosshair | `stroke-foreground/20`                                                                             |
| Axis and tick labels             | `fill-muted-foreground text-[11px]`, `tabular-nums` on numeric ticks                               |
| Direct value labels              | `fill-foreground text-[11px] font-semibold`                                                          |
| Title                            | `text-sm md:text-base font-semibold tracking-heading text-foreground`                                  |
| Subtitle, legend, caption        | `text-muted-foreground`, `text-xs` (caption `md:text-sm`)                                          |
| Dot ring (surface ring)          | `stroke-secondary`, `strokeWidth={2}`                                                              |
| Tooltip                          | `bg-card rounded-small corner-squircle shadow-hairline text-xs`                                   |
| Table view rules                 | `border-foreground/10` (header), `border-foreground/5` (rows)                                      |

## Surfaces the palette was validated on

Charts may sit on any of these without re-validating: `--background` (page), `--secondary` (the chart figure) and `--card`. If a chart ever sits on a new surface (for example `surface-dark` inside a locked-dark section), add that token to `SURFACES` in the check script and re-run it.
