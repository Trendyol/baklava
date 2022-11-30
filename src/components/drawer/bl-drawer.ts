import {customElement, property} from "lit/decorators.js";
import {CSSResultGroup, html, LitElement, TemplateResult} from "lit";
import {event, EventDispatcher} from "../../utilities/event";
import '../button/bl-button';
import style from './bl-drawer.css';
import {PropertyValues} from "lit";

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
  caption?: string;

  /**
   *  Sets the drawer embed url for iframe
   */
  @property({type:String})
  embedUrl?: string;

  /**
   *  Sets the drawer external link
   */
  @property({type:String})
  externalLink?: string;

  /**
   * Fires when the drawer is opened
   */
  @event('bl-drawer-open') private onOpen: EventDispatcher<object>;

  /**
   * Fires when the drawer is closed
   */
  @event('bl-drawer-close') private onClose: EventDispatcher<object>;

  connectedCallback() {
    super.connectedCallback();
    window?.addEventListener('bl-drawer-open',(event) => {
      if(event.target !== this)
        this.closeDrawer();
    });
  }

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

  private renderContent(){
    const content = this.embedUrl ?
      html`<iframe src=${this.embedUrl}></iframe>`
      : html`<slot />`

    return html`<section class=${this.embedUrl ? 'iframe-content' : 'content'}>
      ${content}
      </section>`
  }

  private renderContainer() {
    const title = this.caption ? html`<h2 id="drawer-caption">${this.caption}</h2>` : '';
    const external_button = this.externalLink ? html`<bl-button
      icon="external_link"
      variant="tertiary"
      kind="neutral"
      href="${this.externalLink}"
      target="_blank"
    ></bl-button>` : '';

    return html`<div class="container">
      <header>
        ${title}
        <div class="header-buttons">
          ${external_button}
          <bl-button
            @click="${this.closeDrawer}"
            icon="close"
            variant="tertiary"
            kind="neutral"
          ></bl-button>
        </div>
      </header>
      ${this.renderContent()}
    </div>`;
  }



  render(): TemplateResult{
    if(this.open){
      return html`<div class="drawer">
          ${this.renderContainer()}
        </div>`;
    }else {
      return html``
    }
  }

}
declare global{
  interface HTMLElementTagNameMap {
    'bl-drawer' : BlDrawer;
  }
}
