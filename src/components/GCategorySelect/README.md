# CategoryTree

## Slots

| Name     | Description |
| -------- | ----------- |
| `footer` | &nbsp;      |

## Props

| Name            | Type                                                    | Description | Default                                       |
| --------------- | ------------------------------------------------------- | ----------- | --------------------------------------------- |
| `v-model`       | `String` &#124; `Number` &#124; `Array` &#124; `Object` |             | `() => null`                                  |
| `options`       | `Array`                                                 |             | `() => []`                                    |
| `selected`      | `Object`                                                |             | `() => ({ paths: [], ids: [], values: [], })` |
| `label`         | `String`                                                |             | `""`                                          |
| `multiple`      | `Boolean`                                               |             | `() => false`                                 |
| `single-select` | `Boolean`                                               |             | `() => false`                                 |

## Data

| Name           | Type      | Description | Initial value |
| -------------- | --------- | ----------- | ------------- |
| `searchValue`  | `string`  |             | `""`          |
| `items`        | `array`   |             | `[]`          |
| `flatItems`    | `array`   |             | `[]`          |
| `showDropdown` | `boolean` |             | `false`       |

## Computed Properties

| Name          | Type        | Description                              |
| ------------- | ----------- | ---------------------------------------- |
| `getPathText` | `unknown`   | **Dependencies:** `selected`             |
| `getOptions`  | `undefined` | **Dependencies:** `options`, `getFormat` |
| `getFormat`   | `object`    | **Dependencies:** `$attrs`               |
| `getValues`   | `boolean`   | **Dependencies:** `value`                |

## Events

| Name               | Description                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------ |
| `input`            | <br/>**Arguments**<br/><ul><li>**`this.multiple ? [] : null: unknown`**</li></ul>          |
| `onSelectCategory` | <br/>**Arguments**<br/><ul><li>**`{ paths: [], ids: [], values: [], }: object`**</li></ul> |
| `onClear`          |                                                                                            |
| `onRemoveValue`    | &nbsp;                                                                                     |

## Methods

### onSelect()

**Syntax**

```typescript
onSelect(payload: unknown): void
```

### onPush()

**Syntax**

```typescript
onPush(item: unknown): void
```

### onRevert()

**Syntax**

```typescript
onRevert(index: unknown): void
```

### onRestore()

**Syntax**

```typescript
onRestore(): void
```

### clickOutside()

**Syntax**

```typescript
clickOutside(): void
```

### onClear()

**Syntax**

```typescript
onClear(): void
```

### onClickShowDropdown()

**Syntax**

```typescript
onClickShowDropdown(): void
```

### onSearch()

**Syntax**

```typescript
onSearch(e: unknown): void
```

### onMouseEnter()

**Syntax**

```typescript
onMouseEnter(payload: unknown): void
```

### onRemoveValue()

**Syntax**

```typescript
onRemoveValue(index: unknown): void
```

### init()

**Syntax**

```typescript
init(): void
```

