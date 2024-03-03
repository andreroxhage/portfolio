'use client';
import Study from '../../../public/resource/study.jpg';
import Image from 'next/image';
import {title} from 'process';
import {AnimatePresence, motion} from 'framer-motion';

import React, {useState} from 'react';
import {about} from '../data';

export default function About() {
	const [activeIndex, setActiveIndex] = useState(0);

	const handleTitleClick = (index) => {
		setActiveIndex(index);
	};

	return (
		<>
			<section className='h-fit my-auto pt-14 md:pt-0 flex-row items-center relative'>
				<div className='max-w-9xl mx-auto px-6 h-full gap-x-8 grid grid-cols-10 text-2xl text-primary-grey-brighter items-center'>
					<div className='pl-1 w-full sm:pl-0 col-span-8 col-start-2 md:col-span-5'>
						<div className='flex flex-row gap-x-6'>
							{about.map((item, index) => (
								<div key={index}>
									<motion.h3
										className={`text-xl md:text-3xl font-semibold pb-1 md:pb-4 cursor-pointer  ${
											activeIndex === index
												? 'text-primary-grey'
												: 'text-primary-grey-brighter'
										} hover:text-secondary-green-darker`}
										onClick={() => handleTitleClick(index)}
										whileHover={{
											color: [
												{color: 'text-secondary-green-darker'},
												{color: 'text-primary-grey-brighter'},
											],
											transition: {duration: 0.2},
										}}
									>
										{item.title}
									</motion.h3>
									<AnimatePresence>
										{activeIndex === index && (
											<motion.hr
												className='h-0.5 pt-2 col-start-1 col-end-4 border-primary-grey'
												initial={{width: '0%'}}
												animate={{width: '100%'}}
												exit={{width: '0%'}}
												transition={{duration: 0.4, ease: 'easeInOut'}}
												key='line'
											/>
										)}
									</AnimatePresence>
								</div>
							))}
						</div>

						{about.map((item, index) => (
							<p
								key={index}
								className={`text-base md:text-lg font-medium ${
									activeIndex === index ? 'visible' : 'hidden'
								}`}
							>
								{item.description}
							</p>
						))}
					</div>

					<div className='col-start-2 col-span-8 md:col-start-7 md:col-span-4 my-20'>
						<Image
							className='h-full w-full rounded-sm'
							src={Study}
							alt='image description'
						/>
					</div>
				</div>
			</section>
		</>
	);
}
