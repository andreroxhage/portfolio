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
├── layout.tsx            # Root layout, metadata, fonts, providers
├── globals.css           # Tailwind 4 tokens, theme definitions
├── types.ts              # Shared TypeScript types
├── data/                 # Static content and navigation data
│   ├── data.js           # Portfolio content source (projects, work, about)
│   └── nav.ts            # Navigation items
├── sections/             # Home page sections (legacy .js)
│   ├── Header.js, About.js, CurrentWork.js
│   ├── Photography.js, VoluntaryWork.js, Footer.js
├── components/           # Reusable components
│   ├── Navbar/           # Floating navigation
│   ├── projectHoverEffect/  # Project cards and grid
│   └── ZoomParallax/     # Scroll-driven parallax
├── projects/             # /projects routes
│   └── [projectSlug]/    # Dynamic project detail pages
├── ideas/                # /ideas routes
│   └── [ideaSlug]/       # Dynamic idea detail pages
├── writing/              # /writing routes
│   └── [writingSlug]/    # Dynamic writing detail pages
├── work/                 # /work routes
├── hooks/                # Custom React hooks (useReducedMotion, etc.)
├── contexts/             # React contexts (theme, etc.)
├── lib/                  # Utilities (cn(), etc.)
└── api/                  # API routes
src/components/
└── ui/                   # shadcn/ui primitives (button, card, tabs, etc.)
```

### Data Flow

- Static content lives in `src/app/data/` — edit here first, not in components.
- Project detail pages use `[projectSlug]` with content files per project in `content/`.
- Sections are composed in `page.tsx` and rendered server-side.

## Testing

There is no formal test suite. Quality gates are:

```bash
npm run build         # Next.js production build — catches runtime errors
npm run lint          # ESLint via next lint
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
- `src/app/data/data.js` - portfolio content source
- `src/app/projects/[projectSlug]/page.tsx` - dynamic project pages
- `src/app/globals.css` - token/theme definitions
- `src/lib/utils.ts` - `cn()` helper

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
