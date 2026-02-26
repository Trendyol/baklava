## Figma Design Document

_TBD_

## Implementation

Color Picker component provides an interactive visual interface for selecting colors. It uses the HSV (Hue, Saturation, Value) color model internally for intuitive color selection.

General usage example:

```html
<bl-color-picker value="#ff5733"></bl-color-picker>
```

### Architecture

The component consists of three main areas:

1. **Color Area** — A 2D gradient panel where the X-axis controls saturation (0–100%) and the Y-axis controls brightness/value (100–0%). The background hue is determined by the hue slider.
2. **Hue Slider** — A horizontal slider with a rainbow gradient (0°–360°) for selecting the base hue.
3. **Input Section** — A color preview swatch, text input(s) for precise values, and a clickable format label to toggle between HEX and RGB.

### Color Model

The component uses HSV internally because it maps naturally to the 2D color area + 1D hue slider layout:

- **H (Hue)**: 0–360° — controlled by the hue slider
- **S (Saturation)**: 0–100% — X-axis of the color area (left = 0, right = 100)
- **V (Value/Brightness)**: 0–100% — Y-axis of the color area (top = 100, bottom = 0)

The `value` property always uses hex format (`#rrggbb`) regardless of the display `format`.

### Rules

* The `value` property must be a valid 6-digit or 3-digit hex color string.
* Invalid hex values are silently ignored (the previous valid color is preserved).
* RGB input values are clamped to the 0–255 range.
* The `format` property controls the display format only; the `value` is always hex.
* Keyboard arrow keys adjust values by 1 unit; holding Shift increases the step to 10.

### Interaction

**Pointer (mouse/touch):**
- Click or drag on the color area to select saturation and brightness.
- Click or drag on the hue slider to select the base hue.
- The component uses `setPointerCapture` for smooth drag tracking, even when the pointer leaves the element.

**Keyboard:**
- `Tab` to focus the color area, hue slider, or inputs.
- `ArrowLeft` / `ArrowRight` on the color area adjusts saturation.
- `ArrowUp` / `ArrowDown` on the color area adjusts brightness.
- `ArrowLeft` / `ArrowRight` on the hue slider adjusts hue.
- `Shift + Arrow` for larger step adjustments (10 units).

### Usage Examples

Basic usage:

```html
<bl-color-picker value="#3498db"></bl-color-picker>
```

RGB format:

```html
<bl-color-picker value="#e74c3c" format="rgb"></bl-color-picker>
```

Disabled state:

```html
<bl-color-picker value="#9b59b6" disabled></bl-color-picker>
```

Custom width:

```html
<bl-color-picker style="--bl-color-picker-width: 320px"></bl-color-picker>
```

Listening for changes:

```html
<bl-color-picker
  value="#ff0000"
  @bl-color-change=${(e) => console.log(e.detail)}
></bl-color-picker>
```

## API Reference

### Attributes

| Attribute | Type | Description | Default Value |
| --------- | ---- | ----------- | ------------- |
| `value` | `string` | Selected color in hex format | `"#ff0000"` |
| `format` | `"hex"` \| `"rgb"` | Display format for the input | `"hex"` |
| `disabled` | `boolean` | Disables the color picker | `false` |

### Events

| Event | Detail Type | Description |
| ----- | ----------- | ----------- |
| `bl-color-change` | `string` | Fires when the selected color changes. Detail is the hex color string. |

### CSS Custom Properties

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
| `--bl-color-picker-width` | Width of the color picker | `260px` |
