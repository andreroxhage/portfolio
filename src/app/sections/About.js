'use client';
import Study from '../../../public/resource/lund.jpg';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

import { useState } from 'react';
import { about } from '../data';
import ScrollScaleWrapper from '../components/ScrollScaleWrapper';

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTitleClick = index => {
    setActiveIndex(index);
  };

  return (
    <>
      <div className="bg-brand-vanilla h-fit my-auto pt-2 md:pt-0 flex-row items-center relative">
        <motion.h3
          className="max-w-7xl mx-auto px-5 sm:px-6 md:px-4 md:pt-24 pt-20 sm:pt-24 text-brand-grey text-3xl md:text-6xl font-medium pb-10 sm:pb-0"
          initial={{ opacity: 0, translateY: 60 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          About me
        </motion.h3>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-4 h-full gap-x-8 grid grid-cols-10 text-2xl text-brand-grey-brighter items-center">
          <motion.div
            className="w-full col-start-1 md:col-span-6 max-w-[660px] col-span-10 min-h-100 "
            initial={{ opacity: 0, translateY: 60 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="flex flex-row gap-x-8 sm:gap-x-10 md:gap-x-6">
              {about.map((item, index) => (
                <div key={index} className="pb-2">
                  <motion.h3
                    className={`text-xl md:text-3xl font-mediun pb-2 md:pb-4 cursor-pointer py-2 px-1 -ml-1 ${
                      activeIndex === index
                        ? 'text-primary-800'
                        : 'text-brand-grey-brighter'
                    } hover:text-secondary-green-darker`}
                    onClick={() => handleTitleClick(index)}
                    whileHover={{
                      translateY: -4,
                      color: [
                        { color: 'text-secondary-green-darker' },
                        { color: 'text-brand-grey-brighter' },
                      ],
                      transition: { duration: 0.2, ease: 'easeInOut' },
                    }}
                  >
                    {item.title}
                  </motion.h3>
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.hr
                        className="h-0.5 pt-2 col-start-1 col-end-4 border-brand-grey"
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
                      className="text-base md:text-lg font-medium md:max-w-[700px] md:col-span-5 col-span-9 w-full min-h-[240px] sm:min-h-[200px] leading-relaxed pt-2"
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
          <ScrollScaleWrapper
            fade={true}
            className="col-start-1 col-span-10 md:col-start-7 md:col-span-4 md:my-20 mt-16 mb-16 sm:mt-20 sm:mb-20"
          >
            <Image
              className="h-full w-full rounded-sm"
              src={Study}
              placeholder="blur"
              alt="Lunds university building and a clear blue sky"
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </ScrollScaleWrapper>
        </div>
      </div>
    </>
  );
}
