import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { FormControlMixin } from '@open-wc/form-control';
import { submit } from '@open-wc/form-helpers';
import { live } from 'lit/directives/live.js';
import { event, EventDispatcher } from '../../utilities/event';
import { innerInputValidators } from '../../utilities/form-control';
import 'element-internals-polyfill';
import '../icon/bl-icon';
import '../button/bl-button';

import style from './bl-input.css';

export type InputSize = 'small' | 'medium' | 'large';
/**
 * @tag bl-input
 * @summary Baklava Input component
 */
@customElement('bl-input')
export default class BlInput extends FormControlMixin(LitElement) {
  static get styles(): CSSResultGroup {
    return [style];
  }

  static formControlValidators = innerInputValidators;

  @query('input')
  validationTarget: HTMLInputElement;

  /**
   * Sets name of the input
   */
  @property({})
  name?: string;

  /**
   * Type of the input. It's used to set `type` attribute of native input inside. Only `text`, `number` and `password` is supported for now.
   */
  @property({})
  type: 'text' | 'password' | 'number' = 'text';

  /**
   * Sets label of the input
   */
  @property({ reflect: true })
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
   * Sets the increase and decrease step to a `number` input
   */
  @property({ type: Number })
  step?: number;

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
  @property({ type: Boolean, attribute: 'label-fixed', reflect: true })
  labelFixed = false;

  /**
   * Set custom error message
   */
  @property({ type: String, attribute: 'invalid-text' })
  customInvalidText?: string;

  /**
   * Adds help text
   */
  @property({ type: String, attribute: 'help-text', reflect: true })
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
   * Fires when the value of an input element has been changed.
   */
  @event('bl-invalid') private onInvalid: EventDispatcher<ValidityState>;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this.onKeydown);
    this.addEventListener('invalid', this.onError);

    this.form?.addEventListener('submit', () => {
      this.reportValidity();
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.onKeydown);
    this.removeEventListener('invalid', this.onError);
  }

  private onKeydown = (event: KeyboardEvent): void => {
    if (event.code === 'Enter' && this.form) {
      submit(this.form);
    }
  };

  private onError = (): void => {
    this.onInvalid(this.internals.validity);
  };

  @state() private dirty = false;

  @state() private passwordVisible = false;

  @state() private passwordInput = false;

  private textVisiblityToggle() {
    this.passwordVisible = !this.passwordVisible;
  }

  validityCallback(): string | void {
    return this.customInvalidText || this.validationTarget?.validationMessage;
  }

  reportValidity() {
    this.dirty = true;
    return this.checkValidity();
  }

  valueChangedCallback(value: string): void {
    this.value = value;
  }

  private inputHandler(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    this.setValue(value);
    this.onInput(value);
  }

  private changeHandler(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    this.dirty = true;
    this.setValue(value);
    this.onChange(value);
  }

  firstUpdated() {
    this.passwordInput = this.type === 'password';
    this.setValue(this.value);
  }

  render(): TemplateResult {
    const invalidMessage = !this.checkValidity()
      ? html`<p id="errorMessage" aria-live="polite" class="invalid-text">
          ${this.validationMessage}
        </p>`
      : ``;
    const helpMessage = this.helpText
      ? html`<p id="helpText" class="help-text">${this.helpText}</p>`
      : ``;

    const icon = this.icon ? html`<bl-icon class="custom-icon" name="${this.icon}"></bl-icon>` : '';
    const label = this.label ? html`<label for="input">${this.label}</label>` : '';

    const revealButton = this.passwordInput
      ? html`<bl-button
          size="small"
          kind="neutral"
          variant="tertiary"
          class="${classMap({
            'reveal-button': true,
            'password-visible': this.passwordVisible,
          })}"
          aria-label="Toggle password reveal"
          @bl-click="${this.textVisiblityToggle}"
        >
          <bl-icon class="reveal-icon" slot="icon" name="eye_on"></bl-icon>
          <bl-icon class="reveal-icon" slot="icon" name="eye_off"></bl-icon>
        </bl-button>`
      : '';

    const classes = {
      'wrapper': true,
      'dirty': this.dirty,
      'invalid': !this.checkValidity(),
      'has-icon': this.passwordInput || this.icon || (this.dirty && !this.checkValidity()),
      'has-value': this.value !== null && this.value !== '',
    };

    const passwordType = this.passwordVisible ? 'text' : 'password';
    const inputType = this.passwordInput ? passwordType : this.type;

    return html`<div class=${classMap(classes)}>
      ${label}
      <div class="input-wrapper">
        <input
          id="input"
          type=${inputType}
          .value=${live(this.value)}
          placeholder="${ifDefined(this.placeholder)}"
          minlength="${ifDefined(this.minlength)}"
          maxlength="${ifDefined(this.maxlength)}"
          min="${ifDefined(this.min)}"
          max="${ifDefined(this.max)}"
          step="${ifDefined(this.step)}"
          ?required=${this.required}
          ?disabled=${this.disabled}
          @change=${this.changeHandler}
          @input=${this.inputHandler}
          aria-invalid=${this.checkValidity() ? 'false' : 'true'}
          aria-describedby=${ifDefined(this.helpText ? 'helpText' : undefined)}
          aria-errormessage=${ifDefined(this.checkValidity() ? undefined : 'errorMessage')}
        />
        <div class="icon">
          ${revealButton} ${icon}
          <bl-icon class="error-icon" name="alert"></bl-icon>
        </div>
      </div>
      <div class="hint">${invalidMessage} ${helpMessage}</div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-input': BlInput;
  }
}
