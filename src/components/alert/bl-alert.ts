import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import style from './bl-alert.css';

export type AlertVariant = 'info' | 'warning' | 'success' | 'error';
export type AlertSize = 'medium';

/**
 * @tag bl-alert
 * @summary Baklava Alert component
 */

@customElement('bl-alert')
export default class BlAlert extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  @property()
  variant: AlertVariant = 'success';

  @property()
  description: string;

  @property()
  title: string;

  render(): TemplateResult {
    const titleTemp = this.title ? html`<span class="title">${this.title}</span>` : null;
    return  html`<div class="alert">
      <div class="content">
      ${titleTemp}
        <span class="description">${this.description}</span>
      </div>

      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-alert': BlAlert;
  }
}
