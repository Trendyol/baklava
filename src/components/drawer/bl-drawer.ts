import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { event, EventDispatcher } from "../../utilities/event";
import { styleToPixelConverter } from "../../utilities/style-to-px.converter";
import "../button/bl-button";
import style from "./bl-drawer.css";

/**
 * @tag bl-drawer
 * @summary Baklava Drawer component
 *
 * @cssproperty [--bl-drawer-animation-duration=250ms] Drawer slide in animation duration
 * @cssproperty [--bl-drawer-width=424px] Drawer width in open state
 */

@customElement("bl-drawer")
export default class BlDrawer extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets drawer open-close status
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   *  Sets the drawer title
   */
  @property({ type: String })
  caption?: string;

  /**
   *  Sets the drawer embed url for iframe
   */
  @property({ type: String, attribute: "embed-url" })
  embedUrl?: string;

  /**
   *  Sets the drawer external link
   */
  @property({ type: String, attribute: "external-link" })
  externalLink?: string;

  /**
   * Fires when the drawer is opened
   */
  @event("bl-drawer-open") private onOpen: EventDispatcher<string>;

  /**
   * Fires when the drawer is closed
   */
  @event("bl-drawer-close") private onClose: EventDispatcher<string>;

  connectedCallback() {
    super.connectedCallback();
    window?.addEventListener("bl-drawer-open", event => {
      if (event.target !== this) this.closeDrawer();
    });
    this.resizeDrawerWidth();

    window?.addEventListener("resize", () => this.resizeDrawerWidth());
    window?.addEventListener("load", () => this.resizeDrawerWidth());
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window?.removeEventListener("resize", () => this.resizeDrawerWidth());
    window?.addEventListener("load", () => this.resizeDrawerWidth());
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has("open")) {
      this.toggleDialogHandler();
    }
  }

  private domExistenceSchedule: number;

  private resizeDrawerWidth() {
    const styleValue =
      getComputedStyle(document.documentElement).getPropertyValue("--bl-drawer-width") || "424px";
    const drawerWidth = styleToPixelConverter(styleValue) || 424;

    if (window?.innerWidth < drawerWidth) {
      this.style.setProperty("--bl-drawer-current-width", "calc(100vw - 24px)");
    } else {
      this.style.setProperty("--bl-drawer-current-width", styleValue);
    }
  }

  private toggleDialogHandler() {
    if (this.open) {
      if (this.domExistenceSchedule) {
        clearTimeout(this.domExistenceSchedule);
      }

      this.domExistence = true;
      // FIXME: Allow events without payload
      this.onOpen("");
    } else {
      // Give some time for exit animation
      this.domExistenceSchedule = window.setTimeout(() => {
        this.domExistence = false;
      }, 1000);

      // FIXME: Allow events without payload
      this.onClose("");
    }
  }

  @state() private domExistence = false;

  private closeDrawer() {
    this.open = false;
  }

  private renderContent() {
    const content = this.embedUrl
      ? html`<iframe src=${this.embedUrl}></iframe>`
      : html`<slot></slot>`;

    return html`<section class=${this.embedUrl ? "iframe-content" : "content"}>
      ${content}
    </section>`;
  }

  private renderContainer() {
    const title = this.caption ? html`<h2 id="drawer-caption">${this.caption}</h2>` : "";
    const external_button = this.externalLink
      ? html`<bl-button
          icon="external_link"
          variant="tertiary"
          kind="neutral"
          size="small"
          href="${this.externalLink}"
          target="_blank"
        ></bl-button>`
      : "";

    return html`<div class="container">
      <header>
        ${title}
        <div class="header-buttons">
          ${external_button}
          <bl-button
            @click="${this.closeDrawer}"
            icon="close"
            size="small"
            variant="tertiary"
            kind="neutral"
          ></bl-button>
        </div>
      </header>
      ${this.renderContent()}
    </div>`;
  }

  render(): TemplateResult {
    if (this.domExistence) {
      return html`<div class="drawer">${this.renderContainer()}</div>`;
    } else {
      return html``;
    }
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "bl-drawer": BlDrawer;
  }
}
