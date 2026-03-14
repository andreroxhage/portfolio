import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DURATION, EASING, STAGGER } from '@/app/lib/motion';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';

const LoadingScreen: React.FC = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const whiteish = 'hsl(var(--surface-dark-foreground))';

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    initial: {
      transition: {
        staggerChildren: STAGGER.DELAY,
      },
    },
    animate: {
      transition: {
        staggerChildren: STAGGER.DELAY,
      },
    },
  };

  const dotVariants = {
    initial: {
      y: '0%',
    },
    animate: {
      y: '100%',
    },
  };

  const dotTransition = {
    duration: DURATION.MEDIUM, // 0.2s
    repeat: prefersReducedMotion ? 0 : Infinity,
    repeatType: 'reverse' as const,
    ease: EASING.STANDARD,
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: DURATION.FAST, ease: EASING.EXIT }}
    >
      <AnimatePresence>
        {showAnimation && (
          <motion.div
            className="flex gap-4"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="initial"
          >
            <motion.span
              className="block w-4 h-4 rounded-full"
              style={{
                backgroundColor: whiteish,
              }}
              variants={dotVariants}
              transition={dotTransition}
            />
            <motion.span
              className="block w-4 h-4 rounded-full"
              style={{
                backgroundColor: whiteish,
              }}
              variants={dotVariants}
              transition={dotTransition}
            />
            <motion.span
              className="block w-4 h-4 rounded-full"
              style={{
                backgroundColor: whiteish,
              }}
              variants={dotVariants}
              transition={dotTransition}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LoadingScreen;
