# GPagination

## Props

| Name                | Type      | Description | Default                                                                                |
| ------------------- | --------- | ----------- | -------------------------------------------------------------------------------------- |
| `pagination`        | `Object`  |             | `() => ({})`                                                                           |
| `page-size-text`    | `String`  |             | `"Adet"`                                                                               |
| `page-size-visible` | `Boolean` |             | `false`                                                                                |
| `page-limits`       | `Array`   |             | `() => [ { value: 10, text: 10 }, { value: 20, text: 20 }, { value: 50, text: 50 }, ]` |
| `reverse`           | `Boolean` |             | `false`                                                                                |

## Data

| Name               | Type     | Description | Initial value       |
| ------------------ | -------- | ----------- | ------------------- |
| `pageRange`        | `array`  |             | `[-2, -1, 0, 1, 2]` |
| `paginationLength` | `number` |             | `5`                 |
| `size`             | `number` |             | `0`                 |

## Computed Properties

| Name                 | Type      | Description                                                       |
| -------------------- | --------- | ----------------------------------------------------------------- |
| `pageLimitsWithText` | `unknown` | **Dependencies:** `pageLimits`, `pageSizeText`                    |
| `currentPage`        | `unknown` | **Dependencies:** `pagination`                                    |
| `pageSize`           | `unknown` | **Dependencies:** `pagination`                                    |
| `paginationRange`    | `unknown` | **Dependencies:** `pagination`, `paginationLength`, `currentPage` |
| `isFirst`            | `unknown` | **Dependencies:** `currentPage`                                   |
| `isLast`             | `unknown` | **Dependencies:** `currentPage`, `pagination`                     |
| `show`               | `unknown` | **Dependencies:** `pagination`                                    |

## Events

| Name   | Description                                                      |
| ------ | ---------------------------------------------------------------- |
| `name` | <br/>**Arguments**<br/><ul><li>**`page - 1: unknown`**</li></ul> |

## Methods

### goPage()

**Syntax**

```typescript
goPage(name: string, page: number): void
```

### previous()

**Syntax**

```typescript
previous(name: string, page: number): void
```

### next()

**Syntax**

```typescript
next(name: string, page: number): void
```

### changeSize()

**Syntax**

```typescript
changeSize(name: string): void
```

