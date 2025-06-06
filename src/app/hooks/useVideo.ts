import { useState, useEffect } from 'react';

interface VideoData {
  video_url: string;
  loading: boolean;
  error: Error | null;
}

// Enhanced caching with video metadata
const videoCache = new Map<string, string>();
const videoPreloadCache = new Set<string>();

// Preload a video URL in the background
const preloadVideo = (url: string) => {
  if (videoPreloadCache.has(url)) {
    return;
  }

  videoPreloadCache.add(url);
  const video = document.createElement('video');
  video.preload = 'auto';
  video.muted = true;
  video.src = url;

  // Clean up after preload
  video.addEventListener('loadeddata', () => {
    video.remove();
  });

  video.addEventListener('error', () => {
    videoPreloadCache.delete(url);
    video.remove();
  });
};

export const useVideo = (identifier: string, shouldPreload = false) => {
  const [videoData, setVideoData] = useState<VideoData>({
    video_url: '',
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchVideo = async () => {
      // Check cache first
      if (videoCache.has(identifier)) {
        const cachedUrl = videoCache.get(identifier)!;
        setVideoData({
          video_url: cachedUrl,
          loading: false,
          error: null,
        });

        // Preload in background if requested
        if (shouldPreload) {
          preloadVideo(cachedUrl);
        }
        return;
      }

      try {
        const res = await fetch(`/api/videos?project=${identifier}`);
        if (!res.ok) {
          throw new Error('Failed to fetch video');
        }

        const data = await res.json();
        if (data && data.length > 0) {
          const videoUrl = data[0].video_url;

          // Store in cache
          videoCache.set(identifier, videoUrl);
          setVideoData({
            video_url: videoUrl,
            loading: false,
            error: null,
          });

          // Preload in background if requested
          if (shouldPreload) {
            preloadVideo(videoUrl);
          }
        } else {
          throw new Error('No video found');
        }
      } catch (error) {
        setVideoData(prev => ({
          ...prev,
          loading: false,
          error: error as Error,
        }));
      }
    };

    fetchVideo();
  }, [identifier, shouldPreload]);

  return videoData;
};

// Utility function to preload multiple videos
export const preloadVideos = (identifiers: string[]) => {
  identifiers.forEach(async identifier => {
    if (videoCache.has(identifier)) {
      preloadVideo(videoCache.get(identifier)!);
      return;
    }

    try {
      const res = await fetch(`/api/videos?project=${identifier}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          videoCache.set(identifier, data[0].video_url);
          preloadVideo(data[0].video_url);
        }
      }
    } catch (error) {
      // Silently fail for preloading
      console.error('Preload failed for:', identifier);
    }
  });
};
