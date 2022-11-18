import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import BlCheckboxGroup from '../bl-checkbox-group';
import style from './bl-checkbox.css';
import { live } from 'lit/directives/live.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { event, EventDispatcher } from '../../../utilities/event';
import '../../icon/bl-icon';
import { blChangeEventName} from '../bl-checkbox-group';

export const blCheckboxTag = 'bl-checkbox';

export const blCheckedEventName = 'bl-checkbox-change';

/**
 * @tag bl-checkbox
 * @summary Baklava Checkbox component
 */
@customElement(blCheckboxTag)
export default class BlCheckbox extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets the checked state for checkbox
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * Sets the checkbox value
   */
  @property()
  value: string;

  /**
   * Sets the disabled state for checkbox
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Sets the indeterminate state for checkbox
   */
  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  /**
   * Fires whenever user change the value of the checkbox.
   */
  @event('bl-checkbox-change') private onChange: EventDispatcher<boolean>;

  /**
   * Fires when checkbox is focused
   */
  @event('bl-focus') private onFocus: EventDispatcher<string>;

  /**
   * Fires when checkbox is blurred
   */
  @event('bl-blur') private onBlur: EventDispatcher<string>;

  @query('input') private checkboxElement: HTMLElement;

  /**
   * Focuses this option
   */
  focus() {
    this.checkboxElement.tabIndex = 0;
    this.checkboxElement.focus();
    this.onFocus(this.value);
  }

  /**
   * Blurs from this option
   */
  blur() {
    this.checkboxElement.tabIndex = -1;
    this.onBlur(this.value);
  }

  handleChange(event: CustomEvent) {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.onChange(target.checked);
    this.indeterminate = false;
  }

  update(changedProperties: Map<string, unknown>) {
    super.update(changedProperties);
    if (this.indeterminate && this.checked) {
      this.checked = false;
      this.requestUpdate('checked', true);
    }
  }

  private field: BlCheckboxGroup | null;

  connectedCallback(): void {
    super.connectedCallback();

    this.field = this.closest<BlCheckboxGroup>("bl-checkbox-group");

    this.field?.addEventListener(blChangeEventName, this.handleFieldValueChange);

    // console.log(this.field);
  }

  private handleFieldValueChange = (event: CustomEvent<string>) => {
    console.log("helo",event.detail);

  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.field?.removeEventListener(blChangeEventName, this.handleFieldValueChange);
  }

  render(): TemplateResult {
    let icon = '';
    if (this.checked) icon = 'check';
    if (this.indeterminate) icon = 'minus';

    return html`
      <label>
        <input
          type="checkbox"
          name="checkbox"
          .checked=${live(this.checked)}
          ?disabled=${this.disabled}
          .indeterminate=${this.indeterminate}
          @change=${this.handleChange}
          value=${ifDefined(this.value)}
          @blur=${this.blur}
        />
        <div class="check-mark">${icon ? html`<bl-icon name="${icon}"></bl-icon>` : null}</div>
        <span class="label"><slot></slot></span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [blCheckboxTag]: BlCheckbox;
  }

  interface HTMLElementEventMap {
    [blCheckedEventName]: CustomEvent<string>;
  }
}
