## Figma Design Document

https://www.figma.com/file/RrcLH0mWpIUy4vwuTlDeKN/Baklava-Design-Guide?node-id=2161%3A9122

### Implementation

```html
<bl-split-button label="Split Button" variant="secondary" size="large">
  <bl-dropdown-group caption="Caption">
    <bl-dropdown-item>Action 1</bl-dropdown-item>
    <bl-dropdown-item>Action 2</bl-dropdown-item>
  </bl-dropdown-group>

  <bl-dropdown-item>Action 3</bl-dropdown-item>

  <bl-dropdown-item icon="info">Action 4</bl-dropdown-item>

  <bl-dropdown-item>Action 5</bl-dropdown-item>

  <bl-dropdown-group caption="Caption">
    <bl-dropdown-item icon="heart">Action 6</bl-dropdown-item>
    <bl-dropdown-item>Action 7</bl-dropdown-item>
  </bl-dropdown-group>
</bl-split-button>

```

-----

## Split Button

| Attribute                | Description                                                                               | Default Value | Type    | Options |
| ------------------------ | ----------------------------------------------------------------------------------------- | ------------- | ------- | ------- |
| label            | Sets the split button label.                           | ' '         | **String** |  |
| variant            | Sets the split button variant.                           | 'primary'         | **String** | 'primary', 'secondary' |
| kind            | Sets the split button kind.                           | 'default'         | **String** | 'default', 'neutral', 'success', 'danger' |
| size            | Sets the split button size.                           | 'medium'         | **String** | 'small', 'medium', 'large' |
| disabled            | Sets button as disabled.                           | false         | **Boolean** |  |
| loading-label            | Sets the button label for loading status.                          | ' '         | **String** |  |
| loading            | Sets loading state of button.                           | false         | **Boolean** |  |
| href            | Set link url. If set, button will be rendered as anchor tag.                   | ' '         | **String** |  |
| icon     | Sets the icon name. Shows icon with bl-icon component.   |           | **BaklavaIcon**  |       https://baklava.design/?path=/docs/design-system-icons-iconography--documentation                                   |
| target            | Sets the anchor target. Used when `href` is set.                       |  _self          | **TargetType** | _blank, _self, _parent, _top, framename |
| type            | Sets the type of the button. Set `submit` to use button as the submitter of parent form.  | 'button '         | **String** | 'submit',  'button', 'reset' |
| autofocus            | Sets button to get keyboard focus automatically.                           | false         | **Boolean** |  |
| form            | Sets the associated form of the button. Use when `type` is set to `submit` and button is not inside the target form.                 |        | **HTMLFormElement** |  |
| dropdown-disabled            | Sets the button of dropdown handler as disabled.                           | false         | **Boolean** |  |



| Events    | Description                          |
| --------- | ------------------------------------ |
| bl-click | Trigger an event for button click.  |
| bl-dropdown-open	 | Trigger an event when popover opened.  |
| bl-dropdown-close | Trigger an event when popover closed.  |

## Dropdown Item

We should add these attributes for the Split Button component.

| Attribute                | Description                                                                               | Default Value | Type    | Options |
| ------------------------ | ----------------------------------------------------------------------------------------- | ------------- | ------- | ------- |
| disabled            | Sets button as disabled.                           | false         | **Boolean** |  |

## Integration Considerations

1. If we intend to utilize this button within the tooltip component, the tooltip will remain visible at all times when the dropdown is opened. During development, we need to verify the slot attribute of the `tooltip-trigger` and address this scenario accordingly.

## Consequences

Let's discuss this either under this comment or during our weekly meetings.
