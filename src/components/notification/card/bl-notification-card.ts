import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { event, EventDispatcher } from "../../../utilities/event";
import { stringBooleanConverter } from "../../../utilities/string-boolean.converter";
import BlAlert, { AlertVariant } from "../../alert/bl-alert";
import { BaklavaIcon } from "../../icon/icon-list";
import style from "./bl-notification-card.css";

export enum CloseType {
  Auto = "auto",
  Manual = "manual",
}

/**
 * @tag bl-notification-card
 * @summary Baklava Notification Card component
 */

@customElement("bl-notification-card")
export default class BlNotificationCard extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets notification caption.
   * @attr caption
   * @type {string}
   * @default ""
   */
  @property({ type: String })
  caption = "";

  /**
   * Allows to customize notification icon.
   * True value will display default icon.
   * False value will hide icon.
   * String value will display icon with specified name.
   * @attr icon
   * @type {boolean | BaklavaIcon}
   * @default true
   */
  @property({ converter: stringBooleanConverter() })
  icon?: boolean | BaklavaIcon;

  /**
   * Sets notification variant.
   * @attr variant
   * @type {AlertVariant}
   * @default "info"
   */
  @property({ reflect: true })
  variant: AlertVariant = "info";

  /**
   * Sets notification display duration in minutes.
   * Has no effect if permanent is set to true.
   * @attr closed
   * @type {boolean}
   * @default false
   */
  @property({ type: Number })
  duration = 7;

  /**
   * Prevents notification from being closed automatically.
   * @attr closed
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean })
  permanent = false;

  /**
   * Dispatches close event.
   * The notification will not be closed automatically.
   * Developer is responsible for not rendering the notification.
   */
  @event("bl-notification-card-close") private onClose: EventDispatcher<"auto" | "manual">;
  // todo closetype breaks build
  protected firstUpdated() {
    this.setupDuration();
  }

  /**
   * Sets up duration animation.
   * The notification will dispatch a closed event after the animation ends.
   * The notification will not be closed automatically.
   * Developer is responsible for not rendering the notification.
   */
  private async setupDuration() {
    if (this.permanent) {
      return;
    }

    requestIdleCallback(() => {
      this.shadowRoot?.querySelector(".remaining")?.addEventListener(
        "animationend",
        () => {
          this.close(CloseType.Auto);
        },
        { once: true }
      );
    });
  }

  /**
   * Closes the notification.
   * @param {CloseType} closeType Type of the close event indicating whether it was closed automatically or manually.
   */
  private close(closeType: CloseType) {
    this.onClose(closeType);
  }

  /**
   * Handles close event on BlAlert.
   * Prevents alert from closing and dispatches close event.
   * @param {CustomEvent<boolean>} e Close event
   */
  private handleClose(e: CustomEvent<boolean>) {
    const target = e.target as BlAlert;

    // todo ?
    target.closed = false;

    this.close(CloseType.Manual);
  }

  private renderProgress() {
    if (this.permanent) {
      return null;
    }

    return html`
      <div class="duration">
        <div class="remaining" style="--duration: ${this.duration}s;"></div>
      </div>
    `;
  }

  render(): TemplateResult {
    const { caption, icon = true, variant = "info" } = this;

    return html`
      <bl-alert
        class="notification"
        caption="${ifDefined(caption)}"
        icon=${icon}
        variant=${variant}
        ?closable=${true}
        @bl-close=${this.handleClose}
      >
        <slot></slot>
        ${this.renderProgress()}
        <slot slot="action" name="action"></slot>
        <slot slot="action-secondary" name="action-secondary"></slot>
      </bl-alert>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bl-notification-card": BlNotificationCard;
  }
}
