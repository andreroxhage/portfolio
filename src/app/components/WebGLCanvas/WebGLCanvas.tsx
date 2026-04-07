'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';
import { useScrollProgress } from '@/app/hooks/useScrollProgress';
import { createWaveScene } from './createScene';

export function WebGLCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<ReturnType<typeof createWaveScene> | null>(null);
  const rafIdRef = useRef<number>(0);
  const isVisibleRef = useRef(true);
  const isTabActiveRef = useRef(true);
  const webglFailedRef = useRef(false);

  const prefersReducedMotion = useReducedMotion();
  const getScrollProgress = useScrollProgress();

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // --- Animation loop ---
  const animate = useCallback(() => {
    if (!sceneRef.current || !isVisibleRef.current || !isTabActiveRef.current) {
      rafIdRef.current = requestAnimationFrame(animate);
      return;
    }

    const time = performance.now() * 0.001;
    const scroll = getScrollProgress();
    sceneRef.current.render(time, scroll);

    rafIdRef.current = requestAnimationFrame(animate);
  }, [getScrollProgress]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    // --- Create scene ---
    try {
      sceneRef.current = createWaveScene(canvas, isMobile);
    } catch {
      webglFailedRef.current = true;
      return;
    }

    // --- Start animation loop ---
    rafIdRef.current = requestAnimationFrame(animate);

    // --- Resize (debounced) ---
    let resizeTimer: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        sceneRef.current?.resize();
      }, 150);
    }
    window.addEventListener('resize', onResize);

    // --- IntersectionObserver to pause when off-screen ---
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    // --- Visibility change (tab hidden) ---
    function onVisibilityChange() {
      isTabActiveRef.current = document.visibilityState === 'visible';
    }
    document.addEventListener('visibilitychange', onVisibilityChange);

    // --- WebGL context loss / restore ---
    function onContextLost(e: Event) {
      e.preventDefault();
      cancelAnimationFrame(rafIdRef.current);
    }
    function onContextRestored() {
      if (!canvas) {
        return;
      }
      try {
        sceneRef.current = createWaveScene(canvas, isMobile);
        rafIdRef.current = requestAnimationFrame(animate);
      } catch {
        webglFailedRef.current = true;
      }
    }
    canvas.addEventListener('webglcontextlost', onContextLost);
    canvas.addEventListener('webglcontextrestored', onContextRestored);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(rafIdRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, [prefersReducedMotion, animate, isMobile]);

  // Reduced motion or WebGL failure: static dark background
  if (prefersReducedMotion || webglFailedRef.current) {
    return (
      <div className="fixed inset-0 z-0 bg-neutral-975" aria-hidden="true" />
    );
  }

  return (
    <div className="fixed inset-0 z-0 bg-neutral-975" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}
