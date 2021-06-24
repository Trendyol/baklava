# GButton

## Slots

| Name      | Description |
| --------- | ----------- |
| `default` | &nbsp;      |

## Props

| Name         | Type      | Description | Default     |
| ------------ | --------- | ----------- | ----------- |
| `variant`    | `String`  |             | `"primary"` |
| `size`       | `String`  |             | `"big"`     |
| `fluid`      | `Boolean` |             | `false`     |
| `left-icon`  | `String`  |             | `undefined` |
| `right-icon` | `String`  |             | `undefined` |
| `icon`       | `String`  |             | `undefined` |
| `icon-color` | `String`  |             | `"white"`   |
| `outline`    | `Boolean` |             | `false`     |

## Computed Properties

| Name               | Type     | Description                                                                      |
| ------------------ | -------- | -------------------------------------------------------------------------------- |
| `classNames`       | `object` | **Dependencies:** `fluid`, `icon`, `leftIcon`, `rightIcon`, `variant`, `outline` |
| `contentClassname` | `object` | **Dependencies:** `size`                                                         |
| `slotClassName`    | `object` | **Dependencies:** `leftIcon`, `rightIcon`                                        |
| `iconSize`         | `object` | **Dependencies:** `size`                                                         |

