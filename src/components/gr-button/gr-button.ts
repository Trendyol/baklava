import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import style from './gr-button.styles';

export type ButtonVariant = 'primary' | 'secondary';

/**
 * @tag gr-button
 * @summary Grace Button component
 *
 * @property {boolean} disabled - Disables the button
 * @property {boolean} medium - Sets size to medium
 * @property {boolean} small - Sets size to small
 * @property {string} variant - Sets the button variant
 *
 * @cssproperty --gr-button-size - Sets the height of button. 40px or 32px
 *
 * @event {CustomEvent} gr-blur - dsdasda
 *
 */
@customElement('gr-button')
export class GrButton extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  @state() private hasFocus = false;

  @property({ type: String })
  variant: ButtonVariant = 'primary';

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  medium = false;

  @property({ type: Boolean })
  small = false;

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
        'button--focused': this.hasFocus,
      })}
      ?disabled=${this.disabled}
      type="button"
      @focus=${this.handleFocus}
      @blur=${this.handleBlur}
      @click=${this.handleClick}
    >
      <slot></slot>
    </button>`;
  }

  updated() {
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
