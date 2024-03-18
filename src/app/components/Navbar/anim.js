export const perspective = {
	initial: {
		opacity: 0,
		rotateX: 90,
		translateY: -20,
		translateX: 0,
	},
	enter: (i) => ({
		opacity: 1,
		rotateX: 0,
		translateY: 0,
		transition: {
			duration: 0.4,
			delay: 0.4 + i * 0.1,
			ease: [0.215, 0.61, 0.355, 1],
			opacity: {duration: 0.6},
		},
	}),
	exit: {
		opacity: 0,
		transition: {duration: 0.5, type: 'linear', ease: [0.76, 0, 0.24, 1]},
	},
};

export const slideIn = {
	initial: {
		opacity: 0,
		y: 20,
	},
	hover: {
		color: '#222222',
		x: 10,
		transition: {duration: 0.2, ease: 'easeInOut'},
	},
	enter: (i) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.2,
			delay: 1.5 + i * 0.15,
			ease: [0.215, 0.61, 0.355, 1],
		},
	}),
	exit: {
		opacity: 0,
		transition: {duration: 0.5, type: 'tween', ease: 'easeInOut'},
	},
};
