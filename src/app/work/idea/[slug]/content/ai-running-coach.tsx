'use client';

import React from 'react';
import {
  IconArrowRight,
  IconArrowDown,
  IconDatabase,
  IconRun,
  IconRobot,
  IconCalendarCheck,
  IconChecklist,
} from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import {
  MiddleSection,
  WideSection,
  SectionHeading,
  ProjectImage,
} from '@/app/components/ProjectLayout';

// A small pill used for attributes and readiness states
function Pill({
  children,
  tone = 'muted',
}: {
  children: React.ReactNode;
  tone?: 'muted' | 'accent';
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs whitespace-nowrap corner-squircle',
        tone === 'accent'
          ? 'bg-primary text-primary-foreground border-transparent'
          : 'bg-surface-dark-elevated text-surface-dark-muted'
      )}
    >
      {children}
    </span>
  );
}

// A titled card representing one step in the pipeline
function StepCard({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ComponentType<{
    size?: number;
    stroke?: number;
    className?: string;
  }>;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="w-full rounded-2xl corner-squircle border border-border bg-surface-dark-card px-4 py-3.5 shadow-sm">
      <div className="flex items-center gap-2">
        <Icon
          size={16}
          stroke={1.5}
          className="text-surface-dark-muted shrink-0"
        />
        <p className="text-sm font-medium text-surface-dark-foreground">
          {title}
        </p>
      </div>
      <p className="text-xs text-surface-dark-muted mt-1">{subtitle}</p>
    </div>
  );
}

