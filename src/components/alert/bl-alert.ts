import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { event, EventDispatcher } from '../../utilities/event';
import style from './bl-alert.css';
import '../icon/bl-icon';
import { ifDefined } from 'lit/directives/if-defined.js';
import { iconConverter } from './icon.converter';
import { ButtonVariant, ButtonKind } from '../button/bl-button';

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

  @property({ type: Boolean, reflect: true })
  hidden = false;

  @event('bl-close') private onClose: EventDispatcher<boolean>;

  get _hasAlertTitleSlot() {
    return this.querySelector(':scope > [slot="alert-title"]') !== null;
  }

  get _getAlertActionSlot() {
    return this.querySelector(':scope > [slot="alert-action"]');
  }

  closeHandler() {
    this.hidden = true;
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

  initAlertActionSlot() {
    const actionSlot = this._getAlertActionSlot;
    if(!actionSlot) return;
    if(actionSlot?.tagName !== 'BL-BUTTON') throw new Error("Action slot must contain bl-button component as child!");
    actionSlot.setAttribute('variant','secondary' as ButtonVariant);
    actionSlot.setAttribute('kind','text' as ButtonKind);
    actionSlot.removeAttribute('icon');
  }

  render(): TemplateResult {
    this.initAlertActionSlot();
    const titleTemp = html`<span class="title"><slot name="alert-title">${this.alertTitle}</slot></span>`;
    const iconTemp = html`<bl-icon class="icon" name=${ifDefined(this.getIcon())}></bl-icon>`;
    const closableTemp = html`<bl-button kind="text" icon="close" variant="secondary" @click=${this.closeHandler}></bl-button>`;

    const title = this.shouldRender((this.alertTitle || this._hasAlertTitleSlot), titleTemp);
    const icon = this.shouldRender(this.getIcon(), iconTemp);
    const closable = this.shouldRender(this.closable, closableTemp);

    const actionsTemp = html `
      <div class="actions">
        ${closable}
      </div>`;
    const actions = this.shouldRender(!!closable, actionsTemp);

    return html`
      <div class="alert">
        <div class="wrapper">
          <div class="content">
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
          <slot name="alert-action"></slot>
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
