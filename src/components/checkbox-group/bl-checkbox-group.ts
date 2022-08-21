import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import './checkbox/bl-checkbox';
import style from './bl-checkbox-group.css';

/**
 * @tag bl-checkbox-group
 * @summary Baklava Checkbox Group component
 *
 * @property {string} label - Sets the label for parent checkbox
 */

@customElement('bl-checkbox-group')
export default class BlCheckboxGroup extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  @query('#parent-checkbox')
  parentCheckbox: HTMLInputElement;

  @property({ type: String, reflect: true })
  label = '';

  @state() private _indeterminate = false;

  @state() private _checked = false;

  get _slottedChildren() {
    const slot = this.shadowRoot?.querySelector('slot');
    const childNodes = slot?.assignedNodes({ flatten: true });
    return Array.prototype.filter.call(childNodes, node => node.nodeType == Node.ELEMENT_NODE);
  }

  childCheckboxChanged() {
    this.setParentCheckboxStatus();
  }

  firstUpdated() {
    this.setParentCheckboxStatus();
  }

  setParentCheckboxStatus() {
    const isAllChecked = this._slottedChildren.every(item => item.checked === true);
    const isAllUnchecked = this._slottedChildren.every(item => item.checked === false);

    if (isAllChecked) {
      this._indeterminate = false;
      this.parentCheckbox.checked = true;
    } else if (isAllUnchecked) {
      this._indeterminate = false;
      this.parentCheckbox.checked = false;
    } else {
      this._indeterminate = true;
      this.parentCheckbox.checked = false;
    }
  }

  handleParentCheckboxChange(event: CustomEvent) {
    if ((event.target as HTMLInputElement).checked) {
      this._slottedChildren.forEach(item => {
        item.checked = true;
      });
    } else {
      this._slottedChildren.forEach(item => {
        item.checked = false;
      });
    }
  }

  render(): TemplateResult {
    return html`
        <div class="container">
          <bl-checkbox id="parent-checkbox"
            ?indeterminate=${this._indeterminate}
            indeterminateAllowed
            ?checked=${this._checked}
            label=${this.label}
            @bl-checkbox-change=${this.handleParentCheckboxChange}></bl-checkbox>
          <div class="container">
            <slot></slot>
          </div>
        </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-checkbox-group': BlCheckboxGroup;
  }
}
