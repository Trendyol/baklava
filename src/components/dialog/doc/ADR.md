## Figma Design Document

https://www.figma.com/file/RrcLH0mWpIUy4vwuTlDeKN/Baklava-Design-Guide?node-id=1992%3A8280

## Implementation

General usage example:

```html
<bl-dialog caption='Dialog Title'>
      <p> Dialog Content </p>
      <bl-button slot="primary-action">Save Message</bl-button>
      <bl-button slot="secondary-action" kind="danger">Delete Message</bl-button>
      <bl-button slot="tertiary-action">Dismiss</bl-button>
</bl-dialog>
```

### Rules

* By default a dialog contains a close button and a primary action button.
* Dialogs are always closeable. By default it closes by close button, by clicking outside of the dialog and by clicking "esc" on keyboard.
* A dialog should contain at least one content (text, image etc.).
* Dialogs are always centered on the page, with an overlay behind them that hides the page content.
* Only large buttons can be used in the action bar and there can be maximum 3 buttons (primary, secondary and tertiary).

## API Reference:

#### Attributes

| Attribute | Description | Default Value |
| --------------- | --------------- | --------------- |
| caption (`string`) | Title of the dialog | - |
| open (`boolean`) | Sets dialog open-close status. By default, the dialog is closed.	 | false |

#### Slots

| Name | Description | Default Content |
| --------------- | --------------- | --------------- |
| `default` slot | Content of dialog | - |
| `actions` slot | Dialog actions (action buttons) of dialog | - |

#### Events

| Event | Description |
| --------------- | --------------- |
| `bl-dialog-open` | Will be triggered every time the dialog is opened |
| `bl-dialog-close` | Will be triggered every time the dialog is closed |



