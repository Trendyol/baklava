import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import style from './gr-button.css';

/**
 * @tag gr-button
 * @summary Grace Button component
 *
 * @property {boolean} disabled - Disables the button
 * @property {boolean} primary - Sets size to primary
 * @property {boolean} secondary - Sets size to secondary
 * @property {boolean} tertiary - Sets size to tertiary
 * @property {boolean} success - Sets size to success
 * @property {boolean} error - Sets size to error
 * @property {boolean} outline - Sets button outline version
 * @property {string} size - Sets the button size
 * @property {string} link - Sets the button tag, either anchor or button
 * @property {boolean} href - Sets button type to link button
 * @property {boolean} target - Sets button target (should be defined with href)
 *
 * @cssproperty --gr-button-display - Sets the display property of button. Default value is 'inline-flex'.
 *
 * @event {CustomEvent} bl-click
 *
 *
 */

export type ButtonSize = 'small' | 'medium' | 'large';
export type TargetType = '_blank' | '_parent' | '_self' | '_top';

@customElement('gr-button')
export default class GrButton extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  @property({ type: String, attribute: 'size' })
  size: ButtonSize = 'medium';

  @property({ type: String, attribute: 'label' })
  label: string;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: String })
  href?: string;

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
    return !this._hasDefaultSlot && this._hasIconSlot;
  }

  render(): TemplateResult {
    const isAnchor = this.href ? true : false;

    return isAnchor
      ? html`<a
          class="button"
          href=${ifDefined(this.href)}
          target=${ifDefined(this.target)}
          aria-disabled="${ifDefined(this.disabled)}"
          aria-label="${ifDefined(this.label)}"
          role="button"
        >
          <slot name="icon"></slot>
          <slot></slot>
        </a>`
      : html`<button
          class=${classMap({
            'button': true,
            'icon-only': this._isIconOnly,
          })}
          ?disabled=${this.disabled}
          aria-disabled="${ifDefined(this.disabled)}"
          aria-label="${ifDefined(this.label)}"
          @click="${this._handleClick}"
        >
          <slot name="icon"></slot>
          <slot></slot>
        </button>`;
  }

  private _handleClick() {
    this.event('bl-click', 'Click event fired!');
  }

  private event(name: string, detail: string) {
    this.dispatchEvent(
      new CustomEvent(name, { detail, bubbles: true, composed: true })
    );
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
    'gr-button': GrButton;
  }
}
