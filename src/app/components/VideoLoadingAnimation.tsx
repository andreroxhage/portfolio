import { motion } from 'framer-motion';

interface VideoLoadingAnimationProps {
  className?: string;
}

const VideoLoadingAnimation = ({
  className = '',
}: VideoLoadingAnimationProps) => {
  return (
    <div
      className={`flex items-center justify-center w-full h-full ${className}`}
    >
      <motion.div
        className="relative w-16 h-16"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <motion.div
          className="absolute inset-0 border-4 border-secondary-green-darker rounded-full"
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
        <motion.div
          className="absolute inset-0 border-4 border-secondary-green-darker rounded-full"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeOut',
            delay: 0.2,
          }}
        />
        <div className="absolute inset-0 border-4 border-secondary-green-darker rounded-full" />
      </motion.div>
    </div>
  );
};

export default VideoLoadingAnimation;
