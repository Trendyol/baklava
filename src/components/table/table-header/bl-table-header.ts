import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import "element-internals-polyfill";
import { blTableTag } from "../bl-table";
import type BlTable from "../bl-table";
import style from "../table-header/bl-table-header.css";

export const blTableHeaderTag = "bl-table-header";

/**
 * @tag bl-table-header
 * @summary Baklava Table component
 */
@customElement(blTableHeaderTag)
export default class BlTableHeader extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }
  /**
   * Set table header as sticky
   */
  @property({ type: Boolean, reflect: true, attribute: "sticky-header" })
  sticky = false;

  connectedCallback(): void {
    super.connectedCallback();
    if (!this.closest<BlTable>(blTableTag)) {
      console.warn("bl-table-header is designed to be used inside a bl-table", this);
    }
  }

  render(): TemplateResult {
    return html`<slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [blTableHeaderTag]: BlTableHeader;
  }
}
