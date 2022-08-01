import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import style from "./bl-tab.css";

@customElement("bl-tab")
export default class BlTab extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  protected _panel = "";
  get panel(): string {
    return this.name;
  }

  @query(".container") private tab: HTMLDivElement;

  @property({ type: String })
  title: string;

  @property({ type: String })
  caption: string;

  @property({ type: String, reflect: true })
  name: string;


  @property({ type: String, attribute: "help-text", reflect: true })
  helpText: string;

  @property({ type: String })
  icon = "";

  @property({ type: Boolean, reflect: true })
  notify = false;

  @property({ type: String })
  badge = "";

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: false })
  disabled = false;

  handleClick(e: Event) {
    const detail = { panel: this.panel, tab: this.tab };
    const event = new CustomEvent("bl-tab-show", {
      detail,
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    this.dispatchEvent(event);
    if (event.defaultPrevented) {
      e.preventDefault();
    }
  }

  render(): TemplateResult {
    const title = this.title || html` <slot></slot>`;

    const helpTooltip = this.helpText
      ? html` <div class="help-container">
          <bl-tooltip placement="bottom" style="--bl-tooltip-position:fixed">
            <bl-button
              slot="tooltip-trigger"
              icon="info"
              text
              label="${this.helpText}"
              secondary
            ></bl-button>
            ${this.helpText}
          </bl-tooltip>
        </div>`
      : null;

    const icon = this.icon
      ? html` <div class="icon">
          <bl-icon name="${this.icon}"></bl-icon>
        </div>`
      : null;

    const badge = this.badge
      ? html` <div class="badge-container">
          <bl-badge size="small">${this.badge}</bl-badge>
        </div>`
      : null;

    const caption = this.caption ? html` <div class="caption">${this.caption}</div>` : null;

    return html`
      <button
        ?disabled="${this.disabled}"
        role="tab"
        class="container"
        @click="${this.handleClick}"
      >
        <div class="title-container">
          <div class="title">${icon} ${title} ${badge}</div>
          ${caption}
        </div>
        ${helpTooltip}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bl-tab": BlTab;
  }
}
