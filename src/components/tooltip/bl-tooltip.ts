import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { computePosition, flip, shift, offset, arrow, inline, autoUpdate } from '@floating-ui/dom';
import { classMap } from 'lit/directives/class-map.js';
import { ReferenceElement } from '@floating-ui/core';
import style from './bl-tooltip.css';
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
 * @tag bl-tooltip
 * @summary Baklava Tooltip component
 *
 * @property {string} placement - Sets the tooltip placement
 */
@customElement('bl-tooltip')
export default class BlTooltip extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  @query('.tooltip') private tooltip: HTMLElement;
  @query('.trigger') private trigger: ReferenceElement;
  @query('.arrow') private arrow: HTMLElement;

  /**
   * Sets placement of the tooltip
   */
  @property({ type: String })
  placement: Placement = 'top';

  @state() private _visible = false;

  /**
   * Fires when hovering over a trigger
   */
  @event('bl-tooltip-show') private onShow: EventDispatcher<string>;

  /**
   * Fires when leaving over from trigger
   */
  @event('bl-tooltip-hide') private onHide: EventDispatcher<string>;

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('keydown', this.handleKeyDown);

    this.popoverAutoUpdateCleanup && this.popoverAutoUpdateCleanup();
  }

  private popoverAutoUpdateCleanup: () => void;

  private setTooltip() {
    this.popoverAutoUpdateCleanup = autoUpdate(this.trigger, this.tooltip, () => {
      computePosition(this.trigger, this.tooltip, {
        placement: this.placement,
        strategy: 'fixed',
        middleware: [
          offset(8),
          shift({ padding: 5 }),
          flip(),
          inline(),
          arrow({ element: this.arrow, padding: 5 }),
        ],
      }).then(({ x, y, placement, middlewareData }) => {
        Object.assign(this.tooltip.style, {
          left: `${x}px`,
          top: `${y}px`,
        });

        if (middlewareData.arrow) {
          const { x: arrowX, y: arrowY } = middlewareData.arrow;

          Object.assign(this.arrow.style, {
            left: arrowX != null ? `${arrowX}px` : '',
            top: arrowY != null ? `${arrowY}px` : '',
          });

          const arrowFlipDirections = {
            top: 'bottom',
            right: 'left',
            bottom: 'top',
            left: 'right',
          };
          const tooltipPlacement = placement.split('-')[0] as keyof typeof arrowFlipDirections;
          const arrowDirection = arrowFlipDirections[tooltipPlacement];

          this.arrow.style.setProperty(arrowDirection, '-4px');
        }
      });
    });
  }

  /**
   * Shows tooltip
   */
  show() {
    this._visible = true;
    this.setTooltip();
    this.onShow('Show event fired!');
  }

  /**
   * Hides tooltip
   */
  hide() {
    this._visible = false;
    this.onHide('Hide event fired!');
  }

  /**
   * Gives the visibility status of the tooltip
   */
  get visible(): boolean {
    return this._visible;
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (this._visible && event.key === 'Escape') {
      event.stopPropagation();
      this.hide();
    }
  }

  render(): TemplateResult {
    const classes = classMap({
      tooltip: true,
      visible: this._visible,
    });

    return html`<slot
        class="trigger"
        name="tooltip-trigger"
        aria-describedby="tooltip"
        @focus=${{ handleEvent: () => this.show(), capture: true }}
        @blur=${{ handleEvent: () => this.hide(), capture: true }}
        @mouseover=${() => this.show()}
        @mouseleave=${() => this.hide()}
      >
      </slot>
      <div class=${classes}>
        <slot id="tooltip" role="tooltip" aria-live=${this._visible ? 'polite' : 'off'}></slot>
        <div class="arrow" aria-hidden="true"></div>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-tooltip': BlTooltip;
  }
}
