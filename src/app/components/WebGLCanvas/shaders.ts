/**
 * GLSL shaders for the flowing-wave → particle-dissolve WebGL canvas.
 *
 * Uniforms:
 *   uTime      — continuous clock for ambient drift
 *   uAmplitude — wave height (decreases with scroll)
 *   uDissolve  — [0,1] line fragmentation amount
 *   uScatter   — [0,1] random point displacement
 *   uOpacity   — global alpha multiplier
 *
 * Attributes:
 *   position   — vec3 (standard)
 *   aRandom    — per-point random value in [-1, 1]
 *   aLineIndex — which line this point belongs to
 */

export const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uAmplitude;
  uniform float uDissolve;
  uniform float uScatter;

  attribute float aRandom;
  attribute float aLineIndex;

  varying float vAlpha;

  void main() {
    vec3 pos = position;

    // Per-line variation factor
    float lineVar = sin(aLineIndex * 0.7 + 1.5) * 0.5 + 0.5;

    // Three overlapping sine waves for organic displacement
    float wave1 = sin(pos.x * 3.0 + uTime * 0.6 + aLineIndex * 0.5) * 0.5;
    float wave2 = sin(pos.x * 1.8 - uTime * 0.4 + aLineIndex * 0.3) * 0.3;
    float wave3 = sin(pos.x * 5.0 + uTime * 0.8 + aLineIndex * 0.9) * 0.2;

    float waveDisplacement = (wave1 + wave2 + wave3) * uAmplitude * lineVar;
    pos.y += waveDisplacement;

    // Scatter displacement when dissolving
    pos.x += aRandom * uScatter * 0.4;
    pos.y += fract(aRandom * 13.37) * uScatter * 0.3 - uScatter * 0.15;

    // Point size grows during dissolve
    float baseSize = 1.5;
    float dissolveSize = (3.0 + abs(aRandom) * 2.0);
    gl_PointSize = mix(baseSize, dissolveSize, uDissolve);

    // Alpha varies per-point during dissolve for sparkle
    vAlpha = mix(1.0, 0.3 + abs(aRandom) * 0.7, uDissolve);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  uniform float uOpacity;
  uniform float uDissolve;

  varying float vAlpha;

  void main() {
    float alpha = vAlpha * uOpacity;

    // When dissolving past threshold, render circular points
    if (uDissolve > 0.5) {
      vec2 center = gl_PointCoord - vec2(0.5);
      float dist = length(center);
      // Soft circular edge
      alpha *= 1.0 - smoothstep(0.35, 0.5, dist);
    }

    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
  }
`;
