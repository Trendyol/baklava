import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import style from './bl-button.css';
import '../icon/bl-icon';

export type ButtonSize = 'small' | 'medium' | 'large';
export type TargetType = '_blank' | '_parent' | '_self' | '_top';

/**
 * @tag bl-button
 * @summary Baklava Button component
 *
 * @property {boolean} primary - Sets variant to primary
 * @property {boolean} secondary - Sets variant to secondary
 * @property {boolean} success - Sets variant to success
 * @property {boolean} danger - Sets variant to danger
 * @property {boolean} outline - Sets button version to outline
 * @property {boolean} disabled - Disables the button
 * @property {boolean} link - Sets the button text style
 * @property {string} size - Sets the button size
 * @property {string} icon - Sets the name of the icon
 * @property {string} href - Sets link of the button
 * @property {string} target - Sets button target (should be defined with href)
 * @property {string} label - Sets the accessibility text for the button. Use it with icon-only buttons.
 *
 * @cssproperty --bl-button-display - Sets the display property of button. Default value is 'inline-block'.
 *
 * @event {CustomEvent} bl-click
 *
 */
@customElement('bl-button')
export default class BlButton extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  @property({ type: Boolean, reflect: true })
  primary = false;

  @property({ type: Boolean, reflect: true })
  secondary = false;

  @property({ type: Boolean, reflect: true })
  success = false;

  @property({ type: Boolean, reflect: true })
  danger = false;

  @property({ type: Boolean, reflect: true })
  outline = false;

  @property({ type: String, reflect: true })
  size: ButtonSize = 'medium';

  @property({ type: String })
  label: string;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  href?: string;

  @property({ type: String })
  icon?: string;

  @property({ type: String })
  target?: TargetType = '_self';

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

  get _isIconOnly() {
    return !this._hasDefaultSlot && (this.icon || this._hasIconSlot);
  }

  render(): TemplateResult {
    const isAnchor = this.href ? true : false;
    const icon = this.icon ? html`<bl-icon name=${this.icon}></bl-icon>` : '';
    const slots = html`<slot name="icon">${icon}</slot> <span class="label"><slot></slot></span>`;

    return isAnchor
      ? html`<a
          class="button ${classMap({
            'icon-only': this._isIconOnly,
          })}"
          aria-disabled="${ifDefined(this.disabled)}"
          aria-label="${ifDefined(this.label)}"
          href=${ifDefined(this.href)}
          target=${ifDefined(this.target)}
          role="button"
          >${slots}</a
        >`
      : html`<button
          class="button ${classMap({
            'icon-only': this._isIconOnly,
          })}"
          aria-disabled="${ifDefined(this.disabled)}"
          aria-label="${ifDefined(this.label)}"
          ?disabled=${this.disabled}
          @click="${this._handleClick}"
        >
          ${slots}
        </button>`;
  }

  private _handleClick() {
    this.event('bl-click', 'Click event fired!');
  }

  private event(name: string, detail: string) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  updated() {
    // if element has disabled attribute, aria-disabled will be true, otherwise false.
    if (this.hasAttribute('disabled')) {
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.setAttribute('aria-disabled', 'false');
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-button': BlButton;
  }
}
