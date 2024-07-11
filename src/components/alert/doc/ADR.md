## Figma Design Document

https://www.figma.com/file/RrcLH0mWpIUy4vwuTlDeKN/Baklava-Design-Guide?node-id=796%3A7839

## Implementation

General usage example:

```html
  <bl-alert
    variant="error"
    caption="Default Caption"
    description="Default Description"
    icon="close_fill"
    closable
  >
    <span slot="caption">
      Awesome Caption!
    </span>
    Some important description.
    <bl-button slot="action">
      Click me!
    </bl-button>
  </bl-alert>
```

### Rules

* `closable` attribute displays a close button in alert component. Emits an event named `bl-close` and component will hide itself via css property.
* Component will not have default icon but users can use `icon` to use default icons according to variants or `icon="calendar"` to customize icon.
* `action` slot will only accept `bl-button` component (else will cause an error) and will override some attributes of the slotted button (`variant` will be `secondary` and `kind` will be `text`, `icon` will not be allowed).
* For mobile design `bl-button` component which can be used in `action` slot will convert itself to icon-only `bl-button`.

## API Reference:

### `bl-alert` component

Alert component displays an informational message to users with additional features if desired.

#### Attributes

| Attribute | Description | Default Value |
| --------------- | --------------- | --------------- |
| variant (`string`) | Decides variants of alert box ( `info`, `success`, `warning`, `error` )  | `"info"` |
| caption (`string`) | Sets alert caption  | - |
| description (`string`) | Sets alert description  | - |
| icon (`string, boolean`) | Allows to customize alert icon  | `false` |
| closable (`boolean`) | Displays a close button when used  | `false` |

#### Slots

| Event | Description |
| --------------- | --------------- |
| `caption` slot | Will fill alert caption |
| `default` slot | Will fill alert description |
| `action` slot | Will fill alert action slot and will accept only `bl-button` component or it will throw an error |

#### Events

| Event | Description |
| --------------- | --------------- |
| `bl-close` | Will be triggered each time close button is clicked |
