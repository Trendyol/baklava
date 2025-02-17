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
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <!-- Interactive Controls -->
        <div style="display: flex; gap: 16px; align-items: center;">
          <bl-button id="add-notifications" variant="primary">Add Sample Notifications</bl-button>
          <bl-button id="clear-notifications" variant="danger">Clear All</bl-button>
        </div>

        <!-- Demo Container -->
        <div style="display: flex; gap: 32px;">
          <!-- LTR Example -->
          <div style="flex: 1; min-width: 400px;">
            <bl-notification
                id="ltr-notification"
                ?no-animation=${args.noAnimation}
                duration=${ifDefined(args.duration)}
              ></bl-notification>
          </div>

          <!-- RTL Example -->
          <div style="flex: 1; min-width: 400px;" dir="rtl">
            <bl-notification
                id="rtl-notification"
                ?no-animation=${args.noAnimation}
                duration=${ifDefined(args.duration)}
              ></bl-notification>
          </div>
        </div>

        <script>
          (function() {
            // Store active notifications for proper cleanup
            let activeNotifications = {
              ltr: [],
              rtl: []
            };

            const ltrNotification = document.getElementById('ltr-notification');
            const rtlNotification = document.getElementById('rtl-notification');
            const addButton = document.getElementById('add-notifications');
            const clearButton = document.getElementById('clear-notifications');

            // Sample notifications data with different variants and configurations
            const notificationExamples = [
              {
                variant: 'info',
                caption: { en: 'Welcome Message', ar: 'رسالة ترحيب' },
                description: {
                  en: 'Welcome to our application! We hope you enjoy your experience.',
                  ar: 'مرحباً بك في تطبيقنا! نتمنى لك تجربة ممتعة.'
                },
                icon: 'info',
                primaryAction: {
                  label: { en: 'Get Started', ar: 'ابدأ الآن' },
                  onClick: () => {}
                }
              },
              {
                variant: 'success',
                caption: { en: 'Task Completed', ar: 'تم إكمال المهمة' },
                description: {
                  en: 'Your task has been successfully completed.',
                  ar: 'تم إكمال مهمتك بنجاح.'
                },
                icon: 'check_fill'
              },
              {
                variant: 'warning',
                caption: { en: 'Storage Alert', ar: 'تنبيه التخزين' },
                description: {
                  en: 'You are running low on storage space.',
                  ar: 'مساحة التخزين الخاصة بك منخفضة.'
                },
                icon: 'warning',
                primaryAction: {
                  label: { en: 'Upgrade', ar: 'ترقية' },
                  onClick: () => {}
                },
                secondaryAction: {
                  label: { en: 'Learn More', ar: 'اعرف المزيد' },
                  onClick: () => {}
                }
              },
              {
                variant: 'error',
                caption: { en: 'Connection Error', ar: 'خطأ في الاتصال' },
                description: {
                  en: 'Unable to connect to the server. Please try again.',
                  ar: 'تعذر الاتصال بالخادم. يرجى المحاولة مرة أخرى.'
                },
                icon: 'close_fill',
                primaryAction: {
                  label: { en: 'Retry', ar: 'إعادة المحاولة' },
                  onClick: () => {}
                }
              }
            ];

            // Function to clear all notifications
            const clearAllNotifications = async () => {
              // Clear LTR notifications
              if (activeNotifications.ltr.length > 0) {
                for (const notification of activeNotifications.ltr) {
                  await notification.remove();
                }
                activeNotifications.ltr = [];
              }

              // Clear RTL notifications
              if (activeNotifications.rtl.length > 0) {
                for (const notification of activeNotifications.rtl) {
                  await notification.remove();
                }
                activeNotifications.rtl = [];
              }
            };

            // Function to create notifications
            const createNotifications = (isRTL) => {
              const targetElement = isRTL ? rtlNotification : ltrNotification;
              const lang = isRTL ? 'ar' : 'en';
              const notificationList = isRTL ? activeNotifications.rtl : activeNotifications.ltr;

              notificationExamples.forEach((example, index) => {
                setTimeout(() => {
                  const notification = targetElement.addNotification({
                    variant: example.variant,
                    caption: example.caption[lang],
                    description: example.description[lang],
                    icon: example.icon,
                    permanent: true,
                    ...(example.primaryAction && {
                      primaryAction: {
                        label: example.primaryAction.label[lang],
                        onClick: () => {
                          example.primaryAction.onClick();
                          notification.remove();
                          const index = notificationList.indexOf(notification);
                          if (index > -1) {
                            notificationList.splice(index, 1);
                          }
                        }
                      }
                    }),
                    ...(example.secondaryAction && {
                      secondaryAction: {
                        label: example.secondaryAction.label[lang],
                        onClick: () => {
                          example.secondaryAction.onClick();
                          notification.remove();
                          const index = notificationList.indexOf(notification);
                          if (index > -1) {
                            notificationList.splice(index, 1);
                          }
                        }
                      }
                    })
                  });

                  // Store the notification reference
                  notificationList.push(notification);
                }, index * 300); // Stagger the notifications
              });
            };

            // Add button click handler
            addButton.addEventListener('bl-click', () => {
              clearAllNotifications().then(() => {
                createNotifications(false); // LTR
                createNotifications(true);  // RTL
              });
            });

            // Clear button click handler
            clearButton.addEventListener('bl-click', clearAllNotifications);

            // Initial notifications
            createNotifications(false);
            createNotifications(true);
          })();
        </script>
      </div>
    `;
  },
  args: {
    noAnimation: true,
    duration: 0,
  },
};
