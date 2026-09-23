'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import {
  IconArrowDown,
  IconArrowUp,
  IconMenu2,
  IconMoon,
  IconSun,
  IconX,
} from '@tabler/icons-react';
import { links, footerLinks } from '@/app/data/nav';
import { useProjectHover } from '../../contexts/ProjectHoverContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import { DURATION, EASING, SPRING, BUTTON_PRESS_SCALE } from '@/app/lib/motion';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';
import { useIsMobile } from '@/app/hooks/useIsMobile';
import { useHaptics } from '@/app/hooks/useHaptics';

const MotionLink = motion.create(Link);

// Distance (px) from either end of the page that counts as "at the edge"
const EDGE_THRESHOLD = 100;
// Expanded radius — matches --radius-panel; Framer needs a number to tween
const EXPANDED_RADIUS = '40px';

type ScrollEdge = 'top' | 'middle' | 'bottom';

function getScrollEdge(scrollY: number): ScrollEdge {
  if (scrollY < EDGE_THRESHOLD) {
    return 'top';
  }
  const { scrollHeight } = document.documentElement;
  return scrollY + window.innerHeight >= scrollHeight - EDGE_THRESHOLD
    ? 'bottom'
    : 'middle';
}

const FloatingNav = () => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const { triggerHaptic } = useHaptics();
  const [isExpanded, setIsExpanded] = useState(false);
  // Derived scroll state lives in motion values; React state only changes
  // when the nav's behaviour changes (DESIGN.md → State Management).
  const [edge, setEdge] = useState<ScrollEdge>('top');
  const [isShortPage, setIsShortPage] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const { isProjectHovered } = useProjectHover();
  const { resolvedTheme, mounted, setTheme } = useTheme();

  const toggleTheme = () => {
    triggerHaptic();
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', latest => {
    setEdge(getScrollEdge(latest));
  });

  // Page length only changes when content or viewport resizes
  useEffect(() => {
    const measure = () => {
      setIsShortPage(
        document.documentElement.scrollHeight < 2 * window.innerHeight
      );
      setEdge(getScrollEdge(window.scrollY));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHaptic();
    if (typeof window !== 'undefined') {
      if (isShortPage) {
        setIsExpanded(!isExpanded);
      } else if (isAtTop) {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      } else if (isAtBottom) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setIsExpanded(!isExpanded);
      }
    }
  };

  const isAtTop = edge === 'top';
  const isAtBottom = edge === 'bottom';

  const scrollButtonLabel =
    isShortPage || (!isAtTop && !isAtBottom)
      ? 'Open menu'
      : isAtTop
        ? 'Scroll down'
        : 'Scroll to top';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsExpanded(false);
        toggleButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isExpanded]);

  const navVariants = {
    collapsed: {
      height: isMobile ? '48px' : '52px',
      width: isMobile ? '48px' : '150px',
      x: '-50%',
      transition: prefersReducedMotion
        ? { duration: 0.01 }
        : SPRING.INTERACTIVE,
    },
    hovering: {
      height: isMobile ? '52px' : '56px',
      width: isMobile ? '52px' : '160px',
      x: '-50%',
      transition: prefersReducedMotion
        ? { duration: 0.01 }
        : SPRING.INTERACTIVE,
    },
    expanded: {
      height: 'auto',
      width: '320px',
      borderRadius: EXPANDED_RADIUS,
      x: '-50%',
      transition: prefersReducedMotion
        ? { duration: 0.01 }
        : SPRING.INTERACTIVE,
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0.01 }
        : {
            delay: i * 0.05,
            duration: DURATION.MEDIUM,
            ease: EASING.ENTER,
          },
    }),
    exit: {
      opacity: 0,
      y: -8,
      transition: prefersReducedMotion
        ? { duration: 0.01 }
        : { duration: DURATION.FAST, ease: EASING.EXIT },
    },
  };

  const contactItemVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0.01 }
        : {
            delay: links.length * 0.05 + 0.2 + i * 0.05,
            duration: DURATION.MEDIUM,
            ease: EASING.ENTER,
          },
    }),
    exit: {
      opacity: 0,
      y: -8,
      transition: prefersReducedMotion
        ? { duration: 0.01 }
        : { duration: DURATION.FAST, ease: EASING.EXIT },
    },
  };

  const initialAppearance = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0.01 }
        : {
            type: 'spring',
            damping: 20,
            stiffness: 300,
            delay: 0.2,
          },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: DURATION.FAST,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        duration: DURATION.MEDIUM,
        delay: 0.1,
        ease: EASING.ENTER,
      },
    },
  };

  return (
    <motion.div className="surface-lock-dark">
      {/* Backdrop overlay */}
      <motion.div
        className="fixed inset-0 z-40 bg-surface-dark/30 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: DURATION.MEDIUM, ease: EASING.ENTER }}
        style={{ pointerEvents: isExpanded ? 'auto' : 'none' }}
        onClick={() => setIsExpanded(false)}
      />

      <motion.nav
        ref={navRef}
        aria-label="Site navigation"
        className="fixed bottom-4 left-1/2 z-50"
        variants={initialAppearance}
        initial="hidden"
        animate={
          isProjectHovered || (isMobile && isAtBottom && !isShortPage)
            ? 'hidden'
            : 'visible'
        }
      >
        <motion.div
          className={`material-chrome inset-shadow-border-glow relative flex flex-col overflow-hidden corner-squircle rounded-pill ${
            isExpanded ? 'items-start' : 'items-center justify-center'
          }`}
          variants={navVariants}
          initial="collapsed"
          animate={isExpanded ? 'expanded' : 'collapsed'}
          whileHover={isExpanded ? undefined : 'hovering'}
          style={{
            transformOrigin: 'center center',
            left: 0,
          }}
        >
          {/* Full-surface expand target: makes the whole collapsed pill
              clickable, not just the label and icons. Sits behind the header
              controls, which opt back into pointer events individually. */}
          {!isExpanded && (
            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              className="absolute inset-0 z-0 bg-transparent cursor-pointer"
              onClick={() => {
                triggerHaptic();
                setIsExpanded(true);
              }}
            />
          )}

          <div
            className={`relative z-10 w-full flex items-center ${
              isExpanded
                ? 'h-14 px-4 justify-end md:justify-between'
                : 'h-12 md:h-[52px] px-3 md:px-4 justify-center md:justify-between pointer-events-none'
            }`}
          >
            <AnimatePresence initial={false}>
              {isExpanded && mounted && (
                <motion.button
                  key="theme-toggle"
                  type="button"
                  className="md:hidden absolute left-4 inset-y-0 bg-transparent flex items-center justify-center cursor-pointer min-w-11 text-surface-dark-foreground hover:text-accent"
                  initial={
                    prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }
                  }
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: prefersReducedMotion
                      ? { duration: 0.01 }
                      : {
                          delay: 0.15,
                          duration: DURATION.MEDIUM,
                          ease: EASING.ENTER,
                        },
                  }}
                  exit={{
                    opacity: 0,
                    scale: prefersReducedMotion ? 1 : 0.8,
                    transition: { duration: DURATION.FAST, ease: EASING.EXIT },
                  }}
                  whileTap={
                    prefersReducedMotion
                      ? undefined
                      : { scale: BUTTON_PRESS_SCALE }
                  }
                  onClick={toggleTheme}
                  aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={resolvedTheme === 'dark' ? 'sun' : 'moon'}
                      initial={
                        prefersReducedMotion
                          ? {}
                          : { opacity: 0, rotate: -90, scale: 0.5 }
                      }
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={
                        prefersReducedMotion
                          ? {}
                          : { opacity: 0, rotate: 45, scale: 0.8 }
                      }
                      transition={{
                        duration: DURATION.FAST,
                        ease: EASING.STANDARD,
                      }}
                    >
                      {resolvedTheme === 'dark' ? (
                        <IconSun size={18} stroke={1.5} />
                      ) : (
                        <IconMoon size={18} stroke={1.5} />
                      )}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
              )}
            </AnimatePresence>
            <motion.button
              type="button"
              className={`hidden md:block bg-transparent text-surface-dark-foreground font-medium text-xl md:text-2xl cursor-pointer`}
              animate={{ opacity: isExpanded ? 0 : 1 }}
              transition={{ duration: DURATION.FAST, ease: EASING.EXIT }}
              style={{ pointerEvents: isExpanded ? 'none' : 'auto' }}
              onClick={handleLogoClick}
              aria-label={scrollButtonLabel}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: DURATION.SLOW, ease: EASING.ENTER }}
                key={
                  isShortPage
                    ? 'menu'
                    : isAtTop
                      ? 'down'
                      : isAtBottom
                        ? 'up'
                        : 'menu'
                }
              >
                {isShortPage || (!isAtTop && !isAtBottom) ? (
                  <IconMenu2
                    size={24}
                    stroke={1.5}
                    className="text-surface-dark-foreground hover:text-accent"
                  />
                ) : isAtTop ? (
                  <IconArrowDown
                    size={24}
                    stroke={1.5}
                    className="text-surface-dark-foreground hover:text-accent"
                  />
                ) : (
                  <IconArrowUp
                    size={24}
                    stroke={1.5}
                    className="text-surface-dark-foreground hover:text-accent"
                  />
                )}
              </motion.div>
            </motion.button>
            <button
              ref={toggleButtonRef}
              type="button"
              className="bg-transparent flex items-center justify-center gap-1 cursor-pointer min-h-11 min-w-11 md:min-h-0 md:min-w-0 pointer-events-auto"
              onClick={event => {
                event.stopPropagation();
                triggerHaptic();
                setIsExpanded(!isExpanded);
              }}
              aria-expanded={isExpanded}
              aria-label={
                isExpanded ? 'Close navigation menu' : 'Open navigation menu'
              }
            >
              <AnimatePresence mode="wait" initial={false}>
                {!isExpanded ? (
                  <motion.span
                    key="find-label"
                    className="flex items-center text-surface-dark-foreground hover:text-accent"
                    initial={
                      prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }
                    }
                    animate={{ opacity: 1, scale: 1 }}
                    exit={
                      prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }
                    }
                    transition={{ duration: DURATION.FAST, ease: EASING.EXIT }}
                  >
                    <span className="hidden md:inline text-base font-medium translate-y-px pr-6">
                      Find
                    </span>
                    <IconMenu2 size={24} stroke={1.5} className="md:hidden" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="close-icon"
                    className="flex text-surface-dark-foreground hover:text-accent"
                    initial={
                      prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }
                    }
                    animate={{ opacity: 1, scale: 1 }}
                    exit={
                      prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }
                    }
                    transition={{ duration: DURATION.FAST, ease: EASING.EXIT }}
                  >
                    <IconX size={20} stroke={1.5} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          <motion.div
            className={`w-full overflow-hidden ${isExpanded ? 'px-8 pb-8 pt-2' : 'p-0'}`}
            variants={contentVariants}
            initial="hidden"
            animate={isExpanded ? 'visible' : 'hidden'}
            style={{
              height: isExpanded ? 'auto' : 0,
              display: 'block',
              pointerEvents: isExpanded ? 'auto' : 'none',
            }}
          >
            {/* Main navigation links */}
            <div className="mb-6">
              <h3 className="text-surface-dark-muted text-sm mb-4">
                Navigation
              </h3>
              {links.map((link, i) => {
                const isInternal = link.href.startsWith('/');
                const LinkComponent = isInternal ? MotionLink : motion.a;
                return (
                  <LinkComponent
                    key={`main_${i}`}
                    href={link.href}
                    className={`block mb-4 text-surface-dark-foreground text-lg hover:text-accent transition-colors duration-200`}
                    variants={navItemVariants}
                    custom={i}
                    initial="hidden"
                    animate={isExpanded ? 'visible' : 'hidden'}
                    whileHover={{ x: 5 }}
                    onClick={() => {
                      triggerHaptic();
                      setIsExpanded(false);
                    }}
                  >
                    {link.title}
                  </LinkComponent>
                );
              })}
            </div>

            {/* Divider */}
            <motion.hr
              className="border-surface-dark-foreground/15 my-5"
              initial={{ width: 0 }}
              animate={isExpanded ? { width: '100%' } : { width: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      duration: DURATION.SLOW,
                      ease: EASING.STANDARD,
                      delay: links.length * 0.08 + 0.1,
                    }
              }
            />

            {/* Footer links */}
            <div>
              <h3 className="text-surface-dark-muted text-sm mb-4">Contact</h3>
              {footerLinks.map((link, i) => (
                <motion.a
                  key={`footer_${i}`}
                  href={link.href}
                  className={`block mb-3 text-surface-dark-foreground text-base hover:text-accent transition-colors duration-200`}
                  variants={contactItemVariants}
                  custom={i}
                  initial="hidden"
                  animate={isExpanded ? 'visible' : 'hidden'}
                  whileHover={{ x: 5 }}
                  onClick={() => {
                    triggerHaptic();
                    setIsExpanded(false);
                  }}
                >
                  {link.title}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.nav>
    </motion.div>
  );
};

export default FloatingNav;
