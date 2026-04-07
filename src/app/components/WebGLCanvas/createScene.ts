import * as THREE from 'three';
import { vertexShader, fragmentShader } from './shaders';

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function createWaveScene(canvas: HTMLCanvasElement, isMobile: boolean) {
  const lineCount = isMobile ? 30 : 60;
  const pointsPerLine = isMobile ? 120 : 200;

  // --- Renderer ---
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: !isMobile,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // --- Camera (orthographic, maps to viewport) ---
  const aspect = window.innerWidth / window.innerHeight;
  const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 10);
  camera.position.z = 1;

  // --- Scene ---
  const scene = new THREE.Scene();

  // --- Geometry ---
  const totalPoints = lineCount * pointsPerLine;
  const positions = new Float32Array(totalPoints * 3);
  const randoms = new Float32Array(totalPoints);
  const lineIndices = new Float32Array(totalPoints);

  for (let line = 0; line < lineCount; line++) {
    const y = -0.75 + (1.5 * line) / (lineCount - 1);
    for (let p = 0; p < pointsPerLine; p++) {
      const idx = line * pointsPerLine + p;
      const x = -2.0 + (4.0 * p) / (pointsPerLine - 1);
      positions[idx * 3] = x;
      positions[idx * 3 + 1] = y;
      positions[idx * 3 + 2] = 0;
      randoms[idx] = Math.random() * 2 - 1;
      lineIndices[idx] = line;
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));
  geometry.setAttribute(
    'aLineIndex',
    new THREE.BufferAttribute(lineIndices, 1)
  );

  // --- Line indices (pairs of adjacent points per line) ---
  const lineSegmentIndices: number[] = [];
  for (let line = 0; line < lineCount; line++) {
    const lineStart = line * pointsPerLine;
    for (let p = 0; p < pointsPerLine - 1; p++) {
      lineSegmentIndices.push(lineStart + p, lineStart + p + 1);
    }
  }
  const lineGeometry = geometry.clone();
  lineGeometry.setIndex(lineSegmentIndices);

  // --- Uniforms (shared reference) ---
  const uniforms = {
    uTime: { value: 0 },
    uAmplitude: { value: 0.15 },
    uDissolve: { value: 0 },
    uScatter: { value: 0 },
    uOpacity: { value: 1 },
  };

  // --- Materials ---
  const lineMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true,
    depthWrite: false,
  });

  const pointMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true,
    depthWrite: false,
  });

  // --- Meshes ---
  const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
  const pointsMesh = new THREE.Points(geometry, pointMaterial);

  lineMesh.visible = true;
  pointsMesh.visible = false;

  scene.add(lineMesh);
  scene.add(pointsMesh);

  // --- Render function ---
  function render(time: number, scrollProgress: number) {
    const s = scrollProgress;

    // Scroll-to-uniform mapping
    const amplitude = 0.1 * (1 - smoothstep(0.3, 0.55, s));
    const dissolve = smoothstep(0.3, 0.55, s);
    const scatter = smoothstep(0.3, 0.7, s);
    const opacity = 1 - smoothstep(0.7, 0.95, s);

    uniforms.uTime.value = time;
    uniforms.uAmplitude.value = amplitude;
    uniforms.uDissolve.value = dissolve;
    uniforms.uScatter.value = scatter;
    uniforms.uOpacity.value = opacity;

    // Switch between line and point rendering
    const showPoints = dissolve > 0.5;
    lineMesh.visible = !showPoints;
    pointsMesh.visible = showPoints;

    renderer.render(scene, camera);
  }

  // --- Resize handler ---
  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const newAspect = width / height;

    camera.left = -newAspect;
    camera.right = newAspect;
    camera.top = 1;
    camera.bottom = -1;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  }

  // --- Dispose ---
  function dispose() {
    geometry.dispose();
    lineGeometry.dispose();
    lineMaterial.dispose();
    pointMaterial.dispose();
    renderer.dispose();
  }

  return { render, resize, dispose };
}
