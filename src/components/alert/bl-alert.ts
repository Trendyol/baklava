import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import style from './bl-alert.css';

/**
 * @tag bl-alert
 * @summary Baklava Alert component
 */

@customElement('bl-alert')
export default class BlAlert extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  render(): TemplateResult {
    return html`<div class="alert">
        <span>test</span>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-alert': BlAlert;
  }
}
