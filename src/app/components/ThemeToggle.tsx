'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';
import { useIsMobile } from '@/app/hooks/useIsMobile';
import { useNearPageBottom } from '@/app/hooks/useNearPageBottom';
import { useHaptics } from '@/app/hooks/useHaptics';
import { DURATION, EASING, BUTTON_PRESS_SCALE } from '@/app/lib/motion';

export default function ThemeToggle() {
  const { resolvedTheme, mounted, setTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const nearBottom = useNearPageBottom();
  const hidden = isMobile && nearBottom;
  const { triggerHaptic } = useHaptics();

  const toggleTheme = () => {
    triggerHaptic();
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
        exit: { opacity: 0, rotate: 45, scale: 0.8 },
      };

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={
        prefersReducedMotion ? undefined : { scale: BUTTON_PRESS_SCALE }
      }
      animate={{
        opacity: hidden ? 0 : 1,
        y: hidden && !prefersReducedMotion ? 12 : 0,
      }}
      style={{ pointerEvents: hidden ? 'none' : 'auto' }}
      transition={{ duration: DURATION.FAST, ease: EASING.STANDARD }}
      className={cn(
        'fixed bottom-4 right-4 z-50',
        'flex items-center justify-center',
        'h-11 w-11 md:h-9 md:w-9 rounded-[8px] corner-squircle',
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
