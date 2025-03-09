import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface VideoDialogProps {
  identifier: string; // Either project slug or idea ID
  mousePosition: { x: number; y: number };
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const VideoDialog = ({
  identifier,
  mousePosition,
  isLoading,
  setIsLoading,
}: VideoDialogProps) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [videoUrl, setVideoUrl] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/videos?project=${identifier}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setVideoUrl(data[0].video_url);
        }
      })
      .catch(error => {
        console.error('Error fetching video:', error);
        setIsLoading(false);
      });
  }, [identifier, setIsLoading]);

  const handleVideoLoad = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    const naturalWidth = video.videoWidth;
    const naturalHeight = video.videoHeight;

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
    const offsetX = (mousePosition.x / window.innerWidth - 0.5) * 400;
    const offsetY = (mousePosition.y / window.innerHeight - 0.5) * 400;
    return { x: offsetX, y: offsetY };
  };

  if (!videoUrl) {
    return null;
  }

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
        type: 'spring',
        stiffness: 100,
        damping: 20,
      }}
      className="fixed z-10 rounded-[40px] shadow-xl overflow-hidden pointer-events-none"
      style={{
        left: `calc(50% - ${dimensions.width / 2}px)`,
        top: `calc(50% - ${dimensions.height / 2}px)`,
        width: isLoading ? '0' : dimensions.width,
        height: isLoading ? '0' : dimensions.height,
        maxWidth: '70vw',
        maxHeight: '70vh',
      }}
    >
      <video
        src={videoUrl}
        className={`w-full h-full object-contain transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        width={dimensions.width || 0}
        height={dimensions.height || 0}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={handleVideoLoad}
      />
    </motion.div>
  );
};

export default VideoDialog;
