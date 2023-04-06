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
   * Target elements state
   */
  @state() _target: string | Element;


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
        'BlTooltip target only accepts an Element instance or a string id of a DOM element.'
      );
    }

    if(this._target instanceof Element){
      this._target.addEventListener("focus",this.show.bind(this));
      this._target.addEventListener("blur",this.hide.bind(this));
      this._target.addEventListener("mouseover",this.show.bind(this));
      this._target.addEventListener("mouseleave",this.hide.bind(this));
    }
  }


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
    this.popover.target = this.trigger ? this.trigger : this._target;
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

  private triggerTemplate() {
      return html`<slot
        class="trigger"
        name="tooltip-trigger"
        aria-describedby="tooltip"
        @focus=${{ handleEvent: () => this.show(), capture: true }}
        @blur=${{ handleEvent: () => this.hide(), capture: true }}
        @mouseover=${() => this.show()}
        @mouseleave=${() => this.hide()}
      >
      </slot>`

  }

  render(): TemplateResult {
    return html`
      ${!this._target ? this.triggerTemplate() : ''}
      <div class="wrapper">
        <bl-popover class="tooltip" .target="${!this._target ? this.trigger : this._target}" placement="${ifDefined(this.placement)}">
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
