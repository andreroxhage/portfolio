'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ProfilePicture from '../../../public/resource/profileImage.jpg';

import { header } from '@/app/data';
import { EASING } from '@/app/lib/motion';

const Header = () => {
  const headerImage = '/resource/20220611-IMG_5691.jpg';

  const [bgLoaded, setBgLoaded] = useState(false);

  return (
    <header id="header" className="h-screen">
      <div className="h-2/6 md:h-2/5 relative overflow-hidden">
        {/* Background Image with smooth fade-in */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: bgLoaded ? 1 : 0 }}
            transition={{ duration: 0.8, ease: EASING.ENTER }}
          >
            <Image
              src={headerImage}
              alt="Header background"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
              onLoad={() => setBgLoaded(true)}
            />
          </motion.div>
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-surface-dark/85" />

        {/* Content */}
        <div className="relative max-w-7xl h-full px-5 sm:px-6 md:px-4 mx-auto flex items-center">
          <motion.h1
            className="text-6xl md:text-8xl font-medium tracking-tighter text-surface-dark-foreground mix-blend-difference"
            animate={{
              opacity: 0.4,
              color: 'hsl(var(--surface-dark-foreground))',
            }}
            initial={{ opacity: 0, color: 'hsl(var(--accent-foreground))' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            André Roxhage
          </motion.h1>
        </div>
      </div>
      <div className="h-4/6 md:h-3/5 min-h-[480px] py-16 md:py-0 flex-row items-center bg-secondary">
        <div className="max-w-7xl px-5 sm:px-6 md:px-4 mx-auto h-full gap-x-8 grid grid-cols-10 text-2xl text-muted-foreground items-center">
          <motion.div
            className="col-span-10 col-start-1 md:col-span-6 mb-12 sm:mb-16 md:mb-0"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="text-3xl md:text-4xl font-medium pb-3 md:pb-2 text-foreground">
              Currently
            </h2>
            <h3 className="text-xl md:text-2xl font-medium max-w-[680px] leading-relaxed">
              {header.currently}
            </h3>
          </motion.div>

          <motion.div
            className="col-start-3 p-6 md:p-6 col-span-6 md:col-start-7 md:col-span-3 md:my-0"
            animate={{ scale: 1, opacity: 1 }}
            initial={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASING.ENTER }}
          >
            <Image
              className="h-full w-full rounded-full drop-shadow-2xl shadow-md md:shadow-customShadow"
              src={ProfilePicture}
              placeholder="blur"
              priority
              alt="image description"
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;
