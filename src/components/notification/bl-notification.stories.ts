import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { fullscreenLayout } from "../../utilities/chromatic-decorators";
import type { Notification, NotificationProps } from "./bl-notification";

const meta: Meta = {
  title: "Components/Notification",
  component: "bl-notification",
  parameters: {
    chromatic: {
      viewports: [1000],
    },
  },
  decorators: [fullscreenLayout],
  argTypes: {
    // Notification Card Props
    duration: {
      control: "number",
      description: "Duration in seconds",
      defaultValue: 7,
    },
    caption: {
      control: "text",
      description: "Caption of the notification",
    },
    description: {
      control: "text",
      description: "Description of the notification. Required.",
    },
    icon: {
      control: "text",
      defaultValue: "true",
      description:
        "Icon of the notification. If provided with a string, it will be used as an icon name. If provided with a boolean, it will use the default icon or no icon.",
    },
    variant: {
      options: ["info", "warning", "success", "error"],
      default: "info",
      control: { type: "select" },
      description: "Variant of the notification",
    },
    permanent: {
      control: "boolean",
      defaultValue: false,
      description:
        "If true, the notification will not have duration and will be removed when the user clicks on the close button.",
    },
    primaryAction: {
      control: "object",
      description: "Primary action of the notification. onClick and label properties are required.",
    },
    secondaryAction: {
      control: "object",
      description:
        "Secondary action of the notification. onClick and label properties are required.",
    },
  },
  args: {
    noAnimation: false,
    duration: 20,
    caption: "Notification Caption",
    description: "Notification Description",
    icon: "true",
    variant: "info",
    permanent: false,
    primaryAction: {
      label: "Primary Action",
      onClick() {},
    },
    secondaryAction: {
      label: "Secondary Action",
      onClick() {},
    },
  },
};

export default meta;

const addNotification = (options: NotificationProps) => {
  const el = document.querySelector("bl-notification");

  return el?.addNotification(options);
};

const stringifyArgs = (args: NotificationArgs | NotificationProps) => {
  return JSON.stringify(args, null, 6);
};

export type NotificationArgs = {
  noAnimation: boolean;
  duration: number;
} & NotificationProps;

export type Story = StoryObj<NotificationArgs>;

const BasicTemplate = (args: NotificationArgs) => html`
  <bl-notification
    ?no-animation=${args.noAnimation}
    duration=${ifDefined(args.duration)}
  ></bl-notification>
`;

const NotificationCreator = (args: NotificationProps, buttonLabel = "Add Notification") => {
  const slug = buttonLabel.toLowerCase().replace(/\s/g, "-");

  return html`
    <bl-button id=${slug}>${buttonLabel}</bl-button>

    <script>
      (function () {
        const notificationElement = document.querySelector("bl-notification");
        const addButton = document.querySelector("bl-button#${slug}");

        addButton.addEventListener("bl-click", () => {
          notificationElement.addNotification(${stringifyArgs(args)});
        });
      })();
    </script>
  `;
};

export const AddExample: Story = {
  render(args: NotificationArgs) {
    return html`${BasicTemplate(args)} ${NotificationCreator(args)} `;
  },
  args: {
    duration: 60,
    primaryAction: undefined,
    secondaryAction: undefined,
  },
  play: ({ args }) => {
    addNotification(args);
    addNotification({ ...args, variant: "success" });
    addNotification({ ...args, variant: "warning" });
    addNotification({ ...args, variant: "error" });
  },
};

