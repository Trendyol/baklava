# Adding Icon Attribute to Dropdown Button Component

## Status
Proposed

## Context
The dropdown button component needs to support an icon on its left side, which can be customized from the icon library. This enhancement will provide more flexibility in the visual representation of dropdown buttons and align with common UI patterns.

## Decision
We will add a new `icon` attribute to the dropdown button component with the following characteristics:

- The attribute will be optional
- It will accept a string value representing the icon name from our icon library
- The icon will be positioned on the left side of the button label
- The right-side arrow icon will remain fixed and unchanged

## Implementation Details
```typescript
interface DropdownButtonProps {
  // ... existing props
  icon?: string; // Optional icon name from the icon library
}
```

## Consequences

### Positive
- Enhanced visual customization options for dropdown buttons
- Better alignment with modern UI patterns
- Consistent with other button components that support icons
- Improved user experience through visual indicators

### Negative
- Slight increase in component complexity
- Additional documentation and maintenance required

## Examples
```typescript
<bl-dropdown icon="info">Dropdown with Info Icon</bl-dropdown>
<bl-dropdown icon="heart">Dropdown with Heart Icon</bl-dropdown>
<bl-dropdown icon="user">Dropdown with User Icon</bl-dropdown>
```
