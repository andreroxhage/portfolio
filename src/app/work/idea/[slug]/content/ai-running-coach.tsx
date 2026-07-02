'use client';

import React from 'react';
import {
  MiddleSection,
  WideSection,
  SectionHeading,
  ProjectImage,
} from '@/app/components/ProjectLayout';

export default function AiRunningCoachContent() {
  return (
    <>
      {/* Hook */}
      <MiddleSection className="mb-20 space-y-6">
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          I am training for a sub-3:00 marathon at Stockholm 2027, and coaching
          apps kept giving me the same generic plan regardless of what my body
          or calendar was doing. What I actually wanted was a coach that reads
          my recent training, respects my schedule, and adjusts when life
          happens. So I built one: a coaching system where AI agents work on top
          of my real training data.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          The core is unglamorous and that is the point: structured markdown
          training plans, a runner profile as the single source of truth, and an
          append-only log of every session pulled from Strava.
        </p>
      </MiddleSection>

      {/* The pipeline */}
      <MiddleSection className="mb-20 space-y-6">
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

      {/* Keeping the AI honest */}
      <MiddleSection className="mb-20 space-y-6">
        <SectionHeading>Keeping an AI coach honest</SectionHeading>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          The most interesting design work was not the coaching, it was the
          guardrails. Training data flows through three tiers: deterministic
          weekly rollups are read first and quoted as-is, per-session rows only
          when a question needs them, raw time series almost never. The agent is
          explicitly forbidden from recomputing volume, intensity, or heart rate
          numbers by hand, and all physiology anchors live in one profile file
          it may reference but never restate. Determinism where numbers matter,
          LLM judgment where interpretation matters.
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
          genuinely shine. The system keeps evolving with my training, and that
          is half the fun: it is a coach I get to redesign every time it lets me
          down. Whether it gets me under three hours is a question for June
          2027.
        </p>
      </MiddleSection>
    </>
  );
}
