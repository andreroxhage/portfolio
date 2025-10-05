'use client';
import { motion } from 'framer-motion';
import { photo } from '../data.js';

export default function Photography() {
  return (
    <div
      id="photography"
      className="bg-brand-vanilla w-full relative pt-20 sm:pt-24 md:pt-24"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-10 px-5 sm:px-6 md:px-4 md:py-40 py-16 sm:py-20 mb-16 sm:mb-20 md:mb-12">
        <div className="sm:col-span-5 col-start-1 col-span-10 flex items-center">
          <motion.h3
            className="text-brand-grey text-xl md:text-4xl font-medium"
            initial={{ opacity: 0, translateY: 60 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            {photo.title}
          </motion.h3>
        </div>
        <div className="sm:col-start-6 sm:col-span-5 col-start-1 col-span-10 md:mt-0 mt-8 sm:mt-10">
          <motion.p
            className="text-brand-grey-brighter text-base md:text-lg font-medium w-full sm:max-w-[680px] leading-relaxed"
            initial={{ opacity: 0, translateY: 60 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            {photo.description}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
