import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { event, EventDispatcher } from '../../../utilities/event';
import type BlRadioGroup from '../bl-radio-group';
import { blChangeEventName, blRadioGroupTag } from '../bl-radio-group';
import style from './bl-radio.css';


export const blRadioTag = 'bl-radio';

export const blCheckedEventName = 'bl-checked';
export class BlRadioOptionCheckedEvent extends CustomEvent<string> {
  constructor(detail: string) {
    super(blCheckedEventName, { detail });
  }
}

/**
 * @tag bl-radio
 * @summary Baklava Radio Option component
 */
@customElement(blRadioTag)
export default class BlRadio extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  @property()
  name: string;

  @property()
  value: string;

  /**
   * Sets option as disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;


  @state() private selected = false;

  /**
   * Fires when button clicked
   */
  @event('bl-checked') private onChecked: EventDispatcher<string>;
  @event('bl-blur') private onBlur: EventDispatcher<string>;

  select() {
    this.selected = true;
    this.onChecked(this.value);
  }

  @query('[role=radio]') private radioElement: HTMLElement;

  focus() {
    this.radioElement.tabIndex = 0;
    this.radioElement.focus();
  }

  blur() {
    this.radioElement.tabIndex = -1;
    this.onBlur(this.value);
  }

  private handleFieldValueChange = (event: CustomEvent<string>) => {
    const newValue = event.detail;
    this.selected = newValue === this.value;
  }

  private field: BlRadioGroup | null;

  connectedCallback(): void {
    super.connectedCallback();

    this.field = this.closest<BlRadioGroup>(blRadioGroupTag);

    if (!this.field) {
      console.warn('bl-radio is designed to be used inside a bl-radio-group', this);
    }

    this.field?.addEventListener(blChangeEventName, this.handleFieldValueChange);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.field?.removeEventListener(blChangeEventName, this.handleFieldValueChange);
  }

  render(): TemplateResult {
    const classes = classMap({
      wrapper: true,
      selected: this.selected
    });

    return html`<div
      class=${classes}
      role="radio"
      aria-labelledby="label"
      aria-disabled=${this.disabled}
      aria-readonly=${this.disabled}
      @blur=${this.blur}
      @click=${this.select}>
      <p id="label"><slot></slot></p>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [blRadioTag]: BlRadio;
  }
  interface HTMLElementEventMap {
    [blCheckedEventName]: BlRadioOptionCheckedEvent
  }
}
