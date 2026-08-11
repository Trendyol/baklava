# Baklava Agent-Friendly Tooling — Before / After Benchmark

Iteration: `naive-mcp3` · 2026-08-11T05:59:56.458Z · System: Baklava

> Multi-condition benchmark of whether giving the agent Baklava tooling improves
> component correctness. Arms: **Baseline (no tooling)** · **Agent (MCP only)** · **Agent (MCP + Validate)**.

## Baseline (no tooling)

  | Success rate | 100% |
  | Overall | 87 |
  | Overall (95% CI) | 84–90 |
  | Correctness | 93 |
  | Accessibility | 82 |
  | Efficiency | 80 |
  | Code quality | 82 |
  | Maintainability | 89 |
  | Hallucinated tags | 0 |
  | Escape hatches | 22 |
  | Unique components used | 21 |
## Agent (MCP only)

  | Success rate | 100% |
  | Overall | 91 |
  | Overall (95% CI) | 90–92 |
  | Correctness | 97 |
  | Accessibility | 82 |
  | Efficiency | 82 |
  | Code quality | 88 |
  | Maintainability | 97 |
  | Hallucinated tags | 0 |
  | Escape hatches | 7 |
  | Unique components used | 24 |
## Agent (MCP + Validate)

  | Success rate | 100% |
  | Overall | 93 |
  | Overall (95% CI) | 92–94 |
  | Correctness | 99 |
  | Accessibility | 81 |
  | Efficiency | 86 |
  | Code quality | 90 |
  | Maintainability | 100 |
  | Hallucinated tags | 0 |
  | Escape hatches | 0 |
  | Unique components used | 25 |

## Step-wise deltas

| Step | Δ overall | Δ succ | Δ esc | Δ halluc |
|---|---|---|---|---|
| Baseline (no tooling) → Agent (MCP only) | +4 | 0 | -15 | 0 |
| Agent (MCP only) → Agent (MCP + Validate) | +2 | 0 | -7 | 0 |
| Baseline (no tooling) → Agent (MCP + Validate) | +6 | 0 | -22 | 0 |

_Machine-readable data: `compare.json`. Per-prompt scores: `evaluated/{arm}/*.json`._