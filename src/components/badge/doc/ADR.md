## Figma Design Document

https://www.figma.com/file/RrcLH0mWpIUy4vwuTlDeKN/Baklava-Design-Guide?node-id=25%3A3610

## Implementation

General usage example:

```html
<bl-badge>In Progress</bl-badge>
```

### Rules

* Icon can only be used on Large and Medium badges.
* There are no specific variants for the badge but using our color palette for badge colors is suggested.

### Usage Examples

Default background color is `--bl-color-accent-primary-background` and default color is `--bl-color-primary`. But any color can be set like this:

```html
<style>
.danger-badge {
--bl-badge-bg-color:var(--bl-color-danger-background);
--bl-badge-color:var(--bl-color-danger);
}
</style>

<bl-badge class="danger-badge">Denied</bl-badge>
```

The icon can be set like this:

```html
<bl-badge icon="waiting">In Progress</bl-badge>
```

The size can be set like this:

```html
<bl-badge size="large">In Progress</bl-badge>
```

## API Reference:

#### Attributes

| Attribute | Description | Default Value |
| --------------- | --------------- | --------------- |
| size (`string`) | Size of badge(small,medium,large) | medium |
| icon (`string`) | Name of the icon that will be shown in badge | - |


