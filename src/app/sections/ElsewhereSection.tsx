'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { about } from '@/app/data/home';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';
import { DURATION, EASING, STAGGER } from '@/app/lib/motion';
import OceanWave from '@/app/components/OceanWave';

export default function ElsewhereSection() {
  const reducedMotion = useReducedMotion();
  const duration = reducedMotion ? 0.01 : DURATION.SLOW;

  const makeVariant = (index: number) => ({
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: EASING.ENTER,
        delay: reducedMotion ? 0 : index * STAGGER.DELAY,
      },
    },
  });

  return (
    <section className="bg-secondary relative py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-4 grid grid-cols-1 md:grid-cols-10 gap-8">
        <div className="md:col-span-5 md:col-start-1">
          <motion.h2
            className="text-2xl md:text-4xl font-medium tracking-tight text-foreground pb-4"
            style={{ textWrap: 'balance' } as React.CSSProperties}
            variants={makeVariant(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {about[1].title}
          </motion.h2>
          <motion.p
            className="text-base md:text-lg font-normal leading-relaxed text-foreground text-balance"
            variants={makeVariant(1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {about[1].description}
          </motion.p>
        </div>

        {/* Wave animation column */}
        <div className="hidden md:flex md:col-span-5 items-end justify-center h-48">
          <OceanWave />
        </div>
      </div>
    </section>
  );
}
