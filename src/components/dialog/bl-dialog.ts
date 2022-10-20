import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { event, EventDispatcher } from '../../utilities/event';
import '../button/bl-button';
import style from './bl-dialog.css';

/**
 * @tag bl-dialog
 * @summary Baklava Dialog component
 */

type DialogElement = {
  showModal: () => void;
  close: () => void;
};

@customElement('bl-dialog')
export default class BlDialog extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets dialog open-close status
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Sets the dialog title
   */
  @property({ type: String })
  caption?: string;

  @query('dialog')
  dialog: HTMLDialogElement & DialogElement;

  @query('.container')
  container: HTMLElement;

  @query('footer')
  footer: HTMLElement;

  /**
   * Fires when the dialog is opened
   */
  @event('bl-dialog-open') private onOpen: EventDispatcher<object>;


  /**
   * Fires when the dialog is closed
   */
  @event('bl-dialog-close') private onClose: EventDispatcher<object>;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this.onKeydown);
    window?.addEventListener('resize', () => this.toggleShadow());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.toggleShadow);
  }

  firstUpdated() {
    if (this.open) {
      this.dialog.showModal();
      this.dialog.addEventListener('click', this._clickOutsideHandler);
    }
  }

  private onKeydown = (event: KeyboardEvent): void => {
    if (event.code === 'Escape' && this.open) {
      this.toggleModalHandler();
    }
  };

  private toggleModalHandler() {
    if (this.open) {
      this.open = false;
      this.dialog.close();
      this.dialog.removeEventListener('click', this._clickOutsideHandler);
      this.onClose({ isOpen: false });
    } else {
      this.dialog.showModal();
      this.dialog.addEventListener('click', this._clickOutsideHandler);
      this.open = true;
      this.onOpen({ isClose: true });
    }
  }

  private _clickOutsideHandler = (event: MouseEvent) => {
    const eventPath = event.composedPath() as HTMLElement[];

    if (!eventPath.includes(this.container)) {
      this.toggleModalHandler();
    }
  };

  get _hasFooter() {
    return [...this.childNodes].some(node => node.nodeName === 'BL-BUTTON');
  }

  private toggleShadow() {
    const content = this.shadowRoot?.querySelector('.content') as HTMLElement;

    if (content.scrollHeight > content.offsetHeight) {
      this.footer.classList.add('shadow');
    } else {
      this.footer.classList.remove('shadow');
    }
  }

  private renderFooter() {
    return  this._hasFooter
      ? html`<footer>
          <slot name="primary-action"></slot>
          <slot name="secondary-action"></slot>
          <slot name="tertiary-action"></slot>
        </footer>`
      : '';
  }

  render(): TemplateResult {
    const title = this.caption ? html`<h2>${this.caption}</h2>` : '';
    const classes = classMap({
      'content': true,
      'has-footer': this._hasFooter,
    });

    return html`
      <div>
        <dialog>
          <div class="container">
            <header>
              ${title}
              <bl-button
                @click="${this.toggleModalHandler}"
                icon="close"
                variant="tertiary"
                kind="neutral"
              ></bl-button>
            </header>
            <section class=${classes}><slot></slot></section>
            ${this.renderFooter()}
          </div>
        </dialog>

        <bl-button @click="${this.toggleModalHandler}">Open Modal</bl-button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-dialog': BlDialog;
  }
}
