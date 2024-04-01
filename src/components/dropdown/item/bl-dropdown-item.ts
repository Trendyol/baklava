import { LitElement, html, CSSResultGroup, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { event, EventDispatcher } from "../../../utilities/event";
import "../../button/bl-button";
import BlButton from "../../button/bl-button";
import { BaklavaIcon } from "../../icon/icon-list";
import type BlSplitButton from "../../split-button/bl-split-button";
import { blSplitButtonTag } from "../../split-button/bl-split-button";
import type BlDropdown from "../bl-dropdown";
import { blDropdownTag } from "../bl-dropdown";
import type BlDropdownGroup from "../group/bl-dropdown-group";
import { blDropdownGroupTag } from "../group/bl-dropdown-group";
import style from "./bl-dropdown-item.css";

export const blDropdownItemTag = "bl-dropdown-item";

/**
 * @tag bl-dropdown-item
 * @summary Baklava Dropdown Item component
 */
@customElement(blDropdownItemTag)
export default class BlDropdownItem extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets the icon name. Shows icon with bl-icon component
   */

  @property({ type: String })
  icon?: BaklavaIcon;

  @event("bl-dropdown-item-click") private onClick: EventDispatcher<string>;

  private _handleClick() {
    this.BlDropdownField?.close();
    this.BlSplitButtonField?.close();
    this.onClick("Action clicked!");
  }

  @query("[role=menuitem]") private menuElement: BlButton;

  /**
   * Focuses this action
   */
  focus() {
    this.menuElement.focus();
  }

  private BlDropdownGroupField: BlDropdownGroup | null;
  private BlDropdownField: BlDropdown | null;
  private BlSplitButtonField: BlSplitButton | null;

  connectedCallback(): void {
    super.connectedCallback();

    this.BlDropdownGroupField = this.closest<BlDropdownGroup>(blDropdownGroupTag);
    this.BlDropdownField = this.closest<BlDropdown>(blDropdownTag);
    this.BlSplitButtonField = this.closest<BlSplitButton>(blSplitButtonTag);

    if (!this.BlDropdownField && !this.BlDropdownGroupField && !this.BlSplitButtonField) {
      console.warn(
        `bl-dropdown-item is designed to be used inside a ${blDropdownGroupTag}, ${blDropdownTag} or ${blSplitButtonTag}`,
        this
      );
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  render(): TemplateResult {
    return html`<bl-button
      variant="tertiary"
      kind="neutral"
      icon="${ifDefined(this.icon)}"
      role="menuitem"
      @click="${this._handleClick}"
      ><slot></slot>
    </bl-button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [blDropdownItemTag]: BlDropdownItem;
  }
}
