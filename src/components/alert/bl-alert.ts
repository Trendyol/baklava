import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { event, EventDispatcher } from '../../utilities/event';
import style from './bl-alert.css';
import '../icon/bl-icon';
import "../button/bl-button";
import { ifDefined } from 'lit/directives/if-defined.js';
import { iconConverter } from './icon.converter';

export type AlertVariant = 'info' | 'warning' | 'success' | 'error';

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
  variant: AlertVariant = 'info';

  @property({ attribute: 'alert-description' })
  alertDescription: 'string';

  @property({ converter: iconConverter() })
  icon?: boolean | string;

  @property({type: Boolean})
  closable = false;

  @property({ attribute: 'alert-title' })
  alertTitle?: string;

  @event('bl-close') private onClose: EventDispatcher<boolean>;

  closeHandler() {
    this.onClose(true);
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

  getIcon(): string | undefined {
    if (!this.icon) return;
    if (typeof this.icon === 'boolean') {
      return this.predefinedIcons();
    }
    return this.icon;
  }

  render(): TemplateResult {
    const titleTemp = html`<span class="title">${this.alertTitle}</span>`;
    const iconTemp = html`<bl-icon class="icon" name=${ifDefined(this.getIcon())}></bl-icon>`;
    const closableTemp = html`<bl-icon @click=${this.closeHandler} class="close" name="close"></bl-icon>`;

    const title = this.shouldRender(this.alertTitle, titleTemp);
    const icon = this.shouldRender(this.getIcon(), iconTemp);
    const closable = this.shouldRender(this.closable, closableTemp);

    const actionsTemp = html `
      <div class="actions">
        ${closable}
      </div>`;
    const actions = this.shouldRender(!!closable, actionsTemp);

    return html`
      <div class="alert">
        <div class="content">
          <div class="left-content">
            ${icon}
            <div class="text-content">
              ${title}
              <span class="description">
                <slot>
                  ${this.alertDescription}
                </slot>
              </span>
            </div>
          </div>
          <slot name="action"></slot>
        </div>
        ${actions}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-alert': BlAlert;
  }
}
