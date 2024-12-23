# Group Support in Dropdown Component

## Status
Implemented

## Context
Dropdown menus often need to organize related items into logical groups with optional captions. This organization helps users understand the relationship between different actions and improves the overall user experience.

## Decision
Implement a dedicated dropdown group component (`bl-dropdown-group`) with the following features:
- Optional caption support
- Visual separation between groups (borders)
- Semantic HTML structure using role="group"
- Consistent spacing and styling
- Support for nested items

## Implementation Details
```typescript
@customElement(blDropdownGroupTag)
export default class BlDropdownGroup extends LitElement {
  @property({ type: String })
  caption?: string;

  render(): TemplateResult {
    return html`<div class="dropdown-group" role="group" aria-labelledby="label">
      ${this.caption ? html`<span id="label" class="caption">${this.caption}</span>` : ''}
      <slot></slot>
    </div>`;
  }
}
```

## Styling
```css
.dropdown-group {
  display: flex;
  flex-direction: column;
  gap: var(--bl-size-xs);
}

// Visual separation between groups
:host(:not(:first-child)) .dropdown-group {
  border-top: 1px solid var(--bl-color-neutral-lighter);
  padding-top: var(--bl-size-xs);
}

:host(:not(:last-child)) .dropdown-group {
  border-bottom: 1px solid var(--bl-color-neutral-lighter);
  padding-bottom: var(--bl-size-xs);
}
```

## Consequences

### Positive
- Better organization of dropdown items
- Improved visual hierarchy
- Enhanced accessibility with semantic markup
- Flexible grouping options with optional captions

### Negative
- Additional component complexity
- Need to manage group styling and spacing
- Potential performance impact with deeply nested groups
