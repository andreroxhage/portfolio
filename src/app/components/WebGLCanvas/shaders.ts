/**
 * GLSL shaders for the topographic ocean-wave WebGL canvas.
 *
 * Uniforms:
 *   uTime       — continuous clock for ambient drift
 *   uAmplitude  — wave height multiplier
 *   uColor      — line color (theme-aware)
 *   uFogNear    — view-space depth where fog begins
 *   uFogFar     — view-space depth where fog fully obscures
 *   uLineCount  — total number of wave lines (for normalization)
 *
 * Attributes:
 *   position    — vec3 (standard)
 *   aLineIndex  — which line this point belongs to
 */

export const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uAmplitude;
  uniform float uLineCount;

  attribute float aLineIndex;

  varying float vViewDepth;
  varying float vAlpha;

  void main() {
    vec3 pos = position;

    // Normalized line position (0 = nearest, 1 = farthest)
    float lineT = aLineIndex / uLineCount;

    // --- Layered wave displacement for organic topographic look ---

    // Broad primary swell — slow, large-scale ocean movement
    float wave1 = sin(pos.x * 0.22 + uTime * 0.10 + pos.z * 0.12)
                * cos(pos.z * 0.08 + uTime * 0.07) * 2.4;

    // Secondary cross-wave — medium frequency, counter-moving
    float wave2 = sin(pos.x * 0.55 - uTime * 0.065 + pos.z * 0.22) * 0.9;

    // Tertiary — slow, very broad undulation
    float wave3 = cos(pos.x * 0.10 + uTime * 0.09 + pos.z * 0.06) * 1.7;

    // Fine detail ripple — high frequency, low amplitude
    float wave4 = sin(pos.x * 1.4 + uTime * 0.13 + pos.z * 0.55) * 0.22;

    // Ultra-low frequency drift — gives the whole field a gentle tilt over time
    float wave5 = sin(pos.x * 0.05 + uTime * 0.04) * cos(pos.z * 0.03 + uTime * 0.06) * 1.2;

    // X-envelope: slightly reduce displacement at extreme edges
    float xNorm = pos.x / 20.0;
    float xEnvelope = 1.0 - 0.3 * xNorm * xNorm;

    pos.y += (wave1 + wave2 + wave3 + wave4 + wave5) * uAmplitude * xEnvelope;

    // --- View-space depth for fog ---
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewDepth = -mvPosition.z;

    // Per-line alpha variation — subtle breathing between lines
    vAlpha = 0.28 + 0.12 * sin(aLineIndex * 0.7 + 1.3);

    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uFogNear;
  uniform float uFogFar;

  varying float vViewDepth;
  varying float vAlpha;

  void main() {
    // Smooth linear fog based on view-space depth
    float fogFactor = smoothstep(uFogNear, uFogFar, vViewDepth);
    float alpha = vAlpha * (1.0 - fogFactor);

    if (alpha < 0.008) discard;

    gl_FragColor = vec4(uColor, alpha);
  }
`;
