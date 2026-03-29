---
paths:
  - 'src/**/*.{ts,tsx,js,jsx,css}'
---

# Frontend UI Rules

- Keep the warm, organic design language: use existing brand tokens and semantic variables.
- Preserve Roboto typography and existing spacing/radius patterns.
- Use `corner-squircle` together with explicit rounded classes where the pattern already exists.
- Prefer reusable components and existing utilities (`cn()` from `@/lib/utils`) over ad-hoc inline styling.
- Respect reduced motion and avoid introducing animation that ignores `prefers-reduced-motion`.
- Do not introduce new icon libraries; use the project's established icon packages.
