'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useVideo } from '@/app/hooks/useVideo';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';
import { EASING } from '@/app/lib/motion';

interface ProgressiveMediaProps {
  imageSrc: string;
  imageAlt: string;
  videoIdentifier?: string;
  videoSrc?: string;
  aspectRatio?: string;
  rounded?: boolean;
  priority?: boolean;
  className?: string;
}

const CROSSFADE_DURATION = 300;
const EASING_CSS = `cubic-bezier(${EASING.ENTER.join(', ')})`;
const TRANSITION = `opacity ${CROSSFADE_DURATION}ms ${EASING_CSS}`;

export function ProgressiveMedia({
  imageSrc,
  imageAlt,
  videoIdentifier,
  videoSrc,
  aspectRatio,
  rounded = true,
  priority = false,
  className,
}: ProgressiveMediaProps) {
  const [videoReady, setVideoReady] = useState(false);
  const reducedMotion = useReducedMotion();

  const { video_url: fetchedVideoUrl } = useVideo(videoIdentifier ?? '');

  const resolvedVideoSrc =
    videoSrc ?? (videoIdentifier ? fetchedVideoUrl : undefined);
  const hasVideo = !!resolvedVideoSrc && !reducedMotion;

  return (
    <div
      className={cn(
        'relative overflow-hidden image-depth-outline',
        rounded && 'rounded-[20px] corner-squircle',
        className
      )}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority={priority}
        className="object-cover"
        style={{
          opacity: videoReady ? 0 : 1,
          transition: TRANSITION,
        }}
      />

      {hasVideo && (
        <video
          src={resolvedVideoSrc}
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={() => setVideoReady(true)}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: videoReady ? 1 : 0,
            transition: TRANSITION,
          }}
        />
      )}
    </div>
  );
}
