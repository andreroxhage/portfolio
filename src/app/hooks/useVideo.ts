import { useQuery, type QueryClient } from '@tanstack/react-query';

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

const videoQueryOptions = (identifier: string) => ({
  queryKey: ['video', identifier],
  queryFn: () => fetchVideoUrl(identifier),
  staleTime: 1000 * 60 * 55,
  gcTime: 1000 * 60 * 60,
});

/** Warm the React Query cache for a video URL so it's ready when needed. */
export function prefetchVideo(queryClient: QueryClient, identifier: string) {
  if (!identifier) {
    return;
  }
  queryClient.prefetchQuery(videoQueryOptions(identifier));
}

export const useVideo = (identifier: string) => {
  const {
    data: videoUrl,
    isLoading,
    error,
  } = useQuery({
    ...videoQueryOptions(identifier),
    enabled: !!identifier,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return {
    video_url: videoUrl || '',
    loading: isLoading,
    error: error as Error | null,
  } as VideoData;
};
