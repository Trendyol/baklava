import { html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { CSSResultGroup } from "lit/development";
import { classMap } from "lit/directives/class-map.js";
import { event, EventDispatcher } from "../../../utilities/event";
import { stringBooleanConverter } from "../../../utilities/string-boolean.converter";
import "../../icon/bl-icon";
import { BaklavaIcon } from "../../icon/icon-list";
import style from "./bl-accordion.css";

enum AnimationStatus {
  EXPANDING,
  COLLAPSING,
}

/**
 * @tag bl-accordion
 * @summary Baklava Accordion component
 *
 * @slot - Default slot for accordion content
 * @slot caption - Slot for custom caption content
 */
@customElement("bl-accordion")
export default class BlAccordion extends LitElement {
  /**
   * Whether the accordion is expanded
   */
  @property({ reflect: true, type: Boolean })
  open = false;

  /**
   * Sets accordion caption.
   */
  @property({ reflect: true })
  caption?: string;

  /**
   * Add icon to beginning of the title
   */
  @property({ converter: stringBooleanConverter() })
  icon?: boolean | BaklavaIcon;

  /**
   * Whether the accordion is disabled
   */
  @property({ reflect: true, type: Boolean })
  disabled = false;

  /**
   * Fires when accordion open state change.
   */
  @event("bl-toggle") private _onToggle: EventDispatcher<boolean>;

  @property({ type: Number })
  animationDuration = 250;

  private _animation: Animation | null;
  private _animationStatus: AnimationStatus | null = null;

  @query("details")
  detailsEl: HTMLDetailsElement;

  @query("summary")
  summaryEl: HTMLElement;

  @query(".accordion-content")
  contentEl: HTMLElement;

  static get styles(): CSSResultGroup {
    return [style];
  }

  private _cleanupStyles() {
    this.detailsEl.style.height = "";
    this.detailsEl.style.overflow = "";
    this.contentEl.style.display = "";
    this.contentEl.style.visibility = "";
  }

  _animate(isExpanding: boolean) {
    this._animationStatus = isExpanding ? AnimationStatus.EXPANDING : AnimationStatus.COLLAPSING;

    if (this._animation) {
      this._animation.cancel();
    }

    if (isExpanding) {
      this.open = true;
    }

    const startHeight = this.detailsEl.offsetHeight;

    if (isExpanding) {
      this.contentEl.style.display = "block";
      this.contentEl.style.visibility = "hidden";
    }

    requestAnimationFrame(() => {
      const endHeight = isExpanding
        ? this.summaryEl.offsetHeight + this.contentEl.offsetHeight
        : this.summaryEl.offsetHeight;

      if (isExpanding) {
        this.contentEl.style.visibility = "";
      }

      this.detailsEl.style.overflow = "hidden";
      this.detailsEl.style.height = `${startHeight}px`;

      requestAnimationFrame(() => {
        this._animation = this.detailsEl.animate(
          {
            height: [`${startHeight}px`, `${endHeight}px`],
          },
          {
            duration: this.animationDuration,
            easing: "ease-out",
            fill: "forwards",
          }
        );

        this._animation.onfinish = () => this._onAnimationFinish(isExpanding);
        this._animation.oncancel = () => {
          this._animationStatus = null;
          this._cleanupStyles();
          if (!isExpanding) {
            this.open = false;
          }
        };
      });
    });
  }

  private _onAnimationFinish(isExpanding: boolean) {
    this._cleanupStyles();

    if (!isExpanding) {
      this.open = false;
    }

    this._animation = null;
    this._animationStatus = null;
  }

  expand() {
    this._animate(true);
  }

  collapse() {
    this._animate(false);
  }

  private _clickHandler(e: Event) {
    e.preventDefault();

    if (this.disabled) return;

    const shouldExpand = this._animationStatus === AnimationStatus.COLLAPSING || !this.open;

    if (shouldExpand) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  protected updated(_changedProperties: PropertyValues) {
    if (_changedProperties.has("open")) {
      if (this.disabled && this.open) {
        this._onAnimationFinish(false);
        return;
      }

      this._onToggle(this.open);
    }
  }

  render(): TemplateResult {
    const icon = this.icon
      ? html`<bl-icon class="icon" name=${this.icon === true ? "info" : this.icon}></bl-icon>`
      : null;

    return html`<details
      ?open=${this.open}
      class=${classMap({
        accordion: true,
        disabled: this.disabled,
      })}
    >
      <summary
        class="summary"
        @click="${this._clickHandler}"
        aria-expanded=${this.open ? "true" : "false"}
        aria-controls="content"
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled ? "-1" : "0"}
      >
        ${icon}
        <slot name="caption">
          <span class="caption"> ${this.caption} </span>
        </slot>
        <bl-icon name="arrow_down" class="indicator"></bl-icon>
      </summary>

      <div class="accordion-content" role="region" aria-labelledby="header" id="content">
        <slot></slot>
      </div>
    </details>`;
  }
}
