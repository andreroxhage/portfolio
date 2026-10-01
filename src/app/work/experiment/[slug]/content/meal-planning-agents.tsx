'use client';

import React, { useId } from 'react';
import Image from 'next/image';
import {
  IconBasket,
  IconBrandNotion,
  IconBulb,
  IconCheck,
  IconMessageCircle,
  IconNotebook,
  IconPlayerPlay,
  IconSearch,
  IconShieldCheck,
  IconShoppingCart,
  IconToolsKitchen2,
} from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { MiddleSection, WideSection } from '@/app/components/ProjectLayout';
import { ProgressiveMedia } from '@/app/components/ProgressiveMedia';
import { useTheme } from '@/app/contexts/ThemeContext';
import {
  DiagramChip,
  DiagramConnector,
  DiagramFanOut,
  DiagramFrame,
  DiagramGroup,
  DiagramNode,
  diagramTone,
} from '@/app/components/Diagram';
import { Lead, P, SectionHeading } from '@/components/experiment/Prose';

const levels = ['Everyday', 'Standard', 'Advanced'];

const optionalEnds = [
  {
    icon: IconBrandNotion,
    title: 'export to Notion',
    detail:
      'one week page with two subpages: shopping list and prep plan. Recipes live in a separate recipe database.',
  },
  {
    icon: IconBasket,
    title: 'Mathem cart (experimental)',
    detail: 'fills the cart only after I say yes. It never places the order.',
  },
];

function HookMarker() {
  return (
    <DiagramChip icon={IconShieldCheck}>hooks check every recipe</DiagramChip>
  );
}

function MealPlanningDiagram() {
  return (
    <DiagramFrame
      label="Five phases with three decisions by me. Hooks check the recipes, and the week can end in Notion or in a Mathem cart that never places the order."
      caption="The five phases, the three points where I decide, and where a finished week can end up."
    >
      <div className="flex flex-col items-center">
        <DiagramChip tone="you" icon={IconMessageCircle}>
          cravings + constraints
        </DiagramChip>
        <DiagramConnector />

        <DiagramNode
          step={1}
          icon={IconBulb}
          title="Brainstorming"
          detail="an agent asks for the week's level mix and proposes meals"
        >
          <ul className="flex flex-wrap gap-2">
            {levels.map(level => (
              <li key={level}>
                <DiagramChip>{level}</DiagramChip>
              </li>
            ))}
          </ul>
        </DiagramNode>
        <DiagramConnector
          label="I pick the dishes"
          tone="you"
          icon={IconCheck}
        />

        <DiagramNode
          step={2}
          icon={IconSearch}
          title="Recipe research"
          detail="one researcher per dish, all in parallel, each comparing 3-5 sources"
        >
          <DiagramFanOut lanes={['dish 1', 'dish 2', 'dish 3', 'dish n']} />
          <p className="mt-3 text-xs text-surface-dark-muted">
            + a recipe-creator for anything with no good source
          </p>
          <div className="mt-3">
            <HookMarker />
          </div>
        </DiagramNode>
        <DiagramConnector
          label="I approve the recipes"
          tone="you"
          icon={IconCheck}
        />

        <DiagramNode
          step={3}
          icon={IconShoppingCart}
          title="Shopping list"
          detail="ingredients pooled, units normalized, sorted by store section"
        />
        <DiagramConnector
          label="I approve the list"
          tone="you"
          icon={IconCheck}
        />

        <DiagramGroup label="runs on its own" icon={IconPlayerPlay}>
          <DiagramNode
            step={4}
            icon={IconNotebook}
            title="Recipe compiler"
            detail="every recipe standardized and scaled to our portions"
          >
            <HookMarker />
          </DiagramNode>
          <DiagramConnector />
          <DiagramNode
            step={5}
            icon={IconToolsKitchen2}
            title="Meal prep plan"
            detail="a cooking timeline that runs oven, stovetop, and cold prep side by side"
          />
        </DiagramGroup>
        <DiagramConnector label="optional" dashed />
        <ul className="grid w-full gap-3 sm:grid-cols-2">
          {optionalEnds.map(({ icon, title, detail }) => (
            <li
              key={title}
              className="rounded-[12px] corner-squircle border border-dashed border-foreground/20 p-3 sm:p-4"
            >
              <DiagramChip icon={icon}>{title}</DiagramChip>
              <p className="mt-2 text-xs text-surface-dark-muted">{detail}</p>
            </li>
          ))}
        </ul>
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-3">
        {(
          [
            {
              term: 'Before',
              value: '~1 h a week of tab-juggling',
              tone: 'agent',
            },
            { term: 'Now', value: '~10 min of decisions', tone: 'you' },
          ] as const
        ).map(({ term, value, tone }) => (
          <div
            key={term}
            className={cn(
              'rounded-[12px] corner-squircle border p-4',
              diagramTone[tone]
            )}
          >
            <dt className="text-xs tracking-wide">{term}</dt>
            <dd className="mt-1 text-sm font-medium tracking-tight">{value}</dd>
          </div>
        ))}
      </dl>
    </DiagramFrame>
  );
}

