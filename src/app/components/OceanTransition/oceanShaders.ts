/**
 * Ocean-specific GLSL shaders for the transition section.
 *
 * Creates sharp ridge crests with fine ripple detail,
 * mimicking a helicopter view of ocean waves.
 */

export const oceanVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uAmplitude;
  uniform float uLineCount;

  attribute float aLineIndex;

  varying float vViewDepth;
  varying float vAlpha;
  varying float vHeight;

  void main() {
    vec3 pos = position;

    // --- Directional coordinate for diagonal wave ridges ---
    // Ridges run roughly bottom-left to top-right
    float diag = pos.x * 0.5 + pos.z * 0.8;
    float cross = pos.x * 0.6 - pos.z * 0.3;

    // --- Primary ridge waves (sharp crests) ---
    float ridge1 = 1.0 - abs(sin(diag * 0.28 + uTime * 0.07));
    ridge1 = pow(ridge1, 2.5) * 2.8;

    // Secondary ridge set — offset angle, slower
    float ridge2 = 1.0 - abs(sin(diag * 0.18 - uTime * 0.04 + 1.8));
    ridge2 = pow(ridge2, 2.0) * 1.2;

    // Cross-swell — perpendicular, subtle
    float swell = sin(cross * 0.15 + uTime * 0.05) * 0.6;

    // --- Fine ripple detail ---
    float ripple1 = sin(pos.x * 1.8 + pos.z * 1.2 + uTime * 0.12) * 0.12;
    float ripple2 = sin(pos.x * 2.5 - pos.z * 0.8 + uTime * 0.09) * 0.08;

    // --- Broad slow drift ---
    float drift = sin(pos.x * 0.06 + uTime * 0.03) * cos(pos.z * 0.04 + uTime * 0.025) * 0.8;

    float totalDisp = (ridge1 + ridge2 + swell + ripple1 + ripple2 + drift) * uAmplitude;
    pos.y += totalDisp;

    // Pass height for brightness variation (crests glow brighter)
    vHeight = totalDisp;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewDepth = -mvPosition.z;

    // Per-line alpha with slight variation
    vAlpha = 0.22 + 0.10 * sin(aLineIndex * 0.5 + 0.8);

    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const oceanFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uFogNear;
  uniform float uFogFar;
  uniform float uAmplitude;

  varying float vViewDepth;
  varying float vAlpha;
  varying float vHeight;

  void main() {
    // Fog
    float fogFactor = smoothstep(uFogNear, uFogFar, vViewDepth);

    // Height-based brightness: crests are brighter
    float heightNorm = clamp(vHeight / (uAmplitude * 3.0), 0.0, 1.0);
    float brightness = 0.7 + 0.3 * heightNorm;

    float alpha = vAlpha * brightness * (1.0 - fogFactor);

    if (alpha < 0.008) discard;

    gl_FragColor = vec4(uColor * brightness, alpha);
  }
`;
