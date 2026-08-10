# Baklava Agent-Friendly PoC — Before / After Benchmark

Iteration: `adversarial-subagents` · 2026-08-10T11:48:32.401Z · System: Baklava

> This benchmark measures whether giving the agent the **Baklava agent CLI / tooling**
> (augmented / after) improves component correctness vs. an agent working from raw
> knowledge only (baseline / before).

## Baseline (before — no tooling)

  | Success rate | 63% |
  | Overall | 82 |
  | Correctness | 81 |
  | Accessibility | 77 |
  | Efficiency | 83 |
  | Code quality | 80 |
  | Maintainability | 89 |
  | Hallucinated tags | 2 |
  | Escape hatches | 19 |
  | Unique components used | 14 |

## Augmented (after — with Baklava agent tooling)

  | Success rate | 100% |
  | Overall | 90 |
  | Correctness | 98 |
  | Accessibility | 85 |
  | Efficiency | 73 |
  | Code quality | 87 |
  | Maintainability | 96 |
  | Hallucinated tags | 0 |
  | Escape hatches | 8 |
  | Unique components used | 24 |

## Delta (after − before)

| Metric | Δ |
|---|---|
  | successRate | +37 |
  | avgOverall | +8 |
  | dim.correctness | +17 |
  | dim.accessibility | +8 |
  | dim.efficiency | -10 |
  | dim.codeQuality | +7 |
  | dim.maintainability | +7 |
  | dim.overall | +8 |
  | totalHallucinations | -2 |
  | totalEscapeHatches | -11 |

## LLM Judge (separate fresh-context agent — optional holistic layer)

> Non-deterministic model judgment, kept separate from the deterministic rubric above.

### Baseline judge

  | n | 8 |
  | Overall | 46 |
  | Correctness | 34 |
  | Accessibility | 49 |
  | Code quality | 59 |
  | Efficiency | 66 |
  | Maintainability | 57 |

### Augmented judge

  | n | 8 |
  | Overall | 82 |
  | Correctness | 83 |
  | Accessibility | 80 |
  | Code quality | 83 |
  | Efficiency | 85 |
  | Maintainability | 84 |

_Machine-readable data: `compare.json`. Per-prompt scores: `evaluated/{arm}/*.json`._