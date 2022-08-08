import { LitElement, html, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import style from './bl-select-option.css';

@customElement('bl-select-option')
export default class BlSelectOption extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  // Declare reactive properties
  @property({})
  value?: string;

  @property({ type: Boolean })
  disabled?: boolean = false;

  @property({ type: Boolean })
  selected?: boolean = false;

  render() {
    return html`<div>
      option
      <slot></slot>
    </div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-select-option': BlSelectOption;
  }
}
