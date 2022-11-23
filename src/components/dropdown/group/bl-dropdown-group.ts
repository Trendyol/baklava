import { LitElement, html, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import style from './bl-dropdown-group.css';

@customElement('bl-dropdown-group')
export default class BlDropdownGroup extends LitElement {
    static get styles(): CSSResultGroup {
        return [style];
    }

    /**
     * Sets the caption.
     */
    @property({ type: String })
    caption?: string;


    render(): TemplateResult {
        const caption = this.caption ? html`<span class="caption">${this.caption}</span>` : ''

        return html`<div class="dropdown-group">
            ${caption}
          <slot></slot>
        </div>`
    }

}


declare global {
    interface HTMLElementTagNameMap {
        'bl-dropdown-group': BlDropdownGroup;
    }
}

