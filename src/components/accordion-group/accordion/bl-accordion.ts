import { html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { CSSResultGroup } from "lit/development";
import { ifDefined } from "lit/directives/if-defined.js";
import { event, EventDispatcher } from "../../../utilities/event";
import { stringBooleanConverter } from "../../../utilities/string-boolean.converter";
import "../../icon/bl-icon";
import { BaklavaIcon } from "../../icon/icon-list";
import style from "./bl-accordion.css";

// TODO : COMMENTS
@customElement("bl-accordion")
export default class BlAccordion extends LitElement {
  @property({ reflect: true, type: Boolean })
  open = false;

  @property({ reflect: true, attribute: "title" })
  header?: string;

  /**
   * Allows to customize accordion icon
   */
  @property({ converter: stringBooleanConverter() })
  icon?: boolean | BaklavaIcon;

  /**
   * Fires when accordion open state change.
   */
  @event("bl-accordion-toggle") private _onToggle: EventDispatcher<boolean>;

  @property({ type: Number })
  animationDuration = 100;

  private _animation: Animation | null;
  private _isExpanding = false;
  private _isShrinking = false;

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
      this._isShrinking = true;
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
      this._isShrinking = false;
    }
  }

  private _onAnimationFinish(open: boolean) {
    this.open = open;
    this._animation = null;
    this._isExpanding = false;
    this._isShrinking = false;
    this.detailsEl.style.height = this.detailsEl.style.overflow = "";
  }

  expand() {
    this.detailsEl.style.height = `${this.detailsEl.offsetHeight}px`;
    this.open = true;
    window.requestAnimationFrame(() => this._animate(true));
  }

  shrink() {
    this._animate(false);
  }

  private _clickHandler(e: Event) {
    e.preventDefault();

    this.detailsEl.style.overflow = "hidden";

    if (this._isShrinking || !this.open) {
      this.expand();
    } else if (this._isExpanding || this.open) {
      this.shrink();
    }
  }

  protected updated(_changedProperties: PropertyValues) {
    if (_changedProperties.has("open")) {
      this._onToggle(this.open);
    }
  }

  protected render(): TemplateResult {
    const icon = this.icon
      ? html`<bl-icon class="icon" name=${ifDefined(this.icon)}></bl-icon>`
      : null;

    return html`<details ?open=${this.open} class="accordion" @click="${this._clickHandler}">
      <summary class="header">
        ${icon}
        <slot name="title">
          <span class="title"> ${this.title} </span>
        </slot>
        <bl-icon name="arrow_down" class="indicator"></bl-icon>
      </summary>

      <div class="accordion-content">
        <slot></slot>
      </div>
    </details>`;
  }
}
