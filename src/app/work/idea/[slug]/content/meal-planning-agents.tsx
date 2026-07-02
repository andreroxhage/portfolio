'use client';

import React from 'react';
import { MiddleSection, SectionHeading } from '@/app/components/ProjectLayout';

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
          plans the cooking. Combined with ordering groceries online, it has
          genuinely turned a weekly chore into ten minutes of fun.
        </p>
      </MiddleSection>

      {/* The workflow */}
      <MiddleSection className="mb-20 space-y-6">
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
            — I say something like &quot;high protein, quick weekday
            dinners&quot; and an agent proposes 10-20 candidate meals.
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
