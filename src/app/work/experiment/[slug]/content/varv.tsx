'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  IconAdjustmentsHorizontal,
  IconChartBar,
  IconDatabase,
  IconDeviceMobile,
  IconDeviceWatch,
  IconFileText,
  IconLayoutDashboard,
  IconPlayerPlay,
  IconRepeat,
  IconRun,
  IconScale,
  IconSparkles,
  IconSunrise,
} from '@tabler/icons-react';
import { MiddleSection, WideSection } from '@/app/components/ProjectLayout';
import { ProgressiveMedia } from '@/app/components/ProgressiveMedia';
import {
  DiagramChip,
  DiagramConnector,
  DiagramFrame,
  DiagramGroup,
  DiagramNode,
} from '@/app/components/Diagram';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';
import { Lead, P, SectionHeading } from '@/components/experiment/Prose';
import { cn } from '@/lib/utils';

// The varv loop, in the house style of the meal-planning diagram: one column
// of kit primitives on a single axis. Only "I run" and the morning hand-off
// are mine, so those two chips wear the `you` tone. The kit has no cycle, so
// one hand-drawn track in the frame's padding carries the last chip back up
// into "I run". Static, so there is nothing to gate behind reduced motion.

// The return track: 1.5px, the kit's connector colour
const track = 'border-foreground/30';

// Centred on the frame padding: half of p-4 below sm, half of p-8 from sm up
const gutter = '-left-2 w-2 sm:-left-4 sm:w-4';

