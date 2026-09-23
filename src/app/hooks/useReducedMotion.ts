'use client';

import { useMediaQuery } from './useMediaQuery';

/**
 * True when the user prefers reduced motion.
 * Framer Motion transforms are also neutralised globally by <MotionProvider>;
 * use this hook for everything MotionConfig can't reach — scroll-linked
 * `style` values, WebGL loops, autoplaying media, timers.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
