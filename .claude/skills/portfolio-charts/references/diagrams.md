# Diagrams: drawing a mechanism, not data

A diagram earns its place when it shows a cold reader something they would otherwise have to piece together from prose: where things flow, who decides, what runs on its own, what changed between before and after. If a sentence says it faster, write the sentence.

## Use the Diagram kit

`@/app/components/Diagram` already implements the house style (see the meal-planning experiment for a full example). Build flows from it rather than hand-drawing SVG:

| Primitive          | Use                                                                                               |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| `DiagramFrame`     | The figure surface, with `label` (the aria-label that states the claim) and an optional `caption` |
| `DiagramNode`      | One step: `step` number, `icon` (Tabler), `title`, one-line `detail`                              |
| `DiagramConnector` | Downward link between steps. A `label` turns it into a gate; `dashed` marks an optional path      |
| `DiagramChip`      | A compact label on the flow: an input, a gate, an endpoint                                        |
| `DiagramGroup`     | A dashed boundary around steps that share a trait ("runs on its own")                             |
| `DiagramFanOut`    | One step splitting into parallel lanes                                                            |

Tones carry the only meaning colour has here: `you` (green) is a human decision, and `agent` (warm neutral) is work that runs on its own. Don't add a third tone for decoration. If a new kind of actor really needs one, add it to `diagramTone` and document it.

## What to draw

- **Draw the mechanism, not its name.** A box labelled "agent" says less than the step it performs and the gate before its output is used.
- **Comparing options? Draw the difference**: before and after side by side, or the one step each option adds or removes.
- **Label the arrows** when they carry meaning: "I approve the recipes", "optional", "runs automatically". An unlabelled arrow just means "next".
- **Match complexity to the point.** Show as many steps as the argument needs, and no inventory of everything.

## Hand-drawn SVG, when the kit doesn't fit

For something the primitives can't express (a cycle, a two-column architecture):

- Inline `<svg>` with `viewBox` sized to the content, `className="w-full h-auto"`, wrapped in a `<figure>` with a `<figcaption>` stating the claim, and `role="img"` + `aria-label` on the svg.
- Strokes and text in `currentColor`, inheriting `text-surface-dark-muted` or `text-foreground`. The one element the argument is about may wear `chart-1` or the `you` tone.
- Arrowheads as a `<marker>` or a small `<polygon>`. Line weight 1.5px, like the kit's connectors.
- Text 11–13px at the drawn scale, a word or three per label; sentences go in the caption.
- Align to a grid with even gaps. No `<script>`, `<style>` or `<foreignObject>` inside the SVG.
- Diagrams are static, so there is nothing to gate for reduced motion. If you animate one, gate it.
