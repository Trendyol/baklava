# Baklava Agent-Tooling — PoC

Agent-friendly access to the Baklava design system, modeled on Meta's Astryx
("built for people and agents"). The PoC makes Baklava's **CLI** and
**components** genuinely usable by coding agents, and includes a
**before/after benchmark harness** that measures the tooling's effect.

Layout:

```
poc/agent-tooling/
  cli/                 Baklava agent CLI (dependency-free, CEM-backed)
    bin/baklava.mjs    executable entry
    lib/cem.mjs        loads dist/custom-elements.json (source of truth)
    lib/dense.mjs      token-efficient dense rendering
    lib/search.mjs     "build" ranking (synonyms/stemming/scoring)
    lib/examples.mjs   usage-example extraction from stories
  bench/               before/after benchmark harness
    prompts/prompts.json   prompt battery (naive persona, UX phrasing)
    prompts/experienced.json   battery phrased by a developer who knows bl-* APIs
    prompts/adversarial.json   battery referencing other frameworks (MUI/Bootstrap/…) to bait escape
    src/evaluate.mjs       deterministic rubric evaluator (vs real CEM)
    src/cli.mjs            evaluate / compare / scorecard / generate --mock
    results/               before/after data (inputs, evaluated, judge, compare.*, scorecard.*)
  mcp/                 enhanced MCP server PoC (CEM-backed, token-efficient)
```

## Why this way (Astryx methodology)

From the Astryx blog/CLI:

- **CLI is the docs.** A single source of truth consumed by both humans and
  agents means nothing can go stale. We back the CLI with the **generated
  `dist/custom-elements.json`** so output always matches the real API.
- **Token-efficient, dense output.** Agents have small context windows; the CLI
  emits exactly what is needed (`--dense`, `--json`).
- **Good examples to copy.** `example` surfaces real Storybook usage; `build`
  ranks the right components for a plain-language prompt.
- **Earned by measurement, not opinion.** The benchmark produces extractable
  before/after data so every change is justified by numbers.

## CLI usage

Run from the baklava repo root:

```bash
CLI=poc/agent-tooling/cli/bin/baklava.mjs
node $CLI help
node $CLI components
node $CLI component button --dense        # token-efficient API dump
node $CLI component input --props
node $CLI component input --example        # real usage examples from the story
node $CLI build "a login form with email and password"
node $CLI swizzle button                    # full source for customization
node $CLI component select --json          # machine-readable envelope
```

`--json` emits a stable `{ ok, command, ... }` envelope for MCP / agents.

## Benchmark usage

The benchmark measures: **baseline (before)** = agent working from raw knowledge
only; **augmented (after)** = agent with the Baklava agent CLI/tooling. Outputs
are evaluated against the real CEM on rubric dimensions.

```bash
# 1) Generate agent outputs (real LLM) — see README "Generating real outputs",
#    or for a deterministic demo without an LLM:
node poc/agent-tooling/bench/src/cli.mjs generate --mock

# 2) Evaluate generated outputs (deterministic); --persona naive|experienced|adversarial,
#    --model <label> tags the run so the rolling scorecard can group by model/persona:
node poc/agent-tooling/bench/src/cli.mjs evaluate --iteration <id> --persona <persona> --model <model>

# 3) Produce before/after comparison (JSON + Markdown):
node poc/agent-tooling/bench/src/cli.mjs compare --iteration <id> --persona <persona> --model <model>

# 4) Rolling / nightly scorecard across all committed iterations (Astryx-style):
node poc/agent-tooling/bench/src/cli.mjs scorecard [--persona p] [--model m] [--markdown]
```

Inputs are stored per persona under `bench/results/inputs/<persona>/<arm>/<promptId>.html`, so
different personas (and future model generations) never clobber each other — the Astryx
per-config-environment idea.

Result data lives in `bench/results/<id>/`: `compare.json` (machine-readable),
`compare.md` (human-readable), `evaluated/<arm>/*.json` (deterministic per-prompt results), and
`judge/<arm>/*.json` (optional LLM-judge holistic layer).

The **rolling scorecard** (`bench/results/scorecard.json` / `scorecard.md`) aggregates every
committed iteration into a single table — the "earned by measurement" ledger Astryx keeps across
nights. Wire `evaluate` + `compare` into a nightly cron to grow it over time.

### Optional LLM-judge layer (Astryx separate-judge principle)

The deterministic rubric never lets a model grade itself. For a holistic check, spawn
fresh-context **judge** subagents (one per generated file) that read the real API and score
correctness/accessibility/efficiency/codeQuality/maintainability/overall on 0–100, writing to
`bench/results/<id>/judge/<arm>/<id>.json`. `compare` auto-merges these into a separate
"LLM Judge" section, kept distinct from the deterministic deltas.

A committed naive real run (16 agent tasks: 8 prompts × 2 arms) lives under
`bench/results/real-subagents/`. A committed adversarial run (same 16 tasks, adversarial
persona — prompts baiting escape toward MUI/Bootstrap/Tailwind) lives under
`bench/results/adversarial-subagents/` and ships with LLM-judge data.

## Validation

```bash
node poc/agent-tooling/self-test.mjs   # exit 0 = all checks pass
```

The self-test exercises the CLI commands and the deterministic evaluator, and
verifies the committed real results (`real-subagents`, `adversarial-subagents`) exist
and show a positive delta.

## Reproducing real before/after outputs

Real LLM outputs are produced by running actual coding agents on each prompt in
each arm (see `AGENTS-TOOLING.md` for the exact agent task prompts), writing to
`bench/results/inputs/<arm>/<promptId>.html`. Evaluation and comparison then run
deterministically on those inputs. This keeps the benchmark rerunnable and the
numbers comparable across iterations.
