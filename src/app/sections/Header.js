'use client';

import React, {useEffect, useState} from 'react';
import {useRef} from 'react';
import {motion, useAnimate, useInView, AnimatePresence} from 'framer-motion';
import Image from 'next/image';
import ProfilePicture from '../../../public/resource/profileImage.jpg';
import {header} from '@/app/data';
import {SparklesCore} from '../components/sparkles';

const Header = () => {
	/**
	 * <SparklesCore
					id='tsparticlesfullpage'
					background='transparent'
					minSize={0.6}
					maxSize={1.4}
					particleDensity={100}
					className='w-full h-full absolute z-0'
					particleColor='#FFFFFF'
				/>
	 */

	return (
		<header className='h-min-screen h-screen '>
			<section className='bg-transparent h-2/6 md:h-1/2 flex justify-center items-start md:items-center pt-12 md:pt-0 '>
				<div className='max-w-9xl mx-auto px-6 gap-x-8 grid grid-cols-10 lg:pl-0'>
					<motion.h1
						className='sm:pl-0 pl-1 sm:col-start-2 col-start-1 text-6xl md:text-8xl lg:text-9.5xl font-bold w-full text-secondary-green mix-blend-overlay'
						animate={{opacity: 1}}
						initial={{opacity: 0}}
						transition={{duration: 0.5, ease: 'easeOut'}}
					>
						ANDRÉ
					</motion.h1>
					<motion.h1
						className='sm:col-start-2 col-start-1  text-6xl md:text-8xl lg:text-9.5xl mt-2 lg:mt-0 font-bold w-full  text-secondary-green-darker mix-blend-lighten pl-12 md:pl-0 lg:pl-28 md:mb-0 mb-12'
						animate={{opacity: 1}}
						initial={{opacity: 0}}
						transition={{duration: 0.5, ease: 'easeOut'}}
					>
						ROXHAGE
					</motion.h1>
				</div>
			</section>
			<section className=' h-4/6 md:h-1/2 my-auto pt-12 md:pt-0 flex-row items-center relative bg-primary-vanilla'>
				<div className='max-w-9xl px-6 mx-auto h-full gap-x-8 grid grid-cols-10 text-2xl text-primary-grey-brighter items-center'>
					<motion.div
						className='pl-1 sm:pl-0 col-span-10 col-start-1 sm:col-span-5'
						animate={{opacity: 1, translateY: 0}}
						initial={{opacity: 0, translateY: 100}}
						transition={{duration: 0.5, ease: 'easeOut'}}
					>
						<h3 className='text-3xl md:text-5xl font-semibold pb-1 md:pb-4 text-primary-grey'>
							Currently
						</h3>
						<h4 className='text-xl md:text-3xl font-medium'>
							{header.currently}
						</h4>
					</motion.div>

					<motion.div
						className='col-start-2 p-4 md:p-0 col-span-8 md:col-start-8 md:col-span-2 my-20'
						animate={{scale: 1, opacity: 1}}
						initial={{scale: 0, opacity: 0}}
						transition={{duration: 0.5, ease: 'easeOut'}}
					>
						<Image
							className='h-full w-full rounded-full drop-shadow-2xl shadow-md md:shadow-customShadow'
							src={ProfilePicture}
							alt='image description'
						/>
					</motion.div>
				</div>
				<motion.div
					className='absolute bottom-4 right-8 text-black hidden sm:inline-block'
					animate={{opacity: [0, 1, 0]}}
					initial={{opacity: 0}}
					transition={{
						duration: 3,
						ease: 'easeInOut',
						times: [0, 0.5, 1],
						repeat: 3,
					}}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-10 h-10 text-primary-grey'
					>
						<path
							strokeWidth={3}
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3'
						/>
					</svg>
				</motion.div>
			</section>
		</header>
	);
};

export default Header;
