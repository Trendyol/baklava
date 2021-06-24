# GFieldWrapper

## Slots

| Name      | Description |
| --------- | ----------- |
| `default` | &nbsp;      |

## Props

| Name                  | Type       | Description | Default    |
| --------------------- | ---------- | ----------- | ---------- |
| `is-active-content`   | `Boolean`  |             | `false`    |
| `is-outline-label`    | `Boolean`  |             | `false`    |
| `is-value` *required* | `Boolean`  |             |            |
| `success`             | `Boolean`  |             | `false`    |
| `error`               | `Boolean`  |             | `false`    |
| `disable`             | `Boolean`  |             | `false`    |
| `label`               | `String`   |             | `""`       |
| `size`                | `String`   |             | `"big"`    |
| `feedback`            | `String`   |             | `""`       |
| `icon`                | `String`   |             | `""`       |
| `icon-position`       | `String`   |             | `""`       |
| `on-click`            | `Function` |             | `() => {}` |
| `on-outline-click`    | `Function` |             | `() => {}` |

## Data

| Name       | Type      | Description | Initial value |
| ---------- | --------- | ----------- | ------------- |
| `isActive` | `boolean` |             | `false`       |

## Computed Properties

| Name           | Type      | Description                                                                                                         |
| -------------- | --------- | ------------------------------------------------------------------------------------------------------------------- |
| `wrapperClass` | `object`  | **Dependencies:** `isOutlineLabel`, `isLabelTop`, `isActive`, `error`, `success`, `disable`, `iconPosition`, `size` |
| `iconColor`    | `unknown` | **Dependencies:** `error`, `disable`, `success`                                                                     |
| `isLabelTop`   | `unknown` | **Dependencies:** `isValue`                                                                                         |

## Events

| Name                     | Description                                                  |
| ------------------------ | ------------------------------------------------------------ |
| `update:isActiveContent` | <br/>**Arguments**<br/><ul><li>**`isActive: any`**</li></ul> |

## Methods

### clickWrapper()

**Syntax**

```typescript
clickWrapper(): void
```

### clickOutside()

**Syntax**

```typescript
clickOutside(): void
```

