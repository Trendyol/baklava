import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
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

  @query('.dialog')
  dialog: HTMLDialogElement & DialogElement;

  @query('.dialog-polyfill')
  dialogPolyfill: HTMLDivElement;

  @query('footer')
  footer: HTMLElement;

  @query('.container')
  container: HTMLElement;

  @query('.content')
  content: HTMLElement;

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
      this.dialog?.addEventListener('click', this.clickOutsideHandler);
      this.dialogPolyfill?.addEventListener('click', this.clickOutsideHandler);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window?.removeEventListener('keydown', this.onKeydown);
    window?.removeEventListener('resize', this.resizeHandler);
    this.dialog?.removeEventListener('click', this.clickOutsideHandler);
    this.dialogPolyfill?.removeEventListener('click', this.clickOutsideHandler);
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('open')) {
      this.toggleDialogHandler();
    }
  }

  private get isHtmlDialogSupport() {
    return !!window.HTMLDialogElement;
  }
  private get _hasFooter() {
    return [...this.childNodes].some(node => node.nodeName === 'BL-BUTTON');
  }

  private resizeHandler() {
    this.changeContentHeight();
    this.toggleFooterSticky();
  }

  private toggleDialogHandler() {
    if (this.open) {
      this.isHtmlDialogSupport
        ? this.dialog.showModal?.()
        : this.dialogPolyfill.style.setProperty('--display', 'flex');
      this.onOpen({ isOpen: true });
      document.body.style.overflow = 'hidden';
    } else {
      this.isHtmlDialogSupport
        ? this.dialog.close?.()
        : this.dialogPolyfill.style.setProperty('--display', 'none');
      this.onClose({ isOpen: false });
      document.body.style.overflow = 'auto';
    }

    this.resizeHandler();
  }

  clickOutsideHandler = (event: MouseEvent) => {
    const eventPath = event.composedPath() as HTMLElement[];

    if (!eventPath.includes(this.container)) {
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

    if (window.innerWidth <= 471) {
      contentHeight = 128; // 56px(header) + 32px(dialog-margin) + 40px(content-padding)
    }

    this.content.style.maxHeight = `${window.innerHeight - (contentHeight + footerHeight)}px`;
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

  renderContainer() {
    const title = this.caption ? html`<h2 id="dialog-caption">${this.caption}</h2>` : '';

    return html` <div class="container">
      <header>
        ${title}
        <bl-button
          @click="${this.closeDialog}"
          icon="close"
          variant="tertiary"
          kind="neutral"
        ></bl-button>
      </header>
      <section class="content"><slot /></section>
      ${this.renderFooter()}
    </div>`;
  }

  render(): TemplateResult {
    return this.isHtmlDialogSupport
      ? html`
          <dialog class="dialog" aria-labelledby="dialog-caption">${this.renderContainer()}</dialog>
        `
      : html`<div class="dialog-polyfill" aria-labelledby="dialog-caption">
          ${this.renderContainer()}
        </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-dialog': BlDialog;
  }
}
