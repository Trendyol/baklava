## Figma Design Document

https://www.figma.com/file/RrcLH0mWpIUy4vwuTlDeKN/Baklava-Design-Guide?node-id=25%3A3606

## Implementation

General usage example:

```html
<bl-select label="Select country" required>
  <bl-select-option value="tr" selected>Turkey</bl-select-option>
  <bl-select-option value="nl">The Netherlands</bl-select-option>
</bl-select>
```

### Rules

* Select

## API Reference:

### `bl-select` component

Select component is for getting input from users to select one or multiple options from a given list.

#### Attributes

| Attribute | Description | Default Value |
| --------------- | --------------- | --------------- |
| label (`string`) | Label for the input | - |
| value (`string`) | Value for the input | - |
| required (`boolean`) | Sets select input required | - |
| disabled (`boolean`) | Sets select input disabled | - |
| multiple (`boolean`) | Allows for multi selection | - |

#### Slots

| Name | Description | Default Content |
| --------------- | --------------- | --------------- |
| `default` slot | List of `bl-select-option` components | - |

#### Events

| Event | Description |
| --------------- | --------------- |
| `bl-select` | Will be triggered once user make a selection |


### `bl-select-option` component

#### Attributes

| Attribute | Description | Default Value |
| --------------- | --------------- | --------------- |
| value (`string`) | Value for the option | - |
| disabled (`boolean`) | Sets option disabled | - |
| selected (`boolean`) | Sets option selected | - |

#### Slots

| Name | Description | Default Content |
| --------------- | --------------- | --------------- |
| `default` slot | Label for the option | - |
