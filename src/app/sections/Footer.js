'use client';

import { motion } from 'framer-motion';
import { links, footerLinks } from '../data';
import MagneticWrapper from '../components/MagneticWrapper';

export default function Footer() {
  return (
    <footer className="bg-brand-blackish overflow-x-hidden">
      <div className="max-w-7xl mx-auto pt-24 sm:pt-32 md:pt-40 px-5 sm:px-6 md:px-4">
        <div className="grid grid-cols-10 gap-y-4 sm:gap-y-2 justify-between pb-1 font-light">
          <div className="col-span-10 md:col-span-6 w-full">
            <span className="text-xl md:text-2xl text-brand-vanilla font-medium col-start-8 col-span-3">
              Contact
              <hr className="h-0.5 pt-2 border-brand-whiteish md:zmr-12 my-3 sm:my-2" />
            </span>

            {footerLinks.map((link, i) => {
              const { title, href } = link;

              return (
                <motion.a
                  key={i}
                  href={href}
                  className="col-start-8 col-span-3 flex items-center mb-3 sm:mb-2 text-lg md:text-xl text-brand-whiteish py-1 -ml-1 pl-1"
                  whileHover={{
                    color: '#BCE5AE',
                    fill: '#BCE5AE',
                    translateX: 10,
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{
                    color: '#FEFEFE',
                    fill: '#FEFEFE',
                    opacity: 0,
                    translateX: 0,
                  }}
                  viewport={{ once: true }}
                  whileInView={{
                    opacity: 1,
                    transition: {
                      delay: 0.2 * i,
                      duration: 0.4,
                      ease: 'easeInOut',
                    },
                  }}
                  transition={{
                    duration: 0.2,
                    ease: 'easeInOut',
                  }}
                >
                  {title}
                </motion.a>
              );
            })}
          </div>
          <div className="col-span-10 md:col-span-4 w-full md:mt-0 mt-12 sm:mt-14">
            <span className="text-xl md:text-2xl text-brand-vanilla font-medium col-start-1 col-span-7">
              Navigation
              <hr className="h-0.5 pt-2 border-brand-whiteish w-full my-3 sm:my-2" />
            </span>
            {links.map((link, i) => {
              const { title, href } = link;
              return (
                <motion.a
                  key={i}
                  href={href}
                  className="col-start-1 col-span-7 flex items-center mb-3 sm:mb-2 text-lg md:text-xl text-brand-whiteish py-1 -ml-1 pl-1"
                  whileHover={{
                    color: '#BCE5AE',
                    fill: '#BCE5AE',
                    translateX: 10,
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{
                    color: '#FEFEFE',
                    fill: '#FEFEFE',
                    opacity: 0,
                    translateX: 0,
                  }}
                  viewport={{ once: true }}
                  whileInView={{
                    opacity: 1,
                    transition: {
                      delay: 0.2 * i,
                      duration: 0.4,
                      ease: 'easeInOut',
                    },
                  }}
                  transition={{
                    duration: 0.2,
                    ease: 'easeInOut',
                  }}
                >
                  {title}
                </motion.a>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-12 pt-16 sm:pt-12 pb-8 sm:pb-6 mt-8">
          <a className="flex w-3/4 items-center flex-row py-2" href={'#header'}>
            <span className="text-brand-grey text-sm md:text-lg font-medium mr-6">
              ©2024
            </span>
            <span className="text-brand-grey-brighter md:text-2xl text-lg font-medium mr-2">
              André
            </span>
            <span className="text-brand-grey-brighter md:text-2xl text-lg font-medium">
              Roxhage
            </span>
          </a>
          <div className="w-1/4 flex p-1 items-center">
            <MagneticWrapper>
              <motion.a
                className="rounded-full h-16 w-16 bg-secondary-green items-center justify-center text-brand-grey-brighter hover:text-brand-blackish hover:bg-secondary-green-darker transition-all duration-300 ease-in-out hover:scale-110 flex"
                href={'#header'}
                aria-label="Scroll to top"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                  />
                </svg>
              </motion.a>
            </MagneticWrapper>
          </div>
        </div>
      </div>
    </footer>
  );
}
