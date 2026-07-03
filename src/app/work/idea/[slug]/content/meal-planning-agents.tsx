'use client';

import React from 'react';
import { IconArrowDown, IconCheck } from '@tabler/icons-react';
import {
  MiddleSection,
  WideSection,
  SectionHeading,
} from '@/app/components/ProjectLayout';

// A small pill used for approval gates and time-savings chips
function Pill({
  children,
  tone = 'muted',
}: {
  children: React.ReactNode;
  tone?: 'muted' | 'accent';
}) {
  return (
    <span
      className={
        'inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs whitespace-nowrap corner-squircle ' +
        (tone === 'accent'
          ? 'bg-primary text-primary-foreground border-transparent'
          : 'bg-surface-dark-elevated text-surface-dark-muted')
      }
    >
      {children}
    </span>
  );
}

// A titled card representing one phase of the workflow
function PhaseCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="w-full rounded-2xl corner-squircle border border-border bg-surface-dark-card px-5 py-4 shadow-sm">
      <p className="text-sm font-medium text-surface-dark-foreground">
        {title}
      </p>
      <p className="text-xs text-surface-dark-muted mt-0.5">{subtitle}</p>
      {children}
    </div>
  );
}

// A thin connector: an arrow, optionally labeled with an approval gate or
// "runs automatically" note. Rotates to a plain vertical line on all
// breakpoints since the flow is single-column by design (mobile-first).
function Connector({ label, auto }: { label?: string; auto?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1.5 py-1">
      <IconArrowDown
        size={16}
        stroke={1.5}
        className="text-surface-dark-muted"
        aria-hidden="true"
      />
      {label && (
        <Pill tone="accent">
          <IconCheck size={12} stroke={2.5} />
          {label}
        </Pill>
      )}
      {auto && (
        <span className="text-[11px] text-surface-dark-muted italic">
          runs automatically
        </span>
      )}
    </div>
  );
}

