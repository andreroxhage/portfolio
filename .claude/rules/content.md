---
paths:
  - 'src/app/data/**/*.ts'
  - 'src/app/sections/**/*.{js,jsx,ts,tsx}'
  - 'src/app/work/**/*.tsx'
  - 'src/app/layout.tsx'
---

# Content and Metadata Rules

- Keep voice concise, human-centered, and professional. Follow `.claude/skills/personal-voice/SKILL.md` for all user-facing copy.
- Prefer editing the structured registries in `src/app/data/` (projects.ts, ideas.ts, writing.ts, home.ts) before hardcoding copy in components.
- Detail-page copy lives in `src/app/work/{project,idea,writing}/[slug]/content/<slug>.tsx`, registered in that route's `content-map.ts`. Idea pages follow the short-form convention in `docs/idea-page-template.md`.
- Ensure major content updates keep metadata and page descriptions aligned (`generateMetadata` reads registry title/subtitle).
- Maintain semantic HTML and accessible labels/alt text when editing visible content.
- Keep text factually consistent across home sections, work pages, and metadata.
