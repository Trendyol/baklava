# GTextarea

## Props

| Name               | Type      | Description | Default      |
| ------------------ | --------- | ----------- | ------------ |
| `v-model`          | `String`  |             | `() => null` |
| `type`             | `String`  |             | `"text"`     |
| `is-outline-label` | `Boolean` |             | `false`      |
| `success`          | `Boolean` |             | `false`      |
| `error`            | `Boolean` |             | `false`      |
| `disable`          | `Boolean` |             | `false`      |
| `label`            | `String`  |             | `""`         |
| `feedback`         | `String`  |             | `""`         |
| `icon`             | `String`  |             | `""`         |

## Computed Properties

| Name        | Type      | Description                    |
| ----------- | --------- | ------------------------------ |
| `getValue`  | `object`  | **Dependencies:** `value`      |
| `listeners` | `unknown` | **Dependencies:** `$listeners` |

## Events

| Name    | Description                                               |
| ------- | --------------------------------------------------------- |
| `input` | <br/>**Arguments**<br/><ul><li>**`value: any`**</li></ul> |

## Methods

### onInput()

**Syntax**

```typescript
onInput(e: any): void
```

