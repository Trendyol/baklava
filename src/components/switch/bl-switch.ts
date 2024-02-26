import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { event, EventDispatcher } from "../../utilities/event";
import style from "./bl-switch.css";

export const blSwitchTag = "bl-switch";

/**
 * @tag bl-switch
 * @summary Baklava Switch component
 *
 * @cssproperty [--bl-switch-color-on=--bl-color-primary] Set the checked color
 * @cssproperty [--bl-switch-color-off=--bl-color-neutral-lighter] Set the unchecked color
 * @cssproperty [--bl-switch-animation-duration=300ms] Set the animation duration of switch toggle
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
  @event("bl-switch-toggle") private onToggle: EventDispatcher<boolean>;

  toggle() {
    if (this.disabled) return;

    this.checked = !this.checked;
    this.onToggle(this.checked);
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.code === "Enter" || event.code === "Space") {
      this.toggle();
      event.preventDefault();
    }
  }

  render(): TemplateResult {
    const ariaLabel =
      this.ariaLabel ?? this.attributes.getNamedItem("aria-label")?.value ?? undefined;

    return html`
      <label @click=${this.toggle}>
        <slot class="label"></slot>
        <span
          class="switch"
          role="switch"
          aria-checked=${this.checked}
          aria-readonly=${!!this.disabled}
          @keydown=${this.handleKeyDown}
          aria-label=${ifDefined(ariaLabel)}
          tabindex="0"
        >
        </span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [blSwitchTag]: BlSwitch;
  }
}
