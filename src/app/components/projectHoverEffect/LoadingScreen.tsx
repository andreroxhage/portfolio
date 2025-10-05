import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const whiteish = '#FEFEFE';

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    initial: {
      transition: {
        staggerChildren: 0.22,
      },
    },
    animate: {
      transition: {
        staggerChildren: 0.22,
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
    duration: 0.5,
    repeat: Infinity,
    repeatType: 'reverse' as const,
    ease: 'easeInOut',
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
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
