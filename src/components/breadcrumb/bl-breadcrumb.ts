import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import "../icon/bl-icon";
import "../popover/bl-popover";
import style from "./bl-breadcrumb.css";
import "./item/bl-breadcrumb-item";

type BlPopoverElement = HTMLElement & { show(): void; hide(): void; target: string | Element };

const MAX_VISIBLE_ITEMS = 4;

export interface BreadcrumbItemData {
  href: string;
  label: string;
}

/**
 * @tag bl-breadcrumb
 * @summary İkincil navigasyon: kullanıcının hiyerarşiyi görmesini ve seviyeler arasında geri gitmesini sağlar.
 *
 * @cssproperty [--bl-breadcrumb-separator-color=--bl-color-neutral-light] Ayırıcı (chevron) rengi
 */

@customElement("bl-breadcrumb")
export default class BlBreadcrumb extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Breadcrumb öğeleri. Dışarıdan bu property ile verilir.
   */
  @property({ type: Array })
  items: BreadcrumbItemData[] = [];

  @query("bl-popover") private _popover: BlPopoverElement;

  @query(".ellipsis-trigger") private _ellipsisTrigger: HTMLElement;

  @state() private _ellipsisActive = false;

  private get collapsed(): boolean {
    return this.items.length > MAX_VISIBLE_ITEMS;
  }

  private get visibleItems(): BreadcrumbItemData[] {
    if (!this.collapsed) return this.items;
    const first = this.items[0];
    const last = this.items[this.items.length - 1];

    return first && last ? [first, last] : this.items;
  }

  private get separator(): TemplateResult {
    return html`<span class="separator" aria-hidden="true">${this.renderChevron()}</span>`;
  }

  private renderChevron(): TemplateResult {
    return html` <bl-icon name="arrow_right" class="chevron" aria-hidden="true"></bl-icon>`;
  }

  private handleEllipsisClick = (): void => {
    this._popover?.show();
  };

  private handlePopoverShow = (): void => {
    this._ellipsisActive = true;
  };

  private handlePopoverHide = (): void => {
    this._ellipsisActive = false;
  };

  private renderItem(item: BreadcrumbItemData, isLast: boolean): TemplateResult {
    return html`
      <li>
        <bl-breadcrumb-item
          href="${item.href}"
          label="${item.label}"
          ?last="${isLast}"
        ></bl-breadcrumb-item>
        ${!isLast ? this.separator : ""}
      </li>
    `;
  }

  private renderCollapsed(): TemplateResult {
    const [first, last] = this.visibleItems;

    if (!first || !last) return html``;
    return html`
      <li>
        <bl-breadcrumb-item href="${first.href}" label="${first.label}"></bl-breadcrumb-item>
        ${this.separator}
      </li>
      <li>
        <button
          type="button"
          class="ellipsis-trigger ${this._ellipsisActive ? "active" : ""}"
          aria-label="Aradaki sayfaları göster"
          aria-expanded="${this._ellipsisActive}"
          @click="${this.handleEllipsisClick}"
        >
          <span class="ellipsis-dots" aria-hidden="true">
            <span class="ellipsis-dot"></span>
            <span class="ellipsis-dot"></span>
            <span class="ellipsis-dot"></span>
          </span>
        </button>
        <bl-popover
          class="overflow-popover"
          placement="bottom-start"
          offset="8"
          fit-size
          @bl-popover-show="${this.handlePopoverShow}"
          @bl-popover-hide="${this.handlePopoverHide}"
        >
          <div class="popover-list ${this._ellipsisActive ? "open" : ""}" role="list">
            ${this.items.map(
              (item, index) => html`
                <div
                  class="popover-item ${index === this.items.length - 1 ? "last" : ""}"
                  role="listitem"
                >
                  <bl-breadcrumb-item
                    href="${item.href}"
                    label="${item.label}"
                    ?last="${index === this.items.length - 1}"
                  ></bl-breadcrumb-item>
                </div>
              `
            )}
          </div>
        </bl-popover>
      </li>
      <li>
        ${this.separator}
        <bl-breadcrumb-item href="${last.href}" label="${last.label}" last></bl-breadcrumb-item>
      </li>
    `;
  }

  private renderExpanded(): TemplateResult {
    const items = this.visibleItems;

    return html`${items.map((item, i) => this.renderItem(item, i === items.length - 1))}`;
  }

  updated(): void {
    if (this._popover && this._ellipsisTrigger) {
      this._popover.target = this._ellipsisTrigger;
    }
  }

  render(): TemplateResult {
    return html`
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <ol class="breadcrumb-list">
          ${this.collapsed ? this.renderCollapsed() : this.renderExpanded()}
        </ol>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bl-breadcrumb": BlBreadcrumb;
  }
}
