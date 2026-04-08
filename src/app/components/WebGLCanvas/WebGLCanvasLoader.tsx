'use client';

import dynamic from 'next/dynamic';

const WebGLCanvas = dynamic(
  () =>
    import('@/app/components/WebGLCanvas/WebGLCanvas').then(
      mod => mod.WebGLCanvas
    ),
  { ssr: false }
);

interface WebGLCanvasLoaderProps {
  onReady?: () => void;
}

export default function WebGLCanvasLoader({ onReady }: WebGLCanvasLoaderProps) {
  return <WebGLCanvas onReady={onReady} />;
}
