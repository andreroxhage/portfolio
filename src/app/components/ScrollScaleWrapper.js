import {useScroll, motion, useTransform} from 'framer-motion';
import {useRef} from 'react';

export default function ScrollScaleWrapper({children, className}) {
	const ref = useRef(null);
	const {scrollYProgress} = useScroll({
		target: ref,
		offset: [0.5, 1],
	});

	const scale = useTransform(scrollYProgress, [1, 0], [0.92, 1]);

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
