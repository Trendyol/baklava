import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import './checkbox/bl-checkbox';

/**
 * @tag bl-checkbox-group
 * @summary Baklava Checkbox Group component
 */

@customElement('bl-checkbox-group')
export default class BlCheckboxGroup extends LitElement {
  @query('#parentCheckbox')
  parentCheckbox: any;

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

  handleParentCheckboxChange(event: any) {
    if (event.target.checked) {
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
        <div style="display: flex; flex-direction: column;">
          <bl-checkbox id="parentCheckbox"
            ?indeterminate=${this._indeterminate}
            ?checked=${this._checked}
            label=${this.label}
            @bl-checkbox-change=${this.handleParentCheckboxChange}></bl-checkbox>
          <slot></slot>
        </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-checkbox-group': BlCheckboxGroup;
  }
}
