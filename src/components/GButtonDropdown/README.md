# GButtonDropdown

## Slots

| Name      | Description |
| --------- | ----------- |
| `default` |             |
| `default` |             |
| `menu`    | &nbsp;      |

## Props

| Name                   | Type      | Description | Default     |
| ---------------------- | --------- | ----------- | ----------- |
| `variant`              | `String`  |             | `"primary"` |
| `size`                 | `String`  |             | `"big"`     |
| `is-dropdown-open`     | `Boolean` |             | `false`     |
| `is-disabled`          | `Boolean` |             | `false`     |
| `is-button-disabled`   | `Boolean` |             | `false`     |
| `is-dropdown-disabled` | `Boolean` |             | `false`     |
| `tooltip`              | `Boolean` |             | `false`     |
| `tooltip-text`         | `String`  |             | `null`      |
| `tooltip-placement`    | `String`  |             | `"left"`    |

## Data

| Name               | Type      | Description | Initial value |
| ------------------ | --------- | ----------- | ------------- |
| `isContentVisible` | `boolean` |             | `false`       |

## Computed Properties

| Name          | Type      | Description                          |
| ------------- | --------- | ------------------------------------ |
| `icon`        | `unknown` | **Dependencies:** `isContentVisible` |
| `darkVariant` | `unknown` | **Dependencies:** `variant`          |
| `menuClass`   | `unknown` | **Dependencies:** `isContentVisible` |

## Events

| Name             | Description                                               |
| ---------------- | --------------------------------------------------------- |
| `onButtonClick`  | <br/>**Arguments**<br/><ul><li>**`event: any`**</li></ul> |
| `onDropdownOpen` | &nbsp;                                                    |

## Methods

### onButtonClick()

**Syntax**

```typescript
onButtonClick(event: any): void
```

### onDropdownClick()

**Syntax**

```typescript
onDropdownClick(): void
```

