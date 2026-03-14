---
name: commit-portfolio
description: Conventional commit workflow with pre-commit build, lint, and type checks.
origin: portfolio
---

# Portfolio Commit Skill

## Pre-Commit Checks (MANDATORY)

Run ALL three checks before committing. If any fail, fix the issues first:

```bash
# 1. Build check
npm run build

# 2. Lint check
npx eslint . --ext .js,.jsx,.ts,.tsx

# 3. Type check
npx tsc --noEmit
```

All three must pass with zero errors. Warnings are acceptable for lint only.

## Commit Message Format

```
type(scope): Brief imperative description

- Detail point 1 (if needed)
- Detail point 2 (if needed)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Types

| Type | When to use |
|------|-------------|
| `feat` | New feature or functionality |
| `fix` | Bug fix |
| `chore` | Maintenance, cleanup, config changes |
| `docs` | Documentation changes |
| `style` | Code formatting, whitespace (not CSS styling) |
| `refactor` | Code restructuring without behavior change |
| `test` | Adding or modifying tests |
| `perf` | Performance improvement |

### Scopes

| Scope | Domain |
|-------|--------|
| `ui` | Components, sections, visual changes |
| `data` | Content, project data, copy |
| `config` | Tailwind, Next.js, TypeScript, ESLint config |
| `deps` | Dependency upgrades or additions |
| `infra` | Deployment, CI/CD, environment |
| `seo` | Metadata, Open Graph, structured data |

### Examples

```
feat(ui): Add dark mode toggle to floating navigation
fix(data): Correct project slug for Join case study
chore(deps): Upgrade framer-motion to v11.5
style(ui): Align contact section spacing on mobile
refactor(config): Migrate tailwind config to CSS-first approach
perf(ui): Lazy load photography section images
docs(config): Add styling guide for design system tokens
```

## Staging Rules

- **Always** stage specific files by name: `git add src/app/components/MyComponent.tsx`
- **Never** use `git add -A` or `git add .`
- **Never** commit these files:
  - `.env.local` or any `.env*` files
  - `node_modules/`
  - `.next/`
  - `.DS_Store`
  - `.claude/settings.local.json`

## Workflow

1. Review changes: `git status` and `git diff`
2. Run pre-commit checks (all 3)
3. Stage specific files
4. Write commit message following the format above
5. Commit
6. Verify: `git log --oneline -1`
