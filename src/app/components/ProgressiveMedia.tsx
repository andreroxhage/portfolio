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

  // When a video is expected, the container is pinned to the declared
  // aspectRatio (matching the poster/no-video path below) so the box never
  // reflows between the poster phase, the video's own intrinsic size once
  // metadata loads, and the playing phase. The video fills that fixed box
  // with object-fit so both the native poster attribute and the playing
  // video are clipped/letterboxed consistently instead of overflowing it.
  if (hasVideo) {
    return (
      <div
        className={cn(
          'relative w-full overflow-hidden',
          rounded && 'rounded-[20px] corner-squircle',
          !videoReady && 'video-shimmer',
          className
        )}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        <video
          src={resolvedVideoSrc}
          poster={imageSrc}
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={() => setVideoReady(true)}
          className={cn(
            'absolute inset-0 w-full h-full',
            objectFit === 'cover' ? 'object-cover' : 'object-contain',
            rounded && 'rounded-[20px] corner-squircle'
          )}
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
