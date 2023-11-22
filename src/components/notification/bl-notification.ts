import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, eventOptions, property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { repeat } from "lit/directives/repeat.js";
import BlAlert from "../alert/bl-alert";
import { BaklavaIcon } from "../icon/icon-list";
import style from "./bl-notification.css";
import BlNotificationCard, { CloseSource, NotificationVariant } from "./card/bl-notification-card";

type Action = {
  label: string;
  onClick: (notification: Notification) => void;
};

export type NotificationProps = {
  caption?: string;
  description: string;
  icon?: boolean | BaklavaIcon;
  variant?: NotificationVariant;
  primaryAction?: Action;
  secondaryAction?: Action;
  duration?: number;
  permanent?: boolean;
};

export type Notification = NotificationProps & {
  id: string;
  remove: () => Promise<boolean>;
};

export const SWIPE_UP_THRESHOLD = -50;

/**
 * @tag bl-notification
 * @summary Baklava Notification component
 */

@customElement("bl-notification")
export default class BlNotification extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Disable animations.
   * It will not be possible to use animations if the user has disabled them.
   * Animations will respect the user's preferences regardless of this property.
   */
  @property({ type: Boolean, attribute: "no-animation", reflect: true })
  noAnimation = false;

  /**
   * Sets the default duration of notifications in seconds
   */
  @property({ type: Number })
  duration = 7;

  @state()
  private notifications: Notification[] = [];

  public get notificationList() {
    return this.notifications;
  }

  private touchStartY = 0;

  public get touchStart() {
    return {
      y: this.touchStartY,
    };
  }

  private get isMobile() {
    return window.matchMedia("(max-width: 480px)").matches;
  }

  /**
   * Adds a notification to the list of notifications.
   * @param {NotificationProps} props Notification properties
   * @returns {Notification} A notification object with a remove method.
   */
  public addNotification(props: NotificationProps) {
    // TODO id generation
    const id = Math.random().toString(36).substr(2, 9);
    const notification: Notification = {
      ...props,
      id,
      duration: props.duration || this.duration,
      remove: () => this.removeNotification(id),
    };

    const newNotifications = [...this.notifications, notification];

    this.notifications = newNotifications;

    return notification;
  }

  /**
   * Removes a notification from the list of notifications.
   * @param {string} id Notification id
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the notification was removed.
   */
  public async removeNotification(id: string): Promise<boolean> {
    return new Promise(resolve => {
      const notificationEl = this.shadowRoot?.getElementById(id) as BlAlert;

      if (!notificationEl) {
        resolve(false);
        return;
      }

      notificationEl.style.height = `${notificationEl.clientHeight}px`;
      notificationEl.addEventListener("animationend", ({ animationName }: AnimationEvent) => {
        if (animationName !== "size-to-zero") {
          return;
        }

        this.notifications = this.notifications.filter(notification => notification.id !== id);
        resolve(true);
      });

      notificationEl.classList.add("removing");
    });
  }

  @eventOptions({ passive: true })
  private handleTouchStart(event: TouchEvent) {
    if (!this.isMobile) {
      return;
    }

    event.stopPropagation();

    this.touchStartY = event.touches[0].clientY;
  }

  @eventOptions({ passive: true })
  private handleTouchMove(event: TouchEvent) {
    if (!this.isMobile) {
      return;
    }
    event.stopPropagation();

    const currentTarget = event.currentTarget as BlNotificationCard;

    const currentY = event.touches[0].clientY;
    const movedY = currentY - this.touchStartY;

    currentTarget.style.transform = `translateY(${movedY}px)`;
  }

  @eventOptions({ passive: true })
  private handleTouchEnd(event: TouchEvent) {
    if (!this.isMobile) {
      return;
    }
    event.stopPropagation();

    const currentTarget = event.currentTarget as BlNotificationCard;

    const currentY = event.changedTouches[0].clientY;
    const movedY = currentY - this.touchStartY;

    if (movedY < SWIPE_UP_THRESHOLD) {
      currentTarget.style.setProperty("--travel-distance", `${movedY - 10}px`);
      this.removeNotification(currentTarget.id);
    } else {
      currentTarget.style.transition = "transform 0.3s ease";
      currentTarget.style.transform = "translateY(0px)";

      currentTarget.addEventListener("transitionend", () => {
        currentTarget.style.transition = "";
        currentTarget.style.transform = "";
      });
    }

    this.touchStartY = 0;
  }

  private renderActionSlot(
    slotName: "primary-action" | "secondary-action",
    notification: Notification
  ) {
    const action =
      slotName === "primary-action" ? notification.primaryAction : notification.secondaryAction;

    if (!action || !action.label) {
      return "";
    }

    return html`<bl-button slot="${slotName}" @bl-click=${() => action.onClick(notification)}>
      ${action.label}
    </bl-button>`;
  }

  render(): TemplateResult {
    return html`
      <div class="wrapper">
        ${repeat(
          this.notifications,
          notification => notification.id,
          notification => {
            const {
              caption,
              description,
              icon = true,
              variant = "info",
              id,
              duration = this.duration,
              permanent,
            } = notification;

            const actionButton = this.renderActionSlot("primary-action", notification);
            const secondaryActionButton = this.renderActionSlot("secondary-action", notification);

            return html`
              <bl-notification-card
                id="${id}"
                class="notification"
                data-slide=${this.isMobile ? "top" : "right"}
                duration=${duration}
                caption="${ifDefined(caption)}"
                icon=${icon}
                variant=${ifDefined(variant)}
                ?permanent=${permanent}
                @bl-notification-card-request-close=${(
                  event: CustomEvent<{ source: CloseSource }>
                ) => {
                  // We will run animations on the notification card
                  // so we need to prevent the default close behavior
                  event.preventDefault();
                  this.removeNotification(id);
                }}
                @touchstart=${this.handleTouchStart}
                @touchmove=${this.handleTouchMove}
                @touchend=${this.handleTouchEnd}
              >
                ${description} ${actionButton} ${secondaryActionButton}
              </bl-notification-card>
            `;
          }
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bl-notification": BlNotification;
  }
}
