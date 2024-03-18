import {motion} from 'framer-motion';
import {links, footerLinks} from '../../data';
import {perspective, slideIn} from './anim';

export default function index() {
	return (
		<div className='flex flex-col h-full w-fit justify-between pt-24 pl-4 pr-4 md:pl-11 md:pr-11 pb-12'>
			<div className='flex gap-8 flex-col w-full'>
				{links.map((link, i) => {
					const {title, href} = link;
					return (
						<div key={`b_${i}`} className='w-full'>
							<motion.a
								href={href}
								className='w-full'
								custom={i}
								variants={perspective}
								initial='initial'
								animate='enter'
								exit='exit'
								whileHover='hover'
							>
								<motion.p
									className='text-primary-grey text-4xl md:text-4xl cursor-pointer'
									variants={slideIn}
									whileHover='hover'
								>
									{title}
								</motion.p>
							</motion.a>
						</div>
					);
				})}
			</div>

			<motion.hr
				className='h-0.5 w-full pt-2 border-primary-grey-brighter my-10 md:my-16'
				initial={{width: 0}}
				animate={{width: '100%'}}
				exit={{width: 0, transition: {delay: 0}}}
				transition={{duration: 0.3, ease: [0.76, 0, 0.24, 1], delay: 0.8}}
			/>

			<motion.div className='flex flex-col'>
				{footerLinks.map((link, i) => {
					const {title, href} = link;
					return (
						<motion.a
							href={href}
							className={
								'w-1/2 mt-2 text-primary-grey font-medium cursor-pointer'
							}
							variants={slideIn}
							custom={i}
							initial='initial'
							animate='enter'
							whileHover={{
								color: '#222222',
								x: 10,
								transition: {duration: 0.2, ease: 'easeInOut'},
							}}
							exit='exit'
							key={`f_${i}`}
						>
							{title}
						</motion.a>
					);
				})}
			</motion.div>
		</div>
	);
}
