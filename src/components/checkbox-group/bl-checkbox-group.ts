import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { FormControlMixin, requiredValidator } from "@open-wc/form-control";
import "element-internals-polyfill";
import { event, EventDispatcher } from "../../utilities/event";
import style from "./bl-checkbox-group.css";
import BlCheckbox, { blCheckboxTag } from "./checkbox/bl-checkbox";

export const blCheckboxGroupTag = "bl-checkbox-group";

export const blChangeEventName = "bl-checkbox-group-change";

/**
 * @tag bl-checkbox-group
 * @summary Baklava Button component
 *
 * @cssproperty [--bl-checkbox-direction=row] Can be used for showing checkbox options as columns instead of rows. Options are `row` or `column`
 */
@customElement(blCheckboxGroupTag)
export default class BlCheckboxGroup extends FormControlMixin(LitElement) {
  static get styles(): CSSResultGroup {
    return [style];
  }
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  static formControlValidators = [requiredValidator];

  @query("fieldset")
  validationTarget: HTMLElement;

  /**
   * Sets name of the checkbox group
   */
  @property()
  name: string;

  /**
   * Sets the checkbox group label
   */
  @property({ type: String })
  label: string;

  /**
   * Set and gets the actual value of the field
   */
  @property({ type: Array, reflect: true })
  value: string[] | null;

  /**
   * Sets option as required
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Set custom error message
   */
  @property({ type: String, attribute: "invalid-text", reflect: true })
  customInvalidText?: string;

  @state()
  private dirty = false;

  get options(): BlCheckbox[] {
    return [...this.querySelectorAll(blCheckboxTag)];
  }

  get checkedOptions(): string[] {
    return this.options.filter(opt => opt.checked).map(opt => opt.value);
  }

  get availableOptions(): BlCheckbox[] {
    return this.options.filter(option => !option.disabled);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.tabIndex = 0;
    this.addEventListener("focus", this.handleFocus);
    this.addEventListener("keydown", this.handleKeyDown);

    this.form?.addEventListener("submit", (e: SubmitEvent) => this.handleSubmit(e));
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("focus", this.handleFocus);
    this.removeEventListener("keydown", this.handleKeyDown);
    this.form?.removeEventListener("submit", (e: SubmitEvent) => this.handleSubmit(e));
  }

  protected firstUpdated() {
    if (this.required && !this.value) {
      this.setValue(null);
      this.onInvalid(this.internals.validity);
    }
  }

  protected async updated(changedProperties: Map<string, unknown>): Promise<void> {
    if (changedProperties.has("value")) {
      this.setFormValue();
      this.checkOptionsValidity();

      if (this.value !== null) this.onChange(this.value);

      await this.validationComplete;

      if (!this.checkValidity()) {
        this.onInvalid(this.internals.validity);
      }

      this.requestUpdate();
    }
  }

  private setFormValue() {
    if (this.value !== null && this.value.length > 0) {
      const formData = new FormData();

      this.value?.forEach(checkbox => formData.append(this.name, `${checkbox}`));
      this.setValue(formData);
    } else if (this.value?.length === 0) {
      this.setValue(null);
    }
  }

  /**
   * Fires when checkbox group value changed
   */
  @event("bl-checkbox-group-change") private onChange: EventDispatcher<string[]>;

  /**
   * Fires when checkbox group is invalid
   */
  @event("bl-checkbox-group-invalid") private onInvalid: EventDispatcher<ValidityState>;

  private focusedOptionIndex = 0;

  private handleOptionChecked() {
    this.dirty = true;
    this.value = this.checkedOptions;
  }

  private handleKeyDown(event: KeyboardEvent) {
    // Next option
    if (["ArrowDown", "ArrowRight"].includes(event.key)) {
      this.focusedOptionIndex++;

      // Previous option
    } else if (["ArrowUp", "ArrowLeft"].includes(event.key)) {
      this.focusedOptionIndex--;

      // next or previous option with tab / hold shift & tab
    } else if (event.key === "Tab") {
      event.shiftKey ? this.focusedOptionIndex-- : this.focusedOptionIndex++;

      if (this.focusedOptionIndex === this.availableOptions.length) {
        this.tabIndex = 0;
        this.focusedOptionIndex = 0;
        return;
      }
    } else {
      // Other keys are not our interest here
      return;
    }

    // Don't exceed array indexes
    this.focusedOptionIndex = Math.max(
      0,
      Math.min(this.focusedOptionIndex, this.availableOptions.length - 1)
    );

    this.availableOptions[this.focusedOptionIndex].focus();

    event.preventDefault();
  }

  private handleFocus() {
    this.availableOptions[this.focusedOptionIndex].focus();
  }

  private handleSubmit(e: SubmitEvent) {
    if (!this.reportValidity()) {
      this.onInvalid(this.internals.validity);
      e.preventDefault();
    }
    this.checkOptionsValidity();
  }

  checkOptionsValidity() {
    if (this.checkValidity()) {
      this.options?.forEach(option =>
        option?.shadowRoot?.querySelector("div")?.classList.remove(...["dirty", "invalid"])
      );
    } else if (!this.checkValidity()) {
      this.options?.forEach(option =>
        option?.shadowRoot?.querySelector("div")?.classList.add(...["dirty", "invalid"])
      );
    }
  }

  validityCallback() {
    if (this.customInvalidText) {
      return this.customInvalidText;
    }
    return this.validationMessage;
  }

  reportValidity() {
    this.dirty = true;
    return this.checkValidity();
  }

  render(): TemplateResult {
    const invalidMessage = !this.checkValidity()
      ? html`<p id="errorMessage" aria-live="polite" class="invalid-text">
          ${this.validationMessage}
        </p>`
      : "";

    const classes = {
      "dirty": this.dirty,
      "invalid": !this.validity.valid,
    };

    return html`<div class=${classMap(classes)}>
      <fieldset
        role="group"
        aria-labelledby="label"
        aria-required=${this.required}
        tabindex=${this.tabIndex}
      >
        <legend id="label">${this.label}</legend>
        <div class="options" @bl-checkbox-change=${this.handleOptionChecked}>
          <slot></slot>
        </div>
        <div class="hint">${invalidMessage}</div>
      </fieldset>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [blCheckboxGroupTag]: BlCheckboxGroup;
  }
  interface HTMLElementEventMap {
    [blChangeEventName]: CustomEvent<string[]>;
  }
}
