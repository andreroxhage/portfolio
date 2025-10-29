'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import mockup1 from '@/../public/resource/joinMockup1.png';
import mockup2 from '@/../public/resource/joinMockup2.png';
import { currentWork } from '@/app/data';
import { useRef } from 'react';
import ScrollScaleWrapper from '../components/ScrollScaleWrapper';
import ImageFader from '../components/ImageFader';
import Link from 'next/link';

export default function CurrentWork() {
  const work = currentWork[0];
  const container = useRef(null);
  const imageFader = [mockup1, mockup2];

  const { scrollYProgress } = useScroll({
    target: container,
    offset: [0, 1],
  });

  const hue = useTransform(scrollYProgress, [0, 1], ['#ffffff00', '#ffffff32']);

  return (
    <motion.div
      id="work"
      className={`flex-row items-center pt-16 sm:pt-20 md:pt-24 h-screen pb-12 sm:pb-16 md:pb-48`}
      style={{ backgroundColor: hue }}
    >
      <div className="max-w-7xl mx-auto h-screen px-5 sm:px-6 md:px-4 md:pt-12 pt-4">
        <Link
          href="/projects"
          ref={container}
          className="pt-6 md:pt-12 flex gap-4 items-end justify-between group"
        >
          <motion.h3
            className="text-3xl md:text-5xl font-medium text-brand-whiteish"
            initial={{ opacity: 0, translateY: 60 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            {work.sectionTitle}
          </motion.h3>
          <div className="cursor-pointer flex items-end">
            <motion.span
              className="text-base md:text-lg font-medium text-brand-whiteish hover:text-secondary-green cursor-pointer group-hover:text-secondary-green"
              initial={{ opacity: 0, translateY: 60 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              viewport={{ once: true }}
              whileHover={{
                translateY: -4,
                transition: { duration: 0.2, ease: 'easeInOut' },
              }}
            >
              See projects
            </motion.span>
          </div>
        </Link>
        <div className="gap-x-8 mt-8 sm:mt-9 bg-brand-vanilla rounded-xl grid grid-cols-10 text-2xl text-brand-grey-brighter items-center">
          <div className="w-full col-start-1 px-5 sm:px-6 col-span-10 md:px-0 md:col-start-2 md:col-span-5 max-w-[650px] md:pt-0 py-10 sm:py-12 md:my-12">
            <div className="flex flex-col gap-y-4">
              <motion.h3
                className="text-2xl md:text-4xl font-medium cursor-pointer text-brand-grey"
                initial={{ opacity: 0, translateY: 60 }}
                whileInView={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                viewport={{ once: true }}
              >
                {work.title}
              </motion.h3>
              <motion.p
                className="text-base md:text-lg font-medium leading-relaxed"
                initial={{ opacity: 0, translateY: 60 }}
                whileInView={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                viewport={{ once: true }}
              >
                {work.description}
              </motion.p>
            </div>
          </div>

          <ScrollScaleWrapper
            fade={true}
            className="col-start-2 col-span-8 md:col-start-7 md:col-span-4 py-10 sm:py-12 md:my-20 pr-0 md:pr-9"
          >
            <ImageFader images={imageFader} intervalTime={5000} />
          </ScrollScaleWrapper>
        </div>
      </div>
      {/*

      Projects
      <div className="max-w-7xl mx-auto h-full px-4 mt-8 md:pt-12 mb-8 md:mb-16 pt-4">
        <Link
          href={'/projects'}
          className="mt-4 group md:mt-12 flex gap-4 text-brand-whiteish justify-between"
        >
          <motion.h3
            className="text-3xl md:text-5xl font-medium cursor-pointer text-brand-whiteish group-hover:text-secondary-green"
            initial={{ opacity: 0, translateY: 60 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            viewport={{ once: true }}
            whileHover={{
              translateY: -4,
              transition: { duration: 0.2, ease: 'easeInOut' },
            }}
          >
            Projects
          </motion.h3>
          <div className="group cursor-pointer flex items-end">
            <motion.label
              className="text-base md:text-lg font-medium text-brand-whiteish group-hover:text-secondary-green cursor-pointer"
              whileHover={{
                translateY: -4,
                transition: { duration: 0.2, ease: 'easeInOut' },
              }}
            >
              See all
            </motion.label>
          </div>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-9">
          {Object.values(p)
            .slice(0, 2)
            .map((project, index) => (
              <Link
                key={index}
                href={`/projects/${project.projectSlug}`}
                className="bg-brand-vanilla rounded-xl p-4 group hover:bg-secondary-green-lighter active:bg-secondary-green-darker transition-all duration-300 ease-in-out"
              >
                <div className="flex flex-col h-full">
                  <div className="flex w-full justify-between">
                    <motion.h3
                      className="text-2xl md:text-3xl font-medium cursor-pointer text-brand-grey"
                      initial={{ opacity: 0, translateY: 60 }}
                      whileInView={{
                        opacity: 1,
                        translateY: 0,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: 'easeOut',
                      }}
                      viewport={{ once: true }}
                    >
                      {project.title}
                    </motion.h3>
                    <ArrowUpRightIcon className="size-8 sm:size-10 md:size-12 text-brand-grey group-hover:scale-110 transition-all duration-300 ease-in-out"></ArrowUpRightIcon>
                  </div>
                  <motion.p
                    className="text-lg md:text-xl font-medium text-secondary-grey  text-brand-grey"
                    initial={{ opacity: 0, translateY: 20 }}
                    whileInView={{
                      opacity: 1,
                      translateY: 0,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: 'easeOut',
                      delay: 0.1,
                    }}
                  >
                    {project.subtitle}
                  </motion.p>

                  <MagneticWrapper magneticStrength={0.2}>
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      className="w-full p-12 sm:p-14 md:p-16 lg:p-20 items-center justify-center inline-block rounded-lg hover:scale-105 duration-200 ease-in-out"
                      width={500}
                      height={500}
                    />
                  </MagneticWrapper>
                </div>
              </Link>
            ))}
        </div>
      </div>
      */}
      {/*
        About
      <div className="max-w-7xl mx-auto h-full px-4 mt-8 md:pt-12 mb-8 md:mb-16 pt-4">
        <Link
          href={'/projects'}
          className="mt-4 group md:mt-12 flex gap-4 text-brand-whiteish justify-between"
        >
          <motion.h3
            className="text-3xl md:text-5xl font-medium cursor-pointer text-brand-whiteish group-hover:text-secondary-green"
            initial={{ opacity: 0, translateY: 60 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            viewport={{ once: true }}
            whileHover={{
              translateY: -4,
              transition: { duration: 0.2, ease: 'easeInOut' },
            }}
          >
            Projects
          </motion.h3>
          <div className="group cursor-pointer flex items-end">
            <motion.label
              className="text-base md:text-lg font-medium text-brand-whiteish group-hover:text-secondary-green cursor-pointer"
              whileHover={{
                translateY: -4,
                transition: { duration: 0.2, ease: 'easeInOut' },
              }}
            >
              See all
            </motion.label>
          </div>
        </Link>
      </div>
      */}
      {/*  
      <div className="mx-auto h-full px-4 w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
        <motion.div
          id="about"
          ref={resumeRef}
          className="pt-0 sm:pt-36 flex flex-row items-center justify-center gap-x-0 md:gap-x-20 md:p-0 sm:pb-16 pb-0 w-full"
          initial={{ opacity: 0, translateY: 60 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <TextRevealCard
            text="Are You a LinkedIn Stalker?"
            revealText="Feel free to read!"
          ></TextRevealCard>
        </motion.div>

   <Resume></Resume> 
      </div>
      */}
    </motion.div>
  );
}
