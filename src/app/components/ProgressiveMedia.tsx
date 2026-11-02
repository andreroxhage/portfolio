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
  /** CSS aspect-ratio value (e.g. "9/16"). Required: both the video and
   * poster-image branches size their container from this value alone, so
   * an absent ratio would collapse the container to 0 height. */
  aspectRatio: string;
  rounded?: boolean;
  outline?: boolean;
  priority?: boolean;
  className?: string;
  objectFit?: 'contain' | 'cover';
  /** `sizes` for the poster image. Pass the real rendered width so the
   * poster matches any server-rendered placeholder and isn't re-fetched. */
  sizes?: string;
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
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: ProgressiveMediaProps) {
  const [videoReady, setVideoReady] = useState(false);
  const reducedMotion = useReducedMotion();

  const { video_url: fetchedVideoUrl } = useVideo(videoIdentifier ?? '');

  const resolvedVideoSrc =
    videoSrc ?? (videoIdentifier ? fetchedVideoUrl : undefined);
  const hasVideo = !!resolvedVideoSrc && !reducedMotion;

  // The poster image is always rendered, so the box never goes blank: it
  // shows during SSR, while the video URL is fetched, and while the video
  // buffers. The video sits on top and fades in on `playing`, i.e. once a
  // frame is actually on screen. (`canplay` can fire before the first frame
  // paints, which flashed the dark container through.) The image element
  // stays mounted across the swap so it never reloads.
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden',
        outline && !hasVideo && 'image-depth-outline',
        rounded && 'rounded-[20px] corner-squircle',
        className
      )}
      style={{ aspectRatio }}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes={sizes}
        priority={priority}
        className={objectFit === 'cover' ? 'object-cover' : 'object-contain'}
      />
      {hasVideo && (
        <video
          src={resolvedVideoSrc}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden={imageAlt ? true : undefined}
          onPlaying={() => setVideoReady(true)}
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
      )}
    </div>
  );
}
