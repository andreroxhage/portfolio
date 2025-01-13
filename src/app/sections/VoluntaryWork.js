'use client';
import karneval from '../../../public/resource/work/karneval.jpg';
import karneval1 from '../../../public/resource/work/karneval1.jpg';
import karneval2 from '../../../public/resource/work/karneval2.jpg';
import teknikfokus from '../../../public/resource/work/teknikfokus.png';
import teknikfokus1 from '../../../public/resource/work/teknikfokus1.jpg';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { VoluntaryProjects } from '../data';
import ScrollScaleWrapper from '../components/ScrollScaleWrapper';

export default function VoluntaryWork() {
  return (
    <div id="voluntary-work" className="bg-primary-vanilla">
      <div className="max-w-7xl mx-auto px-4 h-full gap-x-8 grid grid-cols-10 text-2xl text-primary-grey-brighter items-center">
        <motion.h3
          className="pt-4 pb-5 md:pb-9 md:pt-12 md:col-span-10 col-span-10 text-3xl md:text-5xl font-semibold text-primary-grey"
          initial={{ opacity: 0, translateY: 60 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          {VoluntaryProjects[2].sectionTitle}
        </motion.h3>
      </div>
      <div className="h-fit md:pt-0 flex-row items-center relative">
        <div className="mx-auto h-full grid grid-cols-10 text-2xl text-primary-grey-brighter items-center">
          <motion.div className="px-4 md:px-0 col-start-1 md:col-span-5 col-span-10 relative">
            <ScrollScaleWrapper
              scaleFrom={0.8}
              scaleTo={1.1}
              className="w-1/3 absolute top-[16%] left-[22%] z-20"
            >
              <Image
                src={karneval1}
                alt="image description"
                placeholder="blur"
                priority={true}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </ScrollScaleWrapper>
            <ScrollScaleWrapper
              scaleFrom={0.78}
              scaleTo={1.12}
              className="w-1/3 absolute top-[42%] left-[42%] z-30"
            >
              <Image
                src={karneval2}
                alt="image description"
                placeholder="blur"
                priority={true}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </ScrollScaleWrapper>

            <Image
              className="w-full rounded-sm"
              src={karneval}
              alt="image description"
              placeholder="blur"
              priority={true}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </motion.div>
          <motion.div
            className="md:px-0 w-full h-full md:col-span-5 md:col-start-6 md:mt-0 mt-6 col-span-10 col-start-1"
            initial={{ opacity: 0, translateY: 60 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col gap-x-6 px-4 sm:px-16 justify-center items-start w-full h-full">
              <motion.h4
                className="text-xl md:text-3xl font-semibold pb-1 md:pb-4"
                initial={{ opacity: 0, translateY: 60 }}
                whileInView={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                viewport={{ once: true }}
              >
                {VoluntaryProjects[0].title}
              </motion.h4>
              <motion.p
                className="text-base md:text-lg font-medium max-w-[700px] pb-6"
                initial={{ opacity: 0, translateY: 60 }}
                whileInView={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                viewport={{ once: true }}
              >
                {VoluntaryProjects[0].description}
              </motion.p>
              <motion.p
                className="text-xs md:text-sm text-right font-medium w-full pb-1"
                initial={{ opacity: 0, translateY: 60 }}
                whileInView={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                viewport={{ once: true }}
              >
                {VoluntaryProjects[0].year}
              </motion.p>
            </div>
          </motion.div>
        </div>

        <div className="mx-auto mt-12 md:mt-0 h-full md:grid flex flex-col-reverse md:grid-cols-10 text-2xl text-primary-grey-brighter items-center pt-5 pb-14 md:pb-0 md:pt-0">
          <motion.div
            className="px-4 md:px-0 w-full h-full md:col-span-5 md:col-start-1 md:mt-0 mt-6 md:pb-0 pb-5 col-span-10 col-start-1"
            initial={{ opacity: 0, translateY: 60 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col gap-x-6 px-4 sm:px-16 justify-center items-start w-full h-full">
              <motion.h4
                className="text-xl md:text-3xl font-semibold pb-1 md:pb-4"
                initial={{ opacity: 0, translateY: 60 }}
                whileInView={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                viewport={{ once: true }}
              >
                {VoluntaryProjects[1].title}
              </motion.h4>
              <motion.p
                className="text-base md:text-lg font-medium max-w-[700px] pb-6"
                initial={{ opacity: 0, translateY: 60 }}
                whileInView={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                viewport={{ once: true }}
              >
                {VoluntaryProjects[1].description}
              </motion.p>
              <motion.p
                className="text-xs md:text-sm text-right font-medium w-full pb-1"
                initial={{ opacity: 0, translateY: 60 }}
                whileInView={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                viewport={{ once: true }}
              >
                {VoluntaryProjects[1].year}
              </motion.p>
            </div>
          </motion.div>
          <motion.div className="px-4 md:px-0 col-start-6 col-span-5 relative">
            <ScrollScaleWrapper
              scaleFrom={0.8}
              scaleTo={1.1}
              className="w-1/3 absolute top-1/3 left-1/3 z-20"
            >
              <Image
                src={teknikfokus1}
                alt="image description"
                placeholder="blur"
                priority={true}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </ScrollScaleWrapper>

            <Image
              className="w-full rounded-sm"
              src={teknikfokus}
              alt="image description"
              placeholder="blur"
              priority={true}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
