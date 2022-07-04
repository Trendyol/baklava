import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { computePosition, flip, shift, offset, arrow } from '@floating-ui/dom';
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
  @state() private _hasContentSlot = false;

  // connectedCallback() {
  //   super.connectedCallback();

  //   setTimeout(() => {
  //     // this.setTooltip();
  //   });
  // }

  firstUpdated() {
    this._hasContentSlot = this.checkContentSlot;
  }

  private get checkContentSlot() {
    const childNodes = [...this.childNodes];
    return childNodes.some(node => {
      const nodeType = node.nodeType;

      if (nodeType === node.ELEMENT_NODE) {
        if ((node as HTMLElement).hasAttribute('slot') && 
        (node as HTMLElement).getAttribute('slot') === 'tooltip-content') {
          return true;
        }
      }
      return false;
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
    this.setTooltip();
  }

  hide() {
    this._show = false;
  }

  render(): TemplateResult { 
    const content = this._hasContentSlot ? html`<slot name="tooltip-content"></slot>` : this.text;
   
    return html`
      <slot class="trigger" 
        @mouseover="${this.show}" 
        @mouseleave="${this.hide}">
      </slot>
      <div class="tooltip" show=${this._show}>
        ${content}
        <div class="arrow"></div>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-tooltip': BlTooltip;
  }
}
