import { LitElement, html, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { event, EventDispatcher } from '../../../utilities/event';
import type BlDropdownGroup from '../group/bl-dropdown-group';
import type BlDropdown from '../bl-dropdown';

import { blDropdownGroupTag } from '../group/bl-dropdown-group';
import { blDropdownTag } from '../bl-dropdown';

import style from './bl-dropdown-item.css';

import '../../button/bl-button';
import { ifDefined } from 'lit/directives/if-defined.js';

export const blDropdownItemTag = 'bl-dropdown-item';

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
  icon?: string;

  @event('bl-dropdown-item-click') private onClick: EventDispatcher<string>;

  private _handleClick() {
    this.onClick('Action clicked!');
  }

  private BlDropdownGroupField: BlDropdownGroup | null;
  private BlDropdownField: BlDropdown | null;

  connectedCallback(): void {
    super.connectedCallback();

    this.BlDropdownGroupField = this.closest<BlDropdownGroup>(blDropdownGroupTag);
    this.BlDropdownField = this.closest<BlDropdown>(blDropdownTag);

    if (!this.BlDropdownField && !this.BlDropdownGroupField) {
      console.warn(`bl-dropdown-item is designed to be used inside a ${blDropdownGroupTag} or ${blDropdownTag}`, this);
    }

  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  render(): TemplateResult {
    return html` <bl-button
      variant="tertiary"
      kind="neutral"
      icon="${ifDefined(this.icon)}"
      @click="${this._handleClick}"
      role="menuitem"
      ><slot></slot>
    </bl-button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [blDropdownItemTag]: BlDropdownItem;
  }
}
