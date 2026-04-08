'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import profileImage from '../../../public/resource/profileImage.jpg';
import { header } from '@/app/data/home';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';
import { DURATION, EASING } from '@/app/lib/motion';
import WebGLCanvasLoader from '@/app/components/WebGLCanvas/WebGLCanvasLoader';

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const [webglReady, setWebglReady] = useState(false);

  const handleWebGLReady = useCallback(() => {
    setWebglReady(true);
  }, []);

  const animate = reducedMotion || webglReady ? 'visible' : 'hidden';

  const photoVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: DURATION.SLOW,
        ease: EASING.ENTER,
      },
    },
  };

  const taglineVariants = {
    hidden: { opacity: 0, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: DURATION.SLOW,
        ease: EASING.ENTER,
        delay: 0.1,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center">
      <WebGLCanvasLoader onReady={handleWebGLReady} />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-4 py-16">
        {/* Mobile layout: photo on top, tagline below */}
        <div className="flex flex-col items-center gap-8 md:hidden">
          <motion.div
            variants={photoVariants}
            initial="hidden"
            animate={animate}
          >
            <Image
              src={profileImage}
              alt="André Roxhage"
              className="w-32 h-32 rounded-full object-cover"
              width={128}
              height={128}
              placeholder="blur"
              priority
            />
          </motion.div>

          <motion.div
            className="text-center"
            variants={taglineVariants}
            initial="hidden"
            animate={animate}
          >
            <h1 className="text-2xl font-medium tracking-tight leading-tight text-foreground">
              {header.currently}
            </h1>
            <p className="text-base tracking-widest text-muted-foreground font-normal mt-4">
              André Roxhage
            </p>
          </motion.div>
        </div>

        {/* Desktop layout: 10-column grid */}
        <div className="hidden md:grid grid-cols-10 gap-8 items-center">
          {/* Left column: tagline */}
          <motion.div
            className="col-span-6 flex flex-col justify-center"
            variants={taglineVariants}
            initial="hidden"
            animate={animate}
          >
            <h1 className="text-4xl font-medium tracking-tight leading-tight text-foreground">
              {header.currently}
            </h1>
            <p className="text-lg tracking-widest text-muted-foreground font-normal mt-4">
              André Roxhage
            </p>
          </motion.div>

          {/* Right column: profile photo */}
          <motion.div
            className="col-span-4 flex justify-end"
            variants={photoVariants}
            initial="hidden"
            animate={animate}
          >
            <Image
              src={profileImage}
              alt="André Roxhage"
              className="w-48 h-48 rounded-full object-cover"
              width={192}
              height={192}
              placeholder="blur"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
