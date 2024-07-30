## Figma Design Document

https://www.figma.com/file/RrcLH0mWpIUy4vwuTlDeKN/Baklava-Design-Guide?node-id=118%3A4068

## Implementation

General usage example:

```html
<bl-checkbox checked disabled>single checkbox</bl-checkbox>
```


### Rules
* `Indeterminate` state can be use with a single checkbox.
* Styling the colors of checkbox component will be possible via `bl-checkbox` CSS properties. Like
```html
<style>
.checkbox-new {
   --bl-color-primary: rebeccapurple;
}
</style>

<bl-checkbox class="checkbox-new">new label</bl-checkbox>
```

## API Reference:

### `bl-checkbox` component

Checkbox component handles interaction to change checked/unchecked states.

#### Attributes

| Attribute | Description | Default Value |
| --------------- | --------------- | --------------- |
| checked (`boolean`) | Sets checkbox checked. By default checkbox is unchecked | false |
| disabled (`boolean`) | Sets checkbox disabled | - |
| indeterminate (`boolean`) | Sets checkbox indeterminate | - |

#### Slots

| Name | Description | Default Content |
| --------------- | --------------- | --------------- |
| `default` slot | label | - |

#### Events

| Event | Description |
| --------------- | --------------- |
| `bl-checkbox-change` | Will be triggered when checkbox clicked ( event.target.checked )|