const videoAlt =
  'Animation in three parts. Plan the week: I ask for "At least one fish dish, and one quick meal for a busy evening." Fifteen recipe candidates fill the screen and I pick six, which get a green check. A folder named 2026-09-28/ fills with Brainstorm, Recipe picks and Shopping list, under the line "I make a few decisions. The agents do the rest." Write the recipes: recipe_guard.sh flags the step "Pour the milk over the breadcrumbs and let it soak for 10 minutes." with "Error: the step uses \'milk\' without an amount". The step becomes "Pour 1.5 dl milk over 1 dl breadcrumbs and let it soak for 10 min." with 0 errors, under the line "Strict rules guide the AI model, so the recipes are easy to read." Fill the cart: for each shopping line an agent goes through a list of products and picks the right one, Potted coriander and Sesame oil 100 ml. It asks "Shall I put everything in the Mathem cart now?", I answer Yes, the cart fills, and the Checkout button stays locked under "It never places the order".';

const hookAlt =
  'A recipe step before and after the check. Before, it reads "Pour the milk over the breadcrumbs and let it soak for 10 minutes." and recipe_guard.sh reports "Error: the step uses \'milk\' without an amount". After, it reads "Pour 1.5 dl milk over 1 dl breadcrumbs and let it soak for 10 min." with the amounts highlighted and 0 errors. Under it: "Strict rules guide the AI model, so the recipes are easy to read."';

const cartAlt =
  'How the cart gets filled, in four steps. A shopping list with "Coriander, 2 pots" and "Sesame oil, 1 small bottle". For the sesame oil, a list of products where the 100 ml bottle is picked by its size and the others are dimmed. Then the question "Shall I put everything in the Mathem cart now?", answered Yes. Last, the cart with checked items, a locked, crossed-out Checkout button and the line "It never places the order".';

const mediaCaption = 'mt-3 text-center text-sm text-surface-dark-muted';

const videoLabel =
  'Animation: planning a week, checking a recipe, filling the Mathem cart';

// One entry per theme. The .dark class on <html> hides the other.
const themeVariants = [
  { theme: 'light', className: 'dark:hidden' },
  { theme: 'dark', className: 'hidden dark:block' },
] as const;

const videoBase = '/resource/projects/meal-planning-agents-video';

// The shared edge for every media box, so video and stills match and stay
// visible on the dark surface.
const mediaFrame =
  'relative w-full overflow-hidden rounded-[20px] corner-squircle border border-foreground/10';

function MediaFrame({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn(mediaFrame, className)}>{children}</div>;
}

