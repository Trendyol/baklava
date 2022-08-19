import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { event, EventDispatcher } from '../../utilities/event';
import style from './bl-alert.css';
import '../icon/bl-icon';
import "../button/bl-button";

export type AlertVariant = 'info' | 'warning' | 'success' | 'error';
export type TargetType = '_blank' | '_parent' | '_self' | '_top';

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
  icon?: string;

  @property({type: Boolean})
  hideIcon = false;

  @property({type: Boolean})
  closable = false;

  @property()
  title: string;

  @property()
  actionLabel: string;

  @property()
  href: string;

  @property()
  target: TargetType = '_blank';

  @event('close') private onClose: EventDispatcher<string>;

  closeHandler() {
    this.onClose('close clicked!')
  }

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
    if (!this.icon) {
      return this.predefinedIcons();
    }
    return this.icon;
  }

  render(): TemplateResult {
    const titleTemp = html`<span class="title">${this.title}</span>`;
    const iconTemp = html`<bl-icon class="icon" name=${this.getIcon()}></bl-icon>`;
    const closableTemp = html`<bl-icon @click=${this.closeHandler} class="close" name="close"></bl-icon>`;
    const linkTemp = html`<bl-button href=${this.href} target=${this.target} kind="text" class="link">${this.actionLabel}</bl-button>`;

    const title = this.shouldRender(this.title, titleTemp);
    const icon = this.shouldRender(!this.hideIcon, iconTemp);
    const closable = this.shouldRender(this.closable, closableTemp);
    const link = this.shouldRender(this.href && this.actionLabel, linkTemp);

    return html`
      <div class="alert">
        <div class="content">
          <div class="left-content">
            ${icon}
            <div class="text-content">
              ${title}
              <span class="description">${this.description}</span>
            </div>
          </div>
          ${link}
        </div>
        <div class="actions">
          ${closable}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-alert': BlAlert;
  }
}
