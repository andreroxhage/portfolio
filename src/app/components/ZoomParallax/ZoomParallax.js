'use client';

import Picture1 from '../../../../public/resource/carousel/1.jpg';
import Picture2 from '../../../../public/resource/carousel/2.jpg';
import Picture3 from '../../../../public/resource/carousel/3.jpg';
import CrowdBw from '../../../../public/resource/carousel/crowd-bw.jpg';
import Picture5 from '../../../../public/resource/carousel/5.jpg';
import GalaSpeech from '../../../../public/resource/carousel/gala-speech.jpg';
import Picture7 from '../../../../public/resource/carousel/7.jpg';
import styles from './styles.module.css';
import Image from 'next/image';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export default function Index() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 2.5]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
      src: Picture1,
      scale: scale4,
      alt: 'Man carried above the crowd, arm raised, at a concert',
    },
    {
      src: Picture2,
      scale: scale5,
      alt: 'Singer performing under smoky stage lights',
    },
    {
      src: Picture3,
      scale: scale6,
      alt: 'Hand reaching for two coffee cups on a tray in bed',
    },
    {
      src: CrowdBw,
      scale: scale5,
      alt: 'Crowd with raised hands in front of a smoke-lit stage',
    },
    {
      src: Picture5,
      scale: scale6,
      alt: 'Two pigeons taking flight from stone steps',
    },
    {
      src: GalaSpeech,
      scale: scale8,
      alt: 'Man in a tuxedo speaking on stage as a champagne glass flies overhead',
    },
    {
      src: Picture7,
      scale: scale9,
      alt: 'Overturned boats resting on a cobblestone quay',
    },
  ];

  return (
    <div ref={container} className={styles.container}>
      <motion.div
        className={styles.sticky}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          duration: 0.4,
          ease: 'easeInOut',
          delay: 0.2,
        }}
        viewport={{ once: true }}
      >
        {pictures.map(({ src, scale, alt }, index) => {
          return (
            <motion.div key={index} style={{ scale }} className={styles.el}>
              <div className={`${styles.imageContainer} image-depth-outline`}>
                <Image
                  src={src}
                  className="rounded-[2px] corner-squircle"
                  fill={true}
                  alt={alt}
                  placeholder="blur"
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
