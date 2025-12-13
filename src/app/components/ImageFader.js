import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const ImageFader = ({ images, intervalTime = 5000 }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [prevImage, setPrevImage] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevImage(currentImage);
      setCurrentImage(prev => (prev + 1) % images.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [images.length, intervalTime, currentImage]);

  // Preload next image to avoid flicker during crossfade
  const nextIndex = useMemo(
    () => (currentImage + 1) % images.length,
    [currentImage, images.length]
  );
  useEffect(() => {
    const nextSrc = images[nextIndex];
    if (typeof nextSrc === 'string') {
      const img = new window.Image();
      img.src = nextSrc;
    }
  }, [nextIndex, images]);

  const currentImageSrc = images[currentImage];
  // kept for potential width/height use when not using fill; unused with fill rendering

  return (
    <div className="relative w-full overflow-hidden">
      {/* Base image establishes natural size like the original */}
      <Image
        src={currentImageSrc}
        alt={
          'A mockup of a computer displaying the interface of Join a customer data platform'
        }
        width={1200}
        height={800}
        priority
        style={{ maxWidth: '100%', height: 'auto' }}
        className="rounded-[2px] corner-squircle"
      />

      {/* Fade out previous image on top to simulate crossfade without changing sizing */}
      <AnimatePresence>
        {prevImage !== null && (
          <motion.div
            key={`prev-${prevImage}`}
            className="absolute inset-0"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <Image
              src={images[prevImage]}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-contain rounded-[2px] corner-squircle"
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageFader;
