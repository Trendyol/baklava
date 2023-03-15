import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ReferenceElement } from '@floating-ui/core';
import style from './bl-tooltip.css';
import { event, EventDispatcher } from '../../utilities/event';
import "../popover/bl-popover";
import {ifDefined} from "lit/directives/if-defined.js";
import type BlPopover from "../popover/bl-popover";

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

  // @query('.tooltip') private tooltip: HTMLElement;
  @query('.trigger') private trigger: ReferenceElement;
  @query('bl-popover') private popover: BlPopover;

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

  }



  /**
   * Shows tooltip
   */
  show() {
    this._visible = true
    this.popover.target = this.trigger;
    this.popover.show();
    this.onShow('Show event fired!');
  }

  /**
   * Hides tooltip
   */
  hide() {
    this._visible = false;
    this.popover.hide();
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
      <div class="wrapper">
        <bl-popover class="tooltip" .target="${this.trigger}" placement="${ifDefined(this.placement)}">
          <slot id="tooltip" class="content" role="tooltip"></slot>
        </bl-popover>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-tooltip': BlTooltip;
  }
}
