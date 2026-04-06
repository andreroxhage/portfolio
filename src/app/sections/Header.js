'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import ProfilePicture from '../../../public/resource/profileImage.jpg';

import { header, about } from '@/app/data/home';
import { EASING } from '@/app/lib/motion';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';

const Header = () => {
  const headerImage = '/resource/20220611-IMG_5691.jpg';
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // --- Hero parallax transforms ---
  const heroTranslateY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? ['0%', '0%'] : ['0%', '-15%']
  );
  const heroScale = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [1, 1] : [1, 1.05]
  );
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0.85, 0.85] : [0.85, 0.9]
  );

  // --- Content phase: h2 subtitle ---
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

  // --- Content phase: "At work" ---
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

  // --- Content phase: "Elsewhere" ---
  const elsewhereHeadingOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.65, 0.82, 0.92],
    [0, 1, 1, 0]
  );
  const elsewhereHeadingY = useTransform(
    scrollYProgress,
    [0.55, 0.65, 0.82, 0.92],
    reducedMotion ? [0, 0, 0, 0] : [20, 0, 0, -10]
  );
  const elsewhereBodyOpacity = useTransform(
    scrollYProgress,
    [0.57, 0.67, 0.82, 0.92],
    [0, 1, 1, 0]
  );
  const elsewhereBodyY = useTransform(
    scrollYProgress,
    [0.57, 0.67, 0.82, 0.92],
    reducedMotion ? [0, 0, 0, 0] : [20, 0, 0, -10]
  );

  // --- Entry animation config ---
  const heroDuration = 0.6;
  const heroDelay = 0;
  const secondaryDelay = reducedMotion ? 0 : heroDuration - 0.15;

  return (
    <section ref={containerRef} id="header" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen">
        {/* === Hero Bar (top ~40%) === */}
        <div className="h-2/6 md:h-2/5 relative overflow-hidden surface-lock-dark">
          {/* Background Image with parallax */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{
                y: heroTranslateY,
                scale: heroScale,
              }}
            >
              <Image
                src={headerImage}
                alt="Header background"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                priority
              />
            </motion.div>
          </div>

          {/* Gradient Overlay — scroll-driven opacity */}
          <motion.div
            className="absolute inset-0 bg-surface-dark"
            style={{ opacity: overlayOpacity }}
          />
          {/* Warm tint */}
          <div className="absolute inset-0 bg-neutral-200/10 mix-blend-overlay" />

          {/* Name */}
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

        {/* === Content Area (bottom ~60%) === */}
        <div className="h-4/6 md:h-3/5 min-h-[480px] py-16 md:py-0 flex-row items-center bg-secondary">
          <div className="max-w-7xl px-5 sm:px-6 md:px-4 mx-auto h-full gap-x-8 grid grid-cols-10 text-2xl text-muted-foreground items-center">
            {/* Left column — sequenced content */}
            <div className="col-span-10 col-start-1 md:col-span-6 mb-12 sm:mb-16 md:mb-0 relative">
              {/* Phase 1: h2 subtitle (mount animation + scroll fade-out) */}
              <motion.div
                style={{ opacity: subtitleOpacity, y: subtitleY }}
                className="absolute inset-0 flex items-center"
              >
                <motion.h2
                  className="text-xl md:text-2xl font-medium max-w-[680px] leading-relaxed"
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
              <motion.div
                style={{ opacity: atWorkHeadingOpacity }}
                className="absolute inset-0 flex items-center"
              >
                <div className="max-w-[680px]">
                  <motion.h3
                    className="text-2xl md:text-4xl font-medium tracking-tight text-foreground pb-4"
                    style={{ opacity: atWorkHeadingOpacity, y: atWorkHeadingY }}
                  >
                    {about[0].title}
                  </motion.h3>
                  <motion.p
                    className="text-base md:text-lg font-normal leading-relaxed text-muted-foreground"
                    style={{ opacity: atWorkBodyOpacity, y: atWorkBodyY }}
                  >
                    {about[0].description}
                  </motion.p>
                </div>
              </motion.div>

              {/* Phase 3: "Elsewhere" */}
              <motion.div
                style={{ opacity: elsewhereHeadingOpacity }}
                className="absolute inset-0 flex items-center"
              >
                <div className="max-w-[680px]">
                  <motion.h3
                    className="text-2xl md:text-4xl font-medium tracking-tight text-foreground pb-4"
                    style={{
                      opacity: elsewhereHeadingOpacity,
                      y: elsewhereHeadingY,
                    }}
                  >
                    {about[1].title}
                  </motion.h3>
                  <motion.p
                    className="text-base md:text-lg font-normal leading-relaxed text-muted-foreground"
                    style={{
                      opacity: elsewhereBodyOpacity,
                      y: elsewhereBodyY,
                    }}
                  >
                    {about[1].description}
                  </motion.p>
                </div>
              </motion.div>
            </div>

            {/* Right column — profile picture (anchored, no scroll animation) */}
            <motion.div
              className="col-start-3 p-6 md:p-6 col-span-6 md:col-start-7 md:col-span-3 md:my-0"
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
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
