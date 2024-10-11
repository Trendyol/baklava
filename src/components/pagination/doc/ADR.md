## Figma Design Document

https://www.figma.com/file/RrcLH0mWpIUy4vwuTlDeKN/Baklava-Design-Guide?node-id=118%3A4074

## Implementation

General usage example:

```html
<bl-pagination current-page=1 total-items=200 items-per-page=5 ></bl-pagination>
```

## API Reference:

### `bl-pagination` component

Pagination component is for listing the pages to the users and redirecting them between pages.

#### Attributes

| Attribute | Description | Default Value |
| --------------- | --------------- | --------------- |
| current-page (`number`) | Sets the current page| 1 |
| total-items (`number`) | Total number of data to be paginated | - |
| items-per-page (`number`) | Sets the number of items per page | 100 |
| has-jumper (`boolean`) | Adds a jumper input to the pagination| false |
| has-select (`boolean`) | Adds select component to let users choose the result per page | false |
| jumper-label (`string`) | Sets the jumper label| Go To |
| select-label (`string`) | Sets select label | Show |
| option-text (`string`) | Sets the option texts of the select element | Items |

#### Events

| Event | Description | Data
| --------------- | --------------- | --------------- |
| `bl-change` | Fires everytime user selects a page | ( {selectedPage,prevPage})

