import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import style from './bl-input.css';

/**
 * @tag bl-input
 * @summary Baklava Input component
 *
 * @property {string} value - Value of the input
 *
 * @event {CustomEvent} bl-change - Fires when input changed
 *
 */
@customElement('bl-input')
export default class BlInput extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  @query('input') input: HTMLInputElement;

  @property({})
  type: 'text' | 'number' = 'text';

  @property({})
  label: string;

  @property({})
  placeholder: string;

  @property({})
  value = '';

  @property({ type: Boolean })
  required: boolean;

  @property({ type: Number })
  minlength: number;

  @property({ type: Number })
  maxlength: number;

  @property({ type: Number })
  min: number;

  @property({ type: Number })
  max: number;

  private _customError = '';

  @property({ type: String })
  get invalid(): string {
    return this._customError;
  }

  set invalid(value: string) {
    this._customError = value;
    this.input?.setCustomValidity(this._customError);
  }

  @property({ type: Boolean, reflect: true })
  disabled: boolean;

  @property({ type: String, attribute: 'invalid-text' })
  customInvalidText: string;

  @property({ type: String, attribute: 'help-text' })
  helpText: string;

  validity: ValidityState;

  get _invalidText() {
    return this.customInvalidText || this.input?.validationMessage;
  }

  get _invalidState() {
    return this.invalid || (this.input && !this.input?.validity.valid);
  }

  private inputHandler() {
    this.validity = this.input?.validity;
    this.value = this.input.value;
    this.event('bl-input', this.input.value);
  }

  private changeHandler() {
    this.event('bl-change', this.input.value);
  }

  private event(name: string, detail: string) {
    this.dispatchEvent(
      new CustomEvent(name, { detail, bubbles: true, composed: true })
    );
  }

  firstUpdated() {
    if (this._customError) {
      this.input?.setCustomValidity(this._customError);
      this.requestUpdate();
    }

    this.validity = this.input?.validity;
  }

  render(): TemplateResult {
    const invalidMessage = this._invalidState
      ? html`<p class="invalid-text">${this._invalidText}</p>`
      : ``;
    const helpMessage = this.helpText
      ? html`<p class="help-text">${this.helpText}</p>`
      : ``;

    return html`<input
        type=${this.type}
        placeholder="${this.placeholder || this.label}"
        minlength="${ifDefined(this.minlength)}"
        maxlength="${ifDefined(this.maxlength)}"
        min="${ifDefined(this.min)}"
        max="${ifDefined(this.max)}"
        ?required=${this.required}
        ?disabled=${this.disabled}
        @change=${this.changeHandler}
        @input=${this.inputHandler}
      />
      ${invalidMessage || helpMessage}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-input': BlInput;
  }
}
