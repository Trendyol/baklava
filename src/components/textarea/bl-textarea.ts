import {CSSResultGroup, html, LitElement, TemplateResult} from "lit";
import { customElement, property, query, state } from 'lit/decorators.js';
import {FormControlMixin} from "@open-wc/form-control";
import {ifDefined} from "lit/directives/if-defined.js";
import {event, EventDispatcher} from "../../utilities/event";
import {classMap} from "lit/directives/class-map.js";
import {live} from "lit/directives/live.js";
import {textAreaValidators} from "../../utilities/form-control";
import 'element-internals-polyfill';
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

  static formControlValidators = textAreaValidators;

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
   * Enables showing character counter.
   */
  @property({ type: Boolean, attribute: 'character-counter' })
  characterCounter = false;

  /**
   * Adds help text
   */
  @property({ type: String, attribute: 'help-text' })
  helpText?: string;

  /**
   * Set custom error message
   */
  @property({ type: String, attribute: 'invalid-text' })
  customInvalidText?: string;

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
   * Sets textarea visible row count.
   */
  @property({ type: Number})
  rows?: number = 4;

  @event('bl-input') private onInput: EventDispatcher<string>;

  @event('bl-change') private onChange: EventDispatcher<string>;

  @event('bl-invalid') private onInvalid: EventDispatcher<ValidityState>;


  private initialHeight:number;
  private lineHeight:number;
  private expandScroll = false;
  private verticalPadding:number;

  connectedCallback() {
    super.connectedCallback();
    this.internals.form?.addEventListener('submit', () => {
      this.reportValidity();
    });
  }


  private onError = (): void => {
    this.onInvalid(this.internals.validity);
  }

  private  inputHandler(event: Event) {
    if(this.expand){
      this.autoResize();
    }


    const value = (event.target as HTMLTextAreaElement).value;

    this.setValue(value);
    this.onInput(value);
  }

  private changeHandler(event: Event) {
    const value = (event.target as HTMLTextAreaElement).value;

    this.dirty = true;
    this.setValue(value);
    this.onChange(value);
  }

  firstUpdated() {
    this.verticalPadding = parseInt(getComputedStyle(this.validationTarget).padding[0]) * 2;
    this.setValue(this.value);
  }

  private updateSlotted(event:Event) {
    const _target = (event.target as HTMLSlotElement)
    const value = _target.assignedNodes().map((n) => n.textContent).join('');
    this.value = value
    this.setValue(this.value);
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
    const scrollHeight = this.validationTarget.scrollHeight;
    if(!this.initialHeight) {
      this.initialHeight = scrollHeight;
      this.lineHeight = (this.initialHeight-this.verticalPadding) / this.rows!;
    }
    if(scrollHeight > this.initialHeight){
      if(!this.maxRow){
        this.validationTarget.style.height = "auto";
        this.validationTarget.style.height = scrollHeight + "px";
        this.expandScroll = false;
      }else{
        const currentRow = (scrollHeight - this.verticalPadding) / this.lineHeight;
        if(currentRow <= this.maxRow){
          this.validationTarget.style.height = "auto";
          const reCalculateScrollHeight = this.validationTarget.scrollHeight;
          this.validationTarget.style.height = reCalculateScrollHeight + "px";
          this.expandScroll = false;
        }
        if(currentRow > this.maxRow)
          this.expandScroll = true;
      }
    }
  }

  @state() private dirty = false;

  render(): TemplateResult{
    const maxLengthInvalid = this.internals.validity.rangeOverflow;
    const invalidMessage = !this.checkValidity()
      ? html`<p class="invalid-text">${this.validationMessage}</p>`
      : ``;
    const helpMessage = (this.helpText && this.checkValidity()) ? html`<p class="help-text">${this.helpText}</p>` : ``;

    const label = this.label ? html`<label for="bl-text-area">${this.label}</label>` : '';
    const characterCounterText = (this.characterCounter && this.maxlength) ? `${this.value.length}/${this.maxlength}` : this.characterCounter ? `${this.value.length}` : '';
    const characterCounter = this.characterCounter ? html`<p class="counter-text">${characterCounterText}</p>` : '';


    const classes = {
      'dirty': this.dirty,
      'expand':this.expand,
      'expand-scroll': this.expandScroll,
      'max-len-invalid': maxLengthInvalid,
      'has-value': this.value !== null && this.value !== '',
    };

    return html`
        <textarea
          id="bl-text-area"
          name="${ifDefined(this.name)}"
          class=${classMap(classes)}
          .value=${live(this.value)}
          placeholder="${ifDefined(this.placeholder)}"
          minlength="${ifDefined(this.minlength)}"
          rows=${ifDefined(this.rows)}
          ?required=${(this.required)}
          ?disabled=${(this.disabled)}
          @change=${this.changeHandler}
          @input=${this.inputHandler}
          @invalid=${this.onError}
        >
        </textarea>
        <div hidden>
          <slot @slotchange=${this.updateSlotted}></slot>
        </div>
        ${label}
        <div class="brief">
          ${invalidMessage}${helpMessage}${characterCounter}
        </div>

    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'bl-textarea': BlTextarea;
  }
}