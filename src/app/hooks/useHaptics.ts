'use client';

import { useCallback } from 'react';

/**
 * Named haptic intensities mapped to `navigator.vibrate` patterns (ms).
 * Keep these short — haptics should feel like a tap confirmation, not a buzz.
 */
const HAPTIC_PATTERNS = {
  light: 8,
  medium: 15,
  heavy: 25,
} as const;

export type HapticIntensity = keyof typeof HAPTIC_PATTERNS;

/**
 * Returns a `triggerHaptic` function that fires a short vibration on mobile /
 * touch devices via the Web Vibration API.
 *
 * It is a no-op when:
 * - running on the server or a browser without `navigator.vibrate`
 * - the primary pointer is not coarse (i.e. not a touch device)
 * - the user prefers reduced motion
 *
 * This keeps haptics scoped to mobile taps while honouring the project's
 * reduced-motion non-negotiable.
 */
export function useHaptics() {
  const triggerHaptic = useCallback((intensity: HapticIntensity = 'light') => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return;
    }

    if (typeof navigator.vibrate !== 'function') {
      return;
    }

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (!isTouch) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) {
      return;
    }

    navigator.vibrate(HAPTIC_PATTERNS[intensity]);
  }, []);

  return { triggerHaptic };
}
