import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import style from './bl-badge.css';
import '../icon/bl-icon';

export type BadgeSize = 'small' | 'medium' | 'large';

/**
 * @tag bl-badge
 * @summary Baklava Badge component
 *
 * @property {string} size - Sets the badge size
 * @property {string} icon - Sets the name of the icon
 *
 * @cssproperty --bl-badge-bg-color - Sets the background color of badge. Default value is '--bl-color-accent-primary-background'
 * @cssproperty --bl-badge-color - Sets the color of badge. Default value is '--bl-color-primary'
 */

@customElement('bl-badge')
export default class BlBadge extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  @property({ type: String, reflect: true })
  size: BadgeSize = 'medium';

  @property({ type: String })
  icon?: string;

  render(): TemplateResult {
    const icon = this.icon ? html`<bl-icon name=${this.icon}></bl-icon>` : '';
    const slots = html`<slot name="badge-icon">${icon}</slot> <slot></slot>`;

    return html`<span class='badge'>${slots}</span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-badge': BlBadge;
  }
}
