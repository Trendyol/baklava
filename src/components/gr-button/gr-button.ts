import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import componentStyles from './gr-button.styles';

export type ButtonVariant = 'primary' | 'secondary';

/**
 * The Gr Button component
 * @element gr-button
 */
@customElement('gr-button')
export class GrButton extends LitElement {
  static styles: CSSResultGroup = [componentStyles];

  @state() private hasFocus = false;

  @property({ type: String, attribute: 'variant' })
  variant: ButtonVariant = 'primary';

  @property({ type: Boolean, attribute: 'is-disabled' })
  isDisabled = false;

  @property() onFocus: () => void;
  @property() onBlur: () => void;
  @property() onClick: () => void;

  handleFocus() {
    this.hasFocus = true;

    const event = new CustomEvent('gr-focus', {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {},
    });

    this.dispatchEvent(event);
  }

  handleBlur() {
    this.hasFocus = false;

    const event = new CustomEvent('gr-blur', {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {},
    });

    this.dispatchEvent(event);
  }

  handleClick(event: MouseEvent) {
    if (this.isDisabled) {
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
        'button--disabled': this.isDisabled,
        'button--focused': this.hasFocus,
      })}
      type="button"
      @focus=${this.handleFocus}
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
