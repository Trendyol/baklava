## Figma Design Document

https://www.figma.com/design/lSvX6Qe0jc8b4CaIK7egXR/Baklava-Component-Library?node-id=21476-4839&node-type=frame&t=PriuJR3qmpVaFIdy-0

## Implementation

General usage example:

```html
<bl-tag>In Progress</bl-tag>
```

### Usage Examples
Selectable variant usage:
```html
<bl-tag @bl-tag-click="handleTagClick" selected>Selectable tag</bl-tag>
```
The removable variant can be set like this:

```js

const handleTagClick=(event)=>{
   tags.filter((tag)=>tag.value!==event.value)
}
<bl-tag variant="removable" @bl-tag-click="handleTagClick">Removable tag</bl-tag>
```

The icon can be set like this:

```html
<bl-tag icon="info">Default</bl-tag>
```

The size and disabled attributes can be set like this:

```html
<bl-tag size="large" disabled>In Progress</bl-tag>
```

## API Reference:

#### Attributes

| Attribute            | Description                                   | Default Value |
|----------------------|-----------------------------------------------|---------------|
| size (`string`)      | Size of tag(`small`,`medium`,`large`)         | medium        |
| icon (`bl-icon`)     | Name of the icon that will be shown in tag    | -             |
| variant (`string`)   | Variants of the tag(`selectable`,`removable`) | selectable    |
| disabled (`boolean`) | Makes tag disabled                            | false         |
| selected (`boolean`) | Makes tag selected                            | false         |
| value (`string`)     | Sets tags value                               | -             |



### Events

| Name           | Description                | Payload                           |
|----------------|----------------------------|-----------------------------------|
| `bl-tag-click` | Fires when tag is clicked  | `{value:string,selected:boolean}` |

