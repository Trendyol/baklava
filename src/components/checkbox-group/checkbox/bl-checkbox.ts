import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import style from './bl-checkbox.css';
import type BlCheckboxGroup from '../bl-checkbox-group';
import { event, EventDispatcher } from '../../../utilities/event';

/**
 * @tag bl-checkbox
 * @summary Baklava Checkbox component
 */

@customElement('bl-checkbox')
export default class BlCheckbox extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }
  private checkboxGroup: BlCheckboxGroup | null;

  @query('#checkbox')
  checkbox: any;

  @query('#label')
  labelEl: any;

  @property({ type: String, reflect: true })
  label = '';

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  @event('bl-checkbox-change') private onChange: EventDispatcher<boolean>;

  iconNames = {
    checked: 'check',
    indeterminate: 'minus',
  };

  icons = {
    checked: html`<bl-icon class="icon" name="check"></bl-icon>`,
    indeterminate: html`<bl-icon class="icon" name="minus"></bl-icon>`,
  };

  handleChange(event: any) {
    this.checked = event.target.checked;
    this.onChange(event.target.checked);

    if (this.indeterminate) {
      this.indeterminate = false;
    }
  }

  updated(changedProperties: Map<string, unknown>) {
    if (this.indeterminate) {
      this.checkbox.indeterminate = true;
    } else {
      this.checkbox.indeterminate = false;
    }

    if (changedProperties.has('checked') && !this.disabled) {
      const checkedProp = changedProperties.get('checked');
      const propChecked = typeof checkedProp === 'undefined' ? false : !checkedProp;
      this.checkbox.checked = propChecked;

      // send slot change event to parent
      this.checkboxGroup = this.closest<BlCheckboxGroup>('bl-checkbox-group');
      this.checkboxGroup?.childCheckboxChanged();
    }
  }

  render(): TemplateResult {
    return html`
    <label id="label" class="label">
      <input id="checkbox" type="checkbox" name="checkbox" ?checked=${this.checked} ?disabled=${
      this.disabled
    } @change=${this.handleChange} />
      <div class="box">
        ${this.indeterminate && !this.checked ? this.icons.indeterminate : null}
        ${this.checked ? this.icons.checked : null}
      </div>
      <span class="text">${this.label}</span>
    </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-checkbox': BlCheckbox;
  }
}
