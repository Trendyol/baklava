# GAlert

## Slots

| Name      | Description |
| --------- | ----------- |
| `default` | &nbsp;      |

## Props

| Name        | Type                     | Description | Default     |
| ----------- | ------------------------ | ----------- | ----------- |
| `variant`   | `String`                 |             | `"error"`   |
| `icon`      | `String`                 |             | `undefined` |
| `icon-size` | `Number` &#124; `String` |             | `"16px"`    |
| `show-icon` | `Boolean`                |             | `true`      |
| `border`    | `Boolean`                |             | `false`     |

## Computed Properties

| Name       | Type      | Description                           |
| ---------- | --------- | ------------------------------------- |
| `classes`  | `object`  | **Dependencies:** `variant`, `border` |
| `iconType` | `boolean` | **Dependencies:** `icon`, `variant`   |

