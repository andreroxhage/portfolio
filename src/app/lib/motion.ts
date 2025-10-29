/**
 * Motion design system constants
 * Based on Emil Kowalski's principles for great animations
 *
 * Timing Guidelines:
 * - FAST (100ms): Button press, hover feedback
 * - MEDIUM (200ms): Modal, dropdown, component transitions
 * - SLOW (400ms): Page transitions, large movements
 *
 * Easing Guidelines:
 * - ENTER: ease-out for entrances (fast → slow, natural stop)
 * - EXIT: ease-in for exits (slow → fast, disappearing feel)
 * - STANDARD: ease-in-out for continuous transitions
 */

export const DURATION = {
  FAST: 0.1, // 100ms - button press, hover
  MEDIUM: 0.2, // 200ms - modal, dropdown
  SLOW: 0.4, // 400ms - page transition
} as const;

export const EASING = {
  /**
   * Ease-out for entrances: starts fast, slows smoothly
   * Cubic-bezier equivalent to ease-out but tuned
   */
  ENTER: [0.4, 0, 0.2, 1] as const,

  /**
   * Ease-in for exits: starts slow, ends fast
   */
  EXIT: [0.4, 0, 1, 1] as const,

  /**
   * Ease-in-out for continuous/looping transitions
   */
  STANDARD: [0.4, 0, 0.2, 1] as const,
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
