## Accessibility

### Focusing options on key press

This improvement aims to enable users to navigate through `bl-select-option` elements more easily using the keyboard.

#### Rules
- This feature does not work with `search-bar` attribute.
- When a character is pressed on the keyboard, if there is an option starting with that character among the `bl-select-option` elements, that option will be focused automatically.
- When characters are pressed consecutively on the keyboard, the first option starting with those characters will be focus.
- The threshold for consecutive key presses is 500.
- If the target option is disabled, it will not be focus when attempting to access it via keyboard.
- Comparisons are case-insensitive.
