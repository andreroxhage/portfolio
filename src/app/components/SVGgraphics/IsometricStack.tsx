'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';
import { DURATION, EASING } from '@/app/lib/motion';

const BASE_CARDS = [
  { x: 137.04, y: 107.67, h: 20.53 },
  { x: 128.59, y: 98.38, h: 34.05 },
  { x: 120.14, y: 82.32, h: 54.33 },
  { x: 111.69, y: 59.5, h: 81.37 },
  { x: 103.24, y: 16.4, h: 128.7 },
  { x: 94.79, y: 67.95, h: 81.37 },
  { x: 86.34, y: 99.22, h: 54.33 },
  { x: 77.89, y: 123.73, h: 34.05 },
  { x: 69.44, y: 141.48, h: 20.53 },
  { x: 60.99, y: 152.46, h: 13.77 },
  { x: 52.54, y: 160.06, h: 10.39 },
  { x: 44.09, y: 165.98, h: 8.7 },
  { x: 35.63, y: 171.06, h: 7.85 },
  { x: 27.18, y: 175.27, h: 7.44 },
  { x: 18.73, y: 179.5, h: 7.01 },
];

const COUNT = BASE_CARDS.length;
const ISO_DX = 115.686;
const ISO_DY = 57.843;
const CORNER_DX = 1.69;
const CORNER_DY = 0.845;
const FALLOFF = 2.5;
const MAX_HEIGHT = Math.max(...BASE_CARDS.map(c => c.h));
const MIN_HEIGHT = Math.min(...BASE_CARDS.map(c => c.h));

function buildCardPath(x: number, y: number, h: number): string {
  return [
    `M${x} ${y}`,
    `a1.44 1.44 0 0 1 1.288 0`,
    `l${ISO_DX} ${ISO_DY}`,
    `a3.13 3.13 0 0 1 1.73 2.8`,
    `v${h}`,
    `a1.44 1.44 0 0 1-.796 1.288`,
    `l-${CORNER_DX} ${CORNER_DY}`,
    `a1.44 1.44 0 0 1-1.288 0`,
    `l-${ISO_DX} -${ISO_DY}`,
    `a3.13 3.13 0 0 1-1.73-2.8`,
    `v-${h}`,
    `c0-.545.308-1.044.796-1.288z`,
  ].join('');
}

function buildInnerLine(x: number, y: number, h: number): string {
  const startX = x + 0.645;
  const startY = y + 2.778;
  return [
    `M${startX} ${startY}`,
    `l113.061 56.531`,
    `a3.38 3.38 0 0 1 1.868 3.023`,
    `v${h - 2.336}`,
  ].join('');
}

/**
 * Isometric card stack with spring-physics hover.
 * Uses framer-motion useSpring for the smooth trailing feel —
 * mouse sets the target, spring interpolates, DOM writes are direct.
 */
export default function IsometricStack() {
  const prefersReducedMotion = useReducedMotion();
  const groupRefs = useRef<(SVGGElement | null)[]>([]);

  // Wave center position (tracks cursor during hover)
  const cursorIndex = useMotionValue(0);
  const springIndex = useSpring(cursorIndex, {
    stiffness: 300,
    damping: 30,
    mass: 0.5,
  });

  // Wave intensity: 1 = full wave, 0 = all cards at MIN_HEIGHT
  const intensityTarget = useMotionValue(0);
  const springIntensity = useSpring(intensityTarget, {
    stiffness: 100,
    damping: 22,
    mass: 0.7,
  });

  // Restore to base heights: 0 = use wave/min, 1 = use base heights
  const restoreTarget = useMotionValue(1);
  const springRestore = useSpring(restoreTarget, {
    stiffness: 60,
    damping: 18,
    mass: 1.2,
  });

  // Subscribe to all three springs and write card heights directly to DOM
  useEffect(() => {
    const update = () => {
      const center = springIndex.get();
      const intensity = springIntensity.get();
      const restore = springRestore.get();

      for (let i = 0; i < COUNT; i++) {
        const g = groupRefs.current[i];
        if (!g) {
          continue;
        }

        const card = BASE_CARDS[i];

        // Gaussian wave height, scaled by intensity
        // intensity=1: full wave, intensity=0: all at MIN_HEIGHT
        const dist = Math.abs(i - center);
        const t = Math.exp(-(dist * dist) / (2 * FALLOFF * FALLOFF));
        const waveH = MIN_HEIGHT + (MAX_HEIGHT - MIN_HEIGHT) * t * intensity;

        // Blend wave/min → base via restore spring
        const newH = waveH + (card.h - waveH) * restore;

        const deltaH = newH - card.h;
        const newY = card.y - deltaH;

        const outerPath = g.querySelector('path:first-child');
        if (outerPath) {
          outerPath.setAttribute('d', buildCardPath(card.x, newY, newH));
        }
        const innerPath = g.querySelector('path:last-child');
        if (innerPath) {
          innerPath.setAttribute('d', buildInnerLine(card.x, newY, newH));
        }
      }
    };

    const unsub1 = springIndex.on('change', update);
    const unsub2 = springIntensity.on('change', update);
    const unsub3 = springRestore.on('change', update);
    return () => {
      unsub1();
      unsub2();
      unsub3();
    };
  }, [springIndex, springIntensity, springRestore]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) {
        return;
      }
      const rect = e.currentTarget.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      // Diagonal: bottom-left → top-right maps to card index
      const diag = (nx + (1 - ny)) / 2;
      const idx = (1 - diag) * (COUNT - 1);
      cursorIndex.set(Math.max(0, Math.min(COUNT - 1, idx)));
      intensityTarget.set(1);
      restoreTarget.set(0);
    },
    [prefersReducedMotion, cursorIndex, intensityTarget, restoreTarget]
  );

  const handleMouseLeave = useCallback(() => {
    intensityTarget.set(0); // Fade wave → all cards to MIN_HEIGHT (medium speed)
    restoreTarget.set(1); // Then restore to base heights (slower)
  }, [intensityTarget, restoreTarget]);

  return (
    <motion.div
      className="relative w-full flex items-center justify-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : DURATION.SLOW,
        ease: EASING.ENTER,
      }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full max-w-[300px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 272 267"
          fill="none"
          className="w-full"
          role="img"
          aria-label="Isometric stack of cards"
        >
          {BASE_CARDS.map((card, i) => (
            <g
              key={i}
              ref={el => {
                groupRefs.current[i] = el;
              }}
              strokeWidth="0.5"
            >
              <path
                d={buildCardPath(card.x, card.y, card.h)}
                className="fill-neutral-400/50 stroke-neutral-200 dark:fill-neutral-900/60 dark:stroke-neutral-500"
              />
              <path
                d={buildInnerLine(card.x, card.y, card.h)}
                className="stroke-neutral-300 dark:stroke-neutral-700"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          ))}
        </svg>
      </div>
    </motion.div>
  );
}
