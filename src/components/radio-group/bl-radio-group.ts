import { FormControlMixin } from '@open-wc/form-control';
import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import 'element-internals-polyfill';
import { event, EventDispatcher } from '../../utilities/event';
import style from './bl-radio-group.css';
import BlRadio, { blRadioTag } from './radio/bl-radio';

export const blRadioGroupTag = 'bl-radio-group';

export const blChangeEventName = 'bl-radio-change';
export class BlRadioChangeEvent extends CustomEvent<string> {
  constructor(detail: string) {
    super(blChangeEventName, { detail });
  }
}

/**
 * @tag bl-radio-group
 * @summary Baklava Button component
 *
 * @cssproperty --bl-radio-direction - Can be used for showing radio options as columns instead of rows. Options are `row` or `column`
 */
@customElement(blRadioGroupTag)
export default class BlRadioGroup extends FormControlMixin(LitElement) {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets the button label. Used for accessibility.
   */
  @property({ type: String })
  label: string;

  /**
   * Sets button as disabled
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Set and gets the actual value of the field
   */
  @property()
  value = '';

  get options(): BlRadio[] {
    return [].slice.call(this.querySelectorAll(blRadioTag));
  }

  get availableOptions(): BlRadio[] {
    return this.options.filter(option => !option.disabled);
  }

  updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('value')) {
      this.setValue(this.value);
      this.onChange(this.value);
    }
  }

  /**
   * Fires when button clicked
   */
  @event('bl-radio-change') private onChange: EventDispatcher<string>;

  private focusedOptionIndex = 0;

  private handleOptionChecked(event: CustomEvent) {
    const checkedOption = event.target as BlRadio;
    this.setValue(checkedOption.value);
    this.onChange(checkedOption.value);
  }

  private handleKeyDown(event: KeyboardEvent) {
    // Next option
    if (['ArrowDown', 'ArrowRight'].includes(event.key)) {
      this.focusedOptionIndex++;

      // Previous option
    } else if (['ArrowUp', 'ArrowLeft'].includes(event.key)) {
      this.focusedOptionIndex--;

      // Select option
    } else if ([' '].includes(event.key)) {
      this.availableOptions[this.focusedOptionIndex].select();
      return;
    } else {
      // Other keys are not our interest here
      return;
    }

    // Don't exceed array indexes
    this.focusedOptionIndex = Math.max(
      0,
      Math.min(this.focusedOptionIndex, this.availableOptions.length - 1)
    );

    this.availableOptions[this.focusedOptionIndex].focus();

    event.preventDefault();
  }

  private handleFocus() {
    this.availableOptions[this.focusedOptionIndex].focus();
  }

  render(): TemplateResult {
    return html`<fieldset
      tabindex="0"
      @focus=${this.handleFocus}
      role="radiogroup"
      aria-labelledby="label"
      aria-required=${this.required}
      @keydown=${this.handleKeyDown}
    >
      <legend>${this.label}</legend>
      <div class="options" @bl-checked=${this.handleOptionChecked}>
        <slot></slot>
      </div>
    </fieldset>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [blRadioGroupTag]: BlRadioGroup;
  }
  interface HTMLElementEventMap {
    [blChangeEventName]: BlRadioChangeEvent;
  }
}
