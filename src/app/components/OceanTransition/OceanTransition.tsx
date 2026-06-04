'use client';

import { useEffect, useRef, useCallback, type ReactNode } from 'react';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';
import { useTheme } from '@/app/contexts/ThemeContext';
import { createOceanSceneV2 as createOceanScene } from './createOceanSceneV2';

const COLORS = {
  dark: [1.0, 1.0, 1.0] as const,
  light: [0.25, 0.24, 0.23] as const,
};

interface OceanTransitionProps {
  children?: ReactNode;
}

export function OceanTransition({ children }: OceanTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<ReturnType<typeof createOceanScene> | null>(null);
  const rafIdRef = useRef<number>(0);
  const isRunningRef = useRef(false);
  const webglFailedRef = useRef(false);

  const prefersReducedMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    if (!sceneRef.current) {
      return;
    }
    const [r, g, b] = isDark ? COLORS.dark : COLORS.light;
    sceneRef.current.setColor(r, g, b);
  }, [isDark]);

  const startLoop = useCallback(() => {
    if (isRunningRef.current) {
      return;
    }
    isRunningRef.current = true;

    const tick = () => {
      if (!isRunningRef.current || !sceneRef.current) {
        return;
      }
      const time = performance.now() * 0.001;
      sceneRef.current.render(time);
      rafIdRef.current = requestAnimationFrame(tick);
    };
    rafIdRef.current = requestAnimationFrame(tick);
  }, []);

  const stopLoop = useCallback(() => {
    isRunningRef.current = false;
    cancelAnimationFrame(rafIdRef.current);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) {
      return;
    }

    try {
      const scene = createOceanScene(canvas, isMobile);
      const [r, g, b] = isDark ? COLORS.dark : COLORS.light;
      scene.setColor(r, g, b);
      sceneRef.current = scene;
    } catch {
      webglFailedRef.current = true;
      return;
    }

    container.style.opacity = '1';

    // Reduced motion: render one static frame
    if (prefersReducedMotion) {
      sceneRef.current.render(6.0);

      const onResizeStatic = () => {
        sceneRef.current?.resize();
        sceneRef.current?.render(6.0);
      };
      window.addEventListener('resize', onResizeStatic);

      return () => {
        window.removeEventListener('resize', onResizeStatic);
        sceneRef.current?.dispose();
        sceneRef.current = null;
      };
    }

    // Animated: start/stop based on visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0 }
    );
    observer.observe(container);

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        stopLoop();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const onResize = () => {
      sceneRef.current?.resize();
    };
    window.addEventListener('resize', onResize);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      stopLoop();
    };
    const onContextRestored = () => {
      if (!canvas) {
        return;
      }
      try {
        sceneRef.current = createOceanScene(canvas, isMobile);
        startLoop();
      } catch {
        webglFailedRef.current = true;
      }
    };
    canvas.addEventListener('webglcontextlost', onContextLost);
    canvas.addEventListener('webglcontextrestored', onContextRestored);

    return () => {
      stopLoop();
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, [prefersReducedMotion, startLoop, stopLoop, isMobile, isDark]);

  if (webglFailedRef.current) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-[75vh]">
      {/* WebGL canvas layer */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-0 overflow-hidden transition-opacity duration-500 ease-out"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
        {/* Top fade-in */}
        <div className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-secondary to-transparent pointer-events-none" />
        {/* Bottom fade-out */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-secondary to-transparent pointer-events-none" />
      </div>

      {/* Content overlay (ElsewhereSection) */}
      <div className="relative z-10 flex items-center min-h-[75vh]">
        {children}
      </div>
    </div>
  );
}
