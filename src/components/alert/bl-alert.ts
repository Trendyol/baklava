import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { event, EventDispatcher } from "../../utilities/event";
import { stringBooleanConverter } from "../../utilities/string-boolean.converter";
import { ButtonVariant, ButtonKind, ButtonSize } from "../button/bl-button";
import "../icon/bl-icon";
import { BaklavaIcon } from "../icon/icon-list";
import style from "./bl-alert.css";

export type AlertVariant = "info" | "warning" | "success" | "danger";

/**
 * @tag bl-alert
 * @summary Baklava Alert component
 */

@customElement("bl-alert")
export default class BlAlert extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets alert variant
   */
  @property({ reflect: true })
  variant: AlertVariant = "info";

  /**
   * Sets alert description
   */
  @property()
  description?: string;

  /**
   * Allows to customize alert icon
   */
  @property({ converter: stringBooleanConverter() })
  icon?: boolean | BaklavaIcon;

  /**
   * Displays a close button.
   */
  @property({ type: Boolean, reflect: true })
  closable = false;

  /**
   * Sets alert caption.
   */
  @property()
  caption?: string;

  /**
   * Sets alert components display state.
   */
  @property({ type: Boolean, reflect: true })
  closed = false;

  /**
   * Opens alert component.
   */
  public open() {
    this.closed = false;
  }

  /**
   * Closes alert component.
   */
  public close() {
    this.closed = true;
  }

  /**
   * Fires when close button clicked.
   */
  @event("bl-close") private onClose: EventDispatcher<boolean>;

  private get _hasAlertCaptionSlot() {
    return this.querySelector(':scope > [slot="caption"]') !== null;
  }

  private _closeHandler() {
    this.closed = true;
    this.onClose(true);
  }

  private _predefinedIcons() {
    switch (this.variant) {
      case "success":
        return "check_fill";
      case "danger":
        return "close_fill";
      default:
        return this.variant;
    }
  }

  private _getIcon(): BaklavaIcon | undefined {
    if (!this.icon) return;
    if (this.icon === true) return this._predefinedIcons();
    return this.icon;
  }

  private _initAlertActionSlot(event: Event) {
    const slotElement = event.target as HTMLSlotElement;
    let slotElements = slotElement.assignedElements();

    // Allow fallthrough slots. ref: bl-notification-card.ts
    if (slotElements.some(element => element.tagName === "SLOT")) {
      slotElements = slotElements.flatMap(element =>
        (element as HTMLSlotElement).assignedElements()
      );
    }

    slotElements.forEach(element => {
      if (element.tagName !== "BL-BUTTON") {
        element.parentNode?.removeChild(element);
        return;
      }

      (slotElement.parentElement as HTMLElement).style.display = "flex";

      const variant = element.slot === "action-secondary" ? "secondary" : "primary";
      const buttonTypes: Record<AlertVariant, string> = {
        info: "default",
        warning: "neutral",
        success: "success",
        danger: "danger",
      };

      element.setAttribute("variant", variant as ButtonVariant);
      element.setAttribute("kind", buttonTypes[this.variant] as ButtonKind);
      element.setAttribute("size", "medium" as ButtonSize);
      element.removeAttribute("icon");
    });
  }

  render(): TemplateResult {
    const caption =
      this.caption || this._hasAlertCaptionSlot
        ? html`<span class="caption">
            <slot name="caption"> ${this.caption} </slot>
          </span>`
        : null;
    const icon = this._getIcon()
      ? html`<bl-icon class="icon" name=${ifDefined(this._getIcon())}></bl-icon>`
      : null;

    const closable = this.closable
      ? html`<bl-button
          class="close"
          label="close"
          kind="neutral"
          icon="close"
          variant="tertiary"
          @click=${this._closeHandler}
        ></bl-button>`
      : null;
    const description = html`<span class="description">
      <slot> ${this.description} </slot>
    </span>`;

    return html`
      <div class="alert">
        ${icon}
        <div class="wrapper">
          <div class="content">
            <div class="text-content">${caption} ${description}</div>
          </div>
          <div class="actions">
            <slot class="action" name="action" @slotchange=${this._initAlertActionSlot}></slot>
            <slot
              class="action-secondary"
              name="action-secondary"
              @slotchange=${this._initAlertActionSlot}
            ></slot>
          </div>
        </div>
        ${closable}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bl-alert": BlAlert;
  }
}