export const RemoveExample: Story = {
  render(args: NotificationArgs) {
    return html`
      ${BasicTemplate(args)}
      <bl-button>Remove Notification</bl-button>

      <script>
        (function () {
          const notificationElement = document.querySelector("bl-notification");
          const removeButton = document.querySelector("bl-button");

          const notification = notificationElement.addNotification({
            caption: "Notification Caption",
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
      ${BasicTemplate(args)}
      <bl-button>Remove Notifications</bl-button>

      <script>
        (function () {
          const notificationElement = document.querySelector("bl-notification");
          const removeButton = document.querySelector("bl-button");

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

export const PrimaryActionExample: Story = {
  render(args: NotificationArgs) {
    return html`
      ${BasicTemplate(args)}
      <script>
        (function () {
          const notificationElement = document.querySelector("bl-notification");

          notificationElement.addNotification({
            caption: "Notification Caption",
            description: "Notification Description",
            permanent: true,
            primaryAction: {
              label: "Primary Action",
              onClick: () => {
                window.alert("Primary Action Clicked");
              },
            },
          });
        })();
      </script>
    `;
  },
};

export const SecondaryActionExample: Story = {
  render(args: NotificationArgs) {
    return html`
      ${BasicTemplate(args)}
      <script>
        (function () {
          const notificationElement = document.querySelector("bl-notification");

          notificationElement.addNotification({
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
        })();
      </script>
    `;
  },
};

export const ActionsRemoveExample: Story = {
  render(args: NotificationArgs) {
    return html`
      ${BasicTemplate(args)}
      <script>
        (function () {
          const notificationElement = document.querySelector("bl-notification");

          const notification = notificationElement.addNotification({
            caption: "Notification Caption",
            description: "Notification Description",
            permanent: true,
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
        })();
      </script>
    `;
  },
  play: () => {
    addNotification({
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
    return html` ${BasicTemplate(args)} ${NotificationCreator(args)} `;
  },
  args: {
    permanent: true,
  },
  play: ({ args }) => {
    addNotification(args);
  },
};

export const VariantsExample: Story = {
  render(args: NotificationArgs) {
    return html`
      ${BasicTemplate(args)}
      ${NotificationCreator(
        {
          caption: "Notification Caption",
          description: "Notification Variant: info",
          permanent: true,
          variant: "info",
          primaryAction: {
            label: "Primary Action",
            onClick() {},
          },
          secondaryAction: {
            label: "Secondary Action",
            onClick() {},
          },
        },
        "Info"
      )}
      ${NotificationCreator(
        {
          caption: "Notification Caption",
          description: "Notification Variant: success",
          permanent: true,
          variant: "success",
          primaryAction: {
            label: "Primary Action",
            onClick() {},
          },
          secondaryAction: {
            label: "Secondary Action",
            onClick() {},
          },
        },
        "Success"
      )}
      ${NotificationCreator(
        {
          caption: "Notification Caption",
          description: "Notification Variant: warning",
          permanent: true,
          variant: "warning",
          primaryAction: {
            label: "Primary Action",
            onClick() {},
          },
          secondaryAction: {
            label: "Secondary Action",
            onClick() {},
          },
        },
        "Warning"
      )}
      ${NotificationCreator(
        {
          caption: "Notification Caption",
          description: "Notification Variant: error",
          permanent: true,
          variant: "error",
          primaryAction: {
            label: "Primary Action",
            onClick() {},
          },
          secondaryAction: {
            label: "Secondary Action",
            onClick() {},
          },
        },
        "Error"
      )}
    `;
  },
  play: () => {
    const variants = ["info", "success", "warning", "error"] as const;

    for (const variant of variants) {
      addNotification({
        caption: "Notification Caption",
        description: `Notification Variant: ${variant}`,
        permanent: true,
        variant,
        primaryAction: {
          label: "Primary Action",
          onClick() {},
        },
        secondaryAction: {
          label: "Secondary Action",
          onClick() {},
        },
      });
    }
  },
};

export const RTLExample: Story = {
  render(args: NotificationArgs) {
    return html`
      <div class="rtl-container" dir="rtl" lang="ar">
        ${BasicTemplate(args)}
        ${NotificationCreator(
          {
            caption: "رسالة ترحيب",
            description: "مرحباً بك في تطبيقنا! نتمنى لك تجربة ممتعة.",
            duration: 7,
            variant: "info" as const,
            icon: true,
            primaryAction: {
              label: "ابدأ الآن",
              onClick() {},
            },
          },
          "Info"
        )}
        ${NotificationCreator(
          {
            caption: "تم إكمال المهمة",
            description: "تم إكمال مهمتك بنجاح.",
            duration: 10,
            variant: "success" as const,
            icon: true,
          },
          "Success"
        )}
        ${NotificationCreator(
          {
            caption: "تنبيه التخزين",
            description: "مساحة التخزين الخاصة بك منخفضة.",
            duration: 15,
            variant: "warning" as const,
            icon: true,
            primaryAction: {
              label: "ترقية",
              onClick() {},
            },
            secondaryAction: {
              label: "اعرف المزيد",
              onClick() {},
            },
          },
          "Warning"
        )}
        ${NotificationCreator(
          {
            caption: "خطأ في الاتصال",
            description: "تعذر الاتصال بالخادم. يرجى المحاولة مرة أخرى.",
            duration: 20,
            variant: "error" as const,
            icon: true,
            primaryAction: {
              label: "إعادة المحاولة",
              onClick() {},
            },
          },
          "Error"
        )}
      </div>

      <style>
        .rtl-container {
          width: 100%;
          min-height: 100%;
          padding: 1rem;
        }
      </style>
    `;
  },
  play: () => {
    const rtlNotifications: NotificationProps[] = [
      {
        caption: "رسالة ترحيب",
        description: "مرحباً بك في تطبيقنا! نتمنى لك تجربة ممتعة.",
        duration: 7,
        variant: "info",
        icon: true,
        primaryAction: {
          label: "ابدأ الآن",
          onClick() {},
        },
      },
      {
        caption: "تم إكمال المهمة",
        description: "تم إكمال مهمتك بنجاح.",
        duration: 10,
        variant: "success",
        icon: true,
      },
      {
        caption: "تنبيه التخزين",
        description: "مساحة التخزين الخاصة بك منخفضة.",
        duration: 15,
        variant: "warning",
        icon: true,
        primaryAction: {
          label: "ترقية",
          onClick() {},
        },
        secondaryAction: {
          label: "اعرف المزيد",
          onClick() {},
        },
      },
      {
        caption: "خطأ في الاتصال",
        description: "تعذر الاتصال بالخادم. يرجى المحاولة مرة أخرى.",
        duration: 20,
        variant: "error",
        icon: true,
        primaryAction: {
          label: "إعادة المحاولة",
          onClick() {},
        },
      },
    ];

    // Add RTL notifications
    rtlNotifications.forEach((notification, index) => {
      setTimeout(() => {
        const rtlContainer = document.querySelector<HTMLElement & { addNotification: typeof addNotification }>(".rtl-container bl-notification");

        rtlContainer?.addNotification(notification);
      }, index * 300);
    });
  },
  args: {
    noAnimation: true,
    duration: 7,
  },
};
