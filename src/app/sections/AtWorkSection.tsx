'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { about } from '@/app/data/home';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';
import { DURATION, EASING, STAGGER } from '@/app/lib/motion';
import IsometricStack from '@/app/components/SVGgraphics/IsometricStack';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function AtWorkSection() {
  const reducedMotion = useReducedMotion();
  const duration = reducedMotion ? 0.01 : DURATION.SLOW;

  const makeVariant = (index: number) => ({
    hidden: { opacity: 0, y: 60 },
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
    <section className="pt-4 md:pt-8 pb-12 md:pb-18">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-4 grid grid-cols-1 md:grid-cols-10 gap-12 md:gap-8 items-center">
        {/* Text column */}
        <div className="md:col-span-5">
          <motion.h2
            className="text-2xl md:text-4xl font-medium tracking-tight text-foreground pb-4"
            style={{ textWrap: 'balance' } as React.CSSProperties}
            variants={makeVariant(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {about[0].title}
          </motion.h2>
          <motion.p
            className="text-base md:text-lg font-normal leading-relaxed text-foreground text-balance"
            variants={makeVariant(1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {about[0].description}
          </motion.p>

          <motion.div
            variants={makeVariant(2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link
              href="/work"
              className="inline-flex items-center gap-2 group mt-4 cursor-pointer text-primary-700 hover:text-primary-500 transition-colors duration-200"
            >
              <span className="text-base md:text-lg font-normal group-hover:underline underline-offset-4 decoration-primary-300">
                See my work
              </span>
              <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Graphic column */}
        <div className="md:col-span-5 flex justify-center">
          <IsometricStack />
        </div>
      </div>
    </section>
  );
}
