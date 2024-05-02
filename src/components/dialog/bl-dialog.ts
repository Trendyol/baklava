import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { event, EventDispatcher } from "../../utilities/event";
import "../button/bl-button";
import style from "./bl-dialog.css";

type DialogElement = {
  showModal: () => void;
  close: () => void;
};

/**
 * @tag bl-dialog
 * @summary Baklava Dialog component
 */
@customElement("bl-dialog")
export default class BlDialog extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets dialog open-close status
   */
  @property({
    type: Boolean,
    reflect: true,
    hasChanged(newVal: boolean, oldVal: boolean | undefined) {
      if (newVal === false && oldVal === undefined) {
        // Assume that the initial value is false
        return false;
      }
      return newVal !== oldVal;
    },
  })
  open = false;

  /**
   * Sets the dialog title
   */
  @property({ type: String })
  caption?: string;

  /**
   * Determines if dialog currently uses polyfilled version instead of native HTML Dialog. By
   * default, it uses native Dialog if the browser supports it, otherwise polyfills. You can force
   * using polyfill by setting this to true in some cases like to show some content on top of dialog
   * in case you are not able to use Popover API. Be aware that, polyfilled version can cause some
   * inconsistencies in terms of accessibility and stacking context. So use it with extra caution.
   *
   * As of the current implementation, you can render above the dialog HTML element using the Popover API. However,
   * it will block any actions on the Popover element. This issue was encountered during the development of the `bl-notification` component.
   * As a result, we decided to enable the polyfill for the `bl-dialog` component by default. If you prefer to use the native dialog, you can set
   * this property to false. Please note, doing so will cause notifications to render under the dialog backdrop.
   * For more information, refer to the comment linked below:
   *
   * https://github.com/Trendyol/baklava/issues/141#issuecomment-1810301413
   */
  @property({ type: Boolean, reflect: true })
  polyfilled = true;

  @query(".dialog")
  private dialog: HTMLDialogElement & DialogElement;

  @query("footer")
  private footer: HTMLElement;

  @query(".container")
  private container: HTMLElement;

  @query(".content")
  private content: HTMLElement;

  /**
   * Fires when the dialog is opened
   */
  @event("bl-dialog-open") private onOpen: EventDispatcher<object>;

  /**
   * Fires before the dialog is closed with internal actions like clicking close button,
   * pressing Escape key or clicking backdrop. Can be prevented by calling `event.preventDefault()`
   */
  @event("bl-dialog-request-close") private onRequestClose: EventDispatcher<{
    source: "close-button" | "keyboard" | "backdrop";
  }>;

  /**
   * Fires when the dialog is closed
   */
  @event("bl-dialog-close") private onClose: EventDispatcher<object>;

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has("open") || changedProperties.has("polyfilled")) {
      this.toggleDialogHandler();
    }
  }

  private get _hasFooter() {
    return [...this.childNodes].some(node => node.nodeName === "BL-BUTTON");
  }

  private toggleDialogHandler() {
    if (this.open) {
      this.dialog?.showModal?.();
      this.onOpen({ isOpen: true });
      document.body.style.overflow = "hidden";
      this.toggleFooterShadow();
      window?.addEventListener("keydown", event => this.onKeydown(event));
      window?.addEventListener("resize", this.toggleFooterShadow);
      this.content?.addEventListener("scroll", this.toggleFooterShadow);
    } else {
      this.dialog?.close?.();
      this.onClose({ isOpen: false }, { bubbles: false });
      document.body.style.overflow = "auto";
      window?.removeEventListener("keydown", this.onKeydown);
      window?.removeEventListener("resize", this.toggleFooterShadow);
      this.content?.removeEventListener("scroll", this.toggleFooterShadow);
    }
  }

  private closeDialog(source: "close-button" | "keyboard" | "backdrop") {
    const requestCloseEvent = this.onRequestClose({ source }, { cancelable: true });

    if (requestCloseEvent.defaultPrevented) {
      return;
    }

    this.open = false;
  }

  private clickOutsideHandler = (event: MouseEvent) => {
    const eventPath = event.composedPath() as HTMLElement[];

    if (!eventPath.includes(this.container)) {
      this.closeDialog("backdrop");
    }
  };

  private onKeydown = (event: KeyboardEvent): void => {
    if (event.code === "Escape" && this.open) {
      event.preventDefault();
      this.closeDialog("keyboard");
    }
  };

  private toggleFooterShadow = () => {
    const scrollTop = this.content?.scrollTop;
    const scrollHeight = this.content?.scrollHeight;
    const clientHeight = this.content?.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      this.footer?.classList?.remove("shadow");
    } else {
      this.footer?.classList?.add("shadow");
    }
  };

  private renderFooter() {
    return this._hasFooter
      ? html`<footer>
          <slot name="primary-action"></slot>
          <slot name="secondary-action"></slot>
          <slot name="tertiary-action"></slot>
        </footer>`
      : "";
  }

  private renderContainer() {
    const title = this.caption ? html`<h2 id="dialog-caption">${this.caption}</h2>` : "";

    const classes = {
      "container": true,
      "has-footer": this._hasFooter,
    };

    return html` <div class="${classMap(classes)}">
      <header>
        ${title}
        <bl-button
          @click="${() => this.closeDialog("close-button")}"
          icon="close"
          variant="tertiary"
          kind="neutral"
        ></bl-button>
      </header>
      <section class="content"><slot></slot></section>
      ${this.renderFooter()}
    </div>`;
  }

  render(): TemplateResult {
    return this.polyfilled || !window.HTMLDialogElement
      ? html`<div
          class="dialog-polyfill"
          role="dialog"
          aria-labelledby="dialog-caption"
          @click=${this.clickOutsideHandler}
        >
          ${this.renderContainer()}
        </div>`
      : html`
          <dialog
            class="dialog"
            aria-labelledby="dialog-caption"
            @click=${this.clickOutsideHandler}
          >
            ${this.renderContainer()}
          </dialog>
        `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bl-dialog": BlDialog;
  }
}
