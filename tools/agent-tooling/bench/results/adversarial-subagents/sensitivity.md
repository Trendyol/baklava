# Sensitivity — rubric weights vs before/after delta
Iteration: `adversarial-subagents`

> Recomputes overall with several weight vectors. If the tooling delta stays
> clearly positive across all variants, the conclusion is robust to rubric weighting.

| Variant | Before overall | After overall | Δ |
|---|---|---|---|
| base | 76 | 90 | +14 |
| equal | 77 | 88 | +11 |
| correctnessDominant | 75 | 92 | +17 |
| accessibilityDominant | 77 | 88 | +11 |
| maintainabilityDominant | 77 | 90 | +13 |

Delta range across variants: **11 .. 17**