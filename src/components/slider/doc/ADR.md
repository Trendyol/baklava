## Figma Design Document

https://www.figma.com/design/lSvX6Qe0jc8b4CaIK7egXR/Baklava-Component-Library?node-id=16904-2220&p=f&t=ha2Q6ZmSpIAmUmUM-0

# Slider Component

Slider component allows users to select a numeric value from a range by moving a thumb along a track.

## Features

- ✅ Single size (no size variants)
- ✅ Label and help text support
- ✅ Custom min/max/step values
- ✅ Discrete slider with marks
- ✅ Value tooltip during interaction
- ✅ Disabled state
- ✅ Keyboard accessible
- ✅ ARIA support
- ✅ Custom CSS properties for theming
- ✅ Event handling (bl-slider-change)

## Basic Usage

```html
<bl-slider value="75"></bl-slider>
```

## Usage Examples

### With Label

```html
<bl-slider label="Brightness" value="75"></bl-slider>
```

### With Helper Text

```html
<bl-slider label="Brightness" help-text="Adjust screen brightness" value="75"></bl-slider>
```

### With Marks (Discrete Slider)

```html
<bl-slider
  label="Size"
  value="50"
  step="25"
  marks='[{"value":0,"label":"xs"},{"value":25,"label":"sm"},{"value":50,"label":"md"},{"value":75,"label":"lg"},{"value":100,"label":"xl"}]'
></bl-slider>
```

### With Tooltip

```html
<bl-slider label="Progress" tooltip value="60"></bl-slider>
```

### With Custom Min/Max Values

```html
<bl-slider label="Temperature" min="-20" max="40" value="22" show-min-max></bl-slider>
```

The `show-min-max` attribute displays the min and max values next to the slider.

### With Decimal Step

```html
<bl-slider label="Animation Speed" min="0.5" max="2" step="0.1" value="1.0" tooltip></bl-slider>
```

### With Event Handling

```javascript
const handleSliderChange = (event) => {
  // Handle slider value change
  // event.detail.value contains the new value
};

document.querySelector('bl-slider').addEventListener('bl-slider-change', handleSliderChange);
```

```html
<bl-slider label="Brightness" value="75"></bl-slider>
```

## API Reference

### Attributes

| Attribute | Description | Type | Default Value |
|-----------|-------------|------|---------------|
| `label` | Label for the slider | `string` | - |
| `disabled` | Makes slider disabled | `boolean` | `false` |
| `value` | Sets slider value | `string` | `'0'` |
| `help-text` | Sets help text for the slider | `string` | - |
| `min` | Sets min value for the slider | `string` | `'0'` |
| `max` | Sets max value for the slider | `string` | `'100'` |
| `step` | Sets step increment for the slider | `string` | `'1'` |
| `tooltip` | Shows value tooltip during slider interaction | `boolean` | `false` |
| `marks` | JSON string of objects with value and label properties to display marks on the slider | `string` | - |
| `show-min-max` | Shows min and max values next to the slider | `boolean` | `false` |

### Events

| Event | Description | Payload |
|-------|-------------|---------|
| `bl-slider-change` | Will be triggered when the slider value changes through user interaction | `{value: number}` |

### CSS Custom Properties

| Property | Description | Default |
|----------|-------------|---------|
| `--bl-slider-color` | Color of the active track & thumb | `--bl-color-primary` |
| `--bl-slider-track-color` | Color of the inactive track | `--bl-color-neutral-lightest` |

## Rules

- Slider has only one size and hence no size attribute has been provided
- When using both marks and step together, consider matching the step values with mark positions for consistent behavior
- The slider value is always constrained between the min and max values

## Accessibility

The slider component includes proper ARIA attributes:
- `aria-label`: Set from the label property
- `aria-valuemin`: Set from the min property
- `aria-valuemax`: Set from the max property
- `aria-valuenow`: Set from the current value

The slider is fully keyboard accessible using the native HTML range input.

## Browser Support

The slider component uses native HTML range input and is supported in all modern browsers.

