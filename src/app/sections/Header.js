'use client';

import React, {useEffect, useState} from 'react';
import {useRef} from 'react';
import {motion, useAnimate, useInView, AnimatePresence} from 'framer-motion';
import Image from 'next/image';
import ProfilePicture from '../../../public/resource/profileImage.jpg';

const Header = () => {
	return (
		<header className='h-min-screen h-screen '>
			<section className='bg-primary-blackish h-2/6 md:h-1/2 flex justify-center items-start md:items-center pt-12 md:pt-0 '>
				<div className='max-w-9xl mx-auto px-6 gap-x-8 grid grid-cols-10 lg:pl-0'>
					<motion.h1
						className='sm:pl-0 pl-1 sm:col-start-2 col-start-1 text-6xl md:text-8xl lg:text-9.5xl font-bold w-full text-primary-grey-brighter'
						animate={{opacity: 1}}
						initial={{opacity: 0}}
						transition={{duration: 0.4, delay: 0.3, ease: 'easeInOut'}}
					>
						ANDRÉ
					</motion.h1>
					<motion.h1
						className='sm:col-start-2 col-start-1  text-6xl md:text-8xl lg:text-9.5xl mt-2 lg:mt-0 font-bold w-full  text-primary-grey-brighter pl-12 md:pl-0 lg:pl-28 md:mb-0 mb-12'
						animate={{opacity: 1}}
						initial={{opacity: 0}}
						transition={{duration: 0.4, delay: 0.3, ease: 'easeInOut'}}
					>
						ROXHAGE
					</motion.h1>
				</div>
			</section>
			<section className=' h-4/6 md:h-1/2 my-auto pt-12 md:pt-0 flex-row items-center relative'>
				<div className='max-w-9xl px-6 mx-auto h-full gap-x-8 grid grid-cols-10 text-2xl text-primary-grey-brighter items-center'>
					<div className='pl-1 sm:pl-0 col-span-8 col-start-2 md:col-span-5 '>
						<h3 className='text-3xl md:text-5xl font-semibold pb-1 md:pb-4 text-primary-grey'>
							Currently
						</h3>
						<h4 className='text-xl md:text-3xl font-medium'>
							Pursuing my Masters in Engineering, specializing in Information
							and Communication Technologies
						</h4>
					</div>

					<div className='col-start-4 col-span-4 md:col-start-8 md:col-span-2 my-20'>
						<Image
							className='h-full w-full rounded-full drop-shadow-2xl shadow-customShadow'
							src={ProfilePicture}
							alt='image description'
						/>
					</div>
				</div>
				<div className='absolute bottom-4 left-1/2 text-black hidden sm:inline-block'>
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
				</div>
			</section>
		</header>
	);
};

export default Header;
