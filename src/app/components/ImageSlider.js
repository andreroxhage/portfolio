import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/legacy/image";

const ImageSlider = ({ images, intervalTime }) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [images.length, intervalTime]);

  return (
    <motion.div key={currentImage}>
      <Image
        className="h-full w-full rounded-sm"
        src={images[currentImage]}
        alt={
          "A mockup of a computer displaying the interface of Join a customer data platform"
        }
        priority
      />
    </motion.div>
  );
};

export default ImageSlider;
