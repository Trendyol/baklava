import {CSSResultGroup, html, LitElement, TemplateResult} from "lit";
import { customElement, property, query, state } from 'lit/decorators.js';
import {FormControlMixin, minLengthValidator, requiredValidator} from "@open-wc/form-control";
import {ifDefined} from "lit/directives/if-defined.js";
import {event, EventDispatcher} from "../../utilities/event";
import {classMap} from "lit/directives/class-map.js";
import {live} from "lit/directives/live.js";
import {submit} from "@open-wc/form-helpers";
import { textareaLengthValidator} from "../../utilities/form-control";

import style from './bl-textarea.css';


export type TextareaSize = 'small' | 'medium' | 'large';
/**
 * @tag bl-textarea
 * @summary Baklava Textarea component
 */
@customElement('bl-textarea')
export default class BlTextarea extends FormControlMixin(LitElement){
  static get styles(): CSSResultGroup {
    return [style];
  }

  static formControlValidators = [requiredValidator,minLengthValidator,textareaLengthValidator];

  @query('textarea')
  validationTarget: HTMLTextAreaElement;

  /**
   * Name of textarea
   */
  @property({ type: String })
  name = '';

  /**
   * Makes textarea a mandatory field
   */
  @property({ type: Boolean })
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
  @property({ type: Number, reflect: true, attribute:'max-row' })
  maxRow?: number;

  /**
   * Sets textarea size.
   */
  @property({ type: String, reflect: true })
  size?: TextareaSize = 'medium';

  /**
   * Sets label of the textarea
   */
  @property({})
  label?: string;

  /**
   * Makes label as fixed positioned
   */
  @property({ type: Boolean, attribute: 'label-fixed' })
  labelFixed = false;

  /**
   * Sets placeholder of the textarea
   */
  @property({})
  placeholder?: string;

  /**
   * Character counter
   */
  @property({ type: Boolean, attribute: 'character-counter' })
  characterCounter = false;

  /**
   * Adds help text
   */
  @property({ type: String, attribute: 'help-text' })
  helpText?: string;

  /**
   * Sets minimum length of the textarea
   */
  @property({ type: Number })
  minlength?: number;

  /**
   * Sets max length of textarea
   */
  @property({ type: Number })
  maxlength?:number;

  /**
   * Sets initial value of the textarea
   */
  @property()
  value = '';

  /**
   * Sets input size.
   */
  @property({ type: Number})
  rows?: number = 4;

  @event('bl-input') private onInput: EventDispatcher<string>;

  @event('bl-change') private onChange: EventDispatcher<string>;

  @event('bl-invalid') private onInvalid: EventDispatcher<ValidityState>;


  private lineHeight:number;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this.onKeydown);
    this.addEventListener('invalid', this.onError);

    if(this.expand){
      this.addEventListener('input', this.autoResize, false);
    }

    this.internals.form?.addEventListener('submit', () => {
      this.reportValidity();
    });
  }

  private onKeydown = (event: KeyboardEvent): void => {
    if (event.code === 'Enter' && this.form) {
      submit(this.form);
    }
  }

  private onError = (): void => {
    this.onInvalid(this.internals.validity);
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

  reportValidity() {
    this.dirty = true;
    return this.checkValidity();
  }

  valueChangedCallback(value: string): void {
    this.value = value;
  }

  validityCallback(): string | void {
    return this.validationTarget?.validationMessage;
  }

  autoResize() {
    const scrollHeight = this.validationTarget.scrollHeight;
    this.validationTarget.style.height = "";
    this.validationTarget.style.height = scrollHeight + "px";
    console.log(scrollHeight, this.lineHeight);
    this.rows = scrollHeight / this.lineHeight;
  }

  @state() private dirty = false;


  render(): TemplateResult{
    const maxLengthInvalid = this.internals.validity.rangeOverflow;
    const invalidMessage = !this.checkValidity()
      ? html`<p class="invalid-text">${this.validationMessage}</p>`
      : ``;
    const helpMessage = this.helpText ? html`<p class="help-text">${this.helpText}</p>` : ``;

    const label = this.label ? html`<label>${this.label}</label>` : '';
    const characterCounter = (this.characterCounter && this.maxlength) ? html`<p class="counter-text">${this.value.length}/${this.maxlength}</p>` : '';


    const classes = {
      'dirty': this.dirty,
      'expand':this.expand,
      'max-len-invalid': maxLengthInvalid,
      'has-value': this.value !== null && this.value !== '',
    };

    return html`
        <textarea
          name="${ifDefined(this.name)}"
          class=${classMap(classes)}
          .value=${live(this.value)}
          placeholder="${ifDefined(this.placeholder)}"
          minlength="${ifDefined(this.minlength)}"
          rows=${ifDefined(this.rows)}
          ?required=${this.required}
          ?disabled=${this.disabled}
          @change=${this.changeHandler}
          @input=${this.inputHandler}
        ><slot></slot>
        </textarea>
        ${label}
        <div class="brief">
          ${invalidMessage}${helpMessage}${characterCounter}
        </div>
    `
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'bl-textarea': BlTextarea;
  }
}
