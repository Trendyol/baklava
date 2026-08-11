# Sensitivity — rubric weights vs before/after delta
Iteration: `naive-mcp3`

> Recomputes overall with several weight vectors. If the step-wise tooling delta
> (baseline→mcp-only → mcp-only→mcp-validated) stays clearly positive across all variants, the
> conclusion is robust to rubric weighting.

| Variant | Baseline | Agent (MCP) | Agent (MCP+Validate) | baseline→mcp-only | mcp-only→mcp-validated |
| --- | --- | --- | --- | --- | --- |
| base | 88 | 91 | 93 | 3 | 2 |
| equal | 87 | 90 | 91 | 3 | 1 |
| correctnessDominant | 90 | 93 | 94 | 3 | 1 |
| accessibilityDominant | 85 | 88 | 88 | 3 | 0 |
| maintainabilityDominant | 89 | 92 | 93 | 3 | 1 |

Step-delta ranges: baseline→mcp-only **3 .. 3**, mcp-only→mcp-validated **0 .. 2**