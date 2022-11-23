import { LitElement, html, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { event, EventDispatcher } from '../../../utilities/event';

import style from './bl-dropdown-item.css';

import '../../button/bl-button'
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement('bl-dropdown-item')
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
        this.onClick('Action clicked!')
    }

    render(): TemplateResult {
        return html`
            <bl-button
            variant="tertiary"
            kind="neutral" 
            icon="${ifDefined(this.icon)}" 
            @click="${this._handleClick}"><slot></slot>
            </bl-button>`
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'bl-dropdown-item': BlDropdownItem;
    }
}

