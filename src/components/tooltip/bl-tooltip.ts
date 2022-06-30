import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { computePosition, flip, shift, offset, arrow } from '@floating-ui/dom';
import { ifDefined } from 'lit/directives/if-defined.js';
import style from './bl-tooltip.css';

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

@customElement('bl-tooltip')
export default class BlTooltip extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  @query('.tooltip') tooltip: HTMLElement;
  @query('.trigger') trigger: HTMLElement;
  @query('.arrow') arrow: HTMLElement;

  @property({ type: String })
  placement: Placement = 'top';

  @property({ type: String })
  text?: string;

  @state() private _show = false;

  connectedCallback() {
    super.connectedCallback();

    setTimeout(() => {
      this.setTooltip();
    });
  }

  setTooltip() {
    computePosition(this.trigger, this.tooltip, {
      placement: this.placement,
      middleware: [offset(8), shift({ padding: 5 }), flip(),arrow({ element: this.arrow })],
    }).then(({ x, y, placement, middlewareData }) => {
      this.tooltip.style.left = `${x}px`;
      this.tooltip.style.top = `${y}px`;

      const arrowX = middlewareData.arrow?.x;
      const arrowY = middlewareData.arrow?.y;

      const arrowDirections = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      };

      const tooltipPlacement = placement.split('-')[0] as keyof typeof arrowDirections;
      const arrowDirection = arrowDirections[tooltipPlacement];

      Object.assign(this.arrow.style, {
        left: arrowX ? `${arrowX}px` : '',
        top: arrowY ? `${arrowY}px` : '',
        [arrowDirection]: '-3px',
      });
    });
  }

  show() {
    this._show = true;
  }

  hide() {
    this._show = false;
  }

  render(): TemplateResult {
    return html`<slot class="trigger" @mouseover="${this.show}" @mouseleave="${this.hide}"> </slot>
      <div class="tooltip" show=${this._show}>
        ${ifDefined(this.text)}
        <slot name="tooltip-content"></slot>
        <div class="arrow"></div>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-tooltip': BlTooltip;
  }
}
