'use client';

import React from 'react';
import {
  MiddleSection,
  WideSection,
  SectionHeading,
  ProjectImage,
} from '@/app/components/ProjectLayout';

export default function ReadinessContent() {
  return (
    <>
      {/* Hook */}
      <MiddleSection className="mb-20 space-y-6">
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          Am I recovered enough to train hard today, or do I need one more easy
          day? I kept guessing, so I built an app that answers instead. Ready
          2.0 is a small iOS companion that turns each morning&apos;s heart rate
          variability into a simple readiness score, glanceable in the app or
          straight from a widget.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          It started as a learning project, an excuse to go deep on SwiftUI,
          MVVM, Core Data, HealthKit, BackgroundTasks, and WidgetKit, and ended
          up as something I genuinely check every day.
        </p>
      </MiddleSection>

      {/* How it works */}
      <MiddleSection className="mb-20 space-y-6">
        <SectionHeading>How it works</SectionHeading>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          The score is built on deviation from your own baseline, because
          absolute HRV numbers mean very little across people. The app reads HRV
          from Apple Health in a configurable morning window, compares it
          against a personal baseline over the last 7, 14, or 30 days, and
          adjusts down for elevated resting heart rate or poor sleep if you opt
          in. Research backs the approach: multi-day HRV trends relative to a
          personal baseline reflect recovery and autonomic balance far better
          than any single reading.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          The detail I am most happy with is the{' '}
          <span className="font-medium text-surface-dark-foreground">
            as-of baseline
          </span>
          : when the app recomputes history, each past day only uses data that
          existed before it, so no day ever scores itself against its own
          numbers. A background task around 06:00 keeps everything fresh and
          updates the widgets, and all data stays on device.
        </p>
      </MiddleSection>

      {/* Visuals */}
      <WideSection className="mb-20">
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-start">
          <ProjectImage
            src="/resource/projects/readiness_home.png"
            alt="Ready 2.0 home screen in light mode showing the daily readiness score"
            width={1170}
            height={2532}
            className="max-w-xs mx-auto sm:mx-0"
          />
          <ProjectImage
            src="/resource/projects/readiness_home_dark.png"
            alt="Ready 2.0 home screen in dark mode"
            width={1170}
            height={2532}
            className="max-w-xs mx-auto sm:mx-0"
          />
        </div>
      </WideSection>

      {/* Widgets */}
      <WideSection className="mb-20">
        <ProjectImage
          src="/resource/projects/readiness_widgets.png"
          alt="Ready 2.0 home and lock screen widgets showing the readiness score at a glance"
          width={1170}
          height={2532}
          className="max-w-xs mx-auto"
          caption="Widgets read the last computed score via the app group, no app launch needed."
        />
      </WideSection>

      {/* Honesty section */}
      <MiddleSection className="mb-20 space-y-6">
        <SectionHeading>Knowing what it can&apos;t tell you</SectionHeading>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          HRV is a useful signal and a noisy one. It moves with stress, sleep,
          alcohol, caffeine, illness, and even how consistently you wear your
          watch, and it lags behind what your body is actually doing. So the app
          leans on trends over single days, filters obvious outliers, and shows
          an honest &quot;unknown&quot; state when the data is too thin to say
          anything. It is a training companion, not a medical device, and
          designing it taught me to treat uncertainty as a first-class UI state
          instead of hiding it.
        </p>
      </MiddleSection>

      {/* Closer */}
      <MiddleSection className="mb-20 space-y-6">
        <SectionHeading>What I learned</SectionHeading>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          MVVM with proper service and storage layers made SwiftUI click for me,
          and HealthKit taught me humility about real-world data: gaps,
          duplicates, and readings that arrive whenever they feel like it. The
          biggest lesson was designing for imperfect signals, being clear about
          confidence instead of pretending precision. That thinking has followed
          me into every data-heavy interface I have built since.
        </p>
      </MiddleSection>
    </>
  );
}
