Review recent changes for code quality, visual consistency, design system compliance, accessibility, and performance.

1. Run `git diff --name-only HEAD~1` to identify changed files (or use staged changes if uncommitted)
2. Read each changed file
3. Evaluate against:
   - TypeScript correctness (no `any`, proper types)
   - Brand color compliance (warm palette, no hardcoded colors)
   - `corner-squircle` + `cn()` usage
   - `prefers-reduced-motion` for any animations
   - Accessible markup (alt text, semantic HTML)
   - Performance (next/image, no unnecessary re-renders)
4. Output a structured evaluation report with scores per dimension and actionable items
