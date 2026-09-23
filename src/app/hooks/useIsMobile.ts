'use client';

import { useMediaQuery } from './useMediaQuery';

/**
 * True on a mobile-width viewport (< 768px, matching Tailwind's `md`).
 *
 * @param maxWidth - max width in px considered "mobile" (default 767)
 */
export function useIsMobile(maxWidth = 767): boolean {
  return useMediaQuery(`(max-width: ${maxWidth}px)`);
}
