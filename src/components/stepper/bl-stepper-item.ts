import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { event, EventDispatcher } from "../../utilities/event";
import "../icon/bl-icon";
import { BaklavaIcon } from "../icon/icon-list";
import style from "./bl-stepper-item.css";

export type StepperItemVariant = "default" | "active" | "hover" | "success" | "error";
export type StepperType = "dot" | "number" | "icon";
export type StepperDirection = "horizontal" | "vertical";

/**
 * @tag bl-stepper-item
 * @summary Baklava Stepper Item component for individual steps in a stepper
 *
 * @slot default - Step content (title and description)
 *
 * @cssproperty [--bl-stepper-item-size=var(--bl-size-m)] Sets the size of the stepper item
 * @cssproperty [--bl-stepper-item-color=var(--bl-color-neutral)] Sets the color of the stepper item
 * @cssproperty [--bl-stepper-item-background=var(--bl-color-surface)] Sets the background color of the stepper item
 */

@customElement("bl-stepper-item")
export default class BlStepperItem extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
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
  @state()
  stepperType: StepperType = "dot";

  /**
   * Internal property to track stepper direction from parent
   */
  @state()
  direction: StepperDirection = "horizontal";

  /**
   * Fires when stepper item is clicked
   */
  @event("bl-stepper-item-click") private onItemClick: EventDispatcher<string>;

  private get isClickable(): boolean {
    return !this.disabled && this.variant !== "error";
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
    // Only icon type shows icons, dot and number types never show icons
    return this.stepperType === "icon";
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
      this.variant = "hover";
    }
  }

  private handleMouseLeave() {
    if (this.variant === "hover") {
      this.variant = "default";
    }
  }

  render(): TemplateResult {
    const classes = {
      "stepper-item": true,
      [`variant-${this.variant}`]: true,
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
                  : html`<div class="step-dot"></div>`}
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
                  : html`<div class="step-dot"></div>`}
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