// One combined video (A1 + A2 + A3). Only the active theme's video mounts,
// so only one MP4 downloads. Until the client knows the theme, both posters
// render (one per theme, the .dark class hides the other), which keeps SSR
// and hydration in sync without a flash.
// The videos live in R2, with one project_videos row per theme.
function PageVideo() {
  const { resolvedTheme, mounted } = useTheme();
  const descriptionId = useId();

  return (
    <figure>
      <div role="img" aria-label={videoLabel} aria-describedby={descriptionId}>
        {mounted ? (
          <ProgressiveMedia
            key={resolvedTheme}
            videoIdentifier={`meal-planning-agents-${resolvedTheme}`}
            imageSrc={`${videoBase}-${resolvedTheme}.webp`}
            imageAlt=""
            aspectRatio="16/9"
            priority
            outline={false}
            className="border border-foreground/10"
          />
        ) : (
          themeVariants.map(({ theme, className }) => (
            <MediaFrame key={theme} className={cn('aspect-video', className)}>
              <Image
                src={`${videoBase}-${theme}.webp`}
                alt=""
                fill
                priority
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-contain"
              />
            </MediaFrame>
          ))
        )}
      </div>
      {/* hidden: read once as the video's description, not again in page order */}
      <p id={descriptionId} hidden>
        {videoAlt}
      </p>
      <figcaption className={mediaCaption}>
        The six dishes I pick are from a real week in September 2026.
      </figcaption>
    </figure>
  );
}

// Portrait stills below sm, landscape from sm up.
const stillSizes = [
  { suffix: '-mobile', className: 'aspect-[4/5] sm:hidden' },
  { suffix: '', className: 'hidden aspect-video sm:block' },
] as const;

// A static explainer still: one image per size and theme, so exactly one of
// the four is visible. The .dark class and the sm breakpoint hide the rest.
function ThemedStill({
  name,
  alt,
  caption,
}: {
  name: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure>
      {stillSizes.map(size =>
        themeVariants.map(variant => (
          <div
            key={`${size.suffix}-${variant.theme}`}
            className={cn(variant.className, 'w-full')}
          >
            <MediaFrame className={size.className}>
              <Image
                src={`/resource/projects/${name}${size.suffix}-${variant.theme}.svg`}
                alt={alt}
                fill
                unoptimized
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-contain"
              />
            </MediaFrame>
          </div>
        ))
      )}
      <figcaption className={mediaCaption}>{caption}</figcaption>
    </figure>
  );
}

const emphasis = 'font-medium text-surface-dark-foreground';

