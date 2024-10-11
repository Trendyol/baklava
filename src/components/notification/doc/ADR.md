## Figma Design Document

https://www.figma.com/file/RrcLH0mWpIUy4vwuTlDeKN/Baklava-Design-Guide?node-id=80%3A3131&t=mOa06L4RJiSCbIvJ-0

## `bl-notification` Implementation
General usage example:

```html
<bl-notification
    no-animation
    duration="7"
></bl-notification>

<script>
  const el = document.querySelector("bl-notification");

  const addedNotification = el.addNotification({
    caption: "Notification Caption",
    description: "This is a notification",
    variant: "warning",
    icon: "academy",
    primaryAction: {
      label: "Action",
      onClick: notification => {
        notification.remove();
      },
    },
    secondaryAction: {
      label: "Action",
      onClick: async notification => {
        await notification.remove();
        first.remove();
      },
    },
  });

  // some actions
  addedNotification.remove();
  // or
  el.removeNotification(addedNotification.id);
</script>
```

### Rules

* `duration` attribute sets the default duration of notifications when not provided.
* `no-animation` attribute disables animation of notifications. Animations will respect the user's preferences regardless of this property.
* Cards animate in from right on desktop and animate in from top on mobile (screens smaller than 480px).
* Last in card will be on top of the notification list on desktop, and last in card will be on bottom of the notification list on mobile.
* Cards has touch support on mobile. User can swipe to up to dismiss the notification.
* This component will act as an interface that will manage notifications. It will have two methods to add and remove notifications.

### API Reference
Notification component acts as an interface that will manage notifications. It has two methods to add and remove notifications.

#### Attributes

| Attribute                  | Description                                                             | Default Value |
| -------------------------- | ----------------------------------------------------------------------- | ------------- |
| `duration` (`number`)      | Sets the default duration of notifications in seconds when not provided | `7`           |
| `no-animation` (`boolean`) | Disables animation of notifications                                     | `false`       |

#### Methods

| Method               | Description                                                                                         | Parameters               | Return Value                                           |
| -------------------- | --------------------------------------------------------------------------------------------------- | ------------------------ | ------------------------------------------------------ |
| `addNotification`    | Adds a notification to the notification list                                                        | BlNotificationCard Props | The added notification object with remove method       |
| `removeNotification` | Async method that removes a notification from the notification list after the animation is finished | Notification ID          | A promise that resolves when the animation is finished |

## `bl-notification-card` Implementation
General usage example:

```html
<bl-notification-card
  caption="Caption"
  icon
  variant="error"
  permanent
  duration="7"
  closed
  @bl-notification-card-request-close
  @bl-notification-card-close
>
  Lorem ipsum dolor sit amet consectetur adipisicing elit.

  <bl-button slot="primary-action">Action</bl-button>
  <bl-button slot="secondary-action">Secondary Action</bl-button>
</bl-notification-card
```

### Rules

* `duration` attribute sets the duration of the notification in seconds. When the duration is over, the notification will be dismissed automatically.
* `permanent` attribute makes the notification permanent and it will not be dismissed automatically. User can still dismiss it manually.
* `closed` attribute makes the notification closed and it will not be displayed.
* `caption` attribute sets the caption of the notification.
* `icon` attribute sets the icon of the notification. Either boolean or icon name can be provided. True value will use `bl-alert` default.
* `variant` attribute sets the variant of the notification. Possible values are `info`, `success`, `warning`, `error`.
* `primary-action` slot will be displayed as a primary action button.
* `secondary-action` slot will be displayed as a secondary action button.
* `bl-notification-card-request-close` event will be fired when the notification is requested to be closed. If default prevented, the notification will not be closed.
* `bl-notification-card-close` event will be fired when the notification is closed.

### API Reference

Notification card component is a component that will be used to display notifications.

#### Attributes
| Attribute               | Description                                                                 | Default Value |
| ----------------------- | --------------------------------------------------------------------------- | ------- |
| `duration` (`number`)   | Sets the duration of the notification in seconds                            | `7`     |
| `permanent` (`boolean`) | Makes the notification permanent and it will not be dismissed automatically | `false` |
| `closed` (`boolean`)    | Makes the notification closed and it will not be displayed                  | `false` |
| `caption` (`string`)    | Sets the caption of the notification                                        | `""`    |
| `icon` (`string`)       | Sets the icon of the notification                                           | `""`    |
| `variant` (`string`)    | Sets the variant of the notification                                        | `""`    |

#### Slots

| Slot               | Description                                              |
| ------------------ | -------------------------------------------------------- |
| `default`          | Will be displayed as the description of the notification |
| `primary-action`           | Will be displayed as a primary action button             |
| `secondary-action` | Will be displayed as a secondary action button           |

#### Events

| Event                                | Description                                           | Detail                      |
| ------------------------------------ | ----------------------------------------------------- | --------------------------- |
| `bl-notification-card-request-close` | Fired when the notification is requested to be closed | `{ source: "duration-ended" / "close-button" }` |
| `bl-notification-card-close`         | Fired when the notification is closed                 | `{ source: "duration-ended" / "close-button" }` |
