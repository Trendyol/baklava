## Figma Design Document

https://www.figma.com/file/RrcLH0mWpIUy4vwuTlDeKN/Baklava-Design-Guide?node-id=1510%3A6857

## Implementation

General usage example:

```html
<bl-radio-group label="Payment Type" name="payment-type" value="cc">
    <bl-radio value="cc">Credit Card</bl-radio>
    <bl-radio value="ideal">iDeal</bl-radio>
</bl-radio-group>
```

## API Reference:

### `bl-radio-group` component

This component is the wrapper component of the radio options. Field value will be set/red via this component.

#### Attributes


| Attribute | Description | Default Value |
| --------- | ----------- | ------------- |
| label (`string`) | Label of the form field. This is needed for accessibility needs. | - |
| name (`string`) | Name of the form field | - |
| value (`string`) | Default value of the input | - |
| required (`boolean`) | Sets form field required | `false` |

#### Events

| Event | Description | Event Data |
| ----- | ----------- | ---------- |
| `bl-radio-change` | Will be triggered once radio selection changed | new value as string |

#### CSS Custom Properties

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
| `--bl-radio-direction` | Can be used for showing radio options as columns instead of rows. Options are `row` or `column` | `row` |

### `bl-radio` component

This component defines options for the radio input.

#### Attributes

| Attribute | Description | Default Value |
| --------------- | --------------- | --------------- |
| value (`string`) | Value of the option | - |
| disabled (`boolean`) | Sets option disabled | `false` |

#### Slots

| Name | Description | Default Content |
| --------------- | --------------- | --------------- |
| `default` slot | Label of the option | - |

#### Events

| Event | Description | Event Data |
| ----- | ----------- | ---------- |
| `bl-checked` | Will be triggered once this option is selected | - |
| `bl-focus` | Will be triggered once this option is focused | - |
| `bl-blur` | Will be triggered once this option is blurred | - |