function MealPlanningDiagram() {
  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl corner-squircle border border-border bg-surface-dark/40 p-5 sm:p-8">
      <div className="flex flex-col items-center">
        <Pill>you: cravings + constraints</Pill>
        <Connector />

        <PhaseCard
          title="1. Brainstorming"
          subtitle="an agent proposes 10-20 candidate meals"
        />
        <Connector label="you approve the dishes" />

        <PhaseCard
          title="2. Recipe research"
          subtitle="one researcher agent per dish, running in parallel"
        >
          <div className="grid grid-cols-3 gap-2 mt-3">
            {['Dish A', 'Dish B', 'Dish C'].map(dish => (
              <div
                key={dish}
                className="rounded-lg corner-squircle border border-border bg-surface-dark-elevated px-2 py-2 text-center"
              >
                <p className="text-[11px] text-surface-dark-muted">
                  Researcher
                </p>
                <p className="text-[11px] font-medium text-surface-dark-foreground">
                  {dish}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-surface-dark-muted mt-2">
            + recipe-creator for anything with no good source
          </p>
        </PhaseCard>
        <Connector label="you approve the recipes" />

        <PhaseCard
          title="3. Shopping list"
          subtitle="ingredients pooled, units normalized, categorized"
        />
        <Connector auto />

        <PhaseCard
          title="4. Recipe compiler"
          subtitle="every recipe standardized and scaled to our portions"
        />
        <Connector auto />

        <PhaseCard
          title="5. Meal prep plan"
          subtitle="a cooking timeline that parallelizes oven, stovetop, cold prep"
        />
        <Connector label="optional" />
        <Pill>export to Notion</Pill>
      </div>

      <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
        <Pill>before: ~1h of tab-juggling a week</Pill>
        <span className="text-surface-dark-muted text-xs">→</span>
        <Pill tone="accent">now: ~10 min of decisions</Pill>
      </div>
      <p className="text-[11px] text-surface-dark-muted text-center mt-3">
        research, list-building, and prep-planning run themselves once I make
        the three calls that matter
      </p>
    </div>
  );
}

export default function MealPlanningAgentsContent() {
  return (
    <>
      {/* Hook */}
      <MiddleSection className="mb-20 space-y-6">
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          Every Sunday the same question: what do we eat this week? HelloFresh
          answered it for a while, but at a price, and with recipes that started
          repeating. So I replaced it with something I enjoy far more: a
          meal-planning system built on Claude Code agents that brainstorms
          dishes with me, researches the recipes, writes the shopping list, and
          plans the cooking.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          It usually starts with something like:{' '}
          <span className="italic text-surface-dark-foreground">
            &quot;I&apos;m eager for meatballs with mashed potatoes. Then at
            least one fish dish, one or two others that balance the week, and at
            least one quick meal for a busy evening.&quot;
          </span>{' '}
          That is not a filter query, it is a conversation with real cravings
          and constraints in it, the same way I would talk to a friend who
          cooks. Treating the input that way is what makes the brainstorm output
          feel like a good friend&apos;s suggestions rather than a spreadsheet.
          Combined with ordering groceries online, it has genuinely turned a
          weekly chore into ten minutes of fun.
        </p>
      </MiddleSection>

      {/* The workflow */}
      <MiddleSection className="mb-12 space-y-6">
        <SectionHeading>How a week gets planned</SectionHeading>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          The whole thing runs as a five-phase workflow, and every week lands as
          plain markdown in a dated folder:
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li className="text-base text-muted-foreground">
            <span className="font-medium text-surface-dark-foreground">
              Brainstorming
            </span>{' '}
            — I describe what I am craving and what needs balancing, in plain
            language, and an agent proposes 10-20 candidate meals that fit.
          </li>
          <li className="text-base text-muted-foreground">
            <span className="font-medium text-surface-dark-foreground">
              Recipe research
            </span>{' '}
            — one researcher agent per chosen dish, all running in parallel,
            each comparing 3-5 sources to find the best version rather than the
            first one. A recipe-creator agent writes one from scratch when no
            good source exists.
          </li>
          <li className="text-base text-muted-foreground">
            <span className="font-medium text-surface-dark-foreground">
              Shopping list
            </span>{' '}
            — ingredients pooled across all recipes, units normalized,
            categorized by store section.
          </li>
          <li className="text-base text-muted-foreground">
            <span className="font-medium text-surface-dark-foreground">
              Recipe compilation
            </span>{' '}
            — everything standardized into one format and scaled to our
            portions.
          </li>
          <li className="text-base text-muted-foreground">
            <span className="font-medium text-surface-dark-foreground">
              Meal prep plan
            </span>{' '}
            — a time-optimized cooking timeline that parallelizes oven,
            stovetop, and cold prep, with an optional export of the whole week
            to Notion.
          </li>
        </ol>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          The first three phases each stop and wait for my approval. That sounds
          bureaucratic; in practice it is what makes the output trustworthy. I
          pick the dishes, I sanity-check the recipes, and only then does the
          system fan out and do the tedious work.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          It is also thoroughly Swedish: output in Swedish, metric units, and
          recipe sources like Köket, Tasteline, and Arla, with shopping lists
          organized the way our stores actually are.
        </p>
      </MiddleSection>

      {/* Diagram */}
      <WideSection className="mb-20">
        <MealPlanningDiagram />
      </WideSection>

      {/* Under the hood */}
      <MiddleSection className="mb-20 space-y-6">
        <SectionHeading>Under the hood</SectionHeading>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          The whole thing is Claude Code subagents coordinated by a single
          orchestrator. Each phase is its own specialized agent,
          brainstorming-agent, recipe-researcher, shopping-list-generator,
          recipe-compiler, meal-prep-optimizer, and the main conversation calls
          them one at a time, because subagents cannot spawn subagents of their
          own. Phases 1 through 3 stop and wait because those are the decisions
          that actually matter to me: which dishes, which recipes, what goes on
          the list. Phases 4 and 5 do not ask, because compiling recipes into
          one format and building a prep timeline are just execution, there is
          nothing left for me to weigh in on.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          Every week lives in its own dated folder as five plain markdown files,{' '}
          <code>01-brainstorming.md</code> through{' '}
          <code>05-meal-prep-plan.md</code>, plus a recipe file for anything the
          recipe-creator agent wrote from scratch. The shopping-list agent is
          the fiddly one: it pools ingredients across every recipe, converts
          everything to sensible units, 1000g becomes 1kg, 10dl becomes 1l, and
          merges duplicates so I am not buying flour three times because three
          recipes each called for it separately. When a week is done, an
          optional export step publishes it to our Notion Inhandling database as
          one overview page with subpages for the shopping list, each recipe,
          and the prep plan, so grocery shopping happens straight off my phone.
        </p>
      </MiddleSection>

      {/* Closer */}
      <MiddleSection className="mb-20 space-y-6">
        <SectionHeading>What building it taught me</SectionHeading>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          This project is where multi-agent orchestration clicked for me.
          Parallel research is the clearest case I have found where agents beat
          one big prompt: five researchers comparing sources independently
          produce noticeably better recipes than one model juggling everything.
          I also learned the practical constraints, subagents cannot spawn their
          own subagents, so the main conversation has to act as orchestrator,
          and approval gates matter more than clever prompting. Give a human the
          three decisions they care about and automate everything in between.
          That pattern has shaped how I think about AI workflows well beyond
          dinner.
        </p>
      </MiddleSection>
    </>
  );
}
