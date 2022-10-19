import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import style from './bl-toast.css';
import '../icon/bl-icon';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../progress-indicator/bl-progress-indicator';

export type ToastVariant = 'info' | 'warning' | 'success' | 'danger';
export type PositionVariant = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

/**
 * @tag bl-toast
 * @summary Baklava Toast component
 */

@customElement('bl-toast')
export default class BlToast extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets toast variant
   */
  @property({ reflect: true })
  variant: ToastVariant = 'info';

  /**
   * Sets toast variant
   */
  @property({ reflect: true })
  position: PositionVariant = 'top-right';

  /**
   * Sets toast description
   */
  @property()
  description?: 'string';

  /**
   * Sets toast components display state.
   */
  @property({ type: Boolean, reflect: true })
  closed = false;

  @state() private progressValue = 100;

  private _getIcon() {
    switch (this.variant) {
      case 'success':
        return 'check_fill';
      case 'danger':
        return 'close_fill';
      case 'info':
        return 'info';
      case 'warning':
        return 'warning';
    }
  }

  render(): TemplateResult {
    const id = setInterval(() => {
      if (this.progressValue <= 0 || this.closed) {
        clearInterval(id);
        this.closed = true;
      } else {
        this.progressValue = this.progressValue - 0.005;
      }
    }, 1);

    return html`
      <div class="toast">
        <div class="wrapper">
          <div class="content">
            <bl-icon class="icon" name=${ifDefined(this._getIcon())}></bl-icon>
            <div class="text-content">
              <span class="description">
                <slot>${this.description}</slot>
              </span>
            </div>
          </div>
        </div>
        <bl-progress-indicator
          translucent
          noBorderRadius
          value=${this.progressValue}
        ></bl-progress-indicator>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-toast': BlToast;
  }
}
