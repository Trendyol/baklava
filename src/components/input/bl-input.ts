import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../icon/bl-icon';

import style from './bl-input.css';
import { ButtonSize } from '../button/bl-button';

export type InputSize =  'medium' | 'large';
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

  @property({ type: String })
  icon?: string;

  @property({ type: String, reflect: true })
  size?: ButtonSize = 'medium';

  @property({ type: Boolean, reflect: true })
  disabled: boolean;

  @property({ type: Boolean, attribute: 'label-fixed' })
  labelFixed = false;

  @property({ type: String, attribute: 'invalid-text' })
  customInvalidText: string;

  @property({ type: String, attribute: 'help-text' })
  helpText: string;

  validity: ValidityState;

  @state() private _dirty = false;

  get dirty(): boolean {
    return this._dirty;
  }

  @state() private _hasValue = false;

  get hasValue(): boolean {
    return this._hasValue;
  }

  get _invalidText() {
    return this.customInvalidText || this.input?.validationMessage;
  }

  get _invalidState() {
    return this.input && !this.input?.validity.valid;
  }

  private inputHandler() {
    this.validity = this.input?.validity;
    this.value = this.input.value;
    this._hasValue = this.value.length > 0;
    this.event('bl-input', this.input.value);
  }

  private changeHandler() {
    this._dirty = true;
    this.event('bl-change', this.input.value);
  }

  private event(name: string, detail: string) {
    this.dispatchEvent(
      new CustomEvent(name, { detail, bubbles: true, composed: true })
    );
  }

  firstUpdated() {
    this._hasValue = this.value.length > 0;
    this.validity = this.input?.validity;
    if (this._invalidState) {
      this.requestUpdate();
    }
  }

  render(): TemplateResult {
    const invalidMessage = this._invalidState
      ? html`<p class="invalid-text">${this._invalidText}</p>`
      : ``;
    const helpMessage = this.helpText
      ? html`<p class="help-text">${this.helpText}</p>`
      : ``;
    const icon = this.icon ? html`<bl-icon class="custom-icon" name=${this.icon}></bl-icon>` : '';
    const label = this.label ? html`<label>${this.label}</label>` : '';

    return html`
      <input
        type=${this.type}
        class=${classMap({
          dirty: this.dirty,
          "has-icon": this.icon || this._invalidState,
          "has-value": this.hasValue
        })}
        value=${this.value}
        placeholder="${this.placeholder}"
        minlength="${ifDefined(this.minlength)}"
        maxlength="${ifDefined(this.maxlength)}"
        min="${ifDefined(this.min)}"
        max="${ifDefined(this.max)}"
        ?required=${this.required}
        ?disabled=${this.disabled}
        @change=${this.changeHandler}
        @input=${this.inputHandler}
      />
      ${label}
      ${icon}
      <bl-icon class="error-icon" name="alert"></bl-icon>
     ${invalidMessage}
     ${helpMessage}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-input': BlInput;
  }
}
