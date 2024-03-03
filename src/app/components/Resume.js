'use client';

import {resume} from '@/app/data';
import React, {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';

export default function Resume({clicked}) {
	const [isClicked, setIsClicked] = useState(clicked);

	useEffect(() => {
		setIsClicked(clicked);
	}, [clicked]);

	return (
		<div className='max-w-9xl py-6 grid grid-cols-12'>
			<AnimatePresence>
				{resume.map((section, index) => (
					<motion.div
						key={index}
						className={`col-start-${index * 4 + 1} col-span-4 pr-6`}
						initial={{y: 160 * index}}
						animate={{y: isClicked ? 0 : 160 * index}}
						transition={{duration: 0.5, ease: 'easeInOut'}}
					>
						<motion.h3
							className='text-xl sm:text-2xl font-semibold text-primary-whiteish'
							initial={{opacity: 0}}
							animate={{opacity: isClicked ? 1 : 0.5 - 0.08 * index}}
							transition={{
								duration: 0.5,
								ease: 'easeInOut',
								delay: 0.11 + 0.11 * index,
							}}
						>
							{section.title}
						</motion.h3>
						{section.content.map((item, itemIndex) => (
							<React.Fragment key={itemIndex}>
								{item.subtitle && (
									<motion.p
										className='pt-6 text-base md:text-lg font-medium'
										initial={{opacity: 0}}
										animate={{opacity: isClicked ? 1 : 0.4 - 0.12 * itemIndex}}
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
										animate={{opacity: isClicked ? 1 : 0.25 - 0.08 * itemIndex}}
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
										className='px-4 py-2 my-3 rounded-xl border border-primary-grey-brighter text-primary-vanilla w-fit text-sm'
										initial={{opacity: 0}}
										animate={{opacity: isClicked ? 1 : 0.25 - 0.08 * itemIndex}}
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
										animate={{opacity: isClicked ? 1 : 0.25 - 0.08 * itemIndex}}
										transition={{
											duration: 0.5,
											ease: 'easeInOut',
											delay: 0.1 + 0.11 * itemIndex,
										}}
									>
										{item.items.map((listItem, listItemIndex) => (
											<motion.p
												className='pt-1 text-base md:text-lg font-normal'
												key={listItemIndex}
												initial={{opacity: 0}}
												animate={{
													opacity: isClicked ? 1 : 0.25 - 0.08 * listItemIndex,
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
			</AnimatePresence>
		</div>
	);
}