// A dashed-boundary zone box, one of the three stages of the pipeline.
// Stacks vertically below md, sits side by side from md up.
function Zone({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 min-w-0 rounded-3xl corner-squircle border border-dashed border-border p-4 sm:p-5">
      <p className="text-[11px] font-medium uppercase tracking-wide text-surface-dark-muted mb-3">
        {label}
      </p>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

// Connector arrow: horizontal between zones from md up, vertical below it.
function ZoneConnector() {
  return (
    <div className="flex items-center justify-center py-2 md:py-0 md:px-1">
      <IconArrowDown
        size={18}
        stroke={1.5}
        className="text-surface-dark-muted md:hidden"
        aria-hidden="true"
      />
      <IconArrowRight
        size={18}
        stroke={1.5}
        className="text-surface-dark-muted hidden md:block"
        aria-hidden="true"
      />
    </div>
  );
}

function RunningPipelineDiagram() {
  return (
    <div className="w-full max-w-3xl mx-auto rounded-3xl corner-squircle border border-border bg-surface-dark/40 p-5 sm:p-8">
      <div className="flex flex-col md:flex-row items-stretch">
        <Zone label="Data sources">
          <StepCard
            icon={IconRun}
            title="Strava"
            subtitle="latest activities, pulled via MCP"
          />
          <StepCard
            icon={IconDatabase}
            title="Deterministic ingest"
            subtitle="append-only jsonl + rebuilt weekly rollups"
          />
        </Zone>

        <ZoneConnector />

        <Zone label="Agent">
          <StepCard
            icon={IconRobot}
            title="Coaching agent"
            subtitle="reads training block, runner profile, last 7 days"
          />
          <StepCard
            icon={IconCalendarCheck}
            title="Calendar check"
            subtitle="finds a slot that actually fits"
          />
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-surface-dark-muted">readiness:</span>
            <Pill>green</Pill>
            <Pill>amber</Pill>
            <Pill>red</Pill>
          </div>
        </Zone>

        <ZoneConnector />

        <Zone label="Output">
          <StepCard
            icon={IconChecklist}
            title="Todoist briefing"
            subtitle="warm-up, main set, paces, HR targets"
          />
        </Zone>
      </div>
      <p className="text-[11px] text-surface-dark-muted text-center mt-5">
        runs on its own every morning, before I have had coffee
      </p>
    </div>
  );
}

export default function AiRunningCoachContent() {
  return (
    <>
      {/* Hook */}
      <MiddleSection className="mb-20 space-y-6">
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          I am training for a marathon in Stockholm in 2027, and coaching apps
          kept giving me the same generic plan regardless of what my body or
          calendar was doing. What I actually wanted was a coach that reads my
          recent training, respects my schedule, and adjusts when life happens.
          So I built one: a coaching system where AI agents work on top of my
          real training data.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          The core is unglamorous and that is the point: structured markdown
          training plans, a runner profile as the single source of truth, and an
          append-only log of every session pulled from Strava.
        </p>
      </MiddleSection>

      {/* The pipeline */}
      <MiddleSection className="mb-12 space-y-6">
        <SectionHeading>The morning pipeline</SectionHeading>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          Every morning, without me touching anything, a scheduled agent ingests
          my latest Strava activities through MCP. A deterministic Python script
          updates the training log and rebuilds weekly rollups. The agent then
          reads the active training block, my runner profile, and the last seven
          days of training, checks Google Calendar for a slot that actually
          fits, and assesses readiness: green, amber, or red, based on days
          since the last quality session, heart rate suppression, and how far
          the week has drifted from plan.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          Green executes the session as prescribed. Amber runs it with softer
          pace guardrails. Red swaps in an easy day and moves the quality
          session to the next opening. Whatever the verdict, the day&apos;s full
          workout, warm-up, main set, paces, heart rate targets, lands in
          Todoist as a task before I have had coffee.
        </p>
      </MiddleSection>

      {/* Diagram */}
      <WideSection className="mb-20">
        <RunningPipelineDiagram />
      </WideSection>

      {/* Dashboard visual */}
      <WideSection className="mb-20">
        <ProjectImage
          src="/resource/projects/running_overview.png"
          alt="The training dashboard's Today view: prescribed session, readiness, week versus plan, and the latest weekly analysis"
          width={1440}
          height={900}
          caption="The companion dashboard, a Next.js app reading the same data layer."
        />
      </WideSection>

      {/* What the data layer actually buys me */}
      <MiddleSection className="mb-20 space-y-6">
        <SectionHeading>What the data layer buys me</SectionHeading>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          The rollups are what make this feel like more than a Strava widget.
          Every week and month gets a deterministic table, built by a script
          rather than the agent, with session counts, distance, time, the
          easy-versus-quality split, time-weighted average heart rate, and an
          ACWR-style load ratio. That means the agent can answer &quot;how has
          my volume trended&quot; or &quot;am I holding the 80/20 split&quot;
          instantly, by quoting a table, instead of re-deriving it from raw
          activities and risking a hallucinated number, which is exactly why it
          is forbidden from recomputing those numbers by hand. Underneath sits
          an append-only log, one row per session, plus a raw snapshot archived
          on every fetch, so the history I audit later is the same history I
          coached against that morning.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          On an actual morning, the readiness light is what changes my day. Say
          the block calls for a threshold session but I logged a hard interval
          yesterday and my resting heart rate is suppressed by eight beats this
          morning. That is amber: the agent still runs the session, just with a
          narrower pace range and longer recovery jogs, rather than pushing me
          into a session my body is not ready for or skipping quality I do not
          need to skip. Red is for the sharper cases, back-to-back quality days
          or heavier suppression, and swaps in an easy day outright, holding the
          quality session for the next opening. The dashboard adds what none of
          this gives me on its own: a glanceable week-versus-plan view, a
          session log, and the same weekly analyses the agent writes.
        </p>
      </MiddleSection>

      {/* Keeping the AI honest */}
      <MiddleSection className="mb-20 space-y-6">
        <SectionHeading>Keeping an AI coach honest</SectionHeading>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          The most interesting design work was not the coaching, it was the
          guardrails. Training data flows through three tiers: deterministic
          weekly rollups are read first and quoted as-is, per-session rows only
          when a question needs them, raw time series almost never. All
          physiology anchors, heart rate zones, thresholds, goals, live in one
          profile file it may reference but never restate. Determinism where
          numbers matter, LLM judgment where interpretation matters.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          There is an interactive layer too: a briefing skill for today&apos;s
          workout, a race-coach skill for pacing and tapering, and weekly
          reviews that follow a fixed template, always data, then analysis, then
          recommendation, then the physiological why. The methodology underneath
          is the Norwegian Singles Approach, roughly 80 percent easy running and
          the rest controlled sub-threshold work.
        </p>
      </MiddleSection>

      {/* Second visual */}
      <WideSection className="mb-20">
        <ProjectImage
          src="/resource/projects/running_workouts.png"
          alt="The workout library view of the training dashboard, organized by intensity zone"
          width={1440}
          height={900}
        />
      </WideSection>

      {/* Closer */}
      <MiddleSection className="mb-20 space-y-6">
        <SectionHeading>What I learned</SectionHeading>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          Building an agent around data you personally care about is a fantastic
          forcing function. Every hallucinated kilometer is a workout you feel
          in your legs, so you learn fast where LLMs need rails and where they
          genuinely shine. It is not a revolutionary system, honestly it is a
          Python ingest script and some markdown with an agent reading it, but
          it is one I get to redesign every time it lets me down, and that is
          genuinely satisfying to work on morning after morning.
        </p>
      </MiddleSection>
    </>
  );
}
