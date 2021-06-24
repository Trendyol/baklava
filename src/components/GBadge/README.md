# GBadge

## Slots

| Name      | Description |
| --------- | ----------- |
| `default` | &nbsp;      |

## Props

| Name               | Type      | Description | Default          |
| ------------------ | --------- | ----------- | ---------------- |
| `border`           | `Boolean` |             | `false`          |
| `inline`           | `Boolean` |             | `false`          |
| `dot`              | `Boolean` |             | `false`          |
| `left`             | `Boolean` |             | `false`          |
| `bottom`           | `Boolean` |             | `false`          |
| `overlap`          | `Boolean` |             | `false`          |
| `background-color` | `String`  |             | `"orange-100"`   |
| `border-color`     | `String`  |             | `"mid-grey-100"` |
| `text-color`       | `String`  |             | `"white"`        |
| `text`             | `String`  |             | `"0"`            |

## Computed Properties

| Name                  | Type     | Description                                                                                                |
| --------------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| `badgeClass`          | `object` | **Dependencies:** `overlap`, `bottom`, `left`, `dot`, `inline`, `border`, `borderColor`, `backgroundColor` |
| `badgeContainerClass` | `object` | **Dependencies:** `inline`, `left`                                                                         |

