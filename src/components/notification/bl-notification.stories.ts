import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { Meta, StoryObj } from "@storybook/web-components";
import type BlNotification from "./bl-notification";
import type { NotificationProps, Notification } from "./bl-notification";

const meta: Meta = {
  title: "Components/Notification",
  component: "bl-notification",
  argTypes: {
    noAnimation: {
      control: "boolean",
    },
    duration: {
      control: "number",
    },
  },
};

export default meta;

const addNotification = (selector: string, options: NotificationProps) => {
  const el = document.querySelector(selector) as BlNotification;

  return el?.addNotification(options);
};

export type NotificationArgs = {
  noAnimation: boolean;
  duration: number;
};

export type Story = StoryObj<NotificationArgs>;

export const AddExample: Story = {
  render(args: NotificationArgs) {
    return html`
      <bl-notification
        id="basic"
        ?no-animation=${args.noAnimation}
        duration=${ifDefined(args.duration)}
      ></bl-notification>
      <bl-button id="basic-add-notification">Add Notification</bl-button>

      <script>
        (function () {
          const notificationElement = document.querySelector("bl-notification#basic");
          const addButton = document.querySelector("bl-button#basic-add-notification");

          addButton.addEventListener("bl-click", () => {
            notification = notificationElement.addNotification({
              description: "Notification Description",
            });
          });
        })();
      </script>
    `;
  },
  play: () => {
    addNotification("#basic", {
      description: "Notification Description",
    });
  },
};

export const RemoveExample: Story = {
  render(args: NotificationArgs) {
    return html`
      <bl-notification
        id="basic"
        ?no-animation=${args.noAnimation}
        duration=${ifDefined(args.duration)}
      ></bl-notification>
      <bl-button id="basic-remove-notification">Remove Notification</bl-button>

      <script>
        (function () {
          const notificationElement = document.querySelector("bl-notification#basic");
          const removeButton = document.querySelector("bl-button#basic-remove-notification");

          const notification = notificationElement.addNotification({
            description: "Notification Description",
            permanent: true,
          });

          removeButton.addEventListener("bl-click", () => {
            notification.remove(); // notificationElement.removeNotification(notification.id);
          });
        })();
      </script>
    `;
  },
};

export const RemoveAwaitExample: Story = {
  render(args: NotificationArgs) {
    return html`
      <bl-notification
        id="basic"
        ?no-animation=${args.noAnimation}
        duration=${ifDefined(args.duration)}
      ></bl-notification>
      <bl-button id="basic-remove-notification">Remove Notifications</bl-button>

      <script>
        (function () {
          const notificationElement = document.querySelector("bl-notification#basic");
          const removeButton = document.querySelector("bl-button#basic-remove-notification");

          const firstNotification = notificationElement.addNotification({
            caption: "Notification Caption",
            description: "Notification Description",
            permanent: true,
          });

          const secondNotification = notificationElement.addNotification({
            caption: "Notification Caption Second",
            description: "Notification Description Second",
            permanent: true,
          });

          const thirdNotification = notificationElement.addNotification({
            caption: "Notification Caption Third",
            description: "Notification Description Third",
            permanent: true,
          });

          removeButton.addEventListener("bl-click", async () => {
            await secondNotification.remove();
            await thirdNotification.remove();
            await firstNotification.remove();
          });
        })();
      </script>
    `;
  },
};

