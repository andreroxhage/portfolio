import { useQuery } from '@tanstack/react-query';

interface VideoData {
  video_url: string;
  loading: boolean;
  error: Error | null;
}

interface VideoResponse {
  video_url: string;
}

const fetchVideoUrl = async (identifier: string): Promise<string> => {
  const res = await fetch(`/api/videos?project=${identifier}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch video for ${identifier}`);
  }

  const data: VideoResponse[] = await res.json();
  if (!data || data.length === 0) {
    throw new Error(`No video found for ${identifier}`);
  }

  return data[0].video_url;
};

export const useVideo = (identifier: string) => {
  const {
    data: videoUrl,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['video', identifier],
    queryFn: () => fetchVideoUrl(identifier),
    enabled: !!identifier,
    staleTime: Infinity, // Videos don't change, cache forever
    gcTime: 1000 * 60 * 60, // Keep in cache for 1 hour
  });

  return {
    video_url: videoUrl || '',
    loading: isLoading,
    error: error as Error | null,
  } as VideoData;
};
