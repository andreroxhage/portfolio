import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ImageSlider = ({ images, intervalTime }) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prevImage => (prevImage + 1) % images.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [images.length, intervalTime]);

  const currentImageSrc = images[currentImage];
  const isStringPath = typeof currentImageSrc === 'string';

  return (
    <motion.div key={currentImage}>
      <Image
        className="h-full w-full rounded-sm"
        src={currentImageSrc}
        alt={
          'A mockup of a computer displaying the interface of Join a customer data platform'
        }
        width={isStringPath ? 1200 : undefined}
        height={isStringPath ? 800 : undefined}
        priority
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </motion.div>
  );
};

export default ImageSlider;
