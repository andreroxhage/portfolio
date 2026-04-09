'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';

export default function OceanWave() {
  const reducedMotion = useReducedMotion();

  const waveVariant = (delay: number, duration: number) =>
    reducedMotion
      ? {}
      : {
          x: [0, -200],
          transition: {
            x: {
              repeat: Infinity,
              repeatType: 'loop' as const,
              duration,
              delay,
              ease: 'linear',
            },
          },
        };

  return (
    <div
      className="w-full h-full overflow-hidden opacity-20"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 800 200"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Wave 1 — front, slowest */}
        <motion.path
          d="M0,120 C50,100 100,140 200,120 C300,100 350,140 400,120 C450,100 500,140 600,120 C700,100 750,140 800,120 C850,100 900,140 1000,120 L1000,200 L0,200 Z"
          fill="currentColor"
          className="text-primary-400"
          animate={waveVariant(0, 12)}
        />
        {/* Wave 2 — middle */}
        <motion.path
          d="M0,140 C80,125 120,155 200,140 C280,125 320,155 400,140 C480,125 520,155 600,140 C680,125 720,155 800,140 C880,125 920,155 1000,140 L1000,200 L0,200 Z"
          fill="currentColor"
          className="text-primary-300"
          animate={waveVariant(0.5, 8)}
        />
        {/* Wave 3 — back, fastest */}
        <motion.path
          d="M0,155 C60,145 140,165 200,155 C260,145 340,165 400,155 C460,145 540,165 600,155 C660,145 740,165 800,155 C860,145 940,165 1000,155 L1000,200 L0,200 Z"
          fill="currentColor"
          className="text-primary-200"
          animate={waveVariant(1, 6)}
        />
      </svg>
    </div>
  );
}
