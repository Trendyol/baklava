import {customElement, property} from "lit/decorators.js";
import {CSSResultGroup, html, LitElement, TemplateResult} from "lit";
import {event, EventDispatcher} from "../../utilities/event";
import '../button/bl-button';
import style from './bl-drawer.css';
import {PropertyValues} from "lit/development";

/**
 * @tag bl-drawer
 * @summary Baklava Drawer component
 *
 */

@customElement('bl-drawer')
export default class BlDrawer extends LitElement{
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets drawer open-close status
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   *  Sets the drawer title
   */
  @property({type:String})
  caption: string;

  /**
   *  Sets the drawer external link
   */
  @property({type:String})
  external_link?: string;

  /**
   * Fires when the drawer is opened
   */
  @event('bl-drawer-open') private onOpen: EventDispatcher<object>;

  /**
   * Fires when the drawer is closed
   */
  @event('bl-drawer-close') private onClose: EventDispatcher<object>;

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('open')) {
      this.toggleDialogHandler();
    }
  }

  private toggleDialogHandler() {
    if (this.open) {
      this.onOpen({ isOpen: true });
    } else {
      this.onClose({ isOpen: false });
    }
  }

  private closeDrawer() {
    this.open = false;
  }

  private renderContainer() {
    const title = this.caption ? html`<h2 id="drawer-caption">${this.caption}</h2>` : '';
    const external_button = this.external_link ? html`<bl-button
      icon="external_link"
      variant="tertiary"
      kind="neutral"
      href="${this.external_link}"
      target="_blank"
    ></bl-button>` : '';

    return html`<div class="container">
      <header>
        ${title}
        <div>
          ${external_button}
          <bl-button
            @click="${this.closeDrawer}"
            icon="close"
            variant="tertiary"
            kind="neutral"
          ></bl-button>
        </div>
      </header>
      <section class="content"><slot /></section>
    </div>`;
  }



  render(): TemplateResult{
    return html`<div class="drawer">
          ${this.renderContainer()}
        </div>`;
  }

}
declare global{
  interface HTMLElementTagNameMap {
    'bl-drawer' : BlDrawer;
  }
}
