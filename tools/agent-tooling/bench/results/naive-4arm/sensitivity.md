# Sensitivity — rubric weights vs before/after delta
Iteration: `naive-4arm`

> Recomputes overall with several weight vectors. If the step-wise tooling delta
> (baseline→mcp-only→augmented) stays clearly positive across all variants, the
> conclusion is robust to rubric weighting.

| Variant | Baseline | Agent (MCP) | Agent (MCP+Validate) | Augmented (MCP+CLI) | Δ base→mcp | Δ mcp→mcpV | Δ mcpV→aug |
|---|---|---|---|---|---|---|---|
| base | 88 | 91 | 93 | 93 | +3 | +2 | 0 |
| equal | 87 | 90 | 91 | 91 | +3 | +1 | 0 |
| correctnessDominant | 90 | 93 | 94 | 94 | +3 | +1 | 0 |
| accessibilityDominant | 85 | 88 | 88 | 89 | +3 | 0 | +1 |
| maintainabilityDominant | 89 | 92 | 93 | 94 | +3 | +1 | +1 |

Step-delta ranges: baseline→mcp-only **3 .. 3**, mcp-only→mcp-validated **0 .. 2**, mcp-validated→augmented **0 .. 1**