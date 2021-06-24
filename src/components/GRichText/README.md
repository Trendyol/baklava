# GRichText

## Props

| Name       | Type      | Description | Default      |
| ---------- | --------- | ----------- | ------------ |
| `v-model`  | `String`  |             | `""`         |
| `feedback` | `String`  |             | `""`         |
| `success`  | `Boolean` |             | `false`      |
| `error`    | `Boolean` |             | `false`      |
| `disable`  | `Boolean` |             | `false`      |
| `options`  | `Object`  |             | `() => ({})` |
| `opts`     | `Object`  |             | `() => ({})` |

## Data

| Name          | Type     | Description | Initial value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------- | -------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `defaultOpts` | `object` |             | `{"placeholder":{"type":"string","value":"","raw":"\"\""},"modules":{"type":"object","value":{"toolbar":{"type":"array","value":"[ ['bold', 'italic', 'underline', 'strike'], [{ size: ['small', false, 'large', 'huge'] }], [{ list: 'ordered' }, { list: 'bullet' }], [{ direction: 'rtl' }], [{ align: [] }], ]","raw":"[ ['bold', 'italic', 'underline', 'strike'], [{ size: ['small', false, 'large', 'huge'] }], [{ list: 'ordered' }, { list: 'bullet' }], [{ direction: 'rtl' }], [{ align: [] }], ]"}},"raw":"{\"toolbar\":{\"type\":\"array\",\"value\":\"[ ['bold', 'italic', 'underline', 'strike'], [{ size: ['small', false, 'large', 'huge'] }], [{ list: 'ordered' }, { list: 'bullet' }], [{ direction: 'rtl' }], [{ align: [] }], ]\",\"raw\":\"[ ['bold', 'italic', 'underline', 'strike'], [{ size: ['small', false, 'large', 'huge'] }], [{ list: 'ordered' }, { list: 'bullet' }], [{ direction: 'rtl' }], [{ align: [] }], ]\"}}"}}` |

## Computed Properties

| Name           | Type     | Description                                     |
| -------------- | -------- | ----------------------------------------------- |
| `wrapperClass` | `object` | **Dependencies:** `error`, `success`, `disable` |

## Events

| Name    | Description                                               |
| ------- | --------------------------------------------------------- |
| `input` | <br/>**Arguments**<br/><ul><li>**`event: any`**</li></ul> |

## Methods

### onInput()

**Syntax**

```typescript
onInput(event: unknown): void
```

