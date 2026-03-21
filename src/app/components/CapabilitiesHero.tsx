'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ProgressiveMedia } from '@/app/components/ProgressiveMedia';
import { capabilities } from '@/app/data/capabilities';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';
import { DURATION, EASING } from '@/app/lib/motion';
import type { Capability } from '@/app/types';

const CYCLE_INTERVAL_MS = 5000;

function getShowcaseCapability(
  selected: Capability,
  all: Capability[]
): Capability {
  if (selected.imageSrc) {
    return selected;
  }
  // For overview (no imageSrc), fall back to first capability with an image
  return all.find(c => c.imageSrc) ?? selected;
}

export function CapabilitiesHero() {
  const [selectedId, setSelectedId] = useState<string>('overview');
  const reducedMotion = useReducedMotion();

  const imagedCapabilities = capabilities.filter(c => c.imageSrc);
  const selected =
    capabilities.find(c => c.id === selectedId) ?? capabilities[0];
  const showcase = getShowcaseCapability(selected, capabilities);

  const [cycleIndex, setCycleIndex] = useState(0);

  useEffect(() => {
    if (selectedId !== 'overview' || reducedMotion) {
      return;
    }

    const interval = setInterval(() => {
      setCycleIndex(i => (i + 1) % imagedCapabilities.length);
    }, CYCLE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [selectedId, reducedMotion, imagedCapabilities.length]);

  const displayedShowcase =
    selectedId === 'overview' && imagedCapabilities.length > 0
      ? imagedCapabilities[cycleIndex]
      : showcase;

  const easeCSS = EASING.ENTER.join(', ');

  return (
    <div className="flex-1 flex flex-col md:flex-row gap-6 mt-8 min-h-0">
      {/* Left column — capability cards */}
      <div className="flex flex-col gap-2 md:w-[340px] shrink-0">
        {capabilities.map((cap, i) => {
          const isSelected = cap.id === selectedId;
          return (
            <motion.button
              key={cap.id}
              onClick={() => setSelectedId(cap.id)}
              className={cn(
                'text-left px-4 py-3 rounded-[12px] corner-squircle transition-colors',
                'border-l-3',
                isSelected
                  ? 'border-primary-500 bg-white/5'
                  : 'border-transparent hover:bg-white/5'
              )}
              initial={reducedMotion ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={
                reducedMotion
                  ? undefined
                  : {
                      duration: DURATION.MEDIUM,
                      ease: EASING.ENTER,
                      delay: i * 0.06,
                    }
              }
            >
              <p
                className={cn(
                  'text-sm font-medium transition-colors',
                  isSelected
                    ? 'text-surface-dark-foreground'
                    : 'text-surface-dark-muted'
                )}
              >
                {cap.title}
              </p>
              <p
                className={cn(
                  'text-xs mt-1 transition-all overflow-hidden',
                  isSelected
                    ? 'text-surface-dark-muted max-h-20 opacity-100'
                    : 'max-h-0 opacity-0'
                )}
                style={{
                  transition: reducedMotion
                    ? undefined
                    : `max-height ${DURATION.MEDIUM * 1000}ms cubic-bezier(${easeCSS}), opacity ${DURATION.MEDIUM * 1000}ms cubic-bezier(${easeCSS})`,
                }}
              >
                {cap.description}
              </p>
            </motion.button>
          );
        })}
      </div>

      {/* Right column — media showcase */}
      <div className="flex-1 min-h-0 relative">
        {displayedShowcase.imageSrc ? (
          <motion.div
            key={displayedShowcase.id}
            className="absolute inset-0"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            transition={
              reducedMotion
                ? undefined
                : {
                    duration: DURATION.SLOW,
                    ease: EASING.ENTER,
                  }
            }
          >
            <ProgressiveMedia
              imageSrc={displayedShowcase.imageSrc}
              imageAlt={displayedShowcase.imageAlt ?? ''}
              videoIdentifier={displayedShowcase.videoIdentifier}
              className="w-full h-full"
              rounded
            />
          </motion.div>
        ) : (
          <div className="absolute inset-0 rounded-[20px] corner-squircle bg-white/5" />
        )}
      </div>
    </div>
  );
}
