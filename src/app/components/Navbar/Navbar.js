'use client';
import {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import Button from './Button';
import Nav from './Nav';
import MagneticWrapper from '../MagneticWrapper';

const menu = {
	open: {
		width: 'fit-content',
		height: 'fit-content',
		top: '-25px',
		right: '-25px',
		transition: {duration: 0.4, type: 'tween', ease: [0.76, 0, 0.24, 1]},
	},
	closed: {
		width: '100px',
		height: '40px',
		top: '0px',
		right: '0px',
		transition: {
			duration: 0.4,
			delay: 0.35,
			type: 'tween',
			ease: [0.76, 0, 0.24, 1],
		},
	},
};

export default function Navbar() {
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		function handleClickOutside(event) {
			if (isActive && !event.target.closest('.nav-container')) {
				setIsActive(false);
			}
		}

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [isActive]);

	return (
		<nav className='fixed bottom-10 h-10 right-10 md:top-10 z-50'>
			<motion.div
				className='h-60 bg-secondary-green rounded-md relative nav-container'
				variants={menu}
				animate={isActive ? 'open' : 'closed'}
				initial='closed'
			>
				<AnimatePresence>{isActive && <Nav />}</AnimatePresence>
			</motion.div>
			<Button
				isActive={isActive}
				toggleMenu={() => {
					setIsActive(!isActive);
				}}
			/>
		</nav>
	);
}
