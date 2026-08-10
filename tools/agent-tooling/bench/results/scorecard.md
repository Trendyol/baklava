# Baklava Agent-Tooling — Rolling Scorecard
> Generated 2026-08-10T15:30:42.449Z · aggregates all committed benchmark iterations.

| Iteration | Persona | Model | Base | Agent (MCP) | Agent (MCP+Val) | Augmented | Δ base→aug | Base esc | Aug esc |
|---|---|---|---|---|---|---|---|---|
| adversarial-subagents | adversarial | mlplatform/deepseek-v4-flash-0731 | 79 | — | — | 91 | +12 | 27 | 9 |
| real-subagents | naive | mlplatform/deepseek-v4-flash-0731 | 87 | — | — | 92 | +5 | 22 | 4 |
| naive-3arm | naive | deepseek-v4-flash-0731 | 87 | 91 | — | 92 | +5 | 22 | 4 |
| naive-3arm-validated | naive | deepseek-v4-flash-0731 | 87 | 91 | — | 93 | +6 | 22 | 0 |
| naive-4arm | naive | deepseek-v4-flash-0731 | 87 | 91 | 93 | 93 | +6 | 22 | 0 |

_Machine-readable: `scorecard.json`._