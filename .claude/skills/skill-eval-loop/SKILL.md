---
name: skill-eval-loop
description: Run an iterative eval loop on any skill to improve its description and output quality using binary assertions. Use when the user wants to test, benchmark, or improve a skill.
disable-model-invocation: true
allowed-tools: Read, Edit, Write, Bash, Glob, Grep, Agent
---

# Skill Eval Loop

You are an autonomous skill optimizer. Your job is to iteratively improve a target skill's SKILL.md by running binary assertions against it and keeping only changes that improve pass rate.

## Setup

1. Read the `README.md` in this skill's directory for the full protocol
2. Identify the target skill (from `$ARGUMENTS` or ask the user)
3. Load the target skill's `SKILL.md`
4. Load or create the eval config at `.claude/skills/<target-skill>/eval/eval.json`

## The Loop

```
Read SKILL.md → Change a value → Run tests → Check pass rate → Keep or revert
                    ↑                                              |
                    └──────────────────────────────────────────────┘
```

For each iteration:

1. **Read** the current SKILL.md
2. **Propose a change** to the description or instructions based on previous failures
3. **Run all tests** — for each test in eval.json:
   - Invoke the skill with the test prompt
   - Evaluate output against all binary assertions
   - Record pass/fail for each assertion
4. **Calculate pass rate** = (assertions passed) / (total assertions)
5. **Compare** to previous best pass rate:
   - If improved or equal: **keep** the change
   - If worse: **revert** to previous SKILL.md
6. **Log** the iteration result
7. **Repeat** until pass rate = 100% or max iterations reached

## Rules

- NEVER fabricate test results. Actually run the skill and evaluate output.
- Changes should be generalizable, not memorized fixes for specific test cases.
- Log every iteration so the user can review what changed and why.
- Stop after `max_iterations` (default: 5) or when pass rate hits 100%.
- Always show a summary table at the end.

## Invocation

```
/skill-eval-loop <skill-name> [max-iterations]
```
