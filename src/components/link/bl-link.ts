import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import style from "./bl-link.css";

export type LinkVariant = "inline" | "standalone";
export type LinkSize = "large" | "medium" | "small";
export type LinkKind = "primary" | "neutral";

/**
 * @tag bl-link
 * @summary Baklava Link component for navigation
 *
 * @slot icon - Custom icon slot for non-standalone variants
 *
 * @cssproperty [--bl-link-color=--bl-color-primary] Sets the color of link
 * @cssproperty [--bl-link-hover-color=--bl-color-primary-hover] Sets the hover color of link
 * @cssproperty [--bl-link-active-color=--bl-color-primary-active] Sets the active color of link
 */

@customElement("bl-link")
export default class BlLink extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * URL that the hyperlink points to
   */
  @property({ type: String, reflect: true })
  href: HTMLAnchorElement["href"] = "";

  /**
   * Link variant - inline or standalone
   */
  @property({ type: String, reflect: true })
  variant: LinkVariant = "inline";

  /**
   * Link size - only applies to standalone variant
   */
  @property({ type: String, reflect: true })
  size: LinkSize = "medium";

  /**
   * Link kind - only applies to standalone variant
   */
  @property({ type: String, reflect: true })
  kind: LinkKind = "primary";

  /**
   * Aria label for the link
   */
  @property({ type: String, attribute: "aria-label" })
  ariaLabel = "";

  /**
   * Where to display the linked URL
   */
  @property({ type: String, reflect: true })
  target: HTMLAnchorElement["target"] = "_self";

  /**
   * Relationship between the current document and the linked document.
   * Multiple rel values can be specified by separating them with spaces.
   * Example: "noopener noreferrer"
   */
  @property({ type: String, reflect: true })
  rel?: HTMLAnchorElement["rel"];

  /**
   * Language of the linked document
   */
  @property({ type: String, reflect: true })
  hreflang?: HTMLAnchorElement["hreflang"];

  /**
   * MIME type of the linked document
   */
  @property({ type: String, reflect: true })
  type?: HTMLAnchorElement["type"];

  /**
   * Referrer policy for the link
   */
  @property({ type: String, reflect: true, attribute: "referrerpolicy" })
  referrerPolicy?: HTMLAnchorElement["referrerPolicy"];

  /**
   * Whether to download the resource instead of navigating to it
   */
  @property({ type: String, reflect: true })
  download?: HTMLAnchorElement["download"];

  /**
   * Ping URLs to be notified when following the link
   */
  @property({ type: String, reflect: true })
  ping?: HTMLAnchorElement["ping"];

  private get isStandalone(): boolean {
    return this.variant === "standalone";
  }

  private renderIcon(): TemplateResult | null {
    if (this.isStandalone) {
      return html`<bl-icon name="arrow_right" class="icon" aria-hidden="true"></bl-icon>`;
    }
    return html`<slot name="icon"></slot>`;
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.variant === "inline") {
      const parentElement = this.parentElement;
      const hasTextSibling = Array.from(parentElement?.childNodes || []).some(
        node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
      );

      if (!parentElement || !hasTextSibling) {
        console.warn(
          "bl-link: Inline variant should be used within a text container. Example: <p>Text with <bl-link variant='inline'>a link</bl-link> inside.</p>"
        );
      }
    }
  }

  render(): TemplateResult {
    const classes = {
      link: true,
      standalone: this.isStandalone,
      [`size-${this.size}`]: this.isStandalone,
      [`kind-${this.kind}`]: this.isStandalone,
    };

    const content = html`
      <slot></slot>
      ${this.renderIcon()}
    `;

    return html`
      <a
        href="${this.href}"
        class="${classMap(classes)}"
        target="${ifDefined(this.target)}"
        rel="${ifDefined(this.rel)}"
        hreflang="${ifDefined(this.hreflang)}"
        type="${ifDefined(this.type)}"
        referrerpolicy="${ifDefined(this.referrerPolicy)}"
        download="${ifDefined(this.download)}"
        ping="${ifDefined(this.ping)}"
        role="link"
        aria-label="${ifDefined(this.ariaLabel || undefined)}"
        tabindex="0"
      >
        ${content}
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bl-link": BlLink;
  }
}
