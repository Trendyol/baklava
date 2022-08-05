import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import style from './bl-progress-indicator.css';

export type ProgressIndicatorSize = 'small' | 'medium' | 'large';

/**
 * @tag bl-progress-indicator
 * @summary Baklava Progress Indicator component
 */

@customElement('bl-progress-indicator')
export default class BlProgress extends LitElement {
  static get styles(): CSSResultGroup {
    return style;
  }

  @query('.progress-indicator') private wrapper: HTMLElement;

  @property({ type: String })
  size: ProgressIndicatorSize = 'medium';

  @property({ type: Boolean })
  failed = false;

  @property({ type: Number })
  get max() {
    return this._max;
  }
  set max(max: number) {
    this._max = max;
    this.updateCssVariable();
  }

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
    this.wrapper.style.setProperty('--value', `${this.value}`);
    this.wrapper.style.setProperty('--max', `${this.max}`);
  }

  render(): TemplateResult {
    return html`<div
      class="progress-indicator"
      role="progressbar"
      aria-valuemax="${this._max}"
      aria-valuenow="${this._value}"
    ></div>`;
  }
}
