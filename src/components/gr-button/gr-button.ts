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
    >
      <slot></slot>
    </button>`;
  }  
}

declare global {
  interface HTMLElementTagNameMap {
    'gr-button': GrButton;
  }
}
