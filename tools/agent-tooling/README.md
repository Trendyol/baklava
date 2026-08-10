# Baklava Agent-Tooling

Agent-friendly access to the Baklava design system, modeled on Meta's Astryx
("built for people and agents"). This tooling makes Baklava's **CLI** and
**components** genuinely usable by coding agents, and includes a
**before/after benchmark harness** that measures the tooling's effect.

Layout:

```
tools/agent-tooling/
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
  mcp/                 enhanced MCP server (CEM-backed, token-efficient)
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
CLI=tools/agent-tooling/cli/bin/baklava.mjs
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
node tools/agent-tooling/bench/src/cli.mjs generate --mock

# 2) Evaluate generated outputs (deterministic); --persona naive|experienced|adversarial,
#    --model <label> tags the run so the rolling scorecard can group by model/persona:
node tools/agent-tooling/bench/src/cli.mjs evaluate --iteration <id> --persona <persona> --model <model>

# 3) Produce before/after comparison (JSON + Markdown):
node tools/agent-tooling/bench/src/cli.mjs compare --iteration <id> --persona <persona> --model <model>

# 4) Rolling / nightly scorecard across all committed iterations (Astryx-style):
node tools/agent-tooling/bench/src/cli.mjs scorecard [--persona p] [--model m] [--markdown]
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

### Step 1 — Headless render layer (real browser)

The static rubric only reads source. The optional render layer actually loads each
generated page in headless Chrome (dependency-free CDP, injects the real Baklava
`dist/baklava.js` bundle over a local HTTP server) and records what the browser
observes: runtime exceptions, console errors, custom-element upgrade rate, and basic
a11y probes (unlabeled interactives/images).

```bash
# requires a Chrome at CHROME_PATH (or the default macOS path)
node tools/agent-tooling/bench/src/cli.mjs render --iteration <id> --persona <p>
```

Render aggregates are merged into `compare` as a separate "Headless Render" section.
The adversarial run shows the tooling prevents *browser-verified* hallucination:
baseline has 6 unupgraded elements (`bl-accordion-item`, `bl-option` — tags that do
not exist in the library), while the tooled arm upgrades 100% of its 82 elements.

### Step 2 — Attr-value, nesting checks + sensitivity analysis

Since the CEM exposes `type` as a closed string union (`"primary" | "secondary" | …`),
the rubric now validates **attribute values** (e.g. `variant="red"` is a critical
`wrong_value`) and checks **nesting** against known parent–child contracts
(`bl-table-cell` inside `bl-table`, `bl-tab-panel` inside `bl-tab-group`, …). This
tightened the adversarial delta from +8 to +14 (baseline drops because of real
invalid-enum and nesting errors the old rubric missed).

A `sensitivity` command recomputes overall under several weight vectors so the
conclusion can't be an artifact of one weighting:

```bash
node tools/agent-tooling/bench/src/cli.mjs sensitivity --iteration adversarial-subagents
```

→ tooling delta is +11..+17 across all variants: the win is robust to rubric weighting.

### Step 3 — Multi-sample runs + error bars

Store extra samples as `<id>__<n>.html` next to `<id>.html`; the runner aggregates over
samples with mean/std and a 95% CI. The adversarial run now ships n=3 per cell (48
tasks total).

```bash
node tools/agent-tooling/bench/src/cli.mjs evaluate --iteration <id> --persona adversarial --model <m>
```

The n=3 adversarial result: baseline overall **79 (95% CI 75–83)** vs tooled **91
(95% CI 90–92)** — the CIs do **not** overlap, so the +12 delta is not noise.

Deepseek naive was also brought to n=3 (48 tasks): baseline **87 (95% CI 84–90)** vs
tooled **92 (95% CI 91–93)**, escape hatches 22→4 — a smaller but still non-overlapping
tooling gain under the gentler naive persona.

### Multi-model

The `evaluate --model <label>` flag already tags every run. A second model is exercised
by producing its own before/after inputs under a separate folder (e.g.
`inputs/naive-composer/`) and evaluating it as its own iteration, so each model gets its
own comparison and the scorecard can group by model.

**Measured second-model attempt (composer).** We attempted to run `cursor/composer-2.5`
as a companion model on the naive battery, through both the subagent bridge and (as a
follow-up) the `pi-cursor-sdk` direct route. Neither produced a usable dataset:

- **0 HTML files were ever written.** "Completed" children returned planning/scratchpad
text instead of writing the file; one child failed with *"completed without making edits"*.
- **Children hang for many minutes** between model calls. The harness forces composer to
`thinking high`, so each call takes minutes; after 10+ min a single-task probe was still
idle for 8 min with no output.
- One child received **contaminated context** (the parent session's prior deepseek
completion notification instead of its own task) and answered that instead. `context:"fresh"`
did not fix the hang.

**SDK-direct follow-up.** The direct route `pi --model cursor/composer-2.5 --thinking low
--mode json` *can* write valid `bl-*` HTML files, but it is too slow and flaky for a 16-task
battery: the agent aggressively explores the repo (15+ `read`, 10+ `find` per task even
when told not to), `thinking high` is forced and slow, and individual tasks routinely hit a
5–7 min ceiling with no file written (only an occasional early run completed). The `cursor`
account also has **no remaining budget** for most other models (`gemini-2.5-flash` returns
explicit "out of usage" errors; `cursor/auto` returns empty zero-token turns).

**Conclusion (earned by measurement):** the cross-model composer comparison is **deferred**.
The harness (`--model` flag + per-model input folders) is verified *ready* for any funded,
fast file-writing model, but neither the budget-starved `cursor` account nor the slow,
exploration-heavy `composer-2.5` route can produce a reliable paired dataset in this
environment today. The deliverable benchmark is therefore **deepseek-only**: the two
non-overlapping deltas above (adversarial +12, naive +5) are the honed, reproducible result.

## Validation

```bash
node tools/agent-tooling/self-test.mjs   # exit 0 = all checks pass
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
