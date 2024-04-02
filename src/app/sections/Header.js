'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ProfilePicture from '../../../public/resource/profileImage.jpg';

import { header } from '@/app/data';

const Header = () => {
	const [isAtTop, setIsAtTop] = useState(true);
	const headerImage = '/resource/20220611-IMG_5691.jpg';

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.pageYOffset;
			setIsAtTop(scrollTop === 0); // Check if scrollTop is 0 to determine if at the top
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<header id='header' className='h-min-screen md:h-screen'>
			<section
				className='relative h-2/6 md:h-2/5 flex justify-center items-start md:items-center pt-12 md:pt-0 '
				style={{
					backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${headerImage})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
				<div className='max-w-7xl mx-auto px-4 gap-x-8 grid grid-cols-10 lg:pl-0'>
					<motion.h1
						className='md:pl-0 pl-1 md:col-start-2 col-start-1 text-6xl md:text-8xl lg:text-9xl font-semibold w-full text-primary-vanilla '
						animate={{ opacity: 0.7 }}
						initial={{ opacity: 0 }}
						transition={{ duration: 0.5, ease: 'easeOut' }}
					>
						André
					</motion.h1>
					<motion.h1
						className='md:col-start-2 col-start-1  text-6xl md:text-8xl lg:text-9xl mt-2 lg:mt-0 font-semibold w-full  text-primary-vanilla pl-12 md:pl-0 lg:pl-28 md:mb-0 mb-12 '
						animate={{ opacity: 0.6 }}
						initial={{ opacity: 0 }}
						transition={{ duration: 0.5, ease: 'easeOut' }}
					>
						Roxhage
					</motion.h1>
				</div>
			</section>
			<section className='h-4/6 md:h-3/5 my-auto pt-12 md:pt-0 flex-row items-center bg-primary-vanilla'>
				<div className='max-w-7xl px-4 mx-auto h-full gap-x-8 grid grid-cols-10 text-2xl text-primary-grey-brighter items-center'>
					<motion.div
						className='pl-1 md:pl-0 col-span-10 col-start-1 md:col-span-6'
						animate={{ opacity: 1, translateY: 0 }}
						initial={{ opacity: 0, translateY: 100 }}
						transition={{ duration: 0.5, ease: 'easeOut' }}
					>
						<h3 className='text-3xl md:text-4xl font-semibold pb-1 md:pb-2 text-primary-grey'>Currently</h3>
						<h4 className='text-xl md:text-2xl font-medium max-w-[680px]'>{header.currently}</h4>
					</motion.div>

					<motion.div
						className='col-start-3 p-4 md:p-6 col-span-6 md:col-start-7 md:col-span-3 md:my-0 sm:my-12 my-8'
						animate={{ scale: 1, opacity: 1 }}
						initial={{ scale: 0, opacity: 0 }}
						transition={{ duration: 0.5, ease: 'easeOut' }}
					>
						<Image
							className='h-full w-full rounded-full drop-shadow-2xl shadow-md md:shadow-customShadow'
							src={ProfilePicture}
							alt='image description'
						/>
					</motion.div>
				</div>
				<AnimatePresence>
					{isAtTop && (
						<motion.a
							className='absolute bottom-4 w-full group text-black hidden md:flex md:flex-row justify-center items-center gap-4'
							href='#about'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{
								duration: 0.4,
								ease: 'easeInOut',
							}}
						>
							<motion.span
								className='md:text-3xl text-2xl font-bold text-primary-grey-brighter group-hover:text-primary-grey group-hover:scale-105 duration-300 ease-in-out'
								initial={{ opacity: 0 }}
								animate={{ opacity: [0, 1] }}
								transition={{
									duration: 0.4,
									ease: 'easeInOut',
									delay: 1,
								}}
							>
								Learn more
							</motion.span>
							<motion.svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='md:w-7 md:h-7 w-5 h-5 text-secondary-green-darker group-hover:text-green-700 group-hover:scale-110 duration-300 ease-in-out'
							>
								<motion.path
									strokeWidth={3}
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3'
									initial={{ opacity: 0, pathLength: 0 }}
									animate={{
										opacity: [0, 1],
										pathLength: [0, 1],
									}}
									transition={{
										duration: 0.8,
										ease: 'easeInOut',
										delay: 0.9,
									}}
								/>
							</motion.svg>
						</motion.a>
					)}
				</AnimatePresence>
			</section>
		</header>
	);
};

export default Header;
