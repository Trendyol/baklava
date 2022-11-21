import { FormControlMixin } from '@open-wc/form-control';
import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import 'element-internals-polyfill';
import { event, EventDispatcher } from '../../utilities/event';
import style from './bl-checkbox-group.css';
import BlCheckbox, { blCheckboxTag } from './checkbox/bl-checkbox';

export const blCheckboxGroupTag = 'bl-checkbox-group';

export const blChangeEventName = 'bl-checkbox-group-change';

/**
 * @tag bl-radio-group
 * @summary Baklava Button component
 *
 * @cssproperty --bl-checkbox-direction - Can be used for showing checkbox options as columns instead of rows. Options are `row` or `column`
 */
@customElement(blCheckboxGroupTag)
export default class BlCheckboxGroup extends FormControlMixin(LitElement) {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets the checkbox group label
   */
  @property({ type: String })
  label: string;

  /**
   * Set and gets the actual value of the field
   */
  @property({ type: Array, reflect: true })
  value: Array<string> = [];

  /**
   * Sets option as required
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  get options(): BlCheckbox[] {
    return [].slice.call(this.querySelectorAll(blCheckboxTag));
  }

  get checkedOptions(): Array<string> {
    return this.options.filter(opt => opt.checked).map(opt => opt.value);
  }

  get availableOptions(): BlCheckbox[] {
    return this.options.filter(option => !option.disabled);
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.tabIndex = 0;
    this.addEventListener('focus', this.handleFocus);
    this.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('focus', this.handleFocus);
    this.removeEventListener('keydown', this.handleKeyDown);
  }

  protected firstUpdated(): void {
    this.availableOptions.forEach(opt => {
      opt.blur();
    });
  }

  updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('value')) {
      this.setValue(this.checkedOptions.join(','));
      this.onChange(this.value);
    }
  }

  /**
   * Fires when checkbox group value changed
   */
  @event('bl-checkbox-group-change') private onChange: EventDispatcher<Array<string>>;

  private focusedOptionIndex = 0;

  private handleOptionChecked() {
    this.value = this.checkedOptions;
  }

  private handleKeyDown(event: KeyboardEvent) {
    // Next option
    if (['ArrowDown', 'ArrowRight'].includes(event.key)) {
      this.focusedOptionIndex++;

      // Previous option
    } else if (['ArrowUp', 'ArrowLeft'].includes(event.key)) {
      this.focusedOptionIndex--;

      // Select option
    } else {
      // Other keys are not our interest here
      this.tabIndex = 0;
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
    return html`<fieldset role="group" aria-labelledby="label" aria-required=${this.required}>
      <legend id="label">${this.label}</legend>
      <div class="options" @bl-checkbox-change=${this.handleOptionChecked}>
        <slot></slot>
      </div>
    </fieldset>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [blCheckboxGroupTag]: BlCheckboxGroup;
  }
  interface HTMLElementEventMap {
    [blChangeEventName]: CustomEvent<Array<string>>;
  }
}
