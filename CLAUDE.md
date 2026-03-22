# Portfolio - Andre Roxhage

## Project Overview

Personal portfolio for Andre Roxhage, focused on frontend engineering, UX, and creativity psychology. The site uses Next.js App Router and showcases projects, photography, voluntary work, and professional experience.

## Core Commands

```bash
npm run dev
npm run build
npm run lint
npx tsc --noEmit
```

## Tech Snapshot

- Framework: Next.js 15 App Router (`src/app/`)
- Language: TypeScript (strict) with some legacy `.js` section files
- Styling: Tailwind CSS 4 + brand token system + shadcn/ui
- Animation: Framer Motion + tsparticles
- Data/infra: Neon Postgres + Cloudflare R2 + Vercel
- Alias: `@/*` -> `./src/*`

## Key Paths

- `src/app/page.tsx` - home composition
- `src/app/data.js` - portfolio content source
- `src/app/projects/[projectSlug]/page.tsx` - dynamic project pages
- `src/app/globals.css` - token/theme definitions
- `src/lib/utils.ts` - `cn()` helper

## Non-Negotiables

- Preserve warm, organic visual identity (`brand-vanilla`, `brand-cream`, primary greens).
- Keep global typography consistent with Roboto.
- Use `corner-squircle` with explicit rounded classes on curved surfaces.
- Respect reduced motion for all animation work.
- Avoid introducing new visual systems when existing tokens/components already solve it.

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
