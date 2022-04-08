import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import componentStyles from './gr-button.styles';

export type ButtonVariant = 'primary' | 'secondary';

/**
 * @tag gr-button
 * @summary Grace Button component
 *
 * @property {boolean} disabled - Disables the button
 * @property {string} variant - Sets the button variant
 *
 * @cssproperty --primary-color - Sets the primary color
 *
 * @event {CustomEvent} gr-blur - dsdasda
 *
 */
@customElement('gr-button')
export class GrButton extends LitElement {
  static styles: CSSResultGroup = [componentStyles];

  @state() private hasFocus = false;

  @property({ type: String, attribute: 'variant' })
  variant: ButtonVariant = 'primary';

  @property({ type: Boolean, attribute: 'disabled' })
  disabled = false;

  private handleFocus() {
    this.hasFocus = true;

    const event = new CustomEvent('gr-focus', {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {},
    });

    this.dispatchEvent(event);
  }

  private handleBlur() {
    this.hasFocus = false;

    const event = new CustomEvent('gr-blur', {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {},
    });

    this.dispatchEvent(event);
  }

  private handleClick(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
  }

  render(): TemplateResult {
    return html` <button
      class=${classMap({
        'button': true,
        'button--primary': this.variant === 'primary',
        'button--secondary': this.variant === 'secondary',
        'button--disabled': this.disabled,
        'button--focused': this.hasFocus,
      })}
      type="button"
      @focus=${this.handleFocus}
      @blur=${this.handleBlur}
      @click=${this.handleClick}
    >
      <slot></slot>
    </button>`;
  }

  updated() {
    if (this.hasAttribute('is-disabled')) {
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
