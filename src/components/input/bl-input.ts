import { CSSResultGroup, html, LitElement, TemplateResult, PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { FormControlMixin } from "@open-wc/form-control";
import { submit } from "@open-wc/form-helpers";
import "element-internals-polyfill";
import { event, EventDispatcher } from "../../utilities/event";
import { innerInputValidators } from "../../utilities/form-control";
import "../button/bl-button";
import "../icon/bl-icon";
import { BaklavaIcon } from "../icon/icon-list";
import style from "./bl-input.css";

export type InputType =
  | "text"
  | "email"
  | "date"
  | "time"
  | "datetime-local"
  | "month"
  | "week"
  | "password"
  | "number"
  | "tel"
  | "url";

export type InputSize = "small" | "medium" | "large";
/**
 * @tag bl-input
 * @summary Baklava Input component
 *
 * @cssproperty [--bl-input-padding-start] Sets the padding start
 * @cssproperty [--bl-input-padding-end] Sets the padding end
 */
@customElement("bl-input")
export default class BlInput extends FormControlMixin(LitElement) {
  static get styles(): CSSResultGroup {
    return [style];
  }
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  static formControlValidators = innerInputValidators;

  @query("input")
  validationTarget: HTMLInputElement;

  /**
   * Sets name of the input
   */
  @property({ reflect: true })
  name?: string;

  /**
   * Type of the input. It's used to set `type` attribute of native input inside. Only `text`, `number` and `password` is supported for now.
   */
  @property({ reflect: true })
  type: InputType = "text";

  /**
   * Sets label of the input
   */
  @property({ reflect: true })
  label?: string;

  /**
   * Sets placeholder of the input
   */
  @property({ reflect: true })
  placeholder?: string;

  /**
   * Sets initial value of the input
   */
  @property({ reflect: true })
  value = "";

  /**
   * Makes input a mandatory field
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Sets minimum length of the input
   */
  @property({ type: Number, reflect: true })
  minlength?: number;

  /**
   * Sets maximum length of the input
   */
  @property({ type: Number, reflect: true })
  maxlength?: number;

  /**
   * Sets the minimum acceptable value for the input
   */
  @property({ reflect: true })
  min?: number | string;

  /**
   * Sets the maximum acceptable value for the input
   */
  @property({ reflect: true })
  max?: number | string;

  /**
   * Sets a regex pattern form the input validation
   */
  @property({ type: String, reflect: true })
  pattern?: string;

  /**
   * Sets the increase and decrease step to a `number` input
   */
  @property({ type: Number, reflect: true })
  step?: number;

  /**
   * Hints browser to autocomplete this field.
   */
  @property({ type: String, reflect: true })
  autocomplete: string;

  /**
   * Sets the input mode of the field for asking browser to show the desired keyboard.
   */
  @property({ type: String, reflect: true })
  inputmode: "none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url";

  /**
   * Sets input to get keyboard focus automatically
   */
  @property({ type: Boolean, reflect: true })
  autofocus = false;

  /**
   * Sets the custom icon name. `bl-icon` component is used to show an icon
   */
  @property({ type: String, reflect: true })
  icon?: BaklavaIcon;

  /**
   * Sets input size.
   */
  @property({ type: String, reflect: true })
  size?: InputSize = "medium";

  /**
   * Disables the input
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Makes the input readonly.
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Makes label as fixed positioned
   */
  @property({ type: Boolean, attribute: "label-fixed", reflect: true })
  labelFixed = false;

  /**
   * Overrides error message. This message will override default error messages
   */
  @property({ type: String, attribute: "invalid-text", reflect: true })
  set customInvalidText(value: string) {
    this._customInvalidText = value;
    this.setValue(this.value);
  }

  get customInvalidText(): string {
    return this._customInvalidText;
  }

  private _customInvalidText: string;

  /**
   * Adds help text
   */
  @property({ type: String, attribute: "help-text", reflect: true })
  helpText?: string;

  /**
   * Fires when an alteration to the element's value is committed by the user. Unlike the input event, the change event is not necessarily fired for each alteration to an element's value.
   */
  @event("bl-change") private onChange: EventDispatcher<string>;

  /**
   * Fires when the value of an input element has been changed.
   */
  @event("bl-input") private onInput: EventDispatcher<string>;

  /**
   * Fires when the value of an input element has been changed.
   */
  @event("bl-invalid") private onInvalid: EventDispatcher<ValidityState>;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("keydown", this.onKeydown);

    this.form?.addEventListener("submit", () => {
      this.reportValidity();
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("keydown", this.onKeydown);
  }

  private onKeydown = (event: KeyboardEvent): void => {
    if (event.code === "Enter" && this.form) {
      submit(this.form);
    }
  };

  @state() private dirty = false;

  @state() private passwordVisible = false;

  private textVisibilityToggle() {
    this.passwordVisible = !this.passwordVisible;
  }

  validityCallback(): string | void {
    this.onInvalid(this.internals.validity);
    return this.customInvalidText || this.validationTarget?.validationMessage;
  }

  /**
   * Force to set input as in invalid state.
   */
  async forceCustomError() {
    await this.updateComplete;
    this.validationTarget.setCustomValidity(this.customInvalidText || "An error occurred");
    this.setValue(this.value);
    this.reportValidity();
  }

  /**
   * Clear forced invalid state
   */
  async clearCustomError() {
    await this.updateComplete;
    this.validationTarget.setCustomValidity("");
    this.setValue(this.value);
    this.reportValidity();
  }

  reportValidity() {
    this.dirty = true;
    this.requestUpdate();
    return this.checkValidity();
  }

  private inputHandler(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    this.value = value;
    this.onInput(value);
  }

  private changeHandler(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    this.dirty = true;
    this.value = value;
    this.onChange(value);
  }

  firstUpdated() {
    this.setValue(this.value);
  }

  protected async updated(changedProperties: PropertyValues) {
    if (changedProperties.size > 0) {
      this.setValue(this.value);

      await this.validationComplete;

      this.requestUpdate();
    }
  }

  private inputId = Math.random().toString(36).substring(2);

  private get _hasIconSlot() {
    return this.querySelector(':scope > [slot="icon"]') !== null;
  }

  render(): TemplateResult {
    const invalidMessage = !this.checkValidity()
      ? html`<p id="errorMessage" aria-live="polite" class="invalid-text">
          ${this.validationMessage}
        </p>`
      : "";
    const helpMessage = this.helpText
      ? html`<p id="helpText" class="help-text">${this.helpText}</p>`
      : "";

    const icon = html`
      <slot name="icon">
        ${this.icon
          ? html`<bl-icon name="${this.icon}"></bl-icon>`
          : html`<bl-icon class="error-icon" name="alert"></bl-icon>`}
      </slot>
    `;

    const label = this.label ? html`<label for=${this.inputId}>${this.label}</label>` : "";
    const passwordInput = this.type === "password";

    const revealButton = passwordInput
      ? html`<bl-button
          size="small"
          kind="neutral"
          variant="tertiary"
          class="${classMap({
            "reveal-button": true,
            "password-visible": this.passwordVisible,
          })}"
          aria-label="Toggle password reveal"
          @bl-click="${this.textVisibilityToggle}"
        >
          <bl-icon class="reveal-icon" slot="icon" name="eye_on"></bl-icon>
          <bl-icon class="reveal-icon" slot="icon" name="eye_off"></bl-icon>
        </bl-button>`
      : "";

    const hasCustomIcon = this.icon || this._hasIconSlot;
    const classes = {
      "wrapper": true,
      "dirty": this.dirty,
      "invalid": !this.checkValidity(),
      "has-icon": passwordInput || hasCustomIcon || (this.dirty && !this.checkValidity()),
      "has-value": this.value !== null && this.value !== "",
    };

    const passwordType = this.passwordVisible ? "text" : "password";
    const inputType = passwordInput ? passwordType : this.type;

    return html`<div class=${classMap(classes)}>
      ${label}
      <fieldset class="input-wrapper">
        <legend><span>${this.label}</span></legend>
        <input
          id=${this.inputId}
          type=${inputType}
          .value=${live(this.value)}
          inputmode="${ifDefined(this.inputmode)}"
          ?autofocus=${this.autofocus}
          autocomplete="${ifDefined(this.autocomplete)}"
          placeholder="${ifDefined(this.placeholder)}"
          minlength="${ifDefined(this.minlength)}"
          maxlength="${ifDefined(this.maxlength)}"
          min="${ifDefined(this.min)}"
          max="${ifDefined(this.max)}"
          pattern="${ifDefined(this.pattern)}"
          step="${ifDefined(this.step)}"
          ?required=${this.required}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          @change=${this.changeHandler}
          @input=${this.inputHandler}
          aria-invalid=${this.checkValidity() ? "false" : "true"}
          aria-describedby=${ifDefined(this.helpText ? "helpText" : undefined)}
          aria-errormessage=${ifDefined(this.checkValidity() ? undefined : "errorMessage")}
        />
        <div class="icon">${revealButton} ${icon}</div>
      </fieldset>
      <div class="hint">${invalidMessage} ${helpMessage}</div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bl-input": BlInput;
  }
}
