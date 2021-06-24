# Wizard

## Slots

| Name           | Description |
| -------------- | ----------- |
| `content-view` |             |
| `buttons`      | &nbsp;      |

## Props

| Name       | Type       | Description | Default                     |
| ---------- | ---------- | ----------- | --------------------------- |
| `v-model`  | `String`   |             | `() => null`                |
| `validate` | `Function` |             | `() => Promise.resolve({})` |

## Data

| Name             | Type      | Description | Initial value |
| ---------------- | --------- | ----------- | ------------- |
| `currentStep`    | `unknown` |             | `null`        |
| `completedSteps` | `array`   |             | `[]`          |
| `steps`          | `array`   |             | `[]`          |
| `indexes`        | `array`   |             | `[]`          |

## Computed Properties

| Name             | Type     | Description                                         |
| ---------------- | -------- | --------------------------------------------------- |
| `isFirstStep`    | `object` | **Dependencies:** `indexes`, `currentStep`          |
| `isLastStep`     | `object` | **Dependencies:** `indexes`, `currentStep`, `steps` |
| `hasButtonsSlot` | `any`    | **Dependencies:** `$slots`                          |
| `currentIndex`   | `object` | **Dependencies:** `indexes`, `currentStep`          |

## Events

| Name             | Description                                              |
| ---------------- | -------------------------------------------------------- |
| `input`          | <br/>**Arguments**<br/><ul><li>**`slug: any`**</li></ul> |
| `wizardNextStep` |                                                          |
| `wizardPrevStep` | &nbsp;                                                   |

## Methods

### isCompleted()

**Syntax**

```typescript
isCompleted(slug: unknown): unknown
```

### isActive()

**Syntax**

```typescript
isActive(slug: unknown): unknown
```

### setActive()

**Syntax**

```typescript
setActive(step: unknown): void
```

### nextStep()

**Syntax**

```typescript
async nextStep(): Promise
```

### prevStep()

**Syntax**

```typescript
prevStep(): void
```

### setStep()

**Syntax**

```typescript
setStep(step: unknown): void
```

### revertCompletedStep()

**Syntax**

```typescript
revertCompletedStep(currentIndex: unknown): void
```

