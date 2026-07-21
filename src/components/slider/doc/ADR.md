## Figma Design Document

The design specifications are available at:

https://www.figma.com/design/lSvX6Qe0jc8b4CaIK7egXR/Baklava-Component-Library?node-id=16904-2220&p=f&t=ha2Q6ZmSpIAmUmUM-0

## Implementation

Basic Usage

```html
<bl-slider value="75"></bl-slider>
```
### Usage Examples

With Label

```html
<bl-slider label="Brightness" value="75"></bl-slider>
```

With Helper Text

```html
<bl-slider label="Brightness" helpText="Adjust screen brightness" value="75"></bl-slider>
```

With Marks (Discrete Slider)

```html
<bl-slider
  label="Size"
  value="50"
  step="25"
  marks='[{"value":0,"label":"xs"},{"value":25,"label":"sm"},{"value":50,"label":"md"},{"value":75,"label":"lg"},{"value":100,"label":"xl"}]'
</bl-slider>
```

With Tooltip

```html
<bl-slider label="Progress" tooltip value="60"></bl-slider>
```

With Custom Min/Max Values

```html
<bl-slider label="Temperature" min="-20" max="40" value="22"></bl-slider>
```

With Decimal Step

```html
<bl-slider label="Animation Speed" min="0.5" max="2" step="0.1" value="1.0" tooltip></bl-slider>
```

With Event Handling

```js
const handleSliderChange = (event) => {
  console.log('Slider value changed:', event.detail.value);
  // Update your state or perform actions with the new value
}

<bl-slider label="Brightness" value="75" @bl-slider-change="handleSliderChange"></bl-slider>
```

### Rules

Some rules about how this component should behave and implemented

* Slider has only one size and hence no size attribute has been provided
* When using both `marks` and `step` together, consider matching the step values with mark positions for consistent behavior
* The slider value is always constrained between the min and max values

## API Reference:

#### Attributes

| Attribute            | Description                                                                               | Default Value |
|----------------------|-------------------------------------------------------------------------------------------|---------------|
| label (`string`)     | Label for the slider                                                                      | -             |
| disabled (`boolean`) | Makes slider disabled                                                                     | false         |
| value (`string`)     | Sets sliders value                                                                        | -             |
| helpText (`string`)  | Sets help text for the slider                                                             | -             |
| min (`string`)       | Sets min value for the slider                                                             | '0'           |
| max (`string`)       | Sets max value for the slider                                                             | '100'         |
| step (`string`)      | Sets step increment for the slider                                                        | '1'           |
| tooltip (`boolean`)  | Shows value tooltip during slider interaction                                             | false         |
| marks (`string`)     | JSON string of objects with `value` and `label` properties to display marks on the slider | -             |

#### Events

| Event              | Description                                                              | Payload           |
|--------------------|--------------------------------------------------------------------------|-------------------|
| `bl-slider-change` | Will be triggered when the slider value changes through user interaction | `{value: number}` |

#### CSS Custom Properties

| Property                  | Description                       | Default                       |
|---------------------------|-----------------------------------|-------------------------------|
| `--bl-slider-color`       | Color of the active track & thumb | `--bl-color-primary`          |
| `--bl-slider-track-color` | Color of the inactive track       | `--bl-color-neutral-lightest` |
