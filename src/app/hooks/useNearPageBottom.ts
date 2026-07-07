'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to detect when the page is scrolled within `threshold`px of the bottom.
 * Only returns true when the page is actually scrollable (taller than the
 * viewport by more than the threshold), so short/non-scrollable pages never
 * report "near bottom".
 *
 * @param threshold - distance in px from the bottom that counts as "near"
 * @returns boolean - true when near the bottom of a scrollable page
 */
export function useNearPageBottom(threshold = 120): boolean {
  const [nearBottom, setNearBottom] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const check = () => {
      const { scrollHeight } = document.documentElement;
      const viewport = window.innerHeight;
      const scrollable = scrollHeight > viewport + threshold;
      const atBottom = window.scrollY + viewport >= scrollHeight - threshold;
      setNearBottom(scrollable && atBottom);
    };

    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    const observer = new MutationObserver(check);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
      observer.disconnect();
    };
  }, [threshold]);

  return nearBottom;
}
