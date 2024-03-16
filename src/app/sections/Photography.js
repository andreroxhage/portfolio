'use client';
import ZoomParallax from '../components/ZoomParallax/ZoomParallax.js';
import {motion} from 'framer-motion';
import {photo} from '../data.js';

export default function Photography() {
	return (
		<section className='bg-primary-vanilla w-full relative'>
			<div className='max-w-9xl mx-auto w-full grid grid-cols-10 px-6 py-40 mb-12'>
				<div className='col-start-2 col-span-3'>
					<motion.h3
						className='text-primary-grey text-xl md:text-3xl'
						initial={{opacity: 0, translateY: 60}}
						whileInView={{opacity: 1, translateY: 0}}
						transition={{duration: 0.4, ease: 'easeOut'}}
						viewport={{once: true}}
					>
						{photo.title}
					</motion.h3>
				</div>
				<div className='col-start-6 col-span-3'>
					<motion.p
						className='text-primary-grey-brighter text-base md:text-lg font-medium w-[700px]'
						initial={{opacity: 0, translateY: 60}}
						whileInView={{opacity: 1, translateY: 0}}
						transition={{duration: 0.4, ease: 'easeOut'}}
						viewport={{once: true}}
					>
						{photo.description}
					</motion.p>
				</div>
			</div>
		</section>
	);
}
