import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import style from './bl-input.css';

/**
 * @tag bl-input
 * @summary Baklava Input component
 *
 * @property {string} value - Value of the input
 *
 * @event {CustomEvent} bl-change - Fires when input changed
 *
 */
@customElement('bl-input')
export default class BlInput extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  @property({})
  type: 'text' | 'number' = 'text';

  @property({})
  label: string;

  @property({})
  placeholder: string;

  @property({})
  value = '';

  render(): TemplateResult {
    return html`<label>${this.label}</label
      ><input
        type=${this.type}
        placeholder="${this.placeholder || this.label}"
      />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-input': BlInput;
  }
}
