# Tree Select Component

## Figma Design Document

[Baklava Design Guide – Tree Select](https://www.figma.com/design/RrcLH0mWpIUy4vwuTlDeKN/Baklava-Design-Guide?node-id=26640-5823&p=f&t=FjujjxTaCNkGYHd4-0)

## ADR / Issue

[Component: Tree Select (#1125)](https://github.com/Trendyol/baklava/issues/1125)

## Overview

The Tree Select component allows hierarchical selection (e.g. category tree). It supports single and multiple selection, expand/collapse, autocomplete with path display, keyboard navigation, and optional "Select All".

## Implementation

### General usage example

```html
<bl-tree-select
  label="Category"
  placeholder="Select category"
  .items="${treeData}"
  .value="${selectedValue}"
  is-multiple
  view-select-all
  select-all-text="Select All"
  @bl-tree-select-change="${handleChange}"
></bl-tree-select>
```

Tree data shape (`TreeNode[]`):

```ts
interface TreeNode {
  value: string;
  label: string;
  count?: number;
  children?: TreeNode[];
}
```

### Rules

- **Single mode (`is-multiple="false"`)**: Only leaf nodes (nodes without children) are selectable; parent nodes have no checkbox and only expand/collapse.
- **Multiple mode**: All nodes have checkboxes; optional "Select All" row when `view-select-all` is set.
- **Autocomplete**: When the user types in the input, the panel shows a filtered list of paths (e.g. `Parent/Child/Leaf`) with the search term highlighted; when there are no matches, the empty state message is shown.
- **Value**: Single mode uses `string | null`; multiple mode uses `string[]`.

---

## API Reference

### `bl-tree-select`

| Attribute | Type | Description | Default |
| --------- | ---- | ----------- | ------- |
| `label` | `string` | Label above the input | `""` |
| `placeholder` | `string` | Placeholder for the input | `""` |
| `items` | `TreeNode[]` | Tree data (root nodes with optional `children`, `count`) | `[]` |
| `value` | `string \| string[] \| null` | Selected value(s). Single: one string; multiple: array of strings | `null` |
| `is-multiple` | `boolean` | Multiple selection with checkboxes and Select All; when false, single selection (leaf-only) | `true` |
| `view-select-all` | `boolean` | Show "Select All" row (only when `is-multiple`) | `false` |
| `select-all-text` | `string` | Text for Select All row | `""` (localized fallback: `"Select All"`) |
| `search-placeholder` | `string` | Placeholder for search inside dropdown | `""` (localized fallback: `"Search..."`) |
| `empty-result-text` | `string` | Message when search has no results | `undefined` (localized fallback: `"No Result Found"`) |
| `disabled` | `boolean` | Disables the component | `false` |
| `required` | `boolean` | Marks the field as required | `false` |

### Events

| Event | Description | Payload |
| ----- | ----------- | ------- |
| `bl-tree-select-change` | Fired when selection changes | `{ value: string \| string[] \| null }` |

### Methods

| Method | Description |
| ------ | ----------- |
| `open()` | Opens the dropdown panel |
| `close()` | Closes the dropdown and clears search text |

---

## States

- **Default**: Input with placeholder; chevron indicates dropdown.
- **Open**: Panel with tree or autocomplete list; loading spinner shown while user is typing (when search is non-empty).
- **Selected**: Selected item(s) shown in input; clear (X) button visible when not disabled.
- **Empty (no results)**: When search has no matches, panel shows `empty-result-text` in a bordered message area.
- **Disabled**: Component is dimmed and non-interactive; cursor `not-allowed`.
