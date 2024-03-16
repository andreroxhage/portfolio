'use client';
import Study from '../../../public/resource/study.jpg';
import karneval from '../../../public/resource/work/karneval.jpg';
import karneval1 from '../../../public/resource/work/karneval1.jpg';
import karneval2 from '../../../public/resource/work/karneval2.jpg';
import teknikfokus from '../../../public/resource/work/teknikfokus.png';
import teknikfokus1 from '../../../public/resource/work/teknikfokus1.jpg';

import Image from 'next/image';
import {title} from 'process';
import {
	AnimatePresence,
	motion,
	useInView,
	useMotionValue,
	useScroll,
	useSpring,
	useTransform,
} from 'framer-motion';

import React, {useEffect, useRef, useState} from 'react';
import {VoluntaryProjects} from '../data';
import {once} from 'events';
import ScrollScaleWrapperNoFade from '../components/ScrollScaleWrapperNoFade';

export default function VoluntaryWork() {
	return (
		<section className='bg-primary-vanilla'>
			<div className='max-w-9xl mx-auto px-6 h-full gap-x-8 grid grid-cols-10 text-2xl text-primary-grey-brighter items-center'>
				<motion.h3
					className='mt-4 mb-9 md:mt-12 col-span-3 text-3xl md:text-5xl font-semibold text-primary-grey'
					initial={{opacity: 0, translateY: 60}}
					whileInView={{opacity: 1, translateY: 0}}
					transition={{duration: 0.4, ease: 'easeOut'}}
					viewport={{once: true}}
				>
					{VoluntaryProjects[2].sectionTitle}
				</motion.h3>
			</div>
			<div className='h-fit my-auto md:pt-0 flex-row items-center relative pb-16'>
				<div className='mx-auto h-full grid grid-cols-10 text-2xl text-primary-grey-brighter items-center'>
					<motion.div className='col-start-1 col-span-5 relative'>
						<ScrollScaleWrapperNoFade className='w-1/3 absolute top-[16%] left-[22%] z-20'>
							<Image src={karneval1} alt='image description' />
						</ScrollScaleWrapperNoFade>
						<ScrollScaleWrapperNoFade className='w-1/3 absolute top-[42%] left-[42%] z-30'>
							<Image src={karneval2} alt='image description' />
						</ScrollScaleWrapperNoFade>

						<Image
							className='w-full rounded-sm'
							src={karneval}
							alt='image description'
						/>
					</motion.div>
					<motion.div
						className=' w-full h-full col-span-4 max-w-xl col-start-7'
						initial={{opacity: 0, translateY: 60}}
						whileInView={{opacity: 1, translateY: 0}}
						transition={{duration: 0.4, ease: 'easeOut'}}
						viewport={{once: true}}
					>
						<div className='flex flex-col gap-x-6 justify-center items-start w-full h-full'>
							<motion.h5
								className='text-xl md:text-3xl font-semibold pb-1 md:pb-4'
								initial={{opacity: 0, translateY: 60}}
								whileInView={{opacity: 1, translateY: 0}}
								transition={{duration: 0.4, ease: 'easeOut'}}
								viewport={{once: true}}
							>
								{VoluntaryProjects[0].title}
							</motion.h5>
							<motion.p
								className='text-base md:text-lg font-medium max-w-[700px]'
								initial={{opacity: 0, translateY: 60}}
								whileInView={{opacity: 1, translateY: 0}}
								transition={{duration: 0.4, ease: 'easeOut'}}
								viewport={{once: true}}
							>
								{VoluntaryProjects[0].description}
							</motion.p>
						</div>
					</motion.div>
				</div>

				<div className='mx-auto h-full grid grid-cols-10 text-2xl text-primary-grey-brighter items-center'>
					<motion.div
						className='w-full h-full col-span-3 max-w-xl col-start-2'
						initial={{opacity: 0, translateY: 60}}
						whileInView={{opacity: 1, translateY: 0}}
						transition={{duration: 0.4, ease: 'easeOut'}}
						viewport={{once: true}}
					>
						<div className='flex flex-col gap-x-6 justify-center items-start w-full h-full'>
							<motion.h5
								className='text-xl md:text-3xl font-semibold pb-1 md:pb-4'
								initial={{opacity: 0, translateY: 60}}
								whileInView={{opacity: 1, translateY: 0}}
								transition={{duration: 0.4, ease: 'easeOut'}}
								viewport={{once: true}}
							>
								{VoluntaryProjects[1].title}
							</motion.h5>
							<motion.p
								className='text-base md:text-lg font-medium max-w-[700px]'
								initial={{opacity: 0, translateY: 60}}
								whileInView={{opacity: 1, translateY: 0}}
								transition={{duration: 0.4, ease: 'easeOut'}}
								viewport={{once: true}}
							>
								{VoluntaryProjects[1].description}
							</motion.p>
						</div>
					</motion.div>
					<motion.div className='col-start-6 col-span-5 relative'>
						<ScrollScaleWrapperNoFade className='w-1/3 absolute top-1/3 left-1/3 z-20'>
							<Image src={teknikfokus1} alt='image description' />
						</ScrollScaleWrapperNoFade>

						<Image
							className='w-full rounded-sm'
							src={teknikfokus}
							alt='image description'
						/>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
