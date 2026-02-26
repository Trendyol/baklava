import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import style from "./bl-skeleton.css";

export type SkeletonVariant = "rect" | "circle" | "text";
export type SkeletonEffect = "pulse" | "wave" | "none";

export const blSkeletonTag = "bl-skeleton";

/**
 * @tag bl-skeleton
 * @summary Baklava Skeleton component
 *
 * @cssproperty [--bl-skeleton-bg-color=--bl-color-neutral-lightest] Sets the background color of skeleton
 * @cssproperty [--bl-skeleton-highlight-color=--bl-color-neutral-full] Sets the highlight color for wave animation
 * @cssproperty [--bl-skeleton-radius=--bl-border-radius-s] Overrides the border radius of skeleton
 */
@customElement(blSkeletonTag)
export default class BlSkeleton extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets the skeleton variant
   */
  @property({ type: String, reflect: true })
  variant: SkeletonVariant = "rect";

  /**
   * Sets the animation effect
   */
  @property({ type: String, reflect: true })
  effect: SkeletonEffect = "pulse";

  /**
   * Sets a custom width (any CSS value)
   */
  @property({ type: String })
  width?: string;

  /**
   * Sets a custom height (any CSS value)
   */
  @property({ type: String })
  height?: string;

  render(): TemplateResult {
    const inlineStyles: Record<string, string> = {};

    if (this.width) inlineStyles.width = this.width;
    if (this.height) inlineStyles.height = this.height;

    return html`<div
      class="skeleton"
      style=${styleMap(inlineStyles)}
      role="presentation"
      aria-hidden="true"
    ></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [blSkeletonTag]: BlSkeleton;
  }
}
