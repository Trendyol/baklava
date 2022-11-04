import { assert, expect, fixture, oneEvent, html } from '@open-wc/testing';
import BlPagination from './bl-pagination';

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
       <div class="page-container">
        <bl-button kind="neutral" variant="tertiary" icon="arrow_left" class="previous" disabled="" size="medium"></bl-button>
        <ul class="page-list">
          <li>
            <bl-button variant="primary" kind="neutral" size="medium">1</bl-button>
          </li>
        </ul>
          <bl-button kind="neutral" variant="tertiary" icon="arrow_right" class="next" size="medium" disabled=""></bl-button>
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
    expect(el.hasSelect).to.equal(false);
    expect(el.jumperLabel).to.equal('Go To');
    expect(el.selectLabel).to.equal('Show');
  });

  it('should correctly set the attributes', async () => {
    const el = await fixture<typeOfBlPagination>(
      html`
        <bl-pagination
          current-page="3"
          total-items="1500"
          items-per-page="5"
          has-jumper
          jumper-label="Git"
          has-select
          select-label="Göster"
        >
        </bl-pagination>
      `
    );
    expect(el?.currentPage).to.equal(3);
    expect(el.itemsPerPage).to.equal(5);
    expect(el.hasJumper).to.equal(true);
    expect(el.hasSelect).to.equal(true);
    expect(el.jumperLabel).to.equal('Git');
    expect(el.selectLabel).to.equal('Göster');
  });

  describe('back and forward arrows', () => {
    it('should not allow a page back when the left arrow btn is disabled', async () => {
      const el = await fixture<typeOfBlPagination>(
        html`<bl-pagination current-page="1" items-per-page="1" total-items="10"></bl-pagination>`
      );
      const arrowLeftBtn = el.shadowRoot?.querySelector('.previous') as HTMLButtonElement;
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
      const arrowRightBtn = el.shadowRoot?.querySelector('.next') as HTMLButtonElement;
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
    it('not renders jumper or select when not provided', async () => {
      const el = await fixture<typeOfBlPagination>(
        html`<bl-pagination
        ></bl-pagination>`
      );
      expect(el.shadowRoot?.querySelector('bl-input')).not.to.exist;
      expect(el.shadowRoot?.querySelector('bl-select')).not.to.exist;
      expect(el.shadowRoot?.querySelector('.jumper')).not.to.exist;
      expect(el.shadowRoot?.querySelector('.select')).not.to.exist;
    });

    it('renders jumper input and select if has-jumper and has-select attributes are given', async () => {
      const el = await fixture<typeOfBlPagination>(
        html`<bl-pagination
          has-jumper
          jumper-label="Git"
          has-select
          select-label="Seç"
        ></bl-pagination>`
      );
      const selectLabel = el.shadowRoot?.querySelectorAll('label')[0];
      const jumperLabel = el.shadowRoot?.querySelectorAll('label')[1];
      expect(jumperLabel?.innerText).to.exist;
      expect(jumperLabel?.innerText).to.equal('Git');
      expect(selectLabel?.innerText).to.exist;
      expect(selectLabel?.innerText).to.equal('Seç');
      expect(el.shadowRoot?.querySelector('bl-input')).to.exist;
      expect(el.shadowRoot?.querySelector('bl-select')).to.exist;
      expect(el.shadowRoot?.querySelector('.jumper')).to.exist;
      expect(el.shadowRoot?.querySelector('.select')).to.exist;
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
      const el = await fixture<typeOfBlPagination>(paginationEl);
      const arrowRightBtn = el.shadowRoot?.querySelector('.next') as HTMLButtonElement;
      const arrowLeftBtn = el.shadowRoot?.querySelector('.previous') as HTMLButtonElement;

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

    it('should change the items per page and should set the current page to 1 on select changes', async () => {
      const el = await fixture<typeOfBlPagination>(html`<bl-pagination
        has-jumper
        current-page="1"
        has-select
        total-items="15000"
      ></bl-pagination>`);

      const select = el.shadowRoot?.querySelector('bl-select');
      const optionTwo = el?.shadowRoot?.querySelectorAll('bl-select-option')[1];
      const optionThree = el?.shadowRoot?.querySelectorAll('bl-select-option')[2];

      if (optionTwo && optionThree) {
        optionTwo.selected = true;
        optionThree.selected = false;
        optionThree.value = "";
      }

      const selectOptionEvent = new CustomEvent('bl-select', {
        detail: [optionTwo],
      });

      select?.dispatchEvent(selectOptionEvent);

      expect(el.itemsPerPage).to.equal(optionTwo?.value);
      expect(el.currentPage).to.equal(1);

      const undefinedEvent = new CustomEvent('bl-select', {
        detail: [optionThree],
      });

      select?.dispatchEvent(undefinedEvent);

      expect(el.itemsPerPage).to.equal(100);
    });
  });
});
