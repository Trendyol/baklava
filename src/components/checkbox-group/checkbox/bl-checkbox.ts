import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { FormControlMixin, requiredValidator } from "@open-wc/form-control";
import "element-internals-polyfill";
import { event, EventDispatcher } from "../../../utilities/event";
import "../../icon/bl-icon";
import type BlCheckboxGroup from "../bl-checkbox-group";
import { blCheckboxGroupTag, blChangeEventName } from "../bl-checkbox-group";
import style from "./bl-checkbox.css";

export const blCheckboxTag = "bl-checkbox";

/**
 * @tag bl-checkbox
 * @summary Baklava Checkbox component
 */
@customElement(blCheckboxTag)
export default class BlCheckbox extends FormControlMixin(LitElement) {
  static get styles(): CSSResultGroup {
    return [style];
  }
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: false };

  static formControlValidators = [requiredValidator];

  @query("input")
  validationTarget: HTMLInputElement;

  /**
   * Sets the checked state for checkbox
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * Sets the checkbox value
   */
  @property()
  value: string;

  /**
   * Sets checkbox as required
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Set custom error message
   */
  @property({ type: String, attribute: "invalid-text", reflect: true })
  customInvalidText?: string;

  /**
   * Sets the disabled state for checkbox
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Sets the indeterminate state for checkbox
   */
  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  /**
   * Fires whenever user change the value of the checkbox.
   */
  @event("bl-checkbox-change") private onChange: EventDispatcher<boolean>;

  /**
   * Fires when checkbox is focused
   */
  @event("bl-focus") private onFocus: EventDispatcher<string>;

  /**
   * Fires when checkbox is blurred
   */
  @event("bl-blur") private onBlur: EventDispatcher<string>;

  /**
   * Fires when checkbox is invalid
   */
  @event("bl-checkbox-invalid") private onInvalid: EventDispatcher<ValidityState>;

  @query("[type=checkbox]") checkboxElement: HTMLElement;

  @state()
  private dirty = false;

  protected field: BlCheckboxGroup | null;

  connectedCallback(): void {
    super.connectedCallback();

    this.field = this.closest<BlCheckboxGroup>(blCheckboxGroupTag);
    this.field?.addEventListener(blChangeEventName, this.handleFieldValueChange);

    this.form?.addEventListener("submit", e => this.handleSubmit(e));
  }

  reportValidity() {
    this.dirty = true;
    return this.checkValidity();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.field?.removeEventListener(blChangeEventName, this.handleFieldValueChange);
    this.form?.removeEventListener("submit", e => this.handleSubmit(e));
  }

  protected firstUpdated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("checked") && this.checked) {
      this.value = "on";
      this.setValue(this.value);
    }
  }

  protected async updated(changedProperties: Map<string, unknown>): Promise<void> {
    if (changedProperties.has("checked") && this.required) {
      if (this.checked) {
        this.setValue(this.value);
      } else if (!this.checked) {
        this.setValue("");
      }

      await this.validationComplete;
      if (!this.checkValidity()) {
        this.onInvalid(this.internals.validity);
      }
      this.requestUpdate();
    }
  }

  update(changedProperties: Map<string, unknown>) {
    super.update(changedProperties);
    if (this.indeterminate && this.checked) {
      this.checked = false;
      this.requestUpdate("checked", true);
    }
  }

  validityCallback(): string | void {
    return this.customInvalidText || this.validationTarget?.validationMessage;
  }

  /**
   * Focuses this option
   */
  focus() {
    this.checkboxElement.tabIndex = 0;
    this.checkboxElement.focus();
    this.onFocus(this.value);
  }

  /**
   * Blurs from this option
   */
  blur() {
    this.onBlur(this.value);
    if (!this.field) return;
    this.checkboxElement.tabIndex = -1;
  }

  private handleSubmit(e: SubmitEvent) {
    if (!this.reportValidity()) {
      this.onInvalid(this.internals.validity);
      e.preventDefault();
    }
  }

  private async handleChange(event: CustomEvent) {
    const target = event.target as HTMLInputElement;

    this.dirty = true;
    this.checked = target.checked;
    this.onChange(target.checked);
    this.indeterminate = false;
  }

  private handleFieldValueChange = (event: CustomEvent<Array<string>>) => {
    this.checked = event.detail.includes(this.value);
  };

  render(): TemplateResult {
    let icon = "";

    if (this.checked) icon = "check";
    if (this.indeterminate) icon = "minus";

    const invalidMessage = !this.checkValidity()
      ? html`<p class="invalid-text">${this.validationMessage}</p>`
      : "";

    const requiredSuffix = this.required ? html`<span class="required-suffix">*</span>` : "";

    const classes = {
      "checkbox-container": true,
      "dirty": this.dirty,
      "invalid": !this.checkValidity(),
    };

    return html`<div class=${classMap(classes)}>
      <label>
        <input
          type="checkbox"
          .checked=${live(this.checked)}
          ?disabled=${this.disabled}
          aria-required=${this.required}
          aria-readonly=${this.disabled}
          .indeterminate=${this.indeterminate}
          @change=${this.handleChange}
          value=${ifDefined(this.value)}
          @blur=${this.blur}
        />
        <div class="check-mark">${icon ? html`<bl-icon name="${icon}"></bl-icon>` : null}</div>
        <slot class="label"></slot>${requiredSuffix}
      </label>
      <div class="hint">${invalidMessage}</div>
    </div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [blCheckboxTag]: BlCheckbox;
  }
}
