import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../icon/bl-icon";
import style from "./bl-spinner.css";

export const blSpinnerTag = "bl-spinner";
/**
 * @tag bl-spinner
 * @summary Baklava Spinner component
 *
 */
@customElement(blSpinnerTag)
export default class BlSpinner extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets the spinner size
   */
  @property({ type: String, reflect: true })
  size = "var(--bl-font-size-m)";

  /**
   * Sets the disabled state for spinner
   */
  @property({ type: Boolean, reflect: true })
  disabled? = false;

  /**
   * Sets the overlay state for spinner
   */
  @property({ type: Boolean, reflect: true })
  overlay? = false;

  /**
   * Sets the color of the spinner
   */
  @property({ type: String, reflect: true })
  color: string = "var(--bl-color-primary)";

  render(): TemplateResult {
    return html`<bl-icon
      class="spinner"
      name="loading"
      style="color: ${this.disabled
        ? "var(--bl-color-neutral-light)"
        : this.color}; font-size: ${this.size};"
    ></bl-icon>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [blSpinnerTag]: BlSpinner;
  }
}
