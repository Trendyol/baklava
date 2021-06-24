# Tabs

## Slots

| Name               | Description |
| ------------------ | ----------- |
| `sub-title`        |             |
| `totalElementText` | &nbsp;      |

## Props

| Name         | Type      | Description | Default    |
| ------------ | --------- | ----------- | ---------- |
| `tabs`       | `Array`   |             | `() => []` |
| `type`       | `String`  |             | `""`       |
| `show-count` | `Boolean` |             | `false`    |
| `fluid`      | `Boolean` |             | `false`    |

## Computed Properties

| Name         | Type     | Description               |
| ------------ | -------- | ------------------------- |
| `classNames` | `object` | **Dependencies:** `fluid` |

## Events

| Name             | Description                                              |
| ---------------- | -------------------------------------------------------- |
| `handleTabClick` | <br/>**Arguments**<br/><ul><li>**`type: any`**</li></ul> |

## Methods

### handleTabClick()

**Syntax**

```typescript
handleTabClick(type: unknown): void
```

### label()

**Syntax**

```typescript
label(label: unknown): unknown
```

