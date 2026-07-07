'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to detect a mobile-width viewport (< 768px, matching Tailwind's `md`).
 * Returns false during SSR and until the first client-side measurement.
 *
 * @param maxWidth - max width in px considered "mobile" (default 767)
 * @returns boolean - true when the viewport is at or below maxWidth
 */
export function useIsMobile(maxWidth = 767): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(`(max-width: ${maxWidth}px)`);

    setIsMobile(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    } else {
      mediaQuery.addListener(handleChange);
      return () => {
        mediaQuery.removeListener(handleChange);
      };
    }
  }, [maxWidth]);

  return isMobile;
}
