'use client';
import {AuroraBackground} from '../components/aurora-background';
import {BackgroundBeams} from '../components/background-beams';
import {motion} from 'framer-motion';

export default function Test() {
	return (
		<header className='bg-primary-blackish'>
			<AuroraBackground>
				<motion.div
					initial={{opacity: 0.0, y: 40}}
					whileInView={{opacity: 1, y: 0}}
					transition={{
						delay: 0.3,
						duration: 0.8,
						ease: 'easeInOut',
					}}
					className='relative flex flex-col gap-4 items-center justify-center px-4 h-screen w-full'
				>
					<div className='text-3xl md:text-7xl font-bold text-white text-center'>
						Background lights are cool you know.
					</div>
					<div className='font-extralight text-base md:text-4xl text-neutral-200 py-4'>
						And this, is chemical burn.
					</div>
					<button className=' rounded-full w-fit text-white px-4 py-2'>
						Debug now
					</button>
				</motion.div>
			</AuroraBackground>
			<div className='w-full h-screen'>
				<div className='relative'></div>
				<BackgroundBeams />
			</div>
		</header>
	);
}
