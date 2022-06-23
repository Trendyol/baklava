import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
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

  get _hasIconBySize() {
    const hasIconSizes = ['medium', 'large'];

    return hasIconSizes.includes(this.size);
  }

  render(): TemplateResult {
    const icon = this.icon && this._hasIconBySize ? html`<bl-icon name=${this.icon} />` : '';
    const slots = html`<slot name="badge-icon">${icon}</slot> <slot></slot>`;
    const classes = classMap({
      badge: true,
    });

    return html`<span class=${classes}>${slots}</span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-badge': BlBadge;
  }
}
