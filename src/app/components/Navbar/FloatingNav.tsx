'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { links, footerLinks } from '../../data';
import { useProjectHover } from '../../contexts/ProjectHoverContext';

const FloatingNav = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const pathname = usePathname();
  const { isProjectHovered } = useProjectHover();

  const isProjectsRoute = pathname?.startsWith('/projects');
  const shouldShowArrows = !isProjectsRoute;
  const shouldUseScrollOpacity = true;

  const { scrollYProgress } = useScroll();
  const scrollBasedOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1], // At very top (0-5%) and very bottom (95-100%)
    shouldUseScrollOpacity ? [0.3, 0.9, 0.9, 0.3] : [0.9, 0.9, 0.9, 0.9] // Static opacity on projects page
  );

  const navOpacity = useTransform(scrollBasedOpacity, opacity =>
    isExpanded ? 0.9 : opacity
  );

  const navBackgroundColor = useTransform(
    navOpacity,
    opacity => `rgba(23, 23, 23, ${opacity})`
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

  const handleLogoClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navbar expansion from parent click

    if (shouldShowArrows && typeof window !== 'undefined') {
      if (isAtTop) {
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth',
        });
      } else if (isAtBottom) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      } else {
        setIsExpanded(!isExpanded);
      }
    } else {
      setIsExpanded(!isExpanded);
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
      borderRadius: '26px',
      x: '-50%',
      transition: {
        type: 'spring',
        damping: 30,
        stiffness: 250,
      },
    },
    hovering: {
      height: '56px',
      width: '160px',
      borderRadius: '28px',
      x: '-50%',
      transition: {
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
      transition: {
        type: 'spring',
        damping: 30,
        stiffness: 250,
      },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    }),
  };

  const contactItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: links.length * 0.05 + 0.2 + i * 0.05, // Add delay after last nav item + buffer
        duration: 0.3,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    }),
  };

  const initialAppearance = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
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
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.1,
      },
    },
  };

  return (
    <motion.div>
      {/* Backdrop overlay */}
      <motion.div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: isExpanded ? 'auto' : 'none' }}
        onClick={() => setIsExpanded(false)}
      />

      <motion.div
        ref={navRef}
        className="fixed bottom-6 left-1/2 z-50"
        variants={initialAppearance}
        initial="hidden"
        animate={isProjectHovered ? 'hidden' : 'visible'}
      >
        <motion.div
          className={`bg-gray-900 border-1 border-brand-grey-brighter border-opacity-10 backdrop-blur-md flex flex-col overflow-hidden shadow-lg ${
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
            backgroundColor: isProjectsRoute ? '' : navBackgroundColor,
          }}
        >
          <div
            className="w-full h-[52px] px-4 flex items-center justify-between cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <motion.span
              className={`text-brand-vanilla font-medium text-2xl cursor-pointer`}
              animate={{ opacity: isExpanded ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              onClick={handleLogoClick}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                key={
                  shouldShowArrows
                    ? isAtTop
                      ? 'down'
                      : isAtBottom
                        ? 'up'
                        : 'menu'
                    : 'menu-static'
                }
              >
                {shouldShowArrows ? (
                  isAtTop ? (
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
                      className={`text-brand-whiteish hover:text-secondary-green transform rotate-180`}
                    >
                      <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                  ) : isAtBottom ? (
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
                      className={`text-brand-whiteish hover:text-secondary-green`}
                    >
                      <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                  ) : (
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`w-6 h-6 text-brand-whiteish hover:text-secondary-green`}
                      initial={false}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </motion.svg>
                  )
                ) : (
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-6 h-6 text-brand-whiteish hover:text-secondary-green`}
                    initial={false}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </motion.svg>
                )}
              </motion.div>
            </motion.span>
            <motion.div className="flex items-center gap-1">
              <motion.span
                className={`text-brand-whiteish hover:text-secondary-green text-base font-medium translate-y-[1px]`}
                animate={{ opacity: isExpanded ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              >
                Find
              </motion.span>
              <motion.div className="translate-y-[1px] relative w-6 h-6">
                {/* X Icon */}
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`text-brand-whiteish hover:text-secondary-green absolute size-6 mt-1 mr-4`}
                  animate={{
                    opacity: isExpanded ? 1 : 0,
                    scale: isExpanded ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </motion.svg>
              </motion.div>
            </motion.div>
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
              <h3 className="text-brand-grey-brighter text-sm mb-4">
                Navigation
              </h3>
              {links.map((link, i) => (
                <motion.a
                  key={`main_${i}`}
                  href={link.href}
                  className={`block mb-4 text-brand-whiteish text-lg hover:text-secondary-green transition-colors duration-200`}
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
              className="border-brand-grey-brighter border-opacity-30 my-5"
              initial={{ width: 0 }}
              animate={isExpanded ? { width: '100%' } : { width: 0 }}
              transition={{
                duration: 0.4,
                ease: 'easeInOut',
                delay: links.length * 0.08 + 0.1,
              }}
            />

            {/* Footer links */}
            <div>
              <h3 className="text-brand-grey-brighter text-sm mb-4">Contact</h3>
              {footerLinks.map((link, i) => (
                <motion.a
                  key={`footer_${i}`}
                  href={link.href}
                  className={`block mb-3 text-brand-whiteish text-base hover:text-secondary-green transition-colors duration-200`}
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
