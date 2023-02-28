import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import {
  computePosition,
  flip,
  shift,
  offset,
  arrow,
  inline,
  autoUpdate,
  size,
  Middleware, MiddlewareState,
} from '@floating-ui/dom';
import { classMap } from 'lit/directives/class-map.js';
import style from './bl-popover.css';
import { event, EventDispatcher } from '../../utilities/event';

export type Placement =
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'left-start'
  | 'left'
  | 'left-end'
  | 'right-start'
  | 'right'
  | 'right-end';

/**
 * @tag bl-popover
 * @summary Baklava Popover component
 *
 * @property {string} placement - Sets the popover placement
 */
@customElement('bl-popover')
export default class BlPopover extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  @query('.popover') private popover: HTMLElement;
  @query('.arrow') private arrow: HTMLElement;

  /**
   * Sets placement of the popover
   */
  @property({ type: String })
  placement: Placement = 'top';

  @state() _target: string | Element;

  @property({ type: Boolean })
  shift = false;

  @property({ type: Boolean, attribute: 'fit-size' })
  fitSize = false;

  @property({ type: Number })
  offset = 10;

  @state() private _visible = false;

  /**
   * Fires when hovering over a trigger
   */
  @event('bl-popover-show') private onBlPopoverShow: EventDispatcher<string>;

  /**
   * Fires when leaving over from trigger
   */
  @event('bl-popover-hide') private onBlPopoverHide: EventDispatcher<string>;

  disconnectedCallback() {
    super.disconnectedCallback();

    this.popoverAutoUpdateCleanup && this.popoverAutoUpdateCleanup();
  }
  private _middleware: Middleware[] = [];

  protected firstUpdated() {
    this._middleware.push(
      offset(this.offset),
      flip(),
      inline(),
      arrow({ element: this.arrow, padding: 5 })
    );
    if (this.shift) this._middleware.push(shift({ padding: 5 }));

    if (this.fitSize) {
      this._middleware.push(
        size({
          apply(args: MiddlewareState) {
            if(args.elements.floating && args.elements.reference){
              Object.assign(args.elements.floating.style, {
                width: `${args.elements.reference.getBoundingClientRect().width}px`,
              });
            }
          },
        })
      );
    }
  }

  private popoverAutoUpdateCleanup: () => void;

  private setPopover() {
    if(this.target){
      this.popoverAutoUpdateCleanup = autoUpdate(this.target as Element, this.popover, () => {
        computePosition(this.target as Element, this.popover, {
          placement: this.placement,
          strategy: 'fixed',
          middleware: this._middleware,
        }).then(({ x, y, placement, middlewareData }) => {
          Object.assign(this.popover.style, {
            left: `${x}px`,
            top: `${y}px`,
          });

          if (middlewareData.arrow) {
            const { x: arrowX, y: arrowY } = middlewareData.arrow;

            Object.assign(this.arrow.style, {
              left: `${arrowX}px`,
              top:`${arrowY}px`,
            });

            const arrowFlipDirections = {
              top: 'bottom',
              right: 'left',
              bottom: 'top',
              left: 'right',
            };
            const popoverPlacement = placement.split('-')[0] as keyof typeof arrowFlipDirections;
            const arrowDirection = arrowFlipDirections[popoverPlacement];

            this.arrow.style.setProperty(arrowDirection, '-4px');
          }
        });
      });
    }
  }

  @property()
  get target(): string | Element {
    return this._target;
  }

  set target(value: string | Element) {
    if (typeof value === 'string') {
      this._target = document.getElementById(value) as Element;
    } else {
      this._target = value;
    }
  }

  /**
   * Shows popover
   */
  show() {
    this._visible = true;
    this.setPopover();
    this.onBlPopoverShow('Show event fired!');
  }

  /**
   * Hides popover
   */
  hide() {
    this._visible = false;
    this.onBlPopoverHide('Hide event fired!');
  }

  /**
   * Gives the visibility status of the popover
   */
  get visible(): boolean {
    return this._visible;
  }

  render(): TemplateResult {
    const classes = classMap({
      popover: true,
      visible: this._visible,
    });

    return html`<div class=${classes}>
      <slot id="popover" role="popover" aria-live=${this._visible ? 'polite' : 'off'}></slot>
      <div class="arrow" aria-hidden="true"></div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-popover': BlPopover;
  }
}
