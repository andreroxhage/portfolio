# Core Engineering Rules

- Use `npm run lint` and `npx tsc --noEmit` as default quality gates for code changes.
- Prefer root-cause fixes over suppressing errors or adding workaround-only logic.
- Keep changes scoped and avoid unrelated refactors unless they are required for correctness.
- Follow existing naming and architecture patterns already established in the touched area.
- Never commit secrets (`.env*`, credentials, private keys) or generated build artifacts.
- When changing behavior, verify the updated flow with an explicit check (command output or runtime validation).
