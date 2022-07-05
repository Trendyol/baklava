import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { computePosition, flip, shift, offset, arrow, Strategy } from '@floating-ui/dom';
import style from './bl-tooltip.css';
import { classMap } from 'lit/directives/class-map.js';

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

  export type Positon = 'absolute' | 'fixed';

  /**
 * @tag bl-tooltip
 * @summary Baklava Tooltip component
 *
 * @property {string} placement - Sets the tooltip placement
 *
 * @cssproperty --bl-tooltip-position Sets the position. Default value is 'absolute'
 */

@customElement('bl-tooltip')
export default class BlTooltip extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  @query('.tooltip') private tooltip: HTMLElement;
  @query('.trigger') private trigger: HTMLElement;
  @query('.arrow') private arrow: HTMLElement;

  @property({ type: String })
  placement: Placement = 'top';

  @state() private _show = false;
  @state() private _position : Strategy = 'absolute';

  connectedCallback() {
    super.connectedCallback();

    setTimeout(() => {
     const host = this.shadowRoot?.host as HTMLElement;
     this._position = getComputedStyle(host).getPropertyValue('--bl-tooltip-position') as Strategy;
    });
  }

  private setTooltip() {
    computePosition(this.trigger, this.tooltip, {
      placement: this.placement,
      strategy: this._position,
      middleware: [offset(8), shift({ padding: 5 }), flip(),arrow({ element: this.arrow, padding: 5 })],
    }).then(({ x, y, placement, middlewareData }) => {
      const arrowX = middlewareData.arrow?.x;
      const arrowY = middlewareData.arrow?.y;

      // const arrowX = middlewareData.arrow?.x != null ? `${middlewareData.arrow?.x}px` : '';
      // const arrowY = middlewareData.arrow?.y != null ? `${middlewareData.arrow?.y}px`  : ' ';
      const host = this.shadowRoot?.host as HTMLElement;
      const arrowDirections = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      };
      const tooltipPlacement = placement.split('-')[0] as keyof typeof arrowDirections;
      const arrowDirection = arrowDirections[tooltipPlacement];

      host.style.setProperty('--bl-tooltip-left',`${x}px`);
      host.style.setProperty('--bl-tooltip-top',`${y}px`)
      host.style.setProperty('--bl-tooltip-arrow-left',`${arrowX}px`);
      host.style.setProperty('--bl-tooltip-arrow-top',`${arrowY}px`);
      host.style.setProperty(`--bl-tooltip-arrow-${arrowDirection}`,'-4px');
    });
  }

  private show() {
    this._show = true;
    this.setTooltip();
  }

  private hide() {
    this._show = false;
  }

  render(): TemplateResult { 
    const classes = classMap({
      'tooltip': true,
      'show': this._show,
      'hidden': !this._show
    });

    return html`
      <slot 
        class="trigger" 
        name="tooltip-trigger"
        @mouseover="${this.show}" 
        @mouseleave="${this.hide}">
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