# Baklava Agent Tooling — How Agents Use It

This document is the operating manual for an **AI coding agent** (or human) who
wants to produce correct, idiomatic Baklava UI. It explains the CLI, the MCP
server, and how the before/after benchmark is produced.

## 1. CLI — the agent-friendly entry point

The CLI is docs-first and CEM-backed, so its output always matches the real
component API. **Always consult it before writing a Baklava component.**

From the repo root:

```bash
CLI=tools/agent-tooling/cli/bin/baklava.mjs

# discover what exists and what a prompt maps to
node $CLI build "a login form with email and password"

# read the exact API for a component before using it
node $CLI component button --dense        # attributes, events, slots, css vars
node $CLI component input --props         # attributes + JS properties only
node $CLI component tag --example         # real usage from the story
node $CLI component dialog --source       # full source (customization)

# machine-readable for tooling / MCP
node $CLI component select --json
```

Rules for agents:

- **Never guess a prop/attribute/event.** Check `component <name> --dense` first.
- **Prefer Baklava components over `<div>`/native elements** for UI structure,
  tables, dialogs, forms, tabs, steppers, notifications, etc.
- **Events are `bl-*` CustomEvents.** Listen with `addEventListener('bl-click', …)`.
- Boolean flags that reflect are real attributes (`?disabled` in Lit / `disabled`
  in HTML). Use literal-string unions shown in parentheses.

## 2. MCP server — drop into any MCP client

```bash
# launches a stdio MCP server exposing the tools below
node tools/agent-tooling/mcp/mcp-server.mjs
```

Tools: `list_components`, `get_component`, `component_build`,
`component_examples`, `component_source`. This replaces the old GitHub-fetching
MCP with a local, CEM-backed, token-efficient one.

## 3. Benchmark — producing before/after data

The harness measures the tooling's effect across **three arms** on the same repo
and prompts, isolating tooling from repo-state noise. Evaluation is deterministic
against the real CEM.

Arms:
- **baseline** — only the plain-language prompt + available `bl-*` tag names (no
  API docs, no MCP, no CLI): realistic guesses and some errors.
- **mcp-only** — the prompt + the **Baklava MCP server** (via `mcp/client.mjs`), no
  CLI: the honest “current usage” where an agent asks MCP for real component details.
- **augmented** — the prompt + the CLI (and MCP), required to run
  `component <name> --dense` / `example <name>` before writing code: exact-API HTML.

Steps:

1. **Generate agent outputs** for each prompt × arm and save to
   `bench/results/inputs/<arm>/<promptId>.html` (multi-sample: `<id>__<n>.html`).
   In this benchmark the agent outputs were produced by real coding **subagents**
   (one per arm/prompt) following the task contracts below; the naive deepseek 3-arm
   run is committed under `bench/results/inputs/` and evaluated into
   `bench/results/naive-3arm/`. Any LLM agent can be used as long as it follows the
   contract below.
2. **Evaluate** (deterministic):
   `node tools/agent-tooling/bench/src/cli.mjs evaluate --iteration <id>`
3. **Compare** (before/after → `compare.json` + `compare.md`):
   `node tools/agent-tooling/bench/src/cli.mjs compare --iteration <id>`

Deterministic demo without an LLM:
`node tools/agent-tooling/bench/src/cli.mjs generate --mock`

### Agent task contract

**Baseline arm task:**
> You build frontend HTML with the Baklava web-component design system. Available
> component tags: {list}. You do NOT have API docs; you only know tag names and general
> web-component conventions. Output only a self-contained HTML fragment using `<bl-*>`
> tags for the prompt.

**Augmented arm task:**
> You build frontend HTML with Baklava. You have the agent CLI: run
> `node tools/agent-tooling/cli/bin/baklava.mjs build "<prompt>"` then
> `component <Name> --dense` for each candidate. Write your HTML, then run
> `validate <file>.html` and **iterate until it reports clean** — fix every flagged
> unknown tag/attr, invalid enum value, nesting, wrapper `<div>` and inline style.
> Use ONLY real components and real attributes/events shown by the CLI. Output only
> a self-contained HTML fragment.

The `validate` feedback loop is the CLI's edge over the MCP-only arm: MCP is
query-only (it can tell you the real API, but cannot check the file you produced),
whereas `validate` lints the generated file against the same CEM so the agent can
fix issues before the output is measured.

**MCP-only arm task:**
> You build frontend HTML with Baklava. You learn the component API ONLY through the
> Baklava MCP server, using this stdio client wrapper:
> `node tools/agent-tooling/mcp/client.mjs` — call `list_components`,
> `component_build`, `get_component`, `component_examples`. Use ONLY real bl-* tags
> and real attributes/events the MCP responses confirm. Do **not** run the baklava CLI.
> Output only a self-contained HTML fragment.

### Rubric (deterministic evaluator)

- `correctness` — real components used; hallucinated `bl-*` tags and unknown
  attributes penalized; missed expected components penalized.
- `accessibility` — uses Baklava controls + ARIA hints.
- `efficiency` — compactness (uses the system instead of raw markup).
- `codeQuality`, `maintainability` — escape hatches (wrapper divs, inline styles,
  wrong attrs) reduce these.
- Overall = weighted average. `compare` emits per-prompt JSON and a Markdown
  before/after report with deltas.
