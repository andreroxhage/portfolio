import { motion } from "framer-motion";
import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";

interface GifDialogProps {
  gifSrc: string;
  mousePosition: { x: number; y: number };
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const GifDialog = ({
  gifSrc,
  mousePosition,
  isLoading,
  setIsLoading,
}: GifDialogProps) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setIsLoading(true);
  }, [gifSrc, setIsLoading]);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.target as HTMLImageElement;

    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;

    const viewportWidth = window.innerWidth * 0.7;
    const viewportHeight = window.innerHeight * 0.7;

    const aspectRatio = naturalWidth / naturalHeight;
    let scaledWidth = viewportWidth;
    let scaledHeight = viewportWidth / aspectRatio;

    if (scaledHeight > viewportHeight) {
      scaledHeight = viewportHeight;
      scaledWidth = viewportHeight * aspectRatio;
    }

    setDimensions({
      width: scaledWidth,
      height: scaledHeight,
    });

    setIsLoading(false);
  };

  const calculateOffset = () => {
    const offsetX = (mousePosition.x / window.innerWidth - 0.5) * 240;
    const offsetY = (mousePosition.y / window.innerHeight - 0.5) * 240;
    return { x: offsetX, y: offsetY };
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        x: calculateOffset().x,
        y: calculateOffset().y,
      }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      className="fixed z-10 rounded-lg shadow-xl overflow-hidden pointer-events-none"
      style={{
        borderRadius: "40px",
        left: `calc(50% - ${dimensions.width / 2}px)`,
        top: `calc(50% - ${dimensions.height / 2}px)`,
        width: isLoading ? "0" : dimensions.width,
        height: isLoading ? "0" : dimensions.height,
        maxWidth: "70vw",
        maxHeight: "70vh",
      }}
    >
      <Image
        src={gifSrc}
        unoptimized
        alt="Project preview"
        className={`w-full h-full object-contain transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        width={dimensions.width || 0}
        height={dimensions.height || 0}
        onLoad={handleImageLoad}
      />
    </motion.div>
  );
};

export default GifDialog;
