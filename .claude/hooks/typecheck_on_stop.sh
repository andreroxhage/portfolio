#!/usr/bin/env bash
set -euo pipefail

if [[ -n "${CLAUDE_PROJECT_DIR:-}" ]]; then
  cd "$CLAUDE_PROJECT_DIR"
fi

if ! npx tsc --noEmit --pretty false; then
  echo "Typecheck failed. Resolve TypeScript errors before proceeding." >&2
  exit 2
fi
