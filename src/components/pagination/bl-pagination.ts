import { CSSResultGroup, html, LitElement, TemplateResult, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { event, EventDispatcher } from '../../utilities/event';
import '../button/bl-button';
import '../input/bl-input';
import '../select/bl-select';

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

  /**
   * Sets the items per page options of the select element
   *  PROPERTY
   */
  @property({ type: Array, attribute: false })
  itemsPerPageOptions = [
    {
      text: '10 Items',
      value: 10,
    },
    {
      text: '25 Items',
      value: 25,
    },
    {
      text: '50 Items',
      value: 50,
    },
    {
      text: '100 Items',
      value: 100,
    },
  ];

  @state() private pages: Array<number | string> = [];

  /**
   * Fires when the current page changes
   */
  @event('bl-change') private onChange: EventDispatcher<{ selectedPage: number; prevPage: number }>;

  connectedCallback() {
    super.connectedCallback();

    setTimeout(() => {
      window?.addEventListener('resize', () => this._paginate());
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window?.removeEventListener('resize', this._paginate);
  }

  updated(changedProperties: PropertyValues<this>) {
    if (
      changedProperties.has('currentPage') ||
      changedProperties.has('itemsPerPage') ||
      changedProperties.has('totalItems')
    ) {
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

  private _selectHandler(event: CustomEvent) {
    this.itemsPerPage = event?.detail[0]?.value || 100;
    this.currentPage = 1;
  }

  private _renderSinglePage(page: number | string) {
    if (typeof page === 'string') {
      return html`<span class="dots"></span>`;
    }
    return html` <li>
      <bl-button
        @click="${() => this._changePage(page)}"
        variant=${this.currentPage === page ? 'primary' : 'tertiary'}
        kind="neutral"
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
          variant="tertiary"
          kind="neutral"
          icon="arrow_left"
          class="previous"
          ?disabled=${this.currentPage === 1}
        ></bl-button>
        <ul class="page-list">
          ${window.innerWidth < 768
            ? html`${this._renderSinglePage(this.currentPage)}`
            : this.pages.map(page => html`${this._renderSinglePage(page)}`)}
        </ul>
        <bl-button
          @click="${this._pageForward}"
          variant="tertiary"
          kind="neutral"
          icon="arrow_right"
          class="next"
          ?disabled=${this.currentPage === this._getLastPage()}
        ></bl-button>
      </div>
    `;
  }

  render(): TemplateResult {
    const selectEl = this.hasSelect
      ? html`
          <div class="select">
            <label>${this.selectLabel}</label>
            <bl-select @bl-select="${this._selectHandler}">
              ${this.itemsPerPageOptions.map(option => {
                return html`<bl-select-option
                  value="${option.value}"
                  ?selected=${option.value === this.itemsPerPage}
                  >${option.text}</bl-select-option
                >`;
              })}
            </bl-select>
          </div>
        `
      : null;

    const jumperEl = this.hasJumper
      ? html` <div class="jumper">
          <label>${this.jumperLabel}</label>
          <bl-input value="${this.currentPage}" @bl-change="${this._inputHandler}"></bl-input>
        </div>`
      : null;

    const getHelperElements = () => {
      if (!this.hasSelect && !this.hasJumper) return;
      return html` <div class="pagination-helpers">${selectEl} ${jumperEl}</div> `;
    };

    return html` <div class="pagination">${getHelperElements()} ${this.renderPages()}</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bl-pagination': BlPagination;
  }
}