export default function MealPlanningAgentsContent() {
  return (
    <>
      {/* The whole week in one video */}
      <WideSection className="mb-10">
        <PageVideo />
      </WideSection>

      {/* Hook */}
      <MiddleSection className="mb-20 space-y-4">
        <Lead>
          Meal-kit services like HelloFresh plan your week and send you the
          groceries. That gave me the idea to build my own version with AI. I
          built a set of Claude Code agents that brainstorm dishes with me,
          research the recipes, write the shopping list, plan the cooking and
          pick what goes in our grocery cart. I&apos;ve used this workflow for
          almost a year now.
        </Lead>
        <P>
          A week starts with a conversation. Say I&apos;m in the mood for
          meatballs with mashed potatoes. I&apos;d ask for that, plus at least
          one fish dish and one quick meal for a busy evening. Planning used to
          take me about an hour a week of juggling tabs. Now it&apos;s roughly
          ten minutes of decisions. The last step can fill a grocery cart
          online, so the food is at the door the day after.
        </P>
      </MiddleSection>

      {/* The workflow */}
      <MiddleSection className="mb-10 space-y-4">
        <SectionHeading>How a week gets planned</SectionHeading>
        <P>
          Every week runs in five phases and lands as plain markdown files in a
          dated folder. A brainstorming agent asks how many Everyday, Standard
          and Advanced dishes I want, from quick weeknight food to more
          ambitious cooking, and suggests candidates. Then one recipe-researcher
          per dish runs in parallel, each comparing three to five recipes from
          different sites. A shopping-list agent pools the ingredients, sorts
          them by store section and marks anything it isn&apos;t sure about with
          &quot;verify&quot; so I can check it, instead of guessing. The last
          two phases compile the recipes into one format and build a prep plan
          that runs oven, stove and cold prep side by side.
        </P>
        <P>
          The first three phases stop and wait for me. I pick the dishes,
          approve the recipes and approve the list. Three stops may sound like a
          lot, but that&apos;s where I catch a bad pick before it ends up on the
          shopping list.
        </P>
        <P>
          A finished week can go to Notion as one overview page with two
          subpages, the shopping list and the prep plan. I also reuse my own
          recipes from my recipe database in Notion. The week links to them
          instead of copying them, so each recipe only exists in one place.
        </P>
      </MiddleSection>

      {/* Diagram */}
      <WideSection className="mb-20">
        <MealPlanningDiagram />
      </WideSection>

      {/* Rules and hooks */}
      <MiddleSection className="mb-10 space-y-4">
        <SectionHeading>One set of rules for every recipe</SectionHeading>
        <P>
          Three of the agents write recipes: the researchers, a recipe-creator
          for dishes with no good source, and the compiler. They all follow the
          same rule file, and hooks check each recipe against those rules as
          soon as it&apos;s written.
        </P>
        <P>
          Reading a step and then jumping back to the ingredient list to find
          the amount is a bad experience, and one I&apos;ve known about for a
          long time. So the most important rule says every step repeats the
          amount. &quot;Pour the milk over the breadcrumbs&quot; becomes
          &quot;Pour <span className={emphasis}>1.5 dl</span> milk over{' '}
          <span className={emphasis}>1 dl</span> breadcrumbs&quot;.
        </P>
        <P>
          The hook fixes small formatting issues itself and sends the rest back
          to the agent to fix. A second hook stops the recipe agents from
          finishing while errors remain. After two tries it lets them finish
          anyway, so they can&apos;t get stuck in a loop. A separate script
          checks that the shopping list has enough of every ingredient.
        </P>
      </MiddleSection>

      <WideSection className="mb-20">
        <ThemedStill
          name="meal-planning-a2-hook-explainer"
          alt={hookAlt}
          caption="Rules and hooks keep every recipe consistent and easy to read, for example by putting the amount in every step."
        />
      </WideSection>

      {/* The Mathem cart */}
      <MiddleSection className="mb-10 space-y-4">
        <SectionHeading>The cart, still an experiment</SectionHeading>
        <P>
          The newest phase fills a cart at Mathem, a Swedish online grocery
          store, from the shopping list. Agents on a cheaper, faster model work
          in parallel, each on up to twelve items, and pick a product for every
          line. An agent on a smarter model reviews the ones they&apos;re unsure
          about, and whatever is left comes to me as questions.
        </P>
        <P>
          At first the safety rules were written instructions in the prompts.
          Instructions can be ignored, so I moved them into hooks, settings and
          tests. Each product-picking agent can only write to its own file. The
          HTTP client only allows six Mathem endpoints, and refuses anything to
          do with checkout, delivery slots or orders. The cart can&apos;t go
          over 3,000 kronor or 10 of one item, and it has to start empty. All
          490 tests passed the last time I ran them.
        </P>
        <P>
          Nothing goes in until I answer yes when it asks &quot;Shall I put
          everything in the Mathem cart now?&quot; It ends by saying that no
          order was placed, and I place the order myself in the Mathem app.
          I&apos;ve ordered carts filled this way, and it works quite well. It
          still needs some manual work, like telling it what I already have at
          home.
        </P>
      </MiddleSection>

      <WideSection className="mb-20">
        <ThemedStill
          name="meal-planning-a3-cart-explainer"
          alt={cartAlt}
          caption="The agents pick the products, and I place the order myself."
        />
      </WideSection>

      {/* Closer */}
      <MiddleSection className="mb-20 space-y-4">
        <SectionHeading>What building it taught me</SectionHeading>
        <P>
          The three points where I approve things matter more than clever
          prompting. Give a human the decisions they care about and automate
          everything in between. Every rule that mattered ended up as code. Each
          time an instruction in a prompt failed in practice, I turned it into a
          hook, a check in code or a test.
        </P>
        <P>
          Parallel research is still the clearest case I&apos;ve found where
          several agents beat one. In my experience the recipes come out
          noticeably better. I learn a lot from the advanced dishes, and on
          other days I want a comfort recipe from my own database, or a chance
          to improve one of mine.
        </P>
        <P>
          I also ran into limits in Claude Code. Subagents can&apos;t start
          subagents of their own, so the main conversation runs the whole
          workflow and hands out the work.
        </P>
        <P>
          It&apos;s a personal tool with no formal evaluation of recipe quality.
          Six of my older recipes were written before these rules, and they
          still fail the check.
        </P>
      </MiddleSection>
    </>
  );
}
