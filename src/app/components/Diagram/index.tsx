import React from 'react';
import { cn } from '@/lib/utils';

// Shared vocabulary for the hand-drawn flow diagrams on experiment pages.
// Two tones carry the meaning: `you` marks a human decision (green), `agent`
// marks work that runs on its own (warm neutral). Everything is static, so
// there is no motion to gate behind reduced-motion.

type Tone = 'agent' | 'you';

type TablerIcon = React.ComponentType<{
  size?: number;
  stroke?: number;
  className?: string;
}>;

export const diagramTone: Record<Tone, string> = {
  agent: 'border-foreground/10 bg-surface-dark-card text-surface-dark-muted',
  you: 'border-primary-200 bg-primary-100 text-primary-900 dark:border-primary-900 dark:bg-primary-950 dark:text-primary-200',
};

// The surface every diagram sits on
export function DiagramFrame({
  label,
  caption,
  className,
  children,
}: {
  label: string;
  caption?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <figure
      data-diagram
      aria-label={label}
      className={cn(
        'mx-auto w-full max-w-xl rounded-card md:rounded-panel corner-squircle border border-foreground/5 bg-secondary p-4 sm:p-8',
        className
      )}
    >
      {children}
      {caption && (
        <figcaption className="mt-6 text-center text-xs md:text-sm text-surface-dark-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// A compact label on the flow: an input, a gate, an endpoint
export function DiagramChip({
  tone = 'agent',
  icon: Icon,
  children,
}: {
  tone?: Tone;
  icon?: TablerIcon;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill corner-squircle border px-3 py-1 text-xs whitespace-nowrap',
        diagramTone[tone]
      )}
    >
      {Icon && <Icon size={14} stroke={1.5} className="shrink-0" />}
      {children}
    </span>
  );
}

// One step of the flow
export function DiagramNode({
  step,
  icon: Icon,
  title,
  detail,
  children,
}: {
  step?: number;
  icon: TablerIcon;
  title: string;
  detail: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="w-full rounded-base corner-squircle border border-foreground/10 bg-surface-dark-card p-4">
      <div className="flex items-start gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-small corner-squircle bg-secondary text-surface-dark-muted">
          <Icon size={16} stroke={1.5} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-sm font-medium tracking-heading text-surface-dark-foreground">
              {title}
            </p>
            {step !== undefined && (
              <span className="text-xs tabular-nums tracking-wide text-surface-dark-muted">
                {String(step).padStart(2, '0')}
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs md:text-sm text-surface-dark-muted">
            {detail}
          </p>
        </div>
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}

function Stem({ dashed, className }: { dashed?: boolean; className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className={cn('block text-foreground/30', className)}
      aria-hidden="true"
    >
      <path
        d="M6 0V12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray={dashed ? '2 3' : undefined}
      />
    </svg>
  );
}

function Arrow({ dashed }: { dashed?: boolean }) {
  return (
    <svg
      width="12"
      height="20"
      viewBox="0 0 12 20"
      fill="none"
      className="block text-foreground/30"
      aria-hidden="true"
    >
      <path
        d="M6 0V18.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray={dashed ? '2 3' : undefined}
      />
      <path
        d="M2.5 15L6 18.5L9.5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// A downward link between steps. A label turns it into a gate; dashed marks
// an optional path.
export function DiagramConnector({
  label,
  tone = 'agent',
  icon,
  dashed,
}: {
  label?: string;
  tone?: Tone;
  icon?: TablerIcon;
  dashed?: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      {label && (
        <>
          <Stem dashed={dashed} />
          <DiagramChip tone={tone} icon={icon}>
            {label}
          </DiagramChip>
        </>
      )}
      <Arrow dashed={dashed} />
    </div>
  );
}

// A dashed boundary around steps that share a trait
export function DiagramGroup({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon?: TablerIcon;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full rounded-media corner-squircle border border-dashed border-foreground/20 p-3 sm:p-4">
      <p className="mb-3 flex items-center gap-1.5 text-xs tracking-wide text-surface-dark-muted">
        {Icon && <Icon size={14} stroke={1.5} className="shrink-0" />}
        {label}
      </p>
      <div className="flex flex-col items-center">{children}</div>
    </div>
  );
}

// One step splitting into parallel copies of the same agent
export function DiagramFanOut({ lanes }: { lanes: string[] }) {
  const n = lanes.length;
  return (
    <div>
      <span
        className="mx-auto block size-1.5 rounded-full bg-foreground/30"
        aria-hidden="true"
      />
      <svg
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        fill="none"
        className="block h-5 w-full text-foreground/30"
        aria-hidden="true"
      >
        {lanes.map((lane, i) => {
          const x = ((i + 0.5) * 100) / n;
          return (
            <path
              key={lane}
              d={`M50 0C50 10 ${x} 10 ${x} 20`}
              stroke="currentColor"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>
      <ul
        className="grid"
        style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
      >
        {lanes.map(lane => (
          <li key={lane} className="px-1">
            <span className="block truncate rounded-small corner-squircle border border-foreground/10 bg-secondary px-1 py-1.5 text-center text-xs text-surface-dark-muted">
              {lane}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
