'use client';

import Image from 'next/image';
import {
	AnimatePresence,
	easeInOut,
	motion,
	useInView,
	useScroll,
	useTransform,
} from 'framer-motion';

import mockup from '@/../public/resource/joinMockup.png';
import {currentWork, footerLinks} from '@/app/data';
import {TextRevealCard} from '../components/text-reveal-card';
import React, {useEffect, useRef, useState} from 'react';
import Resume from '../components/Resume';
import {SparklesCore} from '../components/sparkles';
import ScrollScaleWrapper from '../components/ScrollScaleWrapper';

export default function CurrentWork() {
	const work = currentWork[0];
	const container = useRef(null);
	const resumeRef = useRef(null);

	const {scrollYProgress} = useScroll({
		target: container,
		offset: [0, 1],
	});

	const hue = useTransform(scrollYProgress, [0, 1], ['#ffffff00', '#ffffff20']);
	const op = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
	// 			<motion.div className='w-full h-full' style={{opacity: op}}></motion.div>

	return (
		<motion.section
			className='h-fit flex-row relative items-center py-12'
			style={{backgroundColor: hue}}
		>
			<div
				ref={container}
				className='max-w-9xl mx-auto h-full px-6 mt-8 md:pt-12 mb-8 md:mb-16 pt-12'
			>
				<motion.h3
					className='mt-4 md:mt-12 text-3xl md:text-5xl font-semibold text-primary-whiteish'
					initial={{opacity: 0, translateY: 60}}
					whileInView={{opacity: 1, translateY: 0}}
					transition={{duration: 0.4, ease: 'easeOut'}}
					viewport={{once: true}}
				>
					{work.sectionTitle}
				</motion.h3>
				<div className='gap-x-8 mt-9 bg-primary-vanilla rounded-xl  grid grid-cols-10 text-2xl  text-primary-grey-brighter items-center'>
					<div className='w-full col-span-8 col-start-2 md:col-start-2 md:col-span-4 md:pt-0 my-12 pt-12'>
						<div className='flex flex-col gap-x-6'>
							<motion.h3
								className='text-2xl md:text-4xl font-semibold pb-1 md:pb-4 cursor-pointer text-primary-grey'
								initial={{opacity: 0, translateY: 60}}
								whileInView={{opacity: 1, translateY: 0}}
								transition={{duration: 0.4, ease: 'easeOut'}}
								viewport={{once: true}}
							>
								{work.title}
							</motion.h3>
							<motion.p
								className='text-base md:text-lg font-medium'
								initial={{opacity: 0, translateY: 60}}
								whileInView={{opacity: 1, translateY: 0}}
								transition={{duration: 0.4, ease: 'easeOut'}}
								viewport={{once: true}}
							>
								{work.description}
							</motion.p>
							<motion.div
								className='flex flex-row gap-3 mt-6'
								initial={{opacity: 0, translateY: 60}}
								whileInView={{opacity: 1, translateY: 0}}
								transition={{duration: 0.4, ease: 'easeOut'}}
								viewport={{once: true}}
							>
								{Object.values(work.tags).map((tag, index) => (
									<div
										key={index}
										className='px-4 py-2 rounded-xl border border-neutral-600 text-neutral-700 w-fit text-sm cursor-default'
									>
										{tag}
									</div>
								))}
							</motion.div>
						</div>
					</div>

					<ScrollScaleWrapper className='col-start-2 col-span-8 md:col-start-7 md:col-span-4 py-6 md:my-20 pr-0 md:pr-9'>
						<Image
							className='h-full w-full rounded-sm'
							src={mockup}
							alt='image description'
						/>
					</ScrollScaleWrapper>
				</div>
			</div>

			<div className='mx-auto h-full px-6 w-full flex flex-col items-center justify-center overflow-hidden rounded-md'>
				<motion.div
					ref={resumeRef}
					className='pt-8 sm:pt-36 flex flex-row items-center justify-center gap-x-0 md:gap-x-20 md:p-0 sm:pb-16 pb-0 w-full'
					initial={{opacity: 0, translateY: 60}}
					whileInView={{opacity: 1, translateY: 0}}
					transition={{duration: 0.4, ease: 'easeOut'}}
					viewport={{once: true}}
				>
					<TextRevealCard
						text='Are You a LinkedIn Stalker?'
						revealText='Feel free to read!'
					></TextRevealCard>
				</motion.div>

				<Resume></Resume>
			</div>
		</motion.section>
	);
}
