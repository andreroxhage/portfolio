'use client';
import {motion} from 'framer-motion';
import {useEffect, useState} from 'react';
import {useMotionValue, useSpring} from 'framer-motion';
import {footerLinks} from '../data';

export default function Contact() {
	const cursorX = useMotionValue(50); // 50
	const cursorY = useMotionValue(50);
	const springConfig = {damping: 24, stiffness: 500}; // 25 500
	const cursorXSpring = useSpring(cursorX, springConfig);
	const cursorYSpring = useSpring(cursorY, springConfig);
	const [cursorEnable, setCursorEnable] = useState(false);

	function toTop() {
		window.scrollTo(0, 0);
	}

	const backgroundImage = '/resource/20220611-IMG_5691.jpg'; // 20220611-IMG_5691 or familjen.jpg

	useEffect(() => {
		const footerContainer = document.getElementById('footer-container');
		const moveCursor = (e) => {
			if (footerContainer.contains(e.target)) {
				cursorX.set(e.clientX - 64);
				cursorY.set(e.clientY - 64);
				setCursorEnable(true);
			} else {
				setCursorEnable(false);
			}
		};

		// Update the time every second
		setInterval(() => {
			setTime(new Date().toLocaleTimeString('sv-SE'));
		}, 60000);

		const resetCursor = () => {
			cursorX.set(e.clientX);
			cursorY.set(e.clientY);
		};

		window.addEventListener('mousemove', moveCursor);
		window.addEventListener('mouseleave', resetCursor);

		return () => {
			window.removeEventListener('mousemove', moveCursor);
		};
	}, []);

	useEffect(() => {
		// Disable scroll bar for the whole HTML document
		document.body.style.overflowX = 'hidden';

		return () => {
			// Enable scroll bar when the component is unmounted
			document.body.style.overflowX = 'hidden';
		};
	}, []);

	return (
		<>
			<div
				id='contact'
				className='absolute z-10 h-screen w-full pointer-events-none overflow-hidden rounded-3xl'
				style={{
					backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)), url(${backgroundImage})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
				<div className='flex flex-col justify-between overflow-hidden w-full pointer-events-auto h-screen rounded-2xl'>
					<div
						id='footer-container'
						className='max-w-9xl mx-auto w-full h-4/6 cursor-none overflow-hidden rounded-3xl'
					>
						<div className='gap-8 m-auto grid grid-cols-10 h-full my-auto'>
							<div className='flex items-center col-start-2 md:col-start-1 md:col-span-6 col-span-8 md:mt-0 mt-20'>
								<motion.h2
									className='md:text-6xl text-5xl text-primary-foreground leading-tight font-bold'
									initial={{opacity: 0, translateY: 60}}
									whileInView={{opacity: 1, translateY: 0}}
									transition={{duration: 0.4, ease: 'easeOut'}}
									viewport={{once: true}}
								>
									Are you ready to connect?
								</motion.h2>
							</div>
							<div className='flex col-start-7 col-span-2 justify-center touch-none overflow-hidden'>
								<a href='mailto:andreroxhage74@gmail.com'>
									<motion.button
										className='overflow-x-hidden cursor-none absolute left-0 top-0 w-32 h-32 rounded-full text-primary-blackish bg-secondary-green overflow-hidden mix-blend-hard-light'
										style={{
											translateX: cursorXSpring,
											translateY: cursorYSpring,
										}}
										animate={{
											opacity: cursorEnable ? 1 : 0,
											scale: cursorEnable ? 1 : 0,
											duration: 0.3,
											ease: 'easeInOut',
										}}
									>
										Connect
									</motion.button>
								</a>
							</div>
						</div>
					</div>

					<div
						id='contact-info'
						className='max-w-9xl w-full mx-auto overflow-hidden text-primary-foreground h-2/6 pointer-events-auto'
					>
						<div className='gap-y-1 grid grid-cols-10 mx-auto'>
							<hr className='h-0.5 pt-2 border-primary-800 col-start-2 md:col-start-1 col-end-4' />

							{footerLinks.map((link, i) => {
								const {title, href} = link;

								return (
									<motion.a
										key={i}
										href={href}
										className='col-start-2 md:col-start-1 col-span-6 flex gap-x-2 items-center'
										whileHover={{color: '#BCE5AE', fill: '#BCE5AE'}}
										whileTap={{scale: 0.95}}
										initial={{
											color: '#FEFEFE',
											fill: '#FEFEFE',
											opacity: 0,
										}}
										viewport={{once: true}}
										whileInView={{
											opacity: 1,
											transition: {
												delay: 0.2 * i,
												duration: 0.4,
												ease: 'easeInOut',
											},
										}}
										transition={{duration: 0.2, ease: 'easeInOut'}}
									>
										{title === 'LinkedIn' && (
											<svg
												xmlns='http://www.w3.org/2000/svg'
												version='1.1'
												class='w-4 h-4'
												viewBox='0 0 100 100'
											>
												<path d='M 1.48 29.91 h 18.657 v 60.01 H 1.48 V 29.91 z M 10.809 0.08 c 5.963 0 10.809 4.846 10.809 10.819 c 0 5.967 -4.846 10.813 -10.809 10.813 C 4.832 21.712 0 16.866 0 10.899 C 0 4.926 4.832 0.08 10.809 0.08' />
												<path d='M 31.835 29.91 h 17.89 v 8.206 h 0.255 c 2.49 -4.72 8.576 -9.692 17.647 -9.692 C 86.514 28.424 90 40.849 90 57.007 V 89.92 H 71.357 V 60.737 c 0 -6.961 -0.121 -15.912 -9.692 -15.912 c -9.706 0 -11.187 7.587 -11.187 15.412 V 89.92 H 31.835 V 29.91 z' />
											</svg>
										)}
										{title === 'andreroxhage74@gmail.com' && (
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												stroke-width='1.5'
												stroke='currentColor'
												class='w-4 h-4'
											>
												<path
													stroke-linecap='round'
													stroke-linejoin='round'
													d='M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5'
												/>
											</svg>
										)}
										{title === 'GitHub' && (
											<svg
												xmlns='http://www.w3.org/2000/svg'
												class='w-4 h-4'
												viewBox='0 0 24 24'
											>
												<path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
											</svg>
										)}
										<p className='text-xl md:text-2xl'>{title}</p>
									</motion.a>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

/*
					<div className='flex flex-row col-span-5 gap-x-2'>
						<div className='w-[1px] h-full bg-secondary-green-darker'></div>
						<div className='flex flex-col gap-y-2'>
							{footerLinks.map((section, index) => {
								const {title, href} = section;
								if (
									title === 'LinkedIn' ||
									title === 'andreroxhage74@gmail.com'
								)
									return (
										<motion.a
											key={index}
											href={href}
											className='flex gap-x-2 items-center'
											whileHover={{color: '#BCE5AE', fill: '#BCE5AE'}}
											whileTap={{scale: 0.95}}
											initial={{
												color: '#FEFEFE',
												fill: '#FEFEFE',
												opacity: 0,
											}}
											viewport={{once: true}}
											whileInView={{
												opacity: 1,
												transition: {
													delay: 0.2 * index,
													duration: 0.4,
													ease: 'easeInOut',
												},
											}}
											transition={{duration: 0.2, ease: 'easeInOut'}}
										>
											{title === 'LinkedIn' ? (
												<svg
													xmlns='http://www.w3.org/2000/svg'
													version='1.1'
													class='w-4 h-4'
													viewBox='0 0 100 100'
												>
													<path d='M 1.48 29.91 h 18.657 v 60.01 H 1.48 V 29.91 z M 10.809 0.08 c 5.963 0 10.809 4.846 10.809 10.819 c 0 5.967 -4.846 10.813 -10.809 10.813 C 4.832 21.712 0 16.866 0 10.899 C 0 4.926 4.832 0.08 10.809 0.08' />
													<path d='M 31.835 29.91 h 17.89 v 8.206 h 0.255 c 2.49 -4.72 8.576 -9.692 17.647 -9.692 C 86.514 28.424 90 40.849 90 57.007 V 89.92 H 71.357 V 60.737 c 0 -6.961 -0.121 -15.912 -9.692 -15.912 c -9.706 0 -11.187 7.587 -11.187 15.412 V 89.92 H 31.835 V 29.91 z' />
												</svg>
											) : (
												<svg
													xmlns='http://www.w3.org/2000/svg'
													fill='none'
													viewBox='0 0 24 24'
													stroke-width='1.5'
													stroke='currentColor'
													class='w-4 h-4'
												>
													<path
														stroke-linecap='round'
														stroke-linejoin='round'
														d='M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75'
													/>
												</svg>
											)}

											{title}
										</motion.a>
									);
							})}
						</div>
					</div>
*/
