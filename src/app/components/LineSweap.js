import {useScroll, useTransform, motion} from 'framer-motion';
import {useRef} from 'react';

export default function LineSweap() {
	const ref = useRef(null);
	const {scrollYProgress} = useScroll({
		target: ref,
		offset: [0, 1],
	});

	const motionDivs = [];
	const scroll = useTransform(scrollYProgress, [0, 1], [-800, 800]);

	for (let i = 2; i <= 100; i += 2.5) {
		motionDivs.push(
			<motion.div
				key={`scroll${i}`}
				className='w-[1px] h-44 bg-primary-blackish absolute top-1/2'
				style={{translateY: scroll, left: `${i}%`}}
			></motion.div>,
		);
	}

	return (
		<section ref={ref} className='w-full h-[60vh] relative p-12'>
			{motionDivs}
		</section>
	);
}
