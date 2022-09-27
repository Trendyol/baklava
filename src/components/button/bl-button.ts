import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { event, EventDispatcher } from '../../utilities/event';
import style from './bl-button.css';
import '../icon/bl-icon';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger';
export type ButtonKind = 'contained' | 'outline' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';
export type TargetType = '_blank' | '_parent' | '_self' | '_top';

/**
 * @tag bl-button
 * @summary Baklava Button component
 *
 * @cssproperty --bl-button-display - Sets the display property of button. Default value is 'inline-block'.
 *
 */
@customElement('bl-button')
export default class BlButton extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets the button variant
   */
  @property({ type: String, reflect: true })
  variant: ButtonVariant = 'primary';

  /**
   * Sets the button kind
   */
  @property({ type: String, reflect: true })
  kind: ButtonKind = 'contained';

  /**
   * Sets the button size
   */
  @property({ type: String, reflect: true })
  size: ButtonSize = 'medium';

  /**
   * Sets the button label. Used for accessibility.
   */
  @property({ type: String })
  label: string;

  /**
   * Sets button as disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Set link url. If set, button will be rendered as anchor tag.
   */
  @property({ type: String })
  href?: string;

  /**
   * Sets the icon name. Shows icon with bl-icon component
   */
  @property({ type: String })
  icon?: string;

  /**
   * Sets the anchor target. Used when `href` is set.
   */
  @property({ type: String })
  target?: TargetType = '_self';

  /**
   * Sets the type of the button. Set `submit` to use button as the submitter of parent form.
   */
   @property({ type: String })
   type: 'submit' | null;

  /**
   * Fires when button clicked
   */
  @event('bl-click') private onClick: EventDispatcher<string>;

  get _hasIconSlot() {
    return this.querySelector(':scope > [slot="icon"]') !== null;
  }

  get _hasDefaultSlot() {
    const childNodes = [...this.childNodes];
    return childNodes.some(node => {
      const nodeType = node.nodeType;
      // has only text node.
      if (nodeType === node.TEXT_NODE && node.textContent?.trim() !== '') {
        return true;
      }
      // has element node, it should not have slot attribute.
      if (nodeType === node.ELEMENT_NODE) {
        if (!(node as HTMLElement).hasAttribute('slot')) {
          return true;
        }
      }
      return false;
    });
  }

  render(): TemplateResult {
    const isAnchor = !!this.href;
    const icon = this.icon ? html`<bl-icon name=${this.icon}></bl-icon>` : '';
    const slots = html`<slot name="icon">${icon}</slot> <span class="label"><slot></slot></span>`;
    const classes = classMap({
      'button': true,
      'has-icon': this.icon || this._hasIconSlot,
      'has-content': this._hasDefaultSlot,
    });

    return isAnchor
      ? html`<a
          class=${classes}
          aria-disabled="${ifDefined(this.disabled)}"
          aria-label="${ifDefined(this.label)}"
          href=${ifDefined(this.href)}
          target=${ifDefined(this.target)}
          role="button"
          >${slots}</a
        >`
      : html`<button
          class=${classes}
          aria-disabled="${ifDefined(this.disabled)}"
          aria-label="${ifDefined(this.label)}"
          ?disabled=${this.disabled}
          @click="${this._handleClick}"
        >
          ${slots}
        </button>`;
  }

  private _handleClick() {
    this.onClick('Click event fired!');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-button': BlButton;
  }
}
