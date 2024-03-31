import { motion } from 'framer-motion';

export default function Button({ isActive, toggleMenu }) {
	return (
		<div className='absolute top-0 right-0 w-28 h-10 cursor-pointer rounded-md overflow-hidden'>
			<motion.div
				className='relative w-full h-full'
				animate={{ top: isActive ? '-100%' : '0%' }}
				transition={{ duration: 0.5, type: 'tween', ease: [0.76, 0, 0.24, 1] }}
			>
				<div
					className='w-full h-full flex-row bg-secondary-green hover:bg-secondary-green-darker duration-300 ease-in-out  text-primary-blackish text-base'
					onClick={() => {
						toggleMenu();
					}}
				>
					<PerspectiveText label='Menu' />
				</div>

				<div
					className='w-full h-full bg-secondary-green hover:bg-secondary-green-darker duration-300 ease-in-out  text-primary-blackish text-base'
					onClick={function () {
						toggleMenu();
					}}
				>
					<PerspectiveText label='Close' />
				</div>
			</motion.div>
		</div>
	);
}

function PerspectiveText({ label }) {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100%',
				width: '100%',
				transformStyle: 'preserve-3d',
				transition: 'transform 0.75s cubic-bezier(0.76, 0, 0.24, 1)',
				hover: 'rotateX(90)',
			}}
		>
			<div className='flex flex-row gap-x-2 items-center'>
				{label === 'Close' ? (
					<svg
						className='w-5 h-5  stroke-primary-blackish'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
					>
						<path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
					</svg>
				) : (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-5 h-5  stroke-primary-blackish '
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
						/>
					</svg>
				)}
				<p
					className='text-primary-blackish text-base'
					style={{
						transition: 'all 0.75s cubic-bezier(0.76, 0, 0.24, 1)',
						pointerEvents: 'none',
						textTransform: 'uppercase',
					}}
				>
					{label}
				</p>
			</div>
			<p
				style={{
					transition: 'all 0.75s cubic-bezier(0.76, 0, 0.24, 1)',
					pointerEvents: 'none',
					textTransform: 'uppercase',
					position: 'absolute',
					transformOrigin: 'bottom center',
					transform: 'rotateX(-90deg) translateY(9px)',
					opacity: 0,
				}}
			>
				{label}
			</p>
		</div>
	);
}
