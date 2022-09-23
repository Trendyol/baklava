import { CSSResultGroup, html, LitElement, TemplateResult, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { event, EventDispatcher } from '../../utilities/event';
import '../icon/bl-icon';
import '../button/bl-button';
import '../input/bl-input';

import style from './bl-pagination.css';

/**
 * @tag bl-pagination
 * @summary Baklava Pagination component
 *
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
   * Sets the total results to be paginated
   */
  @property({ attribute: 'total-results', type: Number })
  totalResults = 0;

  /**
   * Sets the number of results per page
   */
  @property({ attribute: 'result-per-page', type: Number })
  resultPerPage = 10;

  /**
   * Adds jumper element if provided as true
   */
  @property({ attribute: 'has-jumper', type: Boolean })
  hasJumper = false;

  /**
   * Sets the jumper label
   */
  @property({ attribute: 'jumper-label', type: String })
  jumperLabel = "Go To";

  /**
   *  Adds itemsPerPage element if provided as true
   */
  @property({ attribute: 'has-item-per-page', type: Boolean })
  hasItemPerPage = false;

  @state() private pages: Array<number | string> = [];

  /**
   * Fires when the current page changes
   */
  @event('bl-change') private onChange: EventDispatcher<number>;

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('currentPage')) {
      this._paginate();
      this.onChange(this.currentPage);
    }
  }

  private _paginate() {
    // clean up the previous pages
    this.pages = [];
    const pageListLength = Math.ceil(Math.abs(this.totalResults / this.resultPerPage));

    if (pageListLength <= 8) {
      // Create a new array with the range numbers
      this.pages = Array.from(Array(pageListLength), (_, index) => index + 1);
      return;
    }

    for (let i = 1; i <= pageListLength; i++) {
      // If the current page is 5 or less, show pages 1-5, then ellipses, then the last page

      if (this.currentPage < 5 && i < 6) {
        this.pages.push(i);
        continue;
      }

      if (i == 7 && this.currentPage < 5) {
        this.pages.push('...');
        continue;
      }

      // if the current page is within five places of the last page, show the last five pages.
      if (this.currentPage > pageListLength - 4 && i > pageListLength - 5) {
        this.pages.push(i);
        continue;
      }

      if (i == pageListLength - 6 && this.currentPage > pageListLength - 4) {
        this.pages.push('...');
        continue;
      }

      // Show the first page, then ellipses,  then the current page surrounded by a page and last page
      if (i < 2) {
        this.pages.push(i);
      } else if (i == this.currentPage - 1) {
        this.pages.push('...');
        this.pages.push(i);
      } else if (i == this.currentPage) {
        this.pages.push(i);
        continue;
      } else if (i == this.currentPage + 1 && this.currentPage < pageListLength - 3) {
        this.pages.push(i);
        this.pages.push('...');
      }

      if (i == pageListLength) {
        this.pages.push(i);
      }
    }

    this.renderPages();
  }

  private _changePage(page: number | string): void {
    if (typeof page === 'string') return;
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
    return html`
    <li>
        <bl-button
          @bl-click="${() => this._changePage(page)}"
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
            @bl-click="${this._pageBack}"
            kind="text"
            variant="secondary"
            icon="arrow_left"
            ?disabled=${this.currentPage === 1}
          ></bl-button>
        <ul class="page-list">
          ${this.pages.map(page => html`${this.renderSinglePage(page)}`)}
        </ul>
          <bl-button
            @bl-click="${this._pageForward}"
            kind="text"
            variant="secondary"
            icon="arrow_right"
            ?disabled=${this.currentPage === this._getLastPage()}
            ></bl-button>
    </div>
  `;
  }

  render(): TemplateResult | null {
    const jumperEl = html`
    <div class="jumper">
      <label>${this.jumperLabel}</label>
      <bl-input value="${this.currentPage}"
        @bl-change="${this._inputHandler}"
        type="number"
      ></bl-input>
    </div>`;

    const selectEl = null; // will be added once bl-select is released

    const helperElements = html`
       <div class="pagination-helpers">
        ${this.hasJumper ? jumperEl : null}
        ${this.hasItemPerPage ? selectEl : null}
       </div>
       `;

    // we can warn the user if resultPerPage or totalResults is 0 or not provided
    if (!this.resultPerPage || !this.totalResults) return null;

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
