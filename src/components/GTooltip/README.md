# GTooltip

## Slots

| Name              | Description |
| ----------------- | ----------- |
| `tooltip-trigger` |             |
| `tooltip-text`    | &nbsp;      |

## Props

| Name        | Type     | Description | Default   |
| ----------- | -------- | ----------- | --------- |
| `text`      | `String` |             | `""`      |
| `variant`   | `String` |             | `"dark"`  |
| `placement` | `String` |             | `"right"` |

## Computed Properties

| Name              | Type      | Description                              |
| ----------------- | --------- | ---------------------------------------- |
| `tooltipClass`    | `object`  | **Dependencies:** `variant`              |
| `placementClass`  | `object`  | **Dependencies:** `placement`, `variant` |
| `borderColorVars` | `boolean` | **Dependencies:** `variant`              |

