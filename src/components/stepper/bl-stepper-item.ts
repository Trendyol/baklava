import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { event, EventDispatcher } from "../../utilities/event";
import "../icon/bl-icon";
import { BaklavaIcon } from "../icon/icon-list";
import style from "./bl-stepper-item.css";

export type StepperItemVariant = "default" | "active" | "success" | "error";
type InternalStepperItemVariant = StepperItemVariant | "hover";
export type StepperType = "dot" | "number" | "icon";
export type StepperDirection = "horizontal" | "vertical";

/**
 * @tag bl-stepper-item
 * @summary Baklava Stepper Item component for individual steps in a stepper
 *
 * @slot default - Step content (title and description)
 */

@customElement("bl-stepper-item")
export default class BlStepperItem extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  static get shadowRootOptions() {
    return { ...LitElement.shadowRootOptions, delegatesFocus: true };
  }

  /**
   * Defines stepper item's id
   */
  @property({ type: String, reflect: true })
  id: string = "";

  /**
   * Defines stepper item's status
   */
  @property({ type: String, reflect: true })
  variant: StepperItemVariant = "default";

  /**
   * Internal variant state that includes hover
   */
  private _internalVariant: InternalStepperItemVariant = "default";

  /**
   * Defines stepper item's interaction
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * If stepper type is icon, it should be rendered on stepper items
   */
  @property({ type: String })
  icon: BaklavaIcon = "check";

  /**
   * Defines stepper item's main title
   */
  @property({ type: String, reflect: true })
  title = "";

  /**
   * Defines stepper item's description
   */
  @property({ type: String, reflect: true })
  description = "";

  /**
   * Show leading connector (line before the step)
   */
  @property({ type: Boolean, reflect: true })
  showLeadingConnector = false;

  /**
   * Show trailing connector (line after the step)
   */
  @property({ type: Boolean, reflect: true })
  showTrailingConnector = true;

  /**
   * Internal property to track stepper type from parent
   */
  @property({ type: String, attribute: false })
  stepperType: StepperType = "dot";

  /**
   * Internal property to track stepper direction from parent
   */
  @property({ type: String, attribute: false })
  direction: StepperDirection = "horizontal";

  /**
   * Internal property to track stepper usage from parent
   */
  @property({ type: String, attribute: false })
  stepUsage: "clickable" | "non-clickable" = "clickable";

  /**
   * Fires when stepper item is clicked
   */
  @event("bl-stepper-item-click") private onItemClick: EventDispatcher<string>;

  willUpdate(changedProperties: Map<string | number | symbol, unknown>) {
    super.willUpdate(changedProperties);

    // Sync internal variant with public variant
    if (changedProperties.has("variant")) {
      this._internalVariant = this.variant;
    }
  }

  private get isClickable(): boolean {
    return !this.disabled && this.variant !== "error" && this.stepUsage === "clickable";
  }

  get stepNumber(): number {
    const parent = this.parentElement;

    if (!parent) return 1;

    const items = Array.from(parent.children).filter(
      child => child.tagName.toLowerCase() === "bl-stepper-item"
    );

    return items.indexOf(this) + 1;
  }

  get shouldShowIcon(): boolean {
    if (this.stepperType === "icon") {
      return true;
    }
    if (this.stepperType === "number") {
      return this.variant === "success" || this.variant === "error";
    }
    return false;
  }

  get iconName(): BaklavaIcon {
    if (this.stepperType === "icon") {
      return this.icon;
    }
    if (this.variant === "success") {
      return "check";
    }
    if (this.variant === "error") {
      return "close";
    }
    return "check";
  }

  private handleClick(event: Event) {
    if (!this.isClickable) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    this.onItemClick(this.id);
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (!this.isClickable) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.onItemClick(this.id);
    }
  }

  private handleMouseEnter() {
    if (this.isClickable && this.variant === "default") {
      this._internalVariant = "hover";
      this.requestUpdate();
    }
  }

  private handleMouseLeave() {
    if (this._internalVariant === "hover") {
      this._internalVariant = "default";
      this.requestUpdate();
    }
  }

  render(): TemplateResult {
    const classes = {
      "stepper-item": true,
      [`variant-${this._internalVariant}`]: true,
      [`type-${this.stepperType}`]: true,
      [`direction-${this.direction}`]: true,
      disabled: this.disabled,
      clickable: this.isClickable,
    };

    const content = html`
      <div class="stepper-content">
        ${this.title ? html`<div class="stepper-title">${this.title}</div>` : ""}
        ${this.description ? html`<div class="stepper-description">${this.description}</div>` : ""}
      </div>
    `;

    const connectorState =
      this.variant === "success" || this.variant === "active" ? "completed" : "default";

    const stepIndicator = html`
      <div class="connector-wrap">
        ${this.direction === "horizontal"
          ? html`
              ${this.showLeadingConnector
                ? html`<div class="connector connector-leading ${connectorState}"></div>`
                : html`<div class="connector-placeholder"></div>`}
              <div class="stepper-indicator">
                ${this.shouldShowIcon
                  ? html`<bl-icon name="${this.iconName}" class="step-icon"></bl-icon>`
                  : this.stepperType === "number"
                  ? html`<span class="step-number">${this.stepNumber}</span>`
                  : ""}
              </div>
              ${this.showTrailingConnector
                ? html`<div class="connector connector-trailing ${connectorState}"></div>`
                : html`<div class="connector-placeholder"></div>`}
            `
          : html`
              ${this.showLeadingConnector
                ? html`<div class="connector connector-leading ${connectorState}"></div>`
                : ""}
              <div class="stepper-indicator">
                ${this.shouldShowIcon
                  ? html`<bl-icon name="${this.iconName}" class="step-icon"></bl-icon>`
                  : this.stepperType === "number"
                  ? html`<span class="step-number">${this.stepNumber}</span>`
                  : ""}
              </div>
              ${this.showTrailingConnector
                ? html`<div class="connector connector-trailing ${connectorState}"></div>`
                : ""}
            `}
      </div>
    `;

    return html`
      <div
        class="${classMap(classes)}"
        role="button"
        tabindex="${this.isClickable ? "0" : "-1"}"
        aria-label="${ifDefined(this.title || `Step ${this.stepNumber}`)}"
        aria-disabled="${this.disabled}"
        @click="${this.handleClick}"
        @keydown="${this.handleKeyDown}"
        @mouseenter="${this.handleMouseEnter}"
        @mouseleave="${this.handleMouseLeave}"
      >
        ${this.direction === "horizontal"
          ? html` ${stepIndicator} ${content} `
          : html` <div class="vertical-layout">${stepIndicator} ${content}</div> `}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bl-stepper-item": BlStepperItem;
  }
}
