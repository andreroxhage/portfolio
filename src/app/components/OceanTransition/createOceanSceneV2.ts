import * as THREE from 'three';
import { oceanVertexShader, oceanFragmentShader } from './oceanShaders';

export function createOceanSceneV2(
  canvas: HTMLCanvasElement,
  isMobile: boolean
) {
  const lineCount = isMobile ? 80 : 180;
  const pointsPerLine = isMobile ? 200 : 450;

  // --- Renderer ---
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: !isMobile,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  // --- Camera (angled aerial — ~50° from horizontal) ---
  const camera = new THREE.PerspectiveCamera(
    52,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    120
  );
  camera.position.set(0, 16, 5);
  camera.lookAt(0, 0, -8);

  // --- Scene ---
  const scene = new THREE.Scene();

  // --- Geometry: very dense horizontal lines ---
  const zNear = 10;
  const zFar = -40;
  const xSpread = 35;

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

  // Horizontal pairs only — NO vertical connections
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
    uAmplitude: { value: 0.42 },
    uColor: { value: new THREE.Vector3(1.0, 1.0, 1.0) },
    uFogNear: { value: 4.0 },
    uFogFar: { value: 42.0 },
    uLineCount: { value: lineCount },
  };

  // --- Material ---
  const material = new THREE.ShaderMaterial({
    vertexShader: oceanVertexShader,
    fragmentShader: oceanFragmentShader,
    uniforms,
    transparent: true,
    depthWrite: false,
  });

  // --- Mesh (rotated so wave crests concentrate on the right) ---
  const mesh = new THREE.LineSegments(geometry, material);
  mesh.rotation.y = -0.38; // mirrored diagonal — ridges sweep toward right
  mesh.position.x = 6; // shift right so left side (text area) is calmer
  scene.add(mesh);

  function render(time: number) {
    uniforms.uTime.value = time;
    renderer.render(scene, camera);
  }

  function resize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width === 0 || height === 0) {
      return;
    }

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

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
