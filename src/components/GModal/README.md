# GModal

## Slots

| Name     | Description |
| -------- | ----------- |
| `body`   |             |
| `footer` | &nbsp;      |

## Props

| Name                 | Type      | Description | Default |
| -------------------- | --------- | ----------- | ------- |
| `v-model` *required* | `Boolean` |             |         |
| `title`              | `String`  |             |         |
| `large`              | `Boolean` |             | `false` |
| `small`              | `Boolean` |             | `false` |
| `scrollable`         | `Boolean` |             | `false` |

## Computed Properties

| Name            | Type     | Description                                      |
| --------------- | -------- | ------------------------------------------------ |
| `classNames`    | `object` | **Dependencies:** `large`, `small`, `scrollable` |
| `hasFooterSlot` | `any`    | **Dependencies:** `$slots`                       |

## Events

| Name    | Description                                                     |
| ------- | --------------------------------------------------------------- |
| `input` | <br/>**Arguments**<br/><ul><li>**`!this.value: any`**</li></ul> |
| `close` | &nbsp;                                                          |

## Methods

### close()

**Syntax**

```typescript
close(): void
```

