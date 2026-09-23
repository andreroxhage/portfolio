#!/usr/bin/env node
/* eslint-disable no-console -- CLI report output */
// Validate the chart palette in src/app/globals.css.
//
// Reads --chart-1..N and the chart surfaces straight from the :root and .dark
// blocks, so the check always runs against the tokens that actually ship.
// Checks, per mode:
//   band      OKLCH L inside the mode's band (light 0.43–0.77, dark 0.48–0.67)
//   chroma    OKLCH C >= 0.10 (below it a hue reads as gray)
//   cvd       adjacent-pair OKLab ΔE×100 under protan/deutan (Machado 2009,
//             severity 1.0): >= 8 pass, 6–8 warn (needs labels), < 6 fail
//   normal    adjacent-pair ΔE×100 under normal vision: >= 15, hard gate
//   contrast  WCAG ratio vs every chart surface: >= 3:1, else labels required
//   all-pairs the first three slots, for scatter/small multiples
//
// Usage: node .claude/skills/portfolio-charts/scripts/check-chart-palette.mjs
// Exit 1 on any hard fail.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..');
const css = readFileSync(resolve(root, 'src/app/globals.css'), 'utf8');

// --- token parsing -----------------------------------------------------------
function block(selector) {
  const start = css.search(
    new RegExp(`^${selector.replace('.', '\\.')}\\s*\\{`, 'm')
  );
  if (start < 0) {
    throw new Error(`no ${selector} block in globals.css`);
  }
  return css.slice(start, css.indexOf('\n}', start));
}
function tokens(src) {
  const out = {};
  for (const [, name, v] of src.matchAll(
    /--([\w-]+):\s*([\d.]+\s+[\d.]+\s+[\d.]+)\s*;/g
  )) {
    out[name] = v.trim().split(/\s+/).map(Number);
  }
  return out;
}
const light = tokens(block(':root'));
const dark = { ...light, ...tokens(block('.dark')) };

// --- color math --------------------------------------------------------------
function oklchToLin([L, C, H]) {
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h),
    b = C * Math.sin(h);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ].map(c => Math.max(0, Math.min(1, c)));
}
function linToOklab([r, g, b]) {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}
// Linear RGB round-trips through 8-bit sRGB, as the browser renders it
const enc = c => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
const dec = c => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const quantize = lin => lin.map(c => dec(Math.round(enc(c) * 255) / 255));
const toLin = lch => quantize(oklchToLin(lch));
const hex = lch =>
  '#' +
  oklchToLin(lch)
    .map(c =>
      Math.round(enc(c) * 255)
        .toString(16)
        .padStart(2, '0')
    )
    .join('');

// Machado, Oliveira & Fernandes (2009), severity 1.0, linear RGB
const CVD = {
  protan: [
    [0.152286, 1.052583, -0.204868],
    [0.114503, 0.786281, 0.099216],
    [-0.003882, -0.048116, 1.051998],
  ],
  deutan: [
    [0.367322, 0.860646, -0.227968],
    [0.280085, 0.672501, 0.047413],
    [-0.01182, 0.04294, 0.968881],
  ],
};
const sim = (lin, M) =>
  M.map(row =>
    Math.max(
      0,
      Math.min(1, row[0] * lin[0] + row[1] * lin[1] + row[2] * lin[2])
    )
  );
function deltaE(a, b, kind) {
  const [x, y] = [toLin(a), toLin(b)].map(l =>
    linToOklab(kind ? sim(l, CVD[kind]) : l)
  );
  return 100 * Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]);
}
const lum = lch => {
  const [r, g, b] = toLin(lch);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (hi + 0.05) / (lo + 0.05);
};

// --- checks ------------------------------------------------------------------
const BAND = { light: [0.43, 0.77], dark: [0.48, 0.67] };
const SURFACES = ['background', 'secondary', 'card'];
let failed = false;

function run(mode, t) {
  const slots = Object.keys(t)
    .filter(k => /^chart-\d+$/.test(k))
    .sort((a, b) => a.slice(6) - b.slice(6));
  const pal = slots.map(k => t[k]);
  const rows = [];
  const add = (check, state, detail) => {
    rows.push([state, check, detail]);
    if (state === 'FAIL') {
      failed = true;
    }
  };

  const [lo, hi] = BAND[mode];
  const off = slots.filter((_, i) => pal[i][0] < lo || pal[i][0] > hi);
  add(
    'band',
    off.length ? 'FAIL' : 'PASS',
    off.length ? `outside L ${lo}–${hi}: ${off.join(', ')}` : `L ${lo}–${hi}`
  );
  const gray = slots.filter((_, i) => pal[i][1] < 0.1);
  add(
    'chroma',
    gray.length ? 'FAIL' : 'PASS',
    gray.length ? `below 0.10: ${gray.join(', ')}` : 'all >= 0.10'
  );

  const pairs = (n, all) =>
    all
      ? Array.from({ length: n }, (_, i) =>
          Array.from({ length: n - i - 1 }, (_, k) => [i, i + 1 + k])
        ).flat()
      : Array.from({ length: n - 1 }, (_, i) => [i, i + 1]);
  for (const [label, list] of [
    ['adjacent', pairs(pal.length)],
    ['all-pairs 1–3', pairs(Math.min(3, pal.length), true)],
  ]) {
    let cvd = [Infinity],
      nv = [Infinity];
    for (const [i, j] of list) {
      for (const kind of ['protan', 'deutan']) {
        const d = deltaE(pal[i], pal[j], kind);
        if (d < cvd[0]) {
          cvd = [d, kind, slots[i], slots[j]];
        }
      }
      const d = deltaE(pal[i], pal[j]);
      if (d < nv[0]) {
        nv = [d, slots[i], slots[j]];
      }
    }
    add(
      `cvd ${label}`,
      cvd[0] >= 8 ? 'PASS' : cvd[0] >= 6 ? 'WARN' : 'FAIL',
      `worst ${cvd[2]}↔${cvd[3]} ΔE ${cvd[0].toFixed(1)} (${cvd[1]})`
    );
    add(
      `normal ${label}`,
      nv[0] >= 15 ? 'PASS' : 'FAIL',
      `worst ${nv[1]}↔${nv[2]} ΔE ${nv[0].toFixed(1)}`
    );
  }

  for (const s of SURFACES) {
    const low = slots
      .filter((_, i) => contrast(pal[i], t[s]) < 3)
      .map(k => `${k} ${contrast(t[k], t[s]).toFixed(2)}:1`);
    add(
      `contrast vs --${s}`,
      low.length ? 'WARN' : 'PASS',
      low.length
        ? `below 3:1, labels required: ${low.join(', ')}`
        : 'all >= 3:1'
    );
  }

  console.log(
    `\n${mode}: ${slots.map((k, i) => `${k} ${hex(pal[i])}`).join('  ')}`
  );
  for (const [state, check, detail] of rows) {
    console.log(`  [${state}] ${check.padEnd(22)} ${detail}`);
  }
}

run('light', light);
run('dark', dark);
console.log(failed ? '\n→ FAILED' : '\n→ all hard gates pass');
process.exit(failed ? 1 : 0);
