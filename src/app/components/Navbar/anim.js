export const perspective = {
  initial: {
    opacity: 0,
    rotateX: 90,
    translateY: -20,
    translateX: 0,
  },
  enter: () => ({
    opacity: 1,
    rotateX: 0,
    translateY: 0,
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
      opacity: { duration: 0.6 },
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.3, type: 'linear', ease: [0.76, 0, 0.24, 1] },
  },
};

export const slideIn = {
  initial: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  hover: {
    color: '#222222',
    x: 10,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
  enter: () => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};
