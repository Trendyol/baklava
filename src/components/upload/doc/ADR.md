## Figma Design Document

https://www.figma.com/design/RrcLH0mWpIUy4vwuTlDeKN/Baklava-Design-Guide?node-id=30165-23095&t=2KatC0pHP0MvvtaW-1

## Implementation

General usage example:

```html
<bl-upload
  header-text="Select / Drop File"
  description-text="JPG, JPEG, PNG, Maximum 10MB"
  button-text="Select File"
  accept=".jpg,.jpeg,.png"
></bl-upload>
```

### Rules

- **Variants**: Three layout variants: `horizontal`, `vertical`, and `button`. Horizontal shows title, description, icon and button in a row; vertical stacks them; button shows only the action button.
- **Selection**: Users can select files via the button or by dragging and dropping into the drop zone.
- **Single vs multiple**: When `multiple` is false, only one file is allowed; selecting again replaces the previous. When `multiple` is true, multiple files can be added, optionally limited by `max-files`.
- **Validation**: File type is validated against `accept` (e.g. `.jpg,.jpeg,.png`, `image/*`, MIME types). File size is validated against `max-file-size` (default 10MB). Errors are reported via `bl-upload-error` or `onError`.
- **File list**: When `show-file-list` is true, selected/uploaded files are listed with progress, success, or error state. Users can remove files via the remove action.
- **Progress & status**: The component does not upload by itself; the app uses `bl-upload` event (or `onFilesSelected`) to send files to the server and updates status via `setFileStatus` / `setFileProgress`.
- **Accessibility**: The drop zone and button are keyboard-accessible; file input is visually hidden but used for selection.

### Attributes

| Attribute | Description | Default Value |
| --------- | ----------- | ------------- |
| variant (`"horizontal" \| "vertical" \| "button"`) | Layout variant | horizontal |
| accept (`string`) | Accepted file types (e.g. `.jpg,.jpeg,.png`, `image/*`) | - |
| multiple (`boolean`) | Allow multiple file selection | false |
| max-file-size (`number`) | Maximum file size in bytes | 10485760 (10MB) |
| max-files (`number`) | Maximum number of files when multiple is true | 10 |
| header-text (`string`) | Header text | Dosya Seç / Sürükle |
| description-text (`string`) | Description text | JPG, JPEG, PNG, Maksimum 10MB |
| button-text (`string`) | Button label | Dosya Seç |
| disabled (`boolean`) | Disables the component | false |
| show-file-list (`boolean`) | Show list of selected/uploaded files | true |
| auto-upload (`boolean`) | Simulated auto-upload after selection | false |

### Events

| Event | Description | Payload |
| ----- | ----------- | ------- |
| `bl-upload` | Fires when files are successfully selected or dropped | `{ files: { file, id, name, size, type }[] }` |
| `bl-upload-error` | Fires when selection fails (type, size, or max count) | `{ errors: { file, error: "size" \| "type" \| "maxFiles", message }[] }` |
| `bl-file-remove` | Fires when a file is removed from the list | `{ file: { file, id, name, size, type } }` |

### Programmatic API

| Method / Property | Description |
| ----------------- | ----------- |
| `files` | Returns current file items (read-only). |
| `clearFiles()` | Removes all files from the list. |
| `removeFile(fileId: string)` | Removes a file by id. |
| `setFileStatus(fileId, status, errorMessage?)` | Sets file status: `'pending' \| 'uploading' \| 'success' \| 'error'`. |
| `setFileProgress(fileId, progress)` | Sets upload progress (0–100). |

### Callbacks (alternative to events)

| Property | Description |
| -------- | ----------- |
| onFilesSelected | Called when files are selected; receives array of `{ file, id, name, size, type }`. |
| onError | Called on validation errors; receives array of `{ file, error, message }`. |
| onFileRemoved | Called when a file is removed; receives `{ file, id, name, size, type }`. |
