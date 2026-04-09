'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion';
import { links, footerLinks } from '@/app/data/nav';
import { useProjectHover } from '../../contexts/ProjectHoverContext';
import { DURATION, EASING } from '@/app/lib/motion';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';

const FloatingNav = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isShortPage, setIsShortPage] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const { isProjectHovered } = useProjectHover();

  const { scrollYProgress } = useScroll();
  const scrollBasedOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1], // At very top (0-5%) and very bottom (95-100%)
    [0.3, 0.9, 0.9, 0.3]
  );

  const navOpacity = useTransform(scrollBasedOpacity, opacity =>
    isExpanded ? 0.9 : opacity
  );

  const navBackgroundColor = useTransform(
    navOpacity,
    opacity => `oklch(0.165 0 0 / ${opacity})`
  );

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setScrollPosition(window.scrollY);
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    const checkPageHeight = () => {
      if (typeof window !== 'undefined') {
        setIsShortPage(
          document.documentElement.scrollHeight < 2 * window.innerHeight
        );
      }
    };
    checkPageHeight();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkPageHeight);
      const observer = new MutationObserver(checkPageHeight);
      observer.observe(document.body, { childList: true, subtree: true });
      return () => {
        window.removeEventListener('resize', checkPageHeight);
        observer.disconnect();
      };
    }
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const isAtTop = scrollPosition < 100;
  const isAtBottom =
    typeof window !== 'undefined' &&
    scrollPosition + window.innerHeight >=
      document.documentElement.scrollHeight - 100;

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
    if (isExpanded && contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isExpanded]);

  const navVariants = {
    collapsed: {
      height: '52px',
      width: '150px',
      x: '-50%',
      transition: prefersReducedMotion
        ? { duration: 0.01 }
        : {
            type: 'spring',
            damping: 30,
            stiffness: 250,
          },
    },
    hovering: {
      height: '56px',
      width: '160px',
      x: '-50%',
      transition: prefersReducedMotion
        ? { duration: 0.01 }
        : {
            type: 'spring',
            damping: 30,
            stiffness: 250,
          },
    },
    expanded: {
      height: contentHeight ? `${contentHeight + 64}px` : 'auto', // 64px is header height
      width: '320px',
      borderRadius: '40px',
      x: '-50%',
      transition: prefersReducedMotion
        ? { duration: 0.01 }
        : {
            type: 'spring',
            damping: 30,
            stiffness: 250,
          },
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

      <motion.div
        ref={navRef}
        className="fixed bottom-4 left-1/2 z-50"
        variants={initialAppearance}
        initial="hidden"
        animate={isProjectHovered ? 'hidden' : 'visible'}
      >
        <motion.div
          className={`bg-surface-dark inset-shadow-border-glow backdrop-blur-md flex flex-col overflow-hidden shadow-lg corner-squircle rounded-[140px] ${
            isExpanded ? 'items-start' : 'items-center justify-center'
          }`}
          variants={navVariants}
          initial="collapsed"
          animate={
            isExpanded ? 'expanded' : isHovering ? 'hovering' : 'collapsed'
          }
          onMouseEnter={() => !isExpanded && setIsHovering(true)}
          onMouseLeave={() => !isExpanded && setIsHovering(false)}
          style={{
            transformOrigin: 'center center',
            left: 0,
            backgroundColor: navBackgroundColor,
          }}
        >
          <div
            className="w-full h-[52px] px-4 flex items-center justify-between cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <motion.span
              className={`text-surface-dark-foreground font-medium text-2xl cursor-pointer`}
              animate={{ opacity: isExpanded ? 0 : 1 }}
              transition={{ duration: DURATION.FAST, ease: EASING.EXIT }}
              onClick={handleLogoClick}
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
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-surface-dark-foreground hover:text-accent"
                    initial={false}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </motion.svg>
                ) : isAtTop ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-surface-dark-foreground hover:text-accent transform rotate-180"
                  >
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-surface-dark-foreground hover:text-accent"
                  >
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                )}
              </motion.div>
            </motion.span>
            <div className="flex items-center gap-1">
              <AnimatePresence mode="wait" initial={false}>
                {!isExpanded ? (
                  <motion.span
                    key="find-label"
                    className="text-surface-dark-foreground hover:text-accent text-base font-medium translate-y-px pr-6"
                    initial={
                      prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }
                    }
                    animate={{ opacity: 1, scale: 1 }}
                    exit={
                      prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }
                    }
                    transition={{ duration: DURATION.FAST, ease: EASING.EXIT }}
                  >
                    Find
                  </motion.span>
                ) : (
                  <motion.svg
                    key="close-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="text-surface-dark-foreground hover:text-accent size-6 translate-y-px"
                    initial={
                      prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }
                    }
                    animate={{ opacity: 1, scale: 1 }}
                    exit={
                      prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }
                    }
                    transition={{ duration: DURATION.FAST, ease: EASING.EXIT }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </motion.svg>
                )}
              </AnimatePresence>
            </div>
          </div>

          <motion.div
            ref={contentRef}
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
              <h3 className="text-muted-foreground text-sm mb-4">Navigation</h3>
              {links.map((link, i) => (
                <motion.a
                  key={`main_${i}`}
                  href={link.href}
                  className={`block mb-4 text-surface-dark-foreground text-lg hover:text-accent transition-colors duration-200`}
                  variants={navItemVariants}
                  custom={i}
                  initial="hidden"
                  animate={isExpanded ? 'visible' : 'hidden'}
                  whileHover={{ x: 5 }}
                  onClick={() => setIsExpanded(false)}
                >
                  {link.title}
                </motion.a>
              ))}
            </div>

            {/* Divider */}
            <motion.hr
              className="border-border border-opacity-30 my-5"
              initial={{ width: 0 }}
              animate={isExpanded ? { width: '100%' } : { width: 0 }}
              transition={{
                duration: DURATION.SLOW,
                ease: EASING.STANDARD,
                delay: links.length * 0.08 + 0.1,
              }}
            />

            {/* Footer links */}
            <div>
              <h3 className="text-muted-foreground text-sm mb-4">Contact</h3>
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
                  onClick={() => setIsExpanded(false)}
                >
                  {link.title}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FloatingNav;
