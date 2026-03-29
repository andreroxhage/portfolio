'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { about } from '@/app/data/home';

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTitleClick = index => {
    setActiveIndex(index);
  };

  return (
    <>
      <div className="bg-secondary h-fit my-auto flex-row items-center relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-4 h-full gap-x-8 grid grid-cols-10 text-2xl text-muted-foreground align-items-center">
          <motion.div
            className="w-full lg:col-start-1 lg:col-span-6 max-w-[660px] col-span-10 min-h-100 "
            initial={{ opacity: 0, translateY: 60 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <motion.h3
              className="mx-auto text-foreground text-2xl md:text-4xl font-medium pb-4"
              initial={{ opacity: 0, translateY: 60 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              About me
            </motion.h3>
            <div className="flex flex-row gap-x-8 sm:gap-x-10 md:gap-x-6">
              {about.map((item, index) => (
                <div key={index} className="pb-2">
                  <motion.h4
                    className={`text-base md:text-lg font-medium pb-1 md:pb-2 cursor-pointer py-2 px-1 -ml-1 ${
                      activeIndex === index
                        ? 'text-primary-800 dark:text-primary-300'
                        : 'text-muted-foreground'
                    } hover:text-accent-foreground`}
                    onClick={() => handleTitleClick(index)}
                    whileHover={{
                      translateY: -4,
                      color: 'oklch(var(--accent-foreground))',
                      transition: { duration: 0.2, ease: 'easeInOut' },
                    }}
                  >
                    {item.title}
                  </motion.h4>
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.hr
                        className="h-0.5 w-full rounded-full border-0 bg-primary-700"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        exit={{ width: '0%' }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        key="line"
                      />
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            <AnimatePresence mode="wait">
              {about.map(
                (item, index) =>
                  activeIndex === index && (
                    <motion.p
                      key={index}
                      className="text-base md:text-lg font-medium md:max-w-[700px] md:col-span-5 col-span-9 w-full min-h-[240px] sm:min-h-[200px] leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      {item.description}
                    </motion.p>
                  )
              )}
            </AnimatePresence>
          </motion.div>
          {/*
          <ScrollScaleWrapper
            fade={true}
            className="col-start-1 col-span-10 md:col-start-7 md:col-span-4 flex-row items-center hidden lg:flex"
          >
            <Image
              className="h-full w-full rounded-[2px] corner-squircle"
              src={Study}
              placeholder="blur"
              alt="Lunds university building and a clear blue sky"
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </ScrollScaleWrapper>
          */}
        </div>
      </div>
    </>
  );
}
