# [03] Agent-Tooling POC — CLI + MCP + Before/After Benchmark

- **Label**: `wayfinder:prototype`
- **Status**: closed
- **Assignee**: pi/dev (bu oturum)
- **Blocks**: — ; **Blocked by**: [01](../tickets/01-poc-konusunu-netlestir.md), [02](../tickets/02-proje-dokumantasyonunu-olustur.md)
- **Parents**: [Harita](../map.md)

## Question

Baklava'yı agent'lar için kullanılabilir kılan araç katmanını, Astryx tarzında ve
**before/after ölçümüyle** nasıl kurarız?

## Resolved

Uygulama `poc/agent-tooling/` altında tamamlandı:

- **CLI** (`cli/bin/baklava.mjs`) — dependency-free, `dist/custom-elements.json`
  (CEM) üzerinde çalışan docs-first CLI. Komutlar: `components`, `component <name>
  [--dense|--props|--source|--example]`, `build "<prompt>"` (synonym/stem/scoring
  ranking — astryx `build` modeli), `swizzle`, `docs`, global `--json`.
- **Benchmark** (`bench/`) — vibe-tests metodolojisi: 8 prompt'luk naive-persona
  battery, deterministik rubric evaluator (correctness/accessibility/efficiency/
  codeQuality/maintainability; hallucinations, escape hatches, missed components),
  `evaluate` + `compare --iteration` → `compare.json` + `compare.md`.
- **MCP** (`mcp/mcp-server.mjs`) — lokale CEM'li, token-verimli, dependency-free
  stdio MCP server. Tools: `list_components`, `get_component`, `component_build`,
  `component_examples`, `component_source`.
- **Doküman** — `poc/agent-tooling/README.md` (runbook) + `AGENTS-TOOLING.md`
  (agent kullanım kılavuzu + benchmark agent task contract).

**Sonuç (before/after, iteration `real-subagents` — gerçek subagent armatürüyle):**
overall 89 → 93 (+4), correctness 95 → 99 (+4), code quality 86 → 90 (+4),
maintainability 94 → 100 (+6), escape hatches 12 → 0, accessibility 79 → 81.
(Tooling eklendikçe agent'lar API'yi tahmin etmiyor — escape hatch'ler sıfırlanıyor.)
Daha önceki el-mitigasyonlu deneme: iteration `before-after` (overall 83 → 92, +
9; hallucinated 1 → 0).

**Not (gerçek subagent kullanımı):** 16 agent görevi (8 prompt × 2 kol: baseline=
toolsuz/konvansiyon, augmented=gerçek CLI erişimli) gerçek coding subagent'lerle
çalıştırıldı; çıktılar `bench/results/inputs/{arm}/*.html`, değerlendirme
`bench/results/real-subagents/` altında. Task contract'lar `AGENTS-TOOLING.md`'de
belgeli; değerlendirici tam deterministik.

## Update — brought to Astryx-level vibes

- Personas: naive / experienced / adversarial prompt batteries (`bench/prompts/*.json`).
- Multi-model tagging: `--model` labels every run; rolling **scorecard** command aggregates iterations (Astryx nightly-ledger style) into `bench/results/scorecard.{json,md}`.
- **Adversarial real subagent run** (`adversarial-subagents`, 16 tasks): success rate 63
## Update — brought to Astryx-level vibes

- Personas: naive / experienced / adversarial prompt batteries (`bench/prompts/*.json`).
- Multi-model tagging: `--model` labels every run; rolling **scorecard** command aggregates iterations (Astryx nightly-ledger style) into `bench/results/scorecard.{json,md}`.
- **Adversarial real subagent run** (`adversarial-subagents`, 16 tasks): success rate 63%->100%, Correctness 81->98, Escape hatches 19->8, Hallucinated 2->0 (baseline escapes to MUI/Bootstrap/Tailwind; tooled arm stays on the real API).
- **Optional LLM-judge layer** (separate fresh-context judge agents, Astryx principle): adversarial baseline judge 46->82 overall; merged into compare as a distinct section.
- Inputs are stored per persona (`inputs/<persona>/<arm>/`) so runs never clobber each other.

## Update 2 — improvement pass (3 steps, all landed)

1. **Headless render layer** (`render` cmd, dependency-free CDP + real Baklava bundle over a local HTTP server): browser-verified evidence. Baseline renders 6 unupgraded elements (`bl-accordion-item`, `bl-option` — tags not in the library); augmented upgrades 100% of 82 elements. Merged into compare as a separate section.
2. **Attr-value + nesting + sensitivity**: rubric now validates enum values (from CEM `type` unions) and parent-child nesting; `sensitivity` recomputes overall under 5 weight vectors — delta stays +11..+17, robust to weighting. Stricter rubric tightened adversarial delta +8 -> +14.
3. **Multi-sample + error bars**: n=3 per cell (48 adversarial tasks). Baseline overall 79 (95% CI 75-83) vs tooled 91 (95% CI 90-92) — non-overlapping CIs, so the +12 delta is not noise.

self-test: ALL CHECKS PASSED.
