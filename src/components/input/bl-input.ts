import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { FormControlMixin } from '@open-wc/form-control';
import { submit } from '@open-wc/form-helpers';
import { event, EventDispatcher } from '../../utilities/event';
import 'element-internals-polyfill';
import '../icon/bl-icon';

import style from './bl-input.css';

export type InputSize = 'medium' | 'large';
/**
 * @tag bl-input
 * @summary Baklava Input component
 */
@customElement('bl-input')
export default class BlInput extends FormControlMixin(LitElement) {
  static get styles(): CSSResultGroup {
    return [style];
  }

  @query('input')
  validationTarget: HTMLInputElement;

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
  @property()
  value = '';

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
  @event('bl-change') private onChange: EventDispatcher<string>;

  /**
   * Fires when the value of an input element has been changed.
   */
  @event('bl-input') private onInput: EventDispatcher<string>;

  /**
   * Current validity state of input
   */
  validity: ValidityState;

  // /**
  //  * Runs input validation
  //  */
  // reportValidity() {
  //   this._dirty = true;
  //   this.validationTarget.checkValidity();
  // }

  constructor() {
    super();
    this.addEventListener('keydown', this.onKeydown);
    // this.addEventListener('invalid', this.onInvalid);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.onKeydown);
    // this.removeEventListener('invalid', this.onInvalid);
  }

  validationMessageCallback(message: string): void {
    this.customInvalidText = message;
  }

  private onKeydown = (event: KeyboardEvent): void => {
    if (event.code === 'Enter' && this.form) {
      submit(this.form);
    }
  }

  @state() private _dirty = false;

  private get dirty(): boolean {
    return this._dirty;
  }

  private get hasValue(): boolean {
    return this.validationTarget?.value.length > 0;
  }

  private get _invalidText() {
    return this.customInvalidText || this.validationTarget?.validationMessage;
  }

  private get _invalidState() {
    return this.validationTarget && !this.validationTarget?.validity.valid;
  }

  private inputHandler() {
    this.value = this.validationTarget.value;
    this.onInput(this.validationTarget.value);
  }

  private changeHandler() {
    this._dirty = true;
    this.onChange(this.validationTarget.value);
  }

  updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('value')) {
      this.setValue(this.value);
    }
  }

  firstUpdated() {
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
