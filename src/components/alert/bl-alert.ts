import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { event, EventDispatcher } from '../../utilities/event';
import style from './bl-alert.css';
import '../icon/bl-icon';
import "../button/bl-button";
import { TargetType } from '../button/bl-button';
import { ifDefined } from 'lit/directives/if-defined.js';

export type AlertVariant = 'info' | 'warning' | 'success' | 'error';
type AlertItem = {
  alertTitle?: string,
  icon?: string,
  href?: string,
  target?: TargetType,
  actionLabel?: string,
  description?: string,
  variant: AlertVariant,
};

/**
 * @tag bl-alert
 * @summary Baklava Alert component
 */

@customElement('bl-alert')
export default class BlAlert extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  @state()
  private activeIndex = 0;

  @state()
  private currentItem: AlertItem;

  @state()
  private model: Array<AlertItem>;

  @property({type: Object})
  item?: AlertItem;

  @property({type: Array})
  items?: Array<AlertItem>;

  @property()
  variant: AlertItem["variant"] = 'success';

  @property()
  description?: AlertItem["description"];

  @property()
  icon?: AlertItem["icon"];

  @property({type: Boolean})
  hideIcon = false;

  @property({type: Boolean})
  closable = false;

  @property({ attribute: 'title' })
  alertTitle?: AlertItem["alertTitle"];

  @property()
  actionLabel?: AlertItem["actionLabel"];

  @property()
  href?: AlertItem["href"];

  @property()
  target?: AlertItem["target"] = '_blank';

  @event('close') private onClose: EventDispatcher<boolean>;

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

  getIcon(): string {
    if (!this.currentItem.icon) {
      return this.predefinedIcons();
    }
    return this.currentItem.icon;
  }

  mergeInitialValues(object?: AlertItem) {
    const initialValues = {
      alertTitle: this.alertTitle,
      description: this.description,
      icon: this.icon,
      href: this.href,
      target: this.target,
      actionLabel: this.actionLabel,
      variant: this.variant,
    };
    return {
      ...initialValues,
      ...object
    }
  }

  initModel() {
    if (this.items) {
      return this.items.map(item => this.mergeInitialValues(item));
    }
    if (this.item) {
      return [this.mergeInitialValues(this.item)];
    }
    return [this.mergeInitialValues()];
  }

  incrementHandler() {
    const modelLength = this.model.length;
    if (this.activeIndex + 1 < modelLength) {
      this.activeIndex++;
      return;
    }
    this.activeIndex = 0;
  }

  decrementHandler() {
    const modelLength = this.model.length;
    if (this.activeIndex > 0) {
      this.activeIndex--;
      return;
    }
    this.activeIndex = modelLength - 1;
  }

  render(): TemplateResult {
    this.model = this.initModel();
    this.currentItem = this.model[this.activeIndex];
    const titleTemp = html`<span class="title">${this.currentItem.alertTitle}</span>`;
    const iconTemp = html`<bl-icon class="icon" name=${this.getIcon()}></bl-icon>`;
    const closableTemp = html`<bl-icon @click=${this.closeHandler} class="close" name="close"></bl-icon>`;
    const linkTemp = html`<bl-button href=${ifDefined(this.href)} target=${ifDefined(this.currentItem.target)} kind="text" class="link">${this.currentItem.actionLabel}</bl-button>`;
    const paginationTemp = html`
    <div class="pagination">
      <bl-icon @click="${this.decrementHandler}" class="arrow" name="arrow_left"></bl-icon>
      <div class="counter">
        <span>${this.activeIndex + 1}</span>
        <span class="separator">/</span>
        <span>${this.model.length}</span>
      </div>
      <bl-icon @click="${this.incrementHandler}" class="arrow" name="arrow_right"></bl-icon>
    </div>
    `;

    const title = this.shouldRender(this.currentItem.alertTitle, titleTemp);
    const icon = this.shouldRender(!this.hideIcon, iconTemp);
    const closable = this.shouldRender(this.closable, closableTemp);
    const link = this.shouldRender(this.currentItem.href && this.currentItem.actionLabel, linkTemp);
    const pagination = this.shouldRender(this.model.length > 1, paginationTemp);

    return html`
      <div class="alert">
        <div class="content">
          <div class="left-content">
            ${icon}
            <div class="text-content">
              ${title}
              <span class="description">${this.currentItem.description}</span>
            </div>
          </div>
          ${link}
        </div>
        <div class="actions">
          ${pagination}
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
