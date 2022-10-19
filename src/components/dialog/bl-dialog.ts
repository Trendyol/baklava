import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { event, EventDispatcher } from '../../utilities/event';
import '../button/bl-button';
import style from './bl-dialog.css';

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
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Sets the dialog title
   */
  @property({ type: String })
  caption?: string;

  @query('#dialog')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dialog: any; // FIXME: cannot use HTMLDialogElement as dialog type

  @query('.container')
  container: HTMLDialogElement;

  /**
   * Fires when the dialog is opened
   */
  @event('bl-dialog-open') private onClick: EventDispatcher<boolean>;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this.onKeydown);
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
      this.dialog.close(); // Upgrade TypeScript version above 4.7.0
      this.dialog.removeEventListener('click', this._clickOutsideHandler);
      this.onClick(false);
    } else {
      this.dialog.showModal();
      this.dialog.addEventListener('click', this._clickOutsideHandler);
      this.open = true;
      this.onClick(true);
    }
  }

  private _clickOutsideHandler = (event: MouseEvent) => {
    const eventPath = event.composedPath() as HTMLElement[];

    if(!eventPath.includes(this.container)) {
      this.toggleModalHandler();
    }
  };

  render(): TemplateResult {
    const title = this.caption ? html`<h2>${this.caption}</h2>` : '';
    return html`
      <div>
        <dialog id="dialog">
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
            <slot></slot>
            <footer class="actions">
              <button>Tamam</button>
              <button @click="${this.toggleModalHandler}">Kapat</button>
            </footer>
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
