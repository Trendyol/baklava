## Figma Design Document

TBA

## Implementation

General usage example:

By default, the state is Off:

```html
<bl-toggle label-false="Off" label-true="On"></bl-toggle>
```

Set `checked` attribute for On state:

```html
<bl-toggle label-false="Off" label-true="On" checked></bl-toggle>
```

Can be disabled using `disabled` attribute:

```html
<bl-toggle label-false="Off" label-true="On" disabled></bl-toggle>
```

With icons instead of labels:

```html
<bl-toggle icon-false="close_fill" icon-true="check_fill"></bl-toggle>
```

With icons and labels:

```html
<bl-toggle label-false="No" label-true="Yes" icon-false="close_fill" icon-true="check_fill"></bl-toggle>
```

With icons and hidden labels:

```html
<bl-toggle label-false="No" label-true="Yes" icon-false="close_fill" icon-true="check_fill" icons-only></bl-toggle>
```



Set size:

```html
<bl-toggle label-false="Off" label-true="On" size="small"></bl-toggle>
<bl-toggle label-false="Off" label-true="On" size="medium"></bl-toggle>
<bl-toggle label-false="Off" label-true="On" size="large"></bl-toggle>
```

Use inverted color scheme:

```html
<bl-toggle label-false="Off" label-true="On" inverted></bl-toggle>
```

### Rules

Some rules about how this component should behave and be implemented:

- Clicking/tapping the toggle immediately changes state; it should not require an extra “Apply/Save” action.
- Toggle does not have an indeterminate state.
- Supports RTL (Right‑to‑Left) via the `dir` attribute on any ancestor.
- Keyboard support: when focused, pressing Space or Enter toggles the state.

## API Reference

### `bl-toggle` component

Toggle component can be used to switch between two states. It supports optional labels and/or icons on each side.

#### Attributes

| Attribute | Description                                                                    | Type                 | Default  |
| --- |--------------------------------------------------------------------------------|----------------------|----------|
| `label-false` | Label for the FALSE state. Appears on the left in LTR and on the right in RTL. | string               | ""       |
| `label-true` | Label for the TRUE state. Appears on the right in LTR and on the left in RTL.  | string               | ""       |
| `icon-false` | Icon name for the FALSE state.                                                 | string (BaklavaIcon) | -        |
| `icon-true` | Icon name for the TRUE state.                                                  | string (BaklavaIcon) | -        |
| `checked` | Controls the checked state.                                                    | boolean              | false    |
| `disabled` | Disables the toggle.                                                           | boolean              | false    |
| `inverted` | Inverts the color scheme when checked (thumb colored, track neutral).          | boolean              | false    |
| `icon-only` | Show only icons (no text).                                                     | boolean              | false    |
| `size` | Size of the toggle. ("small", "medium", "large")                               | union type           | "medium" |
| `aria-label` | Accessible label when no visible label is provided.                            | string               | -        |

Note: For backward compatibility the deprecated attributes `label-left`/`label-right` and `icon-left`/`icon-right` are still accepted but should be replaced by the new `label-false`/`label-true` and `icon-false`/`icon-true`.

#### Slots

| Name | Description                                                                                                               | Default Content |
| --- |---------------------------------------------------------------------------------------------------------------------------| --- |
| `icon` | Custom icon content for both states. When provided, it will be used where icons are rendered (true/false side and thumb). | - |

#### Events

| Event | Description | Payload |
| --- | --- | --- |
| `bl-toggle-change` | Fired when the checked state changes. | `boolean` (new checked state) |

#### CSS Custom Properties

| Property | Description                                                                                                        | Default Value |
| --- |--------------------------------------------------------------------------------------------------------------------| --- |
| `--bl-toggle-color-on` | Sets the active (on) background color. Changes the active (on) color of the thumb when using the `inverted` variant. | `var(--bl-color-primary)` |
| `--bl-toggle-animation-duration` | Sets the transition duration for thumb/track.                                                                      | `300ms` |

#### Accessibility

- The host element uses `role="switch"` and updates `aria-checked` accordingly.
- `aria-disabled` is set when disabled.
- The host is focusable (tabIndex managed based on `disabled`).
- Use `aria-label` when there is no visible label nearby.

#### RTL Support

The component automatically mirrors labels, icons and toggle thumb position for RTL contexts. Enable RTL by setting `dir="rtl"` on a parent element or the `html` element.
