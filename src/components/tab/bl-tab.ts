import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import style from './bl-tab.css';

@customElement('bl-tab')
export default class BlTab extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  @query('.container') private tab: HTMLDivElement;

  @property({ type: String })
  title: string;

  @property({ type: String })
  caption: string;

  @property({ type: String, reflect: true })
  panel: string;

  @property({ type: String, reflect: true })
  name: string;

  @property({ type: Boolean, reflect: true })
  active: boolean;

  handleClick(e: Event) {
    const detail = { panel: this.panel, tab: this.tab };
    const event = new CustomEvent('tabClicked', { detail, bubbles: true, composed: true, cancelable: true });
    this.dispatchEvent(event);
    if (event.defaultPrevented) {
      e.preventDefault();
    }
  }


  render(): TemplateResult {
    const title = this.title ? html`<div class="title">
      ${this.title}
    </div>` : html`
      <slot></slot>`;

    const caption =
      this.caption ?  html`<div class="caption">
        ${this.caption}
      </div>` : null;
    return html`
      <div class='container' @click='${this.handleClick}'>
        <div class='title-caption-container'>
          ${title}
          ${caption}
        </div>
      </div>
      <div class="border-bottom"></div>
      <div class="border-right"></div>
    `;

  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-tab': BlTab;
  }
}
