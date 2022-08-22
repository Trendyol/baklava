import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { computePosition, flip, shift, offset, arrow } from '@floating-ui/dom';
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

  private setTooltip() {
    computePosition(this.trigger, this.tooltip, {
      placement: this.placement,
      strategy: 'fixed',
      middleware: [
        offset(8),
        shift({ padding: 5 }),
        flip(),
        arrow({ element: this.arrow, padding: 5 }),
      ],
    }).then(({ x, y, placement, middlewareData }) => {
      const arrowX = middlewareData.arrow?.x != null ? `${middlewareData.arrow?.x}px` : ' ';
      const arrowY = middlewareData.arrow?.y != null ? `${middlewareData.arrow?.y}px` : ' ';
      const arrowDirections = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      };
      const tooltipPlacement = placement.split('-')[0] as keyof typeof arrowDirections;
      const arrowDirection = arrowDirections[tooltipPlacement];

      this.tooltip.style.setProperty('--left', `${x}px`);
      this.tooltip.style.setProperty('--top', `${y}px`);
      this.arrow.style.setProperty('--arrow-left', arrowX);
      this.arrow.style.setProperty('--arrow-top', arrowY);
      this.arrow.style.setProperty('--arrow-bottom', '0');
      this.arrow.style.setProperty('--arrow-right', '0');
      this.arrow.style.setProperty(`--arrow-${arrowDirection}`, '-4px');
    });
  }

  private show() {
    this._visible = true;
    this.setTooltip();
    this.onShow('Show event fired!');
  }

  private hide() {
    this._visible = false;
    this.onHide('Hide event fired!');
  }

  render(): TemplateResult {
    const classes = classMap({
      tooltip: true,
      visible: this._visible,
    });

    return html` <slot
        class="trigger"
        name="tooltip-trigger"
        @mouseover="${this.show}"
        @mouseleave="${this.hide}"
      >
      </slot>
      <div class=${classes}>
        <slot></slot>
        <div class="arrow"></div>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-tooltip': BlTooltip;
  }
}
