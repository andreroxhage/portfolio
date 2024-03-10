'use client';

import {resume} from '@/app/data';
import React, {useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion, useInView} from 'framer-motion';

export default function Resume() {
	const resumeRef = useRef(null);
	const resumeInView = useInView(resumeRef, {
		margin: '-100px',
		once: true,
	});

	return (
		<div
			ref={resumeRef}
			className='max-w-9xl py-6 grid sm:grid-cols-12 text-accent-brown'
		>
			{resume.map((section, index) => (
				<motion.div
					key={index}
					className={`sm:mt-0 mt-12 col-start-${index * 4 + 1} col-span-4 pr-6`}
					animate={{y: resumeInView ? 0 : 160 * (index + 1)}}
					transition={{duration: 0.5, ease: 'easeInOut'}}
				>
					{section.title == 'Education' && (
						<div className='flex gap-x-4 items-center'>
							<motion.svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='w-6 h-6 text-primary-vanilla'
								initial='hidden'
								animate='visible'
							>
								<motion.path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5'
									initial={{pathLength: 0}}
									animate={{pathLength: 1}}
									transition={{
										duration: 1,
										ease: 'easeInOut',
										delay: 0.8 + index * 0.1,
									}}
								/>
							</motion.svg>
							<motion.h3
								className='text-xl sm:text-2xl font-semibold text-primary-vanilla'
								initial={{opacity: 0}}
								animate={{opacity: resumeInView ? 1 : 0.5 - 0.08 * index}}
								transition={{
									duration: 0.5,
									ease: 'easeInOut',
									delay: 0.11 + 0.11 * index,
								}}
							>
								{section.title}
							</motion.h3>
						</div>
					)}
					{section.title == 'Experience' && (
						<div className='flex gap-x-4 items-center'>
							<motion.svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='w-6 h-6 text-primary-vanilla'
								initial='hidden'
								animate='visible'
							>
								<motion.path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z'
									initial={{pathLength: 0}}
									animate={{pathLength: 1}}
									transition={{
										duration: 1,
										ease: 'easeInOut',
										delay: 0.8 + index * 0.1,
									}}
								/>
							</motion.svg>
							<motion.h3
								className='text-xl sm:text-2xl font-semibold text-primary-vanilla'
								initial={{opacity: 0}}
								animate={{opacity: resumeInView ? 1 : 0.5 - 0.08 * index}}
								transition={{
									duration: 0.5,
									ease: 'easeInOut',
									delay: 0.11 + 0.11 * index,
								}}
							>
								{section.title}
							</motion.h3>
						</div>
					)}
					{section.title == 'Skills' && (
						<div className='flex gap-x-4 items-center'>
							<motion.svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='w-6 h-6 text-primary-vanilla'
								initial='hidden'
								animate='visible'
							>
								<motion.path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z'
									initial={{pathLength: 0}}
									animate={{pathLength: 1}}
									transition={{
										duration: 1,
										ease: 'easeInOut',
										delay: 0.8 + index * 0.1,
									}}
								/>
							</motion.svg>
							<motion.h3
								className='text-xl sm:text-2xl font-semibold text-primary-vanilla'
								initial={{opacity: 0}}
								animate={{opacity: resumeInView ? 1 : 0.5 - 0.08 * index}}
								transition={{
									duration: 0.5,
									ease: 'easeInOut',
									delay: 0.11 + 0.11 * index,
								}}
							>
								{section.title}
							</motion.h3>
						</div>
					)}

					{section.content.map((item, itemIndex) => (
						<React.Fragment key={itemIndex}>
							{item.subtitle && (
								<motion.p
									className='pt-6 text-base md:text-lg font-medium'
									initial={{opacity: 0}}
									animate={{
										opacity: resumeInView ? 1 : 0.4 - 0.12 * itemIndex,
									}}
									transition={{
										duration: 0.5,
										ease: 'easeInOut',
										delay: 0.1 + 0.11 * itemIndex,
									}}
								>
									{item.subtitle}
								</motion.p>
							)}
							{item.company && (
								<motion.p
									className='pt-1 text-base md:text-lg font-light'
									initial={{opacity: 0}}
									animate={{
										opacity: resumeInView ? 1 : 0.25 - 0.08 * itemIndex,
									}}
									transition={{
										duration: 0.5,
										ease: 'easeInOut',
										delay: 0.15 + 0.11 * itemIndex,
									}}
								>
									{item.company}
								</motion.p>
							)}
							{item.date && (
								<motion.div
									key={index}
									className='px-4 py-2 my-3 rounded-xl border border-primary-grey-brighter w-fit text-sm'
									initial={{opacity: 0}}
									animate={{
										opacity: resumeInView ? 1 : 0.25 - 0.08 * itemIndex,
									}}
									transition={{
										duration: 0.5,
										ease: 'easeInOut',
										delay: 0.2 + 0.11 * itemIndex,
									}}
								>
									{item.date}
								</motion.div>
							)}
							{item.items && (
								<motion.div
									initial={{opacity: 0}}
									animate={{
										opacity: resumeInView ? 1 : 0.25 - 0.08 * itemIndex,
									}}
									transition={{
										duration: 0.5,
										ease: 'easeInOut',
										delay: 0.1 + 0.11 * itemIndex,
									}}
								>
									{item.items.map((listItem, listItemIndex) => (
										<motion.p
											className='pt-1 text-base md:text-lg font-normal '
											key={listItemIndex}
											initial={{opacity: 0}}
											animate={{
												opacity: resumeInView ? 1 : 0.25 - 0.08 * listItemIndex,
											}}
											transition={{
												duration: 0.5,
												ease: 'easeInOut',
												delay: 0.25 + 0.11 * listItemIndex,
											}}
										>
											{listItem}
										</motion.p>
									))}
								</motion.div>
							)}
						</React.Fragment>
					))}
				</motion.div>
			))}
		</div>
	);
}
