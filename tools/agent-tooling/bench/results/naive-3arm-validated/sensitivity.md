# Sensitivity — rubric weights vs before/after delta
Iteration: `naive-3arm-validated`

> Recomputes overall with several weight vectors. If the step-wise tooling delta
> (baseline→mcp-only→augmented) stays clearly positive across all variants, the
> conclusion is robust to rubric weighting.

| Variant | Baseline | Agent (MCP) | Augmented (MCP+CLI) | Δ base→mcp | Δ mcp→aug |
|---|---|---|---|---|---|
| base | 88 | 91 | 93 | +3 | +2 |
| equal | 87 | 90 | 91 | +3 | +1 |
| correctnessDominant | 90 | 93 | 94 | +3 | +1 |
| accessibilityDominant | 85 | 88 | 89 | +3 | +1 |
| maintainabilityDominant | 89 | 92 | 94 | +3 | +2 |

Step-delta ranges: baseline→mcp-only **3 .. 3**, mcp-only→augmented **1 .. 2**