import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import style from "./bl-progress-indicator.css";

export type ProgressIndicatorSize = "small" | "medium" | "large";

/**
 * @tag bl-progress-indicator
 * @summary Baklava Progress Indicator component
 *
 * @cssproperty [--bl-progress-indicator-transition-duration=.2s] Duration of the transition of progress bar
 * @property {max} [max=100]
 * @property {number} [value=0]
 */

@customElement("bl-progress-indicator")
export default class BlProgressIndicator extends LitElement {
  static get styles(): CSSResultGroup {
    return style;
  }

  @query(".progress-indicator") private wrapper: HTMLElement;

  /**
   * Sets the size
   */
  @property({ type: String, reflect: true })
  size: ProgressIndicatorSize = "medium";

  /**
   * Sets the status
   */
  @property({ type: Boolean, reflect: true })
  failed = false;

  /**
   * Sets the max
   */
  @property({ type: Number })
  get max() {
    return this._max;
  }
  set max(max: number) {
    this._max = max;
    this.updateCssVariable();
  }

  /**
   * Sets the value
   */
  @property({ type: Number })
  get value() {
    return this._value;
  }
  set value(value: number) {
    this._value = value;
    this.updateCssVariable();
  }

  @state() private _max = 100;
  @state() private _value = 0;

  async updateCssVariable() {
    await this.updateComplete;
    this.wrapper.style.setProperty("--value", `${this.value}`);
    this.wrapper.style.setProperty("--max", `${this.max}`);
  }

  render(): TemplateResult {
    return html`<div
      class="progress-indicator"
      role="progressbar"
      aria-label="progress indicator"
      aria-valuemax="${this._max}"
      aria-valuenow="${this._value}"
    ></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bl-progress-indicator": BlProgressIndicator;
  }
}
