import { useQuery } from '@tanstack/react-query';

interface VideoData {
  video_url: string;
  loading: boolean;
  error: Error | null;
}

interface VideoResponse {
  video_url: string;
}

const videoBlobCache = new Map<string, string>();
const blobLoadingStatus = new Map<string, Promise<string>>();

const fetchVideoUrl = async (identifier: string): Promise<string> => {
  const res = await fetch(`/api/videos?project=${identifier}`);
  if (!res.ok) {
    throw new Error('Failed to fetch video');
  }

  const data: VideoResponse[] = await res.json();
  if (!data || data.length === 0) {
    throw new Error('No video found');
  }

  return data[0].video_url;
};

const preloadVideoAsBlob = async (
  url: string,
  identifier: string
): Promise<string> => {
  if (videoBlobCache.has(identifier)) {
    return videoBlobCache.get(identifier)!;
  }

  if (blobLoadingStatus.has(identifier)) {
    return blobLoadingStatus.get(identifier)!;
  }

  const loadingPromise = (async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch video blob');
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      videoBlobCache.set(identifier, blobUrl);
      blobLoadingStatus.delete(identifier);

      return blobUrl;
    } catch (error) {
      blobLoadingStatus.delete(identifier);
      throw error;
    }
  })();

  blobLoadingStatus.set(identifier, loadingPromise);
  return loadingPromise;
};

export const useVideo = (identifier: string, shouldPreload = false) => {
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

  const blobUrl = videoBlobCache.get(identifier);

  if (
    shouldPreload &&
    videoUrl &&
    !blobUrl &&
    !blobLoadingStatus.has(identifier)
  ) {
    preloadVideoAsBlob(videoUrl, identifier).catch(err => {
      console.error('Blob preload failed:', identifier, err);
    });
  }

  return {
    video_url: blobUrl || videoUrl || '',
    loading: isLoading || (!blobUrl && !!videoUrl && shouldPreload),
    error: error as Error | null,
  } as VideoData;
};

export const preloadVideos = async (
  identifiers: string[],
  queryClient: any
): Promise<void> => {
  if (!identifiers.length) {
    return;
  }

  await Promise.all(
    identifiers.map(identifier =>
      queryClient.prefetchQuery({
        queryKey: ['video', identifier],
        queryFn: () => fetchVideoUrl(identifier),
        staleTime: Infinity,
      })
    )
  );

  const urlMappings = identifiers
    .map(identifier => {
      const cachedData = queryClient.getQueryData(['video', identifier]) as
        | string
        | undefined;
      return cachedData ? { identifier, url: cachedData } : null;
    })
    .filter(Boolean) as { identifier: string; url: string }[];

  const priorityVideos = urlMappings.slice(0, 3);
  const remainingVideos = urlMappings.slice(3);

  await Promise.allSettled(
    priorityVideos.map(({ identifier, url }) =>
      preloadVideoAsBlob(url, identifier)
    )
  );

  for (let i = 0; i < remainingVideos.length; i += 2) {
    const batch = remainingVideos.slice(i, i + 2);
    await Promise.allSettled(
      batch.map(({ identifier, url }) => preloadVideoAsBlob(url, identifier))
    );
  }
};

export const cleanupVideoBlobCache = () => {
  videoBlobCache.forEach(blobUrl => {
    URL.revokeObjectURL(blobUrl);
  });
  videoBlobCache.clear();
  blobLoadingStatus.clear();
};
