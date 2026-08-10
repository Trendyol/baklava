# Baklava Agent-Friendly PoC — Before / After Benchmark

Iteration: `adversarial-subagents` · 2026-08-10T12:08:45.664Z · System: Baklava

> This benchmark measures whether giving the agent the **Baklava agent CLI / tooling**
> (augmented / after) improves component correctness vs. an agent working from raw
> knowledge only (baseline / before).

## Baseline (before — no tooling)

  | Success rate | 67% |
  | Overall | 79 |
  | Overall (95% CI) | 75–83 |
  | Correctness | 77 |
  | Accessibility | 82 |
  | Efficiency | 82 |
  | Code quality | 75 |
  | Maintainability | 83 |
  | Hallucinated tags | 3 |
  | Escape hatches | 27 |
  | Unique components used | 14 |

## Augmented (after — with Baklava agent tooling)

  | Success rate | 100% |
  | Overall | 91 |
  | Overall (95% CI) | 90–92 |
  | Correctness | 98 |
  | Accessibility | 84 |
  | Efficiency | 75 |
  | Code quality | 87 |
  | Maintainability | 96 |
  | Hallucinated tags | 0 |
  | Escape hatches | 9 |
  | Unique components used | 24 |

## Delta (after − before)

| Metric | Δ |
|---|---|
  | successRate | +33 |
  | avgOverall | +12 |
  | dim.correctness | +21 |
  | dim.accessibility | +2 |
  | dim.efficiency | -7 |
  | dim.codeQuality | +12 |
  | dim.maintainability | +13 |
  | dim.overall | +12 |
  | totalHallucinations | -3 |
  | totalEscapeHatches | -18 |

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

## Headless Render (real browser — Step 1 layer)

> Browser-observed: did the code load/run without errors and upgrade its custom elements,
> plus basic accessibility probes. Kept separate from the static rubric.

### Baseline render

  | Clean load rate | 100% (8/8) |
  | Runtime exceptions | 2 |
  | Console errors | 4 |
  | Unupgraded custom elements | 6 |
  | Unlabeled interactive controls | 1 |
  | Unlabeled images | 0 |

### Augmented render

  | Clean load rate | 100% (8/8) |
  | Runtime exceptions | 2 |
  | Console errors | 8 |
  | Unupgraded custom elements | 0 |
  | Unlabeled interactive controls | 0 |
  | Unlabeled images | 0 |

_Machine-readable data: `compare.json`. Per-prompt scores: `evaluated/{arm}/*.json`._