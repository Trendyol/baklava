import {CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./bl-tab-panel.css";

@customElement('bl-tab-panel')
export default class BlTabPanel extends LitElement {
  static get styles(): CSSResultGroup {
    return [styles]
  }

  @property({type: String, reflect: true})
  name: string;

  @property({type: Boolean, reflect: true})
  visible = false;

  render(): TemplateResult {
    return html`<slot></slot>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-tab-panel': BlTabPanel
  }
}
