'use client';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
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

const MAX_H = 128.7;
const MIN_H = 7;
const COUNT = BASE_CARDS.length;
const ISO_DX = 115.686;
const ISO_DY = 57.843;
const CORNER_DX = 1.69;
const CORNER_DY = 0.845;
const FALLOFF = 2.5;

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

function getWaveHeight(i: number, center: number): number {
  const dist = Math.abs(i - center);
  const t = Math.exp(-(dist * dist) / (2 * FALLOFF * FALLOFF));
  return MIN_H + (MAX_H - MIN_H) * t;
}

export default function IsometricStack() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  // Fractional index: 0 = first card (top-right), COUNT-1 = last card (bottom-left)
  const [hoverCenter, setHoverCenter] = useState<number | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) {
        return;
      }
      const el = containerRef.current;
      if (!el) {
        return;
      }
      const rect = el.getBoundingClientRect();
      // Normalize mouse position to 0–1 along the diagonal
      // Bottom-left = (0, height), Top-right = (width, 0)
      // Project onto the diagonal axis
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      // Diagonal: bottom-left (0,1) to top-right (1,0)
      // Progress along diagonal: average of x and (1-y)
      const diag = (nx + (1 - ny)) / 2;
      // Map 0–1 to card index range (inverted: top-right = card 0)
      const idx = (1 - diag) * (COUNT - 1);
      const clamped = Math.max(0, Math.min(COUNT - 1, idx));
      setHoverCenter(clamped);
    },
    [prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setHoverCenter(null);
  }, []);

  const cards = useMemo(
    () =>
      BASE_CARDS.map((base, i) => {
        if (hoverCenter === null) {
          return { x: base.x, y: base.y, h: base.h };
        }
        const newH = getWaveHeight(i, hoverCenter);
        const newY = base.y + base.h - newH;
        return { x: base.x, y: newY, h: newH };
      }),
    [hoverCenter]
  );

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
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full max-w-[300px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-10 -120 292 400"
          fill="none"
          className="w-full"
          role="img"
          aria-label="Isometric stack of cards"
        >
          {cards.map((card, i) => {
            const dist =
              hoverCenter !== null ? Math.abs(i - hoverCenter) : COUNT;
            const delay = dist * 0.02;

            return (
              <g key={i}>
                <path
                  d={buildCardPath(card.x, card.y, card.h)}
                  fill="rgba(0,0,0,0.08)"
                  stroke="#a3a3a3"
                  strokeWidth="0.5"
                  style={{
                    transition: `d ${DURATION.FAST}s cubic-bezier(0.22, 1, 0.36, 1)`,
                    transitionDelay: `${delay.toFixed(3)}s`,
                  }}
                />
                <path
                  d={buildInnerLine(card.x, card.y, card.h)}
                  stroke="#d4d4d4"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  fill="none"
                  style={{
                    transition: `d ${DURATION.FAST}s cubic-bezier(0.22, 1, 0.36, 1)`,
                    transitionDelay: `${delay.toFixed(3)}s`,
                  }}
                />
              </g>
            );
          })}
        </svg>
      </div>
    </motion.div>
  );
}
