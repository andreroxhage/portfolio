'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * Returns a getter function for normalized scroll progress [0, 1].
 * Uses a ref internally to avoid React re-renders — designed to be
 * read inside a requestAnimationFrame loop (e.g. Three.js render).
 */
export function useScrollProgress(): () => number {
  const progressRef = useRef(0);

  useEffect(() => {
    function update() {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current =
        maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
    }

    window.addEventListener('scroll', update, { passive: true });
    update();

    return () => window.removeEventListener('scroll', update);
  }, []);

  return useCallback(() => progressRef.current, []);
}
