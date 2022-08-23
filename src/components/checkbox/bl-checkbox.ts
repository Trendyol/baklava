import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { event, EventDispatcher } from '../../utilities/event';
import style from './bl-checkbox.css';

/**
 * @tag bl-checkbox
 * @summary Baklava Checkbox component
 *
 * @property {boolean} checked - Sets the checked state for checkbox
 * @property {boolean} disabled - Sets the disabled state for checkbox
 * @property {boolean} indeterminate - Sets the indeterminate state for checkbox
 *
 * @cssproperty --bl-color-primary - Sets the color of checkbox label and box.
 * @cssproperty --bl-color-tertiary - Sets the color of disabled checkbox box.
 * @cssproperty --bl-color-content-passive - Sets the color of disabled checkbox icon.
 * @cssproperty --bl-font-size-2xs - Sets the icon font size.
 */

@customElement('bl-checkbox')
export default class BlCheckbox extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  @query('#checkbox')
  checkbox: HTMLInputElement;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  @event('bl-checkbox-change') private onChange: EventDispatcher<boolean>;

  icons = {
    checked: html`<bl-icon class="icon" name="check"></bl-icon>`,
    indeterminate: html`<bl-icon class="icon" name="minus"></bl-icon>`,
  };

  handleChange(event: CustomEvent) {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.onChange(target.checked);
    this.indeterminate = false;
  }

  updated() {
    this.checkbox.checked = this.checked;

    if (this.indeterminate && !this.checked) {
      this.checkbox.indeterminate = true;
    } else {
      this.checkbox.indeterminate = false;
    }
  }

  render(): TemplateResult {
    return html`
      <label id="label" class="label">
        <input
          id="checkbox"
          type="checkbox"
          name="checkbox"
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this.handleChange}
        />
        <div class="box">
          ${this.checked ? this.icons.checked : null}
          ${this.indeterminate && !this.checked ? this.icons.indeterminate : null}
        </div>
        <span class="text"><slot></slot></span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-checkbox': BlCheckbox;
  }
}
