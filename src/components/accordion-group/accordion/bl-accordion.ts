import { html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { CSSResultGroup } from "lit/development";
import { classMap } from "lit/directives/class-map.js";
import { event, EventDispatcher } from "../../../utilities/event";
import { stringBooleanConverter } from "../../../utilities/string-boolean.converter";
import "../../icon/bl-icon";
import { BaklavaIcon } from "../../icon/icon-list";
import style from "./bl-accordion.css";

// TODO : COMMENTS
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
  animationDuration = 100;

  private _animation: Animation | null;
  private _isExpanding = false;
  private _isCollapsing = false;

  @query("details")
  detailsEl: HTMLDetailsElement;

  @query("summary")
  summaryEl: HTMLElement;

  @query(".accordion-content")
  contentEl: HTMLElement;

  static get styles(): CSSResultGroup {
    return [style];
  }

  _animate(isOpening: boolean) {
    if (isOpening) {
      this._isExpanding = true;
    } else {
      this._isCollapsing = true;
    }

    const startHeight = `${this.detailsEl.offsetHeight}px`;
    const endHeight = isOpening
      ? `${this.summaryEl.offsetHeight + this.contentEl.offsetHeight}px`
      : `${this.summaryEl.offsetHeight}px`;

    if (this._animation) {
      this._animation.cancel();
    }

    this._animation = this.detailsEl.animate(
      {
        height: [startHeight, endHeight],
      },
      {
        duration: this.animationDuration,
        easing: "ease-out",
      }
    );

    this._animation.onfinish = () => this._onAnimationFinish(isOpening);
    this._animation.oncancel = () => this._onAnimationCancel(isOpening);
  }

  private _onAnimationCancel(isOpening: boolean) {
    if (isOpening) {
      this._isExpanding = false;
    } else {
      this._isCollapsing = false;
    }
  }

  private _onAnimationFinish(open: boolean) {
    this.open = open;
    this._animation = null;
    this._isExpanding = false;
    this._isCollapsing = false;
    this.detailsEl.style.height = this.detailsEl.style.overflow = "";
  }

  expand() {
    this.detailsEl.style.height = `${this.detailsEl.offsetHeight}px`;
    this.open = true;
    window.requestAnimationFrame(() => this._animate(true));
  }

  collapse() {
    this._animate(false);
  }

  private _clickHandler(e: Event) {
    e.preventDefault();

    if (this.disabled) return;

    this.detailsEl.style.overflow = "hidden";

    if (this._isCollapsing || !this.open) {
      this.expand();
    } else if (this._isExpanding || this.open) {
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

  protected render(): TemplateResult {
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
