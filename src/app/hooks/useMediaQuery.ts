'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Subscribes to a CSS media query. The single source for derived browser
 * state (DESIGN.md → State Management): read during render, no effect, no
 * mirrored useState. Client-only renders (dynamic `ssr: false`, post-hydration
 * mounts) see the real value on their first render; server renders and
 * hydration use `serverValue`.
 */
export function useMediaQuery(query: string, serverValue = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener('change', onChange);
      return () => mediaQuery.removeEventListener('change', onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue
  );
}
