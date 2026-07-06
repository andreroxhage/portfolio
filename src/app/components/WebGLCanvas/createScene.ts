import * as THREE from 'three';
import { vertexShader, fragmentShader } from './shaders';

export function createWaveScene(canvas: HTMLCanvasElement, isMobile: boolean) {
  const lineCount = isMobile ? 50 : 90;
  const pointsPerLine = isMobile ? 150 : 300;

  // --- Renderer ---
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: !isMobile,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // --- Camera (perspective for topographic depth) ---
  const camera = new THREE.PerspectiveCamera(
    58,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 5, 9);
  camera.lookAt(0, 0, -6);

  // --- Scene ---
  const scene = new THREE.Scene();

  // --- Geometry: horizontal-only lines receding in Z ---
  const zNear = 5;
  const zFar = -35;
  const xSpread = 20;

  const totalPoints = lineCount * pointsPerLine;
  const positions = new Float32Array(totalPoints * 3);
  const lineIndices = new Float32Array(totalPoints);

  for (let line = 0; line < lineCount; line++) {
    const t = line / (lineCount - 1);
    const z = zNear + t * (zFar - zNear);

    for (let p = 0; p < pointsPerLine; p++) {
      const idx = line * pointsPerLine + p;
      const x = -xSpread + (2 * xSpread * p) / (pointsPerLine - 1);

      positions[idx * 3] = x;
      positions[idx * 3 + 1] = 0;
      positions[idx * 3 + 2] = z;
      lineIndices[idx] = line;
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute(
    'aLineIndex',
    new THREE.BufferAttribute(lineIndices, 1)
  );

  // Line segment indices — horizontal pairs only, NO vertical connections
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
    uAmplitude: { value: 0.5 },
    uColor: { value: new THREE.Vector3(1.0, 1.0, 1.0) },
    uFogNear: { value: 3.0 },
    uFogFar: { value: 38.0 },
    uLineCount: { value: lineCount },
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
    if (width === 0 || height === 0) {
      return;
    }

    camera.aspect = width / height;
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
