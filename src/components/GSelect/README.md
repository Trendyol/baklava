# GSelect

## Props

| Name                 | Type                    | Description | Default   |
| -------------------- | ----------------------- | ----------- | --------- |
| `is-outline-label`   | `Boolean`               |             | `false`   |
| `is-borderless`      | `Boolean`               |             | `false`   |
| `is-checkbox`        | `Boolean`               |             | `false`   |
| `is-search`          | `Boolean`               |             | `false`   |
| `success`            | `Boolean`               |             | `false`   |
| `error`              | `Boolean`               |             | `false`   |
| `disable`            | `Boolean`               |             | `false`   |
| `label`              | `String`                |             | `""`      |
| `placeholder`        | `String`                |             | `""`      |
| `search-placeholder` | `String`                |             | `"Arama"` |
| `feedback`           | `String`                |             | `""`      |
| `v-model`            | `String` &#124; `Array` |             | `""`      |
| `options` *required* | `Array`                 |             |           |
| `size`               | `String`                |             | `"big"`   |

## Data

| Name               | Type      | Description | Initial value |
| ------------------ | --------- | ----------- | ------------- |
| `isOptionsVisible` | `boolean` |             | `false`       |
| `searchText`       | `string`  |             | `""`          |

## Computed Properties

| Name              | Type      | Description                                                                           |
| ----------------- | --------- | ------------------------------------------------------------------------------------- |
| `filteredOptions` | `unknown` | **Dependencies:** `options`, `searchText`                                             |
| `icon`            | `unknown` | **Dependencies:** `isOptionsVisible`                                                  |
| `getValue`        | `object`  | **Dependencies:** `value`                                                             |
| `getLabel`        | `unknown` | **Dependencies:** `options`, `value`, `isOutlineLabel`, `isBorderless`, `placeholder` |
| `wrapperClass`    | `object`  | **Dependencies:** `size`, `isBorderless`                                              |
| `contentClass`    | `object`  | **Dependencies:** `isOptionsVisible`                                                  |

## Events

| Name             | Description                                              |
| ---------------- | -------------------------------------------------------- |
| `onSearchChange` | <br/>**Arguments**<br/><ul><li>**`text: any`**</li></ul> |
| `input`          | <br/>**Arguments**<br/><ul><li>**`item: any`**</li></ul> |
| `onChange`       | <br/>**Arguments**<br/><ul><li>**`item: any`**</li></ul> |

## Methods

### isSelected()

**Syntax**

```typescript
isSelected(item: unknown): Boolean
```

### onSearchChange()

**Syntax**

```typescript
onSearchChange(text: string | number): void
```

### clickItem()

**Syntax**

```typescript
clickItem(item: string | number): void
```

### clickCheckbox()

**Syntax**

```typescript
clickCheckbox(item: string | number): void
```

