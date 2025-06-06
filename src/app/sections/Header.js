'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ProfilePicture from '../../../public/resource/profileImage.jpg';

import { header } from '@/app/data';

const Header = () => {
  const headerImage = '/resource/20220611-IMG_5691.jpg';

  return (
    <header id="header" className="h-min-screen md:h-screen">
      <div
        className="relative h-2/6 md:h-2/5 flex justify-center items-start md:items-center pt-12 md:pt-0 "
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${headerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 gap-x-8 grid grid-cols-10 lg:pl-0">
          <motion.h1
            className="md:pl-0 pl-1 md:col-start-2 col-start-1 text-6xl md:text-8xl lg:text-9xl font-semibold w-full text-primary-vanilla "
            animate={{ opacity: 0.7 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            André
          </motion.h1>
          <motion.h1
            className="md:col-start-2 col-start-1  text-6xl md:text-8xl lg:text-9xl mt-2 lg:mt-0 font-semibold w-full  text-primary-vanilla pl-12 md:pl-0 lg:pl-28 md:mb-0 mb-12 "
            animate={{ opacity: 0.6 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            Roxhage
          </motion.h1>
        </div>
      </div>
      <div className="h-4/6 md:h-3/5 my-auto pt-12 md:pt-0 flex-row items-center bg-primary-vanilla">
        <div className="max-w-7xl px-4 mx-auto h-full gap-x-8 grid grid-cols-10 text-2xl text-primary-grey-brighter items-center">
          <motion.div
            className="pl-1 md:pl-0 col-span-10 col-start-1 md:col-span-6"
            animate={{ opacity: 1, translateY: 0 }}
            initial={{ opacity: 0, translateY: 100 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold pb-1 md:pb-2 text-primary-grey">
              Currently
            </h2>
            <h3 className="text-xl md:text-2xl font-medium max-w-[680px]">
              {header.currently}
            </h3>
          </motion.div>

          <motion.div
            className="col-start-3 p-4 md:p-6 col-span-6 md:col-start-7 md:col-span-3 md:my-0 sm:my-12 my-8"
            animate={{ scale: 1, opacity: 1 }}
            initial={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Image
              className="h-full w-full rounded-full drop-shadow-2xl shadow-md md:shadow-customShadow"
              src={ProfilePicture}
              placeholder="blur"
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
