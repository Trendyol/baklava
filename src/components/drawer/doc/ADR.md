## Figma Design Document

https://www.figma.com/file/RrcLH0mWpIUy4vwuTlDeKN/Baklava-Design-Guide?node-id=2963%3A14146&t=EeXAS4ruHbwtJQAN-1

## Implementation

General usage example:

```html
<bl-drawer caption='Drawer Title' external-link='https://some-url.com'>
    content
</bl-drawer>
```

### Rules

* Title and external link displayed on header section in drawer. Title is necessary but external link is optional.
* Close button always displayed on header section and drawer can be closed by clicking close button.
* By default, Drawer can not close by clicking somewhere outside drawer.
* Drawer appears right side on the page with full height expanded.
* Title can be multiline automatically if it does not fit one line.
* If user does not specify title, title part of header will be rendered empty.
* There will be an animation when drawer opens and closes. ( Animation topics will be discussed again in later times )
* There is an attribute about iframe and drawer component handle iframe rendering itself.
* Only one drawer can display at the same time. When one drawer opens others will be closed.

## API Reference:

### `bl-drawer` component

Description

#### Attributes

| Attribute | Description | Default Value |
| --------------- | --------------- | --------------- |
| caption (`string`) | Title of the drawer (optional) | - |
| external-link (`string`) | External link (optional) | - |
| embed-url (`string`) | Iframe url (optional) | - |
| open (`boolean`) | Sets drawer open-close status | - |

#### Slots

| Name | Description | Default Content |
| --------------- | --------------- | --------------- |
| `default` slot | Content inside drawer  | - |

#### Events

| Event | Description |
| --------------- | --------------- |
| `bl-drawer-open` | Will be triggered every time drawer is opened |
| `bl-drawer-close` | Will be triggered every time drawer is closed |