// A right-pointing arrowhead with a short stem, drawn like the kit's arrows
function ArrowRight() {
  return (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      aria-hidden="true"
      className="block shrink-0 text-foreground/30"
    >
      <path
        d="M0 6H6.5M3 2.5L6.5 6L3 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrackLine() {
  return (
    <span
      aria-hidden="true"
      className={cn('h-0 min-w-3 flex-1 border-t-[1.5px]', track)}
    />
  );
}

// A row on the return track: a line from the gutter to the chip, and a corner
// that turns the line into the vertical run. `end` is the arrow's target.
function TrackRow({
  corner,
  end,
  children,
}: {
  corner: 'top' | 'bottom';
  end?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex w-full items-center">
      <span
        aria-hidden="true"
        className={cn(
          'absolute border-l-[1.5px] corner-squircle',
          track,
          gutter,
          corner === 'top'
            ? 'top-[calc(50%-0.75px)] bottom-0 rounded-tl-[12px] border-t-[1.5px]'
            : 'top-0 bottom-[calc(50%-0.75px)] rounded-bl-[12px] border-b-[1.5px]'
        )}
      />
      <TrackLine />
      {end && <ArrowRight />}
      {children}
      {/* Mirrors the line and arrowhead, so the chip stays on the axis */}
      <span className="min-w-3 flex-1" />
      {end && <span className="w-2 shrink-0" />}
    </div>
  );
}

// Lets a long chip wrap below sm instead of pushing the frame wide
function Wrap({ children }: { children: React.ReactNode }) {
  return <div className="max-sm:[&_span]:whitespace-normal">{children}</div>;
}

const dashboard = [
  'Season and block planning',
  'Progress and every session',
  'Recovery',
  'The reviews and the workout library',
];

function VarvLoopDiagram() {
  return (
    <DiagramFrame
      label="The varv loop: from a run, through the data and Claude, to new workouts on my phone"
      caption="Every morning the loop runs again, without me asking for anything."
    >
      <div className="flex flex-col items-center">
        <TrackRow corner="top" end>
          <DiagramChip tone="you" icon={IconRun}>
            I run
          </DiagramChip>
        </TrackRow>

        <div className="relative flex w-full flex-col items-center">
          <span
            aria-hidden="true"
            className={cn('absolute inset-y-0 border-l-[1.5px]', track, gutter)}
          />
          <DiagramConnector
            label="My Apple Watch records it"
            icon={IconDeviceWatch}
          />

          <DiagramGroup label="Runs on its own" icon={IconPlayerPlay}>
            <DiagramNode
              step={1}
              icon={IconDatabase}
              title="The data"
              detail="Every session lands in one place"
            />
            <DiagramConnector />
            <DiagramNode
              step={2}
              icon={IconChartBar}
              title="The numbers"
              detail="Scripts build the weekly stats, no model involved"
            >
              <Wrap>
                <DiagramChip icon={IconFileText}>
                  One profile file sets every zone
                </DiagramChip>
              </Wrap>
            </DiagramNode>
            <DiagramConnector />
            <DiagramNode
              step={3}
              icon={IconSparkles}
              title="Claude, headless"
              detail="Every morning it looks at the day's training, recovery and readiness"
            >
              <p className="flex items-start gap-1.5 text-xs text-surface-dark-muted">
                <IconRepeat
                  size={14}
                  stroke={1.5}
                  className="mt-px shrink-0"
                  aria-hidden="true"
                />
                Every Monday, a written review of plan against actual
              </p>
              <div className="mt-3">
                <Wrap>
                  <DiagramChip icon={IconScale}>
                    Numbers from scripts, judgment from Claude
                  </DiagramChip>
                </Wrap>
              </div>
            </DiagramNode>
          </DiagramGroup>
          <DiagramConnector />

          <DiagramNode
            step={4}
            icon={IconDeviceMobile}
            title="My phone"
            detail="New workouts on my phone every day, planned around my calendar"
          >
            <Wrap>
              <DiagramChip icon={IconAdjustmentsHorizontal}>
                Workouts adjust slightly, within the plan&apos;s own rules
              </DiagramChip>
            </Wrap>
          </DiagramNode>
          <DiagramConnector />
        </div>

        <TrackRow corner="bottom">
          <Wrap>
            <DiagramChip tone="you" icon={IconSunrise}>
              Today&apos;s workout is waiting when I wake up
            </DiagramChip>
          </Wrap>
        </TrackRow>
      </div>

      {/* Zoom out: the dashboard reads the same data as the loop */}
      <div className="mt-8 rounded-[12px] corner-squircle border border-dashed border-foreground/20 p-3 sm:p-4">
        <DiagramChip icon={IconLayoutDashboard}>The dashboard</DiagramChip>
        <ul className="mt-3 grid grid-cols-2 gap-2">
          {dashboard.map(item => (
            <li
              key={item}
              className="flex items-center justify-center rounded-[8px] corner-squircle border border-foreground/10 bg-surface-dark-card px-2 py-1.5 text-center text-xs text-surface-dark-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </DiagramFrame>
  );
}

// Page media. Every box shares one page-local frame, so the clips and stills
// get the same edge and stay visible on the dark surface. The stills have no
// dark versions: on the dark theme they read as cream panels inside the frame.

const MEDIA = '/resource/projects/varv';

const mediaFrame =
  'relative w-full overflow-hidden rounded-[20px] corner-squircle border border-foreground/10';

const mediaCaption =
  'mt-3 text-balance text-center text-sm text-surface-dark-muted';

// One entry per theme. The .dark class on <html> hides the other.
const themeVariants = [
  { theme: 'light', className: 'dark:hidden' },
  { theme: 'dark', className: 'hidden dark:block' },
] as const;

type Theme = (typeof themeVariants)[number]['theme'];

// A looping clip. Until the client knows the theme, only posters render (one
// per theme for a themed clip, and the .dark class hides the other), which
// keeps SSR and hydration in sync without a flash. After that, only the
// active theme's ProgressiveMedia mounts, so only one MP4 downloads. With
// reduced motion it gets no video at all and shows its poster.
function PageVideo({
  name,
  themed = false,
  aspectRatio,
  alt,
  caption,
  priority = false,
}: {
  name: string;
  themed?: boolean;
  aspectRatio: string;
  alt: string;
  caption: string;
  priority?: boolean;
}) {
  const { resolvedTheme, mounted } = useTheme();
  const reducedMotion = useReducedMotion();
  // useReducedMotion starts false and reads the real value in an effect. This
  // page loads lazily, after the theme has mounted, so wait for this
  // component's own first effect too: by then the motion preference is known
  // and a reduced-motion visitor never gets a <video> or its MP4 request.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const file = (theme: Theme) => `${MEDIA}/${name}${themed ? `-${theme}` : ''}`;
  const active = file(resolvedTheme);
  const posters = themed ? themeVariants : [themeVariants[0]];

  return (
    <figure>
      <div role="img" aria-label={alt}>
        {mounted && ready ? (
          <ProgressiveMedia
            key={active}
            videoSrc={reducedMotion ? undefined : `${active}.mp4`}
            imageSrc={`${active}-poster.webp`}
            imageAlt=""
            aspectRatio={aspectRatio}
            priority={priority}
            outline={false}
            className="border border-foreground/10"
          />
        ) : (
          posters.map(({ theme, className }) => (
            <div
              key={theme}
              className={cn(mediaFrame, themed && className)}
              style={{ aspectRatio }}
            >
              <Image
                src={`${file(theme)}-poster.webp`}
                alt=""
                fill
                priority={priority}
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-contain"
              />
            </div>
          ))
        )}
      </div>
      <figcaption className={mediaCaption}>{caption}</figcaption>
    </figure>
  );
}

type StillImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

// `sizes` defaults to the text column. Wider or gridded stills pass their own.
type FrameProps = StillImage & { sizes?: string };

function Frame({
  src,
  alt,
  width,
  height,
  sizes = '(max-width: 720px) 100vw, 720px',
}: FrameProps) {
  return (
    <div className={mediaFrame}>
      <Image
        src={`${MEDIA}/${src}`}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className="block h-auto w-full"
      />
    </div>
  );
}

// `frameClassName` narrows the image alone, so the caption keeps the full width
function Still({
  caption,
  className,
  frameClassName,
  style,
  ...image
}: FrameProps & {
  caption: string;
  className?: string;
  frameClassName?: string;
  style?: React.CSSProperties;
}) {
  return (
    <figure className={className} style={style}>
      <div className={frameClassName}>
        <Frame {...image} />
      </div>
      <figcaption className={mediaCaption}>{caption}</figcaption>
    </figure>
  );
}

// Two phone screens side by side, kept narrow so they stay phone-sized
function PhonePair({
  images,
  caption,
}: {
  images: [StillImage, StillImage];
  caption: string;
}) {
  return (
    <figure className="mx-auto max-w-md">
      <div className="grid grid-cols-2 gap-4">
        {images.map(image => (
          <Frame key={image.src} {...image} />
        ))}
      </div>
      <figcaption className={mediaCaption}>{caption}</figcaption>
    </figure>
  );
}

// The dashboard gallery, as two rows of two from md up
type GalleryStill = StillImage & { caption: string };

const galleryRows: [GalleryStill, GalleryStill][] = [
  [
    {
      src: 'recovery.webp',
      width: 2000,
      height: 978,
      alt: 'The recovery page with resting heart rate and HRV plotted as nightly dots against a 28-night baseline band',
      caption: 'Recovery reads the database live, night by night.',
    },
    {
      src: 'plan-week.webp',
      width: 2000,
      height: 1211,
      alt: 'The training block as a week-by-week grid of planned sessions and weekly load',
      caption: 'The training block, week by week.',
    },
  ],
  [
    {
      src: 'logger-active.webp',
      width: 1680,
      height: 1670,
      alt: 'The strength logger mid-session, with one set checked, a suggested weight bump and a rest timer',
      caption:
        'The strength logger hides the tab bar, so a gym session stays in focus.',
    },
    {
      src: 'workouts.webp',
      width: 1600,
      height: 890,
      alt: 'The workout library with filters for easy, threshold, VO₂ and race-specific sessions',
      caption: 'The workout library, from easy runs to race-specific sessions.',
    },
  ],
];

export default function VarvContent() {
  return (
    <>
      {/* Hook */}
      <MiddleSection className="mb-10 space-y-4">
        <Lead>
          I am training for a marathon, and coaching apps kept giving me the
          same generic plan regardless of what my body or calendar was doing.
          What I actually wanted was a coach that reads my recent training,
          respects my schedule, and adjusts when life happens. So I built one: a
          coaching system where AI agents work on top of my real training data.
        </Lead>
        <P>
          It started in June 2025 as a folder of markdown training plans, and my
          runs came from Strava until July 2026. Today varv is my own coaching
          system, with Claude as the coach. It reads my training every morning,
          puts the next workouts on my phone and writes me a review every week.
        </P>
      </MiddleSection>

      {/* The whole loop in one clip */}
      <WideSection className="mb-20">
        <PageVideo
          name="varv-loop-wide"
          themed
          aspectRatio="16/9"
          priority
          alt="Animation of the varv loop: a run lands in one place, scripts aggregate the data and Claude analyzes it, new workouts appear on a phone, strength sessions get logged and Claude reviews the week"
          caption="From a run on my watch to new workouts on my phone, every morning."
        />
      </WideSection>

      {/* From a run to the next workout */}
      <MiddleSection className="mb-10 space-y-4">
        <SectionHeading>From a run to the next workout</SectionHeading>
        <P>
          Every run starts on my Apple Watch, gets logged in intervals.icu and
          ends up in my own database. That database holds the full history, and
          the server pulls its own copy from it every morning.
        </P>
        <P>
          Every morning that server works out the zones for each session and
          rebuilds the weekly stats. A few minutes later Claude runs on its own,
          with no chat window open. It writes a note about yesterday, then
          updates the coming week of workouts in Todoist, each at a time that
          fits my calendar. Today&apos;s workout opens with that note and a
          readiness colour. Readiness can adjust the session slightly, but only
          in ways the training plan allows. If something breaks, I get a task
          telling me what.
        </P>
      </MiddleSection>

      <WideSection className="mb-20">
        <VarvLoopDiagram />
      </WideSection>

      {/* Keeping the coach's numbers honest */}
      <MiddleSection className="mb-10 space-y-4">
        <SectionHeading>Keeping the coach&apos;s numbers honest</SectionHeading>
        <P>
          An AI coach is only as good as the numbers it reads, so I kept the
          maths away from the model. All my training zones come from one profile
          file. Change it once, and every number downstream follows.
        </P>
        <P>
          Scripts build the weekly stats, and the dashboard and Claude both
          quote them as they are. If a chart did its own maths, its numbers
          could drift from the review quoting the same week, so an automated
          test fails when a chart tries.
        </P>
        <P>
          Claude reads the weekly summary first and only digs into single
          sessions when a question needs it. Every review follows the same four
          parts: the data, an analysis, a recommendation and the reasoning
          behind it.
        </P>
      </MiddleSection>

      <MiddleSection className="mb-20">
        <Still
          src="review-full.webp"
          width={1630}
          height={1390}
          frameClassName="mx-auto max-w-xl"
          alt="A weekly review in varv with its four tabs, a summary line and the first Data and Analysis sections"
          caption="Every weekly review has the same four parts: Data, Analysis, Recommendation and Rationale."
        />
      </MiddleSection>

      {/* Letting it run without me */}
      <MiddleSection className="mb-20 space-y-4">
        <SectionHeading>Letting it run without me</SectionHeading>
        <P>
          The jobs run on a schedule with nobody watching, and each one gets a
          fixed list of the tools it may use. The daily job can&apos;t edit
          files at all, and every job has a time limit and a budget. Each job
          leaves a line in a log, and if one never starts, I get a notification.
        </P>
        <P>
          The weekly stats should only ever come from a script. Writing that in
          Claude&apos;s instructions wasn&apos;t enough, so a hook, a small
          automatic check, now blocks any hand edit to them and points to the
          script that rebuilds them.
        </P>
      </MiddleSection>

      {/* The dashboard */}
      <MiddleSection className="mb-10 space-y-4">
        <SectionHeading>The dashboard</SectionHeading>
        <P>
          The dashboard is where I look at all of it: the plan, every session,
          recovery, the reviews and the workout library. The plan and review
          pages read the copy the server makes each morning, and the pages that
          need fresh data, like recovery and strength, ask the database
          directly.
        </P>
        <P>
          Gym sets I log in the app save straight to the database, so
          they&apos;re there the next time I open the page.
        </P>
      </MiddleSection>

      <WideSection className="mb-12">
        <Still
          src="progress-overview.webp"
          width={2000}
          height={1300}
          sizes="(max-width: 896px) 100vw, 896px"
          alt="varv's Progress overview with a weekly volume chart, this week's time, distance and sessions, and the latest weekly review"
          caption="The progress page charts the same weekly stats the coach quotes."
        />
      </WideSection>

      {/* Two rows of two. From md up each still grows by its aspect ratio,
          so both images in a row share one height and the captions line up. */}
      <WideSection className="mb-12 space-y-10">
        {galleryRows.map(row => (
          <div
            key={row[0].src}
            className="flex flex-col gap-10 md:flex-row md:items-start md:gap-6"
          >
            {row.map(still => (
              <Still
                key={still.src}
                {...still}
                sizes="(max-width: 768px) 100vw, 560px"
                className="md:min-w-0 md:flex-(--ratio)"
                style={
                  {
                    '--ratio': still.width / still.height,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        ))}
      </WideSection>

      <MiddleSection className="mb-20 space-y-12">
        <PageVideo
          name="cmdk-jump"
          aspectRatio="16/10"
          alt="Screen recording of the ⌘K palette jumping to the workout library"
          caption="⌘K jumps to any page, recent session or review."
        />
        <PhonePair
          images={[
            {
              src: 'browse-m.webp',
              width: 780,
              height: 1688,
              alt: 'The More page on a phone, an index of every section in varv',
            },
            {
              src: 'log-sheet-m.webp',
              width: 780,
              height: 1688,
              alt: 'The Log sheet on a phone, with options to tell the coach how I am and the two gym passes to start',
            },
          ]}
          caption="The Log sheet takes a quick note to the coach or starts a gym session."
        />
      </MiddleSection>

      {/* Closer */}
      <MiddleSection className="mb-20 space-y-4">
        <SectionHeading>What I learned</SectionHeading>
        <P>
          A lot of varv is there to stop the coach from guessing. Scripts build
          the weekly stats the coach quotes, and Claude&apos;s judgment goes
          into the daily notes and the reviews. The biggest lesson was that a
          prompt only asks. If something has to happen every time, a hook or a
          test has to enforce it. Building with the whole setup around the
          prompt, like hooks, rules, tool lists and scheduled jobs, was a great
          way to learn how AI workflows are built. I get to redesign the system
          every time it lets me down, and that&apos;s genuinely the part I enjoy
          most.
        </P>
      </MiddleSection>
    </>
  );
}
