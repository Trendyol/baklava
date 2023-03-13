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
  Middleware,
  MiddlewareState,
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
 * @cssproperty --bl-popover-arrow-display - Sets the display of popovers arrow. Default value is `none`
 * @cssproperty --bl-popover-background-color - Sets the background color of popover. Default value is `--bl-color-primary-background`
 * @cssproperty --bl-popover-border-color - Sets the border color of popover. Default value is `--bl-color-primary-hover`
 * @cssproperty --bl-popover-padding - Sets the padding of popover. Default value is `--bl-size-m`
 * @cssproperty --bl-popover-border-radius - Sets the border radius of popover. Default value is `--bl-size-3xs`
 * @cssproperty --bl-popover-position - Sets the position of popover. Default value is fixed
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
  placement: Placement = 'bottom';

  /**
   * Target elements state
   */
  @state() _target: string | Element;


  /**
   * Sets size of popover same as trigger element
   */
  @property({ type: Boolean, attribute: 'fit-size' })
  fitSize = false;

  /**
   * Sets the distance between popover and target/trigger element
   */
  @property({ type: Number })
  offset = 8;

  /**
   * Visibility state
   */
  @state() private _visible = false;

  /**
   * Fires when the popover is shown
   */
  @event('bl-popover-show') private onBlPopoverShow: EventDispatcher<string>;

  /**
   * Fires when popover becomes hidden
   */
  @event('bl-popover-hide') private onBlPopoverHide: EventDispatcher<string>;

  connectedCallback() {
    super.connectedCallback();

    this._handlePopoverShowEvent = this._handlePopoverShowEvent.bind(this);
    this._handleKeyupEvent = this._handleKeyupEvent.bind(this);
    this._handleClickOutside = this._handleClickOutside.bind(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.popoverAutoUpdateCleanup && this.popoverAutoUpdateCleanup();
  }

  private getMiddleware(): Middleware[] {
    const middlewareParams: Middleware[] = [];
    middlewareParams.push(offset(this.offset), inline(), flip(),shift({ padding: 4 }));

    if (this.fitSize) {
      middlewareParams.push(
        size({
          apply(args: MiddlewareState) {
            if (args.elements.floating && args.elements.reference) {
              Object.assign(args.elements.floating.style, {
                width: `${args.elements.reference.getBoundingClientRect().width}px`,
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
      this.popoverAutoUpdateCleanup = autoUpdate(this.target as Element, this.popover, () => {
        computePosition(this.target as Element, this.popover, {
          placement: this.placement,
          strategy: 'fixed',
          middleware: this.getMiddleware(),
        }).then(({ x, y, placement, middlewareData }) => {
          Object.assign(this.popover.style, {
            left: `${x}px`,
            top: `${y}px`,
          });

          if (middlewareData.arrow) {
            const { x: arrowX, y: arrowY } = middlewareData.arrow;

            Object.assign(this.arrow.style, {
              left: `${arrowX}px`,
              top: `${arrowY}px`,
            });

            const arrowFlipDirections = {
              top: 'bottom',
              right: 'left',
              bottom: 'top',
              left: 'right',
            };
            const arrowRotateDegrees = {
              top: '225deg',
              right: '315deg',
              bottom: '45deg',
              left: '135deg',
            };
            const popoverPlacement = placement.split('-')[0] as keyof typeof arrowFlipDirections;
            const arrowDirection = arrowFlipDirections[popoverPlacement];

            this.arrow.style.setProperty(arrowDirection, '-5px');
            this.arrow.style.setProperty('--arrow-rotation', arrowRotateDegrees[popoverPlacement]);
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
    if (typeof value === 'string') {
      this._target = document.getElementById(value) as Element;
    } else if (value instanceof Element) {
      this._target = value;
    } else {
      console.warn(
        'BlPopover target only accepts an Element instance or a string id of a DOM element.'
      );
    }
  }

  /**
   * Shows popover
   */
  show() {
    this._visible = true;
    this.setPopover();
    this.onBlPopoverShow('');
    document.addEventListener('click', this._handleClickOutside);
    document.addEventListener('keyup', this._handleKeyupEvent);
    document.addEventListener('bl-popover-show', this._handlePopoverShowEvent);
  }

  /**
   * Hides popover
   */
  hide() {
    this._visible = false;
    document.removeEventListener('click', this._handleClickOutside);
    document.removeEventListener('keyup', this._handleKeyupEvent);
    document.removeEventListener('bl-popover-show', this._handlePopoverShowEvent);
    this.onBlPopoverHide('');
  }

  /**
   * Gives the visibility status of the popover
   */
  get visible(): boolean {
    return this._visible;
  }

  private _handlePopoverShowEvent(event: Event) {
    if (event.target !== this) {
      this.hide();
    }
  }

  private _handleKeyupEvent(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.visible) {
      this.hide();
      event.preventDefault();
    }
  }

  render(): TemplateResult {
    const classes = classMap({
      popover: true,
      visible: this._visible,
    });

    return html`<div class=${classes}>
      <slot id="popover" aria-live=${this._visible ? 'polite' : 'off'}></slot>
      <div class="arrow" aria-hidden="true"></div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-popover': BlPopover;
  }
}
