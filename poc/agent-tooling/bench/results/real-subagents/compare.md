# Baklava Agent-Friendly PoC — Before / After Benchmark

Iteration: `real-subagents` · 2026-08-10T12:05:31.017Z · System: Baklava

> This benchmark measures whether giving the agent the **Baklava agent CLI / tooling**
> (augmented / after) improves component correctness vs. an agent working from raw
> knowledge only (baseline / before).

## Baseline (before — no tooling)

  | Success rate | 100% |
  | Overall | 88 |
  | Correctness | 94 |
  | Accessibility | 79 |
  | Efficiency | 83 |
  | Code quality | 85 |
  | Maintainability | 93 |
  | Hallucinated tags | 0 |
  | Escape hatches | 14 |
  | Unique components used | 21 |

## Augmented (after — with Baklava agent tooling)

  | Success rate | 100% |
  | Overall | 93 |
  | Correctness | 99 |
  | Accessibility | 81 |
  | Efficiency | 86 |
  | Code quality | 90 |
  | Maintainability | 100 |
  | Hallucinated tags | 0 |
  | Escape hatches | 0 |
  | Unique components used | 25 |

## Delta (after − before)

| Metric | Δ |
|---|---|
  | successRate | 0 |
  | avgOverall | +5 |
  | dim.correctness | +5 |
  | dim.accessibility | +2 |
  | dim.efficiency | +3 |
  | dim.codeQuality | +5 |
  | dim.maintainability | +7 |
  | dim.overall | +5 |
  | totalHallucinations | 0 |
  | totalEscapeHatches | -14 |

_Machine-readable data: `compare.json`. Per-prompt scores: `evaluated/{arm}/*.json`._