'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';
import { DURATION, EASING, BUTTON_PRESS_SCALE } from '@/app/lib/motion';

export default function ThemeToggle() {
  const { resolvedTheme, mounted, setTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return null;
  }

  const iconVariants = prefersReducedMotion
    ? { initial: {}, animate: {}, exit: {} }
    : {
        initial: { opacity: 0, rotate: -90, scale: 0.5 },
        animate: { opacity: 1, rotate: 0, scale: 1 },
        exit: { opacity: 0, rotate: 90, scale: 0.5 },
      };

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={prefersReducedMotion ? undefined : { scale: BUTTON_PRESS_SCALE }}
      transition={{ duration: DURATION.FAST, ease: EASING.STANDARD }}
      className={cn(
        'fixed bottom-4 right-4 z-50',
        'flex items-center justify-center',
        'h-9 w-9 rounded-[10px] corner-squircle',
        'bg-surface-dark inset-shadow-border-glow',
        'text-surface-dark-foreground',
        'cursor-pointer'
      )}
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {resolvedTheme === 'dark' ? (
          <motion.span
            key="sun"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: DURATION.FAST, ease: EASING.STANDARD }}
          >
            <IconSun size={16} stroke={1.5} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: DURATION.FAST, ease: EASING.STANDARD }}
          >
            <IconMoon size={16} stroke={1.5} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
