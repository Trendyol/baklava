# Baklava Agent-Friendly Tooling — Before / After Benchmark

Iteration: `real-subagents` · 2026-08-10T12:18:33.637Z · System: Baklava

> This benchmark measures whether giving the agent the **Baklava agent CLI / tooling**
> (augmented / after) improves component correctness vs. an agent working from raw
> knowledge only (baseline / before).

## Baseline (before — no tooling)

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

## Augmented (after — with Baklava agent tooling)

  | Success rate | 100% |
  | Overall | 92 |
  | Overall (95% CI) | 91–93 |
  | Correctness | 98 |
  | Accessibility | 83 |
  | Efficiency | 84 |
  | Code quality | 89 |
  | Maintainability | 98 |
  | Hallucinated tags | 0 |
  | Escape hatches | 4 |
  | Unique components used | 25 |

## Delta (after − before)

| Metric | Δ |
|---|---|
  | successRate | 0 |
  | avgOverall | +5 |
  | dim.correctness | +5 |
  | dim.accessibility | +1 |
  | dim.efficiency | +4 |
  | dim.codeQuality | +7 |
  | dim.maintainability | +9 |
  | dim.overall | +5 |
  | totalHallucinations | 0 |
  | totalEscapeHatches | -18 |

_Machine-readable data: `compare.json`. Per-prompt scores: `evaluated/{arm}/*.json`._