# Event System in Dropdown Component

## Status
Implemented

## Context
The dropdown component needs a robust event system to handle user interactions, state changes, and provide hooks for external integration. This system should be consistent, predictable, and follow web component best practices.

## Decision
Implement a comprehensive event system with the following events:

1. State Change Events:
   - `bl-dropdown-open`: Fired when dropdown is opened
   - `bl-dropdown-close`: Fired when dropdown is closed

2. Interaction Events:
   - `bl-dropdown-item-click`: Fired when an item is clicked

All events will:
- Use the `bl-` prefix for consistency
- Include relevant detail data
- Follow CustomEvent pattern
- Be cancelable where appropriate

## Implementation Details
```typescript
@customElement(blDropdownTag)
export default class BlDropdown extends LitElement {
  @event("bl-dropdown-open")
  private onOpen: EventDispatcher<string>;

  @event("bl-dropdown-close")
  private onClose: EventDispatcher<string>;

  open() {
    this._isPopoverOpen = true;
    this._popover.show();
    this.onOpen("Dropdown opened!");
  }

  close() {
    this._isPopoverOpen = false;
    this._popover.visible && this._popover.hide();
    this.onClose("Dropdown closed!");
  }
}

// Item Events
@customElement(blDropdownItemTag)
export default class BlDropdownItem extends LitElement {
  @event("bl-dropdown-item-click")
  private onClick: EventDispatcher<string>;

  private _handleClick() {
    this.BlDropdownField?.close();
    this.onClick("Action clicked!");
  }
}
```

## Event Usage
```typescript
// Event Listeners
dropdown.addEventListener('bl-dropdown-open', (e) => {
  console.log('Dropdown opened:', e.detail);
});

dropdown.addEventListener('bl-dropdown-close', (e) => {
  console.log('Dropdown closed:', e.detail);
});

dropdownItem.addEventListener('bl-dropdown-item-click', (e) => {
  console.log('Item clicked:', e.detail);
});
```

## Consequences

### Positive
- Consistent event naming convention
- Clear separation of concerns
- Predictable behavior
- Easy integration with external systems
- Good developer experience

### Negative
- Need to maintain event documentation
- Potential memory leaks if listeners aren't properly removed
- Additional complexity in event handling
- Need to ensure event bubbling works correctly
