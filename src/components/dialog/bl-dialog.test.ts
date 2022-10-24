import { assert, fixture, html, oneEvent, expect, fixtureCleanup } from '@open-wc/testing';
import { sendKeys, sendMouse, resetMouse } from '@web/test-runner-commands';
import BlDialog from './bl-dialog';

import type typeOfBlDialog from './bl-dialog';

describe('bl-dialog', () => {
  it('is defined', () => {
    const el = document.createElement('bl-dialog');
    assert.instanceOf(el, BlDialog);
  });

  it('should render with the default values', async () => {
    const el = await fixture<typeOfBlDialog>(html`<bl-dialog></bl-dialog>`);
    assert.shadowDom.equal(
      el,
      `
      <dialog>
        <header>
          <bl-button icon="close" variant="tertiary" kind="neutral" size="medium"></bl-button>
        </header>
        <section class=" content "><slot></slot></section>
      </dialog>
    `
    );
  });

  it('should render the title,the content and the footer if provided', async () => {
    const el = await fixture<typeOfBlDialog>(html`<bl-dialog open caption="My title">
      <div class="content">
        <p>My Content</p>
      </div>
      <bl-button slot="primary-action" size="large">Primary</bl-button>
      <bl-button slot="secondary-action" variant="secondary" size="large">Secondary</bl-button>
    </bl-dialog>`);

    const caption = el.shadowRoot?.querySelector('h2') as HTMLElement;
    const content = el.shadowRoot?.querySelector('.content') as HTMLElement;
    const footer = el.shadowRoot?.querySelector('footer');

    expect(caption).to.exist;
    expect(caption?.innerText).to.equal('My title');

    expect(content).to.exist;
    expect(content?.innerHTML).to.equal('<slot></slot>');

    expect(footer).to.exist;
    expect(footer?.slot).to.exist;
  });

  it('should close the dialog when the close btn is clicked', async () => {
    const el = await fixture<typeOfBlDialog>(html` <bl-dialog open caption="My title">
      <div>My Content</div>
    </bl-dialog>`);

    const closeBtn = el?.shadowRoot?.querySelector('bl-button');

    expect(closeBtn).to.exist;
    expect(el.open).to.equal(true);

    setTimeout(() => {
      closeBtn?.click();
      expect(el.open).to.equal(false);
      fixtureCleanup();
    });
  });

  it('should close the dialog when user presses "Escape" key ', async () => {
    const container = await fixture<HTMLDivElement>(html`<div>
      <bl-dialog open caption="My title"> </bl-dialog>
    </div>`);

    const dialog = container.querySelector<typeOfBlDialog>('bl-dialog');
    if (dialog) {
      await sendKeys({ press: 'Escape' });
      expect(dialog?.getAttribute('open'))?.oneOf(['', null]);
      fixtureCleanup();
    }
  });

  // it('should close the dialog when the outside of the dialog is clicked', async () => {
  //   const dialogEl = await fixture<typeOfBlDialog>(html`<bl-dialog open caption="My title">
  //     <div class="content" style="width:300px;height:300px">
  //       <p>My Content</p>
  //     </div>
  //     <bl-button slot="primary-action" size="large">Primary</bl-button>
  //     <bl-button slot="secondary-action" variant="secondary" size="large">Secondary</bl-button>
  //   </bl-dialog>`);

  //   const content = dialogEl?.shadowRoot?.querySelector('.content') as HTMLElement;

  //   const { x, y } = getMiddleOfElement(content);

  //   setTimeout(async () => {
  //     await sendMouse({ type: 'click', position: [x - 100, y] }); // FIXME
  //   });
  //   expect(dialogEl?.getAttribute('open'))?.oneOf(['', null]); // FIXME
  //   fixtureCleanup();
  //   await resetMouse();
  // });

  it('shoulda sdasdd', async () => {
    const dialogEl = await fixture<typeOfBlDialog>(html`<bl-dialog open caption="My title">
      <div class="content" style="width:300px;height:300px">
        <p>My Content</p>
      </div>
      <bl-button slot="primary-action" size="large">Primary</bl-button>
      <bl-button slot="secondary-action" variant="secondary" size="large">Secondary</bl-button>
    </bl-dialog>`);

    // const content = dialogEl?.shadowRoot?.querySelector('.content') as HTMLElement;

    // const { x, width,top } = getMiddleOfElement(content);

    // eslint-disable-next-line no-debugger
    debugger;

    setTimeout(async () => {
      await sendMouse({ type: 'click', position: [4, 500] }); // FIXME
    });

    expect(dialogEl?.getAttribute('open'))?.oneOf(['', null]); // FIXME
    fixtureCleanup();
    await resetMouse();
  });

  // function getMiddleOfElement(element: Element) {
  //   const { x, y, width, height, top, left, right, bottom } = element.getBoundingClientRect();

  //   return { x, y, width, height, top, left, right, bottom };
  // }

  it('should add shadow to footer when the content is too long', async () => {
    const el = await fixture<HTMLElement>(html`<bl-dialog open caption="My title">
          <div style="height:1600px">
          Really long content
          </div>
        <bl-button slot="primary-action" size="large">Primary</bl-button>
        <bl-button slot="secondary-action" variant="secondary" size="large">Secondary</bl-button>
      </bl-dialog>
    </body>`);

    const footer = el?.shadowRoot?.querySelector('footer') as HTMLElement;

    const className = Object.values(footer.classList)[0];

    if (className) {
      expect(className).to.equal('shadow');
    }
  });

  describe('Events', () => {
    it('fires bl-dialog-open event on dialog close', async () => {
      const el = await fixture<typeOfBlDialog>(html`<bl-dialog open caption="My title">
      </bl-dialog>`);

      setTimeout(async () => {
        const ev = await oneEvent(el, 'bl-dialog-open');
        expect(ev).to.exist;
        expect(ev.detail.isOpen).to.equal(true);
      });

      const closeBtn = el?.shadowRoot?.querySelector('bl-button');

      setTimeout(async () => {
        closeBtn?.click();
        const ev = await oneEvent(el, 'bl-dialog-close');
        expect(ev).to.exist;
        expect(ev.detail.isOpen).to.equal(false);
      });
    });
  });
});
