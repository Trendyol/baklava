import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
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

  @property({ type: String })
  size: ProgressIndicatorSize = 'medium';

  @property({ type: String })
  max = '100';

  @property({ type: String })
  value = '0';

  @property({ type: Boolean })
  failed = false;

  connectedCallback() {
    super.connectedCallback();

    setTimeout(() => {
      this.style.setProperty('--bl-progress-indicator-max', this.max);
      this.style.setProperty('--bl-progress-indicator-value', this.value);
    });
  }

  render(): TemplateResult {
    return html`<div
      class="progress-indicator"
      role="progressbar"
      aria-valuemax="${this.max}"
      aria-valuenow="${this.value}"
    ></div>`;
  }
}
