import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { event, EventDispatcher } from '../../../utilities/event';
import '../../button/bl-button';
import dialogPolyfillStyle from './bl-dialog-polyfill.css';
import dialogStyle from '../bl-dialog.css';

/**
 * @tag bl-dialog
 * @summary Baklava Dialog component
 */

type DialogElement = {
  showModal: () => void;
  close: () => void;
};

@customElement('bl-dialog-polyfill')
export default class BlDialogPoliyfill extends LitElement {
  static get styles(): CSSResultGroup {
    return [dialogPolyfillStyle,dialogStyle];
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

  @query('.dialog')
  dialog: HTMLDivElement;

  @query('footer')
  footer: HTMLElement;

  @query('.content')
  content: HTMLElement;

  @query('.backdrop')
  backdrop: HTMLDivElement;

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

    setTimeout(() => {
      window?.addEventListener('keydown', event => this.onKeydown(event));
      window?.addEventListener('resize', () => this.resizeHandler());
      this.dialog.addEventListener('click', this.clickOutsideHandler);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window?.removeEventListener('keydown', this.onKeydown);
    window?.removeEventListener('resize', this.resizeHandler);
    this.dialog.removeEventListener('click', this.clickOutsideHandler);
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('open')) {
      this.toggleDialogHandler();
    }
  }

  private resizeHandler() {
    this.changeContentHeight();
    this.toggleFooterSticky();
  }

  private toggleDialogHandler() {
    if (this.open) {
      if(HTMLDialogElement){
        this.dialog.showModal?.();

    }else{
      this.dialog.style.setProperty('--display', 'flex');

    }
      this.dialog.style.setProperty('--display', 'flex');
      this.onOpen({ isOpen: true });
      document.body.style.overflow = 'hidden';
    } else {
      this.dialog.style.setProperty('--display', 'none');
      this.onClose({ isOpen: false });
      document.body.style.overflow = 'auto';
    }

    this.resizeHandler();
  }

  clickOutsideHandler = (event: MouseEvent) => {
    const eventPath = event.composedPath() as HTMLElement[];

    if (!eventPath.includes(this.dialog)) {
      this.closeDialog();
    }
  };

  private closeDialog() {
    this.open = false;
  }

  private onKeydown = (event: KeyboardEvent): void => {
    if (event.code === 'Escape' && this.open) {
      this.closeDialog();
    }
  };

  private toggleFooterSticky() {
    if (this.content?.scrollHeight > this.content?.offsetHeight) {
      this.footer?.classList?.add('sticky');
    } else {
      this.footer?.classList?.remove('sticky');
    }
  }

  private changeContentHeight() {
    const footerHeight = this.footer?.offsetHeight || 0;
    let contentHeight = 144; // 56px(header) + 48px(dialog-margin) + 40px(content-padding)

    if (window.innerWidth < 470) {
       contentHeight = 128; // 56px(header) + 32px(dialog-margin) + 40px(content-padding)
    }

    this.content.style.maxHeight = `${window.innerHeight - (contentHeight + footerHeight)}px`;
  }

  get _hasFooter() {
    return [...this.childNodes].some(node => node.nodeName === 'BL-BUTTON');
  }

  private renderFooter() {
    return this._hasFooter
      ? html`<footer>
          <slot name="primary-action"></slot>
          <slot name="secondary-action"></slot>
          <slot name="tertiary-action"></slot>
        </footer>`
      : '';
  }

  render(): TemplateResult {
    const title = this.caption ? html`<h2 id="dialog-caption">${this.caption}</h2>` : '';

    return html`
      <div class='dialog' aria-labelledby="dialog-caption">
        <div class="container">
          <header>
            ${title}
            <bl-button
              @click="${this.closeDialog}"
              icon="close"
              variant="tertiary"
              kind="neutral"
            ></bl-button>
          </header>
          <section class='content'><slot /></section>
          ${this.renderFooter()}
        </div>
  </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-dialog-polyfill': BlDialogPoliyfill;
  }
}
