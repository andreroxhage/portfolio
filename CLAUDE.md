# Portfolio — André Roxhage

## Project Overview

Personal portfolio website for André Roxhage — a Software Design Engineer specializing in frontend development, UX design, and creativity psychology. Built with Next.js App Router, showcasing projects, photography, voluntary work, and professional experience.

## Commands

```bash
npm run dev      # Start Next.js dev server (port 3000)
npm run build    # Production build
npm run lint     # ESLint
npx tsc --noEmit # Type check
```

## Tech Stack

- **Framework**: Next.js 15 (App Router) with `src/app/` directory
- **Language**: TypeScript 5 (strict) — some legacy `.js` section files
- **Styling**: Tailwind CSS 4 (CSS-first, no config file) with custom brand color system + shadcn/ui
- **Animation**: Framer Motion + tsparticles
- **Icons**: @tabler/icons-react, @heroicons/react
- **Data**: Neon Postgres (serverless) + Cloudflare R2 (video storage)
- **Deployment**: Vercel
- **Path alias**: `@/*` → `./src/*`

## Key Files

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Home page (Header, CurrentWork, Photography, About, Contact, Footer) |
| `src/app/layout.tsx` | Root layout, metadata, providers |
| `src/app/data.js` | All static content and project data |
| `src/app/projects/[projectSlug]/page.tsx` | Dynamic project detail pages |
| `src/app/globals.css` | Tailwind 4 theme (@theme inline), semantic tokens, design system |
| `src/lib/utils.ts` | `cn()` class merge utility (clsx + tailwind-merge) |
| `components.json` | shadcn/ui configuration |

## Architecture

```
src/app/
├── components/       # Reusable UI components
│   ├── Navbar/       # FloatingNav
│   ├── projectHoverEffect/  # ProjectCard, GifDialog, VideoDialog
│   └── ZoomParallax/ # Parallax scroll effect
├── sections/         # Page sections (Header, About, Contact, etc.)
├── projects/         # Dynamic project routes
├── contexts/         # React contexts (ProjectHoverContext)
├── hooks/            # Custom hooks (useReducedMotion, useVideo)
├── lib/              # Utilities (cn, motion, neonClient, r2Client)
└── api/videos/       # Video streaming API routes
```

## Key Constraints

- **Visual identity**: Warm, organic palette (vanilla #FAEFDE, cream #EBE1D1, green primary scale)
- **Font**: Roboto sans-serif throughout
- **Corner shapes**: `corner-squircle` class used extensively for iOS-style rounded corners
- **Animations**: shimmer + aurora keyframes, Framer Motion for component transitions
- **Reduced motion**: Always respect `prefers-reduced-motion`
- **Environment**: Requires `.env.local` with Neon DB + R2 credentials for full functionality

## Agents and Skills

### Agents (`.claude/agents/`)
- `frontend-dev` — UI components, styling, Tailwind, shadcn, framer-motion
- `content-editor` — Portfolio content, data, copy, SEO metadata
- `devops-eng` — Deployment, dependencies, build optimization, Vercel
- `evaluator` — Code review, quality scoring, design system compliance
- `design-discoverer` — Playwright-based visual audit and dark mode planning

### Skills (`.claude/skills/`)
- `frontend-style` — Design system guide (colors, typography, animations, patterns)
- `commit-portfolio` — Conventional commit workflow with pre-commit checks
