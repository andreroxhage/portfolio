'use client';
import { motion } from 'framer-motion';
import { photo } from '@/app/data/home';

export default function Photography() {
  return (
    <div
      id="photography"
      className="bg-secondary w-full relative pt-20 sm:pt-24 md:pt-18"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-10 px-5 sm:px-6 md:px-4 md:py-40 py-16 sm:py-20 mb-16 sm:mb-20 md:mb-12">
        <div className="col-span-10 lg:col-span-5 lg:col-start-2 flex flex-col gap-y-4">
          <motion.h3
            className="text-foreground text-xl md:text-4xl font-medium tracking-tight"
            initial={{ opacity: 0, translateY: 60 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            {photo.title}
          </motion.h3>
          <motion.p
            className="text-muted-foreground text-base md:text-lg font-medium w-full sm:max-w-[680px] leading-relaxed"
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
