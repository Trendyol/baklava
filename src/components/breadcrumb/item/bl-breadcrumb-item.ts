import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../../link/bl-link";
import style from "./bl-breadcrumb-item.css";

/**
 * @tag bl-breadcrumb-item
 * @summary Single breadcrumb link item
 *
 * @cssproperty [--bl-breadcrumb-item-color=--bl-color-neutral-dark] Item text color
 */

@customElement("bl-breadcrumb-item")
export default class BlBreadcrumbItem extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  @property({ type: String, reflect: true })
  href = "";

  @property({ type: String, reflect: true })
  label = "";

  @property({ type: Boolean, reflect: true })
  last = false;

  render(): TemplateResult {
    if (this.href && !this.last) {
      return html`
        <bl-link variant="inline" href="${this.href}" class="breadcrumb-link">
          ${this.label || html`<slot></slot>`}
        </bl-link>
      `;
    }
    return html`
      <span class="breadcrumb-text" aria-current="location">
        ${this.label || html`<slot></slot>`}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bl-breadcrumb-item": BlBreadcrumbItem;
  }
}
