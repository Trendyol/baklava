import { CSSResultGroup, html, LitElement, TemplateResult, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { event, EventDispatcher } from '../../utilities/event';
import '../button/bl-button';
import '../input/bl-input';

import style from './bl-pagination.css';

/**
 * @tag bl-pagination
 * @summary Baklava Pagination component
 */

@customElement('bl-pagination')
export default class BlPagination extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets the current page
   */
  @property({ attribute: 'current-page', type: Number, reflect: true })
  currentPage = 1;

  /**
   * Sets the total items to be paginated
   */
  @property({ attribute: 'total-items', type: Number })
  totalItems = 0;

  /**
   * Sets the number of items per page
   */
  @property({ attribute: 'items-per-page', type: Number, reflect: true })
  itemsPerPage = 10;

  /**
   * Adds jumper element if provided as true
   */
  @property({ attribute: 'has-jumper', type: Boolean })
  hasJumper = false;

  /**
   * Sets the jumper label
   */
  @property({ attribute: 'jumper-label', type: String })
  jumperLabel = 'Go To';

  /**
   *  Adds select element to choose the items per page
   */
  @property({ attribute: 'has-select', type: Boolean })
  hasSelect = false;

  /**
   *  Adds select element to choose the items per page
   */
  @property({ attribute: 'select-label', type: String })
  selectLabel = 'Show';

  @state() private pages: Array<number | string> = [];

  /**
   * Fires when the current page changes
   */
  @event('bl-change') private onChange: EventDispatcher<{ selectedPage: number; prevPage: number }>;

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('currentPage')) {
      this._paginate();
      this.onChange({
        selectedPage: this.currentPage,
        prevPage: changedProperties.get('currentPage'),
      });
    }
  }

  private _paginate() {
    this.pages = [];
    const pageListLength = Math.ceil(Math.abs(this.totalItems / this.itemsPerPage)) || 1;

    if (pageListLength <= 8) {
      this.pages = Array.from(Array(pageListLength), (_, index) => index + 1);
      return;
    }

    this.pages.push(1);

    if (this.currentPage < 5) {
      this.pages.push(2, 3, 4, 5, '...');
    } else if (this.currentPage >= 5 && this.currentPage <= pageListLength - 4) {
      this.pages.push('...', this.currentPage - 1, this.currentPage, this.currentPage + 1, '...');
    } else {
      this.pages.push(
        '...',
        pageListLength - 4,
        pageListLength - 3,
        pageListLength - 2,
        pageListLength - 1
      );
    }

    this.pages.push(pageListLength);
  }

  private _changePage(page: number): void {
    this.currentPage = page;
  }

  private _pageBack(): void {
    if (this.currentPage === 1) return;
    this.currentPage--;
  }

  private _pageForward(): void {
    if (this.currentPage === this._getLastPage()) return;
    this.currentPage++;
  }

  private _getLastPage(): number {
    return +this.pages[this.pages.length - 1];
  }

  private _inputHandler(event: CustomEvent) {
    const inputValue = +(event.target as HTMLInputElement).value;
    const newPage = inputValue > 0 ? Math.min(this._getLastPage(), inputValue) : 1;
    this._changePage(newPage);
  }

  private renderSinglePage(page: number | string) {
    if (typeof page === 'string') {
      return html`<span class="dots"></span>`;
    }
    return html`
    <li>
        <bl-button
          @click="${() => this._changePage(page)}"
          variant="secondary"
          kind=${this.currentPage === page ? 'contained' : 'text'}
          >
            ${page}
        </bl-button>
    </li>`;
  }

  private renderPages() {
    return html`
    <div class="page-container">
          <bl-button
            @click="${this._pageBack}"
            kind="text"
            variant="secondary"
            icon="arrow_left"
            class="arrow-left"
            ?disabled=${this.currentPage === 1}
          ></bl-button>
        <ul class="page-list">
          ${this.pages.map(page => html`${this.renderSinglePage(page)}`)}
        </ul>
          <bl-button
            @click="${this._pageForward}"
            kind="text"
            variant="secondary"
            icon="arrow_right"
            class="arrow-right"
            ?disabled=${this.currentPage === this._getLastPage()}
            ></bl-button>
    </div>
  `;
  }

  render(): TemplateResult {
    const jumperEl = html`
    <div class="jumper">
      <label>${this.jumperLabel}</label>
      <bl-input value="${this.currentPage}"
        @bl-change="${this._inputHandler}"
      ></bl-input>
    </div>`;

    const selectEl = null;

    const helperElements = html`
       <div class="pagination-helpers">
        ${this.hasJumper ? jumperEl : null}
        ${this.hasSelect ? selectEl : null}
       </div>
       `;

    return html`
    <div class="pagination">
      ${helperElements}
      ${this.renderPages()}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-pagination': BlPagination;
  }
}
