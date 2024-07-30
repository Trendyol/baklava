## Figma Design Document

https://www.figma.com/file/RrcLH0mWpIUy4vwuTlDeKN/Baklava-Design-Guide?node-id=2641%3A11444

## Implementation

General usage example:

```html
<bl-textarea value="Example"></bl-textarea>
```

### Rules

Put some rules about how this component should behave and implemented

* Component will have a default width but can be set by the developer (as in input component)
* By default textarea can be resized by user vertically (Using default behavior of native textarea input)
* Visible row count can be set by the developer (with a default value, 4)
* Optionally, textarea can expand by entering text. In this mode, resizing mode will be disabled. A max row count value can be set by the developer (with a default value)
* Visually, textarea should give the feel that it's in scrollable mode (by showing some part of the text above or below)
* Label styles will be same as the Input component
* Helper and error text, placeholder styles functionality will be provided as in input
* Textarea can have minlength, maxlength validation rules
* Optionally, an active character count can be visible
* If textarea maxlength is provided, this value will be visible inside character count (as like 10 / 100)
* Active character count can exceed the maxlength, but in this case textarea will be in invalid state. And if character counter is visible, this issue will be highlighted in active char count.
* Minlength validation will be visible on character count once user finished entering text (with losing focus for the first time, as in input component)

## API Reference:

### `bl-textarea` component

Textarea component is the component to take multi-line text input from user.

#### Attributes

| Attribute | Description | Default Value |
| --------------- | --------------- | --------------- |
| value (`string`) | Value of textarea | - |
| name (`string`) | Name attribute to use textarea inside forms |  - |
| required (`boolean`) | Sets required property of textarea |  - |
| size (`string`) | Sets input size |  medium |
| rows (`number`) | Row count of textarea | 4 |
| expand (`boolean`) | Expands by entering text | false |
| max-row (`number`) | Maximum row count when text area expands | - |
| placeholder (`string`) | Sets the placeholder of textarea | - |
| label (`string`) | Sets the label of textarea | - |
| label-fixed (`boolean`) | Makes label as fixed positioned | false |
| minlength (`number`) | Minimum length of the textarea | - |
| maxlength (`number`) | Maximum length of the textarea | - |
| invalid-text (`string`) | Custom error message | - |
| help-text (`string`) | Helper text of textarea | - |
| character-count (`boolean`) | Sets visibility of character count | false |

#### Events

| Event | Description |
| --------------- | --------------- |
| `bl-change` | Fires when an alteration to the element's value is committed by the user. Unlike the bl-input event, the change event is not necessarily fired for each alteration to an element's value. |
| `bl-input` | Fires when the value of an textarea element has been changed. |
| `bl-focus` | Fires when user focuse to textarea.  |
| `bl-valid` | Fires when the value of an input element has been changed. |
| `bl-invalid` | Fires when the value of an input element has been changed. |
