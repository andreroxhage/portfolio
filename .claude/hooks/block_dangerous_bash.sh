#!/usr/bin/env bash
set -euo pipefail

# PreToolUse hook: block dangerous bash commands
# Reads the tool input JSON from stdin and checks the command field.

INPUT_JSON="$(cat)"
COMMAND="$(printf '%s' "$INPUT_JSON" | jq -r '.tool_input.command // empty')"

if [[ -z "$COMMAND" ]]; then
  exit 0
fi

# Block patterns
BLOCKED_PATTERNS=(
  'rm -rf /'
  'rm -rf ~'
  'rm -rf \.'
  'sudo '
  'git push --force.*main'
  'git push --force.*master'
  'git push -f.*main'
  'git push -f.*master'
  'git reset --hard'
  'git clean -fd'
  ':(){:|:&};:'
  'mkfs\.'
  'dd if='
  '> /dev/sd'
  'chmod -R 777'
  'npm publish'
)

for pattern in "${BLOCKED_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qE "$pattern"; then
    echo "BLOCKED: Command matches dangerous pattern '$pattern'" >&2
    echo "Command was: $COMMAND" >&2
    exit 2
  fi
done
