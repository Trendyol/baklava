import { LitElement, html, CSSResultGroup } from 'lit';
import { customElement, property} from 'lit/decorators.js';
import style from '../select/bl-select.css';
import '../icon/bl-icon';
import '../select/option/bl-select-option';

@customElement('bl-select')
export default class BlSelect extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  // Declare reactive properties
  @property({})
  label?: string;

  @property({})
  value?: string;

  @property({ type: Boolean })
  required?: boolean = false;

  @property({ type: Boolean })
  disabled?: boolean = false;

  @property({ type: Boolean })
  multiple?: boolean = false;

  render() {
    return html`<div>
      select
      <slot></slot>
    </div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-select': BlSelect;
  }
}
