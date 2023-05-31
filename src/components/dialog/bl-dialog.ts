import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { event, EventDispatcher } from '../../utilities/event';
import { classMap } from 'lit/directives/class-map.js';
import '../button/bl-button';
import style from './bl-dialog.css';

type DialogElement = {
  showModal: () => void;
  close: () => void;
};

/**
 * @tag bl-dialog
 * @summary Baklava Dialog component
 */
@customElement('bl-dialog')
export default class BlDialog extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets dialog open-close status
   */
  @property({ type: Boolean, reflect: true, hasChanged(newVal: boolean, oldVal: boolean | undefined) {
    if (newVal === false && oldVal === undefined) {
      // Assume that the initial value is false
      return false;
    }
    return newVal !== oldVal;
  } })
  open = false;

  /**
   * Sets the dialog title
   */
  @property({ type: String })
  caption?: string;

  @query('.dialog')
  private dialog: HTMLDialogElement & DialogElement;

  @query('footer')
  private footer: HTMLElement;

  @query('.container')
  private container: HTMLElement;

  @query('.content')
  private content: HTMLElement;

  /**
   * Fires when the dialog is opened
   */
  @event('bl-dialog-open') private onOpen: EventDispatcher<object>;

  /**
   * Fires before the dialog is closed with internal actions like clicking close button,
   * pressing Escape key or clicking backdrop. Can be prevented by calling `event.preventDefault()`
   */
  @event('bl-dialog-request-close') private onRequestClose: EventDispatcher<{ source: 'close-button' | 'keyboard' | 'backdrop' }>;

  /**
   * Fires when the dialog is closed
   */
  @event('bl-dialog-close') private onClose: EventDispatcher<object>;

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('open')) {
      this.toggleDialogHandler();
    }
  }

  private get hasHtmlDialogSupport() {
    return !!window.HTMLDialogElement;
  }

  private get _hasFooter() {
    return [...this.childNodes].some(node => node.nodeName === 'BL-BUTTON');
  }

  private toggleDialogHandler() {
    if (this.open) {
      this.dialog?.showModal?.();
      this.onOpen({ isOpen: true });
      document.body.style.overflow = 'hidden';
      this.toggleFooterShadow();
      window?.addEventListener('keydown', event => this.onKeydown(event));
      window?.addEventListener('resize', () => this.toggleFooterShadow());
    } else {
      this.dialog?.close?.();
      this.onClose({ isOpen: false });
      document.body.style.overflow = 'auto';
      window?.removeEventListener('keydown', this.onKeydown);
      window?.removeEventListener('resize', this.toggleFooterShadow);
    }
  }

  private closeDialog(source: 'close-button' | 'keyboard' | 'backdrop') {
    const requestCloseEvent = this.onRequestClose({ source }, { cancelable: true });

    if (requestCloseEvent.defaultPrevented) {
      return;
    }

    this.open = false;
  }

  private clickOutsideHandler = (event: MouseEvent) => {
    const eventPath = event.composedPath() as HTMLElement[];

    if (!eventPath.includes(this.container)) {
      this.closeDialog('backdrop');
    }
  };

  private onKeydown = (event: KeyboardEvent): void => {
    if (event.code === 'Escape' && this.open) {
      event.preventDefault();
      this.closeDialog('keyboard');
    }
  };

  private toggleFooterShadow() {
    if (this.content?.scrollHeight > this.content?.offsetHeight) {
      this.footer?.classList?.add('shadow');
    } else {
      this.footer?.classList?.remove('shadow');
    }
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

  private renderContainer() {
    const title = this.caption ? html`<h2 id="dialog-caption">${this.caption}</h2>` : '';

    const classes = {
      container: true,
      'has-footer': this._hasFooter,
    };

    return html` <div class="${classMap(classes)}">
      <header>
        ${title}
        <bl-button
          @click="${() => this.closeDialog('close-button')}"
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
    return this.hasHtmlDialogSupport
      ? html`
          <dialog
            class="dialog"
            aria-labelledby="dialog-caption"
            @click=${this.clickOutsideHandler}
          >
            ${this.renderContainer()}
          </dialog>
        `
      : html`<div
          class="dialog-polyfill"
          role="dialog"
          aria-labelledby="dialog-caption"
          @click=${this.clickOutsideHandler}
        >
          ${this.renderContainer()}
        </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-dialog': BlDialog;
  }
}
