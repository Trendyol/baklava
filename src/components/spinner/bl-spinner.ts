import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import style from "./bl-spinner.css";

export type SpinnerSize =
  | "xxsmall"
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "xxlarge";

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
  size: SpinnerSize = "medium";

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

  render(): TemplateResult {
    return html`
      <div class="spinner">
        <svg
          class="light"
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
        >
          <path
            opacity="0.3"
            d="M48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24ZM7.2 24C7.2 33.2784 14.7216 40.8 24 40.8C33.2784 40.8 40.8 33.2784 40.8 24C40.8 14.7216 33.2784 7.2 24 7.2C14.7216 7.2 7.2 14.7216 7.2 24Z"
          />
        </svg>
        <svg
          class="dark"
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
        >
          <path
            d="M44.4 24C46.3882 24 48.0276 22.3794 47.7305 20.4135C47.4407 18.4957 46.9187 16.6157 46.1731 14.8156C44.967 11.9038 43.1992 9.25804 40.9706 7.02944C38.742 4.80083 36.0962 3.033 33.1844 1.82689C31.3843 1.08127 29.5043 0.559345 27.5865 0.269497C25.6206 -0.0276231 24 1.61178 24 3.6C24 5.58822 25.6298 7.16145 27.5725 7.58425C28.5471 7.79634 29.5032 8.09531 30.4291 8.47882C32.4674 9.3231 34.3194 10.5606 35.8794 12.1206C37.4394 13.6806 38.6769 15.5326 39.5212 17.5709C39.9047 18.4968 40.2037 19.4529 40.4158 20.4275C40.8386 22.3702 42.4118 24 44.4 24Z"
          />
        </svg>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [blSpinnerTag]: BlSpinner;
  }
}
