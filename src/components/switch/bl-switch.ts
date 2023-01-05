import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { customElement, property } from 'lit/decorators.js';
import { event, EventDispatcher } from '../../utilities/event';
import style from './bl-switch.css';

export const blSwitchTag = 'bl-switch';

/**
 * @tag bl-switch
 * @summary Baklava Switch component
 */
@customElement(blSwitchTag)
export default class BlSwitch extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets the checked state for switch
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * Sets the disabled state for switch
   */
  @property({ type: Boolean, reflect: true })
  disabled? = false;

  /**
   * Fires whenever user toggles the switch
   */
  @event('bl-switch-toggle') private onToggle: EventDispatcher<boolean>;

  /**
   * Fires when switch is focused
   */
  @event('bl-focus') private onFocus: EventDispatcher<void>;

  /**
   * Fires when switch is blurred
   */
  @event('bl-blur') private onBlur: EventDispatcher<void>;

  connectedCallback(): void {
    super.connectedCallback();
    if (!this.disabled) {
      this.addEventListener('keydown', this.handleKeyDown);
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.handleKeyDown);
  }

  /**
   * Focuses this option
   */
  focus() {
    this.onFocus();
  }

  /**
   * Blurs from this option
   */
  blur() {
    this.onBlur();
  }

  private handleToggle() {
    if (this.disabled) return;

    this.checked = !this.checked;
    this.onToggle(this.checked);
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'Enter' || event.code === 'Space') {
      this.handleToggle();
      event.preventDefault();
      return;
    }
  }

  render(): TemplateResult {
    const tabIndex = this.disabled ? undefined : "0";

    return html`
      <span
        class="switch"
        role="switch"
        aria-checked=${this.checked}
        aria-readonly=${!!this.disabled}
        @click=${this.handleToggle}
        @focus=${this.focus}
        @blur=${this.blur}
        tabindex=${ifDefined(tabIndex)}
      >
        <span></span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [blSwitchTag]: BlSwitch;
  }
}
