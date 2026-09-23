'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * App-wide reduced-motion net: with `reducedMotion="user"` Framer Motion skips
 * transform and layout animations for users who ask for less motion, while
 * opacity and colour fades still run. Scroll-bound `style` values are not
 * covered — gate those with useReducedMotion().
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
