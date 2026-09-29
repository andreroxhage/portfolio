'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import profileImage from '../../../public/resource/profileImage.jpg';
import { header } from '@/app/data/home';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';
import { DURATION, EASING, STAGGER } from '@/app/lib/motion';
import WebGLCanvasLoader from '@/app/components/WebGLCanvas/WebGLCanvasLoader';

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const [webglReady, setWebglReady] = useState(false);

  const handleWebGLReady = useCallback(() => {
    setWebglReady(true);
  }, []);

  const animate = reducedMotion || webglReady ? 'visible' : 'hidden';
  const stagger = reducedMotion ? 0 : STAGGER.DELAY;

  const makeVariants = (delay: number) => ({
    hidden: { opacity: 0, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: DURATION.SLOW,
        ease: EASING.ENTER,
        delay: reducedMotion ? 0 : delay,
      },
    },
  });

  // Photo has no blur — just fades in
  const photoVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: DURATION.SLOW,
        ease: EASING.ENTER,
        delay: reducedMotion ? 0 : stagger * 3, // photo enters last on mobile, first on desktop
      },
    },
  };

  const taglineVariants = makeVariants(0);
  const nameVariants = makeVariants(stagger);
  const photoVariantsMobile = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: DURATION.SLOW,
        ease: EASING.ENTER,
        delay: 0,
      },
    },
  };

  return (
    <section
      id="header"
      className="relative min-h-screen flex items-center bg-linear-to-t from-background via-secondary to-secondary"
    >
      <WebGLCanvasLoader onReady={handleWebGLReady} />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-4 py-16">
        {/* Mobile layout: photo on top, tagline below */}
        <div className="flex flex-col items-center gap-8 md:hidden">
          <motion.div
            className="relative rounded-full"
            variants={photoVariantsMobile}
            initial="hidden"
            animate={animate}
          >
            <div className="relative rounded-full image-depth-outline">
              <Image
                src={profileImage}
                alt="André Roxhage"
                className="w-32 h-32 rounded-full object-cover"
                width={128}
                height={128}
                placeholder="blur"
                priority
              />
            </div>
          </motion.div>

          <div className="text-center">
            <motion.h1
              className="text-2xl font-medium tracking-tight leading-tight text-foreground"
              style={{ textWrap: 'balance' } as React.CSSProperties}
              variants={makeVariants(stagger)}
              initial="hidden"
              animate={animate}
            >
              {header.currently}
            </motion.h1>
            <motion.p
              className="text-base tracking-widest text-muted-foreground font-normal mt-4"
              variants={makeVariants(stagger * 2)}
              initial="hidden"
              animate={animate}
            >
              André Roxhage
            </motion.p>
          </div>
        </div>

        {/* Desktop layout: 10-column grid */}
        <div className="hidden md:grid grid-cols-10 gap-8 items-center">
          {/* Left column: tagline then name, individually staggered */}
          <div className="col-span-5 flex flex-col justify-center">
            <motion.h1
              className="text-4xl font-medium tracking-tight leading-tight text-foreground"
              style={{ textWrap: 'balance' } as React.CSSProperties}
              variants={taglineVariants}
              initial="hidden"
              animate={animate}
            >
              {header.currently}
            </motion.h1>
            <motion.p
              className="text-lg tracking-widest text-muted-foreground font-normal mt-4"
              variants={nameVariants}
              initial="hidden"
              animate={animate}
            >
              André Roxhage
            </motion.p>
          </div>

          {/* Right column: profile photo */}
          <motion.div
            className="col-span-5 flex justify-center"
            variants={photoVariants}
            initial="hidden"
            animate={animate}
          >
            <div className="relative rounded-full image-depth-outline">
              <Image
                src={profileImage}
                alt="André Roxhage"
                className="w-64 h-64 rounded-full object-cover"
                width={256}
                height={256}
                placeholder="blur"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
