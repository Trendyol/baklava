import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import style from './bl-alert-item.css';
import '../icon/bl-icon';
import "../button/bl-button";
import { TargetType } from '../button/bl-button';
import { ifDefined } from 'lit/directives/if-defined.js';

export type AlertVariant = 'info' | 'warning' | 'success' | 'error';

/**
 * @tag bl-alert-item
 * @summary Baklava Alert Item component
 */

@customElement('bl-alert-item')
export default class BlAlertItem extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  @property()
  variant: AlertVariant = 'info';

  @property({ attribute: 'alert-title' })
  alertTitle?: string;

  @property({ attribute: 'alert-description'})
  alertDescription?: string;

  @property({ attribute: 'alert-icon' })
  alertIcon?: string;

  @property({ attribute: 'action-label' })
  actionLabel?: string;

  @property({ attribute: 'action-href'})
  actionHref?: string;

  @property({ attribute: 'action-target'})
  actionTarget?: TargetType = '_blank';

  shouldRender(value: undefined | boolean | string, html: TemplateResult) {
    if (!value) return null;
    return html;
  }

  predefinedIcons() {
    switch (this.variant) {
      case ('success'):
        return 'check_fill';
      case ('error'):
        return 'close_fill';
      default:
        return this.variant;
    }
  }

  getIcon(): string {
    if (!this.alertIcon) {
      return this.predefinedIcons();
    }
    return this.alertIcon;
  }

  render(): TemplateResult {
    const titleTemp = html`<span class="title">${this.alertTitle}</span>`;
    const linkTemp = html`<bl-button href=${ifDefined(this.actionHref)} target=${ifDefined(this.actionTarget)} kind="text" class="link">${this.actionLabel}</bl-button>`;

    const icon = html`<bl-icon class="icon" name=${this.getIcon()}></bl-icon>`;
    const title = this.shouldRender(this.alertTitle, titleTemp);
    const link = this.shouldRender(this.actionHref && this.actionLabel, linkTemp);

    return html`
        <div class="content">
          <div class="left-content">
            ${icon}
            <div class="text-content">
              ${title}
              <span class="description">${this.alertDescription}</span>
            </div>
          </div>
          ${link}
        </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-alert-item': BlAlertItem;
  }
}
