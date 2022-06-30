import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../icon/bl-icon';

import style from './bl-input.css';

export type InputSize = 'medium' | 'large';
/**
 * @tag bl-input
 * @summary Baklava Input component
 *
 * @attribute {string} label - Sets label of the input
 * @attribute {string} type - Sets type of the input
 * @attribute {string} placeholder - Sets placeholder of the input
 * @attribute {string} value - Sets value of the input
 * @attribute {boolean} required - Sets required of the input
 * @attribute {boolean} disabled - Disables the input
 * @attribute {number} minlength - Sets min length of the input
 * @attribute {number} maxlength - Sets max length of the input
 * @attribute {number} max - Sets max value of the input
 * @attribute {number} min - Sets min value of the input
 * @attribute {string} icon - Sets icon name of the input
 * @attribute {string} size - Sets size of the input
 * @attribute {boolean} label-fixed - Fixes label top of the input
 * @attribute {string} help-text - Sets help text of the input
 * @attribute {string} invalid-text - Sets invalid text of the input
 *
 * @property {ValidityState} validity - Current validity state of input
 *
 * @method {} reportValidity - Runs input validation
 *
 * @event {CustomEvent} bl-input - Fires when the value of an input element has been changed.
 * @event {CustomEvent} bl-change - Fires when an alteration to the element's value is committed by the user. Unlike the input event, the change event is not necessarily fired for each alteration to an element's value.
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
  size?: InputSize = 'medium';

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

  get hasValue(): boolean {
    return this.value.length > 0;
  }

  get _invalidText() {
    return this.customInvalidText || this.input?.validationMessage;
  }

  get _invalidState() {
    return this.input && !this.input?.validity.valid;
  }

  reportValidity() {
    this._dirty = true;
    this.input.checkValidity();
  }

  private inputHandler() {
    this.validity = this.input?.validity;
    this.value = this.input.value;
    this.event('bl-input', this.input.value);
  }

  private changeHandler() {
    this._dirty = true;
    this.event('bl-change', this.input.value);
  }

  private event(name: string, detail: string) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  firstUpdated() {
    this.validity = this.input?.validity;
    if (this._invalidState) {
      this.requestUpdate();
    }
  }

  render(): TemplateResult {
    const invalidMessage = this._invalidState
      ? html`<p class="invalid-text">${this._invalidText}</p>`
      : ``;
    const helpMessage = this.helpText ? html`<p part="help-text" class="help-text">${this.helpText}</p>` : ``;
    const icon = this.icon
      ? html` <bl-icon class="custom-icon" name="${this.icon}"></bl-icon>`
      : '';
    const label = this.label ? html`<label>${this.label}</label>` : '';

    return html`
      <input
        type=${this.type}
        class=${classMap({
          'dirty': this.dirty,
          'has-icon': this.icon || this._invalidState,
          'has-value': this.hasValue,
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
      ${label} ${icon}
      <bl-icon class="error-icon" name="alert"></bl-icon>
      ${invalidMessage} ${helpMessage}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-input': BlInput;
  }
}
