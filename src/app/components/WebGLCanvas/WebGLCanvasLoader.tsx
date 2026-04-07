'use client';

import dynamic from 'next/dynamic';

const WebGLCanvas = dynamic(
  () =>
    import('@/app/components/WebGLCanvas/WebGLCanvas').then(
      mod => mod.WebGLCanvas
    ),
  { ssr: false }
);

export default function WebGLCanvasLoader() {
  return <WebGLCanvas />;
}
