# Variant and Kind System in Dropdown Component

## Status
Implemented

## Context
The dropdown component needs to support different visual styles to convey different levels of importance and semantic meaning. This requires a flexible and consistent system for managing variants and kinds.

## Decision
Implement a dual-layer styling system:

1. Variants (Visual Hierarchy):
   - Primary: Main actions
   - Secondary: Alternative actions
   - Tertiary: Less prominent actions

2. Kinds (Semantic Meaning):
   - Default: Standard actions
   - Neutral: Informational actions
   - Success: Positive actions
   - Danger: Destructive actions

## Implementation Details
```typescript
export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonKind = "default" | "neutral" | "success" | "danger";

@customElement(blDropdownTag)
export default class BlDropdown extends LitElement {
  @property({ type: String, reflect: true })
  variant: ButtonVariant = "primary";

  @property({ type: String, reflect: true })
  kind: ButtonKind = "default";
}
```

## CSS Implementation
```css
:host([kind="neutral"]) bl-popover {
  --bl-popover-border-color: var(--bl-color-neutral-darker);
}

:host([kind="success"]) bl-popover {
  --bl-popover-border-color: var(--bl-color-success);
}

:host([kind="danger"]) bl-popover {
  --bl-popover-border-color: var(--bl-color-danger);
}
```

## Consequences

### Positive
- Clear visual hierarchy through variants
- Semantic meaning through kinds
- Consistent with button component styling
- Flexible styling system for different contexts
- Easy to extend with new variants/kinds

### Negative
- Increased CSS complexity
- Need to maintain consistency across variants
- Additional documentation requirements
- Potential for misuse of variants/kinds
