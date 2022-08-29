import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { event, EventDispatcher } from '../../utilities/event';
import '../icon/bl-icon';
import style from './bl-checkbox.css';

/**
 * @tag bl-checkbox
 * @summary Baklava Checkbox component
 */
@customElement('bl-checkbox')
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

  handleChange(event: CustomEvent) {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.onChange(target.checked);
    this.indeterminate = false;
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
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          .indeterminate=${this.indeterminate}
          @change=${this.handleChange}
        />
        <div class="check-mark">${icon ? html`<bl-icon name="${icon}"></bl-icon>` : null}</div>
        <span class="label"><slot></slot></span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-checkbox': BlCheckbox;
  }
}
