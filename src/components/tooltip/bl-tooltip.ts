import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { ReferenceElement } from "@floating-ui/core";
import { event, EventDispatcher } from "../../utilities/event";
import "../popover/bl-popover";
import type BlPopover from "../popover/bl-popover";
import { Placement } from "../popover/bl-popover";
import style from "./bl-tooltip.css";

/**
 * @tag bl-tooltip
 * @summary Baklava Tooltip component
 * @dependency bl-popover
 *
 * @cssproperty [--bl-tooltip-trigger-display=inline] Set the display of the tooltip trigger.
 */
@customElement("bl-tooltip")
export default class BlTooltip extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  @query(".trigger") private trigger: ReferenceElement;
  @query("bl-popover") private popover: BlPopover;

  /**
   * Sets placement of the tooltip
   */
  @property({ type: String })
  placement: Placement = "top";

  /**
   * Fires when hovering over a trigger
   */
  @event("bl-tooltip-show") private onShow: EventDispatcher<string>;

  /**
   * Fires when leaving over from trigger
   */
  @event("bl-tooltip-hide") private onHide: EventDispatcher<string>;

  /**
   * Shows tooltip
   */
  show() {
    this.popover.target = this.trigger;
    this.popover.show();
    this.onShow("");
  }

  /**
   * Hides tooltip
   */
  hide() {
    this.popover.hide();
    this.onHide("");
  }

  /**
   * Gives the visibility status of the tooltip
   */
  get visible(): boolean {
    return this.popover.visible;
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
    </slot>`;
  }

  render(): TemplateResult {
    return html`
      ${this.triggerTemplate()}
      <bl-popover
        .target="${this.trigger}"
        placement="${ifDefined(this.placement)}"
        @bl-popover-hide="${() => this.onHide("")}"
      >
        <slot class="content" id="tooltip" role="tooltip"></slot>
      </bl-popover>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bl-tooltip": BlTooltip;
  }
}
