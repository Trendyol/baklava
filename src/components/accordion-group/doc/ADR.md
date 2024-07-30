## Figma Design Document

https://www.figma.com/file/RrcLH0mWpIUy4vwuTlDeKN/Baklava-Design-Guide?type=design&node-id=15548%3A20910&mode=design&t=25ieOea9LEuP8Yzk-1

## General Usage Example

```html
<!--   STANDALONE   -->
<bl-accordion caption="Deneme"> Merhaba </bl-accordion>

<!--   LIST VARIANT   -->
<bl-accordion-group>
  <bl-accordion caption="Deneme"> Merhaba </bl-accordion>

  <bl-accordion icon="eye_on" caption="Deneme"> Merhaba </bl-accordion>
</bl-accordion-group>
```

## Rules

* Accordion is a component that allows the user to show and hide sections of related content on a page.
* The accordion component includes a free content area.
* The caption can be set either via attribute or **slot**.
* An icon can be added to the beginning of the caption.
* Accordion can be disabled.
* The accordion group component combines accordions and only allows one accordion to be open by default


## API Reference

### bl-accordion-group

| Attribute | Type    | Description                                  | Default Value |
|-----------|---------|----------------------------------------------|---------------|
| multiple  | boolean | Allow multiple accordions to be open at once | false         |


### bl-accordion

| Attribute | Type    | Description                        | Default Value |
|-----------|---------|------------------------------------|---------------|
| open      | boolean | Whether the accordion is expanded  | false         |
| caption   | string  | Sets accordion caption.            | null          |
| icon      | string  | Add icon to beginning of the title | null          |
| disabled  | boolean | Whether the accordion is expanded  | false         |

#### Slots

| Slot Name | Description                                                         |
|-----------|---------------------------------------------------------------------|
| title     | Setting the accordion title as a slot disables the title attribute. |
| default   | Free content area                                                   |

#### Events

| Event     | Description                                       |
|-----------|---------------------------------------------------|
| bl-toggle | Triggered when the accordion expands or collapses |
