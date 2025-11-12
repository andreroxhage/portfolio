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
    throw new Error(`Failed to fetch video for ${identifier}`);
  }

  const data: VideoResponse[] = await res.json();
  if (!data || data.length === 0) {
    throw new Error(`No video found for ${identifier}`);
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
  queryClient: any,
  options: { firstOnly?: boolean } = {}
): Promise<void> => {
  if (!identifiers.length) {
    return;
  }

  const { firstOnly = false } = options;

  if (firstOnly) {
    // Load only the first video for quick initial display
    const firstIdentifier = identifiers[0];

    await queryClient.prefetchQuery({
      queryKey: ['video', firstIdentifier],
      queryFn: () => fetchVideoUrl(firstIdentifier),
      staleTime: Infinity,
    });

    const cachedUrl = queryClient.getQueryData(['video', firstIdentifier]) as
      | string
      | undefined;

    if (cachedUrl) {
      await preloadVideoAsBlob(cachedUrl, firstIdentifier);
    }

    // Start loading remaining videos in background (non-blocking)
    if (identifiers.length > 1) {
      preloadVideosInBackground(identifiers.slice(1), queryClient);
    }

    return;
  }

  // Original behavior: load all videos
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

// Helper function to load remaining videos in background
const preloadVideosInBackground = async (
  identifiers: string[],
  queryClient: any
): Promise<void> => {
  try {
    // Fetch all video URLs first
    await Promise.all(
      identifiers.map(identifier =>
        queryClient.prefetchQuery({
          queryKey: ['video', identifier],
          queryFn: () => fetchVideoUrl(identifier),
          staleTime: Infinity,
        })
      )
    );

    // Get URL mappings
    const urlMappings = identifiers
      .map(identifier => {
        const cachedData = queryClient.getQueryData(['video', identifier]) as
          | string
          | undefined;
        return cachedData ? { identifier, url: cachedData } : null;
      })
      .filter(Boolean) as { identifier: string; url: string }[];

    // Load blobs in batches to avoid overwhelming the browser
    for (let i = 0; i < urlMappings.length; i += 2) {
      const batch = urlMappings.slice(i, i + 2);
      await Promise.allSettled(
        batch.map(({ identifier, url }) => preloadVideoAsBlob(url, identifier))
      );
    }
  } catch (error) {
    console.error('Background video preloading failed:', error);
  }
};

export const cleanupVideoBlobCache = () => {
  videoBlobCache.forEach(blobUrl => {
    URL.revokeObjectURL(blobUrl);
  });
  videoBlobCache.clear();
  blobLoadingStatus.clear();
};

export const preloadTopNVideos = async (
  identifiers: string[],
  queryClient: any,
  n: number
): Promise<void> => {
  if (!identifiers.length) {
    return;
  }

  // If nothing should block, still start background preloading for all
  if (n <= 0) {
    preloadVideosInBackground(identifiers, queryClient).catch(error => {
      console.error('Background video preloading failed (all):', error);
    });
    return;
  }

  const firstN = identifiers.slice(0, n);

  // Prefetch URLs for the first N identifiers
  await Promise.all(
    firstN.map(identifier =>
      queryClient.prefetchQuery({
        queryKey: ['video', identifier],
        queryFn: () => fetchVideoUrl(identifier),
        staleTime: Infinity,
      })
    )
  );

  // Map to URL pairs
  const urlMappings = firstN
    .map(identifier => {
      const cachedData = queryClient.getQueryData(['video', identifier]) as
        | string
        | undefined;
      return cachedData ? { identifier, url: cachedData } : null;
    })
    .filter(Boolean) as { identifier: string; url: string }[];

  // Preload blobs for the first N in parallel (N is small), but don't block forever
  const preloadPromises = urlMappings.map(({ identifier, url }) =>
    preloadVideoAsBlob(url, identifier)
  );

  const TIMEOUT_MS = 3000;
  await Promise.race([
    Promise.allSettled(preloadPromises),
    new Promise<void>(resolve => setTimeout(resolve, TIMEOUT_MS)),
  ]);

  // Background load for the remaining items (in small batches)
  const remaining = identifiers.slice(n);
  if (remaining.length) {
    preloadVideosInBackground(remaining, queryClient).catch(error => {
      console.error('Background video preloading failed (remaining):', error);
    });
  }
};

export const prioritizeVideo = async (
  identifier: string,
  queryClient: any
): Promise<void> => {
  if (!identifier) {
    return;
  }

  // If already cached or currently loading as blob, nothing to do
  if (videoBlobCache.has(identifier) || blobLoadingStatus.has(identifier)) {
    return;
  }

  // Ensure we have the URL prefetched
  if (!queryClient.getQueryData(['video', identifier])) {
    await queryClient.prefetchQuery({
      queryKey: ['video', identifier],
      queryFn: () => fetchVideoUrl(identifier),
      staleTime: Infinity,
    });
  }

  const url = queryClient.getQueryData(['video', identifier]) as
    | string
    | undefined;
  if (!url) {
    return;
  }

  try {
    await preloadVideoAsBlob(url, identifier);
  } catch (error) {
    console.error('Prioritized video preload failed:', identifier, error);
  }
};
