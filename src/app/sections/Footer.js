'use client';

import { motion } from 'framer-motion';
import { links, footerLinks } from '../data';
import MagneticWrapper from '../components/MagneticWrapper';

export default function Footer() {
	return (
		<footer className=' bg-primary-blackish overflow-x-hidden'>
			<div className='max-w-7xl mx-auto pt-20 md:pt-40 px-4'>
				<div className='max-w-7xl mx-auto gap-y-2 justify-between flex md:flex-row flex-col gap-12 pb-1 font-light'>
					<div className='md:w-3/4 w-full'>
						<span className=' text-xl md:text-2xl text-primary-vanilla font-semibold col-start-8 col-span-3'>
							Contact
							<hr className='h-0.5 pt-2 border-primary-whiteish w-full my-2' />
						</span>

						{footerLinks.map((link, i) => {
							const { title, href } = link;

							return (
								<motion.a
									key={i}
									href={href}
									className='col-start-8 col-span-3 flex items-center mb-2 text-lg md:text-xl text-primary-whiteish'
									whileHover={{
										color: '#BCE5AE',
										fill: '#BCE5AE',
										translateX: 10,
									}}
									whileTap={{ scale: 0.95 }}
									initial={{
										color: '#FEFEFE',
										fill: '#FEFEFE',
										opacity: 0,
										translateX: 0,
									}}
									viewport={{ once: true }}
									whileInView={{
										opacity: 1,
										transition: {
											delay: 0.2 * i,
											duration: 0.4,
											ease: 'easeInOut',
										},
									}}
									transition={{ duration: 0.2, ease: 'easeInOut' }}
								>
									{title}
								</motion.a>
							);
						})}
					</div>
					<div className='md:w-1/4 w-full md:mt-0 mt-10'>
						<span className=' text-xl md:text-2xl text-primary-vanilla font-semibold col-start-1 col-span-7'>
							Navigation
							<hr className='h-0.5 pt-2 border-primary-whiteish w-full my-2' />
						</span>
						{links.map((link, i) => {
							const { title, href } = link;
							return (
								<motion.a
									key={i}
									href={href}
									className='col-start-1 col-span-7 flex items-center mb-2 text-lg md:text-xl text-primary-whiteish'
									whileHover={{
										color: '#BCE5AE',
										fill: '#BCE5AE',
										translateX: 10,
									}}
									whileTap={{ scale: 0.95 }}
									initial={{
										color: '#FEFEFE',
										fill: '#FEFEFE',
										opacity: 0,
										translateX: 0,
									}}
									viewport={{ once: true }}
									whileInView={{
										opacity: 1,
										transition: {
											delay: 0.2 * i,
											duration: 0.4,
											ease: 'easeInOut',
										},
									}}
									transition={{ duration: 0.2, ease: 'easeInOut' }}
								>
									{title}
								</motion.a>
							);
						})}
					</div>
				</div>

				<div className='flex gap-12 pt-12 pb-6 mt-8'>
					<a className='flex w-3/4 items-center flex-row ' href={'#header'}>
						<span className='text-primary-grey-brighter text-sm md:text-lg font-semibold mr-6'>©2024</span>
						<span className='text-primary-grey md:text-2xl text-lg font-semibold mr-2'>André</span>
						<span className='text-primary-grey-brighter  md:text-2xl text-lg font-semibold'>Roxhage</span>
					</a>
					<div className='w-1/4 flex p-1 items-center'>
						<MagneticWrapper>
							<motion.a
								className='rounded-full h-16 w-16 bg-secondary-green items-center justify-center text-primary-grey-brighter hover:text-primary-blackish hover:bg-secondary-green-darker transition-all duration-300 ease-in-out hover:scale-110 flex'
								href={'#header'} aria-label="Scroll to top"
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={2}
									stroke='currentColor'
									className='w-6 h-6 '
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18'
									/>
								</svg>
							</motion.a>
						</MagneticWrapper>
					</div>
				</div>
			</div>
		</footer>
	);
}
