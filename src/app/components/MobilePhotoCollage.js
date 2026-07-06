'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Picture1 from '../../../public/resource/carousel/1.jpg';
import Picture3 from '../../../public/resource/carousel/3.jpg';
import Picture4 from '../../../public/resource/carousel/4.jpg';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';

export default function MobilePhotoCollage() {
  const reducedMotion = useReducedMotion();

  const baseReveal = {
    initial: reducedMotion ? { opacity: 1 } : { opacity: 0, translateY: 40 },
    whileInView: { opacity: 1, translateY: 0 },
    viewport: { once: true },
  };

  const revealTransition = delaySeconds => ({
    transition: reducedMotion
      ? { duration: 0.01 }
      : { duration: 0.5, ease: 'easeOut', delay: delaySeconds },
  });

  return (
    <div className="md:hidden px-5 sm:px-6 pb-16 bg-background">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        {/* Large hero image */}
        <motion.div
          className="relative w-full aspect-[4/3] rounded-[20px] corner-squircle overflow-hidden image-depth-outline"
          {...baseReveal}
          {...revealTransition(0)}
        >
          <Image
            src={Picture1}
            alt="Concert crowd with hands raised"
            fill
            className="object-cover"
            placeholder="blur"
            sizes="(max-width: 768px) 100vw"
          />
        </motion.div>

        {/* Two-up grid */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            className="relative aspect-[3/4] rounded-[20px] corner-squircle overflow-hidden image-depth-outline"
            {...baseReveal}
            {...revealTransition(0.08)}
          >
            <Image
              src={Picture3}
              alt="Two coffee cups on a tray"
              fill
              className="object-cover"
              placeholder="blur"
              sizes="(max-width: 768px) 50vw"
            />
          </motion.div>
          <motion.div
            className="relative aspect-[3/4] rounded-[20px] corner-squircle overflow-hidden image-depth-outline"
            {...baseReveal}
            {...revealTransition(0.16)}
          >
            <Image
              src={Picture4}
              alt="Singer performing on stage"
              fill
              className="object-cover"
              placeholder="blur"
              sizes="(max-width: 768px) 50vw"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
