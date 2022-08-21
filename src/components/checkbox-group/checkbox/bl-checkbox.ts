import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { event, EventDispatcher } from '../../../utilities/event';
import style from './bl-checkbox.css';
import type BlCheckboxGroup from '../bl-checkbox-group';

/**
 * @tag bl-checkbox
 * @summary Baklava Checkbox component
 *
 * @property {string} label - Sets the label for checkbox
 * @property {boolean} checked - Sets the checked state for checkbox
 * @property {boolean} disabled - Sets the disabled state for checkbox
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

  private checkboxGroup: BlCheckboxGroup | null;

  @query('#checkbox')
  checkbox: HTMLInputElement;

  @query('#label')
  labelEl: HTMLLabelElement;

  @property({ type: String, reflect: true })
  label? = '';

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  @property({ type: Boolean })
  indeterminateAllowed = false;

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

    // send slot elements change event to parent
    this.checkboxGroup = this.closest<BlCheckboxGroup>('bl-checkbox-group');
    this.checkboxGroup?.childCheckboxChanged();

    if (this.indeterminate && this.indeterminateAllowed) {
      this.checkbox.indeterminate = true;
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
        @change=${this.handleChange} />
      <div class="box">
        ${this.checked ? this.icons.checked : null}
        ${
          this.indeterminate && this.indeterminateAllowed && !this.checked
            ? this.icons.indeterminate
            : null
        }
      </div>
      ${ifDefined(this.label) && html`<span class="text">${this.label}</span>`}
    </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-checkbox': BlCheckbox;
  }
}
