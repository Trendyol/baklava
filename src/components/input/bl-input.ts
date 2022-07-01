import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { event, EventDispatcher } from '../../utilities/event';
import '../icon/bl-icon';

import style from './bl-input.css';

export type InputSize = 'medium' | 'large';
/**
 * @tag bl-input
 * @summary Baklava Input component
 */
@customElement('bl-input')
export default class BlInput extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  @query('input') private input: HTMLInputElement;

  /**
   * Type of the input. It's used to set `type` attribute of native input inside. Only `text` and `number` is supported for now.
   */
  @property({})
  type: 'text' | 'number' = 'text';

  /**
   * Sets label of the input
   */
  @property({})
  label?: string;

  /**
   * Sets placeholder of the input
   */
  @property({})
  placeholder?: string;

  /**
   * Sets initial value of the input
   */
  @property({})
  value?: string;

  /**
   * Makes input a mandatory field
   */
  @property({ type: Boolean })
  required = false;

  /**
   * Sets minimum length of the input
   */
  @property({ type: Number })
  minlength?: number;

  /**
   * Sets maximum length of the input
   */
  @property({ type: Number })
  maxlength?: number;

  /**
   * Sets the smallest number can be entered to a `number` input
   */
  @property({ type: Number })
  min?: number;

  /**
   * Sets the biggest number can be entered to a `number` input
   */
  @property({ type: Number })
  max?: number;

  /**
   * Sets the custom icon name. `bl-icon` component is used to show an icon
   */
  @property({ type: String })
  icon?: string;

  /**
   * Sets input size.
   */
  @property({ type: String, reflect: true })
  size?: InputSize = 'medium';

  /**
   * Disables the input
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Makes label as fixed positioned
   */
  @property({ type: Boolean, attribute: 'label-fixed' })
  labelFixed = false;

  /**
   * Set custom error message
   */
  @property({ type: String, attribute: 'invalid-text' })
  customInvalidText?: string;

  /**
   * Adds help text
   */
  @property({ type: String, attribute: 'help-text' })
  helpText?: string;

  /**
   * Fires when an alteration to the element's value is committed by the user. Unlike the input event, the change event is not necessarily fired for each alteration to an element's value.
   */
  @event('bl-change') private onBlChange: EventDispatcher<string>;

  /**
   * Fires when the value of an input element has been changed.
   */
  @event('bl-input') private onBlInput: EventDispatcher<string>;

  /**
   * Current validity state of input
   */
  validity: ValidityState;

  /**
   * Runs input validation
   */
  reportValidity() {
    this._dirty = true;
    this.input.checkValidity();
  }

  @state() private _dirty = false;

  private get dirty(): boolean {
    return this._dirty;
  }

  private get hasValue(): boolean {
    return this.input?.value.length > 0;
  }

  private get _invalidText() {
    return this.customInvalidText || this.input?.validationMessage;
  }

  private get _invalidState() {
    return this.input && !this.input?.validity.valid;
  }

  private inputHandler() {
    this.validity = this.input?.validity;
    this.value = this.input.value;
    this.onBlInput(this.input.value);
  }

  private changeHandler() {
    this._dirty = true;
    this.onBlChange(this.input.value);
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
    const helpMessage = this.helpText ? html`<p class="help-text">${this.helpText}</p>` : ``;
    const icon = this.icon
      ? html` <bl-icon class="custom-icon" name="${this.icon}"></bl-icon>`
      : '';
    const label = this.label ? html`<label>${this.label}</label>` : '';

    return html`
      <input
        type=${this.type}
        class=${classMap({
          'dirty': this.dirty,
          'has-icon': this.icon || (this.dirty && this._invalidState),
          'has-value': this.hasValue,
        })}
        value=${ifDefined(this.value)}
        placeholder="${ifDefined(this.placeholder)}"
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
