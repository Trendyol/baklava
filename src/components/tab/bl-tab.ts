import {CSSResultGroup, html, LitElement, TemplateResult} from "lit";
import {customElement, property, query} from "lit/decorators.js";
import style from "./bl-tab.css";

@customElement('bl-tab')
export default class BlTab extends LitElement {
  static get styles(): CSSResultGroup {
    return [style]
  }

  @query('.container') private tab: HTMLDivElement;

  @property({type: String})
  title: string;

  @property({type: String, reflect: true})
  name: string;

  handleClick(e: Event) {
    const detail = {name: this.name,tab: this.tab};
    const event = new CustomEvent('tabClicked', {detail, bubbles: true, composed: true, cancelable: true});
    this.dispatchEvent(event);
    if (event.defaultPrevented) {
      e.preventDefault();
    }
  }


  render(): TemplateResult {
    const title = this.title || html`
      <slot></slot>`
    return html`
      <div class="container" @click=${this.handleClick}>
        ${title}
      </div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-tab': BlTab
  }
}
