import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { event, EventDispatcher } from "../../../utilities/event";
import { stringBooleanConverter } from "../../../utilities/string-boolean.converter";
import BlAlert, { AlertVariant } from "../../alert/bl-alert";
import { BaklavaIcon } from "../../icon/icon-list";
import style from "./bl-notification-card.css";

export enum CloseSource {
  DurationEnded = "duration-ended",
  CloseButton = "close-button",
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
   * Indicates whether the notification is closed.
   */
  @property({ type: Boolean })
  closed = false;

  /**
   * Dispatches close request event.
   * The notification will not be closed automatically if the event is prevented.
   */
  @event("bl-notification-card-request-close") private onRequestClose: EventDispatcher<{
    source: "duration-ended" | "close-button";
  }>;

  /**
   * Dispatches close event.
   * The notification will hidden after the event is dispatched and the closed property is set to true.
   */
  @event("bl-notification-card-close") private onClose: EventDispatcher<{
    source: "duration-ended" | "close-button";
  }>;

  protected firstUpdated() {
    this.setupDuration();
  }

  /**
   * Sets up duration animation.
   * The notification will dispatch a closed event after the animation ends.
   */
  private async setupDuration() {
    if (this.permanent) {
      return;
    }

    setTimeout(() => {
      this.shadowRoot?.querySelector(".remaining")?.addEventListener(
        "animationend",
        () => {
          this.close(CloseSource.DurationEnded);
        },
        { once: true }
      );
    }, 0);
  }

  private close(source: CloseSource) {
    const requestCloseEvent = this.onRequestClose({ source }, { cancelable: true });

    if (requestCloseEvent.defaultPrevented) {
      return;
    }

    this.onClose({ source });
    this.closed = true;
  }

  private handleClose(e: CustomEvent<boolean>) {
    const target = e.target as BlAlert;

    target.closed = false;

    this.close(CloseSource.CloseButton);
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
        ?closed=${this.closed}
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
