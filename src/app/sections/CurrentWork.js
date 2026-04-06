'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { currentWork } from '@/app/data/home';
import IsometricStack from '../components/SVGgraphics/IsometricStack';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';
import { DURATION, EASING } from '@/app/lib/motion';
export default function CurrentWork() {
  const work = currentWork[0];
  const prefersReducedMotion = useReducedMotion();
  const [isLinkHovered, setIsLinkHovered] = useState(false);

  return (
    <motion.div
      id="work"
      className={`flex-row items-center pt-16 md:pt-12 pb-12 sm:pb-16 md:pb-18 bg-muted dark:bg-white/2 `}
    >
      <div className="max-w-7xl px-5 sm:px-6 md:px-4 mx-auto h-full gap-x-8 rounded-[12px] corner-squircle grid grid-cols-10 text-2xl text-muted-foreground items-center">
        <div className="w-full col-start-1 col-span-10 md:col-start-1 md:col-span-5 max-w-[650px] md:pt-0 py-10 sm:py-12 md:my-12">
          <div className="flex flex-col gap-y-4">
            <motion.h3
              className="text-2xl md:text-4xl font-medium tracking-tight cursor-pointer text-foreground"
              initial={{ opacity: 0, translateY: 60 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0.01 : DURATION.SLOW,
                ease: EASING.ENTER,
              }}
              viewport={{ once: true }}
            >
              {work.title}
            </motion.h3>
            <motion.p
              className="text-base md:text-lg font-medium leading-relaxed"
              initial={{ opacity: 0, translateY: 60 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0.01 : DURATION.SLOW,
                ease: EASING.ENTER,
              }}
              viewport={{ once: true }}
            >
              {work.description}
            </motion.p>
            <div className="">
              <Link
                href="/projects"
                className="flex gap-2 align-items-baseline group text-primary-800 dark:text-primary-300 text-base md:text-lg font-medium hover:text-primary-600 dark:hover:text-primary-400 active:text-primary-900 dark:active:text-primary-200 transition-colors"
                onMouseEnter={() => setIsLinkHovered(true)}
                onMouseLeave={() => setIsLinkHovered(false)}
              >
                See projects
                <motion.span
                  aria-hidden
                  animate={{
                    x: isLinkHovered ? 4 : 0,
                  }}
                  transition={{
                    duration: prefersReducedMotion ? 0.01 : DURATION.FAST,
                    ease: EASING.ENTER,
                  }}
                  style={{ display: 'inline-block' }}
                >
                  <ArrowRightIcon className="w-4 h-4 inline mb-1" />
                </motion.span>{' '}
              </Link>
            </div>
          </div>
        </div>

        <div className="col-start-3 p-6 md:p-6 col-span-6 md:col-start-7 md:col-span-4 md:my-0 flex items-center justify-center">
          <IsometricStack />
        </div>
      </div>
    </motion.div>
  );
}
