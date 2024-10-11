## Figma Design Document

https://www.figma.com/file/RrcLH0mWpIUy4vwuTlDeKN/Baklava-Design-Guide?node-id=151%3A2960

## Implementation

General usage example:

```html
<bl-progress-indicator value="50"></bl-progress-indicator>
```

### Rules

* The progress indicator completely covers the area it is in.
* If the maximum value is not given, it is evaluated over 100.
* If you set the value greater than the maximum value, the value will be evaluated as the maximum value and the progress indicator will appear full.
* Progress indicator components should respect [accessibility attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/progressbar_role) inside.

### Usage Examples

The default max value is 100 so in the example below, the progress indicator will appear 25 percent full.

```html
<bl-progress-indicator value="25"></bl-progress-indicator>
```

For example, if you have a total of 9 tasks and completed 3 tasks you can pass parameters like this. The progress indicator will divide into 9 parts and 3 parts will be full.

```html
<bl-progress-indicator max="9" value="3"></bl-progress-indicator>
```

The default status is success if you want to show a fail progress indicator you should pass the `failed` property.

```html
<bl-progress-indicator value="75" failed></bl-progress-indicator>
```

If you want the progress indicator to appear full, you should set the value to the max value.

```html
<bl-progress-indicator max="12" value="12"></bl-progress-indicator>
<bl-progress-indicator value="100" failed></bl-progress-indicator>
```

## API Reference:

#### Attributes

| Attribute | Description | Default Value |
| --------------- | --------------- | --------------- |
| size (`string`) | Size of progress component(small,medium,large) | medium |
| max (`string`) | Explains how many parts the specified progress indicator will be divided. It must have a value greater than 0 and be a valid floating point number. | 100 |
| value (`string`) | Specifies how much of the task has been completed. It must be a valid floating point number between 0 and max, or between 0 and 100 if max is omitted.  | - |
| failed (`boolean`) | Sets fail status | false |

