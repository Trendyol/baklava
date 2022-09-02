import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { event, EventDispatcher } from '../../utilities/event';
import style from './bl-alert.css';
import '../icon/bl-icon';
import { ifDefined } from 'lit/directives/if-defined.js';
import { iconConverter } from './icon.converter';
import { ButtonVariant, ButtonKind, ButtonSize } from '../button/bl-button';

export type AlertVariant = 'info' | 'warning' | 'success' | 'error';

/**
 * @tag bl-alert
 * @summary Baklava Alert component
 *
 * @cssproperty --bl-alert-display - Sets the display property of button. Default value is 'inline-block'.
 *
 */

@customElement('bl-alert')
export default class BlAlert extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  @property()
  variant: AlertVariant = 'info';

  @property()
  description: 'string';

  @property({ converter: iconConverter() })
  icon?: boolean | string;

  @property({type: Boolean})
  closable = false;

  @property()
  caption?: string;

  @property({ type: Boolean, reflect: true })
  hidden = false;

  @event('bl-close') private onClose: EventDispatcher<boolean>;

  get _hasAlertCaptionSlot() {
    return this.querySelector(':scope > [slot="caption"]') !== null;
  }

  get _getAlertActionSlot() {
    return this.querySelector(':scope > [slot="action"]');
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
    actionSlot.setAttribute('size','medium' as ButtonSize);
    actionSlot.removeAttribute('icon');
  }

  render(): TemplateResult {
    this.initAlertActionSlot();
    const captionTemp = html`<span class="caption"><slot name="caption">${this.caption}</slot></span>`;
    const iconTemp = html`<bl-icon class="icon" name=${ifDefined(this.getIcon())}></bl-icon>`;
    const closableTemp = html`<bl-button kind="text" icon="close" variant="secondary" @click=${this.closeHandler}></bl-button>`;

    const caption = this.shouldRender((this.caption || this._hasAlertCaptionSlot), captionTemp);
    const icon = this.shouldRender(this.getIcon(), iconTemp);
    const closable = this.shouldRender(this.closable, closableTemp);
    const description = html`<span class="description">
      <slot>
        ${this.description}
      </slot>
    </span>`

    return html`
      <div class="alert">
        <div class="wrapper">
          <div class="content">
            ${icon}
            <div class="text-content">
              ${caption}
              ${description}
            </div>
          </div>
          <slot name="action"></slot>
        </div>
        ${closable}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-alert': BlAlert;
  }
}
