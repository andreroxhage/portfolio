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
	const [time, setTime] = useState(new Date().toLocaleTimeString());

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
			document.body.style.overflowX = 'auto';
		};
	}, []);

	return (
		<>
			<div
				id='contact'
				className='absolute z-10 h-screen w-screen pointer-events-none overflow-hidden'
				style={{
					backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)), url(${backgroundImage})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
				<div className='flex flex-col justify-between overflow-hidden w-screen pointer-events-auto h-screen'>
					<div
						id='footer-container'
						className='max-w-9xl mx-auto h-4/6 cursor-none overflow-hidden'
					>
						<div className='gap-8 m-auto grid grid-cols-10 h-full my-auto'>
							<div className='flex items-center col-start-2 col-span-4 '>
								<h2 className='text-6xl text-primary-foreground leading-tight font-bold'>
									Are you ready to connect?
								</h2>
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
							<p className='font-medium pb-2'>Contact</p>
							<hr className='h-0.5 pt-2 border-primary-800 col-start-1 col-end-4' />

							{footerLinks.map((link, i) => {
								const {title, href} = link;

								return (
									<motion.a
										key={i}
										href={href}
										className='col-start-1 col-span-2'
										whileHover={{color: '#BCE5AE'}}
										whileTap={{scale: 0.95}}
										initial={{color: '#EAE7E2', opacity: 0}}
										viewport={{once: true}} // will only animate the whileInView once<
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
										{title}
									</motion.a>
								);
							})}
							<div className='col-start-4'></div>

							<p className='font-medium pb-2 col-start-4 col-span-3'>
								Local time
							</p>
							<hr className='h-0.5 pt-2 border-primary-800 flex flex-row col-start-4 col-span-full' />
							<p className='col-start-4 col-span-5 mb-6'>
								Malmö, Sweden <span> </span>
								{time}
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
