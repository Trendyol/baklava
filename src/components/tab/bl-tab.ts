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
  selected: boolean;

  @property({ type: Boolean, reflect: true, attribute:'last-tab' })
  lastTab: boolean;

  handleClick(e: Event) {
    const detail = { panel: this.panel, tab: this.tab };
    const event = new CustomEvent('tabClicked', { detail, bubbles: true, composed: true, cancelable: true });
    this.dispatchEvent(event);
    if (event.defaultPrevented) {
      e.preventDefault();
    }
  }


  render(): TemplateResult {
    const title = this.title || html`<slot></slot>`;


    const caption =
      this.caption ?  html`<div class="caption">
        ${this.caption}
      </div>` : null;

    return html`
      <button role="tab" class='container' @click='${this.handleClick}'>
        <div class='title-caption-container'>
          <div class="title">
            ${title}
          </div>
          ${caption}
        </div>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-tab': BlTab;
  }
}
