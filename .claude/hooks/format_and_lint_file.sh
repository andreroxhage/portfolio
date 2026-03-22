#!/usr/bin/env bash
set -euo pipefail

if [[ -n "${CLAUDE_PROJECT_DIR:-}" ]]; then
  cd "$CLAUDE_PROJECT_DIR"
fi

INPUT_JSON="$(cat)"
FILE_PATH="$(printf '%s' "$INPUT_JSON" | jq -r '.tool_input.file_path // .tool_input.content.file_path // empty')"

if [[ -z "$FILE_PATH" || ! -f "$FILE_PATH" ]]; then
  exit 0
fi

case "$FILE_PATH" in
  *.ts|*.tsx|*.js|*.jsx|*.mjs|*.cjs|*.json|*.md|*.css)
    ;;
  *)
    exit 0
    ;;
esac

if ! npx prettier --write "$FILE_PATH"; then
  echo "Prettier failed for: $FILE_PATH" >&2
  exit 2
fi

case "$FILE_PATH" in
  *.ts|*.tsx|*.js|*.jsx|*.mjs|*.cjs)
    if ! npx eslint --fix "$FILE_PATH"; then
      echo "ESLint --fix failed for: $FILE_PATH" >&2
      exit 2
    fi
    ;;
esac
