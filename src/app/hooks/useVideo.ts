import { useState, useEffect } from 'react';

interface VideoData {
  video_url: string;
  loading: boolean;
  error: Error | null;
}

const videoCache = new Map<string, string>();

export const useVideo = (identifier: string) => {
  const [videoData, setVideoData] = useState<VideoData>({
    video_url: '',
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchVideo = async () => {
      // Check cache first
      if (videoCache.has(identifier)) {
        setVideoData({
          video_url: videoCache.get(identifier)!,
          loading: false,
          error: null,
        });
        return;
      }

      try {
        const res = await fetch(`/api/videos?project=${identifier}`);
        if (!res.ok) {
          throw new Error('Failed to fetch video');
        }

        const data = await res.json();
        if (data && data.length > 0) {
          // Store in cache
          videoCache.set(identifier, data[0].video_url);
          setVideoData({
            video_url: data[0].video_url,
            loading: false,
            error: null,
          });
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
  }, [identifier]);

  return videoData;
};
