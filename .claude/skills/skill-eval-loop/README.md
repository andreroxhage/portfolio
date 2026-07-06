# Skill Eval Loop — AI Instruction Manual

You are an AI tasked with improving a Claude Code skill through iterative testing. Follow this protocol exactly.

## 1. Identify the Target Skill

The user will specify a skill name (e.g., `text-helper`, `write-section`). The skill lives at:

```
.claude/skills/<skill-name>/SKILL.md
```

Read it. Understand what it does. This is the file you will be modifying.

## 2. Load or Create the Eval Config

Check for an existing eval config at:

```
.claude/skills/<skill-name>/eval/eval.json
```

If it doesn't exist, **create one** by analyzing the skill and generating appropriate test cases. The format:

```json
{
  "tests": [
    {
      "name": "descriptive-test-name",
      "prompt": "The exact prompt to send to Claude with this skill active",
      "context": "Optional: any file paths or context needed",
      "assertions": [
        {
          "id": "assertion-id",
          "check": "Description of what to verify in the output (must be binary true/false)",
          "expect": true
        }
      ]
    }
  ],
  "config": {
    "runs_per_test": 1,
    "max_iterations": 5,
    "pass_threshold": 0.95
  }
}
```

### Writing Good Assertions

Assertions MUST be binary (true/false). Good vs bad:

| Good (objective)                                    | Bad (subjective)                |
| --------------------------------------------------- | ------------------------------- |
| "Output contains a numbered list"                   | "Output is well-structured"     |
| "No sentence exceeds 30 words"                      | "Sentences are concise"         |
| "Uses active voice in first paragraph"              | "Writing sounds professional"   |
| "Contains at least one \parencite{} command"        | "Citations are appropriate"     |
| "Does NOT include emoji"                            | "Tone is serious"              |
| "Output mentions 'cognitive load' at least once"    | "Covers relevant topics"        |

Aim for **15–30 assertions** across **3–5 test prompts**.

## 3. Run the Loop

### Iteration 0: Baseline

Run all tests against the **unmodified** skill. Record the pass rate. This is your baseline.

### Iterations 1–N: Improve

For each iteration:

#### Step A: Analyze Failures

Look at which assertions failed. Identify patterns:
- Is the skill description too vague? (triggers incorrectly)
- Is the skill missing instructions for a specific output requirement?
- Is the skill contradicting itself?

#### Step B: Propose ONE Change

Make a **single, targeted change** to SKILL.md. Prefer changes that:
- Fix the most failures with minimal modification
- Are generalizable (not test-case-specific)
- Preserve existing passing behavior

Types of changes to try (in order of preference):
1. Clarify ambiguous instructions
2. Add a missing instruction or constraint
3. Reword the description for better trigger matching
4. Add an example to illustrate expected behavior
5. Remove contradictory or confusing instructions

#### Step C: Run All Tests Again

Execute every test prompt, evaluate every assertion. No shortcuts.

#### Step D: Compare

```
if new_pass_rate >= previous_best_pass_rate:
    keep the change
    update previous_best = new_pass_rate
else:
    revert SKILL.md to previous version
```

#### Step E: Log

Record in `.claude/skills/<skill-name>/eval/log.md`:

```markdown
## Iteration N

- **Change:** What was modified and why
- **Pass rate:** X/Y (Z%)
- **Delta:** +/- N from previous
- **Decision:** KEEP / REVERT
- **Failing assertions:** List any remaining failures
```

## 4. Termination

Stop when ANY of these are true:
- Pass rate = 100%
- Max iterations reached
- Two consecutive reverts (the skill may be at a local optimum)

## 5. Final Report

Print a summary table:

```
| Iteration | Change Summary         | Pass Rate | Decision |
|-----------|------------------------|-----------|----------|
| 0         | Baseline               | 18/25 72% | —        |
| 1         | Added output format    | 21/25 84% | KEEP     |
| 2         | Clarified trigger      | 21/25 84% | KEEP     |
| 3         | Added example          | 24/25 96% | KEEP     |
| 4         | Removed contradictions | 25/25 100%| KEEP     |
```

## 6. Holdout Validation (Optional)

If the user provides a `holdout` flag:
- Split assertions: 60% training, 40% holdout
- Only use training set during iterations
- Run holdout set ONCE at the end to check for overfitting
- Report both scores

## File Structure After Running

```
.claude/skills/<target-skill>/
├── SKILL.md              # The improved skill
├── SKILL.md.backup       # Original version (created before first change)
└── eval/
    ├── eval.json          # Test cases and assertions
    └── log.md             # Iteration log with all results
```
