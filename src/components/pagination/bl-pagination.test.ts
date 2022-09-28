import { assert, expect, fixture, oneEvent, html } from '@open-wc/testing';
import BlPagination from './bl-pagination';
import '../icon/bl-icon';

import type typeOfBlPagination from './bl-pagination';

describe('bl-pagination', () => {
  it('is defined', () => {
    const el = document.createElement('bl-pagination');
    assert.instanceOf(el, BlPagination);
  });

  it('should render with the default values', async () => {
    const el = await fixture<typeOfBlPagination>(html`<bl-pagination></bl-pagination>`);
    assert.shadowDom.equal(
      el,
      `
      <div class="pagination">
        <div class="pagination-helpers">
        </div>
       <div class="page-container">
        <bl-button kind="text" variant="secondary" icon="arrow_left" class="arrow-left" disabled="" size="medium"></bl-button>
        <ul class="page-list">
          <li>
            <bl-button variant="secondary" kind="contained" size="medium">1</bl-button>
          </li>
        </ul>
          <bl-button kind="text" variant="secondary" icon="arrow_right" class="arrow-right" size="medium" disabled=""></bl-button>
        </div>
      </div>
    `
    );
  });

  it('should render with the correct default values', async () => {
    const el = await fixture<typeOfBlPagination>(html`<bl-pagination></bl-pagination> `);
    expect(el?.currentPage).to.equal(1);
    expect(el.itemsPerPage).to.equal(100);
    expect(el.hasJumper).to.equal(false);
    expect(el.jumperLabel).to.equal('Go To');
  });

  it('should correctly set the attributes', async () => {
    const el = await fixture<typeOfBlPagination>(
      html`
        <bl-pagination
        current-page=3
        total-items=1500
        items-per-page=5
        has-jumper
        jumper-label="Git"
        >
      </bl-pagination>
        `
    );
    expect(el?.currentPage).to.equal(3);
    expect(el.itemsPerPage).to.equal(5);
    expect(el.hasJumper).to.equal(true);
    expect(el.jumperLabel).to.equal('Git');
  });

  describe('back and forward arrows', () => {
    it('should not allow a page back when the left arrow btn is disabled', async () => {
      const el = await fixture<typeOfBlPagination>(
        html`<bl-pagination current-page="1" items-per-page="1" total-items="10"></bl-pagination>`
      );
      const arrowLeftBtn = el.shadowRoot?.querySelector('.arrow-left') as HTMLButtonElement;
      expect(arrowLeftBtn.disabled).to.eq(true);
      setTimeout(() => {
        arrowLeftBtn?.click();
        expect(el.currentPage).to.equal(1);
      });
    });

    it('should not allow a page forward when the right arrow btn is disabled', async () => {
      const el = await fixture<typeOfBlPagination>(
        html`<bl-pagination current-page="10" items-per-page="1" total-items="10"></bl-pagination>`
      );
      const arrowRightBtn = el.shadowRoot?.querySelector('.arrow-right') as HTMLButtonElement;
      expect(arrowRightBtn.disabled).to.eq(true);
      setTimeout(() => {
        arrowRightBtn?.click();
        expect(el.currentPage).to.equal(10);
      });
    });
  });

  describe('pages', () => {
    it('renders the correct number of page buttons,dots if current page is in the first five', async () => {
      const el = await fixture<typeOfBlPagination>(
        html`<bl-pagination current-page="1" items-per-page="1" total-items="10"></bl-pagination>`
      );
      expect(el.shadowRoot?.querySelectorAll('bl-button').length).to.eq(8);
      expect(el.shadowRoot?.querySelectorAll('.dots').length).to.eq(1);
    });

    it('renders the correct number of page buttons,dots if current page is in the middle', async () => {
      const el = await fixture<typeOfBlPagination>(
        html`<bl-pagination current-page="5" items-per-page="1" total-items="10"></bl-pagination>`
      );
      expect(el.shadowRoot?.querySelectorAll('bl-button').length).to.eq(7);
      expect(el.shadowRoot?.querySelectorAll('.dots').length).to.eq(2);
    });

    it('renders the correct number of page buttons,dots if current page is in the last five', async () => {
      const el = await fixture<typeOfBlPagination>(
        html`<bl-pagination current-page="10" items-per-page="1" total-items="10"></bl-pagination>`
      );
      expect(el.shadowRoot?.querySelectorAll('bl-button').length).to.eq(8);
      expect(el.shadowRoot?.querySelectorAll('.dots').length).to.eq(1);
    });

    it('should change the current page when user clicks to a single page button ', async () => {
      const el = await fixture<typeOfBlPagination>(
        html`<bl-pagination current-page="1" items-per-page="1" total-items="10"></bl-pagination>`
      );

      const pageFour = el.shadowRoot
        ?.querySelectorAll('bl-button')[4]
        .shadowRoot?.querySelector('button');

      setTimeout(() => {
        pageFour?.click();
        expect(el.currentPage).to.equal(4);
      });
    });
  });

  describe('jumper and select element', () => {
    it('renders jumper input if has-jumper attribute is given', async () => {
      const el = await fixture<typeOfBlPagination>(
        html`<bl-pagination
          has-jumper
          jumper-label="Git"
        ></bl-pagination>`
      );
      const jumperLabel = el.shadowRoot?.querySelectorAll('label')[0];
      expect(jumperLabel?.innerText).to.exist;
      expect(jumperLabel?.innerText).to.equal('Git');
      expect(el.shadowRoot?.querySelector('bl-input')).to.exist;
      expect(el.shadowRoot?.querySelector('.jumper')).to.exist;
    });

    it('should set the jumper value to the current page', async () => {
      const el = await fixture<typeOfBlPagination>(
        html`<bl-pagination
          current-page="3"
          total-items="10"
          items-per-page="1"
          has-jumper
        ></bl-pagination>`
      );

      const jumper = el.shadowRoot?.querySelector('bl-input');
      expect(jumper?.value).to.equal('3');
    });
  });

  describe('events', () => {
    const paginationEl = html`<bl-pagination
      has-jumper
      current-page="1"
      items-per-page="1"
      total-items="10"
    ></bl-pagination>`;

    it('should go to the next or previous page and fire a bl-change event when user clicks to the arrow buttons', async () => {
      const el = await fixture<typeOfBlPagination>(
        html`<bl-pagination current-page="1" items-per-page="1" total-items="10"></bl-pagination>`
      );
      const arrowRightBtn = el.shadowRoot?.querySelector('.arrow-right') as HTMLButtonElement;
      const arrowLeftBtn = el.shadowRoot?.querySelector('.arrow-left') as HTMLButtonElement;

      setTimeout(() => {
        arrowRightBtn?.click();
        expect(el.currentPage).to.equal(2);
      });

      setTimeout(() => {
        arrowLeftBtn?.click();
        expect(el.currentPage).to.equal(1);
      });

      const ev = await oneEvent(el, 'bl-change');
      expect(ev).to.exist;
    });

    it('should fire a bl-change event when jumper is changed', async () => {
      const el = await fixture<typeOfBlPagination>(paginationEl);
      const jumper = el.shadowRoot?.querySelector('bl-input')?.shadowRoot?.querySelector('input');

      if (jumper) {
        jumper.value = '5';
      }

      setTimeout(() => jumper?.dispatchEvent(new Event('change')));
      const ev = await oneEvent(el, 'bl-change');

      expect(ev).to.exist;
      expect(ev.detail).to.be.equal('5');
    });

    it('should set the page to the last page if user enters a bigger number than the last page', async () => {
      const el = await fixture<typeOfBlPagination>(paginationEl);

      const jumper = el.shadowRoot?.querySelector('bl-input');

      if (jumper) {
        jumper.value = '20';
      }

      const jumperEvent = new CustomEvent('bl-change');
      jumper?.dispatchEvent(jumperEvent);
      expect(el.currentPage).to.equal(10);
    });

    it('should set the page to 1 if user enters a negative number', async () => {
      const el = await fixture<typeOfBlPagination>(paginationEl);

      const jumper = el.shadowRoot?.querySelector('bl-input');

      if (jumper) {
        jumper.value = '-5';
      }

      const jumperEvent = new CustomEvent('bl-change');
      jumper?.dispatchEvent(jumperEvent);
      expect(el.currentPage).to.equal(1);
    });
  });
});
