# Chart kit: reference implementation

Tested React + SVG primitives for the portfolio chart system. They were rendered in light and dark mode at 1280px and 390px wide, with hover, focus and the table view checked, before this file was written.

Nothing imports this yet. When the first real chart lands, copy the block below into `src/app/components/Chart/index.tsx` (next to `Diagram/`), then import from `@/app/components/Chart` everywhere after that. Keep this file in sync if the kit changes.

What each piece does:

- `ChartFrame`: the `<figure>` surface (same shape as `DiagramFrame`), title and subtitle, legend (only for two or more series), a `<details>` table view and the caption.
- `BarChart`: grouped columns with bars of 24px or less, a 4px rounded data end, a square foot, 2px gaps, one optional direct-labelled row, and a per-band hover or focus tooltip.
- `LineChart`: 2px lines, an end dot with a 2px surface ring, direct end labels, a 10% area wash for a single series, and a crosshair that snaps to the nearest x and shows every series.
- `StatTile`: label, value, and a delta against a named period.

```tsx
'use client';

import React, { useId, useLayoutEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

// Chart slots in fixed order. Index = slot - 1. Never cycle past the last one.
const SLOT = {
  fill: [
    'fill-chart-1',
    'fill-chart-2',
    'fill-chart-3',
    'fill-chart-4',
    'fill-chart-5',
  ],
  stroke: [
    'stroke-chart-1',
    'stroke-chart-2',
    'stroke-chart-3',
    'stroke-chart-4',
    'stroke-chart-5',
  ],
  bg: ['bg-chart-1', 'bg-chart-2', 'bg-chart-3', 'bg-chart-4', 'bg-chart-5'],
  text: [
    'text-chart-1',
    'text-chart-2',
    'text-chart-3',
    'text-chart-4',
    'text-chart-5',
  ],
} as const;

export type Series = { key: string; label: string; slot: 1 | 2 | 3 | 4 | 5 };
export type Row = { label: string } & Record<string, number | string>;

// Measure the rendered width so text stays at real pixel sizes on every screen
function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const ro = new ResizeObserver(([entry]) =>
      setWidth(entry.contentRect.width)
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}

// Round the axis max up to a clean number and return evenly spaced ticks
function niceTicks(max: number, count = 4) {
  const raw = max / count;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map(m => m * mag).find(s => s >= raw) ?? raw;
  return Array.from({ length: count + 1 }, (_, i) => i * step);
}

// A bar with a 4px rounded data-end and a square foot on the baseline
function barPath(x: number, y: number, w: number, h: number, r = 4) {
  const rr = Math.min(r, w / 2, h);
  return `M${x},${y + h}V${y + rr}Q${x},${y} ${x + rr},${y}H${x + w - rr}Q${x + w},${y} ${x + w},${y + rr}V${y + h}Z`;
}

export function ChartFrame({
  title,
  subtitle,
  series,
  legendMark = 'rect',
  rows,
  format = (v: number) => v.toLocaleString('en-US'),
  caption,
  children,
}: {
  title: string;
  subtitle?: string;
  series: Series[];
  legendMark?: 'rect' | 'line';
  rows: Row[];
  format?: (v: number) => string;
  caption?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <figure className="mx-auto w-full max-w-2xl rounded-[28px] md:rounded-[40px] corner-squircle border border-foreground/5 bg-secondary p-4 sm:p-8">
      <header className="mb-4">
        <p className="text-sm md:text-base font-medium tracking-heading text-foreground">
          {title}
        </p>
        {subtitle && (
          <p className="text-xs md:text-sm text-muted-foreground">{subtitle}</p>
        )}
      </header>
      {series.length > 1 && (
        <ul className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          {series.map(s => (
            <li key={s.key} className="flex items-center gap-1.5">
              <span
                aria-hidden
                className={cn(
                  SLOT.bg[s.slot - 1],
                  legendMark === 'rect'
                    ? 'size-2.5 rounded-[2px]'
                    : 'h-0.5 w-3 rounded-full'
                )}
              />
              {s.label}
            </li>
          ))}
        </ul>
      )}
      {children}
      <details className="mt-4 text-xs text-muted-foreground">
        <summary className="cursor-pointer select-none">Show data</summary>
        <table className="mt-2 w-full tabular-nums">
          <thead>
            <tr className="border-b border-foreground/10 text-left">
              <th className="py-1 font-normal" />
              {series.map(s => (
                <th key={s.key} className="py-1 text-right font-normal">
                  {s.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.label} className="border-b border-foreground/5">
                <td className="py-1">{r.label}</td>
                {series.map(s => (
                  <td key={s.key} className="py-1 text-right text-foreground">
                    {format(Number(r[s.key]))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </details>
      {caption && (
        <figcaption className="mt-4 text-xs md:text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function Tooltip({
  x,
  y,
  width,
  children,
}: {
  x: number;
  y: number;
  width: number;
  children: React.ReactNode;
}) {
  // Flip to the left of the pointer near the right edge
  const flip = x > width - 140;
  return (
    <div
      role="status"
      className="pointer-events-none absolute z-10 min-w-28 rounded-small corner-squircle bg-card px-2.5 py-2 text-xs shadow-hairline"
      style={{
        left: flip ? undefined : x + 12,
        right: flip ? width - x + 12 : undefined,
        top: Math.max(0, y - 12),
      }}
    >
      {children}
    </div>
  );
}

const PAD = { top: 12, right: 8, bottom: 28, left: 40 };

export function BarChart({
  series,
  rows,
  height = 240,
  format = (v: number) => v.toLocaleString('en-US'),
  label,
  labelRow,
}: {
  series: Series[];
  rows: Row[];
  height?: number;
  format?: (v: number) => string;
  label: string;
  // Direct-label only this row (the one the story is about)
  labelRow?: string;
}) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<{
    i: number;
    x: number;
    y: number;
  } | null>(null);
  const max = Math.max(...rows.flatMap(r => series.map(s => Number(r[s.key]))));
  const ticks = niceTicks(max);
  const top = ticks[ticks.length - 1];
  const plotW = Math.max(0, width - PAD.left - PAD.right);
  const plotH = height - PAD.top - PAD.bottom;
  const band = plotW / rows.length;
  const gap = 2;
  const barW = Math.min(
    24,
    (band * 0.7 - gap * (series.length - 1)) / series.length
  );
  const groupW = barW * series.length + gap * (series.length - 1);
  const y = (v: number) => PAD.top + plotH - (v / top) * plotH;

  return (
    <div ref={ref} className="relative">
      {width > 0 && (
        <svg
          width={width}
          height={height}
          role="group"
          aria-label={label}
          className="block overflow-visible touch-pan-y"
        >
          {ticks.map(t => (
            <g key={t}>
              <line
                x1={PAD.left}
                x2={width - PAD.right}
                y1={y(t)}
                y2={y(t)}
                className={
                  t === 0 ? 'stroke-foreground/20' : 'stroke-foreground/10'
                }
                strokeWidth={1}
                shapeRendering="crispEdges"
              />
              <text
                x={PAD.left - 8}
                y={y(t)}
                dy="0.32em"
                textAnchor="end"
                className="fill-muted-foreground text-[11px] tabular-nums"
              >
                {format(t)}
              </text>
            </g>
          ))}
          {rows.map((r, i) => {
            const x0 = PAD.left + band * i + (band - groupW) / 2;
            return (
              <g
                key={r.label}
                tabIndex={0}
                aria-label={`${r.label}: ${series.map(s => `${s.label} ${format(Number(r[s.key]))}`).join(', ')}`}
                className="outline-none [&:hover_path]:opacity-80 [&:focus-visible_path]:opacity-80"
                onPointerMove={e => {
                  const box = ref.current!.getBoundingClientRect();
                  setHover({
                    i,
                    x: e.clientX - box.left,
                    y: e.clientY - box.top,
                  });
                }}
                onPointerLeave={() => setHover(null)}
                onFocus={() => setHover({ i, x: x0 + groupW, y: PAD.top })}
                onBlur={() => setHover(null)}
              >
                {/* Hit target: the whole band, not just the painted bar */}
                <rect
                  x={PAD.left + band * i}
                  y={PAD.top}
                  width={band}
                  height={plotH}
                  className="fill-transparent"
                />
                {series.map((s, k) => {
                  const v = Number(r[s.key]);
                  const bx = x0 + k * (barW + gap);
                  return (
                    <path
                      key={s.key}
                      d={barPath(bx, y(v), barW, y(0) - y(v))}
                      className={SLOT.fill[s.slot - 1]}
                    />
                  );
                })}
                {r.label === labelRow &&
                  series.map((s, k) => (
                    <text
                      key={s.key}
                      x={x0 + k * (barW + gap) + barW / 2}
                      y={y(Number(r[s.key])) - 6}
                      textAnchor="middle"
                      className="fill-foreground text-[11px] font-medium"
                    >
                      {format(Number(r[s.key]))}
                    </text>
                  ))}
                <text
                  x={PAD.left + band * i + band / 2}
                  y={height - 8}
                  textAnchor="middle"
                  className="fill-muted-foreground text-[11px]"
                >
                  {r.label}
                </text>
              </g>
            );
          })}
        </svg>
      )}
      {hover && (
        <Tooltip x={hover.x} y={hover.y} width={width}>
          <p className="mb-1 text-muted-foreground">{rows[hover.i].label}</p>
          {series.map(s => (
            <p key={s.key} className="flex items-center gap-2">
              <span
                aria-hidden
                className={cn('h-0.5 w-3 rounded-full', SLOT.bg[s.slot - 1])}
              />
              <span className="font-medium text-foreground tabular-nums">
                {format(Number(rows[hover.i][s.key]))}
              </span>
              <span className="text-muted-foreground">{s.label}</span>
            </p>
          ))}
        </Tooltip>
      )}
    </div>
  );
}

export function LineChart({
  series,
  rows,
  height = 240,
  format = (v: number) => v.toLocaleString('en-US'),
  label,
}: {
  series: Series[];
  rows: Row[];
  height?: number;
  format?: (v: number) => string;
  label: string;
}) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hi, setHi] = useState<number | null>(null);
  const gradId = useId();
  const max = Math.max(...rows.flatMap(r => series.map(s => Number(r[s.key]))));
  const ticks = niceTicks(max);
  const top = ticks[ticks.length - 1];
  const right = 48; // room for end labels
  const plotW = Math.max(0, width - PAD.left - right);
  const plotH = height - PAD.top - PAD.bottom;
  const x = (i: number) =>
    PAD.left +
    (rows.length === 1 ? plotW / 2 : (i / (rows.length - 1)) * plotW);
  const y = (v: number) => PAD.top + plotH - (v / top) * plotH;
  const last = rows.length - 1;
  const single = series.length === 1;
  // Roughly one x label per 64px
  const every = Math.max(1, Math.ceil(rows.length / (plotW / 64)));

  return (
    <div ref={ref} className="relative">
      {width > 0 && (
        <svg
          width={width}
          height={height}
          role="img"
          aria-label={label}
          className="block overflow-visible touch-pan-y"
          onPointerMove={e => {
            const box = ref.current!.getBoundingClientRect();
            const px = e.clientX - box.left;
            const i = Math.round(((px - PAD.left) / plotW) * last);
            setHi(Math.max(0, Math.min(last, i)));
          }}
          onPointerLeave={() => setHi(null)}
        >
          {ticks.map(t => (
            <g key={t}>
              <line
                x1={PAD.left}
                x2={PAD.left + plotW}
                y1={y(t)}
                y2={y(t)}
                className={
                  t === 0 ? 'stroke-foreground/20' : 'stroke-foreground/10'
                }
                strokeWidth={1}
                shapeRendering="crispEdges"
              />
              <text
                x={PAD.left - 8}
                y={y(t)}
                dy="0.32em"
                textAnchor="end"
                className="fill-muted-foreground text-[11px] tabular-nums"
              >
                {format(t)}
              </text>
            </g>
          ))}
          {rows.map((r, i) =>
            // Thin the x labels so they never collide: one per `every` steps,
            // counted back from the last point so the latest date always shows
            (last - i) % every === 0 ? (
              <text
                key={r.label}
                x={x(i)}
                y={height - 8}
                textAnchor="middle"
                className="fill-muted-foreground text-[11px]"
              >
                {r.label}
              </text>
            ) : null
          )}
          {single && (
            <>
              <defs>
                <linearGradient
                  id={gradId}
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="1"
                  className={SLOT.text[series[0].slot - 1]}
                >
                  <stop offset="0" stopColor="currentColor" stopOpacity={0.1} />
                  <stop offset="1" stopColor="currentColor" stopOpacity={0} />
                </linearGradient>
              </defs>
              <path
                d={`M${x(0)},${y(0)}${rows.map((r, i) => `L${x(i)},${y(Number(r[series[0].key]))}`).join('')}L${x(last)},${y(0)}Z`}
                fill={`url(#${gradId})`}
              />
            </>
          )}
          {series.map(s => (
            <polyline
              key={s.key}
              points={rows
                .map((r, i) => `${x(i)},${y(Number(r[s.key]))}`)
                .join(' ')}
              fill="none"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
              className={SLOT.stroke[s.slot - 1]}
            />
          ))}
          {hi !== null && (
            <line
              x1={x(hi)}
              x2={x(hi)}
              y1={PAD.top}
              y2={y(0)}
              className="stroke-foreground/20"
              strokeWidth={1}
              shapeRendering="crispEdges"
            />
          )}
          {series.map(s => {
            const i = hi ?? last;
            return (
              <circle
                key={s.key}
                cx={x(i)}
                cy={y(Number(rows[i][s.key]))}
                r={4}
                strokeWidth={2}
                className={cn(SLOT.fill[s.slot - 1], 'stroke-secondary')}
              />
            );
          })}
          {/* Direct end labels: values at the line ends, text in ink, never series colour */}
          {hi === null &&
            series.map(s => (
              <text
                key={s.key}
                x={x(last) + 10}
                y={y(Number(rows[last][s.key]))}
                dy="0.32em"
                className="fill-foreground text-[11px] font-medium tabular-nums"
              >
                {format(Number(rows[last][s.key]))}
              </text>
            ))}
        </svg>
      )}
      {hi !== null && (
        <Tooltip x={x(hi)} y={PAD.top} width={width}>
          <p className="mb-1 text-muted-foreground">{rows[hi].label}</p>
          {series.map(s => (
            <p key={s.key} className="flex items-center gap-2">
              <span
                aria-hidden
                className={cn('h-0.5 w-3 rounded-full', SLOT.bg[s.slot - 1])}
              />
              <span className="font-medium text-foreground tabular-nums">
                {format(Number(rows[hi][s.key]))}
              </span>
              {!single && (
                <span className="text-muted-foreground">{s.label}</span>
              )}
            </p>
          ))}
        </Tooltip>
      )}
    </div>
  );
}

export function StatTile({
  label,
  value,
  delta,
  goodWhenUp = true,
}: {
  label: string;
  value: string;
  delta?: { value: number; period: string };
  goodWhenUp?: boolean;
}) {
  const up = (delta?.value ?? 0) >= 0;
  const good = up === goodWhenUp;
  return (
    <div className="rounded-[20px] corner-squircle border border-foreground/5 bg-secondary p-4 sm:p-5">
      <p className="text-xs md:text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-3xl md:text-4xl font-medium tracking-display text-foreground">
        {value}
      </p>
      {delta && (
        <p className="mt-1 text-xs text-muted-foreground">
          <span
            className={cn(
              'font-medium',
              good ? 'text-accent-foreground' : 'text-foreground'
            )}
          >
            {up ? '↑' : '↓'} {Math.abs(delta.value)}%
          </span>{' '}
          vs {delta.period}
        </p>
      )}
    </div>
  );
}
```
