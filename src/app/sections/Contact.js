'use client';
import {motion} from 'framer-motion';
import {footerLinks} from '../data';
import {FollowerPointerCard} from '../components/followCursor';

export default function Contact() {
	const backgroundImage = '/resource/20220611-IMG_5691.jpg'; // 20220611-IMG_5691 or familjen.jpg

	const TitleComponent = ({title}) => (
		<div>
			<p>{title}</p>
		</div>
	);

	return (
		<>
			<div
				id='contact'
				className='h-screen w-full rounded-3xl z-20'
				style={{
					backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)), url(${backgroundImage})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
				<div className='flex flex-col justify-between overflow-hidden w-full h-screen rounded-2xl'>
					<div
						id='footer-container'
						className='w-full h-4/6 overflow-hidden rounded-3xl'
					>
						<FollowerPointerCard
							title={<TitleComponent title={'Connect'} />}
							className='h-full z-30'
						>
							<div className='max-w-9xl mx-auto relative flex items-center w-full h-full overflow-hidden'>
								<motion.h2
									className='px-6 md:text-6xl text-5xl text-primary-foreground leading-tight font-bold'
									initial={{opacity: 0, translateY: 60}}
									whileInView={{opacity: 1, translateY: 0}}
									transition={{duration: 0.4, ease: 'easeOut'}}
									viewport={{once: true}}
								>
									Are you ready to connect?
								</motion.h2>
							</div>
						</FollowerPointerCard>
					</div>

					<div
						id='contact-info'
						className='px-6 max-w-9xl w-full mx-auto overflow-hidden h-2/6'
					>
						<div className='gap-y-2 grid grid-cols-10 mx-auto'>
							<hr className='h-0.5 pt-2 border-primary-800 col-start-2 md:col-start-1 col-end-4' />

							{footerLinks.map((link, i) => {
								const {title, href} = link;

								return (
									<motion.a
										key={i}
										href={href}
										className='col-start-2 md:col-start-1 col-span-6 flex gap-x-2 items-center'
										whileHover={{
											color: '#BCE5AE',
											fill: '#BCE5AE',
											translateX: 10,
										}}
										whileTap={{scale: 0.95}}
										initial={{
											color: '#FEFEFE',
											fill: '#FEFEFE',
											opacity: 0,
											translateX: 0,
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
												className='w-4 h-4'
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
												strokeWidth='1.5'
												stroke='currentColor'
												className='w-4 h-4'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5'
												/>
											</svg>
										)}
										{title === 'GitHub' && (
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='w-4 h-4'
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
