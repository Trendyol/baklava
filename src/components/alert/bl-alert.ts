import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { event, EventDispatcher } from '../../utilities/event';
import style from './bl-alert.css';
import '../icon/bl-icon';
import { ifDefined } from 'lit/directives/if-defined.js';
import { stringBooleanConverter } from '../../utilities/string-boolean.converter';
import { ButtonVariant, ButtonKind, ButtonSize } from '../button/bl-button';
import { classMap } from 'lit/directives/class-map.js';

export type AlertVariant = 'info' | 'warning' | 'success' | 'danger';

/**
 * @tag bl-alert
 * @summary Baklava Alert component
 */

@customElement('bl-alert')
export default class BlAlert extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets alert variant
   */
  @property({ reflect: true })
  variant: AlertVariant = 'info';

  /**
   * Sets alert description
   */
  @property()
  description?: 'string';

  /**
   * Allows to customize alert icon
   */
  @property({ converter: stringBooleanConverter() })
  icon?: boolean | string;

  /**
   * Displays a close button.
   */
  @property({ type: Boolean, reflect: true })
  closable = false;

  /**
   * Sets alert caption.
   */
  @property()
  caption?: string;

  /**
   * Sets alert components display state.
   */
  @property({ type: Boolean, reflect: true })
  closed = false;

  /**
   * Opens alert component.
   */
  public open() {
    this.closed = false;
  }

  /**
   * Closes alert component.
   */
  public close() {
    this.closed = true;
  }

  /**
   * Fires when close button clicked.
   */
  @event('bl-close') private onClose: EventDispatcher<boolean>;

  private get _hasAlertCaptionSlot() {
    return this.querySelector(':scope > [slot="caption"]') !== null;
  }

  private _closeHandler() {
    this.closed = true;
    this.onClose(true);
  }

  private _predefinedIcons() {
    switch (this.variant) {
      case 'success':
        return 'check_fill';
      case 'danger':
        return 'close_fill';
      default:
        return this.variant;
    }
  }

  private _getIcon(): string | undefined {
    if (!this.icon) return;
    if (this.icon === true) return this._predefinedIcons();
    return this.icon;
  }

  private _initAlertActionSlot(event: Event) {
    const slotElements = (event.target as HTMLSlotElement).assignedElements();
    slotElements.forEach(element => {
      if (element.tagName !== 'BL-BUTTON') {
        element.parentNode?.removeChild(element);
        return;
      }
      element.setAttribute('variant','tertiary' as ButtonVariant);
      element.setAttribute('kind', 'neutral' as ButtonKind);
      element.setAttribute('size', 'medium' as ButtonSize);
      element.removeAttribute('icon');
    });
  }

  render(): TemplateResult {
    const caption =
      this.caption || this._hasAlertCaptionSlot
        ? html`<span class="caption">
            <slot name="caption"> ${this.caption} </slot>
          </span>`
        : null;
    const icon = this._getIcon()
      ? html`<bl-icon class="icon" name=${ifDefined(this._getIcon())}></bl-icon>`
      : null;

    const closeClasses = classMap({
      'close': true,
      'close-spaced': !!caption,
    });

    const closable = this.closable
      ? html`<bl-button
          class=${closeClasses}
          label="close"
          variant="tertiary"
          kind="neutral"
          icon="close"
          variant="secondary"
          @click=${this._closeHandler}
        ></bl-button>`
      : null;
    const description = html`<span class="description">
      <slot> ${this.description} </slot>
    </span>`;

    return html`
      <div class="alert">
        <div class="wrapper">
          <div class="content">
            ${icon}
            <div class="text-content">${caption} ${description}</div>
          </div>
          <slot class="action" name="action" @slotchange=${this._initAlertActionSlot}></slot>
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
