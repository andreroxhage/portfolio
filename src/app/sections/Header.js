'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import Image from 'next/image';
import ProfilePicture from '../../../public/resource/profileImage.jpg';

import { header, about } from '@/app/data/home';
import { EASING } from '@/app/lib/motion';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';

const HEADER_IMAGE = '/resource/20220611-IMG_5691.jpg';

// --- Shared hero bar (used by both mobile and desktop) ---
const HeroBar = ({
  reducedMotion,
  heroTranslateY,
  heroScale,
  overlayOpacity,
}) => {
  const heroDuration = 0.6;
  const heroDelay = 0;

  return (
    <div className="h-2/6 md:h-2/5 relative overflow-hidden surface-lock-dark">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            y: heroTranslateY,
            scale: heroScale,
          }}
        >
          <Image
            src={HEADER_IMAGE}
            alt="Header background"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-0 bg-surface-dark"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-neutral-200/10 mix-blend-overlay" />

      <div className="relative max-w-7xl h-full px-5 sm:px-6 md:px-4 mx-auto flex items-center">
        <motion.h1
          className="text-6xl md:text-8xl font-medium tracking-tighter leading-snug text-surface-dark-foreground mix-blend-difference"
          initial={
            reducedMotion
              ? { opacity: 0.4 }
              : {
                  opacity: 0,
                  filter: 'blur(8px)',
                  color: 'oklch(var(--accent-foreground))',
                }
          }
          animate={{
            opacity: 0.8,
            filter: 'blur(0px)',
            color: 'oklch(var(--surface-dark-foreground))',
          }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : {
                  duration: heroDuration,
                  delay: heroDelay,
                  ease: EASING.ENTER,
                }
          }
        >
          André Roxhage
        </motion.h1>
      </div>
    </div>
  );
};

