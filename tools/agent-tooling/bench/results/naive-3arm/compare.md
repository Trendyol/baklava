# Baklava Agent-Friendly Tooling — Before / After Benchmark

Iteration: `naive-3arm` · 2026-08-10T14:41:12.686Z · System: Baklava

> Three-condition benchmark of whether giving the agent tooling improves component
> correctness: **baseline** (no tooling, raw knowledge), **Agent (MCP)** only, and
> **augmented** (MCP + CLI).

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

## Augmented (MCP + CLI)

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

## Step-wise deltas

| Step | Δ overall | Δ succ | Δ esc | Δ halluc |
|---|---|---|---|---|
| Baseline (no tooling) → Agent (MCP only) | +4 | 0 | -15 | 0 |
| Agent (MCP only) → Augmented (MCP + CLI) | +1 | 0 | -3 | 0 |
| Baseline (no tooling) → Augmented (MCP + CLI) | +5 | 0 | -18 | 0 |

## LLM Judge (separate fresh-context agent — optional holistic layer)

> Non-deterministic model judgment, kept separate from the deterministic rubric above.

### Baseline judge

  | n | 8 |
  | Overall | 64 |
  | Correctness | 61 |
  | Accessibility | 61 |
  | Code quality | 68 |
  | Efficiency | 65 |
  | Maintainability | 67 |

### Agent (MCP) judge

  | n | 8 |
  | Overall | 91 |
  | Correctness | 94 |
  | Accessibility | 89 |
  | Code quality | 90 |
  | Efficiency | 90 |
  | Maintainability | 91 |

### Augmented judge

  | n | 8 |
  | Overall | 89 |
  | Correctness | 91 |
  | Accessibility | 87 |
  | Code quality | 90 |
  | Efficiency | 89 |
  | Maintainability | 90 |

## Headless Render (real browser — Step 1 layer)

> Browser-observed: did the code load/run without errors and upgrade its custom elements,
> plus basic accessibility probes. Kept separate from the static rubric.

### Baseline render

  | Clean load rate | 100% (24/24) |
  | Runtime exceptions | 0 |
  | Console errors | 4 |
  | Unupgraded custom elements | 0 |
  | Unlabeled interactive controls | 0 |
  | Unlabeled images | 0 |

### Agent (MCP) render

  | Clean load rate | 100% (24/24) |
  | Runtime exceptions | 0 |
  | Console errors | 10 |
  | Unupgraded custom elements | 0 |
  | Unlabeled interactive controls | 0 |
  | Unlabeled images | 0 |

### Augmented render

  | Clean load rate | 100% (24/24) |
  | Runtime exceptions | 2 |
  | Console errors | 6 |
  | Unupgraded custom elements | 0 |
  | Unlabeled interactive controls | 0 |
  | Unlabeled images | 0 |

_Machine-readable data: `compare.json`. Per-prompt scores: `evaluated/{arm}/*.json`._