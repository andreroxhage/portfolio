# Portfolio - André Roxhage

## Project Overview

Personal portfolio for André Roxhage, focused on frontend engineering, UX, and creativity psychology. The site uses Next.js App Router and showcases projects, photography, voluntary work, and professional experience.

## Development

```bash
npm run dev           # Start dev server (port 3000)
npm run build         # Production build
npm run lint          # ESLint
npx tsc --noEmit      # Type check
```

## Tech Snapshot

- Framework: Next.js 15 App Router (`src/app/`)
- Language: TypeScript (strict) with some legacy `.js` section files
- Styling: Tailwind CSS 4 + brand token system + shadcn/ui
- Animation: Framer Motion + tsparticles
- Data/infra: Neon Postgres + Cloudflare R2 + Vercel
- Alias: `@/*` -> `./src/*`

## Architecture

```
src/app/
├── page.tsx              # Home composition (imports sections)
├── layout.tsx            # Root layout, metadata, viewport, providers
├── not-found.tsx         # Custom 404
├── sitemap.ts, robots.ts # SEO endpoints (generated from registries)
├── globals.css           # Tailwind 4 tokens, theme definitions
├── types.ts              # Registry types (ProjectMeta, ExperimentMeta, WritingMeta, GridItem)
├── data/                 # Static content registries — edit here first
│   ├── home.ts           # Hero + about copy
│   ├── projects.ts       # projectRegistry
│   ├── experiments.ts    # experimentRegistry (showInPreview: false hides from home grid)
│   ├── writing.ts        # writingRegistry
│   └── nav.ts            # Navigation items
├── sections/             # Home page sections
│   ├── HeroSection.tsx, AtWorkSection.tsx
│   ├── RecentProjects.tsx, ElsewhereSection.tsx, Footer.js
├── components/           # Reusable components
│   ├── Navbar/           # FloatingNav
│   ├── projectHoverEffect/  # Project cards and grid (desktop-only, home page)
│   ├── ProjectLayout.tsx # MiddleSection/WideSection/SectionHeading/ProjectImage
│   ├── OceanTransition/, WebGLCanvas/  # three.js scenes (lazy-loaded)
│   └── ZoomParallax/     # Scroll-driven parallax
├── work/                 # /work routes
│   ├── page.tsx          # SimpleList overview (projects + writing + experiments)
│   ├── project/[slug]/   # Server page (SSG + metadata) + ProjectPageClient + content/*.tsx
│   ├── experiment/[slug]/ # Same pattern; short-form pages (see docs/experiment-page-template.md)
│   ├── writing/[slug]/   # Same pattern
│   └── {project,experiment,writing}/content-map.ts  # slug → lazy content component
├── hooks/                # Custom React hooks (useReducedMotion, useVideo)
├── contexts/             # React contexts (theme, project hover)
├── lib/                  # motion tokens, neon/r2 clients
└── api/                  # API routes (video streaming via R2)
src/components/
└── ui/                   # shadcn/ui primitives (button, card, tabs, etc.)
```

### Data Flow

- Static content lives in the registries under `src/app/data/` — edit there first, not in components.
- Detail routes are statically generated: `page.tsx` (server) does the registry lookup, exports `generateStaticParams`/`generateMetadata`, calls `notFound()` on unknown slugs, and renders a `*PageClient` with the slug.
- To add a page: registry entry → `content/<slug>.tsx` → register in the route's `content-map.ts`. Experiment pages follow the short-form convention in `docs/experiment-page-template.md`.
- Home sections are composed in `page.tsx`; the project grid is desktop-only by design (mobile home has no projects section).

## Testing

There is no formal test suite. Quality gates are:

```bash
npm run build         # Next.js production build — catches runtime errors
npm run lint          # ESLint 9 (flat config, eslint.config.mjs)
npx tsc --noEmit      # TypeScript type checking
```

Visual verification is done via Playwright MCP (screenshot + inspect in browser).

## Deployment

- **Platform**: Vercel (auto-deploys from `main` branch)
- **Preview**: Every push to non-main branches creates a Vercel preview URL
- **Environment**: Variables managed via `vercel env` (Neon DB, Cloudflare R2 creds)
- **Pre-deploy checklist**: `npm run build && npm run lint && npx tsc --noEmit`

## Key Paths

- `src/app/page.tsx` - home composition
- `src/app/data/` - content registries (projects, experiments, writing, home, nav)
- `src/app/work/project/[slug]/page.tsx` - project detail pages (SSG)
- `src/app/globals.css` - token/theme definitions
- `src/lib/utils.ts` - `cn()` helper
- `docs/experiment-page-template.md` - short-form experiment page convention (local-only, docs/ is gitignored)

## Non-Negotiables

- Follow `DESIGN.md` for all visual and styling decisions — it is the single source of truth.
- Use `corner-squircle` with explicit rounded classes on curved surfaces.
- Respect reduced motion for all animation work.

## Working Style

- Reuse existing patterns before inventing new abstractions.
- Prefer minimal, targeted edits over broad refactors.
- Verify changes with relevant checks before finishing.
- Keep shared Claude behavior in `.claude/rules/`, not in long ad-hoc prompts.

## Claude Project Structure

- Rules: `.claude/rules/`
- Skills: `.claude/skills/`
- Subagents: `.claude/agents/`
- Shared settings/hooks: `.claude/settings.json` and `.claude/hooks/`
