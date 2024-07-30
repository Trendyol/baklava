## Figma Design Document

https://www.figma.com/file/RrcLH0mWpIUy4vwuTlDeKN/Baklava-Design-Guide?node-id=4%3A5585

## Implementation

General usage example:

```html
<bl-tab-group>
  <bl-tab
      name="content" caption="content info" slot="tab" selected>Tab item 1</bl-tab>
  <bl-tab-panel tab="content">
    <p>
      Content item 1.
    </p>
  </bl-tab-panel>

  <bl-tab  name="detail" slot="tab" help-text="Some information will be showed in tooltip" notify>Tab item 2</bl-tab>
  <bl-tab-panel  tab="detail">
    <p>
      Content item 2.
    </p>
  </bl-tab-panel>

  <bl-tab slot="tab" disabled badge="Coming soon">New feature</bl-tab>

</bl-tab-group>
```

### Rules

* Tab handles (`bl-tab` components) will stay in single line even if it doesn't fit the screen. Horizontal scrolling will be possible if tabs doesn't fit the screen.
* To show `help-text` we'll use `bl-tooltip` component (its work in progress).
* Tab components should respect [accessibility attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Tab_Role) inside.
* Styling the colors of `badge` component will be possible via `bl-badge` CSS properties. Like

```html
<style>
.tab-badge-new {
   --bl-badge-color: var(--bl-color-primary-background);
   --bl-badge-bg-color: var(--bl-color-danger);
}
</style>

<bl-tab class="tab-badge-new" badge="New">Payment Options</bl-tab>
```

## API Reference:

### `bl-tab` component

Tab component handles interaction to show/hide tab panes.

#### Attributes

| Attribute | Description | Default Value |
| --------------- | --------------- | --------------- |
| name (`string`) | Name of the tab | - |
| selected (`boolean`) | Sets tab selected. By default first tab becomes selected | - |
| disabled (`boolean`) | Sets tab disabled | - |
| caption (`string`) | Caption text of tab. Will stay as single line, so it should not be a long text | - |
| icon (`string`) | Name of the icon that will be shown next to the tab title | - |
| help-text (`string`) | Text content to show in a tooltip that will be triggered with an icon button (`info` icon) inside the tab | - |
| notify (`boolean`) | Points a notification dot next to tab title | - |
| badge (`string`) | Adds a badge next to the title with the content of this text | - |

#### Slots

| Name | Description | Default Content |
| --------------- | --------------- | --------------- |
| `default` slot | Title of tab. Will stay as single line, so it should not be a long text | - |

#### Events

| Event | Description |
| --------------- | --------------- |
| `bl-tab-show` | Will be triggered once this tab panel shown |
| `bl-tab-hide` | Will be triggered once this tab panel hidden |

### `bl-tab-panel` component

Container for the tab contents.

#### Attributes

| Attribute | Description | Default Value |
| --------------- | --------------- | --------------- |
| name (`string`) | Name of the panel | - |

#### Slots

| Name | Description | Default Content |
| --------------- | --------------- | --------------- |
| `default` slot | Content of the panel | - |

#### Events

| Event | Description |
| --------------- | --------------- |
| `bl-tab-panel-show` | Will be triggered once this tab panel shown |
| `bl-tab-panel-hide` | Will be triggered once this tab panel hidden |

### `bl-tab-group` component

Container for `bl-tab` and `bl-tab-panel` components.

#### Slots

| Name | Description | Default Content |
| --------------- | --------------- | --------------- |
| `default` slot | `bl-tab-panel` components will come to this slot | - |
| `tab` slot | `bl-tab` components will come to this slot | - |

#### Events

| Event | Description |
| --------------- | --------------- |
| `bl-tab-change` | Will be triggered once a tab changed. Event data will contain the name of the new tab opened |
