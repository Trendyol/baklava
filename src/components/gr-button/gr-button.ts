import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
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
 *
 * test edelim cikti ile.
 * @cssproperty --gr-button-display - Sets the display property of button. Default value is 'inline-block'.
 *
 * @event {CustomEvent} gr-blur - dsdasda
 *
 */

export type ButtonSize = 'small' | 'medium' | 'large';

@customElement('gr-button')
export default class GrButton extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  @property({ type: String, attribute: 'size' })
  size: ButtonSize = 'medium';

  @property({ type: Boolean })
  primary = false;

  @property({ type: Boolean })
  secondary = false;

  @property({ type: Boolean })
  tertiary = false;

  @property({ type: Boolean })
  success = false;

  @property({ type: Boolean })
  error = false;

  @property({ type: Boolean })
  disabled = false;

  /*
   * default slot bossa ve icon slotu varsa icon-only mod calisir ve paddingler degisir
   * icon slotuna sadece gr-icon componenti gelebilmesini kontrol edebilsek iyi olur
   * Default slot ve icon slotunun sirasi onemsizdir. icon her turlu solda gorunur
   * user select none btn.
   */

  @state() hasIcon: boolean;

  render(): TemplateResult {
    return html` <button
      class=${classMap({
        button: true,
      })}
      aria-disabled="${ifDefined(this.disabled)}"
      type="button"
    >
      <slot></slot>
    </button>`;
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
