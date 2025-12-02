### General Usage Example

```<bl-stepper><bl-stepper-item></bl-stepper-item></bl-stepper>```

### Rules

**Max Items**: A maximum of 9 items can be included.

**Types**: It has three display types: dot, number, and icon.

**States**: There are four main states: default, active, success, and error.

**Focus State**: It includes a dedicated focus state for enhanced keyboard and assistive technology accessibility.

**Direction**: It supports both horizontal and vertical orientations.

**Spacing**:

- All items have equal spacing.
- The connecting lines between completed steps are dark.
- The lines between incomplete steps are light.


### Attributes

Bl-Stepper-Item Attributes

| Attribute | Description | Default Value |
| --------------- | --------------- | --------------- |
id(`number,string`) | Defines stepper item's id  | undefined
variant(`"default" \| "active" \| "success" \| "error"`) | Defines stepper item's status  | default
disabled(`boolean`) | Defines stepper item's interaction  | false
icon(`string`) | If stepper type is icon,it should be rendered on stepper items  | check
title(`string`) | Defines stepper item's main title | ''
description(`string`) | Defines stepper item's description  | ''


---

Bl-Stepper Attributes

| Attribute | Description | Default Value |
| --------------- | --------------- | --------------- |
type(`"dot" \| "number" \| "icon"`) | Defines stepper render style  | dot
direction(`"horizontal" \| "vertical"`) | Defines stepper direction is horizontal or vertical  | horizontal
usage(`"clickable" \| "non-clickable"`) | Defines stepper usage is clickable or non-clickable | clickable


### Events

Bl-Stepper Events

| Event | Description | Return Value |
| --------------- | --------------- | --------------- |
| `bl-stepper-change` | Event will pass stepper's current state | { activeStep: number, totalSteps: number }

---

Bl-Stepper-Item Events

| Event | Description | Return Value |
| --------------- | --------------- | --------------- |
| `bl-stepper-item-click` | Event will pass clicked stepper item id | id,string

