import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { event, EventDispatcher } from '../../utilities/event';
import style from './bl-alert-group.css';
import '../icon/bl-icon';
export type AlertVariant = 'info' | 'warning' | 'success' | 'error';

/**
 * @tag bl-alert-group
 * @summary Baklava Alert Group component
 */

@customElement('bl-alert-group')
export default class BlAlertGroup extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  @state()
  private activeIndex = 0;

  @state()
  private childLength = 0;

  @property()
  variant: AlertVariant = 'info';

  @property({type: Boolean})
  closable = false;


  @event('bl-close') private onClose: EventDispatcher<boolean>;

  closeHandler() {
    this.onClose(true);
  }

  incrementHandler() {
    const childLength = 0;
    if (this.activeIndex + 1 < childLength) {
      this.activeIndex++;
      return;
    }
    this.activeIndex = 0;
  }

  decrementHandler() {
    const childLength = 0;
    if (this.activeIndex > 0) {
      this.activeIndex--;
      return;
    }
    this.activeIndex = childLength - 1;
  }

  shouldRender(value: undefined | boolean | string, html: TemplateResult) {
    if (!value) return null;
    return html;
  }

  render(): TemplateResult {
    const closableTemp = html`<bl-icon @click=${this.closeHandler} class="close" name="close"></bl-icon>`;
    const paginationTemp = html`
    <div class="pagination">
      <bl-icon @click="${this.decrementHandler}" class="arrow" name="arrow_left"></bl-icon>
      <div class="counter">
        <span class="page-number" >${this.activeIndex + 1}</span>
        <span>/</span>
        <span class="page-number">${this.childLength}</span>
      </div>
      <bl-icon @click="${this.incrementHandler}" class="arrow" name="arrow_right"></bl-icon>
    </div>
    `;
    const closable = this.shouldRender(this.closable, closableTemp);
    const pagination = this.shouldRender(this.childLength > 1, paginationTemp);
    const actionsTemp = html `
      <div class="actions">
        ${pagination}
        ${closable}
      </div>`;
    const actions = this.shouldRender(!!pagination || !!closable, actionsTemp);
    return html`
      <div class="alert">
        <slot class="alert-content"></slot>
        ${actions}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-alert-group': BlAlertGroup;
  }
}
