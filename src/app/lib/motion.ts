/**
 * Motion design system constants — the only source of durations and curves.
 * Tiers mirror DESIGN.md → Motion & Animation; CSS transitions use the same
 * curves through the `--ease-*` tokens in globals.css.
 *
 * Timing:
 * - FAST (150ms): hover, press, icon swaps
 * - MEDIUM (300ms): component mount/unmount, reveals
 * - SLOW (500ms): page and hero entrances
 *
 * Easing:
 * - ENTER: Apple-style ease-out — quick start, long soft landing
 * - EXIT: ease-in — things leave faster than they arrive
 * - STANDARD: symmetric ease-in-out for continuous transitions
 */

export const DURATION = {
  FAST: 0.15,
  MEDIUM: 0.3,
  SLOW: 0.5,
} as const;

export const EASING = {
  ENTER: [0.28, 0.11, 0.32, 1] as const,
  EXIT: [0.4, 0, 1, 1] as const,
  STANDARD: [0.42, 0, 0.58, 1] as const,
} as const;

/**
 * Spring for interactive, gesture-driven motion (nav expand, hover growth).
 * DESIGN.md prefers springs over curves for interactive elements.
 */
export const SPRING = {
  INTERACTIVE: { type: 'spring', damping: 30, stiffness: 250 } as const,
} as const;

/**
 * Size changes that happen together (one card closing while another opens)
 * must share one duration and curve, so their combined height moves in a
 * single steady glide instead of wobbling. Use this for every animated
 * width/height.
 */
export const RESIZE = {
  duration: 0.4,
  ease: EASING.STANDARD,
} as const;

/**
 * Crossfade between two layers inside a resizing container. The outgoing
 * layer is gone before the incoming one starts (no ghosting), and the
 * incoming one waits for the resize's midpoint so it isn't seen clipped.
 */
export const CROSSFADE = {
  OUT: { duration: DURATION.FAST, ease: EASING.EXIT },
  IN: {
    duration: DURATION.MEDIUM,
    ease: EASING.ENTER,
    delay: RESIZE.duration / 2,
  },
} as const;

/**
 * Stagger delay between list items
 * Should be 40-80ms for natural rhythm
 */
export const STAGGER = {
  DELAY: 0.06, // 60ms between items
} as const;

/**
 * Button press scale for tactile feedback
 * 2-4% scale down (96-98% of original)
 */
export const BUTTON_PRESS_SCALE = 0.96;