// --- Mobile: classic header + tab-based about ---
const MobileHeader = ({ reducedMotion }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const heroDuration = 0.6;

  return (
    <header id="header" className="md:hidden">
      {/* Hero bar — static on mobile (no parallax) */}
      <div className="h-[33vh] relative overflow-hidden surface-lock-dark">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{ transform: 'scale(1.15)' }}
          >
            <Image
              src={HEADER_IMAGE}
              alt="Header background"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-surface-dark/85" />
        <div className="absolute inset-0 bg-neutral-200/10 mix-blend-overlay" />

        <div className="relative max-w-7xl h-full px-5 sm:px-6 mx-auto flex items-center">
          <motion.h1
            className="text-6xl font-medium tracking-tighter leading-snug text-surface-dark-foreground mix-blend-difference"
            initial={
              reducedMotion
                ? { opacity: 0.4 }
                : { opacity: 0, filter: 'blur(8px)' }
            }
            animate={{ opacity: 0.8, filter: 'blur(0px)' }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: heroDuration, delay: 0, ease: EASING.ENTER }
            }
          >
            André Roxhage
          </motion.h1>
        </div>
      </div>

      {/* About tabs — directly after hero */}
      <div className="bg-secondary pt-8 pb-10 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Tabs */}
          <div className="flex flex-row gap-x-8 sm:gap-x-10 mb-1">
            {about.map((item, index) => (
              <div key={index} className="pb-2">
                <motion.h4
                  className={`text-base font-medium pb-1 cursor-pointer py-2 px-1 -ml-1 ${
                    activeIndex === index
                      ? 'text-primary-800 dark:text-primary-300'
                      : 'text-muted-foreground'
                  } hover:text-accent-foreground`}
                  onClick={() => setActiveIndex(index)}
                  whileHover={{
                    translateY: -4,
                    color: 'oklch(var(--accent-foreground))',
                    transition: { duration: 0.2, ease: 'easeInOut' },
                  }}
                >
                  {item.title}
                </motion.h4>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.hr
                      className="h-0.5 w-full rounded-full border-0 bg-primary-700"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      exit={{ width: '0%' }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      key="line"
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {about.map(
              (item, index) =>
                activeIndex === index && (
                  <motion.p
                    key={index}
                    className="text-base font-normal leading-relaxed text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    {item.description}
                  </motion.p>
                )
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

// --- Desktop: scroll-driven sticky header with parallax ---
const DesktopHeader = ({ reducedMotion }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Hero parallax
  const heroTranslateY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? ['0%', '0%'] : ['0%', '-15%']
  );
  const heroScale = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [1.15, 1.15] : [1.15, 1.25]
  );
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0.85, 0.85] : [0.85, 0.9]
  );

  // Content phase: h2 subtitle
  const subtitleOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.3],
    [1, 1, 0]
  );
  const subtitleY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.3],
    reducedMotion ? [0, 0, 0] : [0, 0, -10]
  );

  // Content phase: "At work"
  const atWorkHeadingOpacity = useTransform(
    scrollYProgress,
    [0.22, 0.32, 0.55, 0.62],
    [0, 1, 1, 0]
  );
  const atWorkHeadingY = useTransform(
    scrollYProgress,
    [0.22, 0.32, 0.55, 0.62],
    reducedMotion ? [0, 0, 0, 0] : [20, 0, 0, -10]
  );
  const atWorkBodyOpacity = useTransform(
    scrollYProgress,
    [0.24, 0.34, 0.55, 0.62],
    [0, 1, 1, 0]
  );
  const atWorkBodyY = useTransform(
    scrollYProgress,
    [0.24, 0.34, 0.55, 0.62],
    reducedMotion ? [0, 0, 0, 0] : [20, 0, 0, -10]
  );

  // Content phase: "Elsewhere" (stays visible)
  const elsewhereHeadingOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.65],
    [0, 1]
  );
  const elsewhereHeadingY = useTransform(
    scrollYProgress,
    [0.55, 0.65],
    reducedMotion ? [0, 0] : [20, 0]
  );
  const elsewhereBodyOpacity = useTransform(
    scrollYProgress,
    [0.57, 0.67],
    [0, 1]
  );
  const elsewhereBodyY = useTransform(
    scrollYProgress,
    [0.57, 0.67],
    reducedMotion ? [0, 0] : [20, 0]
  );

  const heroDuration = 0.6;
  const secondaryDelay = reducedMotion ? 0 : heroDuration - 0.15;

  return (
    <section
      ref={containerRef}
      id="header"
      className="hidden md:block"
      style={{ height: '300vh' }}
    >
      <div className="sticky top-0 h-screen">
        <HeroBar
          reducedMotion={reducedMotion}
          heroTranslateY={heroTranslateY}
          heroScale={heroScale}
          overlayOpacity={overlayOpacity}
        />

        <div className="h-3/5 min-h-[480px] flex-row items-center bg-secondary">
          <div className="max-w-7xl px-5 sm:px-6 md:px-4 mx-auto h-full gap-x-8 grid grid-cols-10 text-2xl text-muted-foreground items-center">
            {/* Left column — sequenced content */}
            <div className="col-span-6 col-start-1 relative">
              {/* Phase 1: h2 subtitle */}
              <motion.div
                style={{ opacity: subtitleOpacity, y: subtitleY }}
                className="absolute inset-0 flex items-center"
              >
                <motion.h2
                  className="text-2xl font-medium tracking-tight max-w-[680px] leading-relaxed"
                  initial={
                    reducedMotion
                      ? { opacity: 1 }
                      : { opacity: 0, filter: 'blur(8px)' }
                  }
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : {
                          duration: heroDuration,
                          delay: secondaryDelay,
                          ease: EASING.ENTER,
                        }
                  }
                >
                  <span className="text-neutral-600 dark:text-neutral-300">
                    {header.currently.split(',')[0]}
                  </span>
                  &nbsp;
                  <span>
                    {header.currently.substring(
                      header.currently.indexOf(',') + 2
                    )}
                  </span>
                </motion.h2>
              </motion.div>

              {/* Phase 2: "At work" */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-[680px]">
                  <motion.h3
                    className="text-4xl font-medium tracking-tight text-foreground pb-4"
                    style={{ opacity: atWorkHeadingOpacity, y: atWorkHeadingY }}
                  >
                    {about[0].title}
                  </motion.h3>
                  <motion.p
                    className="text-lg font-normal leading-relaxed text-muted-foreground"
                    style={{ opacity: atWorkBodyOpacity, y: atWorkBodyY }}
                  >
                    {about[0].description}
                  </motion.p>
                </div>
              </div>

              {/* Phase 3: "Elsewhere" */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-[680px]">
                  <motion.h3
                    className="text-4xl font-medium tracking-tight text-foreground pb-4"
                    style={{
                      opacity: elsewhereHeadingOpacity,
                      y: elsewhereHeadingY,
                    }}
                  >
                    {about[1].title}
                  </motion.h3>
                  <motion.p
                    className="text-lg font-normal leading-relaxed text-muted-foreground"
                    style={{ opacity: elsewhereBodyOpacity, y: elsewhereBodyY }}
                  >
                    {about[1].description}
                  </motion.p>
                </div>
              </div>
            </div>

            {/* Right column — profile picture */}
            <motion.div
              className="p-6 col-start-7 col-span-3"
              initial={
                reducedMotion ? { opacity: 1 } : { scale: 0, opacity: 0 }
              }
              animate={{ scale: 1, opacity: 1 }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : {
                      duration: heroDuration,
                      delay: secondaryDelay,
                      ease: EASING.ENTER,
                    }
              }
            >
              <Image
                className="h-full w-full rounded-full drop-shadow-2xl shadow-md md:shadow-customShadow"
                src={ProfilePicture}
                placeholder="blur"
                priority
                alt="André Roxhage profile photo"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Header = () => {
  const reducedMotion = useReducedMotion();

  return (
    <>
      <MobileHeader reducedMotion={reducedMotion} />
      <DesktopHeader reducedMotion={reducedMotion} />
    </>
  );
};

export default Header;
