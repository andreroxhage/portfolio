'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';

export default function ScrollLines() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const y4 = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const y5 = useTransform(scrollYProgress, [0, 1], ['0%', '-45%']);

  const lines = [
    { x: '15%', height: '140%', opacity: 0.06, y: y1 },
    { x: '30%', height: '160%', opacity: 0.04, y: y2 },
    { x: '50%', height: '130%', opacity: 0.07, y: y3 },
    { x: '70%', height: '150%', opacity: 0.05, y: y4 },
    { x: '85%', height: '145%', opacity: 0.04, y: y5 },
  ];

  if (reducedMotion) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {lines.map((line, i) => (
        <motion.div
          key={i}
          className="absolute w-px bg-foreground"
          style={{
            left: line.x,
            height: line.height,
            opacity: line.opacity,
            y: line.y,
            top: '-20%',
          }}
        />
      ))}
    </div>
  );
}
