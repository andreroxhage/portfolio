# Rules: marks, labels, interaction, anti-patterns

The quiet look is a few fixed specs plus negative space. Only the data gets to be loud.

## Mark specs

| Mark                             | Spec                                                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Bar / column                     | ≤ 24px thick, and never fills the slot. 4px rounded data end, square at the baseline, grows from one baseline |
| Adjacent bars / stacked segments | 2px gap in the surface color between them. Never a stroke around a mark                                       |
| Line                             | 2px, `strokeLinejoin="round"`, `strokeLinecap="round"`                                                        |
| Dot / end marker                 | r = 4 (8px), filled with the series slot, 2px `stroke-secondary` ring so it stays legible over lines          |
| Area                             | Single series only: the slot hue as a vertical wash from 10% to 0%                                            |
| Grid                             | 1px solid `stroke-foreground/10`. Zero line `stroke-foreground/20`. Never dashed; dashes read as a threshold  |

## Labels and legend

- **Legend**: for two or more series, above the plot. Use a rect swatch for bars and a short line for lines, with the label in `text-muted-foreground`. A single series gets no legend box; the title names it.
- **Direct labels**: only on what the story is about, such as the line ends, the peak, or the week being discussed. A number on every point is noise.
- **Positions**: a bar's value sits above its end, a line's value sits past its last point, and y-ticks are round numbers (0 / 20 / 40).
- **Collisions**: never nudge end labels apart; it detaches them from their lines. If three or more lines converge at the end, drop the end labels and rely on the legend and tooltip, or split into small multiples.
- **Fit**: a label inside a bar only if it fits with padding. Otherwise move it outside the end, or leave it to the tooltip and table. Never clip with `overflow: hidden`.
- **Ink**: text is always `foreground` or `muted-foreground`. The coloured swatch or line beside it carries identity.
- **X labels**: thin them so they never touch (the kit keeps one per ~64px, counted back from the latest point so the last date always shows).

## Interaction

- **Bars**: the whole band is the hit target, not just the painted pixels. Each band is focusable (`tabIndex={0}`) with an `aria-label` giving the category and every value. Hover and focus show the same tooltip, and the hovered bars lift to 80% opacity.
- **Lines**: a crosshair (`stroke-foreground/20`) snaps to the nearest x. The tooltip lists every series at that x, and the dots jump to the crosshair.
- **Tooltip content**: the value comes first in `font-semibold text-foreground`, then the series name in `text-muted-foreground`. Rows are keyed with a short line in the slot color, not a box. The category or date sits on top in muted text.
- **Placement**: offset 12px from the pointer, flipping left near the right edge so it never overflows the figure.
- **Table view**: every chart has the `<details>` `Show data` table, with `tabular-nums` and values in `text-foreground`. This is the accessible version of the chart and the fallback for anything a tooltip shows.
- **Touch**: SVGs use `touch-pan-y` so a chart never traps vertical scrolling on mobile.

## Figures

- **Stat tile**: label (sentence case, no colon), value (`text-3xl md:text-4xl font-semibold tracking-display`, proportional figures), and an optional delta against a named period ("↑ 12% vs last week"). A good delta uses `text-accent-foreground`. Whether "up" is good depends on the metric (resting heart rate going up is not good).
- **Hero number**: at most one per page, same sans as everything else, never a display face.
- `tabular-nums` only where digits must line up (ticks, table cells), never on a big standalone number.

## Layout on the page

- Charts live in `WideSection` or `MiddleSection` from `ProjectLayout`, inside the `ChartFrame` figure. Keep `max-w-2xl` for a single chart; small multiples can go wider in a grid.
- The figure's height includes the x-axis band. Never set a fixed height that clips axis labels and forces an inner scroll.
- On mobile the chart must still work at ~340px of plot width. With five or more bars per group, check the bars haven't gone thinner than about 6px; if they have, switch to horizontal bars or fewer categories.

## Anti-patterns: if the chart matches one, fix it

| Wrong                                                      | Right                                                        |
| ---------------------------------------------------------- | ------------------------------------------------------------ |
| Two y-axes on one plot                                     | Two charts, or index both to 100 at the start                |
| A one-bar chart or a two-slice pie                         | A stat tile                                                  |
| A pie or donut for close values                            | Bars, or just the numbers                                    |
| Colouring bars darker-where-bigger on unordered categories | One slot for every bar; length already shows size            |
| A rainbow or multi-hue ramp for magnitude                  | One hue: the `primary-*` green ramp                          |
| Colours cycling or generated past slot 5                   | Fold into "Other", or small multiples                        |
| Colours reassigned when a filter hides a series            | Colour follows the entity                                    |
| Series colours used as text                                | Text tokens, with a swatch beside                            |
| Heavy or dashed grid, thick saturated blocks               | 1px solid recessive grid, thin marks                         |
| Strokes drawn around bars to separate them                 | 2px surface gaps                                             |
| A value on every point                                     | Selective labels + tooltip + table                           |
| A tooltip as the only way to read a value                  | The table view always exists                                 |
| Pinpoint hover targets                                     | Whole band / crosshair snapping                              |
| Hardcoded hex, `rgb()`, `blue-500`, cool grays             | `chart-*` and semantic tokens only                           |
| Entry animation that ignores reduced motion                | Static by default; gate any motion with `useReducedMotion()` |
| Eyeballing whether new colours are colour-blind safe       | Run `scripts/check-chart-palette.mjs`                        |
