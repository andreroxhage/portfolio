'use client';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  mounted: boolean;

  setTheme: (newTheme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') {
    return 'light';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function applyTheme(resolved: ResolvedTheme, enableTransition: boolean) {
  const root = document.documentElement;

  if (
    enableTransition &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    root.classList.add('theme-transition');
    setTimeout(() => root.classList.remove('theme-transition'), 300);
  }

  if (resolved === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [themeState, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');
  const [mounted, setMounted] = useState(false);

  // Sync with what the pre-paint script in layout.tsx already applied: a
  // stored choice wins, otherwise follow the OS. Must match that script
  // exactly, or the page flashes between themes on load.
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem('theme');
    } catch {
      /* storage blocked — follow the OS */
    }
    const initial: Theme =
      stored === 'light' || stored === 'dark' ? stored : 'system';
    const resolved = initial === 'system' ? getSystemTheme() : initial;

    setThemeState(initial);
    setResolvedTheme(resolved);
    applyTheme(resolved, false);
    setMounted(true);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      if (themeState === 'system') {
        const resolved = getSystemTheme();
        setResolvedTheme(resolved);
        applyTheme(resolved, true);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeState]);

  const setTheme = useCallback((newTheme: Theme) => {
    const resolved = newTheme === 'system' ? getSystemTheme() : newTheme;

    setThemeState(newTheme);
    setResolvedTheme(resolved);
    applyTheme(resolved, true);

    try {
      if (newTheme === 'system') {
        localStorage.removeItem('theme');
      } else {
        localStorage.setItem('theme', newTheme);
      }
    } catch {
      /* storage blocked — the choice lasts for this page view only */
    }
  }, []);

  const value = useMemo(
    () => ({ theme: themeState, resolvedTheme, mounted, setTheme }),
    [themeState, resolvedTheme, mounted, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
