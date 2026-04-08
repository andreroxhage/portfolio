import * as THREE from 'three';
import { vertexShader, fragmentShader } from './shaders';

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
  const lineIndices = new Float32Array(totalPoints);

  for (let line = 0; line < lineCount; line++) {
    const y = -0.75 + (1.5 * line) / (lineCount - 1);
    for (let p = 0; p < pointsPerLine; p++) {
      const idx = line * pointsPerLine + p;
      const x = -2.0 + (4.0 * p) / (pointsPerLine - 1);
      positions[idx * 3] = x;
      positions[idx * 3 + 1] = y;
      positions[idx * 3 + 2] = 0;
      lineIndices[idx] = line;
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
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
  geometry.setIndex(lineSegmentIndices);

  // --- Uniforms ---
  const uniforms = {
    uTime: { value: 0 },
    uAmplitude: { value: 0.15 },
    uColor: { value: new THREE.Vector3(1.0, 1.0, 1.0) },
  };

  // --- Material ---
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true,
    depthWrite: false,
  });

  // --- Mesh ---
  const mesh = new THREE.LineSegments(geometry, material);
  scene.add(mesh);

  // --- Render function ---
  function render(time: number) {
    uniforms.uTime.value = time;
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
    material.dispose();
    renderer.dispose();
  }

  function setColor(r: number, g: number, b: number) {
    uniforms.uColor.value.set(r, g, b);
  }

  return { render, resize, dispose, setColor };
}
