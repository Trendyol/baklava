import {
  assert,
  fixture,
  html,
  oneEvent,
  expect,
  fixtureCleanup,
} from '@open-wc/testing';
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
      <dialog aria-labelledby="dialog-caption">
        <div class="container">
          <header>
            <bl-button
              icon="close"
              kind="neutral"
              size="medium"
              variant="tertiary"
            >
            </bl-button>
          </header>
          <section class="content" style="max-height: 456px;">
            <slot>
            </slot>
          </section>
        </div>
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

  it('should close the dialog on outside click', async () => {
    const body = await fixture<HTMLBodyElement>(html`
      <div style="width:1500px;height:1500px">
        <bl-dialog caption="My Title" open>
          <p>my content</p>
        </bl-dialog>
      </div>
    `);

    const dialogEl = body.querySelector('bl-dialog') as typeOfBlDialog;

    await sendMouse({ type: 'click', position: [1, 1] });
    expect(dialogEl.getAttribute('open')).oneOf(['', null]);
    await resetMouse();
    fixtureCleanup();
  });

  it('should add shadow to footer when the content is too long', async () => {
    window.innerWidth = 400;

    const el = await fixture<HTMLElement>(html`<bl-dialog open caption="My title">
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text., comes from a line in
          section 1.10.32.
        </p>
        <bl-button slot="primary-action" size="large">Primary</bl-button>
        <bl-button slot="secondary-action" variant="secondary" size="large">Secondary</bl-button>
      </bl-dialog>
    </body>`);

    const footer = el?.shadowRoot?.querySelector('footer') as HTMLElement;

    expect(footer.className).to.oneOf(['sticky','']);
  });

  describe('Events', () => {
    it('should fire bl-dialog-open / close event on dialog open / close', async () => {
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