export const ActionsExample: Story = {
  render(args: NotificationArgs) {
    return html`
      <bl-notification
        id="basic"
        ?no-animation=${args.noAnimation}
        duration=${ifDefined(args.duration)}
      ></bl-notification>
      <bl-button id="basic-add-notification">Add Notification</bl-button>

      <script>
        (function () {
          const notificationElement = document.querySelector("bl-notification#basic");
          const addButton = document.querySelector("bl-button#basic-add-notification");

          addButton.addEventListener("bl-click", () => {
            notification = notificationElement.addNotification({
              caption: "Notification Caption",
              description: "Notification Description",
              primaryAction: {
                label: "Primary Action",
                onClick: notification => {
                  window.alert("Primary Action Clicked");
                },
              },
              secondaryAction: {
                label: "Secondary Action",
                onClick: notification => {
                  window.alert("Secondary Action Clicked");
                },
              },
            });
          });
        })();
      </script>
    `;
  },
  play: () => {
    addNotification("#basic", {
      caption: "Notification Caption",
      description: "Notification Description",
      permanent: true,
      primaryAction: {
        label: "Primary Action",
        onClick: () => {
          window.alert("Primary Action Clicked");
        },
      },
      secondaryAction: {
        label: "Secondary Action",
        onClick: () => {
          window.alert("Secondary Action Clicked");
        },
      },
    });
  },
};

export const ActionsRemoveExample: Story = {
  render(args: NotificationArgs) {
    return html`
      <bl-notification
        id="basic"
        ?no-animation=${args.noAnimation}
        duration=${ifDefined(args.duration)}
      ></bl-notification>
      <bl-button id="basic-add-notification">Add Notification</bl-button>

      <script>
        (function () {
          const notificationElement = document.querySelector("bl-notification#basic");
          const addButton = document.querySelector("bl-button#basic-add-notification");

          addButton.addEventListener("bl-click", () => {
            notification = notificationElement.addNotification({
              caption: "Notification Caption",
              description: "Notification Description",
              primaryAction: {
                label: "Primary Action",
                onClick: notification => {
                  notification.remove();
                },
              },
              secondaryAction: {
                label: "Secondary Action",
                onClick: notification => {
                  notification.remove();
                },
              },
            });
          });
        })();
      </script>
    `;
  },
  play: () => {
    addNotification("#basic", {
      caption: "Notification Caption",
      description: "Notification Description",
      permanent: true,
      primaryAction: {
        label: "Primary Action",
        onClick: (notification: Notification) => {
          notification.remove();
        },
      },
      secondaryAction: {
        label: "Secondary Action",
        onClick: (notification: Notification) => {
          notification.remove();
        },
      },
    });
  },
};

export const PermanentExample: Story = {
  render(args: NotificationArgs) {
    return html`
      <bl-notification
        id="basic"
        ?no-animation=${args.noAnimation}
        duration=${ifDefined(args.duration)}
      ></bl-notification>
      <bl-button id="basic-add-notification">Add Notification</bl-button>

      <script>
        (function () {
          const notificationElement = document.querySelector("bl-notification#basic");
          const addButton = document.querySelector("bl-button#basic-add-notification");

          addButton.addEventListener("bl-click", () => {
            notification = notificationElement.addNotification({
              caption: "Notification Caption",
              description: "Notification Description",
              permanent: true,
            });
          });
        })();
      </script>
    `;
  },
  play: () => {
    addNotification("#basic", {
      caption: "Notification Caption",
      description: "Notification Description",
      permanent: true,
    });
  },
};

export const VariantsExample: Story = {
  render(args: NotificationArgs) {
    return html`
      <bl-notification
        id="basic"
        ?no-animation=${args.noAnimation}
        duration=${ifDefined(args.duration)}
      ></bl-notification>
      <bl-button id="basic-add-notification">Add Notifications</bl-button>

      <script>
        (function () {
          const notificationElement = document.querySelector("bl-notification#basic");
          const addButton = document.querySelector("bl-button#basic-add-notification");

          addButton.addEventListener("bl-click", () => {
            const variants = ["info", "success", "warning", "error"];
            for (const variant of variants) {
              notificationElement.addNotification({
                caption: variant,
                description: variant,
                permanent: true,
                variant,
              });
            }
          });
        })();
      </script>
    `;
  },
  play: () => {
    const variants = ["info", "success", "warning", "error"] as const;

    for (const variant of variants) {
      addNotification("#basic", {
        caption: variant,
        description: variant,
        permanent: true,
        variant,
      });
    }
  },
};
