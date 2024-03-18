import {useScroll, motion, useTransform} from 'framer-motion';
import {useEffect, useRef} from 'react';

export default function ScrollScaleWrapper({
	children,
	className,
	scaleFrom = 0.92,
	scaleTo = 1,
}) {
	const ref = useRef(null);
	const {scrollYProgress} = useScroll({
		target: ref,
		offset: ['end start', 'start end'],
	});

	const scale = useTransform(scrollYProgress, [1, 0], [scaleFrom, scaleTo]);

	return (
		<motion.div
			ref={ref}
			style={{scale: scale}}
			className={`w-100 h-100 ${className}`}
		>
			{children}
		</motion.div>
	);
}
