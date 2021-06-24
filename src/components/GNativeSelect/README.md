# GNativeSelect

## Props

| Name                 | Type      | Description | Default      |
| -------------------- | --------- | ----------- | ------------ |
| `type`               | `String`  |             | `"text"`     |
| `is-outline-label`   | `Boolean` |             | `false`      |
| `is-borderless`      | `Boolean` |             | `false`      |
| `success`            | `Boolean` |             | `false`      |
| `error`              | `Boolean` |             | `false`      |
| `disable`            | `Boolean` |             | `false`      |
| `label`              | `String`  |             | `""`         |
| `feedback`           | `String`  |             | `""`         |
| `value-key`          | `String`  |             | `"value"`    |
| `text-key`           | `String`  |             | `"text"`     |
| `options` *required* | `Array`   |             |              |
| `v-model`            | `Object`  |             | `() => ({})` |

## Computed Properties

| Name           | Type      | Description                      |
| -------------- | --------- | -------------------------------- |
| `wrapperClass` | `object`  | **Dependencies:** `isBorderless` |
| `listeners`    | `unknown` | **Dependencies:** `$listeners`   |

## Events

| Name    | Description                                                                                                                                             |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `input` | <br/>**Arguments**<br/><ul><li>**`this.options.find((item: any) => (item[this.valueKey] || '').toString() === event.target.value): unknown`**</li></ul> |

## Methods

### onInput()

**Syntax**

```typescript
onInput(event: any): void
```

