import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import {
  computePosition,
  flip,
  shift,
  offset,
  arrow,
  inline,
  autoUpdate,
  size,
  Middleware,
  MiddlewareState,
} from "@floating-ui/dom";
import { getTarget } from "../../utilities/elements";
import { event, EventDispatcher } from "../../utilities/event";
import style from "./bl-popover.css";

export type Placement =
  | "top-start"
  | "top"
  | "top-end"
  | "bottom-start"
  | "bottom"
  | "bottom-end"
  | "left-start"
  | "left"
  | "left-end"
  | "right-start"
  | "right"
  | "right-end";

/**
 * @tag bl-popover
 * @summary Baklava Popover component
 *
 * @cssproperty [--bl-popover-arrow-display=none] - Sets the display of popovers arrow. Set as `block` to make arrow visible.
 * @cssproperty [--bl-popover-background-color=--bl-color-neutral-full] - Sets the background color of popover.
 * @cssproperty [--bl-popover-border-color=--bl-color-primary-highlight] - Sets the border color of popover.
 * @cssproperty [--bl-popover-border-size=1px] - Sets the border size of popover. You can set it to `0px` to not have a border (if you use a custom background color). Always use with a length unit.
 * @cssproperty [--bl-popover-padding=--bl-size-m] - Sets the padding of popover.
 * @cssproperty [--bl-popover-border-radius=--bl-size-3xs] - Sets the border radius of popover.
 * @cssproperty [--bl-popover-max-width=100vw] - Sets the maximum width of the popover (including border and padding).
 * @cssproperty [--bl-popover-position=fixed] - Sets the position of popover. You can set it to `absolute` if parent element is a fixed positioned element like drawer or dialog.
 */
@customElement("bl-popover")
export default class BlPopover extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  @query(".popover") private _popover: HTMLElement;
  @query(".arrow") private arrow: HTMLElement;

  /**
   * Sets placement of the popover
   */
  @property({ type: String })
  placement: Placement = "bottom";

  /**
   * Target elements state
   */
  @state() _target: string | Element;

  /**
   * Sets size of popover same as trigger element
   */
  @property({ type: Boolean, attribute: "fit-size" })
  fitSize = false;

  /**
   * Sets the distance between popover and target/trigger element
   */
  @property({ type: Number })
  offset = 8;

  /**
   * Visibility state
   */
  @state() _visible = false;

  /**
   * Fires when the popover is shown
   */
  @event("bl-popover-show") private onBlPopoverShow: EventDispatcher<string>;

  /**
   * Fires when popover becomes hidden
   */
  @event("bl-popover-hide") private onBlPopoverHide: EventDispatcher<string>;

  connectedCallback() {
    super.connectedCallback();

    this._handlePopoverShowEvent = this._handlePopoverShowEvent.bind(this);
    this._handleKeydownEvent = this._handleKeydownEvent.bind(this);
    this._handleClickOutside = this._handleClickOutside.bind(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.popoverAutoUpdateCleanup && this.popoverAutoUpdateCleanup();
  }

  private getMiddleware(): Middleware[] {
    const middlewareParams: Middleware[] = [];

    middlewareParams.push(offset(this.offset), inline(), flip(), shift({ padding: 4 }));

    if (this.fitSize) {
      middlewareParams.push(
        size({
          apply(args: MiddlewareState) {
            if (args.elements.floating && args.elements.reference) {
              Object.assign(args.elements.floating.style, {
                "min-width": `${args.elements.reference.getBoundingClientRect().width}px`,
              });
            }
          },
        })
      );
    }

    middlewareParams.push(arrow({ element: this.arrow, padding: 5 }));

    return middlewareParams;
  }

  private _handleClickOutside = (event: MouseEvent) => {
    const eventPath = event.composedPath() as HTMLElement[];

    if (!eventPath.includes(this._target as HTMLElement) && !eventPath.includes(this)) {
      this.hide();
    }
  };

  private popoverAutoUpdateCleanup: () => void;

  private setPopover() {
    if (this.target) {
      this.popoverAutoUpdateCleanup = autoUpdate(this.target as Element, this._popover, () => {
        computePosition(this.target as Element, this._popover, {
          placement: this.placement,
          strategy: "fixed",
          middleware: this.getMiddleware(),
        }).then(({ x, y, placement, middlewareData }) => {
          Object.assign(this._popover.style, {
            left: `${x}px`,
            top: `${y}px`,
          });

          this._popover.dataset.placement = placement;

          if (middlewareData.arrow) {
            const { x: arrowX, y: arrowY } = middlewareData.arrow;

            Object.assign(this.arrow.style, {
              left: arrowX != null ? `${arrowX}px` : "",
              top: arrowY != null ? `${arrowY}px` : "",
            });
          }
        });
      });
    }
  }

  /**
   * Sets the target element of the popover to align and trigger.
   * It can be a string id of the target element or can be a direct Element reference of it.
   */
  @property()
  get target(): string | Element {
    return this._target;
  }

  set target(value: string | Element) {
    const target = getTarget(value);

    if (!target) {
      console.warn(
        "BlPopover target only accepts an Element instance or a string id of a DOM element."
      );
      return;
    }

    this._target = target;
  }

  /**
   * Shows popover
   */
  show() {
    this._visible = true;
    this.setPopover();
    this.onBlPopoverShow("");
    document.addEventListener("click", this._handleClickOutside);
    document.addEventListener("keydown", this._handleKeydownEvent);
    document.addEventListener("bl-popover-show", this._handlePopoverShowEvent);
  }

  /**
   * Hides popover
   */
  hide() {
    this._visible = false;
    document.removeEventListener("click", this._handleClickOutside);
    document.removeEventListener("keydown", this._handleKeydownEvent);
    document.removeEventListener("bl-popover-show", this._handlePopoverShowEvent);
    this.onBlPopoverHide("");
  }

  /**
   * Gives the visibility status of the popover
   */
  get visible(): boolean {
    return this._visible;
  }

  private _handlePopoverShowEvent(event: Event) {
    if (event.target !== this) {
      const { parentElement } = event.target as HTMLElement;
      const isNestedPopover = this.contains(parentElement);

      if (!isNestedPopover && (event.target as HTMLElement).tagName === this.tagName) {
        this.hide();
      }
    }
  }

  private _handleKeydownEvent(event: KeyboardEvent) {
    if (event.key === "Escape" && this.visible) {
      event.preventDefault();
      this.hide();
    }
  }

  render(): TemplateResult {
    const classes = classMap({
      popover: true,
      visible: this._visible,
    });

    return html`<div class=${classes}>
      <slot id="popover" aria-live=${this._visible ? "polite" : "off"}></slot>
      <div class="arrow" aria-hidden="true"></div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bl-popover": BlPopover;
  }
}
