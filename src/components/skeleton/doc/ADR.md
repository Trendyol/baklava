## Figma Design Document

_TBD_

## Implementation

Skeleton component provides placeholder loading states for content. It helps reduce perceived loading time by showing the structure of the page before the actual content is loaded.

General usage example:

```html
<bl-skeleton></bl-skeleton>
```

### Rules

* Default variant is `rect` and default effect is `pulse`.
* The `circle` variant uses equal width and height by default (`40px`). Override with `width` and `height` for custom sizes.
* The `text` variant renders a thin line suitable for paragraph placeholders.
* Custom `width` and `height` accept any valid CSS value (e.g. `200px`, `50%`, `10rem`).
* Skeleton elements have `role="presentation"` and `aria-hidden="true"` to be hidden from assistive technologies.

### Usage Examples

Basic rectangular skeleton:

```html
<bl-skeleton></bl-skeleton>
```

Circle skeleton for avatar placeholders:

```html
<bl-skeleton variant="circle" width="64px" height="64px"></bl-skeleton>
```

Text skeleton for paragraph placeholders:

```html
<bl-skeleton variant="text"></bl-skeleton>
<bl-skeleton variant="text" width="80%"></bl-skeleton>
<bl-skeleton variant="text" width="60%"></bl-skeleton>
```

Wave animation effect:

```html
<bl-skeleton effect="wave" width="100%" height="40px"></bl-skeleton>
```

Card loading placeholder:

```html
<div class="card">
  <bl-skeleton width="100%" height="160px"></bl-skeleton>
  <bl-skeleton variant="circle" width="40px" height="40px"></bl-skeleton>
  <bl-skeleton variant="text" width="60%"></bl-skeleton>
  <bl-skeleton variant="text" width="40%"></bl-skeleton>
</div>
```

Custom colors:

```css
.custom-skeleton {
  --bl-skeleton-bg-color: #e0e0e0;
  --bl-skeleton-highlight-color: #f5f5f5;
}
```

```html
<bl-skeleton class="custom-skeleton"></bl-skeleton>
```

## API Reference

### Attributes

| Attribute | Type | Description | Default Value |
| --------- | ---- | ----------- | ------------- |
| `variant` | `"rect"` \| `"circle"` \| `"text"` | Shape variant of the skeleton | `"rect"` |
| `effect` | `"pulse"` \| `"wave"` \| `"none"` | Animation effect | `"pulse"` |
| `width` | `string` | Custom CSS width | - |
| `height` | `string` | Custom CSS height | - |

### CSS Custom Properties

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
| `--bl-skeleton-bg-color` | Background color | `--bl-color-neutral-lightest` |
| `--bl-skeleton-highlight-color` | Highlight color for wave animation | `--bl-color-neutral-full` |
| `--bl-skeleton-radius` | Border radius override | `--bl-border-radius-s` |
