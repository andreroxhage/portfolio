'use client';

import { useRef } from 'react';
import Image, { type StaticImageData } from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';

import OliveCar from '../../../../public/resource/collage/olive-car.jpg';
import SicilyHills from '../../../../public/resource/collage/sicily-hills.jpg';
import FuroreBridge from '../../../../public/resource/collage/furore-bridge.jpg';

type CollageItem = {
  src: StaticImageData;
  alt: string;
  left: number;
  top: number;
  width: number;
  ar: number;
  drift: number;
};

/**
 * Hand-composed layout. `left`/`width` are percentages of the canvas width,
 * `top` is a percentage of the canvas height, `ar` supplies the height.
 * The numbers are tuned to avoid collisions — do not re-derive them.
 */
const items: CollageItem[] = [
  {
    src: OliveCar,
    alt: 'An old Fiat parked in an olive grove',
    left: 40.0,
    top: 3.3,
    width: 34.0,
    ar: 1.495,
    drift: 24,
  },
  {
    src: SicilyHills,
    alt: 'Dry hills above the sea in western Sicily',
    left: 4.0,
    top: 38.53,
    width: 60.0,
    ar: 1.5,
    drift: 40,
  },
  {
    src: FuroreBridge,
    alt: 'Swimmers in the water below the bridge at Fiordo di Furore',
    left: 68.0,
    top: 55.04,
    width: 24.0,
    ar: 0.669,
    drift: 52,
  },
];

type CollagePhotoProps = {
  item: CollageItem;
  index: number;
  scrollYProgress: MotionValue<number>;
  reducedMotion: boolean;
};

function CollagePhoto({
  item,
  index,
  scrollYProgress,
  reducedMotion,
}: CollagePhotoProps) {
  const { src, alt, left, top, width, ar, drift } = item;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [drift, -drift]
  );

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: `${width}%`,
        aspectRatio: String(ar),
        y,
      }}
      initial={
        reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }
      }
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
      transition={
        reducedMotion
          ? { duration: 0.01 }
          : {
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: (index % 3) * 0.06,
            }
      }
    >
      <figure className="relative h-full w-full overflow-hidden rounded-[2px] corner-squircle image-depth-outline">
        {/* The canvas is capped at max-w-[1920px] minus lg:px-10, so past that
            breakpoint each item's width is a fixed px value, not a vw one. */}
        <Image
          src={src}
          alt={alt}
          fill
          placeholder="blur"
          className="object-cover"
          sizes={`(min-width: 2000px) ${Math.ceil((width / 100) * 1840)}px, ${Math.ceil(width)}vw`}
        />
      </figure>
    </motion.div>
  );
}

export default function PhotoCollage() {
  const container = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  });

  return (
    <section className="relative w-full bg-secondary pt-0 pb-0 -mb-[3vh]">
      <div className="mx-auto w-full max-w-[1920px] px-6 lg:px-10">
        <div
          ref={container}
          className="relative w-full"
          style={{ paddingBottom: '90.85%' }}
        >
          {items.map((item, index) => (
            <CollagePhoto
              key={item.alt}
              item={item}
              index={index}
              scrollYProgress={scrollYProgress}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
