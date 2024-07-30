## Figma Design Document

https://www.figma.com/file/RrcLH0mWpIUy4vwuTlDeKN/Baklava-Design-Guide?node-id=118%3A4070&t=uWydNFOBcAcnjhPo-0

## Implementation

General usage example:

By default, the state is _Off_:

```html
<bl-switch>Label</bl-switch>
```

set `checked` attribute for _On_ state:

```html
<bl-switch checked>Label</bl-switch>
```

can be disabled using `disabled` attribute:

```html
<bl-switch checked disabled>Label</bl-switch>
```

### Rules

Some rules about how this component should behave and implemented

* Switch has only one size and hence no size attribute has been provided

## API Reference:

### `bl-switch` component

Description

#### Attributes

| Attribute | Description | Default Value |
| --------------- | --------------- | --------------- |
| checked (`boolean`) | Toggles the state of the switch to _On_. By default the Switch is _Off_ | false |
| disabled (`boolean`) | Disables the Switch | -


#### Slots

| Name | Description | Default Content |
| --------------- | --------------- | --------------- |
| `default` slot | label | - |

#### Events

| Event | Description |
| --------------- | --------------- |
| `bl-switch-toggle` | Will be triggered when the Switch is clicked |

#### CSS Custom Properties

| Property | Description | Default Value |
| --------------- | --------------- | --------------- |
| `—bl-switch-color` | The color of the Switch | --bl-color-primary (when `checked`) |
