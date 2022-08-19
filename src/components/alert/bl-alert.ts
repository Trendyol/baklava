import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { event, EventDispatcher } from '../../utilities/event';
import '../icon/bl-icon';
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
  icon: string;

  @property({type: Boolean})
  hideIcon = false;

  @property({type: Boolean})
  closable = false;

  @property()
  title: string;

  @event('close') private onClose: EventDispatcher<string>;

  closeHandler() {
    this.onClose('close clicked!')
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

  getIcon() {
    if (!this.icon) {
      return this.predefinedIcons();
    }
    return this.icon;
  }

  render(): TemplateResult {
    const titleTemp = this.title ? html`<span class="title">${this.title}</span>` : null;
    const iconTemp = !this.hideIcon ? html`<bl-icon class="icon" name=${this.getIcon()}></bl-icon>` : null;
    const closableTemp = this.closable ? html`<bl-icon @click=${this.closeHandler} class="close" name="close"></bl-icon>` : null;

    return html`
      <div class="alert">
        <div class="content">
          ${iconTemp}
          <div class="text-content">
            ${titleTemp}
            <span class="description">${this.description}</span>
          </div>
        </div>
        <div class="actions">
          ${closableTemp}
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
