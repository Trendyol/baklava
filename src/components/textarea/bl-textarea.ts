import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { FormControlMixin } from '@open-wc/form-control';
import { ifDefined } from 'lit/directives/if-defined.js';
import { event, EventDispatcher } from '../../utilities/event';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { live } from 'lit/directives/live.js';
import { textAreaValidators } from '../../utilities/form-control';
import 'element-internals-polyfill';
import style from './bl-textarea.css';

export type TextareaSize = 'small' | 'medium' | 'large';
/**
 * @tag bl-textarea
 * @summary Baklava Textarea component
 */
@customElement('bl-textarea')
export default class BlTextarea extends FormControlMixin(LitElement) {
  static get styles(): CSSResultGroup {
    return [style];
  }
  static shadowRootOptions = {...LitElement.shadowRootOptions, delegatesFocus: true};

  static shadowRootOptions = {...LitElement.shadowRootOptions, delegatesFocus: true};

  static formControlValidators = textAreaValidators;

  @query('textarea')
  validationTarget: HTMLTextAreaElement;

  /**
   * Name of textarea
   */
  @property({ type: String, reflect: true })
  name = '';

  /**
   * Makes textarea a mandatory field
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Disables the textarea
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Sets expandity
   */
  @property({ type: Boolean, reflect: true })
  expand = false;

  /**
   * Sets max row when expand is true
   */
  @property({ type: Number, reflect: true, attribute: 'max-rows' })
  maxRows?: number;

  /**
   * Sets textarea size.
   */
  @property({ type: String, reflect: true })
  size?: TextareaSize = 'medium';

  /**
   * Sets label of the textarea
   */
  @property({ reflect: true })
  label?: string;

  /**
   * Makes label as fixed positioned
   */
  @property({ type: Boolean, attribute: 'label-fixed', reflect: true })
  labelFixed = false;

  /**
   * Sets placeholder of the textarea
   */
  @property({ reflect: true })
  placeholder?: string;

  /**
   * Enables showing character counter.
   */
  @property({ type: Boolean, attribute: 'character-counter', reflect: true })
  characterCounter = false;

  /**
   * Adds help text
   */
  @property({ type: String, attribute: 'help-text', reflect: true })
  helpText?: string;

  /**
   * Set custom error message
   */
  @property({ type: String, attribute: 'invalid-text', reflect: true })
  customInvalidText?: string;

  /**
   * Sets minimum length of the textarea
   */
  @property({ type: Number, reflect: true })
  minlength?: number;

  /**
   * Sets max length of textarea
   */
  @property({ type: Number, reflect: true })
  maxlength?: number;

  /**
   * Sets initial value of the textarea
   */
  @property({ reflect: true })
  value = '';

  /**
   * Sets textarea visible row count.
   */
  @property({ type: Number, reflect: true })
  rows?: number = 4;

  /**
   * Sets the input mode of the field for asking browser to show the desired keyboard.
   */
  @property({ type: String, reflect: true })
  inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';

  /**
   * Sets input to get keyboard focus automatically
   */
  @property({ type: Boolean, reflect: true })
  autofocus = false;

  /**
   * Hints browser to autocomplete this field.
   */
  @property({ type: String, reflect: true })
  autocomplete: string;

  /**
   * Enables/disables spellcheck feature inside the textarea
   */
  @property({ type: String, reflect: true, attribute: 'spellcheck' })
  spellchecker: 'true' | 'false' = 'false';

  @event('bl-input') private onInput: EventDispatcher<string>;

  @event('bl-change') private onChange: EventDispatcher<string>;

  @event('bl-invalid') private onInvalid: EventDispatcher<ValidityState>;

  @state()
  private customScrollHeight: string | null = null;

  private inputId = Math.random().toString(36).substring(2);

  connectedCallback() {
    super.connectedCallback();
    this.internals.form?.addEventListener('submit', () => {
      this.reportValidity();
    });
  }

  private onError = (): void => {
    this.onInvalid(this.internals.validity);
  };

  private inputHandler(event: Event) {
    this.autoResize();

    const value = (event.target as HTMLTextAreaElement).value;
    this.value = value;
    this.onInput(value);
  }

  private changeHandler(event: Event) {
    const value = (event.target as HTMLTextAreaElement).value;

    this.dirty = true;
    this.value = value;
    this.onChange(value);
  }

  firstUpdated() {
    this.setValue(this.value);
    this.autoResize();
  }

  protected async updated(changedProperties: PropertyValues) {
    if (changedProperties.has('rows')) {
      this.autoResize();
    }

    if (changedProperties.has('value')) {
      this.setValue(this.value);

      await this.validationComplete;

      this.requestUpdate();
    }
  }

  reportValidity() {
    this.dirty = true;
    return this.checkValidity();
  }

  valueChangedCallback(value: string): void {
    this.value = value;
  }

  validityCallback(): string | void {
    return this.customInvalidText || this.validationTarget?.validationMessage;
  }

  private autoResize() {
    if (!this.expand) {
      return;
    }

    this.validationTarget.style.height = 'auto';
    const scrollHeight = this.validationTarget.scrollHeight;
    this.customScrollHeight = `${scrollHeight}px`;
    this.validationTarget.style.removeProperty('height');
  }

  @state() private dirty = false;

  render(): TemplateResult {
    const maxLengthInvalid = this.internals.validity.tooLong;
    const invalidMessage = !this.checkValidity()
      ? html`<p class="invalid-text">${this.validationMessage}</p>`
      : ``;
    const helpMessage = this.helpText ? html`<p class="help-text">${this.helpText}</p>` : ``;

    const label = this.label ? html`<label for="${this.inputId}">${this.label}</label>` : '';
    const characterCounterText =
      this.characterCounter && this.maxlength
        ? `${this.value.length}/${this.maxlength}`
        : this.characterCounter
        ? `${this.value.length}`
        : '';
    const characterCounter = this.characterCounter
      ? html`<p class="counter-text">${characterCounterText}</p>`
      : '';

    const wrapperClasses = {
      'wrapper': true,
      'has-value': this.value !== null && this.value !== '',
      'dirty': this.dirty,
      'max-len-invalid': maxLengthInvalid,
      'invalid': !this.checkValidity(),
    };

    const styles = {
      '--row-count': `${this.rows}`,
      '--maxrow-count': this.maxRows ? `${this.maxRows}` : null,
      '--scroll-height': this.customScrollHeight,
    };

    return html`
      <div style=${styleMap(styles)} class=${classMap(wrapperClasses)}>
        ${label}
        <fieldset class="input-wrapper">
          <legend><span>${this.label}</span></legend>
          <textarea
            id="${this.inputId}"
            name="${ifDefined(this.name)}"
            .value=${live(this.value)}
            ?autofocus=${this.autofocus}
            autocomplete="${ifDefined(this.autocomplete)}"
            inputmode="${ifDefined(this.inputmode)}"
            placeholder="${ifDefined(this.placeholder)}"
            minlength="${ifDefined(this.minlength)}"
            rows="${ifDefined(this.rows)}"
            ?required=${this.required}
            ?disabled=${this.disabled}
            spellcheck="${this.spellchecker}"
            @change=${this.changeHandler}
            @input=${this.inputHandler}
            @invalid=${this.onError}
          >
          </textarea>
        </fieldset>
        <div class="hint">${invalidMessage}${helpMessage}${characterCounter}</div>
      </div>
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'bl-textarea': BlTextarea;
  }
}
