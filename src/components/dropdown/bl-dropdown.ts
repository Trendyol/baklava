import { LitElement, html, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { computePosition, flip, offset, autoUpdate } from '@floating-ui/dom';
import { event, EventDispatcher } from '../../utilities/event';
import { classMap } from 'lit/directives/class-map.js';

import style from './bl-dropdown.css';

import '../button/bl-button'
import { ButtonSize, ButtonVariant, ButtonKind } from '../button/bl-button';
import { ifDefined } from 'lit/directives/if-defined.js';

export type CleanUpFunction = () => void;

@customElement('bl-dropdown')
export default class BlDropdown extends LitElement {
    static get styles(): CSSResultGroup {
        return [style];
    }

    @query('bl-button')
    private _dropdownButton: HTMLElement;

    @query('.popover')
    private _popover: HTMLElement;

    private _cleanUpPopover: CleanUpFunction | null = null;

    @state() private _isPopoverOpen = false;

    /**
    * Sets the dropdown button label
    */
    @property({ type: String, reflect: true })
    label = 'Dropdown Button';

    /**
    * Sets the dropdown button variant
    */
    @property({ type: String, reflect: true })
    variant: ButtonVariant = 'primary';

    /**
    * Sets the dropdown button kind
    */
    @property({ type: String, reflect: true })
    kind: ButtonKind = 'default';

    /**
     * Sets the dropdown button size
     */
    @property({ type: String, reflect: true })
    size: ButtonSize = 'medium';

    /**
   * Sets button as disabled
   */
    @property({ type: Boolean, reflect: true })
    disabled = false;

    /**
    * Fires when dropdown opened
    */
    @event('bl-dropdown-open') private onOpen: EventDispatcher<string>;

    /**
     * Fires when dropdown closed
     */
    @event('bl-dropdown-close') private onClose: EventDispatcher<string>;

    connectedCallback() {
        super.connectedCallback();
    }
    disconnectedCallback() {
        super.disconnectedCallback();

        this._cleanUpPopover && this._cleanUpPopover();
    }

    get isPopoverOpen() {
        return this._isPopoverOpen;
    }

    private _handleClick() {
        !this._isPopoverOpen ? this.open() : this.close()
    }

    private _handleClickOutside = (event: MouseEvent) => {
        const eventPath = event.composedPath() as HTMLElement[];
        if (!eventPath.includes(this._popover) && !eventPath.includes(this._dropdownButton)) {
            this.close();
        }
    };

    private open() {
        this._isPopoverOpen = true
        this._setupPopover();
        this.onOpen('Dropdown opened!')
        document.addEventListener('click', this._handleClickOutside);
    }

    private close() {
        this._isPopoverOpen = false
        this.onClose('Dropdown closed!');
        this._cleanUpPopover && this._cleanUpPopover();
        document.removeEventListener('click', this._handleClickOutside);
    }

    private _setupPopover() {
        this._cleanUpPopover = autoUpdate(this._dropdownButton, this._popover, () => {
            computePosition(this._dropdownButton, this._popover, {
                placement: 'bottom-start',
                strategy: 'fixed',
                middleware: [
                    flip(),
                    offset(8)
                ],
            }).then(({ x, y }) => {
                this._popover.style.setProperty('--left', `${x}px`);
                this._popover.style.setProperty('--top', `${y}px`);
            });
        })
    }

    render(): TemplateResult {
        const popoverClasses = classMap({
            'popover': true,
            visible: this._isPopoverOpen,
        });

        return html`<bl-button
        dropdown
        .active=${this._isPopoverOpen}
        ?disabled=${ifDefined(this.disabled)}
        variant="${this.variant}"
        kind="${this.kind}"
        size="${this.size}"
        @click="${this._handleClick}">
        ${this.label}
        </bl-button>
        <div class="${popoverClasses}"><slot></slot></div>
        `
    }

}

declare global {
    interface HTMLElementTagNameMap {
        'bl-dropdown': BlDropdown;
    }
}

