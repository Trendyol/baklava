# GCard

## Slots

| Name           | Description |
| -------------- | ----------- |
| `header-left`  |             |
| `header-right` |             |
| `message`      |             |
| `default`      | &nbsp;      |

## Props

| Name           | Type                     | Description | Default          |
| -------------- | ------------------------ | ----------- | ---------------- |
| `pageable`     | `Boolean`                |             | `false`          |
| `title`        | `String`                 |             | `""`             |
| `icon`         | `String`                 |             | `"alert-circle"` |
| `icon-size`    | `String` &#124; `Number` |             | `undefined`      |
| `show-message` | `Boolean`                |             | `false`          |
| `message`      | `String`                 |             | `""`             |

## Data

| Name          | Type     | Description | Initial value |
| ------------- | -------- | ----------- | ------------- |
| `pages`       | `array`  |             | `[]`          |
| `currentPage` | `number` |             | `1`           |

## Computed Properties

| Name          | Type      | Description                |
| ------------- | --------- | -------------------------- |
| `defaultSlot` | `boolean` | **Dependencies:** `$slots` |

## Events

| Name   | Description                                                 |
| ------ | ----------------------------------------------------------- |
| `page` | <br/>**Arguments**<br/><ul><li>**`options: any`**</li></ul> |

## Methods

### onPage()

**Syntax**

```typescript
onPage(options: any): void
```

### decideCurrentPage()

**Syntax**

```typescript
decideCurrentPage(): void
```

