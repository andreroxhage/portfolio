/**
 * GLSL shaders for the flowing-wave WebGL canvas.
 *
 * Uniforms:
 *   uTime      — continuous clock for ambient drift
 *   uAmplitude — wave height
 *
 * Attributes:
 *   position   — vec3 (standard)
 *   aLineIndex — which line this point belongs to
 */

export const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uAmplitude;

  attribute float aLineIndex;

  varying float vAlpha;

  void main() {
    vec3 pos = position;

    // Per-line variation: groups of lines share similar behavior
    float lineGroup = floor(aLineIndex / 4.0);
    float lineVar = 0.4 + 0.6 * sin(lineGroup * 0.8 + 1.5);

    // Three overlapping sine waves — low frequency for smooth, parallel flow
    float groupPhase = lineGroup * 0.35;
    float wave1 = sin(pos.x * 1.0 + uTime * 0.12 + groupPhase) * 0.65;
    float wave2 = sin(pos.x * 2.2 - uTime * 0.08 + aLineIndex * 0.12) * 0.2;
    float wave3 = sin(pos.x * 0.5 + uTime * 0.06 + groupPhase * 1.5) * 0.15;

    float waveDisplacement = (wave1 + wave2 + wave3) * uAmplitude * lineVar;
    pos.y += waveDisplacement;

    vAlpha = 0.3 + 0.1 * lineVar;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  uniform vec3 uColor;

  varying float vAlpha;

  void main() {
    gl_FragColor = vec4(uColor, vAlpha);
  }
`;
