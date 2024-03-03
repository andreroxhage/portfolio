'use client';

import Image from 'next/image';
import {AnimatePresence, easeInOut, motion} from 'framer-motion';

import mockup from '@/../public/resource/joinMockup.png';
import {currentWork, resume} from '@/app/data';
import {TextRevealCard} from '../components/text-reveal-card';
import React, {useState} from 'react';
import Resume from '../components/Resume';
import {SparklesCore} from '../components/sparkles';

export default function CurrentWork() {
	const work = currentWork[0];
	const [clicked, setClicked] = useState(false);

	return (
		<section className='h-fit pt-12 md:pt-0 mb-12 flex-row items-center bg-primary-blackish'>
			<div className='max-w-9xl mx-auto h-full px-6 md:mt-8 md:pt-12 mt-3'>
				<h3 className='mt-4 md:mt-12 text-xl sm:text-3xl font-semibold text-primary-whiteish'>
					{work.sectionTitle}
				</h3>
				<div className='gap-x-8 mt-9 bg-primary-vanilla rounded-xl  grid grid-cols-10 text-2xl  text-primary-grey-brighter items-center'>
					<div className='w-full col-span-8 col-start-2 md:col-start-2 md:col-span-4 md:pt-0 my-12 pt-12'>
						<div className='flex flex-col gap-x-6'>
							<motion.h3 className='text-2xl md:text-4xl font-semibold pb-1 md:pb-4 cursor-pointer text-primary-grey'>
								{work.title}
							</motion.h3>
							<p className='text-base md:text-lg font-medium'>
								{work.description}
							</p>
							<div className='flex flex-row gap-3 mt-6'>
								{Object.values(work.tags).map((tag, index) => (
									<div
										key={index}
										className='px-4 py-2 rounded-xl border border-neutral-600 text-neutral-700 w-fit text-sm cursor-default'
									>
										{tag}
									</div>
								))}
							</div>
						</div>
					</div>

					<div className='col-start-2 col-span-8 md:col-start-7 md:col-span-4 py-6 md:my-20 pr-0 md:pr-9'>
						<Image
							className='h-full w-full rounded-sm'
							src={mockup}
							alt='image description'
						/>
					</div>
				</div>

				<div className='mt-14 md:mt-36 flex flex-row items-center justify-center gap-x-0 md:gap-x-20 md:p-0 pb-16 w-full'>
					<TextRevealCard
						text='Are You a LinkedIn Stalker?'
						revealText='Click to Reveal my resume!'
					></TextRevealCard>

					<motion.button
						onClick={() => {
							setClicked(!clicked);
						}}
						className='mx-8 inline-flex h-12 w-[188px] animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-secondary-green transition-colors  gap-x-3'
						whileHover={{scale: 1.05}}
						transition={{duration: 0.3, ease: 'easeInOut'}}
					>
						{clicked ? 'Hide' : 'Sneak Peak'}
						<svg
							width='37'
							height='14'
							viewBox='0 0 37 14'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M1.68742 7.18783C1.64716 7.06684 1.64716 6.93607 1.68742 6.81508C2.4965 4.38083 4.79309 2.625 7.49975 2.625C10.2053 2.625 12.5007 4.37908 13.3115 6.81217C13.3523 6.93292 13.3523 7.06358 13.3115 7.18492C12.503 9.61917 10.2064 11.375 7.49975 11.375C4.79425 11.375 2.49825 9.62092 1.68742 7.18783Z'
								stroke='#FAEFDE'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
							<path
								d='M9.25 7C9.25 7.46413 9.06563 7.90925 8.73744 8.23744C8.40925 8.56563 7.96413 8.75 7.5 8.75C7.03587 8.75 6.59075 8.56563 6.26256 8.23744C5.93437 7.90925 5.75 7.46413 5.75 7C5.75 6.53587 5.93437 6.09075 6.26256 5.76256C6.59075 5.43437 7.03587 5.25 7.5 5.25C7.96413 5.25 8.40925 5.43437 8.73744 5.76256C9.06563 6.09075 9.25 6.53587 9.25 7Z'
								stroke='#FAEFDE'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
							<path
								d='M23.6874 7.18783C23.6472 7.06684 23.6472 6.93607 23.6874 6.81508C24.4965 4.38083 26.7931 2.625 29.4998 2.625C32.2053 2.625 34.5007 4.37908 35.3115 6.81217C35.3523 6.93292 35.3523 7.06358 35.3115 7.18492C34.503 9.61917 32.2064 11.375 29.4998 11.375C26.7943 11.375 24.4983 9.62092 23.6874 7.18783Z'
								stroke='#FAEFDE'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
							<path
								d='M31.25 7C31.25 7.46413 31.0656 7.90925 30.7374 8.23744C30.4092 8.56563 29.9641 8.75 29.5 8.75C29.0359 8.75 28.5908 8.56563 28.2626 8.23744C27.9344 7.90925 27.75 7.46413 27.75 7C27.75 6.53587 27.9344 6.09075 28.2626 5.76256C28.5908 5.43437 29.0359 5.25 29.5 5.25C29.9641 5.25 30.4092 5.43437 30.7374 5.76256C31.0656 6.09075 31.25 6.53587 31.25 7Z'
								stroke='#FAEFDE'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
						</svg>
					</motion.button>
				</div>
			</div>

			<div className='mx-auto h-full px-6 relative w-full flex flex-col items-center justify-center overflow-hidden rounded-md'>
				<motion.div
					className='w-full absolute inset-0 h-screen'
					initial={{opacity: 1}}
					animate={{opacity: clicked ? 0 : 1}}
					transition={{duration: 0.4, ease: 'easeInOut'}}
				>
					<SparklesCore
						id='tsparticlesfullpage'
						background='transparent'
						minSize={0.6}
						maxSize={1.4}
						particleDensity={100}
						className='w-full h-full'
						particleColor='#FFFFFF'
					/>
				</motion.div>
				<Resume clicked={clicked}></Resume>
			</div>
		</section>
	);
}
