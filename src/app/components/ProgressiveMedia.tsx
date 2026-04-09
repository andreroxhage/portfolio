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
  outline?: boolean;
  priority?: boolean;
  className?: string;
  objectFit?: 'contain' | 'cover';
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
  outline = true,
  priority = false,
  className,
  objectFit = 'contain',
}: ProgressiveMediaProps) {
  const [videoReady, setVideoReady] = useState(false);
  const reducedMotion = useReducedMotion();

  const { video_url: fetchedVideoUrl } = useVideo(videoIdentifier ?? '');

  const resolvedVideoSrc =
    videoSrc ?? (videoIdentifier ? fetchedVideoUrl : undefined);
  const hasVideo = !!resolvedVideoSrc && !reducedMotion;

  // When a video is expected, skip the poster image entirely and let the
  // video element size the container to its native aspect ratio.
  // The native poster attribute shows the poster image instantly at the
  // video's intrinsic size, eliminating aspect-ratio mismatch.
  if (hasVideo) {
    return (
      <div
        className={cn(
          'relative w-full overflow-hidden',
          rounded && 'rounded-[20px] corner-squircle',
          !videoReady && 'video-shimmer',
          className
        )}
      >
        <video
          src={resolvedVideoSrc}
          poster={imageSrc}
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={() => setVideoReady(true)}
          className={cn('w-full', rounded && 'rounded-[20px] corner-squircle')}
          style={{
            opacity: videoReady ? 1 : 0,
            transition: TRANSITION,
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden',
        outline && 'image-depth-outline',
        rounded && 'rounded-[20px] corner-squircle',
        className
      )}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
        className={objectFit === 'cover' ? 'object-cover' : 'object-contain'}
      />
    </div>
  );
}
