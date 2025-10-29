import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';

// This component should be used to wrap any element that you want to apply the magnetic effect to
// Credits to https://blog.olivierlarose.com/tutorials/magnetic-button for the inspiration

export default function MagneticWrapper({ children, magneticStrength = 1 }) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = e => {
    if (prefersReducedMotion) {
      return;
    }

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    // Clamp the magneticStrength between 0 and 1
    const clampedStrength = Math.max(0, Math.min(1, magneticStrength));

    setPosition({
      x: middleX * clampedStrength,
      y: middleY * clampedStrength,
    });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      style={{ position: 'relative' }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={
        prefersReducedMotion
          ? { duration: 0.01 }
          : {
              type: 'spring',
              stiffness: 150,
              damping: 15,
              mass: 0.1,
            }
      }
    >
      {children}
    </motion.div>
  );
}
