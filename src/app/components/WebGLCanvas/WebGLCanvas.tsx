'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';
import { useTheme } from '@/app/contexts/ThemeContext';
import { createWaveScene } from './createScene';

// Line colors per theme (RGB 0-1)
const COLORS = {
  dark: [1.0, 1.0, 1.0] as const,
  light: [0.25, 0.24, 0.23] as const, // warm dark neutral matching neutral-800
};

interface WebGLCanvasProps {
  onReady?: () => void;
}

export function WebGLCanvas({ onReady }: WebGLCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<ReturnType<typeof createWaveScene> | null>(null);
  const rafIdRef = useRef<number>(0);
  const isRunningRef = useRef(false);
  const webglFailedRef = useRef(false);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  const prefersReducedMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isDark = resolvedTheme === 'dark';

  // Update line color when theme changes
  useEffect(() => {
    if (!sceneRef.current) {
      return;
    }
    const [r, g, b] = isDark ? COLORS.dark : COLORS.light;
    sceneRef.current.setColor(r, g, b);
  }, [isDark]);

  // --- Animation loop — only runs when visible ---
  const startLoop = useCallback(() => {
    if (isRunningRef.current) {
      return;
    }
    isRunningRef.current = true;

    function tick() {
      if (!isRunningRef.current || !sceneRef.current) {
        return;
      }
      const time = performance.now() * 0.001;
      sceneRef.current.render(time);
      rafIdRef.current = requestAnimationFrame(tick);
    }
    rafIdRef.current = requestAnimationFrame(tick);
  }, []);

  const stopLoop = useCallback(() => {
    isRunningRef.current = false;
    cancelAnimationFrame(rafIdRef.current);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) {
      return;
    }

    // --- Create scene ---
    try {
      const scene = createWaveScene(canvas, isMobile);
      const [r, g, b] = isDark ? COLORS.dark : COLORS.light;
      scene.setColor(r, g, b);
      sceneRef.current = scene;
    } catch {
      webglFailedRef.current = true;
      return;
    }

    // Signal ready and fade in canvas immediately after scene creation
    container.style.opacity = '1';
    onReadyRef.current?.();

    // --- IntersectionObserver: start/stop rAF loop ---
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

    // --- Visibility change (tab hidden) ---
    function onVisibilityChange() {
      if (document.visibilityState === 'hidden') {
        stopLoop();
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange);

    // --- Resize (debounced) ---
    let resizeTimer: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => sceneRef.current?.resize(), 150);
    }
    window.addEventListener('resize', onResize);

    // --- WebGL context loss / restore ---
    function onContextLost(e: Event) {
      e.preventDefault();
      stopLoop();
    }
    function onContextRestored() {
      if (!canvas) {
        return;
      }
      try {
        sceneRef.current = createWaveScene(canvas, isMobile);
        startLoop();
      } catch {
        webglFailedRef.current = true;
      }
    }
    canvas.addEventListener('webglcontextlost', onContextLost);
    canvas.addEventListener('webglcontextrestored', onContextRestored);

    // --- Cleanup ---
    return () => {
      stopLoop();
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, [prefersReducedMotion, startLoop, stopLoop, isMobile, isDark]);

  if (prefersReducedMotion || webglFailedRef.current) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden transition-opacity duration-500 ease-out"
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}
