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
   * Target URL for the link
   */
  @property({ type: String, reflect: true })
  target = "";

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
   * Whether the link is external
   */
  @property({ type: Boolean, reflect: true })
  external = false;

  /**
   * Aria label for the link
   */
  @property({ type: String, attribute: "aria-label" })
  ariaLabel = "";

  /**
   * Whether the link is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  private get isStandalone(): boolean {
    return this.variant === "standalone";
  }

  private renderIcon(): TemplateResult | null {
    if (this.external) {
      return html`<bl-icon name="external_link" class="icon" aria-hidden="true"></bl-icon>`;
    }
    if (this.isStandalone && !this.external) {
      return html`<bl-icon name="arrow_right" class="icon" aria-hidden="true"></bl-icon>`;
    }
    return null;
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
      disabled: this.disabled,
    };

    const content = html`
      <slot></slot>
      ${this.renderIcon()}
    `;

    return html`
      <a
        href="${ifDefined(this.disabled ? undefined : this.target)}"
        class="${classMap(classes)}"
        target="${this.external ? "_blank" : "_self"}"
        rel="${ifDefined(this.external ? "noopener noreferrer" : undefined)}"
        role="link"
        aria-label="${ifDefined(this.ariaLabel || undefined)}"
        aria-disabled="${this.disabled}"
        tabindex="${this.disabled ? "-1" : "0"}"
      >
        ${content}
        ${this.external ? html`<span class="visually-hidden">(opens in new tab)</span>` : null}
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bl-link": BlLink;
  }
}
